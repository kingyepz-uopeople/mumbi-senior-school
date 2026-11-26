'use client';

import { ArrowRight } from '@/components/icons';
import NoticeBoard from '@/components/news/NoticeBoard';
import {
  getReturningSlugServerSnapshot,
  getReturningSlugSnapshot,
  subscribeReturningSlug,
} from '@/components/news/notice-theme';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { getNewsItems } from '@/i18n/content';
import LocaleLink from '@/i18n/LocaleLink';
import { useLocale } from '@/i18n/locale-context';
import { parseDateKE } from '@/lib/utils';
import { useSyncExternalStore } from 'react';

export default function LatestNews() {
  const { locale, dict } = useLocale();
  const h = dict.home;
  const returningSlug = useSyncExternalStore(
    subscribeReturningSlug,
    getReturningSlugSnapshot,
    getReturningSlugServerSnapshot
  );

  const displayItems = [...getNewsItems(locale)]
    .sort(
      (a, b) => parseDateKE(b.date).getTime() - parseDateKE(a.date).getTime()
    )
    .slice(0, 4);

  return (
    <section
      id="latest-news"
      aria-labelledby="latest-news-heading"
      className="relative scroll-mt-28 bg-slate-bg py-16 sm:py-24"
    >
      <SectionStemBackdrop variant="notices" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div
          data-reveal=""
          className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <BlurRevealHeading
              id="latest-news-heading"
              seed="home-latest-news"
              className="font-serif text-2xl font-bold leading-tight text-primary-dark sm:text-3xl lg:text-4xl"
            >
              {h.newsHeading}
            </BlurRevealHeading>
            <p className="mt-2 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {h.newsKicker}
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
            <LocaleLink
              href="/news"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-dark hover:underline"
            >
              <span>{h.newsAllNotices}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 stroke-[1.75]"
                aria-hidden="true"
              />
            </LocaleLink>
            <LocaleLink
              href="/downloads"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-dark hover:underline"
            >
              <span>{h.newsAllDownloads}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 stroke-[1.75]"
                aria-hidden="true"
              />
            </LocaleLink>
          </div>
        </div>

        <NoticeBoard
          items={displayItems}
          readMoreLabel={dict.common.readMore}
          variant="home"
          returningSlug={returningSlug}
          labelledBy="latest-news-heading"
        />
      </div>
    </section>
  );
}
