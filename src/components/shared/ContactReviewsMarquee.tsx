"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { GoogleReviewItem } from "@/types/site";
import Link from "next/link";

interface ContactReviewsMarqueeProps {
  title: string;
  description: string;
  sectionAriaLabel: string;
  ratingAriaLabelSuffix: string;
  reviewsLinkLabel: string;
  reviewsLinkHref: string;
  reviews: GoogleReviewItem[];
  className?: string;
}

interface ReviewCardsGroupProps {
  reviews: ReviewCardsGroupItem[];
  ratingAriaLabelSuffix: string;
  isClone?: boolean;
}

interface ReviewCardsGroupItem extends GoogleReviewItem {
  publishedAtLabel: string;
}

const MINIMUM_LOOP_ITEMS = 6;

const clampRating = (rating: number) => Math.min(5, Math.max(1, Math.round(rating)));

const getCalendarMonthDifference = (publishedAt: Date, currentDate: Date) => {
  const publishedYear = publishedAt.getUTCFullYear();
  const publishedMonth = publishedAt.getUTCMonth();
  const currentYear = currentDate.getUTCFullYear();
  const currentMonth = currentDate.getUTCMonth();

  return Math.max(
    0,
    (currentYear - publishedYear) * 12 + (currentMonth - publishedMonth)
  );
};

const getPublishedAtLabel = (publishedAtValue: string, currentDate: Date) => {
  if (!publishedAtValue) {
    return "";
  }

  const publishedAt = new Date(`${publishedAtValue}T00:00:00Z`);

  if (Number.isNaN(publishedAt.getTime())) {
    return "";
  }

  const monthDifference = Math.max(
    1,
    getCalendarMonthDifference(publishedAt, currentDate)
  );

  if (monthDifference < 12) {
    return monthDifference === 1
      ? "Hace 1 mes"
      : `Hace ${monthDifference} meses`;
  }

  const yearDifference = Math.floor(monthDifference / 12);

  return yearDifference === 1
    ? "Hace 1 a\u00f1o"
    : `Hace ${yearDifference} a\u00f1os`;
};

const buildLoopReviews = (reviews: GoogleReviewItem[]) => {
  if (reviews.length === 0) {
    return [];
  }

  const targetCount = Math.max(reviews.length, MINIMUM_LOOP_ITEMS);
  const loopReviews: GoogleReviewItem[] = [];

  while (loopReviews.length < targetCount) {
    loopReviews.push(reviews[loopReviews.length % reviews.length]);
  }

  return loopReviews;
};

const getInitials = (authorName: string) =>
  authorName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0))
    .join("")
    .toUpperCase();

function ReviewStarIcon({ isFilled }: { isFilled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={cn(
        "size-4",
        isFilled ? "fill-(--color-review-star)" : "fill-(--color-footer-divider)",
      )}
    >
      <path d="M10 1.5l2.51 5.09 5.62.82-4.06 3.96.96 5.6L10 14.33l-5.03 2.64.96-5.6L1.87 7.41l5.62-.82L10 1.5z" />
    </svg>
  );
}

function ReviewCardsGroup({
  reviews,
  ratingAriaLabelSuffix,
  isClone = false,
}: ReviewCardsGroupProps) {
  return (
    <div className="flex shrink-0 gap-5 pr-5 my-8" aria-hidden={isClone}>
      {reviews.map((review, index) => {
        const safeRating = clampRating(review.rating);

        return (
          <article
            key={`${review.id}-${isClone ? "clone" : "primary"}-${index}`}
            tabIndex={isClone ? -1 : 0}
            className={cn(
              "flex h-full w-[clamp(280px,78vw,360px)] shrink-0 flex-col gap-2 rounded-[28px] border border-(--color-footer-divider) bg-surface p-6 text-foreground shadow-sm",
              "outline-none transition-transform duration-200",
              // !isClone && "focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary",
            )}
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold uppercase tracking-[0.08em] text-paper">
                {getInitials(review.authorName)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[18px] font-semibold leading-[120%] tracking-[-0.03em]">
                  {review.authorName}
                </p>
                {review.publishedAt ? (
                  <p
                    suppressHydrationWarning
                    className="mt-1 text-sm leading-none tracking-[-0.02em] text-muted"
                  >
                    {review.publishedAtLabel}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <div className="flex shrink-0 items-center gap-1 rounded-full py-2">
                <span className="sr-only">{`${safeRating} ${ratingAriaLabelSuffix}`}</span>
                {Array.from({ length: 5 }, (_, starIndex) => (
                  <ReviewStarIcon
                    key={`${review.id}-star-${starIndex}`}
                    isFilled={starIndex < safeRating}
                  />
                ))}
              </div>
              <p
                title={review.text}
                className="overflow-hidden text-[14px] lg:text-[16px] leading-[160%] tracking-[-0.02em] text-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
              >
                {review.text}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function ContactReviewsMarquee({
  title,
  description,
  sectionAriaLabel,
  ratingAriaLabelSuffix,
  reviewsLinkLabel,
  reviewsLinkHref,
  reviews,
  className,
}: ContactReviewsMarqueeProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 60 * 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const loopReviews = buildLoopReviews(reviews);
  const reviewsWithLabels = useMemo<ReviewCardsGroupItem[]>(
    () =>
      loopReviews.map((review) => ({
        ...review,
        publishedAtLabel: getPublishedAtLabel(review.publishedAt, currentDate),
      })),
    [currentDate, loopReviews]
  );

  if (reviews.length === 0) {
    return null;
  }

  const trackStyle = {
    "--contact-reviews-duration": `${Math.max(28, reviewsWithLabels.length * 6)}s`,
  } as CSSProperties;

  return (
    <section className={cn("bg-surface pb-[clamp(56px,10vw,96px)]", className)}>
      <div className="mx-auto flex w-full flex-col items-center">
        <div className="max-w-6xl w-full px-6">
          <div className="flex max-w-3xl flex-col gap-2">
            <h2 className="max-w-3xl uppercasetext-foreground uppercase sm:text-[34px] lg:text-[35px] text-[clamp(22px,3vw,30px)] font-semibold leading-none tracking-[-0.04em]">
              {title}
            </h2>
            <p className="text-(--color-step-subtitle) text-[clamp(18px,2.4vw,22px)] font-normal leading-5 tracking-[-0.03em]">
              {description}
              <Link
                href={reviewsLinkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors text-primary hover:text-foreground inline-flex font-medium"
              >
                {reviewsLinkLabel}
              </Link>
            </p>
          </div>
        </div>
        <div className="max-w-500 w-full lg:px-6">
          <div
            tabIndex={0}
            aria-label={sectionAriaLabel}
            className={cn(
              "contact-reviews-marquee no-scrollbar relative overflow-hidden px-6 outline-none",
              // "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
            )}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-surface to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-surface to-transparent" />

            <div className="contact-reviews-track flex w-max" style={trackStyle}>
              <ReviewCardsGroup
                reviews={reviewsWithLabels}
                ratingAriaLabelSuffix={ratingAriaLabelSuffix}
              />
              <ReviewCardsGroup
                reviews={reviewsWithLabels}
                ratingAriaLabelSuffix={ratingAriaLabelSuffix}
                isClone
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
