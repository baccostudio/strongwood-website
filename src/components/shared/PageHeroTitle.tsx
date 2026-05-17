import { cn } from "@/lib/utils";

interface PageHeroTitleProps {
  title: string;
  className?: string;
}

function formatHeroTitle(title: string) {
  return title.replace(/\(/g, "( ").replace(/\)/g, " )");
}

export function PageHeroTitle({ title, className }: PageHeroTitleProps) {
  return (
    <h1
      className={cn(
        "text-center font-semibold uppercase tracking-[-0.03em] text-paper",
        "text-[clamp(34px,5.6vw,94px)] leading-[clamp(40px,5vw,70px)]",
        className
      )}
    >
      {formatHeroTitle(title)}
    </h1>
  );
}
