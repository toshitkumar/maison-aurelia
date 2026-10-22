import * as THREE from 'three';
import { createRoundBrilliantDiamondGeometry } from './DiamondGeometry';
import { createDiamondMaterial, createChampagneGoldMaterial } from './Materials';

export function createSolitaireRingGroup(envMap?: THREE.Texture | null) {
  const group = new THREE.Group();

  const goldMat = createChampagneGoldMaterial(envMap);
  const diamondMat = createDiamondMaterial(envMap);

  // 1. Ring Shank (Torus geometry with refined elliptical cross-section)
  const shankGeo = new THREE.TorusGeometry(1.6, 0.18, 32, 64);
  const shank = new THREE.Mesh(shankGeo, goldMat);
  shank.rotation.x = Math.PI / 2;
  group.add(shank);

  // 2. Crown Gallery / Cathedral Shoulders
  const crownGalleryGeo = new THREE.CylinderGeometry(0.7, 0.45, 0.4, 24, 1, true);
  const crownGallery = new THREE.Mesh(crownGalleryGeo, goldMat);
  crownGallery.position.set(0, 1.55, 0);
  group.add(crownGallery);

  // 3. Six Delicate Prongs
  const prongGeo = new THREE.CylinderGeometry(0.04, 0.055, 0.75, 12);
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const prong = new THREE.Mesh(prongGeo, goldMat);
    const radius = 0.52;
    prong.position.set(
      Math.cos(angle) * radius,
      1.75,
      Math.sin(angle) * radius
    );
    // Slight outward tilt
    prong.rotation.x = -Math.sin(angle) * 0.12;
    prong.rotation.z = Math.cos(angle) * 0.12;
    group.add(prong);

    // Rounded prong claw tip
    const clawTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      goldMat
    );
    clawTip.position.set(
      Math.cos(angle) * (radius - 0.04),
      2.1,
      Math.sin(angle) * (radius - 0.04)
    );
    group.add(clawTip);
  }

  // 4. Central Round Brilliant Diamond
  const diamondGeo = createRoundBrilliantDiamondGeometry();
  const diamond = new THREE.Mesh(diamondGeo, diamondMat);
  diamond.scale.set(0.68, 0.68, 0.68);
  diamond.position.set(0, 1.95, 0);
  group.add(diamond);

  // 5. Hidden Halo Micropavé Accent Stones
  const miniDiamondGeo = new THREE.SphereGeometry(0.035, 6, 6);
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    const miniStone = new THREE.Mesh(miniDiamondGeo, diamondMat);
    miniStone.position.set(
      Math.cos(angle) * 0.58,
      1.62,
      Math.sin(angle) * 0.58
    );
    group.add(miniStone);
  }

  return { group, diamond, shank };
}
