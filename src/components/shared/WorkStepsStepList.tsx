"use client";

import { useEffect, useRef } from "react";

interface WorkStepItem {
  number: string;
  title: string;
  subtitle: string;
}

interface WorkStepsStepListProps {
  steps: WorkStepItem[];
}

type StepStyle = React.CSSProperties & {
  "--work-step-delay": string;
};

export function WorkStepsStepList({ steps }: WorkStepsStepListProps) {
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter((node): node is HTMLDivElement => Boolean(node));

    if (nodes.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => (
        <div
          key={step.number}
          ref={(node) => {
            stepRefs.current[index] = node;
          }}
          className="work-step-reveal flex flex-col gap-3 py-6"
          style={{ "--work-step-delay": `${index * 140}ms` } as StepStyle}
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
          {index < steps.length - 1 ? <div className="h-px w-full bg-(--color-step-divider)" /> : null}
        </div>
      ))}
    </div>
  );
}
