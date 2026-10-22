'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface RingSizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

const SIZE_CHART = [
  { us: '4', diameterMm: 14.9, eu: '47', uk: 'H 1/2', jp: '7' },
  { us: '4.5', diameterMm: 15.3, eu: '48', uk: 'I 1/2', jp: '8' },
  { us: '5', diameterMm: 15.7, eu: '49', uk: 'J 1/2', jp: '9' },
  { us: '5.5', diameterMm: 16.1, eu: '50.5', uk: 'K 1/2', jp: '10' },
  { us: '6', diameterMm: 16.5, eu: '52', uk: 'L 1/2', jp: '11' },
  { us: '6.5', diameterMm: 16.9, eu: '53.5', uk: 'M 1/2', jp: '13' },
  { us: '7', diameterMm: 17.3, eu: '54.5', uk: 'N 1/2', jp: '14' },
  { us: '7.5', diameterMm: 17.7, eu: '56', uk: 'O 1/2', jp: '15' },
  { us: '8', diameterMm: 18.1, eu: '57', uk: 'P 1/2', jp: '16' },
];

export default function RingSizerModal({ isOpen, onClose, onSelectSize }: RingSizerModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(4); // Default US 6

  if (!isOpen) return null;

  const current = SIZE_CHART[selectedIdx];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#392B24]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#F7F1E8] border border-[#C5A46D]/40 rounded-2xl shadow-2xl p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#C5A46D]/30 flex items-center justify-center text-[#392B24] hover:bg-[#EDE2D3] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center pb-4 border-b border-[#C5A46D]/20">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-medium block">
            Atelier Precision Measurement
          </span>
          <h3 className="font-serif text-2xl text-[#392B24] mt-1">
            Haute Joaillerie Ring Size Guide
          </h3>
          <p className="text-xs text-[#857667] mt-1">
            Place an existing ring over the caliper or match your measured finger diameter in millimeters.
          </p>
        </div>

        {/* Visual Caliper Circle */}
        <div className="py-8 flex flex-col items-center justify-center">
          <div
            className="rounded-full border-2 border-[#C5A46D] flex items-center justify-center bg-white/40 shadow-inner transition-all duration-200"
            style={{
              width: `${current.diameterMm * 8}px`,
              height: `${current.diameterMm * 8}px`,
              maxWidth: '210px',
              maxHeight: '210px',
            }}
          >
            <div className="text-center">
              <span className="font-serif text-2xl font-bold text-[#392B24]">
                US {current.us}
              </span>
              <span className="block text-[11px] text-[#857667]">
                {current.diameterMm} mm
              </span>
            </div>
          </div>

          <div className="w-full max-w-xs mt-6">
            <input
              type="range"
              min={0}
              max={SIZE_CHART.length - 1}
              value={selectedIdx}
              onChange={(e) => setSelectedIdx(parseInt(e.target.value))}
              className="w-full accent-[#C5A46D] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#857667] mt-1">
              <span>US 4 (14.9 mm)</span>
              <span>US 8 (18.1 mm)</span>
            </div>
          </div>
        </div>

        {/* International Comparison Table */}
        <div className="grid grid-cols-4 gap-2 p-4 bg-[#EDE2D3]/40 rounded-xl text-center border border-[#C5A46D]/20 text-xs">
          <div>
            <span className="text-[10px] uppercase text-[#857667] block">United States</span>
            <span className="font-serif text-base font-semibold text-[#392B24]">{current.us}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#857667] block">European (EU)</span>
            <span className="font-serif text-base font-semibold text-[#392B24]">{current.eu}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#857667] block">British (UK)</span>
            <span className="font-serif text-base font-semibold text-[#392B24]">{current.uk}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#857667] block">Japanese (JP)</span>
            <span className="font-serif text-base font-semibold text-[#392B24]">{current.jp}</span>
          </div>
        </div>

        {/* Selection CTA */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-[#C5A46D]/40 text-xs uppercase tracking-widest text-[#392B24]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onSelectSize) onSelectSize(current.us);
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#392B24] text-[#F7F1E8] text-xs uppercase tracking-widest font-medium hover:bg-[#201713]"
          >
            Confirm Size US {current.us}
          </button>
        </div>
      </div>
    </div>
  );
}
