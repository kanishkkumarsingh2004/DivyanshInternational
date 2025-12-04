import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export async function POST(request: NextRequest) {
  const siteSettings = await client.fetch(siteSettingsQuery);
  const apiMessages = siteSettings.apiMessages;
  const apiConfig = siteSettings.apiConfig;

  try {
    const { items, contactInfo } = await request.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: apiMessages.validationError },
        { status: 400 }
      );
    }

    const payload = {
      items,
      contactInfo,
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: apiConfig.httpMethodPost,
          headers: {
            [apiConfig.contentTypeHeader]: apiConfig.contentTypeJson,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error("Webhook Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error Sending To Webhook:", error);
      }
    }

    return NextResponse.json({
      success: true,
      message: apiMessages.enquirySuccess,
      enquiryId: `${apiConfig.enquiryIdPrefix}${Date.now()}`,
    });
  } catch (error) {
    console.error("Error Submitting Enquiry:", error);
    return NextResponse.json({ success: false, error: apiMessages.serverError }, { status: 500 });
  }
}
