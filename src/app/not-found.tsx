import Link from "next/link";
import { notFoundContent } from "@/content/site/not-found";

const pageContent = notFoundContent;

export default function NotFound() {
  return (
    <main className="flex min-h-180 flex-col justify-center items-center">
      <section className="py-[clamp(56px,10vw,96px)] text-center">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6">
          <header className="space-y-3">
            <p className="text-[clamp(32px,2vw,56px)] font-bold uppercase tracking-widest text-(--color-foreground)">
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
              className="inline-flex min-h-16 min-w-50 items-center justify-center bg-black px-[clamp(18px,3vw,30px)] py-[clamp(10px,3vw,20px)] text-[clamp(13px,2vw,20px)] font-medium uppercase leading-[clamp(20px,3.2vw,38px)] tracking-[0.01em] text-(--color-paper) mt-5"
            >
              {pageContent.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
