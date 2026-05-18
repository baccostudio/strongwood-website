import type { Metadata } from "next";
import Image from "next/image";
import { contactReviewsContent } from "@/content/contact";
import { siteConfig } from "@/content/site";
import { ContactReviewsMarquee } from "@/components/shared/ContactReviewsMarquee";
import { buildMetadata, buildViewport } from "@/lib/seo";
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

export const viewport = buildViewport(pageContent.themeColor);

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

      <section
        data-header-theme="black"
        className="bg-surface py-[clamp(56px,10vw,96px)]"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
          <p className="max-w-3xl uppercase text-foreground sm:text-[34px] lg:text-[35px] text-[clamp(22px,3vw,30px)] font-semibold leading-none tracking-[-0.04em]">
            {pageContent.formIntro}
          </p>
          <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="w-full">
              <div className="relative w-full overflow-hidden">
                <Image
                  src="/images/contact/form-contacto-mueble-cocina-madera-a-medida.webp"
                  alt={pageContent.formImageAlt}
                  width={565}
                  height={449}
                  loading="eager"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="block h-auto w-full"
                />
                <div className="absolute inset-0 flex h-full w-full p-4 sm:p-6">
                  <div className="bg-paper flex items-center w-fit h-fit border border-(--color-contact-dialog-close-border) px-4 py-2 shadow-sm">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground">
                      {pageContent.formIncentive.label}
                    </span>
                  </div>
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
        headerTheme="black"
      />
    </main>
  );
}
