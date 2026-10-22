'use client';

import React, { useState } from 'react';
import { ArrowRight, Check, Shield, Gem, Award, Clock } from 'lucide-react';

export default function LuxuryFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#2C221D] text-[#EDE2D3] border-t border-[#C5A46D]/30 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* House Pillars / Guarantees */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-[#C5A46D]/20 text-center md:text-left">
          <div className="space-y-2">
            <Gem className="w-5 h-5 text-[#D9BD87] mx-auto md:mx-0" />
            <h4 className="font-serif text-lg text-[#F7F1E8]">Rare Earth Provenance</h4>
            <p className="text-xs text-[#857667] leading-relaxed">
              100% Kimberley Process certified, conflict-free Type IIa natural diamonds of absolute purity.
            </p>
          </div>
          <div className="space-y-2">
            <Award className="w-5 h-5 text-[#D9BD87] mx-auto md:mx-0" />
            <h4 className="font-serif text-lg text-[#F7F1E8]">Dual Master Certification</h4>
            <p className="text-xs text-[#857667] leading-relaxed">
              Every creation is delivered with original GIA laboratory dossier and Place Vendôme hallmarking.
            </p>
          </div>
          <div className="space-y-2">
            <Shield className="w-5 h-5 text-[#D9BD87] mx-auto md:mx-0" />
            <h4 className="font-serif text-lg text-[#F7F1E8]">Armored Global Escort</h4>
            <p className="text-xs text-[#857667] leading-relaxed">
              White-glove armored vehicle transit, fully underwritten with door-to-door discretionary security.
            </p>
          </div>
          <div className="space-y-2">
            <Clock className="w-5 h-5 text-[#D9BD87] mx-auto md:mx-0" />
            <h4 className="font-serif text-lg text-[#F7F1E8]">Perpetual Atelier Care</h4>
            <p className="text-xs text-[#857667] leading-relaxed">
              Complimentary lifetime ultrasonic cleaning, annual prong inspection, and complimentary resizing.
            </p>
          </div>
        </div>

        {/* Newsletter & Brand Mission */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-[#C5A46D]/20">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium block">
              The Sovereign Circle
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#F7F1E8] font-light">
              Receive Private Atelier Invocations
            </h3>
            <p className="text-xs text-[#857667] leading-relaxed">
              Be granted priority acquisition windows for singular rough diamond cut releases, private Place Vendôme salon soirees, and bespoke seasonal catalogues.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-[#392B24] border border-[#C5A46D]/40 text-xs text-[#D9BD87] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are inducted into the Sovereign Circle. Welcome to Maison Aurélia.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your private email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-full bg-[#392B24]/70 border border-[#C5A46D]/30 text-xs text-[#F7F1E8] placeholder-[#857667] focus:outline-none focus:border-[#C5A46D]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#C5A46D] text-[#2C221D] hover:bg-[#D9BD87] transition-all text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D9BD87] font-semibold block">
                Haute Collections
              </span>
              <ul className="space-y-2 text-xs text-[#857667]">
                <li><a href="#section-collection" className="hover:text-[#F7F1E8] transition-colors">Solitaire Diamond Rings</a></li>
                <li><a href="#section-collection" className="hover:text-[#F7F1E8] transition-colors">Souveraine Cascade Necklaces</a></li>
                <li><a href="#section-collection" className="hover:text-[#F7F1E8] transition-colors">Aura Royale Earrings</a></li>
                <li><a href="#section-collection" className="hover:text-[#F7F1E8] transition-colors">Rivière Tennis Bracelets</a></li>
                <li><a href="#section-collection" className="hover:text-[#F7F1E8] transition-colors">Bespoke Royal Commissions</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D9BD87] font-semibold block">
                Client Salons
              </span>
              <ul className="space-y-2 text-xs text-[#857667]">
                <li><span className="hover:text-[#F7F1E8] transition-colors cursor-pointer">Place Vendôme, Paris</span></li>
                <li><span className="hover:text-[#F7F1E8] transition-colors cursor-pointer">New Bond Street, London</span></li>
                <li><span className="hover:text-[#F7F1E8] transition-colors cursor-pointer">Fifth Avenue, New York</span></li>
                <li><span className="hover:text-[#F7F1E8] transition-colors cursor-pointer">Ginza High Salon, Tokyo</span></li>
                <li><span className="hover:text-[#F7F1E8] transition-colors cursor-pointer">Virtual Concierge 4K</span></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D9BD87] font-semibold block">
                The House
              </span>
              <ul className="space-y-2 text-xs text-[#857667]">
                <li><a href="#section-origin" className="hover:text-[#F7F1E8] transition-colors">The 1894 Heritage</a></li>
                <li><a href="#section-craftsmanship" className="hover:text-[#F7F1E8] transition-colors">Art of Craftsmanship</a></li>
                <li><a href="#section-lab" className="hover:text-[#F7F1E8] transition-colors">The Diamond Lab (4Cs)</a></li>
                <li><span className="hover:text-[#F7F1E8] transition-colors cursor-pointer">Kimberley Process</span></li>
                <li><span className="hover:text-[#F7F1E8] transition-colors cursor-pointer">GIA Registry Validation</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#857667]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-sm tracking-widest text-[#D9BD87]">MAISON AURÉLIA</span>
            <span>•</span>
            <span>© 1894–2026 Maison Aurélia Haute Joaillerie S.A. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap gap-6">
            <span className="hover:text-[#F7F1E8] cursor-pointer">Privacy Charter</span>
            <span className="hover:text-[#F7F1E8] cursor-pointer">Terms of Sovereign Sale</span>
            <span className="hover:text-[#F7F1E8] cursor-pointer">Diamond Care Guide</span>
            <span className="hover:text-[#F7F1E8] cursor-pointer">Cookie Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
