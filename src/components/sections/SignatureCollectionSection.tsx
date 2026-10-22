'use client';

import React, { useState } from 'react';
import { Product, Currency } from '@/types/jewellery';
import { Heart, ShoppingBag, Eye, Sparkles, Filter } from 'lucide-react';

interface SignatureCollectionProps {
  products: Product[];
  currency: Currency;
  formatPrice: (amount: number) => string;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export default function SignatureCollectionSection({
  products,
  currency,
  formatPrice,
  onOpenQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}: SignatureCollectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Masterpieces' },
    { id: 'rings', label: 'Diamond Rings' },
    { id: 'necklaces', label: 'Diamond Necklaces' },
    { id: 'earrings', label: 'Diamond Earrings' },
    { id: 'bracelets', label: 'Diamond Bracelets' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="section-collection" className="py-28 px-6 bg-[#F7F1E8] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium block">
            Act IV • The Showroom
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#392B24] font-light">
            The Signature Collection
          </h2>
          <p className="text-xs md:text-sm text-[#857667] leading-relaxed max-w-xl mx-auto">
            Each creation is an unrepeatable dialogue between pure crystallised carbon and royal goldsmithing, engineered to capture and amplify every ray of light.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#392B24] text-[#F7F1E8] shadow-md border border-[#392B24]'
                    : 'bg-[#EDE2D3]/60 text-[#392B24] hover:bg-[#EDE2D3] border border-[#C5A46D]/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isHovered = hoveredProduct === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative bg-[#EDE2D3]/30 rounded-2xl border border-[#C5A46D]/25 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-[#C5A46D]/60 flex flex-col justify-between"
              >
                {/* Visual Preview Container */}
                <div className="relative h-72 md:h-80 w-full overflow-hidden bg-gradient-to-b from-[#F7F1E8] to-[#EDE2D3] flex items-center justify-center p-8">
                  {/* Subtle Light Sweep Animation on Card */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 -skew-x-12 ${
                      isHovered ? 'translate-x-full' : '-translate-x-full'
                    }`}
                  />

                  {/* Stylized Minimal Representation Icon / Motif */}
                  <div className="text-center relative z-10 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-28 h-28 mx-auto rounded-full border border-[#C5A46D]/30 bg-white/40 shadow-lg flex items-center justify-center relative">
                      <Sparkles className="w-10 h-10 text-[#C5A46D] animate-pulse" />
                      <div className="absolute inset-0 rounded-full border border-[#D9BD87]/40 scale-110" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-[#857667] block mt-4 font-medium">
                      {product.metal}
                    </span>
                  </div>

                  {/* Floating Action Icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                    <button
                      onClick={() => onToggleWishlist(product)}
                      title="Save to Wishlist"
                      className={`w-9 h-9 rounded-full border border-[#C5A46D]/30 flex items-center justify-center transition-all ${
                        isWishlisted
                          ? 'bg-[#EDE2D3] text-[#C5A46D]'
                          : 'bg-[#F7F1E8]/90 text-[#392B24] hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C5A46D]' : ''}`} />
                    </button>
                    <button
                      onClick={() => onOpenQuickView(product)}
                      title="3D Inspection"
                      className="w-9 h-9 rounded-full bg-[#F7F1E8]/90 border border-[#C5A46D]/30 flex items-center justify-center text-[#392B24] hover:bg-white transition-all"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-2.5 py-1 rounded-full bg-[#392B24]/90 text-[#F7F1E8] text-[9px] uppercase tracking-widest font-medium">
                      {product.totalCaratWeight}
                    </span>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium block">
                      {product.collection}
                    </span>
                    <h3 className="font-serif text-xl text-[#392B24] mt-1 group-hover:text-[#C5A46D] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#857667] line-clamp-2 mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Diamond Grade Metrics */}
                  <div className="pt-3 border-t border-[#C5A46D]/15 flex items-center justify-between text-xs">
                    <span className="font-serif text-xl font-medium text-[#392B24]">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[11px] text-[#857667] font-mono">
                      {product.specs.color} • {product.specs.clarity} • {product.specs.cut}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="flex-1 py-2.5 px-4 rounded-full border border-[#C5A46D]/50 text-xs uppercase tracking-widest text-[#392B24] hover:bg-[#EDE2D3] transition-all font-medium text-center"
                    >
                      3D Inspect
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 py-2.5 px-4 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs uppercase tracking-widest font-medium text-center flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D9BD87]" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
