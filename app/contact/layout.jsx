// Contact — page metadata lives here because the page itself is a client
// component (it needs the live clock).

import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: `Talk to ${SITE.name} about video, flyers, a DJ EPK or a website. Email or WhatsApp — no forms. Studio in ${SITE.city}, ${SITE.country}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${SITE.name}`,
    description: `Email or WhatsApp the studio. Based in ${SITE.city}, ${SITE.country}.`,
    url: "/contact",
  },
};

export default function ContactLayout({ children }) {
  return children;
}
