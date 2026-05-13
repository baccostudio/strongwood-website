import { PRELOADER_FONT_URLS } from "@/lib/preloader";

const EARLY_VIEWPORT_HEIGHT_SCRIPT = `
(() => {
  const syncViewportHeight = () => {
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

    if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) {
      return;
    }

    document.documentElement.style.setProperty("--vh", \`\${viewportHeight * 0.01}px\`);
  };

  syncViewportHeight();
  window.addEventListener("load", syncViewportHeight, { passive: true });
  window.addEventListener("pageshow", syncViewportHeight, { passive: true });
  window.addEventListener("resize", syncViewportHeight, { passive: true });
  window.visualViewport?.addEventListener("resize", syncViewportHeight, { passive: true });
})();
`;

export default function Head() {
  return (
    <>
      {PRELOADER_FONT_URLS.map((fontUrl) => (
        <link
          key={fontUrl}
          rel="preload"
          href={fontUrl}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
      <script dangerouslySetInnerHTML={{ __html: EARLY_VIEWPORT_HEIGHT_SCRIPT }} />
    </>
  );
}
