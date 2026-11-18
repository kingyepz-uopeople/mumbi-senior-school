'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import { schoolInfo } from '@/data/mock-school-data';
import { usePwa } from '@/components/pwa/PwaProvider';

export default function TopUtilityBar() {
  const { canNativeInstall, triggerNativeInstall } = usePwa();

  return (
    <div className="bg-primary-dark text-white text-xs border-b border-white/15 pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-9 py-1 flex items-center justify-between gap-3">
        {/* Left: Official school registry details */}
        <div className="flex items-center gap-2.5 min-w-0 text-white/90 tabular-nums">
          <span className="font-medium text-white shrink-0">
            KNEC {schoolInfo.knecCode}
          </span>
          <span className="text-white/35" aria-hidden="true">
            ·
          </span>
          <span className="shrink-0">MoE {schoolInfo.moeReg}</span>

          <span className="hidden md:inline text-white/35" aria-hidden="true">
            ·
          </span>
          <span className="hidden md:inline truncate">
            {schoolInfo.postalAddress}
          </span>

          <span className="hidden xl:inline text-white/35" aria-hidden="true">
            ·
          </span>
          <span className="hidden xl:inline shrink-0">
            {schoolInfo.officeHoursShort}
          </span>
        </div>

        {/* Right: Portal links & optional PWA install */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <Link
            href="/portal"
            className="hidden sm:inline-flex items-center px-2 py-1 min-h-8 text-white/90 hover:text-white hover:underline underline-offset-4 transition-colors font-medium"
          >
            Student Portal
          </Link>
          <span
            className="hidden sm:inline text-white/30"
            aria-hidden="true"
          >
            /
          </span>
          <Link
            href="/portal"
            className="hidden sm:inline-flex items-center px-2 py-1 min-h-8 text-white/90 hover:text-white hover:underline underline-offset-4 transition-colors font-medium"
          >
            Staff Portal
          </Link>
          {canNativeInstall && (
            <button
              type="button"
              onClick={triggerNativeInstall}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 min-h-8 rounded-sm bg-white text-primary hover:bg-blue-50 transition-colors font-semibold"
            >
              <Download className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
              <span className="hidden sm:inline">Install App</span>
              <span className="sm:hidden">Install</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
