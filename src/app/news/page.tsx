import type { Metadata } from 'next';
import NewsIndexClient from '@/components/news/NewsIndexClient';
import { newsItems } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'News & Events',
  description:
    'Official school notices, term circulars, newsletters, and announcements from Mumbi Girls Senior School.',
  path: '/news',
});

export default function NewsPage() {
  return (
    <div className="bg-slate-bg">
      <section
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
            School Notices
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            News &amp; Events
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            Term circulars, newsletters, and school announcements. Filter by
            category to read a notice.
          </p>

          <div className="mt-10 sm:mt-12">
            <NewsIndexClient items={newsItems} />
          </div>
        </div>
      </section>
    </div>
  );
}
