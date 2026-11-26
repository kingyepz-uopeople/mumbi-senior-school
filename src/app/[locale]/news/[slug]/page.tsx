import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import PageHero from '@/components/shared/PageHero';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { MOE_2027_CALENDAR } from '@/data/academic-calendar';
import { newsItems, schoolInfo } from '@/data/mock-school-data';
import { newsCategoryTextClasses } from '@/components/home/LatestNews';
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
      <PageHero
        as="header"
        maxWidth="narrow"
        variant="news"
        titleEffect={item.slug.includes('stem') ? 'scramble' : 'mask'}
        title={item.title}
        topSlot={
          <>
            <LocaleLink
              href="/#latest-news"
              className="min-h-11 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-blue-100 hover:text-white hover:underline underline-offset-4 transition-colors mb-5"
            >
              <ArrowLeft
                className="w-4 h-4 shrink-0 stroke-[1.75]"
                aria-hidden="true"
              />
              <span>{n.backToNotices}</span>
            </LocaleLink>

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
                {n.published}{' '}
                <time dateTime={toIsoDate(item.date)} className="font-semibold">
                  {item.date}
                </time>
              </span>
            </div>
          </>
        }
      />

      <div className="relative">
        <SectionStemBackdrop variant="article" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
          <article
            data-reveal=""
            className="bg-white/60 border border-slate-200 border-t-2 border-t-primary p-6 sm:p-10"
          >
            <p className="font-serif text-lg sm:text-xl text-slate-900 leading-relaxed pb-6 mb-6 border-b border-slate-200">
              {item.excerpt}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
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

            <div className="mt-10 pt-6 border-t border-slate-200 text-xs sm:text-sm text-slate-600 space-y-1 tabular-nums">
              <p className="font-serif font-bold text-base text-slate-900">
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

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              {isMinistryCalendar ? (
                <a
                  href={MOE_2027_CALENDAR.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
                >
                  <span>{n.calendarSource}</span>
                  <ArrowRight
                    className="w-4 h-4 shrink-0 stroke-[1.75]"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{dict.common.opensNewTab}</span>
                </a>
              ) : (
                <LocaleLink
                  href={primaryAction.href}
                  className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
                >
                  <span>{primaryAction.label}</span>
                  <ArrowRight
                    className="w-4 h-4 shrink-0 stroke-[1.75]"
                    aria-hidden="true"
                  />
                </LocaleLink>
              )}
              <LocaleLink
                href="/contact"
                className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold transition-colors"
              >
                {n.contactAdmin}
              </LocaleLink>
            </div>
          </article>

          {relatedItems.length > 0 && (
            <section
              data-reveal=""
              aria-labelledby="related-news-heading"
              className="space-y-4"
            >
              <div className="flex items-baseline justify-between gap-2">
                <BlurRevealHeading
                  id="related-news-heading"
                  seed={`related-news-${item.slug}`}
                  className="font-serif text-xl sm:text-2xl font-bold text-slate-900"
                >
                  {n.otherNotices}
                </BlurRevealHeading>
                <LocaleLink
                  href="/downloads"
                  className="min-h-11 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 shrink-0"
                >
                  <span>{n.allDocuments}</span>
                  <ArrowRight
                    className="w-4 h-4 stroke-[1.75]"
                    aria-hidden="true"
                  />
                </LocaleLink>
              </div>

              <div className="bg-white/45 border-t-2 border-t-primary border-x border-b border-slate-200 divide-y divide-slate-200">
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
                          <LocaleLink
                            href={`/news/${related.slug}`}
                            className="hover:text-primary hover:underline underline-offset-4 transition-colors"
                          >
                            {related.title}
                          </LocaleLink>
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
    </div>
  );
}