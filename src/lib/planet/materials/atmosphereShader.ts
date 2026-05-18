export const atmosphereVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const atmosphereFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uInnerColor;
  uniform float uIntensity;
  uniform float uFalloff;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uFalloff);
    float limb = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.2);
    float alpha = fresnel * uIntensity * (0.65 + limb * 0.35);
    vec3 color = mix(uInnerColor, uColor, fresnel);
    gl_FragColor = vec4(color, alpha);
  }
`;
