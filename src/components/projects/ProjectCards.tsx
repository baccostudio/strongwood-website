import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProjectCard } from "@/types/proyectos";

type ProjectCardsProps = {
  materials: ProjectCard;
  process: ProjectCard;
  className?: string;
};

function ProjectInfoCard({ card }: { card: ProjectCard }) {
  return (
    <article className="bg-paper text-foreground">
      <div className="relative aspect-5/4 w-full">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          fill
          loading="eager"
          className="object-cover"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[clamp(18px,2.2vw,22px)] font-bold uppercase leading-[110%] tracking-[-0.03em]">
          {card.title}
        </h3>
        <p className="mt-3 text-[clamp(16px,2.1vw,22px)] font-normal leading-[150%] tracking-[-0.03em] text-(--color-card-body)">
          {card.text}
        </p>
      </div>
    </article>
  );
}

export function ProjectCards({ materials, process, className }: ProjectCardsProps) {
  return (
    <section className={cn("px-6 py-[clamp(56px,10vw,96px)] sm:px-10", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <ProjectInfoCard card={materials} />
          <ProjectInfoCard card={process} />
        </div>
      </div>
    </section>
  );
}
