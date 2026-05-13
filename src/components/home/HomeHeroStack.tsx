import Image from "next/image";
import type { CSSProperties } from "react";
import type { HomeHeroContent, HomeHeroImageAsset } from "@/types/home";
import { HomeHeroOverlay } from "./HomeHeroOverlay";
import { cn } from "@/lib/utils";

interface HomeHeroStackProps {
  content: HomeHeroContent;
  isMobile: boolean;
}

function getHeroStackItemStyle(
  image: HomeHeroImageAsset,
  index: number,
): CSSProperties {
  return {
    top: `min(0px, calc((var(--vh, 1vh) * 100) - (100vw * ${image.height} / ${image.width})))`,
    zIndex: index + 1,
  };
}

export function HomeHeroStack({
  content,
  isMobile,
}: HomeHeroStackProps) {
  const activeImages = content.images.map((image) => ({
    alt: image.alt,
    asset: isMobile ? image.mobile : image.desktop,
  }));

  return (
    <section className="relative w-full bg-muted">
      <div className="pointer-events-none absolute inset-0 z-20">
        <div
          className="sticky top-0 w-full max-h-[calc(var(--vh,1vh)*100-9vh)] h-[calc(var(--vh,1vh)*100-9vh)]"
        >
          <HomeHeroOverlay
            label={content.label}
            marqueeItems={content.marqueeItems}
          />
        </div>
      </div>

      {activeImages.map(({ alt, asset }, index) => (
        <div
          key={asset.src}
          className="sticky"
          style={getHeroStackItemStyle(asset, index)}
        >
          <Image
            src={asset.src}
            alt={alt}
            width={asset.width}
            height={asset.height}
            sizes="100vw"
            fetchPriority={index === 0 ? "high" : undefined}
            loading={index === 0 ? "eager" : undefined}
            className={cn(
              "block h-auto w-full select-none",
              // index !== 0 && "rounded-t-[70px]",
            )}
          />
          {index !== activeImages.length - 1 && (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-black/20",
                // index !== 0 && "rounded-t-[70px]"
              )}
            />
          )}
          {index === activeImages.length - 1 && (
            <div className="pointer-events-none absolute inset-0 bg-(image:--gradient-home-hero-image-overlay)" />
          )}
        </div>
      ))}
      <div className="absolute top-full left-0 z-10 h-[8vh] w-full rounded-b-[20px] bg-black shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
    </section>
  );
}
