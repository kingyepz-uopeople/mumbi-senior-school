'use client';

import { ArrowRight } from '@/components/icons';
import ProspectusIndexReveal from '@/components/home/ProspectusIndexReveal';
import { MOE_2027_CALENDAR } from '@/data/academic-calendar';
import { grade10Intake } from '@/data/admissions';
import { kcseReports } from '@/data/kcse';
import { schoolInfo } from '@/data/mock-school-data';
import { getNewsItem } from '@/i18n/content';
import { fill } from '@/i18n/fill';
import LocaleLink from '@/i18n/LocaleLink';
import { useLocale } from '@/i18n/locale-context';

const kcseYears = kcseReports.map(({ year }) => year);
const firstKcseYear = Math.min(...kcseYears);
const lastKcseYear = Math.max(...kcseYears);

export default function ParentQuickLinks() {
  const { locale, dict } = useLocale();
  const p = dict.home.parents;
  const calendarNotice = getNewsItem(locale, MOE_2027_CALENDAR.slug);

  const parentLinks = [
    {
      title: p.joiningTitle,
      detail: p.joiningDetail,
      href: '/admissions#reporting',
      isLatestCircular: false,
    },
    {
      title: p.uniformTitle,
      detail: p.uniformDetail,
      href: '/admissions#uniform',
      isLatestCircular: false,
    },
    {
      title: p.feesTitle,
      detail: fill(p.feesDetail, { year: grade10Intake.year }),
      href: '/admissions#fees',
      isLatestCircular: false,
    },
    {
      title: p.holidayTitle,
      detail: p.holidayDetail,
      href: '/downloads',
      isLatestCircular: false,
    },
    {
      title: p.circularTitle,
      detail: calendarNotice
        ? `${calendarNotice.title}, ${calendarNotice.date}`
        : p.circularFallback,
      href: `/news/${MOE_2027_CALENDAR.slug}`,
      isLatestCircular: true,
    },
    {
      title: p.kcseTitle,
      detail: fill(p.kcseDetail, {
        first: firstKcseYear,
        last: lastKcseYear,
      }),
      href: '/academics#kcse-results',
      isLatestCircular: false,
    },
    {
      title: p.contactTitle,
      detail: fill(p.contactDetail, { location: schoolInfo.locationShort }),
      href: '/contact',
      isLatestCircular: false,
    },
  ];

  return (
    <section
      id="family-quick-links"
      tabIndex={-1}
      aria-labelledby="parent-quick-links-heading"
      data-dark-surface
      className="scroll-mt-4 bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="parent-quick-links-heading"
          className="font-serif text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
        >
          {dict.home.parentsKicker}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-lg">
          {dict.home.parentsBody}
        </p>

        <ol
          className="prospectus-index mt-10 sm:mt-12"
          data-prospectus-index=""
        >
          {parentLinks.map((item, index) => (
            <li key={item.href + item.title} className="prospectus-cell">
              <LocaleLink href={item.href} className="prospectus-row">
                <span className="prospectus-numeral" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline gap-2">
                    <span className="font-serif text-lg leading-snug font-semibold text-white sm:text-xl">
                      {item.title}
                    </span>
                    {item.isLatestCircular && (
                      <span className="dot-latest shrink-0" aria-hidden="true" />
                    )}
                  </span>
                  <span className="mt-1 block text-[0.82rem] leading-relaxed text-blue-100/80 sm:text-sm">
                    {item.detail}
                  </span>
                </span>
                <ArrowRight
                  className="prospectus-arrow size-5 shrink-0 text-white"
                  aria-hidden="true"
                />
              </LocaleLink>
            </li>
          ))}
        </ol>

        <ProspectusIndexReveal />
      </div>
    </section>
  );
}
