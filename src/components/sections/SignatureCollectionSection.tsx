'use client';

import React, { useState } from 'react';
import { Product, Currency } from '@/types/jewellery';
import { getAssetUrl } from '@/utils/assetPath';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';

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
    { id: 'all', label: 'All Collections' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'everyday', label: 'Everyday' },
    { id: 'polki', label: 'Polki' },
    { id: 'temple', label: 'Temple' },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter(
          (p) =>
            p.collection.toLowerCase().includes(activeCategory.toLowerCase()) ||
            p.categoryLabel.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <section id="section-collection" className="py-24 px-6 bg-[#F7F1E8] relative border-t border-[#C5A46D]/20">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Quadrant Banner (From Aurelia Jewels Experience) */}
        <div className="mb-20 text-center space-y-4">
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#C5A46D] font-medium block">
            The Collections • Haute Joaillerie
          </span>
          <h2 className="font-serif italic text-4xl md:text-6xl text-[#392B24] font-light">
            Elegance, Understood Piece by Piece.
          </h2>
          <p className="text-xs md:text-sm text-[#857667] leading-relaxed max-w-xl mx-auto">
            Explore our hallmark creations, from architectural solitaire rings to antique temple nakshi and Cuttack silver lace filigree.
          </p>

          {/* Minimalist Pill Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.25em] font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#392B24] text-[#F7F1E8] shadow-md border border-[#392B24]'
                    : 'bg-[#EDE2D3]/60 text-[#392B24] hover:bg-[#EDE2D3] border border-[#C5A46D]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid - Aurelia Jewels Framed Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isHovered = hoveredProduct === product.id;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative bg-[#F7F1E8] p-4 rounded-xl border border-[#C5A46D]/25 transition-all duration-500 hover:border-[#C5A46D]/70 hover:shadow-xl flex flex-col justify-between"
              >
                {/* Visual Editorial Image Frame */}
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-[#EDE2D3]/50 border border-[#C5A46D]/15">
                  <img
                    src={getAssetUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Corner Accent Line */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-[#F7F1E8]/90 backdrop-blur-sm border border-[#C5A46D]/30">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A46D] font-medium">
                      {product.collection.toUpperCase()}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-[#C5A46D] text-white shadow-md'
                        : 'bg-[#F7F1E8]/90 text-[#392B24] hover:bg-[#C5A46D] hover:text-white border border-[#C5A46D]/30'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Hover Quick Action Tray */}
                  <div
                    className={`absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                  >
                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="flex-1 py-2.5 rounded-full bg-[#F7F1E8]/95 backdrop-blur-md text-[#392B24] text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 border border-[#C5A46D]/40 hover:bg-[#EDE2D3]"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A46D]" />
                      3D Inspect
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2.5 rounded-full bg-[#392B24] text-[#F7F1E8] text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-1.5 hover:bg-[#201713]"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Typography & Pricing */}
                <div className="pt-5 pb-2 px-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl text-[#392B24] font-medium group-hover:text-[#C5A46D] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#857667] tracking-wider mt-0.5">
                        {product.metal} · {product.totalCaratWeight}
                      </p>
                    </div>
                    <span className="font-serif text-lg text-[#392B24] font-medium whitespace-nowrap">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <p className="text-xs text-[#857667] line-clamp-2 leading-relaxed pt-1">
                    {product.description}
                  </p>

                  <div className="pt-3 border-t border-[#C5A46D]/15 flex items-center justify-between text-[10px] text-[#857667]">
                    <span className="uppercase tracking-widest text-[#C5A46D] font-medium">
                      BIS Hallmarked
                    </span>
                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="hover:text-[#392B24] transition-colors tracking-wider underline underline-offset-4"
                    >
                      View Specifications →
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
