import { cn } from "@/lib/utils";
import type { ProjectSection } from "@/types/proyectos";

type ProjectSectionsProps = {
  sections: ProjectSection[];
  className?: string;
};

export function ProjectSections({ sections, className }: ProjectSectionsProps) {
  return (
    <section className={cn("px-6 py-[clamp(56px,10vw,96px)] sm:px-10", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:gap-14">
          {sections.map((section) => (
            <div key={section.title} className="max-w-6xl">
              <h2 className="text-[clamp(20px,2.6vw,26px)] font-bold uppercase leading-[110%] tracking-[-0.03em] text-white">
                {section.title}
              </h2>
              <p className="mt-6 text-[clamp(18px,2.4vw,24px)] font-normal leading-[150%] tracking-[-0.03em] text-white">
                {section.parts.map((part, index) => (
                  <span
                    key={`${section.title}-${index}`}
                    className={part.bold ? "font-semibold" : "font-normal"}
                  >
                    {part.text}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}