import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

interface EnquiryItem {
  productTitle: string;
  grade?: string;
  packFormat?: string;
  quantity?: string;
  MOQ?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  const siteSettings = await client.fetch(siteSettingsQuery);
  const apiMessages = siteSettings.apiMessages;
  const pdfTemplate = siteSettings.pdfTemplate;
  const styling = pdfTemplate.styling;
  const colors = styling.colors;

  try {
    const { items, userDetails } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: apiMessages.validationError },
        { status: 400 }
      );
    }

    const parseColor = (colorStr: string): [number, number, number] => {
      const parts = colorStr.split(",").map((n) => parseInt(n.trim()));
      return [parts[0], parts[1], parts[2]];
    };

    const referenceId = `${pdfTemplate.referencePrefix}${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(styling.headerFontSize);
    doc.setTextColor(...parseColor(colors.deepBrown));
    doc.text(pdfTemplate.companyName, pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(styling.subtitleFontSize);
    doc.setTextColor(...parseColor(colors.gray));
    doc.text(pdfTemplate.title, pageWidth / 2, 28, { align: "center" });

    doc.setFontSize(styling.bodyFontSize);
    doc.setTextColor(...parseColor(colors.black));
    doc.text(`${pdfTemplate.dateLabel} ${new Date().toLocaleDateString()}`, 14, 40);
    doc.text(`${pdfTemplate.referenceLabel} ${referenceId}`, 14, 45);

    let startY = 55;
    if (userDetails) {
      doc.text(pdfTemplate.contactDetailsLabel, 14, startY);
      doc.setFont(styling.fontFamily, styling.fontStyleNormal);
      doc.setTextColor(...parseColor(colors.darkGray));

      const details = [
        userDetails.name && `${pdfTemplate.nameLabel} ${userDetails.name}`,
        userDetails.company && `${pdfTemplate.companyLabel} ${userDetails.company}`,
        userDetails.email && `${pdfTemplate.emailLabel} ${userDetails.email}`,
        userDetails.phone && `${pdfTemplate.phoneLabel} ${userDetails.phone}`,
      ].filter(Boolean);

      details.forEach((detail, index) => {
        doc.text(detail as string, 14, startY + 5 + index * 5);
      });

      startY += 10 + details.length * 5;
    }

    const tableData = items.map((item: EnquiryItem, index: number) => [
      index + 1,
      item.productTitle || pdfTemplate.naText,
      item.grade || pdfTemplate.emptyFieldText,
      item.packFormat || pdfTemplate.emptyFieldText,
      item.quantity || pdfTemplate.emptyFieldText,
      item.MOQ || pdfTemplate.emptyFieldText,
      item.notes || pdfTemplate.emptyFieldText,
    ]);

    const headers = pdfTemplate.tableHeaders;
    const colWidths = styling.columnWidths;

    autoTable(doc, {
      startY: startY,
      head: [
        [
          pdfTemplate.indexLabel,
          headers.product,
          headers.grade,
          headers.packFormat,
          headers.quantity,
          headers.moq,
          headers.notes,
        ],
      ],
      body: tableData,
      theme: styling.tableTheme,
      headStyles: {
        fillColor: parseColor(colors.gold),
        textColor: parseColor(colors.white),
        fontStyle: styling.fontStyleBold,
      },
      styles: {
        fontSize: styling.tableFontSize,
        cellPadding: styling.tableCellPadding,
      },
      columnStyles: {
        0: { cellWidth: colWidths.index },
        1: { cellWidth: colWidths.product },
        2: { cellWidth: colWidths.grade },
        3: { cellWidth: colWidths.packFormat },
        4: { cellWidth: colWidths.quantity },
        5: { cellWidth: colWidths.moq },
        6: { cellWidth: colWidths.notes },
      },
    });

    const finalY =
      (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY || startY;
    doc.setFontSize(styling.footerFontSize);
    doc.setTextColor(...parseColor(colors.lightGray));
    doc.text(pdfTemplate.footerText1, pageWidth / 2, finalY + 15, { align: "center" });
    doc.text(pdfTemplate.footerText2, pageWidth / 2, finalY + 20, { align: "center" });

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfTemplate.filenamePrefix}${referenceId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error In PDF Generation:", error);
    return NextResponse.json(
      { success: false, error: apiMessages.pdfGenerationError },
      { status: 500 }
    );
  }
}
