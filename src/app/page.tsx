'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Product, CartItem, Currency } from '@/types/jewellery';
import { PRODUCTS } from '@/data/products';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import LuxuryFooter from '@/components/layout/LuxuryFooter';
import MainExperienceCanvas from '@/components/3d/MainExperienceCanvas';
import InteractiveRingViewer from '@/components/3d/InteractiveRingViewer';
import MasterpieceBoxViewer from '@/components/3d/MasterpieceBoxViewer';
import SignatureCollectionSection from '@/components/sections/SignatureCollectionSection';
import DiamondLabSection from '@/components/sections/DiamondLabSection';
import HeritageSection from '@/components/sections/HeritageSection';
import CartDrawer from '@/components/commerce/CartDrawer';
import WishlistDrawer from '@/components/commerce/WishlistDrawer';
import ProductQuickViewModal from '@/components/commerce/ProductQuickViewModal';
import GiaCertificateModal from '@/components/commerce/GiaCertificateModal';
import RingSizerModal from '@/components/commerce/RingSizerModal';
import AppointmentModal from '@/components/commerce/AppointmentModal';
import CheckoutModal from '@/components/commerce/CheckoutModal';
import {
  Sparkles,
  ArrowDown,
  Compass,
  Layers,
  ShieldCheck,
  ChevronRight,
  Eye,
  ShoppingBag,
} from 'lucide-react';

const CURRENCY_MAP: Record<Currency, { symbol: string; rate: number; prefix: boolean }> = {
  USD: { symbol: '$', rate: 1.0, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: false },
  GBP: { symbol: '£', rate: 0.79, prefix: true },
  JPY: { symbol: '¥', rate: 152.0, prefix: true },
};

