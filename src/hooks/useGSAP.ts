"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type GSAPContext = ReturnType<typeof gsap.context>;

type UseGSAPOptions = {
  scope?: React.RefObject<HTMLElement | null>;
  dependencies?: unknown[];
  disabled?: boolean;
};

/* Run GSAP animations inside a scoped context with automatic cleanup.  Respects prefers-reduced-motion.*/
export function useGSAP(
  callback: (context: GSAPContext) => void,
  options: UseGSAPOptions = {},
) {
  const { scope, dependencies = [], disabled = false } = options;
  const reducedMotion = useReducedMotion();
  const contextRef = useRef<GSAPContext | null>(null);

  useEffect(() => {
    if (disabled || reducedMotion) return;

    registerGSAP();

    const ctx = gsap.context((self) => {
      callback(self);
    }, scope?.current ?? undefined);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
      contextRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, reducedMotion, ...dependencies]);

  return contextRef;
}
