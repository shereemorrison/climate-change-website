"use client";

import { Stars } from "@react-three/drei";
import { useDeviceGraphicsProfile } from "@/hooks/planet/useDeviceGraphicsProfile";

export function StarsField() {
  const { starCount } = useDeviceGraphicsProfile();

  return (
    <Stars
      radius={120}
      depth={60}
      count={starCount}
      factor={3.2}
      saturation={0.15}
      fade
      speed={0.15}
    />
  );
}
