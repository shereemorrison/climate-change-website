"use client";

import { useLenis } from "@/hooks/useLenis";

type SmoothScrollProps = {
  children: React.ReactNode;
};

/* Initializes Lenis after mount. */
export function SmoothScroll({ children }: SmoothScrollProps) {
  useLenis();
  return <>{children}</>;
}
