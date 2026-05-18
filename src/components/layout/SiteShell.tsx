import { GrainOverlay } from "@/components/atmosphere/GrainOverlay";
import { cn } from "@/utils/cn";

type SiteShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]",
        className,
      )}
    >
      <GrainOverlay />
      <div className="relative">{children}</div>
    </div>
  );
}
