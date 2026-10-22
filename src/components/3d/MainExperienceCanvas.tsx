'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  createRoundBrilliantDiamondGeometry,
  createDeconstructedDiamondLayers,
} from './DiamondGeometry';
import {
  createDiamondMaterial,
  createChampagneGoldMaterial,
  createPlatinumMaterial,
  createLuxuryStudioEnvMap,
} from './Materials';
import { createSilkMesh } from './SilkMesh';
import { createNecklaceGroup } from './NecklaceMesh';

interface MainCanvasProps {
  scrollProgress: number; // 0 to 1 across the primary cinematic acts
  activeAct: number; // 1 to 4
}

export default function MainExperienceCanvas({ scrollProgress, activeAct }: MainCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      if (!window.WebGLRenderingContext || !testCanvas.getContext('webgl2')) {
        // Fallback for very old devices
        testCanvas.getContext('webgl');
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F7F1E8');
    scene.fog = new THREE.FogExp2('#F7F1E8', 0.05);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.8, 0.01); // Top down view initially
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Studio EnvMap & Lighting
    const envTarget = createLuxuryStudioEnvMap(renderer);
    scene.environment = envTarget.texture;

    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 12, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf2e1c3, 1.8);
    rimLight.position.set(-6, 4, -8);
    scene.add(rimLight);

    // Moving Narrow Light Ray for Sparkle Sweep
    const sweepLight = new THREE.SpotLight(0xffffff, 4.5, 25, Math.PI / 8, 0.4);
    sweepLight.position.set(-4, 6, 2);
    sweepLight.target.position.set(0, 0, 0);
    scene.add(sweepLight);
    scene.add(sweepLight.target);

    // 3. Floating Sparkle Particles around diamond
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD9BD87,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Act 1: The Origin Full Diamond
    const fullDiamondGeo = createRoundBrilliantDiamondGeometry();
    const diamondMat = createDiamondMaterial(envTarget.texture);
    const heroDiamond = new THREE.Mesh(fullDiamondGeo, diamondMat);
    heroDiamond.scale.set(1.4, 1.4, 1.4);
    scene.add(heroDiamond);

    // 5. Act 2: Deconstructed Layers Group
    const deconstructGroup = new THREE.Group();
    const goldLineMat = createChampagneGoldMaterial(envTarget.texture);
    const layers = createDeconstructedDiamondLayers();

    const tableMesh = new THREE.Mesh(layers.table, diamondMat);
    const crownMesh = new THREE.Mesh(layers.crown, diamondMat);
    const girdleMesh = new THREE.Mesh(layers.girdle, goldLineMat);
    const pavilionMesh = new THREE.Mesh(layers.pavilion, diamondMat);
    const culetMesh = new THREE.Mesh(layers.culet, diamondMat);

    deconstructGroup.add(tableMesh, crownMesh, girdleMesh, pavilionMesh, culetMesh);
    deconstructGroup.scale.set(1.4, 1.4, 1.4);
    deconstructGroup.visible = false;
    scene.add(deconstructGroup);

    // 6. Act 3: Suspended Articulated Necklace & Flowing Silk
    const { mesh: silkMesh, update: updateSilk } = createSilkMesh();
    scene.add(silkMesh);

    const { group: necklaceGroup } = createNecklaceGroup(envTarget.texture);
    necklaceGroup.position.set(0, 0, 0);
    necklaceGroup.scale.set(1.1, 1.1, 1.1);
    necklaceGroup.visible = false;
    scene.add(necklaceGroup);

    // Animation & Resize Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update Silk Wave Displacement
      updateSilk(elapsedTime, scrollProgress);

      // Subtle particle float
      particles.rotation.y = elapsedTime * 0.05;

      // Narrow Light Sweep movement
      sweepLight.position.x = Math.sin(elapsedTime * 0.8) * 6;
      sweepLight.position.z = Math.cos(elapsedTime * 0.8) * 4;

      // Scroll State Machine (Transitions seamlessly between acts)
      if (scrollProgress < 0.28) {
        // ACT 1: THE ORIGIN (Awakening & Rotation)
        heroDiamond.visible = true;
        deconstructGroup.visible = false;
        necklaceGroup.visible = false;
        silkMesh.position.y = -2.5 + scrollProgress * 2.0;

        // Transition from extreme top-down macro (0) to 3/4 angle
        const p1 = Math.min(scrollProgress / 0.28, 1);
        const camDistance = THREE.MathUtils.lerp(1.7, 4.4, p1);
        const camY = THREE.MathUtils.lerp(2.2, 2.0, p1);
        const camZ = THREE.MathUtils.lerp(0.3, 3.8, p1);

        camera.position.set(0, camY, camZ);
        camera.lookAt(0, 0, 0);

        // Scroll linked rotation
        heroDiamond.rotation.y = scrollProgress * Math.PI * 4;
        heroDiamond.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.25;
      } else if (scrollProgress < 0.62) {
        // ACT 2: CRAFTSMANSHIP (Deconstruction & Reconstruction)
        heroDiamond.visible = false;
        deconstructGroup.visible = true;
        necklaceGroup.visible = false;

        const p2 = (scrollProgress - 0.28) / (0.62 - 0.28);
        // Explosion factor: peaks around middle of section (p2 = 0.5)
        const explode = Math.sin(p2 * Math.PI) * 1.35;

        tableMesh.position.y = explode * 0.85;
        crownMesh.position.y = explode * 0.45;
        girdleMesh.position.y = 0;
        pavilionMesh.position.y = -explode * 0.55;
        culetMesh.position.y = -explode * 0.95;

        deconstructGroup.rotation.y = scrollProgress * Math.PI * 3;
        camera.position.set(0, 1.4, 4.2);
        camera.lookAt(0, 0, 0);
      } else {
        // ACT 3: THE SILK GALLERY & SUSPENDED NECKLACE
        heroDiamond.visible = false;
        deconstructGroup.visible = false;
        necklaceGroup.visible = true;

        const p3 = (scrollProgress - 0.62) / (1.0 - 0.62);
        // Silk moves gracefully aside
        silkMesh.position.x = THREE.MathUtils.lerp(0, -6.0, p3);
        silkMesh.position.z = THREE.MathUtils.lerp(-1.0, 1.5, p3);

        necklaceGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.25 + (p3 * 0.8);
        camera.position.set(0, 0.4, 4.2);
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      envTarget.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgress]);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#F7F1E8]">
        <div className="text-center p-8 border border-[#C5A46D]/30 max-w-md">
          <p className="font-serif text-2xl text-[#392B24] mb-2">Maison Aurélia Atelier</p>
          <p className="text-sm text-[#857667]">
            Experience our High Jewellery creations through the curated showroom below.
          </p>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full pointer-events-none" />;
}
