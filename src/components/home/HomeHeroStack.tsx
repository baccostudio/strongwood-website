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
import { HeroTitleWrapper } from "@/components/shared/HeroTitleWrapper";
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
  const subtitleLines = content.subtitleLines ?? [];

  return (
    <section data-home-hero-stack className="relative z-20 w-full bg-paper overflow-hidden rounded-b-4xl sm:rounded-b-[70px]">
      {content.images.map((image, index) => (
        <div
          key={image.desktop.src}
          className="relative"
        >
          <ResponsiveHeroImage image={image} isPriority={index === 0} />
          <div className="absolute inset-0 bg-black/30" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[calc(var(--vh,1vh)*100)]">
            <HeroTitleWrapper>
              <div className="flex flex-col items-center">
                <StrongwoodLogo
                  width={812}
                  height={155}
                  color="white"
                  aria-hidden="true"
                  className="w-70 lg:w-100"
                />
                {subtitleLines.length > 0 ? (
                  <div className="flex flex-col items-center gap-1 py-[clamp(10px,2.5vw,16px)] text-[clamp(18px,3.1vw,31px)] font-light uppercase leading-[clamp(26.7px,4.5vw,43px)] tracking-[-0.03em] text-paper">
                    {subtitleLines.map((line) => {
                      const words = line.trim().split(/\s+/);
                      const isSplitLine = words.length === 2;

                      if (isSplitLine) {
                        return (
                          <div
                            key={line}
                            className="flex w-full max-w-90 items-center justify-center gap-[clamp(6px,2vw,28px)] whitespace-nowrap sm:w-[clamp(260px,50vw,420px)] sm:max-w-none sm:justify-between"
                          >
                            <span>{words[0]}</span>
                            <span>{words[1]}</span>
                          </div>
                        );
                      }

                      return <p key={line}>{line}</p>;
                    })}
                  </div>
                ) : null}
              </div>
            </HeroTitleWrapper>
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
