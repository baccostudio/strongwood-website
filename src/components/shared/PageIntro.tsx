import Link from "next/link";
import { cn } from "@/lib/utils";

interface IntroParagraph {
  text: string;
  highlightText?: string;
  textAfter?: string;
}

interface IntroCta {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface PageIntroProps {
  label: string;
  location: string;
  paragraphs: IntroParagraph[];
  uppercaseLine?: string;
  cta?: IntroCta;
  className?: string;
  labelClassName?: string;
  textClassName?: string;
  highlightClassName?: string;
  uppercaseClassName?: string;
  ctaClassName?: string;
}

export function PageIntro({
  label,
  location,
  paragraphs,
  uppercaseLine,
  cta,
  className,
  labelClassName,
  textClassName,
  highlightClassName,
  uppercaseClassName,
  ctaClassName,
}: PageIntroProps) {
  return (
    <section className={cn("py-[clamp(56px,10vw,96px)]", className)}>
      <div className="mx-auto flex w-full max-w-auto flex-col justify-between gap-10 px-6 py-0 lg:max-w-5xl lg:flex-row md:gap-20">
        <div
          className={cn(
            "space-y-1 font-medium uppercase tracking-widest",
            labelClassName
          )}
        >
          <p className="text-[clamp(16px,2vw,20px)]">{label}</p>
          <p className="text-[clamp(12px,1.5vw,16px)]">{location}</p>
        </div>
        <div className="max-w-xl space-y-[clamp(16px,3vw,28px)]">
          <div
            className={cn(
              "text-[clamp(20px,3.2vw,31px)] font-light leading-[clamp(28px,4.5vw,43px)] tracking-[-0.03em]",
              textClassName
            )}
          >
            {paragraphs.map((paragraph) => (
              <p
                key={`${paragraph.text}${paragraph.highlightText ?? ""}${paragraph.textAfter ?? ""
                  }`}
              >
                {paragraph.text}
                {paragraph.highlightText ? (
                  <span className={cn("font-medium", highlightClassName)}>
                    {paragraph.highlightText}
                  </span>
                ) : null}
                {paragraph.textAfter ?? ""}
              </p>
            ))}
          </div>
          {uppercaseLine ? (
            <p
              className={cn(
                "text-[clamp(16px,2.4vw,23px)] font-medium uppercase leading-[clamp(20px,3vw,28px)]",
                uppercaseClassName
              )}
            >
              {uppercaseLine}
            </p>
          ) : null}
          {cta ? (
            <Link
              href={cta.href}
              aria-label={cta.ariaLabel ?? cta.label}
              className={cn(
                "inline-flex min-h-16 min-w-50 items-center justify-center bg-foreground border boder-(--color-secondary) px-[clamp(18px,3vw,30px)] py-[clamp(14px,3vw,25px)] text-[clamp(13px,2vw,20px)] font-medium uppercase leading-[clamp(20px,3.2vw,38px)] tracking-[0.01em] text-secondary cursor-pointer transition-colors hover:bg-foreground/90",
                ctaClassName
              )}
            >
              {cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}


