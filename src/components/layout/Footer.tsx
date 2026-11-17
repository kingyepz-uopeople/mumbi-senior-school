import Link from 'next/link';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  FileText,
  Award,
} from 'lucide-react';
import { schoolInfo } from '@/data/mock';

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
    <footer className="bg-[#800020] text-white border-t-4 border-[#D4AF37]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#800020] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg">
                <span className="text-[#D4AF37] text-sm font-black tracking-wider">MGS</span>
              </div>
              <div>
                <h3 className="font-bold text-base text-white">{schoolInfo.name}</h3>
                <p className="text-[#D4AF37] text-xs italic font-medium">
                  &ldquo;{schoolInfo.motto}&rdquo;
                </p>
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              A premier C2 Public Girls&apos; Boarding Senior School providing holistic, inclusive, and quality education nurturing ethical, empowered leaders.
            </p>
            <div className="text-xs text-white/70 space-y-1">
              <p><span className="text-[#D4AF37] font-semibold">KNEC Centre:</span> {schoolInfo.knecCode}</p>
              <p><span className="text-[#D4AF37] font-semibold">MoE Reg:</span> {schoolInfo.moeReg}</p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-base mb-4 text-[#D4AF37] uppercase tracking-wider text-xs">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-[#D4AF37] text-sm transition-colors duration-150 flex items-center gap-1.5"
                  >
                    <span className="text-[#D4AF37]">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-bold text-base mb-4 text-[#D4AF37] uppercase tracking-wider text-xs">Contact & Location</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{schoolInfo.physicalLocation}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{schoolInfo.postalAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+254 (0) 700 000 000 / info@mumbiseniorschool.sc.ke</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{schoolInfo.officeHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Portals & Accreditations */}
          <div>
            <h3 className="font-bold text-base mb-4 text-[#D4AF37] uppercase tracking-wider text-xs">Portals & Community</h3>
            <div className="space-y-2.5">
              <a
                href="#portal"
                className="block p-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
              >
                <div className="font-semibold text-sm text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37]" />
                  Student & Staff Portal
                </div>
                <div className="text-xs text-white/70">Access term reports, assignments & staff dashboard</div>
              </a>
              <Link
                href="/downloads"
                className="block p-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
              >
                <div className="font-semibold text-sm text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  Term Circulars & Downloads
                </div>
                <div className="text-xs text-white/70">Download holiday packages and fee structures</div>
              </Link>
              <div className="p-3 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                <div className="font-semibold text-xs text-[#D4AF37] flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4" />
                  Mumbi Girls Senior School
                </div>
                <div className="text-[11px] text-white/80">Affiliated to the Ministry of Education & Kenya National Examinations Council</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 text-xs py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/60 text-center sm:text-left">
          <div>
            © 2025 {schoolInfo.name}. All Rights Reserved. Strictly adhering to Kenyan CBC Guidelines.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>KNEC: {schoolInfo.knecCode}</span>
            <span>•</span>
            <span>MoE: {schoolInfo.moeReg}</span>
            <span>•</span>
            <span className="text-[#D4AF37]">Mukuyu, Murang&apos;a</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
