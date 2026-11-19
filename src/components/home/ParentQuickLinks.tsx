import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  ClipboardCheck,
  FileText,
  Phone,
} from 'lucide-react';

const parentLinks = [
  {
    title: 'Joining Instructions & Reporting',
    description: 'Reporting day checklist, required documents, and boarding items.',
    href: '/admissions#reporting',
    icon: ClipboardCheck,
  },
  {
    title: 'Fee Structure',
    description: 'Termly fee breakdown, payment details, and accounts guidance.',
    href: '/admissions#fees',
    icon: Banknote,
  },
  {
    title: 'Holiday Assignments',
    description: 'Departmental revision papers for Grades 10–12 and Forms 3–4.',
    href: '/downloads',
    icon: BookOpen,
  },
  {
    title: 'Latest Circular',
    description: 'Termly circulars, newsletters, and official parent notices.',
    href: '/downloads',
    icon: FileText,
  },
  {
    title: 'KCSE Results',
    description: '2022–2025 KCSE performance, grade spread, and roll of honour.',
    href: '/academics#kcse-results',
    icon: Award,
  },
  {
    title: 'Contact & Location',
    description: "Office hours, phone numbers, email, and directions to Murang'a.",
    href: '/contact',
    icon: Phone,
  },
] as const;

export default function ParentQuickLinks() {
  return (
    <section
      aria-labelledby="parent-quick-links-heading"
      className="bg-surface border-b border-slate-200 py-10 sm:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#C22F2F]"
                aria-hidden="true"
              />
              Parent &amp; Guardian Quick Links
            </p>
            <h2
              id="parent-quick-links-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
            >
              Essential School Information
            </h2>
          </div>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors shrink-0"
          >
            <span>Admissions &amp; reporting guide</span>
            <ArrowRight className="w-4 h-4 shrink-0 stroke-[1.75]" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {parentLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                data-reveal=""
                data-reveal-delay={idx > 0 ? String(Math.min(idx, 3)) : undefined}
                className="group flex items-start gap-4 rounded-sm border border-slate-200 bg-white p-4 sm:p-5 transition-colors hover:border-primary hover:bg-blue-50/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="w-10 h-10 rounded-sm bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <ArrowRight
                      className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
