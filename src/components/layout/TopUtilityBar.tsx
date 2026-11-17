'use client';

import Link from 'next/link';
import { Clock, Download, LogIn, MapPin, ShieldCheck, User } from 'lucide-react';
import { schoolInfo } from '@/data/mock-school-data';
import { usePwa } from '@/components/pwa/PwaProvider';

export default function TopUtilityBar() {
  const { canNativeInstall, triggerNativeInstall } = usePwa();

  return (
    <div className="bg-primary-dark text-white text-xs border-b border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-2">
        {/* Left: Official school identifiers */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-white font-semibold shrink-0">
            <ShieldCheck
              className="w-3.5 h-3.5 text-blue-100 shrink-0"
              aria-hidden="true"
            />
            <span>KNEC: {schoolInfo.knecCode}</span>
          </span>

          <span className="hidden md:inline text-white/35" aria-hidden="true">
            |
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-white/90 truncate">
            <MapPin
              className="w-3.5 h-3.5 text-blue-100 shrink-0"
              aria-hidden="true"
            />
            <span>{schoolInfo.postalAddress}</span>
          </span>

          <span className="hidden xl:inline text-white/35" aria-hidden="true">
            |
          </span>
          <span className="hidden xl:inline-flex items-center gap-1.5 text-white/90 shrink-0">
            <Clock
              className="w-3.5 h-3.5 text-blue-100 shrink-0"
              aria-hidden="true"
            />
            <span>{schoolInfo.officeHoursShort}</span>
          </span>
        </div>

        {/* Right: Portal links & PWA install */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            href="/portal"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-9 rounded-md text-white hover:bg-white/15 transition-colors font-semibold"
          >
            <User className="w-3.5 h-3.5 text-blue-100" aria-hidden="true" />
            <span>Student Login</span>
          </Link>
          <Link
            href="/portal"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-9 rounded-md text-white hover:bg-white/15 transition-colors font-semibold"
          >
            <LogIn className="w-3.5 h-3.5 text-blue-100" aria-hidden="true" />
            <span>Staff Login</span>
          </Link>
          {canNativeInstall && (
            <button
              type="button"
              onClick={triggerNativeInstall}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-9 rounded-md bg-white text-primary hover:bg-blue-50 transition-colors font-bold shadow-xs"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Install App</span>
              <span className="sm:hidden">Install</span>
            </button>
          )}
          <span className="sm:hidden text-[11px] text-white/90 font-medium">
            MoE: {schoolInfo.moeReg}
          </span>
        </div>
      </div>
    </div>
  );
}
