"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types/proyectos";

type FeaturedProjectItem = {
  href: string;
  image: ProjectImage;
  ariaLabel: string;
  title: string;
};

type MobileFeaturedProjectsProps = {
  items: FeaturedProjectItem[];
  ctaLabel: string;
  className?: string;
};

export function MobileFeaturedProjects({
  items,
  ctaLabel,
  className,
}: MobileFeaturedProjectsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, idx) => (
        <article key={item.href} className="relative block w-full">
          <Link
            href={item.href}
            className="group flex w-full flex-col gap-6"
            aria-label={item.ariaLabel}
          >
            <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={idx === 0}
              />
            </div>

            <div className="flex w-full flex-col gap-3 px-1">
              <div className="flex w-full justify-between gap-1">
                <span className="min-w-0 flex-1 line-clamp-2 text-[11px] font-bold uppercase leading-[1.35] tracking-widest text-secondary">
                  {item.title}
                </span>
                <span className="flex shrink-0 items-center gap-1 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-paper/60 transition-colors duration-300 group-hover:text-paper">
                  {ctaLabel}
                  <span className="text-[12px] transition-transform duration-300 group-hover:translate-x-0.5">
                    {">"}
                  </span>
                </span>
              </div>
              <div className="h-px w-full bg-paper/20 transition-colors duration-300 group-hover:bg-paper" />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
