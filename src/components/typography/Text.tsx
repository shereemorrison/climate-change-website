import { cn } from "@/utils/cn";

type TextSize = "sm" | "base" | "lg" | "xl";

type TextProps = {
  children: React.ReactNode;
  size?: TextSize;
  muted?: boolean;
  className?: string;
  as?: "p" | "span" | "div";
};

const sizeMap: Record<TextSize, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg md:text-xl",
  xl: "text-xl md:text-2xl",
};

export function Text({
  children,
  size = "base",
  muted = false,
  className,
  as: Component = "p",
}: TextProps) {
  return (
    <Component
      className={cn(
        "text-body",
        sizeMap[size],
        muted ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
