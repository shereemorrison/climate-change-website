import { cn } from "@/utils/cn";

type TextSplitProps = {
  id?: string;
  as?: "h1" | "h2" | "h3";
  lines: string[];
  className?: string;
};

/** Headline with per-line overflow masks for scroll reveal animations. */
export function TextSplit({ id, as: Tag = "h2", lines, className }: TextSplitProps) {
  return (
    <Tag id={id} className={cn("text-split", className)} data-text-split>
      {lines.map((line) => (
        <span key={line} className="text-split__line">
          <span className="text-split__inner" data-text-line>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
