import { defineType, defineField } from "sanity";

export default defineType({
  name: "distributionRegion",
  title: "Distribution Region",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Region Name",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "x",
      title: "X Coordinate (%)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "y",
      title: "Y Coordinate (%)",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100),
    }),
  ],
});
