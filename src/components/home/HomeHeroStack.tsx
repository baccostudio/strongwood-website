import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import {
  HOME_HERO_DESKTOP_MEDIA,
  HOME_HERO_IMAGE_SIZES,
  HOME_HERO_MOBILE_MEDIA,
} from "@/lib/preloader";
import type {
  HomeHeroContent,
  HomeHeroResponsiveImage,
} from "@/types/home";
import StrongwoodLogo from "../icons/strongwood-logo";
import { HomeHeroOverlay } from "./HomeHeroOverlay";

interface HomeHeroStackProps {
  content: HomeHeroContent;
}

interface HeroStackItemStyle extends CSSProperties {
  "--hero-aspect-mobile": string;
  "--hero-aspect-desktop": string;
}

function getHeroStackItemStyle(
  image: HomeHeroResponsiveImage,
): HeroStackItemStyle {
  return {
    "--hero-aspect-mobile": `${image.mobile.width} / ${image.mobile.height}`,
    "--hero-aspect-desktop": `${image.desktop.width} / ${image.desktop.height}`,
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
    <section className="relative z-20 w-full bg-muted">
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="sticky top-0 h-[calc(var(--vh,1vh)*100)] w-full">
          <div className="relative h-full w-full overflow-hidden rounded-b-[70px]">
            <HomeHeroOverlay
              label={content.label}
              marqueeItems={content.marqueeItems}
            />
          </div>
        </div>
      </div>

      {content.images.map((image, index) => (
        <div
          key={image.desktop.src}
          className="relative rounded-b-[70px] overflow-hidden"
          style={getHeroStackItemStyle(image)}
        >
          <ResponsiveHeroImage image={image} isPriority={index === 0} />
          <div className="absolute inset-0 bg-black/30" />
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center h-svh">
            <StrongwoodLogo
              width={812}
              height={155}
              color="white"
              aria-hidden="true"
              className="w-70 lg:lg:w-100"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
