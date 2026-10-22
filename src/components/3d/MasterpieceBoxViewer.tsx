'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createJewelleryBoxGroup } from './JewelleryBoxMesh';
import { createRoundBrilliantDiamondGeometry } from './DiamondGeometry';
import { createDiamondMaterial, createLuxuryStudioEnvMap } from './Materials';
import { loadDiamondGLB } from './LoadDiamondGLB';
import { getAssetUrl } from '@/utils/assetPath';
import { Sparkles } from 'lucide-react';

export default function MasterpieceBoxViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const stateRef = useRef<{
    openLid: ((p: number) => void) | null;
    diamond: THREE.Object3D | null;
    sweepLight: THREE.SpotLight | null;
    boxGroup: THREE.Group | null;
  }>({
    openLid: null,
    diamond: null,
    sweepLight: null,
    boxGroup: null,
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F1E8');

    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 2.8, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const envTarget = createLuxuryStudioEnvMap(renderer);
    scene.environment = envTarget.texture;

    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 9, 7);
    scene.add(keyLight);

    const sweepLight = new THREE.SpotLight(0xffffff, 6.0, 30, Math.PI / 7, 0.4);
    sweepLight.position.set(0, 8, 4);
    sweepLight.target.position.set(0, 0.2, 0);
    scene.add(sweepLight);
    scene.add(sweepLight.target);
    stateRef.current.sweepLight = sweepLight;

    // Create Luxury Box
    const { group: boxGroup, openLid } = createJewelleryBoxGroup(envTarget.texture);
    boxGroup.position.set(0, -0.6, 0);
    scene.add(boxGroup);
    stateRef.current.boxGroup = boxGroup;
    stateRef.current.openLid = openLid;

    // Default procedural diamond
    const diamondGeo = createRoundBrilliantDiamondGeometry();
    const diamondMat = createDiamondMaterial(envTarget.texture);
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    diamond.scale.set(0.62, 0.62, 0.62);
    diamond.position.set(0, 0.22, 0);
    boxGroup.add(diamond);
    stateRef.current.diamond = diamond;

    // Load user's diamond.glb
    loadDiamondGLB(
      getAssetUrl('/models/diamond.glb'),
      diamondMat,
      (gltfDiamond) => {
        diamond.visible = false;
        gltfDiamond.scale.set(0.65, 0.65, 0.65);
        gltfDiamond.position.set(0, 0.22, 0);
        boxGroup.add(gltfDiamond);
        stateRef.current.diamond = gltfDiamond;
      }
    );

    // Initial state: box open
    openLid(1.0);

    let animId: number;
    let clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      boxGroup.rotation.y = Math.sin(time * 0.3) * 0.12 + 0.25;

      sweepLight.position.x = Math.sin(time * 0.9) * 5;
      sweepLight.position.z = Math.cos(time * 0.9) * 4 + 2;

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
      window.removeEventListener('resize', handleResize);
      envTarget.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const toggleBox = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    const openLid = stateRef.current.openLid;
    const diamond = stateRef.current.diamond;
    if (!openLid || !diamond) return;

    let startTime = performance.now();
    const duration = 1200;

    const animateBox = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      if (nextState) {
        openLid(ease);
        diamond.position.y = THREE.MathUtils.lerp(1.6, 0.22, ease);
        diamond.scale.setScalar(THREE.MathUtils.lerp(0.85, 0.65, ease));
      } else {
        openLid(1 - ease);
        diamond.position.y = THREE.MathUtils.lerp(0.22, 1.6, ease);
        diamond.scale.setScalar(THREE.MathUtils.lerp(0.65, 0.85, ease));
      }

      if (progress < 1) {
        requestAnimationFrame(animateBox);
      }
    };

    requestAnimationFrame(animateBox);
  };

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-[#C5A46D]/25 bg-gradient-to-b from-[#F7F1E8] to-[#EDE2D3] shadow-2xl">
      <div ref={containerRef} className="w-full h-full cursor-pointer" onClick={toggleBox} />

      <div className="absolute top-6 left-6 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-medium block">
          Act VIII • The Presentation
        </span>
        <h4 className="font-serif text-xl text-[#392B24] tracking-wide mt-1">
          L’Écrin Impérial & The Solitaire
        </h4>
        <p className="text-xs text-[#857667] mt-0.5">Click to {isOpen ? 'close' : 'open'} the royal casket</p>
      </div>

      <div className="absolute bottom-6 right-6 z-10">
        <button
          onClick={toggleBox}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs tracking-widest uppercase font-medium shadow-lg border border-[#C5A46D]/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D9BD87]" />
          {isOpen ? 'Close Casket' : 'Open Royal Casket'}
        </button>
      </div>
    </div>
  );
}
