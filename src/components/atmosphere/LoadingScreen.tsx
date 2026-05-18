"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_CINEMATIC, DURATION } from "@/lib/motion";
import { SITE_NAME } from "@/lib/constants";

const MIN_DISPLAY_MS = 900;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      return;
    }

    const start = Date.now();

    const hide = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      window.setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      return () => window.removeEventListener("load", hide);
    }
  }, [reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE_CINEMATIC }}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_CINEMATIC }}
          >
            <motion.div
              className="h-px w-16 bg-[image:var(--gradient-brand)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATION.reveal, ease: EASE_CINEMATIC }}
            />
            <p className="text-caption text-[var(--color-text-muted)]">{SITE_NAME}</p>
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/3 bg-[image:var(--gradient-horizon)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.slow, delay: 0.2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
