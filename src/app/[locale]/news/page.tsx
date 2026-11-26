import type { Metadata } from 'next';
import NewsIndexClient from '@/components/news/NewsIndexClient';
import { getNewsItems } from '@/i18n/content';
import { getLocaleDictionary } from '@/i18n/server';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'News & Notices',
  description:
    'Official school notices, term circulars, newsletters, and announcements from the Mumbi Girls Senior School noticeboard.',
  path: '/news',
});

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getLocaleDictionary(params);
  const n = dict.news;
  const items = getNewsItems(locale);

  return (
    <div className="bg-slate-bg">
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <header className="mb-8 max-w-2xl sm:mb-10">
            <h1
              id="news-notices-heading"
              className="font-serif text-4xl leading-tight font-bold text-primary-dark sm:text-5xl lg:text-6xl"
            >
              {n.title}
            </h1>
            <p className="mt-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {n.kicker}
            </p>
          </header>

          <NewsIndexClient items={items} />
        </div>
      </section>
    </div>
  );
}
