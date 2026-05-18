"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@/hooks/useGSAP";
import { PLANET_TEXTURES, PLANET_ROTATION } from "@/lib/planet/constants";
import { useDeviceGraphicsProfile } from "@/hooks/planet/useDeviceGraphicsProfile";
import type { Group } from "three";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from "@/lib/planet/materials/atmosphereShader";
import { createAtmosphereUniforms } from "@/lib/planet/materials/createAtmosphereUniforms";
import { AdditiveBlending, BackSide } from "three";

type CinematicPlanetProps = {
  scale?: number;
  scrollProgress?: number;
  enableIntro?: boolean;
  scrollTurns?: number;
  idleSpeed?: number;
};

export function CinematicPlanet({
  scale = 1,
  scrollProgress = 0,
  enableIntro = true,
  scrollTurns = PLANET_ROTATION.scrollTurns,
  idleSpeed = PLANET_ROTATION.idleSpeed,
}: CinematicPlanetProps) {
  const rootRef = useRef<Group>(null);
  const earthRef = useRef<Group>(null);
  const [dayMap, bumpMap, cloudsMap] = useTexture([
    PLANET_TEXTURES.day,
    PLANET_TEXTURES.topology,
    PLANET_TEXTURES.clouds,
  ]);
  const { earthSegments } = useDeviceGraphicsProfile();
  const atmosphereUniforms = useRef(createAtmosphereUniforms(0.32)).current;

  useGSAP(
    () => {
      if (!enableIntro || !rootRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "circ.out" } });
      tl.from(rootRef.current.position, { y: 1.6, duration: 2.2 });
      if (earthRef.current) {
        tl.from(
          earthRef.current.rotation,
          { y: Math.PI * 0.35, duration: 2.4, ease: "power2.inOut" },
          "-=65%",
        );
      }
    },
    { dependencies: [enableIntro] },
  );

  useFrame((state) => {
    if (!earthRef.current) return;
    const scrollY = scrollProgress * Math.PI * 2 * scrollTurns;
    earthRef.current.rotation.y = scrollY + state.clock.elapsedTime * idleSpeed;
  });

  return (
    <group ref={rootRef} scale={scale} rotation={[-0.22, 0.28, 0]}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
        <group ref={earthRef}>
          <mesh>
            <sphereGeometry args={[1, earthSegments, earthSegments]} />
            <meshStandardMaterial
              map={dayMap}
              bumpMap={bumpMap}
              bumpScale={0.04}
              roughness={0.88}
              metalness={0.08}
            />
          </mesh>
          <mesh scale={1.012}>
            <sphereGeometry args={[1, earthSegments, earthSegments]} />
            <meshStandardMaterial
              map={cloudsMap}
              transparent
              opacity={0.22}
              depthWrite={false}
              blending={AdditiveBlending}
            />
          </mesh>
          <mesh scale={1.035} renderOrder={2}>
            <sphereGeometry args={[1, earthSegments, earthSegments]} />
            <shaderMaterial
              uniforms={atmosphereUniforms}
              vertexShader={atmosphereVertexShader}
              fragmentShader={atmosphereFragmentShader}
              transparent
              depthWrite={false}
              blending={AdditiveBlending}
              side={BackSide}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
