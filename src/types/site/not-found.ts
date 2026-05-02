export interface NotFoundContent {
  title: string;
  description: string;
  errorLabel: string;
  heading: string;
  hero: {
    title: string;
    subtitleLines: string[];
    imageSrc: string;
    imageAlt: string;
  };
  message: string;
  ctaLabel: string;
  ctaHref: string;
  ctaAriaLabel: string;
}
