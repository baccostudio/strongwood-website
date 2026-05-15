export interface GoogleReviewItem {
  id: string;
  authorName: string;
  rating: number;
  publishedAt: string;
  text: string;
}

export interface ContactReviewsContent {
  title: string;
  description: string;
  sectionAriaLabel: string;
  ratingAriaLabelSuffix: string;
  reviewsLinkLabel: string;
  reviewsLinkHref: string;
  reviews: GoogleReviewItem[];
}
