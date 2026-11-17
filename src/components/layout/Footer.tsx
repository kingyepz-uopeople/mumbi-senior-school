import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Shield,
} from 'lucide-react';
import { schoolInfo } from '@/data/mock-school-data';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'CBC Pathways Explorer', href: '/academics#pathways' },
  { label: 'Academic Departments', href: '/academics#departments' },
  { label: 'KCSE Wall of Fame', href: '/academics#wall-of-fame' },
  { label: 'Student Life & Clubs', href: '/explore' },
  { label: 'Downloads Hub', href: '/downloads' },
  { label: 'Photo Gallery', href: '/gallery' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Footer() {
  return (
    <footer
      data-dark-surface
      className="bg-maroon text-white border-t-4 border-gold"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: School Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/mumbi-logo.png"
                alt="Mumbi Girls' Senior School crest"
                width={52}
                height={53}
                sizes="52px"
                className="w-13 h-13 rounded-xl bg-white p-1 object-contain shrink-0 shadow-xs"
              />
              <div>
                <h2 className="font-bold text-base text-white leading-snug">
                  {schoolInfo.name}
                </h2>
                <p className="text-gold text-xs italic font-medium mt-0.5">
                  &ldquo;{schoolInfo.motto}&rdquo;
                </p>
              </div>
            </div>
            <p className="text-white/85 text-sm leading-relaxed mb-4">
              A {schoolInfo.category} in Murang&apos;a County providing holistic,
              inclusive, and quality education that nurtures competent, ethical,
              and empowered leaders.
            </p>
            <dl className="text-xs text-white/85 space-y-1">
              <div className="flex gap-1.5">
                <dt className="text-gold font-semibold">KNEC Centre:</dt>
                <dd>{schoolInfo.knecCode}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-gold font-semibold">MoE Reg:</dt>
                <dd>{schoolInfo.moeReg}</dd>
              </div>
            </dl>
          </div>

          {/* Column 2: Quick Navigation */}
          <nav aria-label="Footer navigation">
            <h2 className="font-bold mb-4 text-gold uppercase tracking-wider text-xs">
              Quick Links
            </h2>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/85 hover:text-gold text-sm py-1.5 min-h-9 inline-flex items-center gap-2 transition-colors rounded-sm"
                  >
                    <span className="text-gold" aria-hidden="true">
                      ›
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Official Contact Info */}
          <div>
            <h2 className="font-bold mb-4 text-gold uppercase tracking-wider text-xs">
              Contact &amp; Location
            </h2>
            <address className="not-italic">
              <ul className="space-y-3 text-sm text-white/85">
                <li className="flex items-start gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-gold shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>{schoolInfo.physicalLocation}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail
                    className="w-4 h-4 text-gold shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <span className="block">{schoolInfo.postalAddress}</span>
                    <span className="block text-xs text-white/80 break-all">
                      {schoolInfo.email}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone
                    className="w-4 h-4 text-gold shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span className="text-xs leading-relaxed">
                    {schoolInfo.phonePlaceholder}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock
                    className="w-4 h-4 text-gold shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>{schoolInfo.officeHours}</span>
                </li>
              </ul>
            </address>
          </div>

          {/* Column 4: Portals & Accreditation */}
          <div>
            <h2 className="font-bold mb-4 text-gold uppercase tracking-wider text-xs">
              Portals &amp; Resources
            </h2>
            <div className="space-y-2.5">
              <Link
                href="/portal"
                className="block p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
              >
                <span className="font-semibold text-sm text-white flex items-center gap-2">
                  <Shield
                    className="w-4 h-4 text-gold shrink-0"
                    aria-hidden="true"
                  />
                  Student &amp; Staff Portal
                </span>
                <span className="block text-xs text-white/80 mt-0.5">
                  Online student and staff portal (coming soon)
                </span>
              </Link>

              <Link
                href="/downloads"
                className="block p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
              >
                <span className="font-semibold text-sm text-white flex items-center gap-2">
                  <FileText
                    className="w-4 h-4 text-gold shrink-0"
                    aria-hidden="true"
                  />
                  Circulars &amp; Downloads
                </span>
                <span className="block text-xs text-white/80 mt-0.5">
                  Holiday assignments, newsletters &amp; fee structures
                </span>
              </Link>

              <div className="p-3.5 rounded-xl bg-black/20 border border-gold/30">
                <p className="font-semibold text-xs text-gold flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                  Accredited Public Institution
                </p>
                <p className="text-xs text-white/85 leading-relaxed">
                  Registered under the Ministry of Education &amp; Kenya
                  National Examinations Council.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-white/15 bg-black/25 text-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/80 text-center sm:text-left">
          <p>
            © 2026 {schoolInfo.name}. All rights reserved. Aligned with Kenyan
            CBC Senior School guidelines.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs">
            <span>KNEC: {schoolInfo.knecCode}</span>
            <span aria-hidden="true">•</span>
            <span>MoE: {schoolInfo.moeReg}</span>
            <span aria-hidden="true">•</span>
            <span className="text-gold font-semibold">
              Mukuyu, Murang&apos;a
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
