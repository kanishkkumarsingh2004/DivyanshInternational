import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "generalEnquiryLabel",
      title: "General Enquiry Tab Label",
      type: "string",
    }),
    defineField({
      name: "tradeEnquiryLabel",
      title: "Trade Enquiry Tab Label",
      type: "string",
    }),
    defineField({
      name: "contactDetailsTitle",
      title: "Contact Details Title",
      type: "string",
    }),
    defineField({
      name: "businessHoursTitle",
      title: "Business Hours Title",
      type: "string",
    }),
    defineField({
      name: "footerNote",
      title: "Footer Note",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "contactDetails",
      title: "Contact Details",
      type: "object",
      fields: [
        { name: "address", type: "text", title: "Address" },
        { name: "phone", type: "array", of: [{ type: "string" }], title: "Phone Numbers" },
        { name: "email", type: "string", title: "Email" },
      ],
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "object",
      fields: [
        { name: "weekdays", type: "string", title: "Weekdays" },
        { name: "sunday", type: "string", title: "Sunday" },
      ],
    }),
  ],
});
