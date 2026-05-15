import type { Metadata } from "next";
import Image from "next/image";
import { contactReviewsContent } from "@/content/contact";
import { siteConfig } from "@/content/site";
import { ContactReviewsMarquee } from "@/components/shared/ContactReviewsMarquee";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/shared/ContactForm";
import { sendContactFormAction } from "./actions";

const pageContent = siteConfig.pages.contact;

export const metadata: Metadata = buildMetadata({
  title: pageContent.title,
  description: pageContent.description,
  canonicalPath: "/contacto",
  siteName: siteConfig.metadata.siteName,
  ogImage: pageContent.ogImage,
});

export default function ContactPage() {
  return (
    <main className="w-full">
      <PageHero
        title={pageContent.hero.title}
        subtitleLines={pageContent.hero.subtitleLines}
        imageSrc={pageContent.hero.imageSrc}
        imageAlt={pageContent.hero.imageAlt}
        imageWidth={pageContent.hero.imageWidth}
        imageHeight={pageContent.hero.imageHeight}
        mobileImageSrc={pageContent.hero.mobileImageSrc}
        mobileImageWidth={pageContent.hero.mobileImageWidth}
        mobileImageHeight={pageContent.hero.mobileImageHeight}
      />

      <section className="bg-surface py-[clamp(56px,10vw,96px)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
          <p className="max-w-3xl uppercase text-foreground sm:text-[34px] lg:text-[35px] text-[clamp(22px,3vw,30px)] font-semibold leading-none tracking-[-0.04em]">
            {pageContent.formIntro}
          </p>
          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="w-full">
              <div className="relative aspect-565/449 h-full w-full overflow-hidden">
                <Image
                  src="/images/contact/form-contacto-mueble-cocina-madera-a-medida.svg"
                  alt={pageContent.formImageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 flex sm:left-6 sm:top-6">
                  <span className="border border-(--color-contact-dialog-close-border) bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground shadow-sm">
                    {pageContent.formIncentive.label}
                  </span>
                </div>
              </div>
            </div>
            <ContactForm
              action={sendContactFormAction}
              formFields={pageContent.formFields}
              formSelect={pageContent.formSelect}
              formTextarea={pageContent.formTextarea}
              submitLabel={pageContent.submitLabel}
              submitLoadingLabel={pageContent.submitLoadingLabel}
              validationMessage={pageContent.validationMessage}
              feedbackDialog={pageContent.feedbackDialog}
              selectIconSrc={pageContent.selectIconSrc}
              selectIconAlt={pageContent.selectIconAlt}
              submitIconSrc={pageContent.submitIconSrc}
              submitIconHoverSrc={pageContent.submitIconHoverSrc}
              submitIconAlt={pageContent.submitIconAlt}
            />
          </div>
        </div>
      </section>

      <ContactReviewsMarquee
        title={contactReviewsContent.title}
        description={contactReviewsContent.description}
        sectionAriaLabel={contactReviewsContent.sectionAriaLabel}
        ratingAriaLabelSuffix={contactReviewsContent.ratingAriaLabelSuffix}
        reviewsLinkLabel={contactReviewsContent.reviewsLinkLabel}
        reviewsLinkHref={contactReviewsContent.reviewsLinkHref}
        reviews={contactReviewsContent.reviews}
      />
    </main>
  );
}
