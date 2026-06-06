"use client";

import { HeroTitleWrapper } from "@/components/shared/HeroTitleWrapper";
import StrongwoodLogo from "../icons/strongwood-logo";

type HomeHeroCenteredContentProps = {
  subtitleLines: string[];
};

export function HomeHeroCenteredContent({
  subtitleLines,
}: HomeHeroCenteredContentProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-screen">
      <HeroTitleWrapper>
        <div className="flex flex-col items-center">
          <StrongwoodLogo
            width={812}
            height={155}
            color="white"
            aria-hidden="true"
            className="w-70 lg:w-100"
          />
          {subtitleLines.length > 0 ? (
            <div className="flex flex-col items-center gap-1 py-[clamp(10px,2.5vw,16px)] text-[clamp(18px,3.1vw,31px)] font-light uppercase leading-[clamp(26.7px,4.5vw,43px)] tracking-[-0.03em] text-paper">
              {subtitleLines.map((line) => {
                const words = line.trim().split(/\s+/);
                const isSplitLine = words.length === 2;

                if (isSplitLine) {
                  return (
                    <div
                      key={line}
                      className="flex w-full max-w-90 items-center gap-[clamp(6px,2vw,28px)] whitespace-nowrap sm:w-[clamp(260px,50vw,420px)] sm:max-w-none justify-center"
                    >
                      <span>{words[0]}</span>
                      <span>{words[1]}</span>
                    </div>
                  );
                }

                return <p key={line}>{line}</p>;
              })}
            </div>
          ) : null}
        </div>
      </HeroTitleWrapper>
    </div>
  );
}
