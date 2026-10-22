'use client';

import React, { useState } from 'react';
import { CartItem, Currency } from '@/types/jewellery';
import { X, ShieldCheck, CheckCircle2, Lock, CreditCard, Landmark, Apple } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  formatPrice: (amount: number) => string;
  onOrderComplete: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  currency,
  formatPrice,
  onOrderComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'apple'>('card');
  const [orderId, setOrderId] = useState('MA-2026-8819');

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setOrderId(`MA-2026-${randomNum}`);
    setStep('success');
    onOrderComplete();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#392B24]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#F7F1E8] border border-[#C5A46D]/40 rounded-2xl shadow-2xl p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#C5A46D]/30 flex items-center justify-center text-[#392B24] hover:bg-[#EDE2D3] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'success' ? (
          <div className="text-center py-10 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#EDE2D3] border border-[#C5A46D] flex items-center justify-center mx-auto text-[#C5A46D]">
              <CheckCircle2 className="w-8 h-8 text-[#C5A46D]" />
            </div>

            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A46D] font-medium block">
              Haute Joaillerie Commission Confirmed
            </span>

            <h3 className="font-serif text-3xl md:text-4xl text-[#392B24]">
              Thank You for Your Trust
            </h3>

            <p className="text-sm text-[#857667] max-w-lg mx-auto leading-relaxed">
              Your acquisition has been entered into the official Place Vendôme High Jewellery Registry. 
              Order Passport Reference: <span className="font-mono text-[#392B24] font-semibold">{orderId}</span>.
            </p>

            <div className="p-4 bg-[#EDE2D3]/50 rounded-xl border border-[#C5A46D]/20 max-w-md mx-auto text-left text-xs space-y-2">
              <p className="flex justify-between">
                <span className="text-[#857667]">Delivery Protocol:</span>
                <span className="font-medium text-[#392B24]">White-Glove Armored Courier (Ferrari / Brink’s)</span>
              </p>
              <p className="flex justify-between">
                <span className="text-[#857667]">Insurance Status:</span>
                <span className="font-medium text-[#392B24]">100% Full Value Underwritten by Lloyd’s</span>
              </p>
              <p className="flex justify-between">
                <span className="text-[#857667]">Dossier Enclosed:</span>
                <span className="font-medium text-[#392B24]">Original GIA Certificate & Atelier Book</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 rounded-full bg-[#392B24] text-[#F7F1E8] text-xs uppercase tracking-widest font-medium hover:bg-[#201713]"
            >
              Return to Digital Flagship
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center pb-6 border-b border-[#C5A46D]/20">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-medium block">
                Sovereign Encrypted Transaction
              </span>
              <h3 className="font-serif text-3xl text-[#392B24] mt-1">
                Acquisition Checkout
              </h3>
              <p className="text-xs text-[#857667] mt-1">
                Total: <span className="font-serif text-lg font-semibold text-[#392B24]">{formatPrice(subtotal)}</span> (Complimentary Armored Delivery)
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="mt-6 space-y-5">
              {/* Payment Method Selector */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#857667] block mb-2 font-medium">
                  Select Settlement Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#392B24] bg-[#EDE2D3] shadow-sm'
                        : 'border-[#C5A46D]/20 bg-white/40 hover:bg-[#EDE2D3]/30'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#392B24]" />
                    <span className="text-xs font-medium text-[#392B24]">Black Card / Amex</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-3 rounded-xl border cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'wire'
                        ? 'border-[#392B24] bg-[#EDE2D3] shadow-sm'
                        : 'border-[#C5A46D]/20 bg-white/40 hover:bg-[#EDE2D3]/30'
                    }`}
                  >
                    <Landmark className="w-5 h-5 text-[#392B24]" />
                    <span className="text-xs font-medium text-[#392B24]">Private Wire</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-3 rounded-xl border cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'apple'
                        ? 'border-[#392B24] bg-[#EDE2D3] shadow-sm'
                        : 'border-[#C5A46D]/20 bg-white/40 hover:bg-[#EDE2D3]/30'
                    }`}
                  >
                    <Apple className="w-5 h-5 text-[#392B24]" />
                    <span className="text-xs font-medium text-[#392B24]">Apple Pay</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Recipient Full Name"
                    defaultValue="Eleanor Vance"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#C5A46D]/30 bg-white/70 text-sm focus:outline-none focus:border-[#392B24]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Armored Delivery Address"
                    defaultValue="48 Kensington Palace Gardens"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#C5A46D]/30 bg-white/70 text-sm focus:outline-none focus:border-[#392B24]"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    defaultValue="London"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#C5A46D]/30 bg-white/70 text-sm focus:outline-none focus:border-[#392B24]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    defaultValue="W8 4QP"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#C5A46D]/30 bg-white/70 text-sm focus:outline-none focus:border-[#392B24]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Country"
                    defaultValue="United Kingdom"
                    className="w-full px-4 py-2.5 rounded-lg border border-[#C5A46D]/30 bg-white/70 text-sm focus:outline-none focus:border-[#392B24]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#857667] pt-2">
                <Lock className="w-4 h-4 text-[#C5A46D]" />
                <span>256-bit Bank Grade Encryption • GIA Registered Tracking</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow-2xl border border-[#C5A46D]/50"
              >
                Complete Sovereign Acquisition ({formatPrice(subtotal)})
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
