'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createRoundBrilliantDiamondGeometry } from './DiamondGeometry';
import { createDiamondMaterial, createLuxuryStudioEnvMap } from './Materials';

interface DiamondLabViewerProps {
  activeC: 'cut' | 'color' | 'clarity' | 'carat';
  selectedGrade?: string;
  caratScale?: number;
}

export default function DiamondLabViewer({
  activeC,
  selectedGrade = 'D',
  caratScale = 3.2,
}: DiamondLabViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    diamondMesh: THREE.Mesh | null;
    wireframeMesh: THREE.LineSegments | null;
    diamondMat: THREE.MeshPhysicalMaterial | null;
  }>({
    diamondMesh: null,
    wireframeMesh: null,
    diamondMat: null,
  });

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
    camera.position.set(0, 1.4, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const envTarget = createLuxuryStudioEnvMap(renderer);
    scene.environment = envTarget.texture;

    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.8);
    dirLight.position.set(5, 8, 6);
    scene.add(dirLight);

    // Diamond Geometry
    const geo = createRoundBrilliantDiamondGeometry();
    const mat = createDiamondMaterial(envTarget.texture);
    const diamond = new THREE.Mesh(geo, mat);
    diamond.scale.set(1.4, 1.4, 1.4);
    scene.add(diamond);
    sceneRef.current.diamondMesh = diamond;
    sceneRef.current.diamondMat = mat;

    // Wireframe Overlay for Cut / Proportion analysis
    const wireGeo = new THREE.WireframeGeometry(geo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xC5A46D,
      transparent: true,
      opacity: 0.0,
      linewidth: 1,
    });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    wireframe.scale.set(1.405, 1.405, 1.405);
    scene.add(wireframe);
    sceneRef.current.wireframeMesh = wireframe;

    // Interactive Drag
    let isDown = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDown = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown || !diamond) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      diamond.rotation.y += dx * 0.008;
      diamond.rotation.x += dy * 0.006;
      wireframe.rotation.copy(diamond.rotation);
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
      if (!isDown && diamond) {
        diamond.rotation.y += 0.004;
        wireframe.rotation.copy(diamond.rotation);
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
  }, []);

  // React to 4Cs changes dynamically
  useEffect(() => {
    const { diamondMesh, wireframeMesh, diamondMat } = sceneRef.current;
    if (!diamondMesh || !diamondMat || !wireframeMesh) return;

    if (activeC === 'cut') {
      // Highlight facet lines
      (wireframeMesh.material as THREE.LineBasicMaterial).opacity = 0.55;
      diamondMat.color.set('#FFFFFF');
      diamondMat.dispersion = 0.048;
    } else if (activeC === 'color') {
      (wireframeMesh.material as THREE.LineBasicMaterial).opacity = 0.0;
      if (selectedGrade === 'D') {
        diamondMat.color.set('#FFFFFF'); // Absolute ice white
      } else if (selectedGrade === 'E' || selectedGrade === 'F') {
        diamondMat.color.set('#FAF8F2');
      } else if (selectedGrade === 'G' || selectedGrade === 'H') {
        diamondMat.color.set('#F4E8D3'); // Subtle warm tint
      } else {
        diamondMat.color.set('#EEDCBF'); // Warm champagne
      }
    } else if (activeC === 'clarity') {
      (wireframeMesh.material as THREE.LineBasicMaterial).opacity = 0.0;
      diamondMat.transmission = 0.99;
      diamondMat.roughness = 0.01;
      diamondMat.color.set('#FFFFFF');
    } else if (activeC === 'carat') {
      (wireframeMesh.material as THREE.LineBasicMaterial).opacity = 0.0;
      const baseScale = Math.cbrt(caratScale / 3.2) * 1.4;
      diamondMesh.scale.set(baseScale, baseScale, baseScale);
      wireframeMesh.scale.set(baseScale * 1.004, baseScale * 1.004, baseScale * 1.004);
    }
  }, [activeC, selectedGrade, caratScale]);

  return (
    <div className="relative w-full h-[440px] md:h-[500px] rounded-2xl overflow-hidden border border-[#C5A46D]/20 bg-[#EDE2D3]/40">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 left-4 pointer-events-none bg-[#F7F1E8]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#C5A46D]/30">
        <span className="text-[11px] font-medium tracking-widest uppercase text-[#C5A46D]">
          Live Gemological Optical Model
        </span>
      </div>
    </div>
  );
}
