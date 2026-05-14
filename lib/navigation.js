"use client";

// Wraps Next.js navigation in a stage-curtain transition. Pages and links call
// useNavigate() to get a navigate(href, label) function that:
//   1. Triggers the curtain stripes to drop in
//   2. After ~750ms (mid-curtain), pushes the new route
//   3. The curtain rises back up automatically
//
// The site has two routes: "/" (Work) and "/contact".

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
  if (href === "/contact") return "Contact";
  return "";
}
