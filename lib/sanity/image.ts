import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "./client";

export const urlForImage = (source: SanityImageSource) => {
  return urlFor(source);
};
