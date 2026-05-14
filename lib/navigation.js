"use client";

// Wraps Next.js navigation in a stage-curtain transition. Pages and links call
// useNavigate() to get a navigate(href, label) function that:
//   1. Triggers the curtain stripes to drop in
//   2. After ~750ms (mid-curtain), pushes the new route
//   3. The curtain rises back up automatically
//
// This preserves the editorial feel of the original HTML prototype while using
// Next.js's App Router for real URLs and SEO.

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getWorkById } from "@/lib/work";

const NavigationContext = createContext({
  navigate: () => {},
  curtainTrigger: 0,
  curtainLabel: "",
});

export function NavigationProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [curtainTrigger, setCurtainTrigger] = useState(0);
  const [curtainLabel, setCurtainLabel] = useState("");

  // Apply theme on path change — light for hospitality case studies, dark default
  useEffect(() => {
    let theme = "dark";
    if (pathname?.startsWith("/work/")) {
      const id = pathname.replace(/^\/work\//, "");
      const w = getWorkById(id);
      if (w) theme = w.theme;
    }
    document.documentElement.dataset.theme = theme;
  }, [pathname]);

  // Scroll to top on path change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const navigate = useCallback(
    (href, label) => {
      if (href === pathname) return;
      setCurtainLabel(label ?? routeLabel(href));
      setCurtainTrigger((t) => t + 1);
      // Swap route mid-curtain
      setTimeout(() => {
        router.push(href);
      }, 750);
    },
    [pathname, router]
  );

  return (
    <NavigationContext.Provider value={{ navigate, curtainTrigger, curtainLabel }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

// Convenience hook for inline link handlers
export function useNavigate() {
  return useNavigation().navigate;
}

function routeLabel(href) {
  if (href === "/" || href === "/work") return "Work";
  if (href === "/services") return "Services";
  if (href === "/studio") return "Studio";
  if (href === "/contact") return "Contact";
  if (href.startsWith("/work/")) {
    const id = href.replace(/^\/work\//, "");
    const w = getWorkById(id);
    return w ? w.title : "Case";
  }
  return "";
}
