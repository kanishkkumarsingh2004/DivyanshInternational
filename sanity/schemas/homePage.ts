import { defineType, defineField } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "capabilitiesSection",
      title: "Capabilities Section",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
        { name: "certificationsTitle", type: "string", title: "Certifications Title" },
        { name: "certificationsDescription", type: "text", title: "Certifications Description" },
      ],
    }),
    defineField({
      name: "heroStats",
      title: "Hero Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value" },
            { name: "label", type: "string", title: "Label" },
            { name: "detail", type: "string", title: "Detail" },
          ],
        },
      ],
    }),
    defineField({
      name: "processSection",
      title: "Process Section",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    }),
    defineField({
      name: "sustainabilitySection",
      title: "Sustainability Section",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    }),
    defineField({
      name: "trustSection",
      title: "Trust Section",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
        {
          name: "partnerSegments",
          title: "Partner Segments",
          type: "array",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "productShowcaseSection",
      title: "Product Showcase Section",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    }),
    defineField({
      name: "spiralQuoteSection",
      title: "Spiral Quote Section",
      type: "object",
      fields: [{ name: "buttonText", type: "string", title: "Button Text" }],
    }),
    defineField({
      name: "aboutSection",
      title: "About Section",
      type: "object",
      fields: [
        {
          name: "whoWeAre",
          title: "Who We Are",
          type: "object",
          fields: [
            { name: "eyebrow", type: "string", title: "Eyebrow" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
            {
              name: "stats",
              title: "Statistics",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "value", type: "string", title: "Value" },
                    { name: "label", type: "string", title: "Label" },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "mission",
          title: "Mission",
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
        {
          name: "vision",
          title: "Vision",
          type: "object",
          fields: [
            { name: "eyebrow", type: "string", title: "Eyebrow" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
        {
          name: "commitment",
          title: "Commitment",
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
        {
          name: "timeline",
          title: "Timeline",
          type: "object",
          fields: [
            { name: "eyebrow", type: "string", title: "Eyebrow" },
            { name: "title", type: "string", title: "Title" },
            {
              name: "entries",
              title: "Timeline Entries",
              type: "array",
              of: [{ type: "reference", to: [{ type: "timeline" }] }],
            },
          ],
        },
        {
          name: "distribution",
          title: "Distribution",
          type: "object",
          fields: [{ name: "title", type: "string", title: "Title" }],
        },
      ],
    }),
  ],
});
