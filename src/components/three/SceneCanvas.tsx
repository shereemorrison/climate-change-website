"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { cn } from "@/utils/cn";

type SceneCanvasProps = {
  children: React.ReactNode;
  className?: string;
};

export function SceneCanvas({ children, className }: SceneCanvasProps) {
  return (
    <div className={cn("relative h-full min-h-[320px] w-full", className)} aria-hidden>
      <Suspense
        fallback={
          <div className="absolute inset-0 animate-pulse bg-[var(--color-bg-muted)]/30" />
        }
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
