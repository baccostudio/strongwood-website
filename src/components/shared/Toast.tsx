"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  variant: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
  autoCloseMs?: number;
}

const EXIT_ANIMATION_MS = 220;

export function Toast({
  message,
  variant,
  isOpen,
  onClose,
  autoCloseMs = 3500,
}: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const resetId = window.setTimeout(() => {
      setIsLeaving(false);
    }, 0);

    const timeout = window.setTimeout(() => {
      setIsLeaving(true);
      window.setTimeout(() => {
        onClose();
      }, EXIT_ANIMATION_MS);
    }, autoCloseMs);

    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(resetId);
    };
  }, [isOpen, autoCloseMs, onClose]);

  if (!isOpen) {
    return null;
  }

  const isSuccess = variant === "success";
  const iconSrc = isSuccess
    ? "/images/icons/circle-success-icon.svg"
    : "/images/icons/circle-error-icon.svg";

  return (
    <div className="pointer-events-none fixed inset-x-4 top-6 z-50 flex justify-end">
      <div
        className={cn(
          "pointer-events-auto flex max-w-95 items-center gap-2 border px-4 py-4 text-[14px] font-medium uppercase tracking-[-0.02em] shadow-xs",
          isSuccess
            ? "border-(--color-success-soft-border) bg-(--color-success-soft-bg) text-(--color-success-soft-text)"
            : "border-(--color-info-soft-border) bg-(--color-info-soft-bg) text-(--color-info-soft-text)",
          isLeaving
            ? "animate-[toast-out_220ms_ease-in_forwards]"
            : "animate-[toast-in_220ms_ease-out_forwards]"
        )}
        role="status"
        aria-live="polite"
      >
        <span
          className={cn(
            "flex h-5 w-5 items-center justify-center shrink-0",
            isSuccess
              ? "text-(--color-primary)"
              : "text-(--color-info-soft-text)"
          )}
        >
          <Image src={iconSrc} alt="" width={20} height={20} />
        </span>
        <span className="leading-none translate-y-px">{message}</span>
      </div>
    </div>
  );
}
