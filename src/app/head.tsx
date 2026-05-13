import { PRELOADER_FONT_URLS } from "@/lib/preloader";

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
    </>
  );
}
