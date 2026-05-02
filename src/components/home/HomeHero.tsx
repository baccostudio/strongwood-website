import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { isCriticalHeroImage } from "@/lib/preloader";
import type {
  HomeHeroContent,
  HomeHeroViewportMode,
  FloatingImageConfig,
  FloatingImageMotionValues,
} from "@/types/home";

interface HomeHeroProps {
  content: HomeHeroContent;
  heroViewport: HomeHeroViewportMode;
  onCriticalAssetLoad?: (src: string) => void;
}

const HERO_WORDMARK_SPRING = {
  stiffness: 220,
  damping: 30,
  mass: 0.35,
};

const HERO_IMAGE_SPRING = {
  stiffness: 260,
  damping: 34,
  mass: 0.3,
};

const FLOATING_IMAGE_SIZES = "(max-width: 1023px) 42vw, 24vw";
const MAX_PRELOADED_FLOATING_IMAGES = 2;

function MarqueeLine({ items }: { items: HomeHeroContent["marqueeItems"] }) {
  return (
    <div className="flex items-center text-[clamp(28px,5.6vw,58px)] leading-none tracking-[-0.06em] text-right whitespace-nowrap">
      {items.map((item, index) => (
        <span key={`${item.text}-${index}`} className="inline-flex items-center">
          <span
            className={cn(
              "uppercase",
              item.weight === "light" ? "font-light" : "font-medium",
            )}
          >
            {item.text}
          </span>
          <span className="mx-[clamp(10px,2vw,20px)] font-medium text-(--color-foreground)">
            /
          </span>
        </span>
      ))}
    </div>
  );
}

