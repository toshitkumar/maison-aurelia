import * as THREE from 'three';
import { createRoundBrilliantDiamondGeometry } from './DiamondGeometry';
import { createDiamondMaterial, createPlatinumMaterial } from './Materials';

export function createNecklaceGroup(envMap?: THREE.Texture | null) {
  const group = new THREE.Group();
  const platinumMat = createPlatinumMaterial(envMap);
  const diamondMat = createDiamondMaterial(envMap);
  const diamondGeo = createRoundBrilliantDiamondGeometry();

  // 1. Curved necklace drape arc
  const curvePoints: THREE.Vector3[] = [];
  const segments = 28;
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI;
    const x = Math.cos(t) * 2.2;
    const y = -Math.sin(t) * 1.5 + 1.2;
    const z = -Math.sin(t) * 0.4;
    curvePoints.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  const chainGeo = new THREE.TubeGeometry(curve, 64, 0.035, 12, false);
  const chain = new THREE.Mesh(chainGeo, platinumMat);
  group.add(chain);

  // 2. Graduated diamond drops along the lower curve
  for (let i = 5; i <= segments - 5; i++) {
    const t = i / segments;
    const pt = curve.getPoint(t);

    // Distance to center (0.5) controls size
    const distToCenter = Math.abs(t - 0.5);
    const scale = Math.max(0.08, 0.26 - distToCenter * 0.4);

    // Diamond mount cup
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(scale * 1.05, scale * 0.7, scale * 0.6, 12),
      platinumMat
    );
    cup.position.copy(pt).add(new THREE.Vector3(0, -scale * 0.35, 0));
    group.add(cup);

    // Diamond gem
    const stone = new THREE.Mesh(diamondGeo, diamondMat);
    stone.scale.set(scale, scale, scale);
    stone.position.copy(pt).add(new THREE.Vector3(0, -scale * 0.15, 0));
    stone.rotation.x = Math.PI; // Table facet pointing down / forward
    group.add(stone);
  }

  // 3. Center Pear Diamond Drop
  const centerPt = curve.getPoint(0.5);
  const centerLink = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8),
    platinumMat
  );
  centerLink.position.copy(centerPt).add(new THREE.Vector3(0, -0.3, 0));
  group.add(centerLink);

  // Pear center stone
  const centerStone = new THREE.Mesh(diamondGeo, diamondMat);
  centerStone.scale.set(0.48, 0.55, 0.45);
  centerStone.position.copy(centerPt).add(new THREE.Vector3(0, -0.65, 0));
  centerStone.rotation.x = Math.PI;
  group.add(centerStone);

  return { group, centerStone };
}
