"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

type ScrollMarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
};

function MarqueeRow({
  items,
  baseVelocity = 1.2,
  reverse = false,
}: {
  items: string[];
  baseVelocity?: number;
  reverse?: boolean;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    return sign * Math.min(4, Math.abs(v) / 400);
  });

  const direction = reverse ? 1 : -1;

  useAnimationFrame((_, delta) => {
    const moveBy = direction * (baseVelocity + velocityFactor.get()) * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v) => `${v % -50}%`);

  const sequence = [...items, ...items];

  return (
    <motion.div className="scroll-marquee__track" style={{ x }}>
      {sequence.map((item, i) => (
        <span key={`${item}-${i}`} className="scroll-marquee__item">
          {item}
          <span className="scroll-marquee__dot" aria-hidden>
            ◆
          </span>
        </span>
      ))}
    </motion.div>
  );
}

export function ScrollMarquee({ items, className, reverse }: ScrollMarqueeProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div className={cn("scroll-marquee scroll-marquee--static", className)}>
        <p className="scroll-marquee__static-text">{items.join(" · ")}</p>
      </div>
    );
  }

  return (
    <div className={cn("scroll-marquee", className)} aria-hidden>
      <MarqueeRow items={items} reverse={reverse} />
    </div>
  );
}
