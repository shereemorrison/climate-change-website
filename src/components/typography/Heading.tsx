import { cn } from "@/utils/cn";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingProps = {
  as?: `h${HeadingLevel}`;
  level?: HeadingLevel;
  id?: string;
  children: React.ReactNode;
  className?: string;
  balance?: boolean;
};

const sizeMap: Record<HeadingLevel, string> = {
  1: "text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl",
  2: "text-display text-4xl sm:text-5xl md:text-6xl",
  3: "text-editorial text-3xl sm:text-4xl",
  4: "text-editorial text-2xl sm:text-3xl",
};

export function Heading({
  as,
  level = 2,
  id,
  children,
  className,
  balance = true,
}: HeadingProps) {
  const Tag = as ?? (`h${level}` as const);

  return (
    <Tag
      id={id}
      className={cn(
        sizeMap[level],
        "text-[var(--color-text)]",
        balance && "text-balance",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
