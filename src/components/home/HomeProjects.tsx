"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { PageHeroTitle } from "@/components/shared/PageHeroTitle";
import { ContactReviewsMarquee } from "@/components/shared/ContactReviewsMarquee";
import { homeHero } from "@/content/home/hero";
import { cn } from "@/lib/utils";
import type { HomeProjectStats, HomeProjectsContent } from "@/types/home";
import type { ContactReviewsContent } from "@/types/site";

interface HomeProjectsProps {
  content: HomeProjectsContent;
  projectStats: HomeProjectStats;
  reviewsContent: ContactReviewsContent;
}

const DESKTOP_PROJECT_TRACK_GAP = 150;
const BASE_PROJECT_STICKY_SCROLL_VH = 100;
const MOBILE_HERO_STACK_TAIL_VH = 10;
const PROJECT_VIEWPORT_UNIT = "var(--vh, 1vh)";
const PROJECT_STATS_ENDPOINT = "/api/project-stats";
const [heroImage] = homeHero.images;

type HomeProjectsWrapperStyle = CSSProperties & {
  "--home-projects-hero-overlap-mobile": string;
  "--home-projects-hero-overlap-desktop": string;
};

const homeProjectsWrapperStyle: HomeProjectsWrapperStyle = {
  "--home-projects-hero-overlap-mobile": `min(calc(100vw * ${heroImage.mobile.height / heroImage.mobile.width}), calc(${PROJECT_VIEWPORT_UNIT} * 100))`,
  "--home-projects-hero-overlap-desktop": `min(calc(100vw * ${heroImage.desktop.height / heroImage.desktop.width}), calc(${PROJECT_VIEWPORT_UNIT} * 100))`,
};

function isHomeProjectStats(value: unknown): value is HomeProjectStats {
  if (!value || typeof value !== "object") {
    return false;
  }

  const maybeStats = value as Partial<HomeProjectStats>;

  return (
    typeof maybeStats.workCount === "string" &&
    typeof maybeStats.workCountAriaLabel === "string"
  );
}

