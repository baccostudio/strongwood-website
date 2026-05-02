"use client";

import { useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface WorkStepItem {
  number: string;
  title: string;
  subtitle: string;
}

interface WorkStepsProps {
  title: string;
  steps: WorkStepItem[];
  className?: string;
  children?: React.ReactNode;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delayInSeconds: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delayInSeconds,
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

function renderTitleWithParens(title: string) {
  const parts = title.split(/(\(|\))/).filter(Boolean);

  return parts.map((part, index) => {
    if (part === "(" || part === ")") {
      return (
        <span key={`${part}-${index}`} className="text-(--color-secondary)">
          {part}
        </span>
      );
    }

    return (
      <span key={`${part}-${index}`} className="text-(--color-paper)">
        {part}
      </span>
    );
  });
}

export function WorkSteps({ title, steps, className, children }: WorkStepsProps) {
  const nextStartTimeRef = useRef<number>(0);

  return (
    <section
      className={cn(
        "bg-(--color-foreground) text-(--color-paper) py-[clamp(56px,10vw,96px)]",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-0 lg:grid lg:grid-cols-[minmax(140px,220px)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(32px,8vw,155px)]">
        <h2 className="sm:w-100 text-[clamp(16px,2.4vw,20px)] font-medium uppercase tracking-widest lg:pt-6">
          {renderTitleWithParens(title)}
        </h2>
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <StepItem
              key={step.number}
              step={step}
              isLast={index === steps.length - 1}
              nextStartTimeRef={nextStartTimeRef}
            />
          ))}
        </div>
        {children ? <div className="w-full lg:col-span-2">{children}</div> : null}
      </div>
    </section>
  );
}

interface StepItemProps {
  step: WorkStepItem;
  isLast: boolean;
  nextStartTimeRef: React.MutableRefObject<number>;
}

function StepItem({ step, isLast, nextStartTimeRef }: StepItemProps) {
  const [computedDelay, setComputedDelay] = useState<number | null>(null);
  const staggerGap = 250;

  const handleViewportEnter = () => {
    if (computedDelay !== null) {
      return;
    }

    const now = Date.now();
    const nextAvailableStart = nextStartTimeRef.current || now;
    const startTime = Math.max(now, nextAvailableStart);

    nextStartTimeRef.current = startTime + staggerGap;
    setComputedDelay((startTime - now) / 1000);
  };

  return (
    <motion.div
      initial="hidden"
      animate={computedDelay !== null ? "visible" : "hidden"}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, margin: "-10%" }}
      custom={computedDelay ?? 0}
      variants={itemVariants}
      className="flex flex-col gap-3 py-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
        <span className="text-[clamp(28px,4vw,46px)] font-light leading-none tracking-[-0.04em] text-(--color-secondary)">
          ({step.number})
        </span>
        <div className="space-y-2">
          <p className="text-[clamp(22px,3vw,30px)] font-semibold leading-none tracking-[-0.04em]">
            {step.title}
          </p>
          <p className="text-(--color-step-subtitle) text-[clamp(18px,2.4vw,22px)] font-normal leading-none tracking-[-0.03em]">
            {step.subtitle}
          </p>
        </div>
      </div>
      {!isLast ? <div className="h-px w-full bg-(--color-step-divider)" /> : null}
    </motion.div>
  );
}
