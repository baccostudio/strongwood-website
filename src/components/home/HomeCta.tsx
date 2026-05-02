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
  stiffness: 95,
  damping: 26,
  mass: 0.42,
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
  className,
}: {
  src: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  priority?: boolean;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Keep the sequence but give each item a slightly longer settling window.
  const STAGGER_STEP = 0.06;
  const TRANSIT_DURATION = 0.32;

  const tStart = index * STAGGER_STEP;
  const tEnd = tStart + TRANSIT_DURATION;

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
        opacity: 1,
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
      />
    </motion.div>
  );
}

export function HomeCta({ content, isMobile }: HomeCtaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const reverseExitLeadTarget = useMotionValue(0);
  const reverseExitLead = useSpring(reverseExitLeadTarget, CTA_REVERSE_EXIT_SPRING);

  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  const previousProgress = useRef(rawScrollYProgress.get());
  const scrollYProgress = useSpring(rawScrollYProgress, CTA_SCROLL_SPRING);
  const mobileScrollYProgress = useSpring(rawScrollYProgress, CTA_MOBILE_SCROLL_SPRING);

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

  const galleryScale = useTransform(effectiveScrollYProgress, [0, 0.45, 0.95], [1, 1.03, 1.24], { clamp: true });
  const progressWidth = useTransform(effectiveScrollYProgress, [0, 1], ["0%", "100%"], { clamp: true });
  const ctaY = useTransform(effectiveScrollYProgress, [0.08, 0.18, 1], [24, 0, -10], { clamp: true });
  const barOpacity = useTransform(effectiveScrollYProgress, [0.03, 0.09, 0.94, 1], [0, 1, 1, 0], { clamp: true });
  const barY = useTransform(effectiveScrollYProgress, [0.03, 0.09, 1], [12, 0, -8], { clamp: true });

  return (
    <section
      ref={containerRef}
      className="relative w-full z-20 bg-black"
      style={{ height: "calc(var(--vh, 1vh) * 250)" }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden flex items-center justify-center bg-black"
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        <div className="absolute -bottom-[10vh] left-0 w-full h-[10.5vh] bg-inherit pointer-events-none" />

        {isMobile ? (
          <HomeCtaMobile content={content} scrollYProgress={mobileScrollYProgress} />
        ) : (
          <motion.div
            style={{ scale: shouldReduceMotion ? 1 : galleryScale }}
            className="absolute inset-0 z-10 flex items-center justify-center px-6 transform-gpu will-change-transform"
          >
            <div className="w-full max-w-6xl">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {content.gallery.slice(0, 3).map((img, i) => (
                  <GalleryImage
                    key={img.src}
                    src={img.src}
                    index={i}
                    scrollYProgress={effectiveScrollYProgress}
                    priority
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
                    className="aspect-4/3 shadow-2xl"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {!isMobile && (
          <motion.div
            className="absolute inset-x-0 z-200 flex justify-center px-6 isolate"
            style={{
              opacity: 1,
              y: shouldReduceMotion ? 0 : ctaY,
            }}
          >
            <Link
              href={content.href}
              aria-label={content.ariaLabel}
              className="inline-flex items-center justify-center border border-(--color-paper)/20 bg-black/80 text-center px-14 py-6 text-[clamp(14px,2vw,16px)] font-medium uppercase tracking-[0.3em] text-(--color-paper) transition-all hover:bg-(--color-paper) hover:text-black group"
            >
              <span className="relative flex items-center gap-4">
                {content.label.replace(/[()]/g, "")}
              </span>
            </Link>
          </motion.div>
        )}

        {!isMobile && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-200"
            style={{
              opacity: barOpacity,
              y: shouldReduceMotion ? 0 : barY,
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="h-px w-48 bg-(--color-paper)/10 overflow-hidden">
                <motion.div className="h-full bg-(--color-paper)/60" style={{ width: progressWidth }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
