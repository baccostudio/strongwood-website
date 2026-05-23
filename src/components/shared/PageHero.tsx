import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { PageHeroTitle } from "@/components/shared/PageHeroTitle";
import { HeroTitleWrapper } from "@/components/shared/HeroTitleWrapper";

const PAGE_HERO_MOBILE_MEDIA = "(max-width: 639px)";
const PAGE_HERO_DESKTOP_MEDIA = "(min-width: 640px)";
const PAGE_HERO_IMAGE_SIZES = "100vw";

interface PageHeroProps {
  title: string;
  subtitleLines: string[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  mobileImageSrc?: string;
  mobileImageWidth?: number;
  mobileImageHeight?: number;
  badgeText?: string;
  badgeAriaLabel?: string;
  badgeClassName?: string;
  subtitleClassName?: string;
  className?: string;
}

export function PageHero({
  title,
  subtitleLines,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  mobileImageSrc,
  mobileImageWidth,
  mobileImageHeight,
  badgeText,
  badgeAriaLabel,
  badgeClassName,
  subtitleClassName,
  className,
}: PageHeroProps) {
  const mobileHeroImage = mobileImageSrc && mobileImageWidth && mobileImageHeight
    ? {
        src: mobileImageSrc,
        width: mobileImageWidth,
        height: mobileImageHeight,
      }
    : null;

  const {
    props: { srcSet: desktopSrcSet, alt: desktopAlt, ...desktopImageProps },
  } = getImageProps({
    src: imageSrc,
    alt: imageAlt,
    width: imageWidth,
    height: imageHeight,
    priority: true,
    loading: "eager",
    fetchPriority: "high",
    sizes: PAGE_HERO_IMAGE_SIZES,
    className: "h-auto w-full",
  });

  const mobileHeroProps = mobileHeroImage
    ? getImageProps({
        src: mobileHeroImage.src,
        alt: imageAlt,
        width: mobileHeroImage.width,
        height: mobileHeroImage.height,
        priority: true,
        loading: "eager",
        fetchPriority: "high",
        sizes: PAGE_HERO_IMAGE_SIZES,
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
          media={PAGE_HERO_DESKTOP_MEDIA}
          srcSet={desktopSrcSet}
          sizes={PAGE_HERO_IMAGE_SIZES}
          width={imageWidth}
          height={imageHeight}
        />
        {mobileHeroProps && mobileHeroImage ? (
          <source
            media={PAGE_HERO_MOBILE_MEDIA}
            srcSet={mobileHeroProps.srcSet}
            sizes={PAGE_HERO_IMAGE_SIZES}
            width={mobileHeroImage.width}
            height={mobileHeroImage.height}
          />
        ) : null}
        <img
          alt={fallbackAlt}
          {...fallbackImageElementProps}
          srcSet={fallbackSrcSet}
          className="block h-auto w-full select-none"
        />
      </picture>
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 top-0 z-10 h-[calc(var(--vh,1vh)*100)] sm:bottom-0 sm:h-auto">
        <HeroTitleWrapper>
          <div className="flex flex-col items-center">
            <div className="inline-grid justify-items-center">
              {badgeText ? (
                <div
                  className={cn(
                    "text-[clamp(44px,8vw,124px)] font-semibold leading-none text-paper translate-x-[4%]",
                    badgeClassName,
                    "justify-self-end"
                  )}
                  aria-label={badgeAriaLabel ?? badgeText}
                >
                  {badgeText}
                </div>
              ) : null}
              <PageHeroTitle title={title} />
            </div>
            {subtitleLines.length > 0 ? (
              <div
                className={cn(
                  "mt-[clamp(14px,3vh,28px)] flex flex-col items-center gap-1 py-[clamp(10px,2.5vw,16px)] text-[clamp(18px,3.1vw,31px)] font-light uppercase leading-[clamp(26.7px,4.5vw,43px)] tracking-[-0.03em] text-paper",
                  subtitleClassName
                )}
              >
                {subtitleLines.map((line, index) => {
                  const words = line.trim().split(/\s+/);
                  const isTwoWordLine = words.length === 2;
                  const isMiddleLine = index > 0 && index < subtitleLines.length - 1;
                  const shouldSplitLine = isTwoWordLine && isMiddleLine;

                  return (
                    shouldSplitLine ? (
                      <div
                        key={line}
                        className="flex w-full max-w-[22.5rem] items-center justify-center gap-[clamp(6px,2vw,28px)] whitespace-nowrap sm:w-[clamp(260px,50vw,420px)] sm:max-w-none sm:justify-between"
                      >
                        {words.map((word) => (
                          <span key={`${line}-${word}`}>{word}</span>
                        ))}
                      </div>
                    ) : (
                      <p key={line}>{line}</p>
                    )
                  );
                })}
              </div>
            ) : null}
          </div>
        </HeroTitleWrapper>
      </div>
    </section>
  );
}
