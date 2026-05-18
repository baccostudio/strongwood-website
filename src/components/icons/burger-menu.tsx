import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface BurgerMenuProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  color?: string;
}

export default function BurgerMenu({
  width = 94,
  height = 63,
  color,
  className,
  style,
  ...props
}: BurgerMenuProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 94 63"
      fill="none"
      className={cn("h-auto", className)}
      style={color ? { ...style, color } : style}
      {...props}
    >
      <path d="M0 62.9996H30.5697V32.1074H0V62.9996ZM11.9464 35.0352H18.1078V36.2147H11.9464V35.0352Z" fill="currentColor" />
      <path d="M31.7148 9.97952V62.9889H62.2845V0H31.7148V9.98788V9.97952ZM58.7906 27.3538H59.9443V33.6526H58.7906V27.3538Z" fill="currentColor" />
      <path d="M63.4307 30.8922H94.0003V0H63.4307V30.8922ZM81.8821 28.5332H75.7207V27.3538H81.8821V28.5332Z" fill="currentColor" />
    </svg>
  );
}
