'use client';

import React, { useState } from 'react';
import { CartItem, Currency } from '@/types/jewellery';
import { X, Trash2, ShieldCheck, Gift, Check, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  formatPrice: (amount: number) => string;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  currency,
  formatPrice,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [includeGiftWrap, setIncludeGiftWrap] = useState(true);
  const [engravingText, setEngravingText] = useState('');

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#392B24]/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F7F1E8] border-l border-[#C5A46D]/30 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#C5A46D]/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-medium block">
                Maison Aurélia Atelier
              </span>
              <h3 className="font-serif text-2xl text-[#392B24] tracking-wide mt-0.5">
                Your Selection ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[#C5A46D]/30 flex items-center justify-center text-[#392B24] hover:bg-[#EDE2D3] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-serif text-xl text-[#392B24]">Your jewellery case is empty</p>
                <p className="text-sm text-[#857667] mt-2 mb-6">
                  Explore our high jewellery collection to curate your personal constellation.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full border border-[#C5A46D] text-xs uppercase tracking-widest text-[#392B24] hover:bg-[#C5A46D] hover:text-white transition-all font-medium"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="pb-6 border-b border-[#C5A46D]/15 flex gap-4"
                >
                  <div className="w-20 h-20 rounded-lg bg-[#EDE2D3] border border-[#C5A46D]/30 flex items-center justify-center p-2 flex-shrink-0">
                    <span className="font-serif text-xs text-center text-[#392B24] font-medium">
                      {item.product.name.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif text-base text-[#392B24] leading-snug truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#857667] hover:text-red-700 transition-colors ml-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#857667] mt-0.5">
                      {item.product.metal} • {item.product.totalCaratWeight}
                    </p>
                    {item.selectedSize && (
                      <p className="text-xs text-[#C5A46D] mt-0.5 font-medium">
                        Size: {item.selectedSize}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#C5A46D]/40 rounded-full overflow-hidden bg-[#EDE2D3]/40">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2.5 py-0.5 text-xs text-[#392B24] hover:bg-[#EDE2D3]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-medium text-[#392B24]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2.5 py-0.5 text-xs text-[#392B24] hover:bg-[#EDE2D3]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-base font-medium text-[#392B24]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {items.length > 0 && (
              <div className="space-y-4 pt-2">
                {/* Royal Packaging Toggle */}
                <div className="p-4 rounded-xl bg-[#EDE2D3]/50 border border-[#C5A46D]/20">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="packaging"
                      checked={includeGiftWrap}
                      onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                      className="mt-1 accent-[#C5A46D]"
                    />
                    <label htmlFor="packaging" className="text-xs text-[#392B24] cursor-pointer">
                      <span className="font-medium block text-sm">
                        Complimentary Royal Signature Packaging
                      </span>
                      Includes hand-stitched velvet jewel casket, sealed wax certificate, and white-glove ribbon.
                    </label>
                  </div>
                </div>

                {/* Assurance Badges */}
                <div className="flex items-center gap-2 text-xs text-[#857667]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A46D]" />
                  <span>Insured Armored Courier & GIA Certification Included</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#C5A46D]/20 bg-[#EDE2D3]/30 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-[#857667]">Estimated Total</span>
                <span className="font-serif text-2xl font-medium text-[#392B24]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#857667]">
                Taxes, customs & insured international priority courier calculated at checkout.
              </p>
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium shadow-xl hover:shadow-2xl border border-[#C5A46D]/50"
              >
                <span>Proceed to Sovereign Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D9BD87]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
