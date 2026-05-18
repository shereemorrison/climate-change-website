"use client";

import { useRef } from "react";
import { ScrollingEarth } from "@/components/planet/ScrollingEarth";
import { JourneyRefContext } from "@/context/JourneyRefContext";

const DEFAULT_CAMERA_Z = 8;

type JourneyMainProps = {
  children: React.ReactNode;
};

export function JourneyMain({ children }: JourneyMainProps) {
  const mainRef = useRef<HTMLElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const diveProgressRef = useRef(-1);
  const cameraZRef = useRef(DEFAULT_CAMERA_Z);

  return (
    <JourneyRefContext.Provider
      value={{
        mainRef,
        earthRef,
        scrollProgressRef,
        diveProgressRef,
        cameraZRef,
      }}
    >
      <ScrollingEarth
        mainRef={mainRef}
        earthRef={earthRef}
        scrollProgressRef={scrollProgressRef}
        cameraZRef={cameraZRef}
        diveProgressRef={diveProgressRef}
      />
      <main ref={mainRef} id="main-content">
        {children}
      </main>
    </JourneyRefContext.Provider>
  );
}
