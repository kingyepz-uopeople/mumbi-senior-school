import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  FileSpreadsheet,
  FolderDown,
  Lock,
  Mail,
  ShieldCheck,
  Users,
} from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Student & Staff Portal (Coming Soon)',
  description:
    'Preview of the upcoming Mumbi Girls Senior School digital portal for students, parents, and teaching staff. Public downloads and circulars remain accessible now.',
  path: '/portal',
});

const UPCOMING_MODULES = [
  {
    title: 'Student & Parent Access',
    description:
      'View termly academic progress reports, subject assignments, attendance summaries, and official fee statements in a single secure dashboard.',
    icon: BookOpen,
  },
  {
    title: 'Teaching Staff Workspace',
    description:
      'Publish holiday revision packages, upload departmental learning materials, and share timely academic notices with students and parents.',
    icon: Users,
  },
  {
    title: 'Administration & Records',
    description:
      'Issue verified school circulars, joining instructions, examination timetables, and termly newsletters directly to the public website.',
    icon: FileSpreadsheet,
  },
] as const;

export default function PortalComingSoonPage() {
  return (
    <div className="bg-slate-bg">
      <PageHeader
        badge="Digital Campus Portal"
        title="Student & Staff Portal"
        description="A secure, role-based online portal for Mumbi Girls Senior School learners, parents, and staff is scheduled for a future rollout phase."
        icon={Lock}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Status Banner Card */}
        <section
          aria-labelledby="portal-status-heading"
          className="bg-white rounded-3xl border border-slate-200 border-t-4 border-t-gold p-6 sm:p-10 md:p-12 shadow-xs text-center"
        >
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-slate-bg border border-slate-200 p-2 flex items-center justify-center shadow-xs">
            <Image
              src="/images/school-crest.png"
              alt="Mumbi Girls Senior School crest"
              width={64}
              height={64}
              sizes="64px"
              className="w-16 h-16 object-contain"
            />
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-maroon/10 text-maroon mb-4">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Coming Soon — Planned Rollout</span>
          </span>

          <h2
            id="portal-status-heading"
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3"
          >
            Online Sign-In Is Not Yet Active
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {schoolInfo.name} is completing its public information website first.
            Student, parent, and staff login accounts will be activated in the
            upcoming portal phase. In the meantime, all public circulars,
            holiday assignments, fee structures, and admission inquiries are
            available below without signing in.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            <Link
              href="/downloads"
              className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-maroon hover:bg-maroon/90 text-white text-sm font-bold transition-colors shadow-xs"
            >
              <FolderDown
                className="w-4 h-4 text-gold shrink-0"
                aria-hidden="true"
              />
              <span>Browse Downloads Hub</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-maroon text-maroon hover:bg-maroon hover:text-white text-sm font-bold transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Contact Administration</span>
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-slate-700 hover:text-maroon hover:bg-slate-100 text-sm font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </div>
        </section>

        {/* Planned Portal Capabilities */}
        <section aria-labelledby="portal-modules-heading" className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Future Capabilities
            </span>
            <h2
              id="portal-modules-heading"
              className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 mb-2"
            >
              What the Portal Will Provide
            </h2>
            <div
              className="w-14 h-1 rounded-full bg-gold mx-auto"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <article
                  key={module.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {module.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="bg-maroon/5 border border-maroon/15 rounded-2xl p-5 flex items-start gap-3 text-xs sm:text-sm text-slate-700">
            <ShieldCheck
              className="w-5 h-5 text-maroon shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="leading-relaxed">
              <strong className="text-slate-900">Data Protection Notice:</strong>{' '}
              Never share personal passwords or admission numbers through
              unofficial channels. Official onboarding instructions will be
              communicated directly through verified {schoolInfo.name} circulars
              ({schoolInfo.postalAddress}).
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
