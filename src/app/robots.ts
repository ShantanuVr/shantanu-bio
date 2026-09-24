import type { MetadataRoute } from "next";
import { person } from "@/content/profile";

// Cloudflare prepends its managed content-signal comments to this file at the edge.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${person.url}/sitemap.xml`,
  };
}
