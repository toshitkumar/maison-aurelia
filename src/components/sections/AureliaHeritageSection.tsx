'use client';

import React from 'react';
import { getAssetUrl } from '@/utils/assetPath';
import { Feather, Sparkles, Award } from 'lucide-react';

export default function AureliaHeritageSection() {
  return (
    <section id="section-heritage" className="py-24 px-6 bg-[#F7F1E8] relative border-t border-[#C5A46D]/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Left Column - Tarakasi Filigree Mandala Artwork */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl bg-[#EDE2D3]/60 p-6 border border-[#C5A46D]/30 shadow-xl overflow-hidden group">
              <img
                src={getAssetUrl('/images/paris-vendome.jpg')}
                alt="Cuttack Tarakasi Artisans"
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#201713]/60 via-transparent to-transparent opacity-60 rounded-xl" />

              <div className="absolute bottom-8 left-8 right-8 text-[#F7F1E8] space-y-1">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D9BD87] font-medium block">
                  Archive No. 1542
                </span>
                <h4 className="font-serif italic text-2xl text-[#FDFBF7]">
                  The Silver Filigree Guild of Cuttack
                </h4>
                <p className="text-xs text-[#EDE2D3]/80">
                  Drawing 0.1mm silver threads to weave gossamer lace that endures generations.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Right Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C5A46D] font-medium block">
                Heritage · 500 Years
              </span>
              <h2 className="font-serif italic text-3xl md:text-5xl text-[#392B24] font-light mt-1">
                Tarakasi, the silver filigree lace of Cuttack.
              </h2>
            </div>

            <p className="text-xs md:text-sm text-[#857667] leading-relaxed">
              In the historic heart of Cuttack, along the banks of the Mahanadi river, master silversmiths have practiced Tarakasi for over five centuries. Hair-thin wire of pure silver and gold is drawn through steel dies, crimped into micro-zigzags, and woven by hand into royal mandalas that weigh almost nothing, yet outlive dynasties.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-2 border-t border-[#C5A46D]/20">
              <div className="space-y-1">
                <span className="font-serif text-3xl text-[#392B24] font-light block">0.1 mm</span>
                <span className="text-[10px] uppercase tracking-wider text-[#857667]">
                  Hair-Thin Hand-Drawn Wire
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl text-[#392B24] font-light block">500+ Yrs</span>
                <span className="text-[10px] uppercase tracking-wider text-[#857667]">
                  Unbroken Guild Heritage
                </span>
              </div>
            </div>

            <p className="text-xs text-[#857667] italic font-serif">
              “We do not merely set stones into metal; we weave light around them.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
