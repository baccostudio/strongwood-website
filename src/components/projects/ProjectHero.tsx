import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { HeroTitleWrapper } from "@/components/shared/HeroTitleWrapper";
import { PageHeroTitle } from "@/components/shared/PageHeroTitle";
import type { ProjectImage } from "@/types/proyectos";

const PROJECT_HERO_MOBILE_MEDIA = "(max-width: 639px)";
const PROJECT_HERO_DESKTOP_MEDIA = "(min-width: 640px)";
const PROJECT_HERO_IMAGE_SIZES = "100vw";

type ProjectHeroProps = {
  title: string;
  subtitle: string;
  image: ProjectImage;
  mobileImage?: ProjectImage;
  className?: string;
};

export function ProjectHero({ title, subtitle, image, mobileImage, className }: ProjectHeroProps) {
  const {
    props: { srcSet: desktopSrcSet, alt: desktopAlt, ...desktopImageProps },
  } = getImageProps({
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    priority: true,
    loading: "eager",
    fetchPriority: "high",
    sizes: PROJECT_HERO_IMAGE_SIZES,
    className: "h-auto w-full",
  });

  const mobileHeroProps = mobileImage
    ? getImageProps({
        src: mobileImage.src,
        alt: mobileImage.alt,
        width: mobileImage.width,
        height: mobileImage.height,
        priority: true,
        loading: "eager",
        fetchPriority: "high",
        sizes: PROJECT_HERO_IMAGE_SIZES,
        className: "h-auto w-full",
      }).props
    : null;

  const fallbackImageProps = mobileHeroProps ?? { alt: desktopAlt, srcSet: desktopSrcSet, ...desktopImageProps };
  const { srcSet: fallbackSrcSet, alt: fallbackAlt, ...fallbackImageElementProps } = fallbackImageProps;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
    >
      <picture className="block w-full">
        <source
          media={PROJECT_HERO_DESKTOP_MEDIA}
          srcSet={desktopSrcSet}
          sizes={PROJECT_HERO_IMAGE_SIZES}
          width={image.width}
          height={image.height}
        />
        {mobileHeroProps && mobileImage ? (
          <source
            media={PROJECT_HERO_MOBILE_MEDIA}
            srcSet={mobileHeroProps.srcSet}
            sizes={PROJECT_HERO_IMAGE_SIZES}
            width={mobileImage.width}
            height={mobileImage.height}
          />
        ) : null}
        <img
          alt={fallbackAlt}
          {...fallbackImageElementProps}
          srcSet={fallbackSrcSet}
          className="block h-auto w-full select-none grayscale"
        />
      </picture>
      <div className="absolute inset-0 [background-image:var(--gradient-project-hero-overlay)]" />
      <HeroTitleWrapper className="z-20 flex flex-col items-center gap-2">
        <p className="text-center text-[clamp(34px,6vw,68px)] font-semibold uppercase leading-14 tracking-[-0.03em] text-paper">
          {subtitle}
        </p>
        <PageHeroTitle title={`(${title})`} className="leading-[clamp(40px,5vw,70px)]" />
      </HeroTitleWrapper>
    </section>
  );
}
