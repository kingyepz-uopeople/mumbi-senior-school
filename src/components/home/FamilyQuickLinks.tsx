import Link from 'next/link';
import { ArrowRight, CalendarDays, FolderOpen, GraduationCap, Shirt } from 'lucide-react';

const familyLinks = [
  {
    title: 'Joining & reporting',
    description: 'Grade 10 reporting date and joining instructions.',
    href: '/admissions',
    icon: CalendarDays,
  },
  {
    title: 'Uniform guide',
    description: 'Check the uniform colours before you shop.',
    href: '/admissions#uniform',
    icon: Shirt,
  },
  {
    title: 'KCSE results',
    description: 'See exam results and top performers by year.',
    href: '/academics#kcse-results',
    icon: GraduationCap,
  },
  {
    title: 'School resources',
    description: 'Browse circulars and the school document register.',
    href: '/downloads',
    icon: FolderOpen,
  },
];

export default function FamilyQuickLinks() {
  return (
    <nav
      id="family-quick-links"
      tabIndex={-1}
      aria-labelledby="family-quick-links-heading"
      className="scroll-mt-4 border-b border-slate-200 bg-slate-bg py-7 sm:py-9"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="family-quick-links-heading" className="font-serif text-xl font-bold text-slate-900 sm:text-2xl">
          Quick links for families
        </h2>
        <ul role="list" className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {familyLinks.map(({ title, description, href, icon: Icon }) => (
            <li key={href} className="min-w-0">
              <Link
                href={href}
                className="group grid h-full min-h-11 grid-cols-[auto_1fr_auto] items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-primary/50 hover:bg-blue-50 sm:p-3.5"
              >
                <span className="grid size-9 place-items-center rounded-md bg-blue-50 text-primary group-hover:bg-white">
                  <Icon className="size-[1.125rem]" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm leading-snug font-bold text-primary-dark">
                    {title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                    {description}
                  </span>
                </span>
                <ArrowRight className="mt-0.5 size-4 text-primary" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