export function HomeProjects({
  content,
  projectStats,
  reviewsContent,
}: HomeProjectsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [resolvedProjectStats, setResolvedProjectStats] = useState(projectStats);

  const projectTrackViewportSpanVh =
    BASE_PROJECT_STICKY_SCROLL_VH + MOBILE_HERO_STACK_TAIL_VH;
  const wrapperFallbackHeight = `calc(${PROJECT_VIEWPORT_UNIT} * 300)`;

  useLayoutEffect(() => {
    const syncTrackHeight = () => {
      const nextTrackHeight =
        trackRef.current?.getBoundingClientRect().height ??
        trackRef.current?.offsetHeight ??
        0;

      if (!wrapperRef.current || nextTrackHeight <= 0) {
        return;
      }

      wrapperRef.current.style.height =
        `calc(${nextTrackHeight}px + ${DESKTOP_PROJECT_TRACK_GAP}px + (${PROJECT_VIEWPORT_UNIT} * ${projectTrackViewportSpanVh}))`;
    };

    syncTrackHeight();

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(() => {
        window.requestAnimationFrame(syncTrackHeight);
      });

    if (trackRef.current) {
      resizeObserver?.observe(trackRef.current);
    }

    return () => {
      resizeObserver?.disconnect();
    };
  }, [projectTrackViewportSpanVh]);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const syncProjectStats = async () => {
      try {
        const response = await fetch(PROJECT_STATS_ENDPOINT, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const nextProjectStats: unknown = await response.json();

        if (!isActive || !isHomeProjectStats(nextProjectStats)) {
          return;
        }

        setResolvedProjectStats((currentProjectStats) =>
          currentProjectStats.workCount === nextProjectStats.workCount &&
          currentProjectStats.workCountAriaLabel === nextProjectStats.workCountAriaLabel
            ? currentProjectStats
            : nextProjectStats
        );
      } catch {
        if (controller.signal.aborted) {
          return;
        }
      }
    };

    syncProjectStats();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const displayWorkCount = resolvedProjectStats.workCount.startsWith("+")
    ? resolvedProjectStats.workCount
    : `+${resolvedProjectStats.workCount.replace(/^\++/, "")}`;
  return (
    <div
      ref={wrapperRef}
      className="relative z-10 bg-muted -mt-(--home-projects-hero-overlap-mobile) lg:-mt-(--home-projects-hero-overlap-desktop)"
      style={{
        ...homeProjectsWrapperStyle,
        height: wrapperFallbackHeight,
      }}
    >
      <div
        className="sticky top-0 overflow-hidden bg-muted"
        style={{ minHeight: `calc(${PROJECT_VIEWPORT_UNIT} * 100)` }}
      >
        <div ref={trackRef} className="relative">
          <section
            className="flex items-center bg-muted py-[clamp(96px,10vw,96px)] text-paper"
            style={{ minHeight: `calc(${PROJECT_VIEWPORT_UNIT} * 100)` }}
          >
            <div className="mx-auto flex w-full flex-col py-0 gap-24">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-[clamp(28px,6vw,52px)] px-6 py-0 pb-[clamp(56px,10vw,96px)]">
                <div className="flex flex-col items-center gap-[clamp(16px,3vw,24px)] text-center">
                  <div className="inline-grid justify-items-center">
                    <div
                      className="translate-x-[4%] justify-self-end text-[clamp(44px,8vw,124px)] font-semibold leading-none text-paper"
                      aria-label={content.badgeAriaLabel}
                    >
                      {content.badgeText}
                    </div>
                    <Link
                      href={content.titleHref}
                      aria-label={content.titleAriaLabel}
                      className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/70"
                    >
                      <PageHeroTitle
                        title={content.title}
                        className="text-paper transition-opacity duration-200 group-hover:text-secondary group-focus-visible:opacity-80"
                      />
                    </Link>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col items-center gap-1 text-[clamp(18px,3.2vw,28px)] font-light uppercase leading-[clamp(24px,4.2vw,38px)] tracking-[-0.03em]",
                    )}
                  >
                    {content.subtitleLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-[clamp(12px,2.5vw,20px)]">
                  <div className="flex flex-col gap-[clamp(14px,3vw,22px)]">
                    <div className="flex flex-row items-end justify-between">
                      <div className="relative inline-grid items-center">
                        <span
                          className="sr-only"
                        >
                          {resolvedProjectStats.workCountAriaLabel}
                        </span>
                        <span
                          aria-hidden="true"
                          className="inline-flex shrink-0 items-center whitespace-nowrap text-[clamp(44px,10vw,124px)] font-semibold leading-none text-paper tabular-nums"
                        >
                          {displayWorkCount}
                        </span>
                      </div>
                      <div className="shrink-0 max-w-[clamp(100px,22vw,240px)] overflow-hidden">
                        <Image
                          src={content.tableImage.src}
                          alt={content.tableImage.alt}
                          width={content.tableImage.width}
                          height={content.tableImage.height}
                          loading={content.tableImage.loading}
                          fetchPriority="high"
                          sizes="(min-width: 1024px) 240px, (min-width: 640px) 180px, 140px"
                          className="h-auto w-[clamp(100px,22vw,240px)]"
                        />
                      </div>
                    </div>
                    <div className="h-px w-full bg-paper/60" />
                  </div>

                  <div className="ml-auto mt-10 max-w-lg">
                    <p className="space-y-3 text-[clamp(18px,4.8vw,33px)] font-normal leading-none tracking-[-0.03em] text-paper text-justify">
                      {content.descriptionLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              <ContactReviewsMarquee
                title={reviewsContent.title}
                description={reviewsContent.description}
                sectionAriaLabel={reviewsContent.sectionAriaLabel}
                ratingAriaLabelSuffix={reviewsContent.ratingAriaLabelSuffix}
                reviewsLinkLabel={reviewsContent.reviewsLinkLabel}
                reviewsLinkHref={reviewsContent.reviewsLinkHref}
                reviews={reviewsContent.reviews}
                variant="homeCompact"
                className="w-full py-0"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
