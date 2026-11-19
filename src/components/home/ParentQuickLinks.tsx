import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProspectusIndexReveal from '@/components/home/ProspectusIndexReveal';
import { grade10Intake } from '@/data/admissions';
import { kcseReports } from '@/data/kcse';
import { downloads, schoolInfo } from '@/data/mock-school-data';
import { parseDateKE } from '@/lib/utils';

// The newest circular on /downloads, used for the index line and the dot.
const latestCircular = [...downloads]
  .filter(({ category }) => category === 'Circular')
  .sort(
    (a, b) => parseDateKE(b.uploadDate).getTime() - parseDateKE(a.uploadDate).getTime()
  )[0];

const kcseYears = kcseReports.map(({ year }) => year);
const firstKcseYear = Math.min(...kcseYears);
const lastKcseYear = Math.max(...kcseYears);

// Every line below restates something the linked page actually shows.
// Keep titles and details short and plain — this reads like a contents page.
const parentLinks = [
  {
    title: 'Joining & reporting',
    detail: 'Reporting date, placement check and what to bring.',
    href: '/admissions#reporting',
    isLatestCircular: false,
  },
  {
    title: 'School fees',
    detail: `${grade10Intake.year} amounts are not published yet. Ask the school office for fees and instalments.`,
    href: '/admissions#fees',
    isLatestCircular: false,
  },
  {
    title: 'Holiday assignments',
    detail: 'Papers for Grade 10–12 and Form 3–4, filtered by class and subject.',
    href: '/downloads',
    isLatestCircular: false,
  },
  {
    title: 'Latest circular',
    detail: latestCircular
      ? `${latestCircular.title} — ${latestCircular.uploadDate}`
      : 'Term circulars and newsletters.',
    href: '/downloads',
    isLatestCircular: true,
  },
  {
    title: 'KCSE results',
    detail: `School mean, grade spread and top performers for ${firstKcseYear}–${lastKcseYear}.`,
    href: '/academics#kcse-results',
    isLatestCircular: false,
  },
  {
    title: 'Contact & location',
    detail: `Phone, email, office hours and the ${schoolInfo.locationShort} campus.`,
    href: '/contact',
    isLatestCircular: false,
  },
];

export default function ParentQuickLinks() {
  return (
    <section
      aria-labelledby="parent-quick-links-heading"
      data-dark-surface
      className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2
          id="parent-quick-links-heading"
          className="font-serif text-4xl leading-[1.05] font-bold tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
        >
          For parents
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-lg">
          Reporting, fees, circulars, holiday work, KCSE results and the school
          office.
        </p>

        <ol
          className="prospectus-index mt-10 sm:mt-12"
          data-prospectus-index=""
        >
          {parentLinks.map((item, index) => (
            <li key={item.title} className="prospectus-cell">
              <Link href={item.href} className="prospectus-row">
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
              </Link>
            </li>
          ))}
        </ol>

        <ProspectusIndexReveal />
      </div>
    </section>
  );
}
