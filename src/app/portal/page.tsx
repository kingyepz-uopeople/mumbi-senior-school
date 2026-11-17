import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Student & Staff Portal (Coming Soon)',
  description:
    'Information on the upcoming Mumbi Girls Senior School online portal for students, parents, and staff. Public circulars and downloads are open now without sign-in.',
  path: '/portal',
});

const UPCOMING_MODULES = [
  {
    title: 'Students & Parents',
    description:
      'Term academic reports, holiday assignment downloads, attendance records, and fee statements.',
  },
  {
    title: 'Teaching Staff',
    description:
      'Departmental assignment uploads, class lists, assessment entry, and internal notices.',
  },
  {
    title: 'School Administration',
    description:
      'Publication of term circulars, joining instructions, examination timetables, and newsletters.',
  },
] as const;

export default function PortalComingSoonPage() {
  return (
    <div className="bg-slate-bg">
      <PageHeader
        kicker="Online Services"
        title="Student & Staff Portal"
        description="Student, parent, and staff login accounts are scheduled for a later phase. Public circulars, holiday assignments, and fee schedules remain available below without sign-in."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Status Notice */}
        <section
          aria-labelledby="portal-status-heading"
          className="bg-white border border-slate-200 border-t-2 border-t-primary p-6 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            <div className="w-24 sm:w-28 shrink-0 rounded-xs bg-[#f7f7f7] border border-slate-200 p-2">
              <Image
                src="/images/mumbi-logo.png"
                alt="Mumbi Girls' Senior School crest"
                width={100}
                height={102}
                sizes="(max-width: 640px) 80px, 96px"
                priority
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="space-y-4 max-w-2xl">
              <span className="inline-block px-2.5 py-0.5 rounded-xs text-[11px] font-bold uppercase tracking-[0.12em] bg-accent text-white">
                Coming Soon
              </span>

              <h2
                id="portal-status-heading"
                className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
              >
                Online sign-in is not yet open
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {schoolInfo.name} is publishing its public school website first.
                Accounts for students, parents, and teaching staff will open in
                a later rollout and will be announced through official school
                circulars. All current public documents can be accessed below.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3">
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
                <Link
                  href="/"
                  className="min-h-11 inline-flex items-center justify-center px-4 py-2.5 rounded-sm text-slate-700 hover:text-primary hover:underline underline-offset-4 text-sm font-medium transition-colors"
                >
                  Return to home
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Planned Portal Sections */}
        <section aria-labelledby="portal-modules-heading" className="space-y-5">
          <h2
            id="portal-modules-heading"
            className="font-serif text-xl sm:text-2xl font-bold text-slate-900"
          >
            Planned Portal Sections
          </h2>

          <div className="bg-white border-t-2 border-t-primary border-x border-b border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {UPCOMING_MODULES.map((module) => (
              <article key={module.title} className="p-6">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {module.description}
                </p>
              </article>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 border-l-2 border-primary pl-4 leading-relaxed">
            <strong className="text-slate-900">Notice to parents and students:</strong>{' '}
            Do not share admission numbers or personal details through
            unofficial links. Portal registration instructions will be issued
            only by {schoolInfo.name} ({schoolInfo.postalAddress}).
          </p>
        </section>
      </div>
    </div>
  );
}
