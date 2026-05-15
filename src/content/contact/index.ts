import googleReviewsJson from "./google-reviews.json";
import type { ContactReviewsContent, GoogleReviewItem } from "@/types/site";

type RawGoogleReviewItem = Partial<GoogleReviewItem> & Record<string, unknown>;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const clampRating = (value: unknown) => {
  const parsedRating =
    typeof value === "number" ? value : Number.parseFloat(String(value));

  if (!Number.isFinite(parsedRating)) {
    return 5;
  }

  return Math.min(5, Math.max(1, Math.round(parsedRating)));
};

const normalizeGoogleReview = (
  item: unknown,
  index: number
): GoogleReviewItem | null => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const rawReview = item as RawGoogleReviewItem;

  if (!isNonEmptyString(rawReview.authorName) || !isNonEmptyString(rawReview.text)) {
    return null;
  }

  return {
    id: isNonEmptyString(rawReview.id)
      ? rawReview.id.trim()
      : `google-review-${index + 1}`,
    authorName: rawReview.authorName.trim(),
    rating: clampRating(rawReview.rating),
    publishedAt: isNonEmptyString(rawReview.publishedAt)
      ? rawReview.publishedAt.trim()
      : "",
    text: rawReview.text.trim(),
  };
};

const reviews = Array.isArray(googleReviewsJson)
  ? googleReviewsJson
      .map((item, index) => normalizeGoogleReview(item, index))
      .filter((review): review is GoogleReviewItem => review !== null)
  : [];

export const contactReviewsContent: ContactReviewsContent = {
  title: "Rese\u00f1as en Google",
  description: "Opiniones compartidas por clientes que eligieron ",
  sectionAriaLabel: "Rese\u00f1as de clientes de Strongwood en Google Maps",
  ratingAriaLabelSuffix: "de 5 estrellas",
  reviewsLinkLabel: "Strongwood en Google Maps",
  reviewsLinkHref:
    "https://www.google.com/maps/place/Strong+Wood/@-34.5923092,-58.5244842,16.74z/data=!4m6!3m5!1s0x95bcc9232cd34fa1:0x257e9eed8f3b39b7!8m2!3d-34.5929624!4d-58.5249286!16s%2Fg%2F11mdxk8k8y?entry=ttu&g_ep=EgoyMDI2MDUxMi4wIKXMDSoASAFQAw%3D%3D",
  reviews,
};
