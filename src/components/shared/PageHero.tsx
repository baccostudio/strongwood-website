import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { PageHeroTitle } from "@/components/shared/PageHeroTitle";
import { HeroTitleWrapper } from "@/components/shared/HeroTitleWrapper";

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
    props: { srcSet: desktopSrcSet, ...desktopImageProps },
  } = getImageProps({
    src: imageSrc,
    alt: imageAlt,
    width: imageWidth,
    height: imageHeight,
    priority: true,
    loading: "eager",
    fetchPriority: "high",
    sizes: "100vw",
    className: "h-auto w-full",
  });

  const mobileSource = mobileHeroImage
    ? getImageProps({
        src: mobileHeroImage.src,
        alt: imageAlt,
        width: mobileHeroImage.width,
        height: mobileHeroImage.height,
        priority: true,
        loading: "eager",
        fetchPriority: "high",
        sizes: "100vw",
      }).props.srcSet
    : null;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
    >
      <picture>
        {mobileSource ? <source media="(max-width: 639px)" srcSet={mobileSource} /> : null}
        <img {...desktopImageProps} srcSet={desktopSrcSet} alt={imageAlt} />
      </picture>
      <div className="absolute inset-0 bg-black/40" />
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
    </section>
  );
}

