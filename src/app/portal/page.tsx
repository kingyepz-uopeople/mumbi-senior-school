import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, FileText, Mail, Shield } from 'lucide-react';
import { schoolInfo } from '@/data/mock';

export const metadata: Metadata = {
  title: 'Student & Staff Portal | Mumbi Girls Senior School',
  description:
    'The official Mumbi Girls Senior School Student & Staff Portal is coming soon.',
};

export default function PortalPlaceholderPage() {
  return (
    <div className="min-h-screen bg-slate-bg">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-maroon via-[#5c0017] to-maroon text-white py-16 px-4 border-b-4 border-gold">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-4 h-4" />
            Digital Campus Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Student &amp; Staff Portal
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-lg leading-relaxed">
            {schoolInfo.name} — KNEC Centre {schoolInfo.knecCode}
          </p>
        </div>
      </section>

      {/* Coming Soon Card */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold shadow-sm p-8 md:p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-maroon/10 text-maroon flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-maroon text-xs font-bold uppercase tracking-wider mb-3">
            Coming Soon
          </span>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Online Student &amp; Staff Sign-In Is Launching Soon
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Our dedicated Student and Staff Portal is currently being finalised.
            In the meantime, you can download holiday assignments, newsletters,
            joining instructions, and fee structures directly from the Downloads
            Hub, or contact the school administration office for assistance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/downloads"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-maroon hover:bg-maroon/90 text-white text-sm font-bold shadow-sm transition-colors"
            >
              <FileText className="w-4 h-4 text-gold" />
              Browse Downloads Hub
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-maroon text-maroon hover:bg-maroon/5 text-sm font-bold transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Administration
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>{schoolInfo.officeHours}</span>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-semibold text-maroon hover:text-maroon/80 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
