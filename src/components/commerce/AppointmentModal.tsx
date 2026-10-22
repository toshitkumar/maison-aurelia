'use client';

import React, { useState } from 'react';
import { X, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SALONS = [
  { id: 'paris', name: 'Place Vendôme Flagship', city: 'Paris, France', address: '18 Place Vendôme, 75001' },
  { id: 'london', name: 'New Bond Street Salons', city: 'London, UK', address: '144 New Bond St, Mayfair' },
  { id: 'newyork', name: 'Fifth Avenue Private Atelier', city: 'New York, USA', address: '712 Fifth Avenue' },
  { id: 'virtual', name: 'High Jewellery Virtual Saloon', city: 'Global Video Presence', address: 'Encrypted 4K Video Session' },
];

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [selectedSalon, setSelectedSalon] = useState('paris');
  const [date, setDate] = useState('2026-11-05');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-[#392B24]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#F7F1E8] border border-[#C5A46D]/40 rounded-2xl shadow-2xl p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#C5A46D]/30 flex items-center justify-center text-[#392B24] hover:bg-[#EDE2D3] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle className="w-12 h-12 text-[#C5A46D] mx-auto" />
            <h3 className="font-serif text-3xl text-[#392B24]">Your Private Appointment is Reserved</h3>
            <p className="text-sm text-[#857667] max-w-md mx-auto">
              A private gemological concierge from Maison Aurélia will contact you shortly to curate the stones and pieces presented for your private salon viewing.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-8 py-3 rounded-full bg-[#392B24] text-[#F7F1E8] text-xs uppercase tracking-widest font-medium"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center pb-6 border-b border-[#C5A46D]/20">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-medium block">
                Privé Concierge Service
              </span>
              <h3 className="font-serif text-3xl text-[#392B24] mt-1">
                Book a Private Consultation
              </h3>
              <p className="text-xs text-[#857667] mt-1">
                Experience exceptional diamonds, bespoke creations, and individual mounting consultations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#857667] block mb-2 font-medium">
                  Select Atelier Salon
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {SALONS.map((salon) => (
                    <div
                      key={salon.id}
                      onClick={() => setSelectedSalon(salon.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedSalon === salon.id
                          ? 'border-[#392B24] bg-[#EDE2D3] shadow-sm'
                          : 'border-[#C5A46D]/20 bg-white/40 hover:bg-[#EDE2D3]/40'
                      }`}
                    >
                      <p className="font-serif text-sm font-semibold text-[#392B24]">{salon.name}</p>
                      <p className="text-[11px] text-[#857667] mt-0.5">{salon.address}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#857667] block mb-1 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Vivienne"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#C5A46D]/30 bg-white/70 text-sm focus:outline-none focus:border-[#392B24]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#857667] block mb-1 font-medium">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#C5A46D]/30 bg-white/70 text-sm focus:outline-none focus:border-[#392B24]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#857667] block mb-1 font-medium">
                  Private Contact Email / Phone
                </label>
                <input
                  type="email"
                  required
                  placeholder="concierge@private.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#C5A46D]/30 bg-white/70 text-sm focus:outline-none focus:border-[#392B24]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#392B24] text-[#F7F1E8] hover:bg-[#201713] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow-xl border border-[#C5A46D]/40 mt-4"
              >
                Confirm Salon Reservation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
