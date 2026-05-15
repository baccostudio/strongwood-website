"use client";

import { useEffect, useId, useRef } from "react";
import type { ContactFeedbackDialogContent } from "@/types/site";
import { cn } from "@/lib/utils";

interface ContactFeedbackDialogProps {
  isOpen: boolean;
  isClosing: boolean;
  variant: "success" | "error";
  content: ContactFeedbackDialogContent;
  onClose: () => void;
}

const DIALOG_AUTO_CLOSE_MS = 7000;

export function ContactFeedbackDialog({
  isOpen,
  isClosing,
  variant,
  content,
  onClose,
}: ContactFeedbackDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const autoCloseTimeoutId = window.setTimeout(() => {
      onClose();
    }, DIALOG_AUTO_CLOSE_MS);
    const frameId = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(autoCloseTimeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [isOpen, onClose, variant]);

  if (!isOpen) {
    return null;
  }

  const variantContent = content[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-(--color-dialog-overlay) backdrop-blur-[10px] backdrop-saturate-125",
          isClosing
            ? "animate-[dialog-overlay-out_220ms_ease-in_forwards]"
            : "animate-[dialog-overlay-in_180ms_ease-out]"
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn(
          "relative z-10 w-full max-w-136 border border-(--color-contact-dialog-border) bg-paper px-5 py-5 shadow-2xl sm:px-6 sm:py-6",
          isClosing
            ? "animate-[dialog-content-out_220ms_ease-in_forwards]"
            : "animate-[dialog-content-in_220ms_ease-out]"
        )}
      >
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-3">
            <div className="space-y-3">
              <p
                id={titleId}
                className="text-[24px] font-medium leading-[0.92] tracking-[-0.04em] text-foreground sm:text-[28px]"
              >
                {variantContent.title}
              </p>
              <p id={descriptionId} className="text-[16px] leading-6 text-muted">
                {variantContent.description}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={content.closeLabel}
            className="relative flex h-8 w-8 shrink-0 items-center justify-center border border-(--color-contact-dialog-close-border) bg-foreground transition-colors duration-200 hover:bg-foreground/90 focus-visible:outline-none"
          >
            <span aria-hidden="true" className="absolute h-px w-3 rotate-45 bg-paper" />
            <span aria-hidden="true" className="absolute h-px w-3 -rotate-45 bg-paper" />
          </button>
        </div>
      </div>
    </div>
  );
}
