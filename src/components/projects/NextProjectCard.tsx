import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { HeaderThemeToken } from "@/types/site";
import type { ProjectImage } from "@/types/proyectos";

type NextProjectCardProps = {
  label: string;
  title: string;
  href: string;
  image: ProjectImage;
  ariaLabel: string;
  icon: ProjectImage;
  headerTheme?: HeaderThemeToken;
  headerThemeOverride?: HeaderThemeToken;
  headerThemeOverrideMediaQuery?: string;
  className?: string;
};

export function NextProjectCard({
  label,
  title,
  href,
  image,
  ariaLabel,
  icon,
  headerTheme,
  headerThemeOverride,
  headerThemeOverrideMediaQuery,
  className,
}: NextProjectCardProps) {
  return (
    <section className="px-6 sm:px-10 pb-12 lg:pb-24">
      <div
        data-header-theme={headerTheme}
        className={cn("py-[clamp(56px,10vw,96px)]", className)}
      >
        <div className="mx-auto max-w-6xl">
          <div
            data-header-theme={headerThemeOverride}
            data-header-theme-media-query={headerThemeOverrideMediaQuery}
            className="grid items-stretch gap-6 bg-(--project-next-card) p-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)] lg:gap-0 lg:p-0"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:p-6">
            <div>
              <p className="text-[16px] lg:text-[20px] font-normal uppercase leading-[100%] tracking-[-0.03em] text-foreground">
                {label}
              </p>
              <h3 className="mt-4 text-[clamp(28px,4.6vw,56px)] font-semibold uppercase leading-[100%] tracking-[-0.03em] text-foreground">
                {title}
              </h3>
            </div>
            <Link
              href={href}
              aria-label={ariaLabel}
              className="flex h-14 w-14 items-center justify-center border border-black bg-transparent text-black lg:h-14 lg:w-14"
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={icon.width}
                height={icon.height}
                className="w-5 lg:w-8"
                loading="eager"
              />
            </Link>
          </div>
            <div className="relative h-50 w-full overflow-hidden lg:h-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                loading="eager"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
