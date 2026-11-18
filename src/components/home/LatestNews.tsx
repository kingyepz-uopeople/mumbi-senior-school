import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { newsItems } from '@/data/mock-school-data';
import { parseDateKE, toIsoDate } from '@/lib/utils';

export const newsCategoryTextClasses: Record<string, string> = {
  Circular: 'text-accent',
  Newsletter: 'text-primary',
  Download: 'text-primary-dark',
  Event: 'text-slate-700',
};

export default function LatestNews() {
  const displayItems = [...newsItems]
    .sort(
      (a, b) => parseDateKE(b.date).getTime() - parseDateKE(a.date).getTime()
    )
    .slice(0, 4);

  return (
    <section
      id="latest-news"
      aria-labelledby="latest-news-heading"
      className="relative py-16 sm:py-24 bg-slate-bg scroll-mt-28"
    >
      <SectionStemBackdrop variant="notices" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div
          data-reveal=""
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              School Office Notices
            </p>
            <h2
              id="latest-news-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            >
              Circulars, News &amp; Downloads
            </h2>
          </div>

          <Link
            href="/downloads"
            className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors shrink-0"
          >
            <span>All downloads &amp; circulars</span>
            <ArrowRight
              className="w-4 h-4 shrink-0 stroke-[1.75]"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Editorial Notice Register */}
        <div className="bg-white border-t-2 border-t-primary border-x border-b border-slate-200 divide-y divide-slate-200">
          {displayItems.map((item, idx) => {
            const categoryClass =
              newsCategoryTextClasses[item.category] ??
              newsCategoryTextClasses.Event;

            return (
              <article
                key={item.id}
                data-reveal=""
                data-reveal-delay={idx > 0 ? String(Math.min(idx, 3)) : undefined}
                className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start"
              >
                <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-3 md:gap-1">
                  <time
                    dateTime={toIsoDate(item.date)}
                    className="text-xs sm:text-sm font-medium text-slate-600 tabular-nums"
                  >
                    {item.date}
                  </time>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-[0.12em] ${categoryClass}`}
                  >
                    {item.category}
                  </span>
                </div>

                <div className="md:col-span-7">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-1.5">
                    <Link
                      href={`/news/${item.slug}`}
                      className="hover:text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <Link
                    href={`/news/${item.slug}`}
                    className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    <span>Read notice</span>
                    <ArrowRight
                      className="w-4 h-4 shrink-0 stroke-[1.75]"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
