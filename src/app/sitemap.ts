import type { MetadataRoute } from "next";
import { person } from "@/content/profile";

// One page. Prerendered, so lastModified is the build (deploy) date.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: person.url, lastModified: new Date() }];
}
