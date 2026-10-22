'use client';

import React from 'react';
import { MapPin, Clock, Phone, Mail, MessageCircle, ExternalLink, Calendar } from 'lucide-react';

interface AureliaVisitSectionProps {
  onOpenAppointment: () => void;
}

export default function AureliaVisitSection({ onOpenAppointment }: AureliaVisitSectionProps) {
  return (
    <section id="section-visit" className="py-24 px-6 bg-[#EDE2D3]/40 border-t border-[#C5A46D]/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#C5A46D] font-medium block">
                Flagship Atelier · Visit
              </span>
              <h2 className="font-serif italic text-3xl md:text-5xl text-[#392B24] font-light mt-1">
                Aurelia Jewels
              </h2>
              <p className="text-xs uppercase tracking-[0.25em] text-[#857667] font-medium mt-1">
                Cuttack · Haute Joaillerie
              </p>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-[#392B24]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A46D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">14 Chandni Chowk, Cuttack</p>
                  <p className="text-[#857667]">Odisha 753001, India</p>
                  <p className="text-[11px] text-[#857667] italic mt-0.5">
                    Opposite the old Kadam Rasool gate
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C5A46D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Monday to Saturday</p>
                  <p className="text-[#857667]">11:00 — 20:00 IST</p>
                  <p className="text-[11px] text-[#857667] italic mt-0.5">
                    Sunday private viewings by appointment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A46D] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">+91 98765 43210</p>
                  <p className="text-[#857667]">concierge@aureliajewels.example</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Chandni+Chowk+Cuttack"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2 shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A46D]" />
                Open In Google Maps
              </a>

              <a
                href="https://wa.me/919876543210?text=Hello%20Aurelia%20Jewels,%20I%20would%20like%20to%20inquire%20about%20your%20solitaire%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-[#C5A46D] text-[#392B24] hover:bg-[#EDE2D3] transition-all text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp Us
              </a>

              <button
                onClick={onOpenAppointment}
                className="px-6 py-3 rounded-full bg-[#F7F1E8] border border-[#C5A46D]/60 text-[#392B24] hover:bg-[#EDE2D3] transition-all text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#C5A46D]" />
                Book A Visit
              </button>
            </div>
          </div>

          {/* Right Stylized Map Card (Brandmotion Minimalist Grid Blueprint) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-2xl bg-[#F7F1E8] border border-[#C5A46D]/30 p-8 shadow-xl flex flex-col justify-between overflow-hidden">
              {/* Subtle Architectural Grid Background */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(#C5A46D 1px, transparent 1px), linear-gradient(90deg, #C5A46D 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />

              {/* Top Pin Label */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A46D] font-medium">
                  MAP • CUTTACK, ODISHA 753001
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#857667]">
                  20.4625° N, 85.8828° E
                </span>
              </div>

              {/* Center Stylized Compass Pin */}
              <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center">
                <div className="relative w-16 h-16 rounded-full bg-[#EDE2D3] border border-[#C5A46D]/50 flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 rounded-full bg-[#C5A46D] animate-ping absolute" />
                  <MapPin className="w-7 h-7 text-[#392B24] relative z-10" />
                </div>
                <h4 className="font-serif italic text-2xl text-[#392B24] mt-3">
                  Aurelia Flagship Showroom
                </h4>
                <p className="text-xs text-[#857667] max-w-sm mt-1">
                  Private Salon Viewings • Bespoke Diamond Consultations • Tarakasi Filigree Archive
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="relative z-10 pt-4 border-t border-[#C5A46D]/20 flex items-center justify-between text-[11px] text-[#857667]">
                <span>Valet parking available at Kadam Rasool</span>
                <span className="text-[#C5A46D] font-medium">Appointments Priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
