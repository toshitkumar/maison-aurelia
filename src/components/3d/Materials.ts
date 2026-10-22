import * as THREE from 'three';

/**
 * Procedural Luxury Studio Environment Map
 * Creates an HDR-like softbox studio reflection cube with warm ivory cream highlights
 */
export function createLuxuryStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#F7F1E8');

  // Key Softbox Light (Warm White)
  const softbox1 = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  softbox1.position.set(0, 10, 5);
  softbox1.rotation.x = Math.PI / 3;
  scene.add(softbox1);

  // Rim Light (Champagne Gold reflection)
  const softbox2 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 18),
    new THREE.MeshBasicMaterial({ color: 0xf4e6cb, side: THREE.DoubleSide })
  );
  softbox2.position.set(-10, 3, -6);
  softbox2.rotation.y = Math.PI / 4;
  scene.add(softbox2);

  // Fill Light (Subtle ivory silk reflection)
  const softbox3 = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 18),
    new THREE.MeshBasicMaterial({ color: 0xeae1d2, side: THREE.DoubleSide })
  );
  softbox3.position.set(10, 2, -6);
  softbox3.rotation.y = -Math.PI / 4;
  scene.add(softbox3);

  // Top Table Highlight
  const topLight = new THREE.Mesh(
    new THREE.RingGeometry(2, 6, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  );
  topLight.position.set(0, 15, 0);
  topLight.rotation.x = Math.PI / 2;
  scene.add(topLight);

  const cubeCamera = new THREE.CubeCamera(0.1, 100, new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBAFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    magFilter: THREE.LinearFilter,
  }));

  cubeCamera.update(renderer, scene);
  return cubeCamera.renderTarget;
}

/**
 * Creates photorealistic diamond material using MeshPhysicalMaterial
 */
export function createDiamondMaterial(envMap?: THREE.Texture | null, options: {
  color?: string | number;
  clarity?: string;
  dispersion?: number;
} = {}): THREE.MeshPhysicalMaterial {
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(options.color || 0xffffff),
    transmission: 0.98,
    opacity: 1,
    transparent: true,
    roughness: 0.02,
    ior: 2.417, // Optical Diamond Refraction Index
    thickness: 2.2,
    specularIntensity: 1.0,
    specularColor: new THREE.Color(0xffffff),
    attenuationColor: new THREE.Color(0xfffefc),
    attenuationDistance: 2.5,
    dispersion: options.dispersion ?? 0.044, // Chromatic prism fire
    reflectivity: 0.92,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    flatShading: true, // Crucial for crisp geometric diamond facet reflections
    envMap: envMap || null,
    envMapIntensity: 1.4,
  });

  return mat;
}

/**
 * Proprietary 18k Champagne Gold Material
 */
export function createChampagneGoldMaterial(envMap?: THREE.Texture | null): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D9BD87'),
    metalness: 0.92,
    roughness: 0.16,
    envMap: envMap || null,
    envMapIntensity: 1.25,
  });
}

/**
 * 950 Pure Platinum Material
 */
export function createPlatinumMaterial(envMap?: THREE.Texture | null): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E8ECEF'),
    metalness: 0.95,
    roughness: 0.14,
    envMap: envMap || null,
    envMapIntensity: 1.3,
  });
}

/**
 * Royal Deep Velvet Cushion Material
 */
export function createVelvetMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2C221D'),
    roughness: 0.88,
    metalness: 0.05,
  });
}
