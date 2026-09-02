// sitemap.xml — generated automatically from these two routes.
import { SITE } from "@/lib/site";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];
}
