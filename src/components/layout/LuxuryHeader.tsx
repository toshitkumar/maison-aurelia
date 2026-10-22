'use client';

import React, { useState } from 'react';
import { Currency } from '@/types/jewellery';
import {
  ShoppingBag,
  Heart,
  Search,
  Calendar,
  Volume2,
  VolumeX,
  Menu,
  X,
} from 'lucide-react';

interface LuxuryHeaderProps {
  cartCount: number;
  wishlistCount: number;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
  onScrollToSection: (id: string) => void;
}

export default function LuxuryHeader({
  cartCount,
  wishlistCount,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenWishlist,
  onOpenAppointment,
  onScrollToSection,
}: LuxuryHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  const navLinks = [
    { label: 'The Origin', target: 'section-origin' },
    { label: 'Craftsmanship', target: 'section-craftsmanship' },
    { label: 'The Silk Gallery', target: 'section-silk' },
    { label: 'Collections', target: 'section-collection' },
    { label: 'The Royal Ring', target: 'section-ring' },
    { label: 'The Diamond Lab', target: 'section-lab' },
    { label: 'Heritage', target: 'section-heritage' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#392B24] text-[#EDE2D3] py-2 px-4 text-center text-[10px] tracking-[0.25em] uppercase font-light border-b border-[#C5A46D]/20 z-40 relative">
        <span>Complimentary Armored Courier & GIA Dossier With Every Sovereign Commission</span>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F1E8]/95 backdrop-blur-md border-b border-[#C5A46D]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-22 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#392B24] p-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.slice(0, 4).map((link) => (
              <button
                key={link.target}
                onClick={() => onScrollToSection(link.target)}
                className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#392B24] hover:text-[#C5A46D] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Brand Logo & Crest */}
          <div className="text-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A46D] font-medium block">
              Haute Joaillerie Paris
            </span>
            <h1 className="font-serif text-2xl md:text-3xl text-[#392B24] tracking-[0.18em] font-light mt-0.5">
              MAISON AURÉLIA
            </h1>
          </div>

          {/* Right Action Icons & Secondary Links */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <nav className="hidden xl:flex items-center space-x-6 mr-2">
              {navLinks.slice(4).map((link) => (
                <button
                  key={link.target}
                  onClick={() => onScrollToSection(link.target)}
                  className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#392B24] hover:text-[#C5A46D] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              className="bg-transparent text-[11px] font-medium tracking-wider uppercase text-[#392B24] border-b border-[#C5A46D]/40 focus:outline-none cursor-pointer py-1"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 text-[#392B24] hover:text-[#C5A46D] transition-colors"
              title="Saved Pieces"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A46D] text-white text-[9px] font-medium flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 text-[#392B24] hover:text-[#C5A46D] transition-colors"
              title="Your Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#392B24] text-[#F7F1E8] text-[9px] font-medium flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Appointment CTA */}
            <button
              onClick={onOpenAppointment}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C5A46D]/50 text-[10px] uppercase tracking-[0.2em] font-medium text-[#392B24] hover:bg-[#392B24] hover:text-[#F7F1E8] hover:border-[#392B24] transition-all"
            >
              <Calendar className="w-3 h-3 text-[#C5A46D]" />
              <span>Privé Salon</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F1E8] border-b border-[#C5A46D]/30 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  onScrollToSection(link.target);
                  setMobileMenuOpen(false);
                }}
                className="block text-left w-full text-xs uppercase tracking-[0.2em] font-medium text-[#392B24] py-1.5 border-b border-[#C5A46D]/15"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenAppointment();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 rounded-full bg-[#392B24] text-[#F7F1E8] text-xs uppercase tracking-widest font-medium text-center"
            >
              Book Private Salon Appointment
            </button>
          </div>
        )}
      </header>
    </>
  );
}
