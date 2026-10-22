import * as THREE from 'three';

/**
 * Procedural Luxury Silk Cloth Mesh with Satin Wave Shaders
 * Delivers realistic cream/champagne folds, soft highlights, and scroll-linked wave displacement
 */
export function createSilkMesh(): {
  mesh: THREE.Mesh;
  update: (time: number, scrollProgress: number) => void;
} {
  const geometry = new THREE.PlaneGeometry(16, 12, 64, 64);

  // Custom Satin Silk Shader Material
  const uniforms = {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColorBase: { value: new THREE.Color('#F7F1E8') },
    uColorFold: { value: new THREE.Color('#EDE2D3') },
    uColorHighlight: { value: new THREE.Color('#FFFFFF') },
    uColorGoldSheen: { value: new THREE.Color('#D9BD87') },
    uLightPos: { value: new THREE.Vector3(2, 5, 4) },
  };

  const vertexShader = `
    uniform float uTime;
    uniform float uScroll;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Compound sin/cos waves for realistic silk drapery
      float wave1 = sin(pos.x * 0.45 + uTime * 0.35 + uScroll * 3.14) * 0.45;
      float wave2 = cos(pos.y * 0.55 + uTime * 0.28 + uScroll * 2.2) * 0.35;
      float microFold = sin(pos.x * 1.8 + pos.y * 1.2 + uTime * 0.5) * 0.12;

      pos.z += wave1 + wave2 + microFold;

      // Recalculate normal for smooth satin specular
      vec3 modifiedNormal = normal;
      modifiedNormal.x += cos(pos.x * 0.45 + uTime * 0.35) * 0.3;
      modifiedNormal.y += -sin(pos.y * 0.55 + uTime * 0.28) * 0.25;
      vNormal = normalize(normalMatrix * modifiedNormal);

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorBase;
    uniform vec3 uColorFold;
    uniform vec3 uColorHighlight;
    uniform vec3 uColorGoldSheen;
    uniform vec3 uLightPos;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(uLightPos);

      // Diffuse
      float NdotL = max(dot(normal, lightDir), 0.0);
      vec3 diffuse = mix(uColorFold, uColorBase, NdotL);

      // Satin Fresnel Rim
      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
      vec3 sheen = mix(uColorBase, uColorGoldSheen, fresnel * 0.6);

      // Soft Specular
      vec3 halfDir = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfDir), 0.0), 16.0);
      vec3 specular = uColorHighlight * spec * 0.35;

      vec3 finalColor = diffuse + sheen * 0.4 + specular;
      gl_FragColor = vec4(finalColor, 0.94);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    side: THREE.DoubleSide,
    transparent: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -0.5, -1.8);
  mesh.rotation.x = -Math.PI / 6;

  return {
    mesh,
    update: (time: number, scrollProgress: number) => {
      uniforms.uTime.value = time;
      uniforms.uScroll.value = scrollProgress;
    },
  };
}
