import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeaderLogoProps {
  variant: "dark" | "beige" | "white";
  alt: string;
  darkSrc: string;
  beigeSrc: string;
  whiteSrc: string;
  className?: string;
  priority?: boolean;
}

export function HeaderLogo({
  variant,
  alt,
  darkSrc,
  beigeSrc,
  whiteSrc,
  className,
  priority = false,
}: HeaderLogoProps) {
  const srcMap = {
    dark: darkSrc,
    beige: beigeSrc,
    white: whiteSrc,
  };

  return (
    <Image
      src={srcMap[variant]}
      alt={alt}
      width={94}
      height={63}
      priority={priority}
      className={cn("h-auto w-24 cursor-pointer", className)}
    />
  );
}
