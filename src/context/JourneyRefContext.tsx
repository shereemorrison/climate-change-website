"use client";

import { createContext, useContext, type MutableRefObject, type RefObject } from "react";

export type JourneyContextValue = {
  mainRef: RefObject<HTMLElement | null>;
  earthRef: RefObject<HTMLDivElement | null>;
  scrollProgressRef: MutableRefObject<number>;
  /** −1 = inactive; 0–1 while scrolling through the earth-dive pin */
  diveProgressRef: MutableRefObject<number>;
  cameraZRef: MutableRefObject<number>;
};

export const JourneyRefContext = createContext<JourneyContextValue | null>(null);

function useJourneyContext() {
  const ctx = useContext(JourneyRefContext);
  if (!ctx) throw new Error("Journey hooks must be used within JourneyMain");
  return ctx;
}

export function useDiveProgressRef() {
  return useJourneyContext().diveProgressRef;
}
