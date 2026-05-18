"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { HomeCtaContent } from "@/types/home";
import { HomeCtaMobile } from "./HomeCtaMobile";
import { getHomeCtaSectionHeightVh } from "./home-cta-layout";
import {
  CTA_COMPLETION_THRESHOLD,
  CTA_GALLERY_SCALE_PROGRESS,
  CTA_MOBILE_SCROLL_SPRING,
  CTA_SCROLL_SPRING,
  CTA_SEQUENCE_STAGGER_STEP,
  CTA_SEQUENCE_TRANSIT_DURATION,
} from "./home-cta-motion";
import { cn } from "@/lib/utils";

interface HomeCtaProps {
  content: HomeCtaContent;
  isMobile: boolean;
}

function GalleryImage({
  src,
  index,
  scrollYProgress,
  priority,
  loading,
  className,
}: {
  src: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  priority?: boolean;
  loading?: "eager";
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const tStart = index * CTA_SEQUENCE_STAGGER_STEP;
  const tEnd = tStart + CTA_SEQUENCE_TRANSIT_DURATION;

  const movementMap = [
    { axis: "X", sign: -1 },
    { axis: "Y", sign: -1 },
    { axis: "X", sign: 1 },
    { axis: "X", sign: -1 },
    { axis: "Y", sign: 1 },
    { axis: "Y", sign: 1 },
    { axis: "X", sign: 1 },
    { axis: "X", sign: -1 },
    { axis: "Y", sign: 1 },
    { axis: "X", sign: 1 },
  ] as const;

  const move = movementMap[index % movementMap.length];
  const DISTANCE = 980;

  const initialX = move.axis === "X" ? move.sign * DISTANCE : 0;
  const initialY = move.axis === "Y" ? move.sign * DISTANCE : 0;

  const x = useTransform(scrollYProgress, [tStart, tEnd], [initialX, 0], { clamp: true });
  const y = useTransform(scrollYProgress, [tStart, tEnd], [initialY, 0], { clamp: true });

  return (
    <motion.div
      style={{
        x: shouldReduceMotion ? 0 : x,
        y: shouldReduceMotion ? 0 : y,
      }}
      className={cn(
        "relative overflow-hidden rounded-sm bg-zinc-900 shadow-2xl transform-gpu will-change-transform",
        className,
      )}
    >
      <Image
        src={src}
        alt="Proyecto de Strongwood"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 33vw"
        priority={priority}
        loading={loading}
      />
    </motion.div>
  );
}

export function HomeCta({
  content,
  isMobile,
}: HomeCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const resolvedSectionHeightVh = getHomeCtaSectionHeightVh();
  const lockedScrollYProgress = useMotionValue(0);

  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const activeScrollYProgress = useSpring(
    rawScrollYProgress,
    isMobile ? CTA_MOBILE_SCROLL_SPRING : CTA_SCROLL_SPRING,
  );

  useEffect(() => {
    const initialProgress = Math.max(0, Math.min(1, activeScrollYProgress.get()));

    lockedScrollYProgress.set(Math.max(lockedScrollYProgress.get(), initialProgress));

    if (initialProgress >= CTA_COMPLETION_THRESHOLD) {
      lockedScrollYProgress.set(1);
    }
  }, [activeScrollYProgress, lockedScrollYProgress]);

  useMotionValueEvent(activeScrollYProgress, "change", (latest) => {
    const clampedProgress = Math.max(0, Math.min(1, latest));
    const nextProgress = Math.max(lockedScrollYProgress.get(), clampedProgress);

    if (lockedScrollYProgress.get() >= 1) {
      return;
    }

    if (clampedProgress >= CTA_COMPLETION_THRESHOLD) {
      lockedScrollYProgress.set(1);
      return;
    }

    lockedScrollYProgress.set(nextProgress);
  });

  const galleryScale = useTransform(
    lockedScrollYProgress,
    CTA_GALLERY_SCALE_PROGRESS,
    [1, 1.03, 1.24],
    { clamp: true },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: `calc(var(--vh, 1vh) * ${resolvedSectionHeightVh})` }}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden bg-black">
        {isMobile ? (
          <HomeCtaMobile content={content} scrollYProgress={lockedScrollYProgress} />
        ) : (
          <motion.div
            style={{ scale: shouldReduceMotion ? 1 : galleryScale }}
            className="absolute inset-0 flex items-center justify-center px-6 transform-gpu will-change-transform"
          >
            <div className="w-full max-w-6xl 2xl:max-w-[76rem]">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {content.gallery.slice(0, 3).map((img, i) => (
                  <GalleryImage
                    key={img.src}
                    src={img.src}
                    index={i}
                    scrollYProgress={lockedScrollYProgress}
                    priority={i === 0}
                    loading={i === 0 ? undefined : "eager"}
                    className="aspect-4/3 shadow-2xl"
                  />
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                {content.gallery.slice(3, 7).map((img, i) => (
                  <GalleryImage
                    key={img.src}
                    src={img.src}
                    index={i + 3}
                    scrollYProgress={lockedScrollYProgress}
                    loading="eager"
                    className="aspect-square shadow-2xl"
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {content.gallery.slice(7, 10).map((img, i) => (
                  <GalleryImage
                    key={img.src}
                    src={img.src}
                    index={i + 7}
                    scrollYProgress={lockedScrollYProgress}
                    loading="eager"
                    className="aspect-4/3 shadow-2xl"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {!isMobile && (
          <motion.div className="absolute inset-x-0 isolate flex justify-center px-6">
            <Link
              href={content.href}
              aria-label={content.ariaLabel}
              className="inline-flex items-center justify-center border border-paper/20 bg-black/80 text-center px-14 py-6 text-[clamp(14px,2vw,16px)] font-medium uppercase tracking-[0.3em] text-paper transition-colors hover:bg-paper hover:text-black group"
            >
              <span className="relative flex items-center gap-4">
                {content.label.replace(/[()]/g, "")}
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
