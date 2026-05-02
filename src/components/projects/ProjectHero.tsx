import Image from "next/image";
import { cn } from "@/lib/utils";
import { HeroTitleWrapper } from "@/components/shared/HeroTitleWrapper";
import { PageHeroTitle } from "@/components/shared/PageHeroTitle";
import type { ProjectImage } from "@/types/proyectos";

type ProjectHeroProps = {
  title: string;
  subtitle: string;
  image: ProjectImage;
  className?: string;
};

export function ProjectHero({ title, subtitle, image, className }: ProjectHeroProps) {
  return (
    <section
      className={cn(
        "relative h-[70vh] min-h-120 overflow-hidden sm:min-h-150",
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18, 26, 19, 0.08) 0%, #121A13 100%)" }} />
      <HeroTitleWrapper className="z-20 flex flex-col items-center gap-2">
        <p className="text-center text-[clamp(34px,6vw,68px)] font-semibold uppercase leading-14 tracking-[-0.03em] text-(--color-paper)">
          {subtitle}
        </p>
        <PageHeroTitle title={`(${title})`} className="leading-[clamp(40px,5vw,70px)]" />
      </HeroTitleWrapper>
    </section>
  );
}
