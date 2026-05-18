"use client";

import { useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import { useDiveProgressRef } from "@/context/JourneyRefContext";

export function useDiveProgress(): number {
  const diveProgressRef = useDiveProgressRef();

  return useSyncExternalStore(
    (onStoreChange) => {
      let last = -2;
      const tick = () => {
        if (diveProgressRef.current !== last) {
          last = diveProgressRef.current;
          onStoreChange();
        }
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    },
    () => diveProgressRef.current,
    () => -1,
  );
}
