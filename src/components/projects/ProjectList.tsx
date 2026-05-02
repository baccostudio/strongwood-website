import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types/proyectos";

type ProjectListItem = {
  title: string;
  href: string;
  image: ProjectImage;
  ariaLabel: string;
  subtitle: string;
  variant?: "default" | "comingSoon";
  badgeLabel?: string;
  ctaLabel?: string;
};

type ProjectListProps = {
  title: string;
  ctaLabel: string;
  items: ProjectListItem[];
  className?: string;
};

export function ProjectList({ title, ctaLabel, items, className }: ProjectListProps) {
  return (
    <section className={cn("px-6 py-[clamp(56px,10vw,96px)] sm:px-10", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8">
          <h2 className="text-[clamp(20px,3vw,28px)] font-bold uppercase leading-[100%] tracking-[-0.02em] text-(--color-foreground)">
            {title}
          </h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const isComingSoon = item.variant === "comingSoon";
              const resolvedCtaLabel = item.ctaLabel ?? ctaLabel;

              return (
                <article key={item.href} className="grid gap-4 bg-(--color-paper)">
                  <div className="relative w-full overflow-hidden aspect-2/3">
                    {isComingSoon ? (
                      <span className="absolute right-4 top-4 z-10 rounded-full border border-(--color-muted) bg-(--color-paper) text-(--color-muted) px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
                        {item.badgeLabel ?? resolvedCtaLabel}
                      </span>
                    ) : null}
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className={cn("object-cover")}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </div>
                  <div className="grid gap-3">
                    <p className="text-[12px] font-semibold uppercase leading-[100%] tracking-[0.08em] text-(--color-muted)">
                      {item.subtitle}
                    </p>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
                      <h3 className="min-w-0 text-[22px] font-bold uppercase leading-[100%] tracking-[-0.02em] text-(--color-foreground) truncate">
                        {item.title}
                      </h3>
                      {isComingSoon ? (
                        <span className="justify-self-end text-right text-[12px] font-semibold uppercase leading-[100%] tracking-[0.08em] text-(--color-muted) whitespace-nowrap">
                          {resolvedCtaLabel}
                        </span>
                      ) : (
                        <Link
                          href={item.href}
                          aria-label={item.ariaLabel}
                          className="justify-self-end text-right text-[12px] font-semibold uppercase leading-[100%] tracking-[0.08em] text-(--color-foreground) whitespace-nowrap"
                        >
                          {resolvedCtaLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
