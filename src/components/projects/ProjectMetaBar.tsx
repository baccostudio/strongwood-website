import { cn } from "@/lib/utils";

type ProjectMetaBarProps = {
  locationLabel: string;
  locationValue: string;
  yearLabel: string;
  yearValue: string;
  typeLabel: string;
  typeValue: string;
  className?: string;
};

export function ProjectMetaBar({
  locationLabel,
  locationValue,
  yearLabel,
  yearValue,
  typeLabel,
  typeValue,
  className,
}: ProjectMetaBarProps) {
  return (
    <section className={cn("relative z-30 px-6 sm:px-10", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="rounded-none bg-black px-6 py-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)_minmax(0,1.6fr)]">
            <div>
              <p className="text-[16px] text-(--color-paper) font-bold uppercase leading-[100%] tracking-[0.01em]">
                {locationLabel}
              </p>
              <p className="mt-3 text-[16px] text-(--project-meta) font-medium uppercase leading-[100%] tracking-[0.01em]">
                {locationValue}
              </p>
            </div>
            <div>
              <p className="text-[16px] text-(--color-paper) font-bold uppercase leading-[100%] tracking-[0.01em]">
                {yearLabel}
              </p>
              <p className="mt-3 text-[16px] text-(--project-meta) font-medium uppercase leading-[100%] tracking-[0.01em]">
                {yearValue}
              </p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-[16px] text-(--color-paper) font-bold uppercase leading-[100%] tracking-[0.01em]">
                {typeLabel}
              </p>
              <p className="mt-3 text-[16px] text-(--project-meta) font-medium uppercase leading-[100%] tracking-[0.01em]">
                {typeValue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}