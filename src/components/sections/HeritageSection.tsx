'use client';

import React from 'react';
import { HERITAGE_TIMELINE } from '@/data/products';
import { ShieldCheck, Sparkles, MapPin, Feather } from 'lucide-react';

export default function HeritageSection() {
  return (
    <section id="section-heritage" className="py-28 px-6 bg-[#F7F1E8] relative overflow-hidden">
      {/* Decorative Gold Connecting Thread running down */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C5A46D]/40 to-transparent hidden lg:block -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium block">
            Act VII • The Maison Legacy
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#392B24] font-light">
            Created For Generations. Cherished Forever.
          </h2>
          <p className="text-xs md:text-sm text-[#857667] leading-relaxed max-w-xl mx-auto">
            From our founding atelier on Place Vendôme to the vanguard of 3D optical precision, Maison Aurélia upholds an unbroken lineage of royal French craftsmanship and uncompromising ethical diamond sourcing.
          </p>
        </div>

        {/* Timeline Sequence */}
        <div className="space-y-16 lg:space-y-24">
          {HERITAGE_TIMELINE.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.year}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Visual Editorial Box */}
                <div className="w-full lg:w-1/2">
                  <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#EDE2D3]/60 to-[#F7F1E8] border border-[#C5A46D]/30 shadow-lg group hover:border-[#C5A46D] transition-all duration-500">
                    <div className="flex items-center justify-between pb-6 border-b border-[#C5A46D]/20">
                      <span className="font-serif text-4xl md:text-5xl font-light text-[#C5A46D]">
                        {item.year}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#857667] font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                        {item.city}
                      </span>
                    </div>

                    <div className="py-6">
                      <h3 className="font-serif text-2xl text-[#392B24] mb-3">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[#857667] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#C5A46D]/15 flex items-center justify-between text-[11px] text-[#857667]">
                      <span className="italic font-serif">Archives de la Maison</span>
                      <Feather className="w-4 h-4 text-[#C5A46D]/60" />
                    </div>
                  </div>
                </div>

                {/* Center Node Indicator */}
                <div className="hidden lg:flex w-10 h-10 rounded-full border border-[#C5A46D] bg-[#F7F1E8] items-center justify-center text-[#C5A46D] shadow-md z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A46D]" />
                </div>

                {/* Symmetrical Spacer / Editorial Quote */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <div className={`max-w-md ${isEven ? 'lg:pl-6' : 'lg:pr-6 lg:text-right'}`}>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium block mb-1">
                      Chapter {index + 1}
                    </span>
                    <blockquote className="font-serif text-xl md:text-2xl text-[#392B24]/90 italic leading-snug">
                      "True luxury does not clamor for attention; it commands an eternity of stillness."
                    </blockquote>
                    <p className="text-xs text-[#857667] mt-3">
                      Place Vendôme Master Atelier Registers, Tome IV
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
