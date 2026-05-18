"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import type { Mesh } from "three";

/** Atmospheric sphere for hero backgrounds */
export function AtmosphericGlobe() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 2, 4]} intensity={0.85} color="#66bb6a" />
      <directionalLight position={[-3, -1, 2]} intensity={0.35} color="#2e7d32" />
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <meshStandardMaterial
          color="#1b3a4b"
          roughness={0.8}
          metalness={0.12}
          transparent
          opacity={0.82}
        />
      </Sphere>
      <Sphere args={[1.55, 32, 32]}>
        <meshBasicMaterial color="#4caf50" transparent opacity={0.08} wireframe />
      </Sphere>
    </group>
  );
}
