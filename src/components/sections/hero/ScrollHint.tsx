"use client";

type ScrollHintProps = {
  className?: string;
};

export function ScrollHint({ className }: ScrollHintProps) {
  return (
    <div className={className} data-hero-scroll aria-hidden>
      <span className="text-caption">Scroll</span>
      <div className="hero-cinematic__scroll-line" />
    </div>
  );
}
