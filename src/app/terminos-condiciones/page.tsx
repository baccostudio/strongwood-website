import type { Metadata } from "next";
import { termsContent } from "@/content/legal";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

const pageContent = termsContent;

export const metadata: Metadata = buildMetadata({
  title: pageContent.title,
  description: pageContent.description,
  canonicalPath: "/terminos-condiciones",
  siteName: siteConfig.metadata.siteName,
  ogImage: pageContent.ogImage,
});

export default function TermsPage() {
  return (
    <main className="flex flex-col">
      <section className="pb-[clamp(56px,10vw,96px)] pt-[clamp(125px,10vw,96px)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <header className="space-y-3">
            <p className="text-[clamp(14px,2vw,18px)] font-medium uppercase tracking-widest text-(--color-muted)">
              {pageContent.updatedLabel}
            </p>
            <h1 className="text-[clamp(28px,5vw,44px)] font-medium uppercase tracking-[-0.02em] text-(--color-foreground)">
              {pageContent.heading}
            </h1>
          </header>

          <div className="space-y-10">
            {pageContent.sections.map((section) => (
              <article key={section.title} className="space-y-4">
                <h2 className="text-[clamp(20px,3vw,28px)] font-medium uppercase tracking-[-0.02em] text-(--color-foreground)">
                  {section.title}
                </h2>
                <div className="space-y-3 text-[clamp(16px,2.4vw,19px)] font-light leading-[clamp(24px,3.2vw,30px)] text-(--color-foreground)">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.listItems ? (
                  <ul className="list-disc space-y-2 pl-6 text-[clamp(16px,2.4vw,19px)] font-light text-(--color-foreground)">
                    {section.listItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
