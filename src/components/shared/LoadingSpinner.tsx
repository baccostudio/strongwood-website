import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  ariaLabel: string;
  className?: string;
  indicatorClassName?: string;
}

export function LoadingSpinner({
  ariaLabel,
  className,
  indicatorClassName,
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={cn("flex items-center justify-center", className)}
    >
      <div
        aria-hidden="true"
        className={cn(
          "animate-spin rounded-full border-2 border-solid",
          "[border-color:color-mix(in_srgb,currentColor_24%,transparent)] [border-top-color:currentColor]",
          indicatorClassName,
        )}
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}
