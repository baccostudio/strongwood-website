import { PageHero } from "@/components/shared/PageHero";

interface AboutUsHeroProps {
  title: string;
  subtitleLines: string[];
  imageSrc: string;
  imageAlt: string;
  subtitleClassName?: string;
}

export function AboutUsHero({
  title,
  subtitleLines,
  imageSrc,
  imageAlt,
  subtitleClassName,
}: AboutUsHeroProps) {
  return (
    <PageHero
      title={title}
      subtitleLines={subtitleLines}
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      subtitleClassName={subtitleClassName}
    />
  );
}

