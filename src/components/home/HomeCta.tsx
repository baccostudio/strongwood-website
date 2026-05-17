"use client";

import { useRef } from "react";
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
import {
  getHomeCtaSectionHeightVh,
  HOME_CTA_ANIMATION_SPAN_VH,
} from "./home-cta-layout";
import {
  CTA_GALLERY_SCALE_PROGRESS,
  CTA_SEQUENCE_STAGGER_STEP,
  CTA_SEQUENCE_TRANSIT_DURATION,
} from "./home-cta-motion";
import { cn } from "@/lib/utils";

interface HomeCtaProps {
  content: HomeCtaContent;
  isMobile: boolean;
}

const CTA_SCROLL_SPRING = {
  stiffness: 110,
  damping: 28,
  mass: 0.35,
};

const CTA_MOBILE_SCROLL_SPRING = {
  stiffness: 150,
  damping: 28,
  mass: 0.24,
};

const CTA_REVERSE_EXIT_LEAD = 0.1;

const CTA_REVERSE_EXIT_SPRING = {
  stiffness: 340,
  damping: 34,
  mass: 0.22,
};

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
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reverseExitLeadTarget = useMotionValue(0);
  const reverseExitLead = useSpring(reverseExitLeadTarget, CTA_REVERSE_EXIT_SPRING);
  const resolvedSectionHeightVh = getHomeCtaSectionHeightVh(isMobile);
  const resolvedAnimationEndProgress = HOME_CTA_ANIMATION_SPAN_VH / resolvedSectionHeightVh;

  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const previousProgress = useRef(rawScrollYProgress.get());
  const activeScrollYProgress = useTransform(
    rawScrollYProgress,
    [0, resolvedAnimationEndProgress],
    [0, 1],
    { clamp: true },
  );
  const scrollYProgress = useSpring(activeScrollYProgress, CTA_SCROLL_SPRING);
  const mobileScrollYProgress = useSpring(activeScrollYProgress, CTA_MOBILE_SCROLL_SPRING);

  useMotionValueEvent(rawScrollYProgress, "change", (latest) => {
    const previous = previousProgress.current;

    if (latest < previous - 0.0005) {
      reverseExitLeadTarget.set(CTA_REVERSE_EXIT_LEAD);
    } else if (latest > previous + 0.0005) {
      reverseExitLeadTarget.set(0);
    }

    previousProgress.current = latest;
  });

  const effectiveScrollYProgress = useTransform(() => {
    if (shouldReduceMotion) {
      return scrollYProgress.get();
    }

    const adjusted = scrollYProgress.get() - reverseExitLead.get();
    return Math.max(0, Math.min(1, adjusted));
  });

  const galleryScale = useTransform(
    effectiveScrollYProgress,
    CTA_GALLERY_SCALE_PROGRESS,
    [1, 1.03, 1.24],
    { clamp: true },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: `calc(var(--vh, 1vh) * ${resolvedSectionHeightVh})` }}
    >
      <div className="sticky top-0 flex h-[calc(var(--vh,1vh)*100)] w-full items-center justify-center overflow-hidden bg-black">
        {isMobile ? (
          <HomeCtaMobile content={content} scrollYProgress={mobileScrollYProgress} />
        ) : (
          <motion.div
            style={{ scale: shouldReduceMotion ? 1 : galleryScale }}
            className="absolute inset-0 flex items-center justify-center px-6 transform-gpu will-change-transform"
          >
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {content.gallery.slice(0, 3).map((img, i) => (
                  <GalleryImage
                    key={img.src}
                    src={img.src}
                    index={i}
                    scrollYProgress={effectiveScrollYProgress}
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
                    scrollYProgress={effectiveScrollYProgress}
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
                    scrollYProgress={effectiveScrollYProgress}
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
