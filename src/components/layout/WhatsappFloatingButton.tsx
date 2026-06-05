import Image from "next/image";
import type { WhatsappFloatingButtonConfig } from "@/types/site";
import { cn } from "@/lib/utils";

interface WhatsappFloatingButtonProps extends WhatsappFloatingButtonConfig {
  className?: string;
}

export function WhatsappFloatingButton({
  href,
  label,
  ariaLabel,
  title,
  iconImageSrc,
  iconAlt,
  className,
}: WhatsappFloatingButtonProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex h-dvh items-end justify-end px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:px-6 sm:pb-[calc(env(safe-area-inset-bottom)+1.5rem)] lg:px-8",
        className,
      )}
    >
      <a
        href={href}
        aria-label={ariaLabel}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-button pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full transition duration-200 hover:scale-105 focus-visible:outline-none sm:h-16 sm:w-16"
      >
        <Image
          src={iconImageSrc}
          alt={iconAlt}
          width={32}
          height={32}
          className="h-7 w-7 brightness-0 invert sm:h-8 sm:w-8"
        />
        <span className="sr-only">{label}</span>
      </a>
    </div>
  );
}
