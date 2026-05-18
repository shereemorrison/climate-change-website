import { Color } from "three";
import { PLANET_COLORS } from "@/lib/planet/constants";

export function createAtmosphereUniforms(intensity = 0.55) {
  return {
    uColor: { value: new Color(PLANET_COLORS.atmosphere) },
    uInnerColor: { value: new Color(PLANET_COLORS.atmosphereInner) },
    uIntensity: { value: intensity },
    uFalloff: { value: 2.8 },
  };
}
