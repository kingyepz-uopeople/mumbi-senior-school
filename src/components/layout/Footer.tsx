'use client';

import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Clock, Mail, Phone } from '@/components/icons';
import RegistryLogo from '@/components/shared/RegistryLogo';
import EmailLink from '@/components/shared/EmailLink';
import PhoneActions from '@/components/shared/PhoneActions';
import CopyrightYear from '@/components/shared/CopyrightYear';
import DirectionsLink from '@/components/shared/DirectionsLink';
import { schoolInfo } from '@/data/mock-school-data';
import LocaleLink from '@/i18n/LocaleLink';
import { useLocale } from '@/i18n/locale-context';

export default function Footer() {
  const { dict } = useLocale();

  const quickLinks = [
    { label: dict.nav.home, href: '/' },
    { label: dict.footer.aboutSchool, href: '/about' },
    { label: dict.footer.academicsPathways, href: '/academics' },
    { label: dict.footer.studentLife, href: '/explore' },
    { label: dict.footer.downloadsCirculars, href: '/downloads' },
    { label: dict.footer.newsEvents, href: '/news' },
    { label: dict.footer.photoGallery, href: '/gallery' },
    { label: dict.footer.contactLocation, href: '/contact' },
  ];

  const resourceLinks = [
    { label: dict.footer.grade10Guide, href: '/admissions' },
    { label: dict.footer.termCirculars, href: '/downloads' },
    { label: dict.footer.cbcPathways, href: '/academics#pathways' },
    { label: dict.footer.portalComingSoon, href: '/portal' },
  ];

  return (
    <footer
      data-dark-surface
      className="w-full shrink-0 overflow-x-clip border-t border-primary bg-primary-dark text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="mb-5 flex items-start gap-3.5">
              <Image
                src="/images/mumbi-logo.png"
                alt="Mumbi Girls' Senior School crest"
                width={54}
                height={55}
                sizes="64px"
                quality={95}
                className="h-13 w-13 shrink-0 rounded-xs border border-white/80 bg-[#f7f7f7] object-contain p-1"
              />
              <div>
                <h2 className="font-serif text-lg font-bold leading-snug text-white">
                  {schoolInfo.name}
                </h2>
                <p className="mt-0.5 font-serif text-sm italic text-blue-100">
                  &ldquo;{dict.school.motto}&rdquo;
                </p>
              </div>
            </div>

            <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/85">
              {dict.school.category} · {schoolInfo.locationShort}.{' '}
              {dict.footer.established} {schoolInfo.foundedOn}.
            </p>

            <dl className="space-y-3 border-t border-white/15 pt-4 text-xs tabular-nums text-white/90">
              <div className="flex items-center gap-3">
                <RegistryLogo agency="knec" size="card" surface="dark" />
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="text-blue-100">{dict.footer.knecCode}:</dt>
                  <dd className="font-semibold text-white">
                    {schoolInfo.knecCode}
                  </dd>
                </div>
              </div>
              <div className="space-y-1.5">
                <RegistryLogo agency="moe" size="card" surface="dark" />
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="text-blue-100">{dict.footer.moeReg}:</dt>
                  <dd className="font-semibold text-white">
                    {schoolInfo.moeReg}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <nav aria-label={dict.a11y.footerNav} className="lg:col-span-2">
            <h2 className="mb-4 border-b border-white/15 pb-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
              {dict.footer.quickLinks}
            </h2>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <LocaleLink
                    href={link.href}
                    className="inline-flex min-h-9 items-center py-1.5 text-sm text-white/85 transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {link.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="mb-4 border-b border-white/15 pb-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
              {dict.footer.contact}
            </h2>
            <address className="not-italic">
              <ul className="space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-2.5">
                  <MapPin
                    strokeWidth={1.75}
                    className="mt-1 h-4 w-4 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block">{schoolInfo.physicalLocation}</span>
                    <DirectionsLink tone="dark" className="mt-1" />
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail
                    className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-blue-100"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <span className="block">{schoolInfo.postalAddress}</span>
                    <EmailLink
                      email={schoolInfo.email}
                      className="block break-all text-xs text-white underline-offset-4 hover:underline"
                    />
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone
                    className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-blue-100"
                    aria-hidden="true"
                  />
                  <PhoneActions
                    phone={schoolInfo.phone}
                    tone="dark"
                    className="text-xs leading-relaxed"
                  />
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock
                    className="mt-1 h-4 w-4 shrink-0 stroke-[1.5] text-blue-100"
                    aria-hidden="true"
                  />
                  <span className="text-xs leading-relaxed">
                    {dict.officeHours.full}
                  </span>
                </li>
              </ul>
            </address>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-4 border-b border-white/15 pb-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
              {dict.footer.resources}
            </h2>
            <ul className="divide-y divide-white/15 border-b border-white/15">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <LocaleLink
                    href={item.href}
                    className="flex min-h-11 items-center justify-between gap-2 py-2.5 text-sm text-white/90 transition-colors hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      strokeWidth={1.75}
                      className="h-3.5 w-3.5 shrink-0 text-blue-100"
                      aria-hidden="true"
                    />
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 py-4 text-xs">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 text-white/80 sm:flex-row sm:items-center sm:px-6">
          <p>
            © <CopyrightYear /> Mumbi Girls Senior School · {dict.footer.allRights}
          </p>
          <p className="tabular-nums text-white/85">
            KNEC {schoolInfo.knecCode} · MoE {schoolInfo.moeReg}
          </p>
        </div>
      </div>
    </footer>
  );
}
