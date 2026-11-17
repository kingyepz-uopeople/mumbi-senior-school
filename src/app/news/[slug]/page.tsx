import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, FileText, Mail } from 'lucide-react';
import { newsItems, schoolInfo } from '@/data/mock';

const categoryStyles: Record<string, { bg: string; text: string }> = {
  Newsletter: { bg: 'rgba(59,130,246,0.1)', text: '#2563eb' },
  Circular: { bg: 'rgba(245,158,11,0.1)', text: '#d97706' },
  Download: { bg: 'rgba(34,197,94,0.1)', text: '#16a34a' },
  Event: { bg: 'rgba(139,92,246,0.1)', text: '#7c3aed' },
};

function toIsoDate(ddMmYyyy: string): string {
  const [dd, mm, yyyy] = ddMmYyyy.split('/');
  return `${yyyy}-${mm}-${dd}`;
}

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find((entry) => entry.slug === slug);

  if (!item) {
    return {
      title: 'News Not Found | Mumbi Girls Senior School',
    };
  }

  return {
    title: `${item.title} | Mumbi Girls Senior School`,
    description: item.excerpt,
  };
}

export default async function NewsItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = newsItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  const badge = categoryStyles[item.category] ?? categoryStyles.Event;

  return (
    <div className="min-h-screen bg-slate-bg">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-maroon via-[#5c0017] to-maroon text-white py-14 px-4 border-b-4 border-gold">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-wider">
              {item.category}
            </span>
            <time
              dateTime={toIsoDate(item.date)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-200 font-medium"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {item.date}
            </time>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
            {item.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
          <div className="flex items-center justify-between flex-wrap gap-2 pb-6 mb-6 border-b border-slate-100">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              {item.category}
            </span>
            <span className="text-xs text-slate-500">
              Published: <strong className="text-slate-700">{item.date}</strong>
            </span>
          </div>

          <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-8">
            {item.excerpt}
          </p>

          <div className="p-5 rounded-xl bg-slate-bg border border-slate-200 text-sm text-slate-600 mb-8">
            For official downloadable circulars, newsletters, fee structures,
            and holiday assignment packages issued by{' '}
            <strong className="text-slate-800">{schoolInfo.name}</strong>, visit
            the Downloads Hub or reach out to the school office (
            {schoolInfo.postalAddress}).
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/downloads"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-maroon hover:bg-maroon/90 text-white text-sm font-bold shadow-sm transition-colors"
            >
              <FileText className="w-4 h-4 text-gold" />
              Go to Downloads Hub
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-maroon text-maroon hover:bg-maroon/5 text-sm font-bold transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Office
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
