'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createSolitaireRingGroup } from './SolitaireRingMesh';
import { createLuxuryStudioEnvMap } from './Materials';
import { RotateCcw, ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

export default function InteractiveRingViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isSparkling, setIsSparkling] = useState(false);
  const [activeAngle, setActiveAngle] = useState<'perspective' | 'table' | 'profile' | 'gallery'>('perspective');

  const sceneStateRef = useRef<{
    camera: THREE.PerspectiveCamera | null;
    ringGroup: THREE.Group | null;
    diamond: THREE.Mesh | null;
    sweepLight: THREE.SpotLight | null;
    isDragging: boolean;
    prevMousePos: { x: number; y: number };
  }>({
    camera: null,
    ringGroup: null,
    diamond: null,
    sweepLight: null,
    isDragging: false,
    prevMousePos: { x: 0, y: 0 },
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#EDE2D3'); // Silk beige background

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 1.2, 5.0);
    camera.lookAt(0, 0.5, 0);
    sceneStateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const envTarget = createLuxuryStudioEnvMap(renderer);
    scene.environment = envTarget.texture;

    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 10, 6);
    scene.add(keyLight);

    const sweepLight = new THREE.SpotLight(0xffffff, 5.0, 30, Math.PI / 6, 0.3);
    sweepLight.position.set(0, 6, 4);
    sweepLight.target.position.set(0, 0.8, 0);
    scene.add(sweepLight);
    scene.add(sweepLight.target);
    sceneStateRef.current.sweepLight = sweepLight;

    // Create 3D Ring
    const { group: ringGroup, diamond } = createSolitaireRingGroup(envTarget.texture);
    ringGroup.position.set(0, -0.2, 0);
    ringGroup.rotation.set(0.35, 0.45, 0);
    ringGroup.scale.set(0.65, 0.65, 0.65);
    scene.add(ringGroup);
    sceneStateRef.current.ringGroup = ringGroup;
    sceneStateRef.current.diamond = diamond;

    // Pedestal disk
    const pedestalGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.15, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xF7F1E8,
      roughness: 0.3,
      metalness: 0.1,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(0, -2.25, 0);
    scene.add(pedestal);

    // Mouse / Touch Interaction Listeners
    let isDown = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDown = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown || !ringGroup) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      ringGroup.rotation.y += deltaX * 0.008;
      ringGroup.rotation.x = THREE.MathUtils.clamp(
        ringGroup.rotation.x + deltaY * 0.005,
        -Math.PI / 4,
        Math.PI / 3
      );

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDown = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-rotation when user is not dragging
      if (!isDown && ringGroup) {
        ringGroup.rotation.y += 0.003;
      }

      // Sparkle light sweep wave
      if (sweepLight) {
        sweepLight.position.x = Math.sin(elapsedTime * 1.2) * 5;
        sweepLight.position.z = Math.cos(elapsedTime * 1.2) * 4 + 2;
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

  // Preset Angle Controllers
  const setCameraPreset = (preset: 'perspective' | 'table' | 'profile' | 'gallery') => {
    setActiveAngle(preset);
    const camera = sceneStateRef.current.camera;
    const ring = sceneStateRef.current.ringGroup;
    if (!camera || !ring) return;

    if (preset === 'perspective') {
      camera.position.set(0, 1.2, 5.0);
      ring.position.set(0, -0.2, 0);
      ring.rotation.set(0.35, 0.45, 0);
    } else if (preset === 'table') {
      camera.position.set(0, 4.8, 0.1);
      ring.position.set(0, 0, 0);
      ring.rotation.set(0, 0, 0);
    } else if (preset === 'profile') {
      camera.position.set(0, 0.4, 5.0);
      ring.position.set(0, -0.2, 0);
      ring.rotation.set(0, Math.PI / 2, 0);
    } else if (preset === 'gallery') {
      camera.position.set(0, 1.2, 4.2);
      ring.position.set(0, -0.2, 0);
      ring.rotation.set(-0.2, -0.6, 0);
    }
    camera.lookAt(0, 0.9, 0);
  };

  const handleZoom = (delta: number) => {
    const camera = sceneStateRef.current.camera;
    if (!camera) return;
    const newFov = THREE.MathUtils.clamp(camera.fov - delta * 5, 24, 60);
    camera.fov = newFov;
    camera.updateProjectionMatrix();
    setZoomLevel(Math.round(((60 - newFov) / 36) * 100) / 100);
  };

  const triggerSparkle = () => {
    setIsSparkling(true);
    const sweep = sceneStateRef.current.sweepLight;
    if (sweep) {
      sweep.intensity = 8.5;
      setTimeout(() => {
        sweep.intensity = 5.0;
        setIsSparkling(false);
      }, 1200);
    }
  };

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] rounded-2xl overflow-hidden border border-[#C5A46D]/25 bg-gradient-to-b from-[#F7F1E8] to-[#EDE2D3] shadow-xl">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Viewport Overlay Guide */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-medium block">
          3D Atelier Inspection
        </span>
        <h4 className="font-serif text-xl text-[#392B24] tracking-wide mt-1">
          L’Étoile Céleste Solitaire
        </h4>
        <p className="text-xs text-[#857667] mt-0.5">Click & drag to rotate • 360° Light Transmission</p>
      </div>

      {/* Angle Selector Pills */}
      <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 z-10">
        {(
          [
            { id: 'perspective', label: '3/4 Royal Angle' },
            { id: 'table', label: 'Macro Table View' },
            { id: 'profile', label: 'Cathedral Profile' },
            { id: 'gallery', label: 'Gallery Micropavé' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => setCameraPreset(item.id)}
            className={`px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-all duration-300 rounded-full border ${
              activeAngle === item.id
                ? 'bg-[#392B24] text-[#F7F1E8] border-[#392B24] shadow-md'
                : 'bg-[#F7F1E8]/80 text-[#392B24] border-[#C5A46D]/40 hover:bg-[#F7F1E8]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Control Buttons (Zoom, Reset, Sparkle Sweep) */}
      <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
        <button
          onClick={() => handleZoom(1)}
          title="Zoom In"
          className="w-10 h-10 rounded-full bg-[#F7F1E8]/90 backdrop-blur-sm border border-[#C5A46D]/40 text-[#392B24] flex items-center justify-center hover:bg-[#FFFFFF] transition-all shadow-sm"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-1)}
          title="Zoom Out"
          className="w-10 h-10 rounded-full bg-[#F7F1E8]/90 backdrop-blur-sm border border-[#C5A46D]/40 text-[#392B24] flex items-center justify-center hover:bg-[#FFFFFF] transition-all shadow-sm"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={triggerSparkle}
          title="Ignite Diamond Brilliance"
          className={`w-10 h-10 rounded-full border border-[#C5A46D]/40 flex items-center justify-center transition-all shadow-sm ${
            isSparkling
              ? 'bg-[#C5A46D] text-white scale-110'
              : 'bg-[#F7F1E8]/90 backdrop-blur-sm text-[#C5A46D] hover:bg-[#FFFFFF]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCameraPreset('perspective')}
          title="Reset View"
          className="w-10 h-10 rounded-full bg-[#F7F1E8]/90 backdrop-blur-sm border border-[#C5A46D]/40 text-[#392B24] flex items-center justify-center hover:bg-[#FFFFFF] transition-all shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
