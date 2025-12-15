import { defineType, defineField } from "sanity";
import { BookIcon } from "@sanity/icons";

export default defineType({
  name: "catalogSettings",
  title: "Catalog Settings",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "backCoverImage",
      title: "Back Cover Image",
      description: "Full-size image (100% width and height) displayed as the 6th and final page of the catalog. Recommended size: 1400x1200px or larger. If no image is provided, a placeholder will be shown.",
      type: "image",
      options: {
        hotspot: true,
        accept: "image/*",
      },
      validation: (Rule) =>
        Rule.custom((image) => {
          if (!image) {
            return "Back cover image is recommended. A placeholder will be shown if not provided.";
          }
          return true;
        }).warning(),
    }),
    defineField({
      name: "backCoverImageAlt",
      title: "Back Cover Image Alt Text",
      description: "Alternative text for the back cover image (for accessibility and SEO)",
      type: "string",
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const image = (context.parent as { backCoverImage?: unknown })?.backCoverImage;
          if (image && !alt) {
            return "Alt text is recommended when an image is provided";
          }
          return true;
        }).warning(),
    }),
  ],
  preview: {
    select: {
      title: "backCoverImageAlt",
      media: "backCoverImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Catalog Back Cover",
        subtitle: media ? "Image uploaded" : "No image (placeholder will be shown)",
        media: media,
      };
    },
  },
});

