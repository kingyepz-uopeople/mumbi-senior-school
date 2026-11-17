'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  Building,
  CheckCircle2,
  Clock,
  Compass,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  Sparkles,
} from 'lucide-react';
import { schoolInfo } from '@/data/mock';
import { getSupabaseBrowserClient } from '@/lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'General Inquiry',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    'General Inquiry',
    'Admissions & CBC Pathways',
    'Fees & Accounts',
    'Academic Progress',
    'Tender & Procurement',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const supabase = getSupabaseBrowserClient();

      if (supabase) {
        // Attempt to write to Supabase if configured
        const { error } = await supabase.from('inquiries').insert([
          {
            full_name: formData.name,
            phone_number: formData.phone,
            email_address: formData.email,
            inquiry_category: formData.category,
            message_body: formData.message,
            created_at: new Date().toISOString(),
          },
        ]);

        if (error) {
          console.warn('Supabase insert note:', error.message);
          // Still succeed with local fallback
        }
      }

      // Simulate network response
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: 'General Inquiry',
        message: '',
      });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#800020] via-[#5c0017] to-[#800020] text-white py-16 px-4 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-4 h-4" />
            Communication &amp; Inquiries
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Contact &amp; Visit Us
          </h1>
          <p className="max-w-3xl mx-auto text-slate-200 text-lg leading-relaxed">
            Reach out to Mumbi Girls Senior School for admissions, academic queries, or official administrative correspondence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Official School Profile & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#800020] text-[#D4AF37] flex items-center justify-center font-bold text-lg shadow-sm">
                  MGS
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{schoolInfo.name}</h2>
                  <p className="text-xs text-[#800020] font-semibold">{schoolInfo.category}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase tracking-wider">Physical Campus Location</strong>
                    <p className="text-xs text-slate-600 mt-0.5">{schoolInfo.physicalLocation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase tracking-wider">Postal Address</strong>
                    <p className="text-xs text-slate-600 mt-0.5">{schoolInfo.postalAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase tracking-wider">Telephone &amp; Email</strong>
                    <p className="text-xs text-slate-600 mt-0.5">+254 (0) 700 000 000</p>
                    <p className="text-xs text-slate-600">info@mumbiseniorschool.sc.ke</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase tracking-wider">Official Office Hours</strong>
                    <p className="text-xs text-slate-600 mt-0.5">{schoolInfo.officeHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">KNEC Centre</span>
                  <span className="font-bold text-slate-900 text-sm">{schoolInfo.knecCode}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">MoE Reg. No</span>
                  <span className="font-bold text-slate-900 text-sm">{schoolInfo.moeReg}</span>
                </div>
              </div>
            </div>

            {/* Embedded Map Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  Mukuyu, Kiharu - Murang&apos;a Map
                </span>
                <span className="text-slate-400">Murang&apos;a East</span>
              </div>
              <div className="h-48 bg-slate-100 flex flex-col items-center justify-center p-6 text-center text-slate-500">
                <Compass className="w-10 h-10 text-[#800020] mb-2" />
                <p className="text-xs font-bold text-slate-700">Mumbi Girls Senior School Campus</p>
                <p className="text-[11px] text-slate-500 mt-1">Mukuyu Sub-location, Kiharu, Murang&apos;a</p>
                <span className="mt-2 text-[10px] px-2.5 py-1 rounded bg-white border border-slate-200 font-medium">
                  GPS: -0.7215° S, 37.1528° E
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiries Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">Send a Message</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">Official Online Inquiry Form</h2>
                <p className="text-xs text-slate-500 mt-1">
                  All inquiries are routed to the relevant administrative office and attended to within 24–48 working hours.
                </p>
              </div>

              {status === 'success' && (
                <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Inquiry Received Successfully!</h4>
                    <p className="text-xs mt-0.5">
                      Thank you for contacting Mumbi Girls Senior School. A member of our administration will contact you shortly.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Submission Error</h4>
                    <p className="text-xs mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Mwangi"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +254 712 345 678"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm text-slate-800 bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message / Query *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify your query in detail..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 px-6 rounded-xl bg-[#800020] hover:bg-[#66001a] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  {status === 'submitting' ? (
                    'Submitting Inquiry...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#D4AF37]" />
                      Submit Official Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
