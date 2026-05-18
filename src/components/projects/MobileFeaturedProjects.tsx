import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types/proyectos";
import type { HeaderThemeToken } from "@/types/site";

const SINGLE_COLUMN_GRID_MEDIA_QUERY = "(max-width: 639px)";
const TWO_COLUMN_GRID_MEDIA_QUERY = "(min-width: 640px) and (max-width: 1023px)";
const THREE_COLUMN_GRID_MEDIA_QUERY = "(min-width: 1024px) and (max-width: 1169px)";

type FeaturedProjectItem = {
  href: string;
  image: ProjectImage;
  ariaLabel: string;
  title: string;
};

type MobileFeaturedProjectsProps = {
  items: FeaturedProjectItem[];
  ctaLabel: string;
  headerTheme?: HeaderThemeToken;
  className?: string;
};

export function MobileFeaturedProjects({
  items,
  ctaLabel,
  headerTheme,
  className,
}: MobileFeaturedProjectsProps) {
  return (
    <div className={className}>
      <div className={cn("grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3")}>
        {items.map((item, index) => (
          <article
            key={item.href}
            className="relative block w-full"
          >
            <Link
              href={item.href}
              className="group flex w-full flex-col gap-6"
              aria-label={item.ariaLabel}
            >
              <div className="relative aspect-3/4 w-full overflow-hidden bg-muted">
                {headerTheme ? (
                  <>
                    <span
                      data-header-theme={headerTheme}
                      data-header-theme-media-query={SINGLE_COLUMN_GRID_MEDIA_QUERY}
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10"
                    />
                    {index % 2 === 1 ? (
                      <span
                        data-header-theme={headerTheme}
                        data-header-theme-media-query={TWO_COLUMN_GRID_MEDIA_QUERY}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-10"
                      />
                    ) : null}
                    {index % 3 === 2 ? (
                      <span
                        data-header-theme={headerTheme}
                        data-header-theme-media-query={THREE_COLUMN_GRID_MEDIA_QUERY}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-10"
                      />
                    ) : null}
                  </>
                ) : null}
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  loading={index < 4 ? "eager" : undefined}
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
    </div>
  );
}
