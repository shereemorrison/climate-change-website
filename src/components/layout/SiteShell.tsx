import { cn } from "@/utils/cn";

type SiteShellProps = {
  children: React.ReactNode;
  className?: string;
};

/* Top-level page wrapper with atmospheric background layers. */
export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[image:var(--gradient-atmosphere)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[image:var(--gradient-fog)] opacity-80"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
