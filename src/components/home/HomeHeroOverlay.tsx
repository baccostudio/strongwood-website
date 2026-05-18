import type { HomeHeroContent } from "@/types/home";
import { cn } from "@/lib/utils";

interface HomeHeroOverlayProps {
  label: HomeHeroContent["label"];
  topMarqueeItems: HomeHeroContent["topMarqueeItems"];
  marqueeItems: HomeHeroContent["marqueeItems"];
}

function MarqueeLine({
  items,
  isClone = false,
}: {
  items: HomeHeroContent["marqueeItems"];
  isClone?: boolean;
}) {
  return (
    <div
      className="flex w-max shrink-0 items-center whitespace-nowrap text-[clamp(28px,5.6vw,58px)] leading-none tracking-[-0.06em] text-paper"
      aria-hidden={isClone}
    >
      {items.map((item, index) => (
        <span key={`${item.text}-${index}`} className="inline-flex items-center">
          <span
            className={cn(
              "uppercase",
              item.weight === "light" ? "font-light" : "font-semibold",
            )}
          >
            {item.text}
          </span>
          <span className="mx-[clamp(10px,2vw,20px)] font-light text-paper">/</span>
        </span>
      ))}
    </div>
  );
}

function MarqueeTrack({
  items,
  reverse = false,
}: {
  items: HomeHeroContent["marqueeItems"];
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "home-marquee-track flex w-max items-center",
        reverse && "home-marquee-track-reverse",
      )}
    >
      <MarqueeLine items={items} />
      <MarqueeLine items={items} isClone />
    </div>
  );
}

export function HomeHeroOverlay({
  label,
  topMarqueeItems,
  marqueeItems,
}: HomeHeroOverlayProps) {
  return (
    <div className="pointer-events-none flex h-full w-full flex-col justify-end overflow-hidden pb-[clamp(24px,4vw,32px)]">
      <div className="relative z-10">
        <div className="relative">
          <p className="mb-4 px-6 text-[clamp(12px,2.2vw,16px)] font-medium uppercase tracking-[0.08em] text-paper md:px-16">
            {label}
          </p>
          <div className="space-y-[clamp(8px,1vw,12px)]">
            <div className="overflow-hidden">
              <MarqueeTrack items={topMarqueeItems} reverse />
            </div>
            <div className="overflow-hidden">
              <MarqueeTrack items={marqueeItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
