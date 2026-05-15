import type { OgImage } from "./metadata";

export interface PageContent {
  title: string;
  description: string;
  heading: string;
  ogImage: OgImage;
}

export interface ContactFormField {
  id: string;
  placeholder: string;
  type?: "text" | "email" | "tel";
  maxLength: number;
  errorMessage: string;
  isRequired: boolean;
}

export interface ContactSelectField {
  id: string;
  placeholder: string;
  options: string[];
  errorMessage: string;
  isRequired: boolean;
}

export interface ContactTextareaField {
  id: string;
  placeholder: string;
  rows: number;
  maxLength: number;
  errorMessage: string;
  isRequired: boolean;
}

export interface ContactHeroContent {
  title: string;
  subtitleLines: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface ContactNotificationEmailContent {
  subject: string;
  intro: string;
  fullNameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  serviceTypeLabel: string;
  messageLabel: string;
  emptyPhoneValue: string;
}

export interface ContactFormIncentiveContent {
  label: string;
}

export interface ContactFeedbackDialogVariantContent {
  title: string;
  description: string;
}

export interface ContactFeedbackDialogContent {
  closeLabel: string;
  success: ContactFeedbackDialogVariantContent;
  error: ContactFeedbackDialogVariantContent;
}

export type ContactFormSubmissionStatus =
  | "idle"
  | "success"
  | "error"
  | "validation";

export interface ContactFormActionState {
  status: ContactFormSubmissionStatus;
  message: string | null;
}

export interface ContactPageContent extends PageContent {
  hero: ContactHeroContent;
  formIntro: string;
  formImageAlt: string;
  formIncentive: ContactFormIncentiveContent;
  formFields: ContactFormField[];
  formSelect: ContactSelectField;
  formTextarea: ContactTextareaField;
  submitLabel: string;
  submitLoadingLabel: string;
  validationMessage: string;
  feedbackDialog: ContactFeedbackDialogContent;
  notificationEmail: ContactNotificationEmailContent;
  selectIconSrc: string;
  selectIconAlt: string;
  submitIconSrc: string;
  submitIconHoverSrc?: string;
  submitIconAlt: string;
}

export interface AboutUsHeroContent {
  title: string;
  subtitleLines: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface AboutUsIntroParagraph {
  text: string;
  highlightText?: string;
}

export interface AboutUsIntroContent {
  label: string;
  location: string;
  paragraphs: AboutUsIntroParagraph[];
}

export interface AboutUsMosaicImage {
  src: string;
  alt: string;
}

export interface AboutUsMosaicContent {
  images: AboutUsMosaicImage[];
}

export interface AboutUsPageContent extends PageContent {
  hero: AboutUsHeroContent;
  intro: AboutUsIntroContent;
  mosaic: AboutUsMosaicContent;
}

export interface PagesConfig {
  proyectos: PageContent;
  nosotros: AboutUsPageContent;
  contact: ContactPageContent;
}
