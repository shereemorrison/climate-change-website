import { cn } from "@/utils/cn";
import { SECTION_SPACING } from "@/lib/constants";

type SectionSpacing = keyof typeof SECTION_SPACING;

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  spacing?: SectionSpacing;
  atmosphere?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function Section({
  children,
  id,
  spacing = "lg",
  atmosphere = false,
  className,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        SECTION_SPACING[spacing],
        atmosphere && "section-atmosphere",
        className,
      )}
    >
      {children}
    </section>
  );
}
