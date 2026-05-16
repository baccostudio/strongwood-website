import { resolveHomeProjectStats } from "@/lib/home-project-stats";

const WORK_COUNT_CLASS_NAME =
  "inline-flex shrink-0 items-center whitespace-nowrap text-[clamp(44px,10vw,124px)] font-semibold leading-none text-paper tabular-nums";

export async function HomeProjectsWorkCount() {
  const projectStats = await resolveHomeProjectStats();

  return (
    <span
      aria-label={projectStats.workCountAriaLabel}
      className={WORK_COUNT_CLASS_NAME}
    >
      <span aria-hidden="true">{projectStats.workCount}</span>
    </span>
  );
}

export function HomeProjectsWorkCountFallback() {
  return (
    <span
      role="status"
      aria-live="polite"
      className={WORK_COUNT_CLASS_NAME}
    >
      <span className="sr-only">Cargando cantidad de trabajos</span>
      <span
        aria-hidden="true"
        className="inline-flex h-[1em] items-center gap-[clamp(8px,1vw,12px)]"
      >
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="size-[clamp(10px,1.2vw,14px)] rounded-[3px] bg-paper/85 animate-pulse"
            style={{
              animationDelay: `${index * 140}ms`,
              animationDuration: "1s",
            }}
          />
        ))}
      </span>
    </span>
  );
}
