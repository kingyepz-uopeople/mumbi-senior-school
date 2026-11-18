import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { newsItems, schoolInfo } from '@/data/mock-school-data';
import { newsCategoryTextClasses } from '@/components/home/LatestNews';
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
      title: 'Notice Not Found',
      description: `The requested notice could not be found on ${schoolInfo.name}.`,
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

  return (
    <div className="bg-slate-bg">
      {/* Solid Crest-Blue Article Header (sole h1 on page) */}
      <header
        data-dark-surface
        className="bg-primary text-white border-b border-primary-dark"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <Link
            href="/#latest-news"
            className="min-h-11 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-100 hover:text-white hover:underline underline-offset-4 transition-colors mb-5"
          >
            <ArrowLeft
              className="w-4 h-4 shrink-0 stroke-[1.75]"
              aria-hidden="true"
            />
            <span>Back to school notices</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs mb-3 tabular-nums">
            {item.category === 'Circular' ? (
              <span className="px-2 py-0.5 rounded-xs font-bold uppercase tracking-[0.12em] bg-accent text-white">
                {item.category}
              </span>
            ) : (
              <span className="font-semibold uppercase tracking-[0.14em] text-blue-100">
                {item.category}
              </span>
            )}
            <span className="text-white/40" aria-hidden="true">
              ·
            </span>
            <span className="text-white/90">
              Published{' '}
              <time dateTime={toIsoDate(item.date)} className="font-semibold">
                {item.date}
              </time>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight">
            {item.title}
          </h1>

          <div
            data-hero-step="2"
            className="hero-rule w-12 h-0.5 bg-accent mt-5"
            aria-hidden="true"
          />
        </div>
      </header>

      {/* Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        <article
          data-reveal=""
          className="bg-white border border-slate-200 border-t-2 border-t-primary p-6 sm:p-10"
        >
          <p className="font-serif text-lg sm:text-xl text-slate-900 leading-relaxed pb-6 mb-6 border-b border-slate-200">
            {item.excerpt}
          </p>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
            {item.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Official Sign-Off */}
          <div className="mt-10 pt-6 border-t border-slate-200 text-xs sm:text-sm text-slate-600 space-y-1 tabular-nums">
            <p className="font-serif font-bold text-base text-slate-900">
              Administration Office — {schoolInfo.name}
            </p>
            <p>
              {schoolInfo.postalAddress} · KNEC {schoolInfo.knecCode} · MoE{' '}
              {schoolInfo.moeReg}
            </p>
            <p>Office Hours: {schoolInfo.officeHours}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <Link
              href="/downloads"
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
            >
              <span>Downloads &amp; circulars</span>
              <ArrowRight
                className="w-4 h-4 shrink-0 stroke-[1.75]"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/contact"
              className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-sm border border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold transition-colors"
            >
              Contact administration
            </Link>
          </div>
        </article>

        {/* Related Notices */}
        {relatedItems.length > 0 && (
          <section
            data-reveal=""
            aria-labelledby="related-news-heading"
            className="space-y-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2
                id="related-news-heading"
                className="font-serif text-xl sm:text-2xl font-bold text-slate-900"
              >
                Other School Notices
              </h2>
              <Link
                href="/downloads"
                className="min-h-11 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 shrink-0"
              >
                <span>All documents</span>
                <ArrowRight
                  className="w-4 h-4 stroke-[1.75]"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="bg-white border-t-2 border-t-primary border-x border-b border-slate-200 divide-y divide-slate-200">
              {relatedItems.map((related) => {
                const catClass =
                  newsCategoryTextClasses[related.category] ??
                  newsCategoryTextClasses.Event;
                return (
                  <article
                    key={related.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-[0.12em] ${catClass}`}
                      >
                        {related.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug mt-0.5">
                        <Link
                          href={`/news/${related.slug}`}
                          className="hover:text-primary hover:underline underline-offset-4 transition-colors"
                        >
                          {related.title}
                        </Link>
                      </h3>
                    </div>
                    <time
                      dateTime={toIsoDate(related.date)}
                      className="text-xs text-slate-600 tabular-nums shrink-0"
                    >
                      {related.date}
                    </time>
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
