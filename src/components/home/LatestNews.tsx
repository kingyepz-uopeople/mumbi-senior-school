import Link from 'next/link';
import { ArrowRight, Calendar, FolderDown } from 'lucide-react';
import { newsItems } from '@/data/mock-school-data';
import { parseDateKE, toIsoDate } from '@/lib/utils';

export const newsCategoryBadgeClasses: Record<string, string> = {
  Newsletter: 'bg-primary/10 text-primary border-primary/20',
  Circular: 'bg-accent/10 text-accent border-accent/25',
  Download: 'bg-primary-dark/10 text-primary-dark border-primary-dark/20',
  Event: 'bg-slate-100 text-slate-800 border-slate-300',
};

export default function LatestNews() {
  const displayItems = [...newsItems]
    .sort(
      (a, b) => parseDateKE(b.date).getTime() - parseDateKE(a.date).getTime()
    )
    .slice(0, 3);

  return (
    <section
      id="latest-news"
      aria-labelledby="latest-news-heading"
      className="py-14 sm:py-20 bg-slate-bg scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Notices &amp; Announcements
          </span>
          <h2
            id="latest-news-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-3"
          >
            Latest News, Circulars &amp; Downloads
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-3">
            Stay up to date with official term circulars, newsletters,
            examination updates, and downloadable resource packs.
          </p>
          <div
            className="w-16 h-1 rounded-full bg-accent mx-auto"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => {
            const badgeClass =
              newsCategoryBadgeClasses[item.category] ??
              newsCategoryBadgeClasses.Event;

            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-primary hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="h-1.5 bg-primary" aria-hidden="true" />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${badgeClass}`}
                    >
                      {item.category}
                    </span>
                    <time
                      dateTime={toIsoDate(item.date)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600"
                    >
                      <Calendar
                        className="w-3.5 h-3.5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      {item.date}
                    </time>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 mb-2 leading-snug">
                    <Link
                      href={`/news/${item.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">
                    {item.excerpt}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={`/news/${item.slug}`}
                      className="min-h-10 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark hover:gap-2.5 transition-all"
                    >
                      <span>Read Full Update</span>
                      <ArrowRight
                        className="w-4 h-4 shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/downloads"
            className="min-h-11 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-sm transition-colors"
          >
            <FolderDown className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Open Downloads &amp; Resources Hub</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
