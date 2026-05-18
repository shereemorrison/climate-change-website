import { cn } from "@/utils/cn";
import { CONTAINER_WIDTH } from "@/lib/constants";

type ContainerWidth = keyof typeof CONTAINER_WIDTH;

type ContainerProps = {
  children: React.ReactNode;
  width?: ContainerWidth;
  className?: string;
  as?: "div" | "article" | "main";
};

export function Container({
  children,
  width = "default",
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[100vw] px-5 sm:px-8 lg:px-12",
        CONTAINER_WIDTH[width],
        className,
      )}
    >
      {children}
    </Component>
  );
}
