import { cn } from "@/utils/cn";

type StatProps = {
  value: string;
  label: string;
  unit?: string;
  className?: string;
};

export function Stat({ value, label, unit, className }: StatProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-2", className)}>
      <p className="text-stat text-5xl text-[var(--color-text)] md:text-6xl">
        {value}
        {unit && (
          <span className="ml-1 text-2xl text-[var(--color-text-muted)] md:text-3xl">
            {unit}
          </span>
        )}
      </p>
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
    </div>
  );
}
