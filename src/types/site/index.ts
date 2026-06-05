import type { FooterConfig, FooterLink, SocialLink } from "./footer";
import type { HeaderConfig } from "./header";
import type {
  HeaderThemeConfig,
  HeaderThemeMatchMode,
  HeaderThemeRenderKind,
  HeaderThemeRenderState,
  HeaderThemeRouteDefault,
  HeaderThemeSolidState,
  HeaderThemeSplitHorizontalState,
  HeaderThemeToken,
  HeaderThemeViewportMode,
} from "./header-theme";
import type { SiteMetadata } from "./metadata";
import type { NotFoundContent } from "./not-found";
import type { ContactReviewsContent, GoogleReviewItem } from "./contact-reviews";
import type { SiteThemeColors, ThemeColor } from "./theme-color";
import type {
  AboutUsHeroContent,
  AboutUsIntroContent,
  AboutUsIntroParagraph,
  AboutUsMosaicContent,
  AboutUsMosaicImage,
  ContactFeedbackDialogContent,
  ContactFeedbackDialogVariantContent,
  ContactFormActionState,
  AboutUsPageContent,
  ContactFormField,
  ContactFormIncentiveContent,
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
import type { WhatsappFloatingButtonConfig } from "./whatsapp";

export interface SiteConfig {
  metadata: SiteMetadata;
  header: HeaderConfig;
  headerTheme: HeaderThemeConfig;
  footer: FooterConfig;
  tracking: SiteTrackingConfig;
  pages: PagesConfig;
  whatsappFloatingButton: WhatsappFloatingButtonConfig;
}

export type {
  AboutUsHeroContent,
  AboutUsIntroContent,
  AboutUsIntroParagraph,
  AboutUsMosaicContent,
  AboutUsMosaicImage,
  AboutUsPageContent,
  ContactFeedbackDialogContent,
  ContactFeedbackDialogVariantContent,
  ContactFormActionState,
  ContactFormField,
  ContactFormIncentiveContent,
  ContactFormSubmissionStatus,
  ContactReviewsContent,
  ContactNotificationEmailContent,
  ContactPageContent,
  ContactSelectField,
  ContactTextareaField,
  FooterConfig,
  FooterLink,
  GoogleReviewItem,
  HeaderConfig,
  HeaderThemeConfig,
  HeaderThemeMatchMode,
  HeaderThemeRenderKind,
  HeaderThemeRenderState,
  HeaderThemeRouteDefault,
  HeaderThemeSolidState,
  HeaderThemeSplitHorizontalState,
  HeaderThemeToken,
  HeaderThemeViewportMode,
  FacebookPixelConfig,
  GoogleTagManagerConfig,
  NotFoundContent,
  PageContent,
  PagesConfig,
  SiteMetadata,
  SiteThemeColors,
  SiteTrackingConfig,
  SocialLink,
  ThemeColor,
  WhatsappFloatingButtonConfig,
};
