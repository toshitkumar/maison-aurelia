'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Product } from '@/types/jewellery';
import { createSolitaireRingGroup } from './SolitaireRingMesh';
import { createNecklaceGroup } from './NecklaceMesh';
import { createRoundBrilliantDiamondGeometry } from './DiamondGeometry';
import {
  createDiamondMaterial,
  createChampagneGoldMaterial,
  createPlatinumMaterial,
  createLuxuryStudioEnvMap,
} from './Materials';

interface ProductModalViewerProps {
  product: Product;
}

export default function ProductModalViewer({ product }: ProductModalViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F1E8');

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 1.2, 5.0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const envTarget = createLuxuryStudioEnvMap(renderer);
    scene.environment = envTarget.texture;

    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 8, 6);
    scene.add(keyLight);

    const productGroup = new THREE.Group();

    if (product.category === 'rings') {
      const { group: ring } = createSolitaireRingGroup(envTarget.texture);
      ring.scale.set(1.1, 1.1, 1.1);
      ring.position.set(0, -0.6, 0);
      productGroup.add(ring);
    } else if (product.category === 'necklaces') {
      const { group: necklace } = createNecklaceGroup(envTarget.texture);
      necklace.scale.set(0.9, 0.9, 0.9);
      necklace.position.set(0, 0.2, 0);
      productGroup.add(necklace);
    } else if (product.category === 'bracelets') {
      // Create articulated Rivière Tennis Bracelet in 3D
      const goldMat = createChampagneGoldMaterial(envTarget.texture);
      const diaMat = createDiamondMaterial(envTarget.texture);
      const diaGeo = createRoundBrilliantDiamondGeometry();

      const braceletTorus = new THREE.TorusGeometry(1.6, 0.12, 16, 64);
      const band = new THREE.Mesh(braceletTorus, goldMat);
      band.rotation.x = Math.PI / 2;
      productGroup.add(band);

      // 36 diamond mounts
      for (let i = 0; i < 36; i++) {
        const angle = (i * Math.PI) / 18;
        const stone = new THREE.Mesh(diaGeo, diaMat);
        stone.scale.set(0.12, 0.12, 0.12);
        stone.position.set(Math.cos(angle) * 1.6, 0.12, Math.sin(angle) * 1.6);
        productGroup.add(stone);
      }
    } else {
      // Earrings: Twin emerald / brilliant diamond drops
      const platMat = createPlatinumMaterial(envTarget.texture);
      const diaMat = createDiamondMaterial(envTarget.texture);
      const diaGeo = createRoundBrilliantDiamondGeometry();

      for (let side of [-1, 1]) {
        const earringGroup = new THREE.Group();
        earringGroup.position.x = side * 0.9;

        // Stud hook
        const hookGeo = new THREE.TorusGeometry(0.2, 0.03, 8, 24, Math.PI);
        const hook = new THREE.Mesh(hookGeo, platMat);
        hook.position.set(0, 1.2, 0);
        earringGroup.add(hook);

        // Top diamond
        const topStone = new THREE.Mesh(diaGeo, diaMat);
        topStone.scale.set(0.22, 0.22, 0.22);
        topStone.position.set(0, 0.9, 0);
        earringGroup.add(topStone);

        // Center drop stone
        const dropStone = new THREE.Mesh(diaGeo, diaMat);
        dropStone.scale.set(0.42, 0.42, 0.42);
        dropStone.position.set(0, 0.2, 0);
        earringGroup.add(dropStone);

        productGroup.add(earringGroup);
      }
    }

    scene.add(productGroup);

    // Mouse / Touch Interaction
    let isDown = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDown = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      productGroup.rotation.y += dx * 0.008;
      productGroup.rotation.x = THREE.MathUtils.clamp(
        productGroup.rotation.x + dy * 0.005,
        -Math.PI / 4,
        Math.PI / 4
      );
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerUp = () => (isDown = false);

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDown) {
        productGroup.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      envTarget.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [product]);

  return (
    <div className="relative w-full h-[360px] md:h-[420px] rounded-xl overflow-hidden bg-[#EDE2D3]/30 border border-[#C5A46D]/20">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-3 left-4 pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest text-[#857667]">
          Drag to orbit 360° • Place Vendôme Atelier Spec
        </span>
      </div>
    </div>
  );
}
