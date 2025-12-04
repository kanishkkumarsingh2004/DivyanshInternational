import { NextRequest, NextResponse } from "next/server";
import { createTradeEnquirySchema } from "@/lib/validation/schemas";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend/client";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const siteSettings = await client.fetch(siteSettingsQuery);
  const apiMessages = siteSettings.apiMessages;
  const templates = siteSettings.emailTemplates;
  const apiConfig = siteSettings.apiConfig;
  const validationConfig = siteSettings.validation;

  try {
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      apiConfig.unknownIpLabel;

    if (!checkRateLimit(ip, apiConfig.rateLimitMaxRequests, apiConfig.rateLimitWindowMs)) {
      return NextResponse.json(
        { success: false, error: apiMessages.rateLimitError },
        { status: 429 }
      );
    }

    const body = await request.json();

    const tradeEnquirySchema = createTradeEnquirySchema(validationConfig);
    const validation = tradeEnquirySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: apiMessages.validationError, details: validation.error.issues },
        { status: 400 }
      );
    }

    const data = validation.data;

    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    try {
      await prisma.enquiry.create({
        data: {
          type: apiConfig.enquiryTypeTrade,
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          role: data.role,
          country: data.country,
          productInterest: data.productInterest,
          quantity: data.quantity,
          message: data.message,
          status: apiConfig.enquiryStatusNew,
        },
      });
    } catch (dbError) {
      console.error("Prisma Error:", dbError);
    }

    try {
      await resend.emails.send({
        from: `${templates.fromName} <${templates.fromEmail}>`,
        to: process.env.CONTACT_EMAIL || apiConfig.fallbackEmail,
        subject: `${templates.tradeSubject} ${data.company}`,
        html: `
          <h2>${templates.newTradeEnquiryTitle}</h2>
          <p><strong>${templates.nameLabel}:</strong> ${data.name}</p>
          <p><strong>${templates.companyLabel}:</strong> ${data.company}</p>
          <p><strong>${templates.emailLabel}:</strong> ${data.email}</p>
          <p><strong>${templates.phoneLabel}:</strong> ${data.phone}</p>
          <p><strong>${templates.roleLabel}:</strong> ${data.role || templates.naText}</p>
          <p><strong>${templates.countryLabel}:</strong> ${data.country}</p>
          <p><strong>${templates.productsLabel}:</strong> ${data.productInterest?.join(apiConfig.listSeparator) || templates.noneText}</p>
          <p><strong>${templates.quantityLabel}:</strong> ${data.quantity || templates.naText}</p>
          <p><strong>${templates.messageLabel}:</strong></p>
          <p>${data.message}</p>
        `,
      });
    } catch (emailError) {
      console.error("Resend Error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: apiMessages.enquirySuccess,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: apiMessages.serverError }, { status: 500 });
  }
}
