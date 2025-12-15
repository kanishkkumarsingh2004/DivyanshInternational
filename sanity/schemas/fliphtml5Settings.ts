import { defineType, defineField } from "sanity";

export default defineType({
  name: "fliphtml5Settings",
  title: "FlipHTML5 Catalogue Settings",
  type: "document",
  description: "Configure your interactive FlipHTML5 catalogue and PDF downloads. Upload your PDF directly or provide an external URL.",
  fields: [
    defineField({
      name: "catalogueUrl",
      title: "Catalogue URL",
      description: "Main FlipHTML5 catalogue URL for desktop viewing",
      type: "url",
      validation: (Rule) => Rule.required().uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: "mobileOptimizedUrl",
      title: "Mobile Optimized URL (Optional)",
      description: "Optional mobile-specific FlipHTML5 URL for better mobile experience",
      type: "url",
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: "pdfFile",
      title: "PDF Catalogue File",
      description: "Upload the PDF version of your catalogue directly to Sanity",
      type: "file",
      options: {
        accept: ".pdf"
      },
      validation: (Rule) => Rule.custom((file) => {
        if (file && file.asset) {
          // Additional validation can be added here if needed
          return true;
        }
        return true; // Optional field
      })
    }),
    defineField({
      name: "pdfDownloadUrl",
      title: "PDF Download URL (Optional)",
      description: "Alternative: Direct link to downloadable PDF version (use either this OR upload file above)",
      type: "url",
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: "title",
      title: "Catalogue Title",
      type: "string",
      initialValue: "Product Catalogue"
    }),
    defineField({
      name: "description",
      title: "Catalogue Description",
      type: "text",
      initialValue: "Explore our premium collection of dry fruits, nuts, and specialty products with our interactive digital catalogue."
    }),
    defineField({
      name: "version",
      title: "Catalogue Version",
      description: "Version number or identifier for the catalogue",
      type: "string",
      initialValue: "2024.1"
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated",
      type: "datetime",
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      description: "Enable/disable the FlipHTML5 catalogue",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "title",
      version: "version",
      isActive: "isActive",
      pdfFile: "pdfFile",
      pdfDownloadUrl: "pdfDownloadUrl"
    },
    prepare({ title, version, isActive, pdfFile, pdfDownloadUrl }) {
      const hasPdf = pdfFile?.asset || pdfDownloadUrl;
      return {
        title: title || "FlipHTML5 Catalogue",
        subtitle: `Version: ${version || "N/A"} • ${isActive ? "Active" : "Inactive"} • PDF: ${hasPdf ? "Available" : "Not Set"}`,
        media: undefined
      };
    },
  },
});