// Root layout — wraps every page with fonts, providers, nav, cursor, and curtain.

import "@/styles/globals.css";
import { NavigationProvider } from "@/lib/navigation";
import { Nav } from "@/components/Nav";
import { CustomCursor, PageCurtain } from "@/components/Anim";

export const metadata = {
  title: "Miyako Lab — Video & Design Studio, Osaka",
  description:
    "Miyako Lab is a multimedia design studio in Osaka — video, motion, flyers, menus, and print for hospitality and nightlife.",
  metadataBase: new URL("https://miyakolab.co"),
  openGraph: {
    title: "Miyako Lab — Video & Design Studio, Osaka",
    description: "Video, motion, flyers, and print for places that mostly exist after dark.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,wght@1,200;1,300;1,400&family=Noto+Sans+JP:wght@400;500;700&display=swap"
        />
      </head>
      <body>
        <NavigationProvider>
          <CustomCursor />
          <PageCurtain />
          <Nav />
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
