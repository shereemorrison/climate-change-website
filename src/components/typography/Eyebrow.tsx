import { cn } from "@/utils/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn("text-caption text-[var(--color-accent)]", className)}>
      {children}
    </p>
  );
}
