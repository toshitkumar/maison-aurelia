'use client';

import React, { useState } from 'react';
import DiamondLabViewer from '../3d/DiamondLabViewer';
import { FOUR_CS_DATA } from '@/data/products';
import { Award, Compass, Sparkles, Scale, Info } from 'lucide-react';

export default function DiamondLabSection() {
  const [activeC, setActiveC] = useState<'cut' | 'color' | 'clarity' | 'carat'>('cut');
  const [colorGrade, setColorGrade] = useState<'D' | 'F' | 'H'>('D');
  const [caratWeight, setCaratWeight] = useState<number>(3.2);

  const currentData = FOUR_CS_DATA[activeC];

  return (
    <section id="section-lab" className="py-28 px-6 bg-[#EDE2D3]/30 border-y border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium block">
            Act VI • The Master Gemology
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#392B24] font-light">
            The Diamond Lab & The 4Cs
          </h2>
          <p className="text-xs md:text-sm text-[#857667] leading-relaxed max-w-xl mx-auto">
            Explore the optical anatomy of nature’s hardest crystalline substance. Interactive 3D physical models illustrate how our lapidaries unlock extraordinary fire and light return.
          </p>

          {/* 4C Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            {[
              { id: 'cut', label: '1. Cut & Proportions', icon: Compass },
              { id: 'color', label: '2. Color & Luminescence', icon: Sparkles },
              { id: 'clarity', label: '3. Clarity & Crystal Matrix', icon: Award },
              { id: 'carat', label: '4. Carat & Scale', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveC(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                    activeC === tab.id
                      ? 'bg-[#392B24] text-[#F7F1E8] shadow-md border border-[#392B24]'
                      : 'bg-[#F7F1E8] text-[#392B24] hover:bg-[#EDE2D3] border border-[#C5A46D]/30'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#C5A46D]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Exploration Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D Visualizer Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <DiamondLabViewer
              activeC={activeC}
              selectedGrade={colorGrade}
              caratScale={caratWeight}
            />

            {/* Interactive Dynamic Sub-Controls */}
            {activeC === 'color' && (
              <div className="p-4 bg-[#F7F1E8] rounded-xl border border-[#C5A46D]/30 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#857667] font-medium">
                  Compare Color Tiers:
                </span>
                <div className="flex gap-2">
                  {(['D', 'F', 'H'] as const).map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setColorGrade(grade)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        colorGrade === grade
                          ? 'bg-[#392B24] text-[#F7F1E8]'
                          : 'bg-white/70 text-[#392B24] border border-[#C5A46D]/30 hover:bg-[#EDE2D3]'
                      }`}
                    >
                      Grade {grade} {grade === 'D' ? '(Ice Pure)' : grade === 'F' ? '(Clean)' : '(Warm Tint)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeC === 'carat' && (
              <div className="p-4 bg-[#F7F1E8] rounded-xl border border-[#C5A46D]/30 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="uppercase tracking-widest text-[#857667] font-medium">
                    Adjust Carat Weight:
                  </span>
                  <span className="font-serif text-lg font-bold text-[#392B24]">
                    {caratWeight.toFixed(1)} Carat ({(caratWeight * 200).toFixed(0)} mg)
                  </span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={5.0}
                  step={0.1}
                  value={caratWeight}
                  onChange={(e) => setCaratWeight(parseFloat(e.target.value))}
                  className="w-full accent-[#C5A46D] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#857667]">
                  <span>1.0 ct (6.5 mm)</span>
                  <span>3.0 ct (9.3 mm)</span>
                  <span>5.0 ct (11.1 mm)</span>
                </div>
              </div>
            )}
          </div>

          {/* Educational Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-medium block">
                {currentData.subtitle}
              </span>
              <h3 className="font-serif text-3xl text-[#392B24] mt-1">
                {currentData.title}
              </h3>
            </div>

            <p className="text-xs md:text-sm text-[#857667] leading-relaxed">
              {currentData.description}
            </p>

            {/* Metrics List */}
            <div className="grid grid-cols-2 gap-3">
              {currentData.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 bg-[#F7F1E8] rounded-xl border border-[#C5A46D]/20"
                >
                  <span className="text-[10px] uppercase tracking-wider text-[#857667] block">
                    {m.label}
                  </span>
                  <span className="font-serif text-base font-semibold text-[#392B24] block mt-0.5">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#857667] italic leading-relaxed border-l-2 border-[#C5A46D] pl-3 py-1">
              {currentData.details}
            </p>

            {/* Regulatory and Certification Disclaimer Notice */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/40 border border-[#C5A46D]/20 text-[11px] text-[#857667]">
              <Info className="w-4 h-4 text-[#C5A46D] flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#392B24]">Independent Certification Standard:</strong> While 3D rendering illustrates theoretical optical physics, verified quality and certification are established solely through third-party GIA laboratory examination and micro-laser serial inscription.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
