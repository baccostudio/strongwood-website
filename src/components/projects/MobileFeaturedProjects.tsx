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
  className?: string;
};

export function MobileFeaturedProjects({ items, className }: MobileFeaturedProjectsProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 py-12", className)}>
      {items.map((item, idx) => (
        <article key={item.href} className="relative block w-full">
          <Link
            href={item.href}
            className="group flex w-full flex-col gap-6"
            aria-label={item.ariaLabel}
          >
            <div className="relative aspect-3/4 w-full overflow-hidden bg-(--color-muted)">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                priority={idx === 0}
              />
            </div>

            <div className="flex w-full flex-col gap-3 px-1">
              <div className="flex w-full gap-1 justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-(--color-secondary) line-clamp-1">
                  {item.title}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-(--color-paper)/60 transition-colors duration-300 group-hover:text-(--color-paper) flex items-center gap-1">
                  VER PROYECTO
                  <span className="text-[12px] transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
              <div className="h-px w-full bg-(--color-paper)/20 transition-colors duration-300 group-hover:bg-(--color-paper)" />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
