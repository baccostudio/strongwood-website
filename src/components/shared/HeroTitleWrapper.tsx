import { cn } from "@/lib/utils";

interface HeroTitleWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroTitleWrapper({ children, className }: HeroTitleWrapperProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center px-6 text-center",
        className
      )}
    >
      {children}
    </div>
  );
}
