"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { PageHeroTitle } from "@/components/shared/PageHeroTitle";
import { cn } from "@/lib/utils";
import type { HomeProjectStats, HomeProjectsContent } from "@/types/home";

interface HomeProjectsProps {
  content: HomeProjectsContent;
  projectStats: HomeProjectStats;
  isMobile: boolean;
  viewportHeight: number;
}

interface AnimatedWorkCountProps {
  value: string;
  ariaLabel: string;
  shouldAnimate: boolean;
  className?: string;
}

interface RollingCharacterProps {
  value: string;
  slotIndex: number;
  isDigit: boolean;
}

const DIGIT_PATTERN = /^\d$/;
const SLOT_STEP_MS = 88;
const SLOT_ENTRY_STAGGER_MS = 70;
const SLOT_BASE_SPINS = 5;
const SLOT_SPIN_STAGGER = 2;
const DIGIT_TRAVEL = "65%";
const SLOT_START_DELAY_MS = 300;
const DESKTOP_PROJECT_TRACK_GAP = 150;

const DIGIT_TRANSITION = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
} as const;

const buildInitialCount = (value: string) =>
  value.split("").map((character) => (DIGIT_PATTERN.test(character) ? "0" : character));

const splitWorkCount = (value: string) => {
  const match = value.match(/^(\D*)(\d+)(.*)$/);

  if (!match) {
    return {
      prefix: "",
      digits: "",
      suffix: value,
    };
  }

  return {
    prefix: match[1] ?? "",
    digits: match[2] ?? "",
    suffix: match[3] ?? "",
  };
};

function RollingCharacter({ value, slotIndex, isDigit }: RollingCharacterProps) {
  if (!isDigit) {
    return <span>{value}</span>;
  }

  return (
    <span className="relative inline-flex h-[1.02em] w-[0.62em] items-center justify-center overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={`${slotIndex}-${value}`}
          initial={{ y: DIGIT_TRAVEL, opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: `-${DIGIT_TRAVEL}`, opacity: 0 }}
          transition={DIGIT_TRANSITION}
          className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AnimatedWorkCount({
  value,
  ariaLabel,
  shouldAnimate,
  className,
}: AnimatedWorkCountProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasAnimatedRef = useRef(false);
  const { prefix, digits, suffix } = splitWorkCount(value);
  const [displayedCharacters, setDisplayedCharacters] = useState(() => buildInitialCount(digits));

  useEffect(() => {
    if (!hasAnimatedRef.current) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      setDisplayedCharacters(digits ? digits.split("") : []);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [digits]);

  useEffect(() => {
    if (!shouldAnimate || hasAnimatedRef.current) {
      return;
    }

    hasAnimatedRef.current = true;

    if (!digits) {
      return;
    }

    const targetCharacters = digits.split("");
    const timeoutIds: number[] = [];

    if (shouldReduceMotion) {
      const finalTimeoutId = window.setTimeout(() => {
        setDisplayedCharacters(targetCharacters);
      }, 0);

      timeoutIds.push(finalTimeoutId);

      return () => {
        timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      };
    }

    targetCharacters.forEach((character, slotIndex) => {
      if (!DIGIT_PATTERN.test(character)) {
        return;
      }

      const slotDelay = slotIndex * SLOT_ENTRY_STAGGER_MS;
      const spinSteps = SLOT_BASE_SPINS + slotIndex * SLOT_SPIN_STAGGER;

      for (let step = 0; step < spinSteps; step += 1) {
        const timeoutId = window.setTimeout(() => {
          setDisplayedCharacters((currentCharacters) => {
            const nextCharacters = [...currentCharacters];
            nextCharacters[slotIndex] = String((step + slotIndex * 3) % 10);
            return nextCharacters;
          });
        }, SLOT_START_DELAY_MS + slotDelay + step * SLOT_STEP_MS);

        timeoutIds.push(timeoutId);
      }

      const finalTimeoutId = window.setTimeout(() => {
        setDisplayedCharacters((currentCharacters) => {
          const nextCharacters = [...currentCharacters];
          nextCharacters[slotIndex] = character;
          return nextCharacters;
        });
      }, SLOT_START_DELAY_MS + slotDelay + spinSteps * SLOT_STEP_MS);

      timeoutIds.push(finalTimeoutId);
    });

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [digits, shouldAnimate, shouldReduceMotion]);

  return (
    <span
      aria-label={ariaLabel}
      className={cn("inline-flex shrink-0 items-center whitespace-nowrap leading-none tabular-nums", className)}
    >
      <span aria-hidden="true" className="inline-flex items-center whitespace-nowrap">
        {prefix ? <span>{prefix}</span> : null}
        {displayedCharacters.map((character, slotIndex) => (
          <RollingCharacter
            key={`work-count-${slotIndex}`}
            value={character}
            slotIndex={slotIndex}
            isDigit={DIGIT_PATTERN.test(digits[slotIndex] ?? "")}
          />
        ))}
        {suffix ? <span>{suffix}</span> : null}
      </span>
    </span>
  );
}

export function HomeProjects({ content, projectStats, isMobile, viewportHeight }: HomeProjectsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const workCountRowRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState(0);
  const shouldAnimateWorkCount = useInView(workCountRowRef, {
    once: true,
    amount: 0.75,
    margin: "0px 0px -20% 0px",
  });

  useEffect(() => {
    const syncTrackHeight = () => {
      const nextTrackHeight = trackRef.current?.offsetHeight ?? 0;
      setTrackHeight((currentHeight) => (currentHeight === nextTrackHeight ? currentHeight : nextTrackHeight));
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
  }, [isMobile, viewportHeight]);

  const projectTrackGap = isMobile ? 0 : DESKTOP_PROJECT_TRACK_GAP;
  const wrapperHeight = trackHeight + viewportHeight + projectTrackGap;

  return (
    <div
      className="relative mt-[calc(var(--vh,1vh)*-100)]"
      style={{
        height: wrapperHeight ? `${wrapperHeight}px` : "300vh",
      }}
    >
      <div
        className="sticky top-0 overflow-hidden min-h-[calc(var(--vh,1vh)*100)]"
      >
        <div ref={trackRef} className="relative">
          <section
            className="flex items-center bg-muted py-[clamp(56px,10vw,96px)] text-paper min-h-[calc(var(--vh,1vh)*100)]"
          >
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
                  <div ref={workCountRowRef} className="flex flex-row items-end justify-between">
                    <div className="relative inline-grid items-center">
                      <AnimatedWorkCount
                        value={projectStats.workCount}
                        ariaLabel={projectStats.workCountAriaLabel}
                        shouldAnimate={shouldAnimateWorkCount}
                        className="text-[clamp(44px,10vw,124px)] font-semibold text-paper"
                      />
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
          
          <div
            aria-hidden="true"
            className={cn(
              "absolute left-0 w-full bg-(--color-muted) pointer-events-none",
              isMobile ? "-bottom-[20vh] h-[22vh]" : "-bottom-[10vh] h-[10.5vh]",
            )}
          />
        </div>
      </div>
    </div>
  );
}
