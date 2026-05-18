import { cn } from "@/lib/utils";
import { WorkStepsStepList } from "@/components/shared/WorkStepsStepList";
import type { HeaderThemeToken } from "@/types/site";

interface WorkStepItem {
  number: string;
  title: string;
  subtitle: string;
}

interface WorkStepsProps {
  title: string;
  steps: WorkStepItem[];
  headerTheme?: HeaderThemeToken;
  className?: string;
  children?: React.ReactNode;
}

function renderTitleWithParens(title: string) {
  const parts = title.split(/(\(|\))/).filter(Boolean);

  return parts.map((part, index) => {
    if (part === "(" || part === ")") {
      return (
        <span key={`${part}-${index}`} className="text-secondary">
          {part}
        </span>
      );
    }

    return (
      <span key={`${part}-${index}`} className="text-paper">
        {part}
      </span>
    );
  });
}

export function WorkSteps({
  title,
  steps,
  headerTheme,
  className,
  children,
}: WorkStepsProps) {
  return (
    <section
      data-header-theme={headerTheme}
      className={cn(
        "bg-foreground text-paper py-[clamp(56px,10vw,96px)]",
        className
      )}
    >
      <noscript>
        <style>{".work-step-reveal{opacity:1 !important;transform:none !important;}"}</style>
      </noscript>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-0 lg:grid lg:grid-cols-[minmax(140px,220px)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(32px,8vw,155px)]">
        <h2 className="sm:w-100 text-[clamp(16px,2.4vw,20px)] font-medium uppercase tracking-widest lg:pt-6">
          {renderTitleWithParens(title)}
        </h2>
        <WorkStepsStepList steps={steps} />
        {children ? <div className="w-full lg:col-span-2">{children}</div> : null}
      </div>
    </section>
  );
}
