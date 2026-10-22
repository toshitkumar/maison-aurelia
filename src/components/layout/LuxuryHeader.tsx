'use client';

import React, { useState } from 'react';
import { Currency } from '@/types/jewellery';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  Calendar,
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

  const navLinks = [
    { label: 'Collections', target: 'section-collection' },
    { label: 'Craft', target: 'section-craft' },
    { label: 'Heritage', target: 'section-heritage' },
    { label: 'Visit', target: 'section-visit' },
  ];

  return (
    <>
      {/* Subtle Top Notification Line */}
      <div className="bg-[#392B24] text-[#EDE2D3] py-1.5 px-4 text-center text-[10px] tracking-[0.25em] uppercase font-light border-b border-[#C5A46D]/20 z-40 relative">
        <span>Every Piece, Understood • BIS Hallmarked & GIA Certified Diamonds • Cuttack Atelier</span>
      </div>

      {/* Main Navigation Bar - Aurelia Jewels Aesthetic */}
      <header className="sticky top-0 z-40 bg-[#F7F1E8]/95 backdrop-blur-md border-b border-[#C5A46D]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand Logo (Left) */}
          <div
            className="cursor-pointer text-left"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <h1 className="font-serif text-2xl md:text-3xl text-[#392B24] tracking-[0.08em] font-normal">
              Aurelia Jewels
            </h1>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#857667] font-medium block">
              CUTTACK
            </span>
          </div>

          {/* Desktop Center Nav Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => onScrollToSection(link.target)}
                className="text-[11px] uppercase tracking-[0.25em] font-medium text-[#392B24] hover:text-[#C5A46D] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Currency, Wishlist, Bag & Book a Visit */}
          <div className="flex items-center space-x-4 md:space-x-5">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as Currency)}
              aria-label="Currency"
              className="bg-transparent text-[11px] font-medium tracking-wider uppercase text-[#392B24] border-b border-[#C5A46D]/40 focus:outline-none cursor-pointer py-1"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 text-[#392B24] hover:text-[#C5A46D] transition-colors"
              title="Saved Pieces"
              aria-label="Saved Pieces"
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
              aria-label="Your Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#392B24] text-[#F7F1E8] text-[9px] font-medium flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book a Visit Pill Button (Brandmotion Signature Pill) */}
            <button
              onClick={onOpenAppointment}
              className="hidden sm:inline-flex px-5 py-2 rounded-full border border-[#392B24]/40 hover:border-[#392B24] text-[#392B24] hover:bg-[#EDE2D3]/60 transition-all text-[10px] uppercase tracking-[0.25em] font-medium"
            >
              Book A Visit
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#392B24] p-1 md:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F1E8] border-b border-[#C5A46D]/20 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => {
                  onScrollToSection(link.target);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-xs uppercase tracking-[0.25em] font-medium text-[#392B24] py-2 border-b border-[#C5A46D]/15"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onOpenAppointment();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-3 rounded-full bg-[#392B24] text-[#F7F1E8] text-xs uppercase tracking-[0.25em] font-medium"
            >
              Book A Visit
            </button>
          </div>
        )}
      </header>
    </>
  );
}
