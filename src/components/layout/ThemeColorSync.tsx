"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { resolveThemeColorForPath } from "@/lib/route-theme-color";

function applyThemeColor(themeColor: string) {
  const themeColorTags = document.head.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');

  if (themeColorTags.length === 0) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = themeColor;
    document.head.appendChild(meta);
    return;
  }

  themeColorTags.forEach((tag) => {
    if (tag.content !== themeColor) {
      tag.content = themeColor;
    }
  });
}

export function ThemeColorSync() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const themeColor = resolveThemeColorForPath(pathname);

    applyThemeColor(themeColor);

    const frameId = window.requestAnimationFrame(() => {
      applyThemeColor(themeColor);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  return null;
}
