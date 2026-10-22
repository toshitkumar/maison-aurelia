'use client';

import React, { useState } from 'react';
import type { Product, CartItem, Currency } from '@/types/jewellery';
import { PRODUCTS } from '@/data/products';
import LuxuryHeader from '@/components/layout/LuxuryHeader';
import LuxuryFooter from '@/components/layout/LuxuryFooter';
import AureliaHeroScrub from '@/components/sections/AureliaHeroScrub';
import SignatureCollectionSection from '@/components/sections/SignatureCollectionSection';
import AureliaCraftSection from '@/components/sections/AureliaCraftSection';
import DiamondLabSection from '@/components/sections/DiamondLabSection';
import AureliaHeritageSection from '@/components/sections/AureliaHeritageSection';
import AureliaVisitSection from '@/components/sections/AureliaVisitSection';
import CartDrawer from '@/components/commerce/CartDrawer';
import WishlistDrawer from '@/components/commerce/WishlistDrawer';
import ProductQuickViewModal from '@/components/commerce/ProductQuickViewModal';
import GiaCertificateModal from '@/components/commerce/GiaCertificateModal';
import RingSizerModal from '@/components/commerce/RingSizerModal';
import AppointmentModal from '@/components/commerce/AppointmentModal';
import CheckoutModal from '@/components/commerce/CheckoutModal';

const CURRENCY_MAP: Record<Currency, { symbol: string; rate: number; prefix: boolean }> = {
  INR: { symbol: '₹', rate: 82.0, prefix: true },
  USD: { symbol: '$', rate: 1.0, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: false },
  GBP: { symbol: '£', rate: 0.79, prefix: true },
};

export default function Home() {
  // E-Commerce States
  const [currency, setCurrency] = useState<Currency>('INR');
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

  // Format Currency Helper
  const formatPrice = (amountUsd: number) => {
    const { symbol, rate, prefix } = CURRENCY_MAP[currency];
    const converted = Math.round(amountUsd * rate);
    const formatted = converted.toLocaleString('en-IN');
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
    <div className="min-h-screen bg-[#F7F1E8] text-[#392B24] flex flex-col font-sans selection:bg-[#EDE2D3] selection:text-[#392B24]">
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
        {/* HERO: AURELIA JEWELS SCROLL-DRIVEN EXPLODED SOLITAIRE */}
        {/* (The Apple product-page technique: zero video controls,    */}
        {/*  frame drawn to canvas at exact speed of user's hand)     */}
        {/* ========================================================= */}
        <AureliaHeroScrub
          onExploreClick={() => handleScrollToSection('section-collection')}
          onStoryClick={() => handleScrollToSection('section-heritage')}
        />

        {/* ========================================================= */}
        {/* COLLECTIONS: BRIDAL, EVERYDAY, POLKI, TEMPLE SHOWROOM */}
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
        {/* CRAFT: 41 HANDS & INTERACTIVE 3D ROTATING SOLITAIRE */}
        {/* ========================================================= */}
        <AureliaCraftSection
          onOpenRingSizer={() => setIsRingSizerOpen(true)}
          onBookConsultation={() => setIsAppointmentOpen(true)}
        />

        {/* ========================================================= */}
        {/* THE DIAMOND LAB & 4CS INTERACTIVE GEMOLOGY */}
        {/* ========================================================= */}
        <DiamondLabSection />

        {/* ========================================================= */}
        {/* HERITAGE: 500 YEARS OF CUTTACK TARAKASI FILIGREE */}
        {/* ========================================================= */}
        <AureliaHeritageSection />

        {/* ========================================================= */}
        {/* VISIT: CUTTACK FLAGSHIP SHOWROOM, HOURS & GOOGLE MAPS */}
        {/* ========================================================= */}
        <AureliaVisitSection onOpenAppointment={() => setIsAppointmentOpen(true)} />
      </main>

      {/* Luxury Footer */}
      <LuxuryFooter
        onScrollToSection={handleScrollToSection}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* ========================================================= */}
      {/* COMMERCE MODALS & DRAWERS */}
      {/* ========================================================= */}
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
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={currency}
        formatPrice={formatPrice}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
        onOpenGia={(p) => setGiaModalProduct(p)}
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
