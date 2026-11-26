import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from '@/components/icons';
import NoticeBoard from '@/components/news/NoticeBoard';
import NoticeNote from '@/components/news/NoticeNote';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import { MOE_2027_CALENDAR } from '@/data/academic-calendar';
import { newsItems, schoolInfo } from '@/data/mock-school-data';
import { getNewsItem, getNewsItems } from '@/i18n/content';
import LocaleLink from '@/i18n/LocaleLink';
import { isLocale, type Locale } from '@/i18n/config';
import { fill, getLocaleDictionary } from '@/i18n/server';
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
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  'use cache';
  const { slug, locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'en';
  const item = getNewsItem(locale, slug);

  if (!item) {
    const { dict } = await getLocaleDictionary(
      Promise.resolve({ locale: localeParam })
    );
    return buildPageMetadata({
      title: dict.news.notFound,
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
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale, dict } = await (async () => {
    const p = await params;
    const { locale: loc, dict: d } = await getLocaleDictionary(
      Promise.resolve({ locale: p.locale })
    );
    return { slug: p.slug, locale: loc, dict: d };
  })();
  const n = dict.news;
  const item = getNewsItem(locale, slug);

  if (!item) {
    notFound();
  }

  const isArchivedAdmissionsNotice =
    item.slug === 'admission-joining-instructions-2025';
  const isArchivedOpeningCircular =
    item.slug === 'term-1-opening-circular-2025';
  const isKcseResultsNotice = item.slug === '2024-kcse-results';
  const isMinistryCalendar = item.slug === MOE_2027_CALENDAR.slug;
  const primaryAction = isArchivedAdmissionsNotice
    ? { href: '/admissions', label: n.grade10Guide }
    : isArchivedOpeningCircular
      ? {
          href: `/news/${MOE_2027_CALENDAR.slug}`,
          label: n.readCircular,
        }
      : isKcseResultsNotice
        ? { href: '/academics#kcse-results', label: n.viewKcse }
        : { href: '/downloads', label: n.downloadsCirculars };
  const relatedItems = getNewsItems(locale)
    .filter((entry) => entry.slug !== item.slug)
    .sort(
      (a, b) => parseDateKE(b.date).getTime() - parseDateKE(a.date).getTime()
    )
    .slice(0, 3);

  return (
    <div className="bg-slate-bg">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <LocaleLink
          href="/news"
          transitionTypes={['news-back']}
          className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark hover:underline underline-offset-4"
        >
          <ArrowLeft
            className="h-4 w-4 shrink-0 stroke-[1.75]"
            aria-hidden="true"
          />
          <span>{n.backToNotices}</span>
        </LocaleLink>

        <div className="notice-board notice-board--story">
          <NoticeNote item={item} index={0} expanded>
            <div className="notice-story-prose space-y-10">
            <div className="space-y-4 text-sm leading-relaxed sm:text-base">
              {item.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {isMinistryCalendar ? (
              <section
                aria-labelledby="senior-secondary-calendar-heading"
                className="mt-10 border-t border-slate-200 pt-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {n.calendarKicker}
                </p>
                <h2
                  id="senior-secondary-calendar-heading"
                  className="mt-2 font-serif text-xl font-bold text-slate-900 sm:text-2xl"
                >
                  {n.calendarCaption}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                  {n.calendarNote}
                </p>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[36rem] border-t-2 border-primary text-left text-sm text-slate-800">
                    <caption className="sr-only">{n.calendarCaption}</caption>
                    <thead>
                      <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                        <th scope="col" className="py-3 pr-4 font-semibold">
                          {n.calendarPeriod}
                        </th>
                        <th scope="col" className="py-3 pr-4 font-semibold">
                          {n.calendarOpens}
                        </th>
                        <th scope="col" className="py-3 pr-4 font-semibold">
                          {n.calendarCloses}
                        </th>
                        <th scope="col" className="py-3 font-semibold">
                          {n.calendarDuration}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {MOE_2027_CALENDAR.rows.map((row) => (
                        <tr key={row.id}>
                          <th
                            scope="row"
                            className="py-3 pr-4 font-serif font-semibold text-slate-900"
                          >
                            {row.label}
                          </th>
                          <td className="py-3 pr-4 tabular-nums">{row.opens}</td>
                          <td className="py-3 pr-4 tabular-nums">{row.closes}</td>
                          <td className="py-3 tabular-nums">{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <dl className="mt-6 space-y-2 text-sm text-slate-700">
                  <div>
                    <dt className="inline font-semibold text-slate-900">
                      {n.calendarRef}{' '}
                    </dt>
                    <dd className="inline tabular-nums">{MOE_2027_CALENDAR.ref}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-slate-900">
                      {n.calendarSigned}{' '}
                    </dt>
                    <dd className="inline">
                      {MOE_2027_CALENDAR.signedBy}, {MOE_2027_CALENDAR.signedByRole}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={MOE_2027_CALENDAR.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    <span>{n.calendarSource}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 stroke-[1.75]"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{dict.common.opensNewTab}</span>
                  </a>
                  <a
                    href={MOE_2027_CALENDAR.sourceUrlAlt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
                  >
                    {n.calendarSourceAlt}
                    <span className="sr-only">{dict.common.opensNewTab}</span>
                  </a>
                </div>
              </section>
            ) : null}

            <div className="space-y-1 border-t border-current/15 pt-6 text-xs tabular-nums sm:text-sm">
              <p className="font-serif text-base font-bold">
                {fill(n.adminOffice, { name: schoolInfo.name })}
              </p>
              <p>
                {schoolInfo.postalAddress} · KNEC {schoolInfo.knecCode} · MoE{' '}
                {schoolInfo.moeReg}
              </p>
              <p>
                {n.officeHours} {dict.officeHours.full}
              </p>
            </div>

            <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
              {isMinistryCalendar ? (
                <a
                  href={MOE_2027_CALENDAR.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  <span>{n.calendarSource}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 stroke-[1.75]"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{dict.common.opensNewTab}</span>
                </a>
              ) : (
                <LocaleLink
                  href={primaryAction.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  <span>{primaryAction.label}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 stroke-[1.75]"
                    aria-hidden="true"
                  />
                </LocaleLink>
              )}
              <LocaleLink
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {n.contactAdmin}
              </LocaleLink>
            </div>
            </div>
          </NoticeNote>
        </div>

        {relatedItems.length > 0 ? (
          <section
            aria-labelledby="related-news-heading"
            className="mt-12 space-y-4"
          >
            <div className="flex items-baseline justify-between gap-2">
              <BlurRevealHeading
                id="related-news-heading"
                seed={`related-news-${item.slug}`}
                className="font-serif text-xl font-bold text-primary-dark sm:text-2xl"
              >
                {n.otherNotices}
              </BlurRevealHeading>
              <LocaleLink
                href="/news"
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-xs font-semibold text-primary underline-offset-4 hover:text-primary-dark hover:underline sm:text-sm"
              >
                <span>{dict.home.newsAllNotices}</span>
                <ArrowRight
                  className="h-4 w-4 stroke-[1.75]"
                  aria-hidden="true"
                />
              </LocaleLink>
            </div>

            <NoticeBoard
              items={relatedItems}
              readMoreLabel={dict.common.readMore}
              compact
              variant="related"
              labelledBy="related-news-heading"
            />
          </section>
        ) : null}
      </div>
    </div>
  );
}