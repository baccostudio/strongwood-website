import Link from "next/link";
import { headerThemeConfig } from "@/content/site/header-theme";
import { notFoundContent } from "@/content/site/not-found";

const pageContent = notFoundContent;

export default function NotFound() {
  return (
    <main
      data-header-theme-default={headerThemeConfig.notFoundTheme}
      className="flex min-h-180 flex-col items-center justify-center bg-surface"
    >
      <section className="py-[clamp(56px,10vw,96px)] text-center">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6">
          <header className="space-y-3">
            <p className="text-[clamp(32px,2vw,56px)] font-bold uppercase tracking-widest text-foreground)">
              {pageContent.errorLabel}
            </p>
          </header>
          <div>
            {pageContent.message}
          </div>
          <div>
            <Link
              href={pageContent.ctaHref}
              aria-label={pageContent.ctaAriaLabel}
              className="mt-5 inline-flex min-h-16 min-w-50 items-center justify-center bg-black px-[clamp(18px,3vw,30px)] py-[clamp(10px,3vw,20px)] text-[clamp(13px,2vw,20px)] font-medium uppercase leading-[clamp(20px,3.2vw,38px)] tracking-[0.01em] text-paper"
            >
              {pageContent.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
