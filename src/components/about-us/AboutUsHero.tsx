import { PageHero } from "@/components/shared/PageHero";

interface AboutUsHeroProps {
  title: string;
  subtitleLines: string[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  mobileImageSrc?: string;
  mobileImageWidth?: number;
  mobileImageHeight?: number;
  subtitleClassName?: string;
}

export function AboutUsHero({
  title,
  subtitleLines,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  mobileImageSrc,
  mobileImageWidth,
  mobileImageHeight,
  subtitleClassName,
}: AboutUsHeroProps) {
  return (
    <PageHero
      title={title}
      subtitleLines={subtitleLines}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      mobileImageSrc={mobileImageSrc}
      mobileImageWidth={mobileImageWidth}
      mobileImageHeight={mobileImageHeight}
      subtitleClassName={subtitleClassName}
    />
  );
}

