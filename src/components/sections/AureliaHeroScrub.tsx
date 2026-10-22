'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '@/utils/assetPath';
import { ArrowDown, Sparkles, Shield, ChevronDown } from 'lucide-react';

interface AureliaHeroScrubProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export default function AureliaHeroScrub({ onExploreClick, onStoryClick }: AureliaHeroScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Frame count for the exploded solitaire sequence (frames 1 to 42)
  const TOTAL_FRAMES = 40;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Preload frame images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = getAssetUrl(`/sequence/solitaire/frame_${paddedIndex}.jpg`);
      img.onload = () => {
        loadedCount++;
        setLoadPercentage(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount >= TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Fallback progress
        loadedCount++;
        if (loadedCount >= TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      const totalH = el.scrollHeight - window.innerHeight;
      if (totalH <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalH, 0), 1);
      targetProgressRef.current = progress;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth lerp canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // Lerp progress for ultra-smooth buttery inertia
      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * 0.12;

      const progress = currentProgressRef.current;
      const images = imagesRef.current;

      if (images.length > 0) {
        const frameIndex = Math.min(
          Math.max(Math.floor(progress * (TOTAL_FRAMES - 1)), 0),
          TOTAL_FRAMES - 1
        );
        const img = images[frameIndex];

        if (img && img.complete && img.naturalWidth > 0) {
          // Resize canvas if needed
          const width = canvas.clientWidth;
          const height = canvas.clientHeight;
          const dpr = Math.min(window.devicePixelRatio || 1, 2);

          if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
          }

          ctx.save();
          ctx.scale(dpr, dpr);

          // Object-fit: cover mathematics
          const hRatio = width / img.naturalWidth;
          const vRatio = height / img.naturalHeight;
          const ratio = Math.max(hRatio, vRatio);

          const centerShiftX = (width - img.naturalWidth * ratio) / 2;
          const centerShiftY = (height - img.naturalHeight * ratio) / 2;

          ctx.fillStyle = '#F7F1E8';
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(
            img,
            0,
            0,
            img.naturalWidth,
            img.naturalHeight,
            centerShiftX,
            centerShiftY,
            img.naturalWidth * ratio,
            img.naturalHeight * ratio
          );

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [imagesLoaded]);

  return (
    <section ref={containerRef} className="relative h-[280vh] bg-[#F7F1E8]">
      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Fullscreen High-Performance Frame Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: imagesLoaded ? 1 : 0 }}
        />

        {/* Soft Luxury Vignette & Edge Blend Gradients (seamless merge with #F7F1E8) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#F7F1E8] via-transparent to-[#F7F1E8]/30" />
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-[#F7F1E8]/40" />

        {/* Loading Skeleton */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F7F1E8] z-20">
            <div className="w-12 h-12 rounded-full border border-[#C5A46D]/30 border-t-[#C5A46D] animate-spin mb-4" />
            <span className="font-serif text-sm tracking-[0.25em] uppercase text-[#392B24]">
              Maison Aurélia Atelier
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#857667] mt-1">
              Calibrating 57 Facets • {loadPercentage}%
            </span>
          </div>
        )}

        {/* Floating Scroll Cue */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-all duration-500 ${
            scrollProgress < 0.2 ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#857667] font-medium">
            Scroll to Disassemble
          </span>
          <div className="w-[1px] h-8 bg-[#C5A46D]/60 animate-pulse" />
        </div>

        {/* Precision Scroll Progress Meter (Bottom Right) */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3 bg-[#F7F1E8]/75 backdrop-blur-md px-4 py-2 rounded-full border border-[#C5A46D]/30 shadow-sm pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#857667]">
            {scrollProgress < 0.35
              ? 'Phase 01 • Solitaire Assembled'
              : scrollProgress < 0.75
              ? 'Phase 02 • Anatomical Explosion'
              : 'Phase 03 • 4Cs Brilliance'}
          </span>
          <div className="w-16 h-1 bg-[#EDE2D3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C5A46D] transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-[#C5A46D]">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
