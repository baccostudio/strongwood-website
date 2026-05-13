"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PageHeroTitle } from "@/components/shared/PageHeroTitle";
import { cn } from "@/lib/utils";
import type { HomeProjectStats, HomeProjectsContent } from "@/types/home";

interface HomeProjectsProps {
  content: HomeProjectsContent;
  projectStats: HomeProjectStats;
  isMobile: boolean;
}

const DESKTOP_PROJECT_TRACK_GAP = 150;
const BASE_PROJECT_STICKY_SCROLL_VH = 150;
const MOBILE_HERO_STACK_TAIL_VH = 8;

export function HomeProjects({
  content,
  projectStats,
  isMobile,
}: HomeProjectsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);

  useEffect(() => {
    const syncTrackHeight = () => {
      const nextTrackHeight = trackRef.current?.offsetHeight ?? 0;
      setTrackHeight((currentHeight) => (
        currentHeight === nextTrackHeight ? currentHeight : nextTrackHeight
      ));
    };

    syncTrackHeight();

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(() => syncTrackHeight());

    if (trackRef.current) {
      resizeObserver?.observe(trackRef.current);
    }

    return () => {
      resizeObserver?.disconnect();
    };
  }, [isMobile]);

  const projectTrackGap = isMobile ? 98 : DESKTOP_PROJECT_TRACK_GAP;
  const projectTrackViewportSpanVh = BASE_PROJECT_STICKY_SCROLL_VH + (isMobile ? MOBILE_HERO_STACK_TAIL_VH : 0);
  const wrapperHeight = trackHeight
    ? `calc(${trackHeight}px + ${projectTrackGap}px + (var(--vh, 1vh) * ${projectTrackViewportSpanVh}))`
    : "calc(var(--vh, 1vh) * 300)";

  return (
    <div
      className="relative mt-[calc(var(--vh,1vh)*-100)] bg-muted"
      style={{ height: wrapperHeight }}
    >
      <div className="sticky top-0 overflow-hidden min-h-[calc(var(--vh,1vh)*100)]">
        <div ref={trackRef} className="relative">
          <section className="flex items-center py-[clamp(56px,10vw,96px)] text-paper min-h-[calc(var(--vh,1vh)*100)]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-[clamp(28px,6vw,52px)] px-6 py-0">
              <div className="flex flex-col items-center gap-[clamp(16px,3vw,24px)] text-center">
                <div className="inline-grid justify-items-center">
                  <div
                    className="translate-x-[4%] justify-self-end text-[clamp(44px,8vw,124px)] font-semibold leading-none text-paper"
                    aria-label={content.badgeAriaLabel}
                  >
                    {content.badgeText}
                  </div>
                  <PageHeroTitle title={content.title} className="text-paper" />
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
                        aria-label={projectStats.workCountAriaLabel}
                        className="inline-flex shrink-0 items-center whitespace-nowrap text-[clamp(44px,10vw,124px)] font-semibold leading-none text-paper tabular-nums"
                      >
                        <span aria-hidden="true">{projectStats.workCount}</span>
                      </span>
                    </div>
                    <div className="shrink-0">
                      <Image
                        src={content.tableImage.src}
                        alt={content.tableImage.alt}
                        width={content.tableImage.width}
                        height={content.tableImage.height}
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
          </section>
        </div>
      </div>
    </div>
  );
}
