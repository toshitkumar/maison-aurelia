import * as THREE from 'three';
import { createChampagneGoldMaterial, createVelvetMaterial } from './Materials';

export function createJewelleryBoxGroup(envMap?: THREE.Texture | null) {
  const group = new THREE.Group();

  const goldMat = createChampagneGoldMaterial(envMap);
  const velvetMat = createVelvetMaterial();
  const boxExteriorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#EFE6D9'), // Ivory cream leather finish
    roughness: 0.35,
    metalness: 0.05,
    envMap: envMap || null,
  });

  // 1. Box Base
  const baseGeo = new THREE.BoxGeometry(3.2, 1.0, 3.2);
  const base = new THREE.Mesh(baseGeo, boxExteriorMat);
  base.position.set(0, -0.5, 0);
  group.add(base);

  // Gold Trim Ribbon around base
  const trimGeo = new THREE.BoxGeometry(3.25, 0.08, 3.25);
  const trim = new THREE.Mesh(trimGeo, goldMat);
  trim.position.set(0, -0.04, 0);
  group.add(trim);

  // Interior Velvet Cushion
  const cushionGeo = new THREE.BoxGeometry(2.9, 0.6, 2.9);
  const cushion = new THREE.Mesh(cushionGeo, velvetMat);
  cushion.position.set(0, -0.15, 0);
  group.add(cushion);

  // Ring/Diamond Slot indention
  const slotGeo = new THREE.BoxGeometry(1.2, 0.15, 0.3);
  const slotMat = new THREE.MeshBasicMaterial({ color: 0x140e0b });
  const slot = new THREE.Mesh(slotGeo, slotMat);
  slot.position.set(0, 0.16, 0);
  group.add(slot);

  // 2. Hinged Lid Pivot Group
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, 0, -1.6); // Hinge located at back edge

  const lidGeo = new THREE.BoxGeometry(3.2, 0.9, 3.2);
  const lid = new THREE.Mesh(lidGeo, boxExteriorMat);
  lid.position.set(0, 0.45, 1.6); // Center relative to pivot
  lidPivot.add(lid);

  // Gold Lid Crest
  const crestGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.02, 32);
  const crest = new THREE.Mesh(crestGeo, goldMat);
  crest.position.set(0, 0.91, 1.6);
  crest.rotation.x = Math.PI / 2;
  lidPivot.add(crest);

  // Gold Hinge cylinders
  const hingeGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 16);
  const hinge = new THREE.Mesh(hingeGeo, goldMat);
  hinge.rotation.z = Math.PI / 2;
  lidPivot.add(hinge);

  group.add(lidPivot);

  return {
    group,
    lidPivot,
    openLid: (progress: number) => {
      // Progress from 0 (closed) to 1 (fully open 80 degrees)
      lidPivot.rotation.x = -progress * (Math.PI * 0.48);
    },
  };
}
