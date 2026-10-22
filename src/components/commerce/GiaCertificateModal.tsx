'use client';

import React from 'react';
import { DiamondSpecs } from '@/types/jewellery';
import { X, Award, CheckCircle, Shield, FileText } from 'lucide-react';

interface GiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  specs: DiamondSpecs;
  productName: string;
}

export default function GiaCertificateModal({
  isOpen,
  onClose,
  specs,
  productName,
}: GiaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#392B24]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#F7F1E8] border border-[#C5A46D]/40 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
        {/* Certificate Border Decor */}
        <div className="border-2 border-[#C5A46D]/30 rounded-xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#C5A46D]/30 flex items-center justify-center text-[#392B24] hover:bg-[#EDE2D3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center pb-6 border-b border-[#C5A46D]/20">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium block">
              Gemological Dossier & Atelier Passport
            </span>
            <h3 className="font-serif text-3xl text-[#392B24] mt-1 tracking-wider">
              Certificate of Authenticity
            </h3>
            <p className="text-xs text-[#857667] mt-1">
              Registered Report ID: <span className="font-mono text-[#392B24] font-medium">{specs.giaNumber}</span>
            </p>
          </div>

          {/* Product Spec Table */}
          <div className="py-6 space-y-4">
            <div className="bg-[#EDE2D3]/40 p-4 rounded-lg border border-[#C5A46D]/20 flex justify-between items-center">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#857667]">Subject Piece</span>
                <p className="font-serif text-lg text-[#392B24] font-medium">{productName}</p>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase tracking-wider text-[#857667]">Carat Weight</span>
                <p className="font-serif text-xl text-[#392B24] font-semibold">{specs.carat.toFixed(2)} ct</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white/60 rounded border border-[#C5A46D]/15">
                <span className="text-[10px] uppercase tracking-wider text-[#857667] block">Color Grade</span>
                <span className="font-serif text-xl font-bold text-[#392B24]">{specs.color}</span>
                <span className="text-[9px] text-[#857667] block mt-0.5">Colorless Tier</span>
              </div>
              <div className="p-3 bg-white/60 rounded border border-[#C5A46D]/15">
                <span className="text-[10px] uppercase tracking-wider text-[#857667] block">Clarity Grade</span>
                <span className="font-serif text-xl font-bold text-[#392B24]">{specs.clarity}</span>
                <span className="text-[9px] text-[#857667] block mt-0.5">Microscope Clean</span>
              </div>
              <div className="p-3 bg-white/60 rounded border border-[#C5A46D]/15">
                <span className="text-[10px] uppercase tracking-wider text-[#857667] block">Cut Grade</span>
                <span className="font-serif text-xl font-bold text-[#392B24]">{specs.cut}</span>
                <span className="text-[9px] text-[#857667] block mt-0.5">Ideal Optical Symmetry</span>
              </div>
              <div className="p-3 bg-white/60 rounded border border-[#C5A46D]/15">
                <span className="text-[10px] uppercase tracking-wider text-[#857667] block">Polish / Symmetry</span>
                <span className="font-serif text-xl font-bold text-[#392B24]">Ex / Ex</span>
                <span className="text-[9px] text-[#857667] block mt-0.5">Dual Excellent</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#392B24] pt-2">
              <div className="p-3 bg-[#EDE2D3]/20 rounded border border-[#C5A46D]/15 space-y-1">
                <p className="flex justify-between">
                  <span className="text-[#857667]">Fluorescence:</span>
                  <span className="font-medium">{specs.fluorescence}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-[#857667]">Table Percentage:</span>
                  <span className="font-medium">{specs.tablePercentage}%</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-[#857667]">Depth Percentage:</span>
                  <span className="font-medium">{specs.depthPercentage}%</span>
                </p>
              </div>

              <div className="p-3 bg-[#EDE2D3]/20 rounded border border-[#C5A46D]/15 space-y-1">
                <p className="flex justify-between">
                  <span className="text-[#857667]">Laser Inscription:</span>
                  <span className="font-mono text-[11px] font-semibold">{specs.giaNumber}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-[#857667]">Origin Standard:</span>
                  <span className="font-medium">Kimberley Process Compliant</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-[#857667]">Atelier Seal:</span>
                  <span className="font-medium">Place Vendôme Registry</span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Seals & Verification Notice */}
          <div className="pt-4 border-t border-[#C5A46D]/20 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#857667]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C5A46D]" />
              <span>Permanent Micro-Laser Girdle Inscription Verified</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#392B24] font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>Full Physical Dossier Dispatched with Insured Courier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
