'use client';

import React, { useState } from 'react';
import { Product, Currency } from '@/types/jewellery';
import ProductModalViewer from '../3d/ProductModalViewer';
import {
  X,
  Heart,
  ShoppingBag,
  Shield,
  FileText,
  Ruler,
  Sparkles,
  Check,
} from 'lucide-react';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  currency: Currency;
  formatPrice: (amount: number) => string;
  onAddToCart: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenGia: (product: Product) => void;
  onOpenRingSizer: () => void;
}

export default function ProductQuickViewModal({
  product,
  onClose,
  currency,
  formatPrice,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenGia,
  onOpenRingSizer,
}: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.defaultSize || (product?.sizes ? product.sizes[0] : '')
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 md:p-6 bg-[#392B24]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-[#F7F1E8] border border-[#C5A46D]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border border-[#C5A46D]/30 bg-[#F7F1E8]/80 backdrop-blur-sm flex items-center justify-center text-[#392B24] hover:bg-[#EDE2D3] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* 3D Viewer Half */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-[#EDE2D3]/40 to-[#F7F1E8] border-b md:border-b-0 md:border-r border-[#C5A46D]/20">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-medium block">
              {product.collection}
            </span>
            <span className="text-xs italic text-[#857667]">{product.frenchName}</span>
          </div>

          <div className="my-4">
            <ProductModalViewer product={product} />
          </div>

          <div className="flex items-center justify-between text-xs text-[#857667]">
            <button
              onClick={() => onOpenGia(product)}
              className="flex items-center gap-1.5 text-[#392B24] hover:text-[#C5A46D] font-medium transition-colors"
            >
              <FileText className="w-4 h-4 text-[#C5A46D]" />
              <span>Inspect GIA Dossier</span>
            </button>
            <span className="font-mono text-[11px]">{product.specs.giaNumber}</span>
          </div>
        </div>

        {/* Details Half */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
          <div className="space-y-4">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#392B24] leading-tight">
                {product.name}
              </h2>
              <p className="font-serif text-2xl text-[#392B24] font-medium mt-2">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="text-xs text-[#857667] leading-relaxed">
              {product.description}
            </p>

            <blockquote className="border-l-2 border-[#C5A46D] pl-3 py-1 italic text-xs text-[#392B24]/80">
              "{product.editorialQuote}"
            </blockquote>

            {/* Diamond Specs Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#EDE2D3]/40 border border-[#C5A46D]/20 text-center text-xs">
              <div>
                <span className="text-[10px] uppercase text-[#857667] block">Carat</span>
                <span className="font-serif text-sm font-semibold text-[#392B24]">{product.specs.carat} ct</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#857667] block">Color</span>
                <span className="font-serif text-sm font-semibold text-[#392B24]">{product.specs.color} (Colorless)</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#857667] block">Clarity</span>
                <span className="font-serif text-sm font-semibold text-[#392B24]">{product.specs.clarity}</span>
              </div>
            </div>

            {/* Sizing options if applicable */}
            {product.sizes && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#857667] uppercase tracking-wider font-medium">Select Size</span>
                  <button
                    onClick={onOpenRingSizer}
                    className="flex items-center gap-1 text-[#C5A46D] hover:underline"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-[#392B24] text-[#F7F1E8] border border-[#392B24]'
                          : 'bg-white/60 text-[#392B24] border border-[#C5A46D]/30 hover:bg-[#EDE2D3]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-[#C5A46D]/20 mt-6">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium shadow-xl border border-[#C5A46D]/40"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#D9BD87]" />
                    <span>Added to Royal Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D9BD87]" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`w-12 h-12 rounded-full border border-[#C5A46D]/40 flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'bg-[#EDE2D3] text-[#C5A46D]'
                    : 'bg-white/50 text-[#392B24] hover:bg-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C5A46D]' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-[#857667] pt-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#C5A46D]" /> Place Vendôme Craft
              </span>
              <span>•</span>
              <span>Complimentary Armored Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
