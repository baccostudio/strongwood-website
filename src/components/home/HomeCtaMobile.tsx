"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import type { HomeCtaContent } from "@/types/home";
import {
  CTA_CTA_Y_PROGRESS,
  CTA_GALLERY_SCALE_PROGRESS,
  CTA_SEQUENCE_STAGGER_STEP,
  CTA_SEQUENCE_TRANSIT_DURATION,
} from "./home-cta-motion";

interface HomeCtaMobileProps {
  content: HomeCtaContent;
  scrollYProgress: MotionValue<number>;
  className?: string;
}

const CTA_MOBILE_REVERSE_EXIT_LEAD = 0.08;

const CTA_MOBILE_REVERSE_EXIT_SPRING = {
  stiffness: 340,
  damping: 34,
  mass: 0.22,
};

function MobileGalleryItem({
  img,
  index,
  scrollYProgress,
}: {
  img: HomeCtaContent["gallery"][number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const isWideTile = index === 0 || index === 9;
  const imageSizes = isWideTile ? "calc(100vw - 5rem)" : "calc(50vw - 2.75rem)";
  const tStart = index * CTA_SEQUENCE_STAGGER_STEP;
  const tEnd = tStart + CTA_SEQUENCE_TRANSIT_DURATION;

  const movementMap = [
    { axis: "Y", sign: -1 },
    { axis: "X", sign: -1 },
    { axis: "X", sign: 1 },
    { axis: "X", sign: -1 },
    { axis: "X", sign: 1 },
    { axis: "X", sign: -1 },
    { axis: "X", sign: 1 },
    { axis: "X", sign: -1 },
    { axis: "X", sign: 1 },
    { axis: "Y", sign: 1 },
  ] as const;

  const move = movementMap[index % movementMap.length];
  const DISTANCE = 280;

  const initialX = move.axis === "X" ? move.sign * DISTANCE : 0;
  const initialY = move.axis === "Y" ? move.sign * DISTANCE : 0;

  const rawX = useTransform(scrollYProgress, [tStart, tEnd], [initialX, 0], { clamp: true });
  const rawY = useTransform(scrollYProgress, [tStart, tEnd], [initialY, 0], { clamp: true });

  return (
    <motion.div
      style={{
        opacity: 1,
        x: shouldReduceMotion ? 0 : rawX,
        y: shouldReduceMotion ? 0 : rawY,
      }}
      className={cn(
        "relative bg-zinc-900 overflow-hidden shadow-2xl rounded-sm transform-gpu will-change-transform",
        isWideTile ? "col-span-2 aspect-video" : "col-span-1 aspect-square",
      )}
    >
      <Image
        src={img.src}
        alt="Proyecto de Strongwood"
        fill
        className="object-cover"
        sizes={imageSizes}
        priority={index === 0}
      />
    </motion.div>
  );
}

export function HomeCtaMobile({ content, scrollYProgress, className }: HomeCtaMobileProps) {
  const cleanLabel = (content.label || "").replace(/[()]/g, "");
  const shouldReduceMotion = useReducedMotion();
  const previousProgress = useRef(scrollYProgress.get());
  const reverseExitLeadTarget = useMotionValue(0);
  const reverseExitLead = useSpring(reverseExitLeadTarget, CTA_MOBILE_REVERSE_EXIT_SPRING);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const previous = previousProgress.current;

    if (latest < previous - 0.0005) {
      reverseExitLeadTarget.set(CTA_MOBILE_REVERSE_EXIT_LEAD);
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
    [1, 1.012, 1.1],
    { clamp: true },
  );
  const progressWidth = useTransform(effectiveScrollYProgress, [0, 1], ["0%", "100%"], { clamp: true });
  const ctaY = useTransform(effectiveScrollYProgress, CTA_CTA_Y_PROGRESS, [12, 0, -6], { clamp: true });
  const barOpacity = useTransform(effectiveScrollYProgress, [0.03, 0.09, 0.92, 1], [0, 1, 1, 0], { clamp: true });
  const barY = useTransform(effectiveScrollYProgress, [0.03, 0.09, 1], [6, 0, -4], { clamp: true });

  return (
    <div className={cn("relative w-full h-full flex flex-col items-center justify-center p-4 pointer-events-auto", className)}>
      <motion.div
        className="absolute top-24 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-[200]"
        style={{
          opacity: barOpacity,
          y: shouldReduceMotion ? 0 : barY,
        }}
      >
        <div className="w-24 h-px bg-white/10 overflow-hidden">
          <motion.div className="h-full bg-white/60" style={{ width: progressWidth }} />
        </div>
      </motion.div>

      <motion.div
        style={{ scale: shouldReduceMotion ? 1 : galleryScale }}
        className="relative w-full px-6 grid grid-cols-2 gap-2 z-10 transform-gpu will-change-transform"
      >
        {content.gallery.slice(0, 10).map((img, i) => (
          <MobileGalleryItem
            key={img.src}
            img={img}
            index={i}
            scrollYProgress={effectiveScrollYProgress}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute left-0 right-0 flex justify-center px-8 z-[300] isolate"
        style={{
          opacity: 1,
          y: shouldReduceMotion ? 0 : ctaY,
        }}
      >
        <Link
          href={content.href}
          className="w-full max-w-[280px] inline-flex items-center justify-center border border-white/20 bg-black/80 text-center px-6 py-5 text-[13px] font-medium uppercase tracking-[0.2em] text-white active:bg-white active:text-black transition-all"
        >
          {cleanLabel}
        </Link>
      </motion.div>
    </div>
  );
}
