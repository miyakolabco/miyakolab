// robots.txt — everything is crawlable; points crawlers at the sitemap.
import { SITE } from "@/lib/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
