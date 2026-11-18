import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import RegistryLogo from '@/components/shared/RegistryLogo';
import { schoolInfo } from '@/data/mock-school-data';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About the School', href: '/about' },
  { label: 'Academics & Pathways', href: '/academics' },
  { label: 'Student Life', href: '/explore' },
  { label: 'Downloads & Circulars', href: '/downloads' },
  { label: 'Photo Gallery', href: '/gallery' },
  { label: 'Contact & Location', href: '/contact' },
];

const resourceLinks = [
  {
    label: 'Grade 10 Admissions Guide',
    href: '/admissions',
  },
  {
    label: 'Term Circulars',
    href: '/downloads',
  },
  {
    label: 'CBC Senior School Pathways',
    href: '/academics#pathways',
  },
  {
    label: 'Student & Staff Portal (Coming Soon)',
    href: '/portal',
  },
];

export default function Footer() {
  return (
    <footer
      data-dark-surface
      className="shrink-0 w-full overflow-x-clip bg-primary-dark text-white border-t border-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: School Identity & Registry */}
          <div className="lg:col-span-4">
            <div className="flex items-start gap-3.5 mb-5">
              <Image
                src="/images/mumbi-logo.png"
                alt="Mumbi Girls' Senior School crest"
                width={54}
                height={55}
                sizes="64px"
                quality={95}
                className="w-13 h-13 rounded-xs bg-[#f7f7f7] p-1 object-contain shrink-0 border border-white/80"
              />
              <div>
                <h2 className="font-serif font-bold text-lg text-white leading-snug">
                  {schoolInfo.name}
                </h2>
                <p className="font-serif italic text-blue-100 text-sm mt-0.5">
                  &ldquo;{schoolInfo.motto}&rdquo;
                </p>
              </div>
            </div>

            <p className="text-white/85 text-sm leading-relaxed mb-5 max-w-sm">
              {schoolInfo.category} in {schoolInfo.locationShort}. Established in {schoolInfo.founded}.
            </p>

            <dl className="pt-4 border-t border-white/15 text-xs text-white/90 space-y-3 tabular-nums">
              <div className="flex items-center gap-3">
                <RegistryLogo agency="knec" size="card" surface="dark" />
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="text-blue-100">KNEC Centre Code:</dt>
                  <dd className="font-semibold text-white">
                    {schoolInfo.knecCode}
                  </dd>
                </div>
              </div>
              <div className="space-y-1.5">
                <RegistryLogo agency="moe" size="card" surface="dark" />
                <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <dt className="text-blue-100">MoE Registration:</dt>
                  <dd className="font-semibold text-white">
                    {schoolInfo.moeReg}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Column 2: Directory */}
          <nav aria-label="Footer navigation" className="lg:col-span-2">
            <h2 className="font-sans font-semibold text-blue-100 uppercase tracking-[0.12em] text-xs pb-3 border-b border-white/15 mb-4">
              Directory
            </h2>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-white hover:underline underline-offset-4 text-sm py-1.5 min-h-9 inline-flex items-center transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Official Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-sans font-semibold text-blue-100 uppercase tracking-[0.12em] text-xs pb-3 border-b border-white/15 mb-4">
              School Office
            </h2>
            <address className="not-italic">
              <ul className="space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-blue-100 shrink-0 mt-1 stroke-[1.5]"
                    aria-hidden="true"
                  />
                  <span>{schoolInfo.physicalLocation}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail
                    className="w-4 h-4 text-blue-100 shrink-0 mt-1 stroke-[1.5]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <span className="block">{schoolInfo.postalAddress}</span>
                    <a
                      href={`mailto:${schoolInfo.email}`}
                      className="block text-xs text-white hover:underline underline-offset-4 break-all"
                    >
                      {schoolInfo.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone
                    className="w-4 h-4 text-blue-100 shrink-0 mt-1 stroke-[1.5]"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${schoolInfo.phone}`}
                    className="text-xs leading-relaxed text-white hover:underline underline-offset-4 tabular-nums"
                  >
                    {schoolInfo.phone}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock
                    className="w-4 h-4 text-blue-100 shrink-0 mt-1 stroke-[1.5]"
                    aria-hidden="true"
                  />
                  <span className="text-xs leading-relaxed">
                    {schoolInfo.officeHours}
                  </span>
                </li>
              </ul>
            </address>
          </div>

          {/* Column 4: Documents & Portal */}
          <div className="lg:col-span-3">
            <h2 className="font-sans font-semibold text-blue-100 uppercase tracking-[0.12em] text-xs pb-3 border-b border-white/15 mb-4">
              Documents &amp; Portal
            </h2>
            <ul className="divide-y divide-white/15 border-b border-white/15">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="py-2.5 min-h-11 flex items-center justify-between gap-2 text-sm text-white/90 hover:text-white transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-blue-100 shrink-0 stroke-[1.75]"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Registry Strip */}
      <div className="border-t border-white/15 text-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white/80">
          <p>
            © 2026 {schoolInfo.name}, {schoolInfo.locationShort}. Ministry of
            Education registered public senior school.
          </p>
          <p className="tabular-nums text-white/85">
            KNEC {schoolInfo.knecCode} · MoE {schoolInfo.moeReg}
          </p>
        </div>
      </div>
    </footer>
  );
}
