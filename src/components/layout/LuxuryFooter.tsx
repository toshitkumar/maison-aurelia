'use client';

import React from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

interface LuxuryFooterProps {
  onScrollToSection: (id: string) => void;
  onOpenAppointment: () => void;
}

export default function LuxuryFooter({ onScrollToSection, onOpenAppointment }: LuxuryFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#EDE2D3]/60 border-t border-[#C5A46D]/30 pt-16 pb-12 px-6 text-[#392B24]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#392B24]">
                Aurelia Jewels
              </h3>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#857667] font-medium block">
                CUTTACK
              </span>
            </div>
            <p className="text-xs text-[#857667] max-w-sm leading-relaxed">
              Fine jewellery, understood piece by piece. Combining 500-year Cuttack silver lace filigree heritage with certified D-Flawless diamond mastercraft.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full border border-[#C5A46D]/40 text-[9px] uppercase tracking-[0.2em] text-[#C5A46D] font-medium">
                100% BIS Hallmarked · GIA Certified
              </span>
            </div>
          </div>

          {/* Collections Column */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#857667] font-medium block">
              COLLECTIONS
            </span>
            <ul className="space-y-2 text-xs text-[#392B24]">
              <li>
                <button
                  onClick={() => onScrollToSection('section-collection')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Bridal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('section-collection')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Polki
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('section-collection')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Temple
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('section-collection')}
                  className="hover:text-[#C5A46D] transition-colors"
                >
                  Everyday
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Hours Column */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#857667] font-medium block">
              SHOWROOM HOURS
            </span>
            <div className="space-y-1.5 text-xs text-[#392B24]">
              <p className="font-medium">Monday to Saturday</p>
              <p className="text-[#857667]">11:00 — 20:00</p>
              <p className="font-medium pt-1">Sunday</p>
              <p className="text-[#857667]">By appointment</p>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#857667] font-medium block">
              CONTACT
            </span>
            <div className="space-y-1.5 text-xs text-[#392B24]">
              <p className="font-medium">+91 98765 43210</p>
              <p className="text-[#857667]">hello@aureliajewels.example</p>
              <div className="pt-2">
                <a
                  href="https://wa.me/919876543210?text=Hello%20Aurelia%20Jewels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#392B24]/40 hover:border-[#392B24] text-[10px] uppercase tracking-wider text-[#392B24] hover:bg-[#F7F1E8]"
                >
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#C5A46D]/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#857667] gap-4">
          <p>© 2026 Aurelia Jewels. All pieces BIS hallmarked.</p>
          <div className="flex items-center gap-6">
            <span>Website by Toshit Kumar · Brand Motion Experience</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#392B24] transition-colors"
              title="Return to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#C5A46D]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
