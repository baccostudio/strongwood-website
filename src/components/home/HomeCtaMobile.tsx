"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import type { HomeCtaContent } from "@/types/home";
import {
  CTA_GALLERY_SCALE_PROGRESS,
  CTA_SEQUENCE_STAGGER_STEP,
  CTA_SEQUENCE_TRANSIT_DURATION,
} from "./home-cta-motion";

interface HomeCtaMobileProps {
  content: HomeCtaContent;
  scrollYProgress: MotionValue<number>;
}

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

export function HomeCtaMobile({ content, scrollYProgress }: HomeCtaMobileProps) {
  const cleanLabel = content.label.replace(/[()]/g, "");
  const shouldReduceMotion = useReducedMotion();

  const galleryScale = useTransform(
    scrollYProgress,
    CTA_GALLERY_SCALE_PROGRESS,
    [1, 1.012, 1.08],
    { clamp: true },
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center pointer-events-auto">
      <motion.div
        style={{ scale: shouldReduceMotion ? 1 : galleryScale }}
        className="relative grid w-full grid-cols-2 gap-2 px-6 pointer-events-none transform-gpu will-change-transform"
      >
        {content.gallery.slice(0, 10).map((img, i) => (
          <MobileGalleryItem
            key={img.src}
            img={img}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute left-0 right-0 flex justify-center px-8 isolate pointer-events-auto"
        style={{
          opacity: 1,
        }}
      >
        <Link
          href={content.href}
          aria-label={content.ariaLabel}
          className="w-full max-w-70 inline-flex items-center justify-center border border-white/20 bg-black/80 text-center px-6 py-5 text-[13px] font-medium uppercase tracking-[0.2em] text-white active:bg-white active:text-black transition-colors"
        >
          {cleanLabel}
        </Link>
      </motion.div>
    </div>
  );
}
