"use client";

import { useFrame, useThree } from "@react-three/fiber";
import type { MutableRefObject } from "react";

type DiveCameraProps = {
  cameraZRef: MutableRefObject<number>;
  cameraX?: number;
};

/* Syncs scroll-dive zoom to the R3F camera without React re-renders. */
export function DiveCamera({ cameraZRef, cameraX = 0 }: DiveCameraProps) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x = cameraX;
    camera.position.y = 0;
    camera.position.z = cameraZRef.current;
  });

  return null;
}