export default function Home() {
  // E-Commerce States
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [giaModalProduct, setGiaModalProduct] = useState<Product | null>(null);
  const [isRingSizerOpen, setIsRingSizerOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Scroll Tracking for 3D Cinematic Acts
  const [scrollProgress, setScrollProgress] = useState(0);
  const cinematicContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!cinematicContainerRef.current) return;
      const el = cinematicContainerRef.current;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(
        Math.max(-rect.top / totalHeight, 0),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format Currency Helper
  const formatPrice = (amountUsd: number) => {
    const { symbol, rate, prefix } = CURRENCY_MAP[currency];
    const converted = Math.round(amountUsd * rate);
    const formatted = converted.toLocaleString();
    return prefix ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, size?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedSize === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size || product.defaultSize }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleScrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#392B24] flex flex-col font-sans">
      {/* Luxury Navigation Header */}
      <LuxuryHeader
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        wishlistCount={wishlist.length}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-1">
        {/* ========================================================= */}
        {/* CINEMATIC SCROLL STAGE: ACTS 1, 2, 3 (Pinned Canvas Container) */}
        {/* ========================================================= */}
        <div ref={cinematicContainerRef} className="relative h-[320vh]">
          {/* Pinned Fullscreen 3D WebGL Canvas */}
          <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
            <MainExperienceCanvas scrollProgress={scrollProgress} activeAct={1} />
          </div>

          {/* Act 1 Overlay: THE ORIGIN & AWAKENING (0% to 30% scroll) */}
          <div
            id="section-origin"
            className={`absolute top-0 inset-x-0 h-screen flex flex-col items-center justify-between p-8 md:p-16 text-center transition-opacity duration-700 pointer-events-none ${
              scrollProgress < 0.28 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="pt-8">
              <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#C5A46D] font-medium block">
                Act I • The Awakening
              </span>
            </div>

            <div className="max-w-3xl space-y-4 pointer-events-auto">
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.12em] text-[#392B24] leading-tight">
                THE ART OF ETERNITY
              </h1>
              <p className="font-serif text-lg md:text-2xl text-[#857667] italic font-light">
                Exceptional diamonds. Timeless emotions.
              </p>
              <div className="pt-6 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleScrollToSection('section-collection')}
                  className="px-8 py-3.5 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs uppercase tracking-[0.25em] font-medium shadow-xl border border-[#C5A46D]/40"
                >
                  Explore The Collection
                </button>
                <button
                  onClick={() => handleScrollToSection('section-craftsmanship')}
                  className="px-8 py-3.5 rounded-full bg-[#F7F1E8]/80 backdrop-blur-sm text-[#392B24] hover:bg-[#EDE2D3] transition-all text-xs uppercase tracking-[0.25em] font-medium border border-[#C5A46D]/40"
                >
                  Discover Our Story
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 pb-6 text-[#857667]">
              <span className="text-[10px] uppercase tracking-[0.25em]">Scroll to Unveil</span>
              <ArrowDown className="w-4 h-4 animate-bounce text-[#C5A46D]" />
            </div>
          </div>

          {/* Act 2 Overlay: THE ART OF CRAFTSMANSHIP (30% to 65% scroll) */}
          <div
            id="section-craftsmanship"
            className={`absolute top-[105vh] inset-x-0 h-screen flex flex-col justify-between p-8 md:p-16 transition-opacity duration-700 pointer-events-none ${
              scrollProgress >= 0.28 && scrollProgress < 0.62 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center">
              <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#C5A46D] font-medium block">
                Act II • The Architecture of Brilliance
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#392B24] font-light mt-1">
                Perfection Is Never Accidental.
              </h2>
            </div>

            {/* Delicate Gold Annotations around the deconstructed diamond */}
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 pointer-events-auto">
              <div className="space-y-4 max-w-sm">
                <div className="p-4 rounded-xl bg-[#F7F1E8]/85 backdrop-blur-sm border border-[#C5A46D]/30 shadow-md">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium block">
                    1. Table Facet (56%)
                  </span>
                  <p className="text-xs text-[#857667] mt-1">
                    The primary octagonal aperture admitting 100% of incident ambient light into the crystalline prism.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F1E8]/85 backdrop-blur-sm border border-[#C5A46D]/30 shadow-md">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium block">
                    2. Crown & Star Angles (34.5°)
                  </span>
                  <p className="text-xs text-[#857667] mt-1">
                    Eight kite and sixteen triangular upper facets calibrated for high-dispersion prismatic fire.
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-sm md:ml-auto">
                <div className="p-4 rounded-xl bg-[#F7F1E8]/85 backdrop-blur-sm border border-[#C5A46D]/30 shadow-md">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium block">
                    3. Girdle Belt & Pavilion (40.8°)
                  </span>
                  <p className="text-xs text-[#857667] mt-1">
                    Internal total reflection mirrors bouncing light back upward through the observer’s sightline.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F7F1E8]/85 backdrop-blur-sm border border-[#C5A46D]/30 shadow-md">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium block">
                    4. Culet Point
                  </span>
                  <p className="text-xs text-[#857667] mt-1">
                    Microscopic terminal point preventing light leakage through the bottom of the pavilion.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center pb-6">
              <span className="text-xs text-[#857667] italic font-serif">
                57 Hand-Cut Facets • Total Internal Reflection Benchmark
              </span>
            </div>
          </div>

          {/* Act 3 Overlay: THE SILK GALLERY (65% to 100% scroll) */}
          <div
            id="section-silk"
            className={`absolute top-[210vh] inset-x-0 h-screen flex flex-col justify-between p-8 md:p-16 transition-opacity duration-700 pointer-events-none ${
              scrollProgress >= 0.62 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center">
              <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#C5A46D] font-medium block">
                Act III • The Flow of Light
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-[#392B24] font-light mt-1">
                Elegance, Woven Into Every Detail.
              </h2>
            </div>

            <div className="max-w-md mx-auto text-center space-y-4 pointer-events-auto bg-[#F7F1E8]/80 backdrop-blur-md p-6 rounded-2xl border border-[#C5A46D]/30 shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium block">
                Souveraine Cascade Necklace
              </span>
              <h3 className="font-serif text-2xl text-[#392B24]">
                18.50 ctw Pear & Brilliant Diamonds
              </h3>
              <p className="text-xs text-[#857667] leading-relaxed">
                As silk gracefully yields, articulated platinum links suspend a graduated torrent of D/VVS1 diamonds over the décolletage.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    const necklace = PRODUCTS.find((p) => p.category === 'necklaces');
                    if (necklace) setQuickViewProduct(necklace);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#392B24] text-[#F7F1E8] text-xs uppercase tracking-widest font-medium"
                >
                  Inspect in 3D
                </button>
                <button
                  onClick={() => {
                    const necklace = PRODUCTS.find((p) => p.category === 'necklaces');
                    if (necklace) handleAddToCart(necklace);
                  }}
                  className="px-6 py-2.5 rounded-full border border-[#C5A46D] text-[#392B24] text-xs uppercase tracking-widest font-medium hover:bg-[#EDE2D3]"
                >
                  Acquire Piece
                </button>
              </div>
            </div>

            <div className="text-center pb-6">
              <span className="text-xs text-[#857667]">Scroll down to enter the Complete Showroom</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACT 4: THE SIGNATURE COLLECTION (Interactive 3D Showroom) */}
        {/* ========================================================= */}
        <SignatureCollectionSection
          products={PRODUCTS}
          currency={currency}
          formatPrice={formatPrice}
          onOpenQuickView={setQuickViewProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist.map((p) => p.id)}
        />

        {/* ========================================================= */}
        {/* ACT 5: THE ROYAL RING EXPERIENCE (Dedicated 3D Inspection) */}
        {/* ========================================================= */}
        <section id="section-ring" className="py-28 px-6 bg-[#EDE2D3]/40 border-t border-[#C5A46D]/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Editorial Left Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium block">
                    Act V • The Sovereign Solitaire
                  </span>
                  <h2 className="font-serif text-3xl md:text-5xl text-[#392B24] font-light mt-1">
                    One Stone. A Thousand Forever Moments.
                  </h2>
                </div>

                <p className="text-xs md:text-sm text-[#857667] leading-relaxed">
                  L’Étoile Céleste stands as our definitive solitaire creation. A singular 3.20 carat D-Flawless round brilliant diamond rises upon an architectonic six-prong cathedral setting, balanced with hidden micropavé diamonds beneath the gallery.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs text-[#392B24]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
                    <span>Proprietary 18k Champagne Gold alloy with hypoallergenic palladium stabilizer</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#392B24]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
                    <span>Six micro-beveled prongs providing optimal 360-degree light admission</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#392B24]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
                    <span>Concealed gallery set with 24 brilliant-cut micro diamonds</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      const ring = PRODUCTS.find((p) => p.id === 'etoile-celeste-solitaire');
                      if (ring) handleAddToCart(ring);
                    }}
                    className="px-8 py-3.5 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow-xl border border-[#C5A46D]/40"
                  >
                    Acquire Solitaire ({formatPrice(34500)})
                  </button>

                  <button
                    onClick={() => setIsRingSizerOpen(true)}
                    className="px-6 py-3.5 rounded-full border border-[#C5A46D]/50 text-[#392B24] hover:bg-[#F7F1E8] text-xs uppercase tracking-[0.2em] font-medium"
                  >
                    Ring Sizing Guide
                  </button>
                </div>
              </div>

              {/* 3D Interactive Ring Column */}
              <div className="lg:col-span-7">
                <InteractiveRingViewer />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ACT 6: THE DIAMOND LAB & 4Cs (Interactive Gemology) */}
        {/* ========================================================= */}
        <DiamondLabSection />

        {/* ========================================================= */}
        {/* ACT 7: THE HERITAGE & ATELIER STORY */}
        {/* ========================================================= */}
        <HeritageSection />

        {/* ========================================================= */}
        {/* ACT 8: THE FINAL MASTERPIECE & VELVET BOX FINALE */}
        {/* ========================================================= */}
        <section className="py-28 px-6 bg-[#F7F1E8] border-t border-[#C5A46D]/20 relative">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="max-w-3xl mx-auto space-y-3">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium block">
                Act VIII • The Grand Finale
              </span>
              <h2 className="font-serif text-3xl md:text-6xl text-[#392B24] font-light leading-tight">
                YOUR STORY DESERVES SOMETHING TIMELESS.
              </h2>
              <p className="text-xs md:text-sm text-[#857667] max-w-xl mx-auto leading-relaxed">
                Descended from royal European ateliers, each Maison Aurélia creation is sealed in our signature velvet jewel casket, ready to embark on generations of cherished legacy.
              </p>
            </div>

            {/* Interactive Masterpiece Casket 3D Canvas */}
            <div className="max-w-4xl mx-auto">
              <MasterpieceBoxViewer />
            </div>

            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleScrollToSection('section-collection')}
                className="px-10 py-4 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs uppercase tracking-[0.25em] font-medium shadow-2xl border border-[#C5A46D]/50"
              >
                Discover Your Diamond
              </button>
              <button
                onClick={() => setIsAppointmentOpen(true)}
                className="px-10 py-4 rounded-full border border-[#C5A46D] text-[#392B24] hover:bg-[#EDE2D3] transition-all text-xs uppercase tracking-[0.25em] font-medium shadow-sm"
              >
                Book Private Salon Appointment
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Luxury Brand Footer */}
      <LuxuryFooter />

      {/* Slide-Over Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        currency={currency}
        formatPrice={formatPrice}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        formatPrice={formatPrice}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={(id) =>
          setWishlist((prev) => prev.filter((p) => p.id !== id))
        }
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={currency}
        formatPrice={formatPrice}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={wishlist.some((p) => p.id === quickViewProduct?.id)}
        onOpenGia={(prod) => setGiaModalProduct(prod)}
        onOpenRingSizer={() => setIsRingSizerOpen(true)}
      />

      {giaModalProduct && (
        <GiaCertificateModal
          isOpen={!!giaModalProduct}
          onClose={() => setGiaModalProduct(null)}
          specs={giaModalProduct.specs}
          productName={giaModalProduct.name}
        />
      )}

      <RingSizerModal
        isOpen={isRingSizerOpen}
        onClose={() => setIsRingSizerOpen(false)}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currency={currency}
        formatPrice={formatPrice}
        onOrderComplete={() => setCart([])}
      />
    </div>
  );
}
