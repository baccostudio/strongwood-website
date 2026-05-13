import type { FooterConfig, FooterLink, SocialLink } from "./footer";
import type { HeaderConfig } from "./header";
import type { SiteMetadata } from "./metadata";
import type { NotFoundContent } from "./not-found";
import type {
  AboutUsHeroContent,
  AboutUsIntroContent,
  AboutUsIntroParagraph,
  AboutUsMosaicContent,
  AboutUsMosaicImage,
  ContactFormActionState,
  AboutUsPageContent,
  ContactFormField,
  ContactFormSubmissionStatus,
  ContactNotificationEmailContent,
  ContactPageContent,
  ContactSelectField,
  ContactTextareaField,
  PageContent,
  PagesConfig,
} from "./pages";
import type {
  FacebookPixelConfig,
  GoogleTagManagerConfig,
  SiteTrackingConfig,
} from "./tracking";

export interface SiteConfig {
  metadata: SiteMetadata;
  header: HeaderConfig;
  footer: FooterConfig;
  tracking: SiteTrackingConfig;
  pages: PagesConfig;
}

export type {
  AboutUsHeroContent,
  AboutUsIntroContent,
  AboutUsIntroParagraph,
  AboutUsMosaicContent,
  AboutUsMosaicImage,
  AboutUsPageContent,
  ContactFormActionState,
  ContactFormField,
  ContactFormSubmissionStatus,
  ContactNotificationEmailContent,
  ContactPageContent,
  ContactSelectField,
  ContactTextareaField,
  FooterConfig,
  FooterLink,
  HeaderConfig,
  FacebookPixelConfig,
  GoogleTagManagerConfig,
  NotFoundContent,
  PageContent,
  PagesConfig,
  SiteMetadata,
  SiteTrackingConfig,
  SocialLink,
};
