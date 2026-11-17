import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  FolderDown,
  Mail,
} from 'lucide-react';
import { newsItems, schoolInfo } from '@/data/mock-school-data';
import { newsCategoryBadgeClasses } from '@/components/home/LatestNews';
import { buildPageMetadata } from '@/lib/site';
import { parseDateKE, toIsoDate } from '@/lib/utils';

export function generateStaticParams() {
  return newsItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find((entry) => entry.slug === slug);

  if (!item) {
    return buildPageMetadata({
      title: 'Announcement Not Found',
      description: `The requested announcement could not be found on ${schoolInfo.name}.`,
      path: `/news/${slug}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/news/${item.slug}`,
    type: 'article',
    publishedTime: toIsoDate(item.date),
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = newsItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  const relatedItems = newsItems
    .filter((entry) => entry.slug !== item.slug)
    .sort(
      (a, b) => parseDateKE(b.date).getTime() - parseDateKE(a.date).getTime()
    )
    .slice(0, 3);

  const headerBadgeClasses: Record<string, string> = {
    Newsletter: 'bg-black/25 text-white border-white/30',
    Circular: 'bg-black/25 text-gold border-gold/45',
    Download: 'bg-black/25 text-white border-white/30',
    Event: 'bg-black/25 text-gold border-gold/45',
  };

  return (
    <div className="bg-slate-bg">
      {/* Article Header Banner (sole h1 on page) */}
      <header
        data-dark-surface
        className="bg-maroon text-white py-12 sm:py-16 px-4 sm:px-6 border-b-4 border-gold"
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#latest-news"
            className="min-h-11 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gold hover:text-white transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Back to Notices &amp; Announcements</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                headerBadgeClasses[item.category] ??
                'bg-white/15 text-white border-white/25'
              }`}
            >
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/90 font-medium">
              <Calendar
                className="w-4 h-4 text-gold shrink-0"
                aria-hidden="true"
              />
              <span>Published:</span>
              <time dateTime={toIsoDate(item.date)} className="font-bold">
                {item.date}
              </time>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            {item.title}
          </h1>
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        <article className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 sm:p-10 shadow-xs">
          <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed pb-6 mb-6 border-b border-slate-200">
            {item.excerpt}
          </p>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {item.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Official Sign-Off */}
          <div className="mt-8 pt-6 border-t border-slate-200 bg-slate-bg rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-slate-600 space-y-1">
            <p className="font-bold text-slate-900">
              Issued by the Administration Office — {schoolInfo.name}
            </p>
            <p>
              {schoolInfo.postalAddress} • KNEC: {schoolInfo.knecCode} • MoE:{' '}
              {schoolInfo.moeReg}
            </p>
            <p>Office Hours: {schoolInfo.officeHours}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="/downloads"
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-maroon hover:bg-maroon/90 text-white text-sm font-bold transition-colors shadow-xs"
            >
              <FolderDown
                className="w-4 h-4 text-gold shrink-0"
                aria-hidden="true"
              />
              <span>Visit Downloads &amp; Resources Hub</span>
            </Link>
            <Link
              href="/contact"
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-maroon text-maroon hover:bg-maroon hover:text-white text-sm font-bold transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Contact Administration</span>
            </Link>
          </div>
        </article>

        {/* Related Announcements */}
        {relatedItems.length > 0 && (
          <section aria-labelledby="related-news-heading" className="space-y-6">
            <div className="flex items-center justify-between gap-2">
              <h2
                id="related-news-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900"
              >
                More School Announcements
              </h2>
              <Link
                href="/downloads"
                className="min-h-11 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-maroon hover:underline shrink-0"
              >
                <span>All Circulars</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedItems.map((related) => {
                const badgeClass =
                  newsCategoryBadgeClasses[related.category] ??
                  'bg-slate-100 text-slate-800 border-slate-200';
                return (
                  <article
                    key={related.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-maroon hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border ${badgeClass}`}
                        >
                          {related.category}
                        </span>
                        <time
                          dateTime={toIsoDate(related.date)}
                          className="text-xs font-semibold text-slate-600"
                        >
                          {related.date}
                        </time>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2 leading-snug">
                        <Link
                          href={`/news/${related.slug}`}
                          className="hover:text-maroon transition-colors"
                        >
                          {related.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {related.excerpt}
                      </p>
                    </div>
                    <Link
                      href={`/news/${related.slug}`}
                      className="min-h-11 inline-flex items-center gap-1.5 text-xs font-bold text-maroon hover:underline"
                    >
                      <span>Read Notice</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
