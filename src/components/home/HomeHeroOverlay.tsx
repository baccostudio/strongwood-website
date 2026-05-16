import type { HomeHeroContent } from "@/types/home";
import { cn } from "@/lib/utils";

interface HomeHeroOverlayProps {
  label: HomeHeroContent["label"];
  marqueeItems: HomeHeroContent["marqueeItems"];
}

function MarqueeLine({ items }: { items: HomeHeroContent["marqueeItems"] }) {
  return (
    <div className="flex items-center whitespace-nowrap text-[clamp(28px,5.6vw,58px)] leading-none tracking-[-0.06em] text-paper">
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

export function HomeHeroOverlay({
  label,
  marqueeItems,
}: HomeHeroOverlayProps) {
  return (
    <div className="pointer-events-none flex h-full w-full flex-col justify-end overflow-hidden pb-[clamp(24px,4vw,32px)]">
      <div className="relative z-10">
        <div className="relative">
          <p className="mb-4 px-6 text-[clamp(12px,2.2vw,16px)] font-medium uppercase tracking-[0.08em] text-paper md:px-16">
            {label}
          </p>
          <div className="overflow-hidden">
            <div className="home-marquee-track flex w-max items-center">
              <MarqueeLine items={marqueeItems} />
              <MarqueeLine items={marqueeItems} />
              <MarqueeLine items={marqueeItems} />
              <MarqueeLine items={marqueeItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
