'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getAssetUrl } from '@/utils/assetPath';
import { Sparkles, Sliders, RotateCcw, Play, Pause, ChevronRight } from 'lucide-react';

export default function BrandMotionScrubSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrubProgress, setScrubProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isManualScrub, setIsManualScrub] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const renderFrame = () => {
      if (video.readyState >= 2) {
        // Draw with object-fit: cover arithmetic
        const hRatio = canvas.width / video.videoWidth;
        const vRatio = canvas.height / video.videoHeight;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - video.videoWidth * ratio) / 2;
        const centerShiftY = (canvas.height - video.videoHeight * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          video,
          0,
          0,
          video.videoWidth,
          video.videoHeight,
          centerShiftX,
          centerShiftY,
          video.videoWidth * ratio,
          video.videoHeight * ratio
        );
      }
      animId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => cancelAnimationFrame(animId);
  }, []);

  // Scroll-driven scrubbing
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrub || !containerRef.current || !videoRef.current) return;
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      const totalH = el.scrollHeight - window.innerHeight;
      if (totalH <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalH, 0), 1);
      setScrubProgress(progress);

      const video = videoRef.current;
      if (video.duration) {
        video.currentTime = progress * video.duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManualScrub]);

  // Manual Slider Scrub
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsManualScrub(true);
    setIsPlaying(false);
    const val = parseFloat(e.target.value);
    setScrubProgress(val);
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = val * video.duration;
    }
  };

  const toggleAutoPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
      setIsManualScrub(true);
    }
  };

  const resetScrub = () => {
    setIsManualScrub(false);
    setIsPlaying(false);
    setScrubProgress(0);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      ref={containerRef}
      id="section-scrub-experience"
      className="relative h-[250vh] bg-[#F7F1E8]"
    >
      {/* Hidden Video Source for Canvas Scrubbing */}
      <video
        ref={videoRef}
        src={getAssetUrl('/previews/aurelia-jewels.mp4')}
        poster={getAssetUrl('/previews/aurelia-jewels.webp')}
        playsInline
        muted
        preload="auto"
        className="hidden"
        onTimeUpdate={() => {
          if (isPlaying && videoRef.current && videoRef.current.duration) {
            setScrubProgress(videoRef.current.currentTime / videoRef.current.duration);
          }
        }}
      />

      {/* Sticky Cinematic Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 md:p-12 overflow-hidden">
        {/* Background Canvas Drawing Video Frames at Exact Scroll Speed */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          {/* Subtle warm luxury vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#F7F1E8]/30 to-[#F7F1E8]/80 pointer-events-none" />
        </div>

        {/* Top Header Badge */}
        <div className="relative z-10 text-center space-y-1">
          <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#C5A46D] font-medium block">
            Brandmotion • Aurelia Jewels Signature
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#392B24] font-light tracking-wide">
            Every Piece, Understood.
          </h2>
          <p className="font-serif text-base md:text-xl text-[#857667] italic font-light">
            Scroll takes the piece apart, and puts it back.
          </p>
        </div>

        {/* Dynamic Leader Line Annotations (Positioned as fractions pointing at components) */}
        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-none">
          {/* Left Annotations */}
          <div className="space-y-4 max-w-xs transition-opacity duration-500">
            <div
              className={`p-3.5 rounded-xl bg-[#F7F1E8]/90 backdrop-blur-md border border-[#C5A46D]/40 shadow-lg transition-all duration-500 ${
                scrubProgress > 0.15 ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-4'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A46D] animate-ping" />
                <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-semibold">
                  1. Solitaire Table Facet
                </span>
              </div>
              <p className="text-xs text-[#857667] mt-1">
                Precision laser-cut 56% table facet separating under controlled vertical translation.
              </p>
            </div>

            <div
              className={`p-3.5 rounded-xl bg-[#F7F1E8]/90 backdrop-blur-md border border-[#C5A46D]/40 shadow-lg transition-all duration-500 ${
                scrubProgress > 0.4 ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-4'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A46D]" />
                <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-semibold">
                  2. Six Micro-Beveled Prongs
                </span>
              </div>
              <p className="text-xs text-[#857667] mt-1">
                18k Champagne Gold cathedral basket allowing complete 360-degree light admission.
              </p>
            </div>
          </div>

          {/* Right Annotations */}
          <div className="space-y-4 max-w-xs md:ml-auto transition-opacity duration-500">
            <div
              className={`p-3.5 rounded-xl bg-[#F7F1E8]/90 backdrop-blur-md border border-[#C5A46D]/40 shadow-lg transition-all duration-500 ${
                scrubProgress > 0.25 ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A46D]" />
                <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-semibold">
                  3. Crown & Girdle Perimeter
                </span>
              </div>
              <p className="text-xs text-[#857667] mt-1">
                Calibrated star and kite facets dispersing incident white rays into spectral prismatic fire.
              </p>
            </div>

            <div
              className={`p-3.5 rounded-xl bg-[#F7F1E8]/90 backdrop-blur-md border border-[#C5A46D]/40 shadow-lg transition-all duration-500 ${
                scrubProgress > 0.55 ? 'opacity-100 translate-x-0' : 'opacity-40 translate-x-4'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A46D]" />
                <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-semibold">
                  4. Pavilion & Culet Seal
                </span>
              </div>
              <p className="text-xs text-[#857667] mt-1">
                Total internal reflection cone realigning back with zero light leakage upon scroll reversal.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Scrub Bar & Controls */}
        <div className="relative z-20 max-w-xl mx-auto w-full p-4 rounded-2xl bg-[#F7F1E8]/90 backdrop-blur-md border border-[#C5A46D]/40 shadow-2xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-widest text-[#857667] font-medium flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Exploded View Scrub: {Math.round(scrubProgress * 100)}%</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleAutoPlay}
                className="px-3 py-1 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] text-[10px] uppercase tracking-wider font-medium flex items-center gap-1"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
              </button>
              <button
                onClick={resetScrub}
                title="Reset to Closed"
                className="p-1 rounded-full border border-[#C5A46D]/40 text-[#392B24] hover:bg-white"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={1}
            step={0.005}
            value={scrubProgress}
            onChange={handleSliderChange}
            className="w-full accent-[#C5A46D] cursor-pointer h-1.5 rounded-lg bg-[#EDE2D3]"
          />

          <div className="flex justify-between text-[10px] text-[#857667]">
            <span>Assembled Piece</span>
            <span className="italic">Scroll or drag to disassemble</span>
            <span>Fully Exploded Anatomy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
