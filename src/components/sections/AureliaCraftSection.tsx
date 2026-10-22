'use client';

import React from 'react';
import InteractiveRingViewer from '@/components/3d/InteractiveRingViewer';
import { ShieldCheck, Sparkles, Layers, Award } from 'lucide-react';

interface AureliaCraftSectionProps {
  onOpenRingSizer: () => void;
  onBookConsultation: () => void;
}

export default function AureliaCraftSection({
  onOpenRingSizer,
  onBookConsultation,
}: AureliaCraftSectionProps) {
  return (
    <section id="section-craft" className="py-24 px-6 bg-[#EDE2D3]/35 border-t border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C5A46D] font-medium block">
                Atelier Craft • 41 Hands
              </span>
              <h2 className="font-serif italic text-3xl md:text-5xl text-[#392B24] font-light mt-1">
                From a rough cast to a BIS hallmark, 41 hands touch every piece.
              </h2>
            </div>

            <p className="text-xs md:text-sm text-[#857667] leading-relaxed">
              Every Aurelia solitaire is cast in hand-refined 18k or 22k bullion, annealed for extreme tensile density, and set under 40x optical microscopes. No machine touches the final claw setting.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EDE2D3] border border-[#C5A46D]/40 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4 text-[#C5A46D]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#392B24]">
                    Micro-Cathedral Prongs
                  </h4>
                  <p className="text-[11px] text-[#857667] leading-relaxed">
                    Six calibrated prongs tapered to 0.45mm tips, engineered to let 98.4% of ambient light enter through the diamond pavilion.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EDE2D3] border border-[#C5A46D]/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#392B24]">
                    BIS Hallmark & Laser Seal
                  </h4>
                  <p className="text-[11px] text-[#857667] leading-relaxed">
                    Bureau of Indian Standards certified hallmark with permanent laser-etched HUID code and GIA report number on the girdle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#EDE2D3] border border-[#C5A46D]/40 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#C5A46D]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#392B24]">
                    3-Stage Hand Polishing
                  </h4>
                  <p className="text-[11px] text-[#857667] leading-relaxed">
                    Rough pumice, tripoli smoothing, and final diamond rouge buffing creating liquid mirror reflection across all inner contours.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onBookConsultation}
                className="px-8 py-3.5 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow-md"
              >
                Consult Master Goldsmith
              </button>
              <button
                onClick={onOpenRingSizer}
                className="px-6 py-3.5 rounded-full border border-[#C5A46D]/60 text-[#392B24] hover:bg-[#F7F1E8] transition-all text-xs uppercase tracking-[0.2em] font-medium"
              >
                Ring Sizing Guide
              </button>
            </div>
          </div>

          {/* 3D Interactive Ring Column */}
          <div className="lg:col-span-7">
            <InteractiveRingViewer />
          </div>
        </div>
      </div>
    </section>
  );
}
