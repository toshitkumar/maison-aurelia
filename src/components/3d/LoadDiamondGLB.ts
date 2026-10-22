import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * Loads the user's diamond.glb with automatic bounds normalization,
 * facet preservation, and high-transmission PBR diamond optical shading.
 */
export function loadDiamondGLB(
  url: string,
  material: THREE.Material,
  onLoad: (model: THREE.Group) => void,
  onError?: (error: unknown) => void
) {
  const loader = new GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      const scene = gltf.scene;

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = material;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      // Compute bounding box to normalize scale across different 3D editors
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      const normalizedGroup = new THREE.Group();
      if (maxDim > 0) {
        const scaleFactor = 2.0 / maxDim;
        scene.scale.setScalar(scaleFactor);
        scene.position.set(
          -center.x * scaleFactor,
          -center.y * scaleFactor,
          -center.z * scaleFactor
        );
      }

      normalizedGroup.add(scene);
      onLoad(normalizedGroup);
    },
    undefined,
    (err) => {
      if (onError) onError(err);
    }
  );
}