export function HomeHero({ content, heroViewport, onCriticalAssetLoad }: HomeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const preloadedFloatingImageSources = content.floatingImages
    .filter((img) => isCriticalHeroImage(img))
    .slice(0, MAX_PRELOADED_FLOATING_IMAGES)
    .map((img) => img.src);
  const eagerFloatingImageSources = new Set(
    content.floatingImages
      .filter((img) => img.eager)
      .map((img) => img.src),
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawLogoY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 80, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const logoY = useSpring(rawLogoY, HERO_WORDMARK_SPRING);
  const scale = useSpring(rawScale, HERO_WORDMARK_SPRING);

  return (
    <div
      ref={containerRef}
      className="relative w-full z-20 bg-(--color-paper)"
      style={{ height: "calc(var(--lvh, 1lvh) * 400)" }}
    >
      <div
        className="sticky top-0 w-full overflow-visible bg-(--color-paper)"
        style={{ height: "calc(var(--lvh, 1lvh) * 100)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {content.floatingImages.map((img, index) => (
            <FloatingImage
              key={`${img.src}-${index}`}
              img={img}
              scrollYProgress={scrollYProgress}
              heroViewport={heroViewport}
              shouldPreload={preloadedFloatingImageSources.includes(img.src)}
              shouldLoadEager={eagerFloatingImageSources.has(img.src)}
            />
          ))}
        </div>

        <motion.div
          style={{
            scale: shouldReduceMotion ? 1 : scale,
            y: shouldReduceMotion ? 0 : logoY,
          }}
          className="relative z-10 flex h-full items-center justify-center transform-gpu will-change-transform"
        >
          <div className="relative inline-block">
            <Image
              src={content.wordImage.src}
              alt={content.wordImage.alt}
              width={content.wordImage.width}
              height={content.wordImage.height}
              sizes="(min-width: 1024px) 520px, 80vw"
              className="h-auto w-[70vw] min-w-70 max-w-130"
              preload
              onLoad={() => onCriticalAssetLoad?.(content.wordImage.src)}
            />
          </div>
        </motion.div>

        {/* <div
          className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col justify-end pb-8"
          style={{ height: "calc(var(--vh, 1vh) * 100)" }}
        > */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-svh flex-col justify-end pb-8">

          <div className="relative bg-transparent">
            <div className="relative">
              {/* Fade disabled: this label now stays visible for the full hero scroll. */}
              <p className="text-[clamp(12px,2.2vw,16px)] font-medium uppercase tracking-[0.08em] text-(--color-foreground) px-16 mb-4">
                {content.label}
              </p>
              <div className="overflow-hidden">
                <div className="home-marquee-track flex w-max items-center">
                  <MarqueeLine items={content.marqueeItems} />
                  <MarqueeLine items={content.marqueeItems} />
                  <MarqueeLine items={content.marqueeItems} />
                  <MarqueeLine items={content.marqueeItems} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-full left-0 w-full h-[clamp(40px,10vh,96px)] rounded-b-[100px] shadow-[0_20px_40px_rgba(0,0,0,0.015)] bg-(--color-paper)" />
    </div>
  );
}

interface FloatingImageProps {
  img: FloatingImageConfig;
  heroViewport: HomeHeroViewportMode;
  scrollYProgress: MotionValue<number>;
  shouldPreload: boolean;
  shouldLoadEager: boolean;
}

function resolveFloatingImageMotion(
  img: FloatingImageConfig,
  heroViewport: HomeHeroViewportMode,
): FloatingImageMotionValues {
  const defaultMotion = img.motion.default;
  const mobileMotion = img.motion.mobile;
  const monitor27Motion = img.motion.monitor27;

  if (heroViewport === "monitor27" && monitor27Motion) {
    return {
      ...defaultMotion,
      ...monitor27Motion,
    };
  }

  if (heroViewport === "mobile" && mobileMotion) {
    return {
      ...defaultMotion,
      ...mobileMotion,
    };
  }

  return { ...defaultMotion };
}

function resolveFloatingImageLayout(
  img: FloatingImageConfig,
  heroViewport: HomeHeroViewportMode,
): string {
  if (heroViewport === "mobile") {
    return cn(img.layout.base, img.layout.mobile);
  }

  if (heroViewport === "monitor27") {
    return cn(img.layout.base, img.layout.desktop, img.layout.monitor27);
  }

  return cn(img.layout.base, img.layout.desktop);
}

function resolveFloatingImageZIndex(
  img: FloatingImageConfig,
  heroViewport: HomeHeroViewportMode,
): number {
  if (heroViewport === "mobile") {
    return img.zIndex.mobile ?? img.zIndex.base;
  }

  if (heroViewport === "monitor27") {
    return img.zIndex.monitor27 ?? img.zIndex.desktop ?? img.zIndex.base;
  }

  return img.zIndex.desktop ?? img.zIndex.base;
}

function FloatingImage({
  img,
  heroViewport,
  scrollYProgress,
  shouldPreload,
  shouldLoadEager,
}: FloatingImageProps) {
  const shouldReduceMotion = useReducedMotion();
  const motionConfig = resolveFloatingImageMotion(img, heroViewport);
  const layoutClassName = resolveFloatingImageLayout(img, heroViewport);
  const zIndex = resolveFloatingImageZIndex(img, heroViewport);
  const rawXPos = useTransform(scrollYProgress, motionConfig.range, motionConfig.x);
  const rawYPos = useTransform(scrollYProgress, motionConfig.range2, motionConfig.y);
  const rawRotate = useTransform(scrollYProgress, [0, 1], [0, motionConfig.r]);

  const xPos = useSpring(rawXPos, HERO_IMAGE_SPRING);
  const yPos = useSpring(rawYPos, HERO_IMAGE_SPRING);
  const rotate = useSpring(rawRotate, HERO_IMAGE_SPRING);

  return (
    <motion.div
      style={{
        x: shouldReduceMotion ? 0 : xPos,
        y: shouldReduceMotion ? 0 : yPos,
        rotate: shouldReduceMotion ? 0 : rotate,
        zIndex,
      }}
      className={cn("absolute transform-gpu will-change-transform", layoutClassName)}
    >
      <Image
        src={img.src}
        alt="Proyecto de Strongwood"
        width={1200}
        height={800}
        className="w-full h-auto object-cover"
        sizes={FLOATING_IMAGE_SIZES}
        preload={shouldPreload}
        loading={shouldLoadEager ? "eager" : shouldPreload ? undefined : "lazy"}
      />
    </motion.div>
  );
}
