'use client';

import React from 'react';
import { Product } from '@/types/jewellery';
import { X, Heart, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  formatPrice: (amount: number) => string;
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (id: string) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  formatPrice,
  onAddToCart,
  onRemoveFromWishlist,
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-[#392B24]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F1E8] border-l border-[#C5A46D]/30 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#C5A46D]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#C5A46D] fill-[#C5A46D]" />
              <h3 className="font-serif text-2xl text-[#392B24]">Your Curated Wishlist ({wishlist.length})</h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[#C5A46D]/30 flex items-center justify-center text-[#392B24] hover:bg-[#EDE2D3]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-8 h-8 text-[#C5A46D]/50 mx-auto mb-3" />
                <p className="font-serif text-xl text-[#392B24]">No Saved Creations</p>
                <p className="text-sm text-[#857667] mt-1">
                  Click the heart icon on any high jewellery piece to preserve it in your private salon archive.
                </p>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-xl border border-[#C5A46D]/20 bg-[#EDE2D3]/30 flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A46D] font-medium">
                        {product.collection}
                      </span>
                      <h4 className="font-serif text-lg text-[#392B24] leading-tight mt-0.5">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#857667] mt-1">{product.metal} • {product.totalCaratWeight}</p>
                    </div>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="text-[#857667] hover:text-[#392B24]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#C5A46D]/15">
                    <span className="font-serif text-lg text-[#392B24] font-medium">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveFromWishlist(product.id);
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] text-xs uppercase tracking-widest font-medium transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D9BD87]" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
