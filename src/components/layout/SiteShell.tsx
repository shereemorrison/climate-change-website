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
      <div className="relative">{children}</div>
    </div>
  );
}
