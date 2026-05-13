import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import {
  HOME_HERO_DESKTOP_MEDIA,
  HOME_HERO_IMAGE_SIZES,
  HOME_HERO_MOBILE_MEDIA,
} from "@/lib/preloader";
import type {
  HomeHeroContent,
  HomeHeroImageAsset,
  HomeHeroResponsiveImage,
} from "@/types/home";
import { HomeHeroOverlay } from "./HomeHeroOverlay";
import { cn } from "@/lib/utils";

interface HomeHeroStackProps {
  content: HomeHeroContent;
}

interface HeroStackItemStyle extends CSSProperties {
  "--hero-aspect-mobile": string;
  "--hero-aspect-desktop": string;
  "--hero-top-mobile": string;
  "--hero-top-desktop": string;
}

function getHeroTopOffset(image: HomeHeroImageAsset) {
  return `min(0px, calc((var(--vh, 1vh) * 100) - (100vw * ${image.height} / ${image.width})))`;
}

function getHeroStackItemStyle(
  image: HomeHeroResponsiveImage,
  index: number,
): HeroStackItemStyle {
  return {
    "--hero-aspect-mobile": `${image.mobile.width} / ${image.mobile.height}`,
    "--hero-aspect-desktop": `${image.desktop.width} / ${image.desktop.height}`,
    "--hero-top-mobile": getHeroTopOffset(image.mobile),
    "--hero-top-desktop": getHeroTopOffset(image.desktop),
    zIndex: index + 1,
  };
}

function ResponsiveHeroImage({
  image,
  isPriority,
}: {
  image: HomeHeroResponsiveImage;
  isPriority: boolean;
}) {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    alt: image.alt,
    src: image.desktop.src,
    width: image.desktop.width,
    height: image.desktop.height,
    sizes: HOME_HERO_IMAGE_SIZES,
  });
  const {
    props: { srcSet: mobileSrcSet, alt, ...mobileImageProps },
  } = getImageProps({
    alt: image.alt,
    src: image.mobile.src,
    width: image.mobile.width,
    height: image.mobile.height,
    sizes: HOME_HERO_IMAGE_SIZES,
  });

  return (
    <picture className="block w-full aspect-(--hero-aspect-mobile) lg:aspect-(--hero-aspect-desktop)">
      <source
        media={HOME_HERO_DESKTOP_MEDIA}
        srcSet={desktopSrcSet}
        sizes={HOME_HERO_IMAGE_SIZES}
      />
      <source
        media={HOME_HERO_MOBILE_MEDIA}
        srcSet={mobileSrcSet}
        sizes={HOME_HERO_IMAGE_SIZES}
      />
      <img
        alt={alt}
        {...mobileImageProps}
        loading={isPriority ? "eager" : "lazy"}
        fetchPriority={isPriority ? "high" : undefined}
        className="block h-full w-full object-cover select-none"
      />
    </picture>
  );
}

export function HomeHeroStack({ content }: HomeHeroStackProps) {
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

      {content.images.map((image, index) => (
        <div
          key={image.desktop.src}
          className="sticky top-(--hero-top-mobile) lg:top-(--hero-top-desktop)"
          style={getHeroStackItemStyle(image, index)}
        >
          <ResponsiveHeroImage image={image} isPriority={index === 0} />
          {index !== content.images.length - 1 && (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-black/20",
                // index !== 0 && "rounded-t-[70px]"
              )}
            />
          )}
          {index === content.images.length - 1 && (
            <div className="pointer-events-none absolute inset-0 bg-(image:--gradient-home-hero-image-overlay)" />
          )}
        </div>
      ))}
      <div className="absolute top-full left-0 z-10 h-[8vh] w-full rounded-b-[20px] bg-black shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
    </section>
  );
}
