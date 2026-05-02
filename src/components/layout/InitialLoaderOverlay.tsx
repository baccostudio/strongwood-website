import Image from "next/image";

import type { SitePreloader } from "@/types/site";

interface InitialLoaderOverlayProps {
  preloader: SitePreloader;
}

export function InitialLoaderOverlay({ preloader }: InitialLoaderOverlayProps) {
  return (
    <div id="initial-black-overlay">
      <Image
        src={preloader.logoSrc}
        alt={preloader.logoAlt}
        width={150}
        height={76}
        className="initial-logo w-auto"
        preload
      />
      <div className="initial-bar-container">
        <div id="initial-bar-fill" className="initial-bar"></div>
      </div>
      <div className="initial-slogan">{preloader.slogan}</div>
    </div>
  );
}
