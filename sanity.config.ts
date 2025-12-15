import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { env } from "@/lib/env";

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Settings group
            S.listItem()
              .title("Settings")
              .child(
                S.list()
                  .title("Settings")
                  .items([
                    S.listItem()
                      .title("Site Settings")
                      .schemaType("siteSettings")
                      .child(S.document().schemaType("siteSettings")),
                    S.listItem()
                      .title("Catalog Settings")
                      .schemaType("catalogSettings")
                      .child(S.document().schemaType("catalogSettings")),
                  ])
              ),
            // All other documents
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["siteSettings", "catalogSettings"].includes(
                  listItem.getId() || ""
                )
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
