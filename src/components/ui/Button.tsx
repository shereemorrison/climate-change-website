import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "ghost" | "outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[image:var(--gradient-brand)] text-[var(--color-on-accent)] shadow-[var(--shadow-brand)] hover:brightness-105 border border-transparent",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] border border-transparent",
  outline:
    "bg-transparent text-[var(--color-text)] border-[var(--color-border-strong)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-forest)]",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3",
        "text-sm font-medium tracking-wide transition-all duration-300",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
