"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PageHeroTitle } from "@/components/shared/PageHeroTitle";
import { cn } from "@/lib/utils";
import type { HomeProjectStatsResponse, HomeProjectsContent } from "@/types/home";

interface HomeProjectsProps {
  content: HomeProjectsContent;
}

interface AnimatedWorkCountProps {
  value: string;
  ariaLabel: string;
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
const WORK_COUNT_FETCH_TIMEOUT_MS = 2500;

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

function isHomeProjectStatsResponse(value: unknown): value is HomeProjectStatsResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<HomeProjectStatsResponse>;

  return (
    typeof candidate.workCount === "string" &&
    typeof candidate.workCountAriaLabel === "string" &&
    typeof candidate.isFallback === "boolean"
  );
}

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
  className,
}: AnimatedWorkCountProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: true, amount: 0.55 });
  const hasAnimatedRef = useRef(false);
  const { prefix, digits, suffix } = splitWorkCount(value);
  const [displayedCharacters, setDisplayedCharacters] = useState(() => buildInitialCount(digits));

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) {
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
  }, [digits, isInView, shouldReduceMotion]);

  return (
    <span
      ref={containerRef}
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

export function HomeProjects({ content }: HomeProjectsProps) {
  const [resolvedWorkCount, setResolvedWorkCount] = useState<{
    value: string;
    ariaLabel: string;
  } | null>(null);
  const [isWorkCountLoading, setIsWorkCountLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), WORK_COUNT_FETCH_TIMEOUT_MS);
    let isCancelled = false;

    const resolveFallback = () => {
      if (isCancelled) {
        return;
      }

      setResolvedWorkCount({
        value: content.workCount,
        ariaLabel: content.workCountAriaLabel,
      });
      setIsWorkCountLoading(false);
    };

    const fetchProjectStats = async () => {
      try {
        const response = await fetch("/api/project-stats", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unexpected response status: ${response.status}`);
        }

        const payload: unknown = await response.json();

        if (!isHomeProjectStatsResponse(payload)) {
          throw new Error("Invalid project stats payload.");
        }

        if (isCancelled) {
          return;
        }

        setResolvedWorkCount({
          value: payload.workCount,
          ariaLabel: payload.workCountAriaLabel,
        });
        setIsWorkCountLoading(false);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          resolveFallback();
          return;
        }

        resolveFallback();
      } finally {
        if (!isCancelled) {
          window.clearTimeout(timeoutId);
        }
      }
    };

    void fetchProjectStats();

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [content.workCount, content.workCountAriaLabel]);

  return (
    <section
      className="flex items-center bg-(--color-muted) py-[clamp(56px,10vw,96px)] text-(--color-paper)"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-[clamp(28px,6vw,52px)] px-6 py-0">
        <div className="flex flex-col items-center gap-[clamp(16px,3vw,24px)] text-center">
          <div className="inline-grid justify-items-center">
            <div
              className="translate-x-[4%] justify-self-end text-[clamp(44px,8vw,124px)] font-semibold leading-none text-(--color-paper)"
              aria-label={content.badgeAriaLabel}
            >
              {content.badgeText}
            </div>
            <PageHeroTitle title={content.title} className="text-(--color-paper)" />
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
                {isWorkCountLoading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="invisible text-[clamp(44px,10vw,124px)] font-semibold leading-none whitespace-nowrap tabular-nums text-(--color-paper)"
                    >
                      {content.workCount}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <LoadingSpinner
                        ariaLabel={content.workCountLoadingAriaLabel}
                        className="text-(--color-paper)"
                        indicatorClassName="h-8 w-8 border-[3px]"
                      />
                    </div>
                  </>
                ) : resolvedWorkCount ? (
                  <AnimatedWorkCount
                    key={resolvedWorkCount.value}
                    value={resolvedWorkCount.value}
                    ariaLabel={resolvedWorkCount.ariaLabel}
                    className="text-[clamp(44px,10vw,124px)] font-semibold text-(--color-paper)"
                  />
                ) : null}
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
            <div className="h-px w-full bg-(--color-paper)/60" />
          </div>

          <div className="ml-auto mt-10 max-w-lg">
            <p className="space-y-3 text-[clamp(18px,4.8vw,33px)] font-normal leading-none tracking-[-0.03em] text-(--color-paper) text-justify">
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
  );
}
