import { getImageProps } from "next/image";
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
    <picture className="block w-full">
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
        className="block h-auto w-full select-none"
      />
    </picture>
  );
}

export function HomeHeroStack({ content }: HomeHeroStackProps) {
  return (
    <section data-home-hero-stack className="relative z-20 w-full bg-transparent overflow-hidden rounded-b-[70px]">
      {content.images.map((image, index) => (
        <div
          key={image.desktop.src}
          className="relative"
        >
          <ResponsiveHeroImage image={image} isPriority={index === 0} />
          <div className="absolute inset-0 bg-black/30" />
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <StrongwoodLogo
              width={812}
              height={155}
              color="white"
              aria-hidden="true"
              className="w-70 lg:w-100"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 z-20">
            <HomeHeroOverlay
              label={content.label}
              marqueeItems={content.marqueeItems}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
