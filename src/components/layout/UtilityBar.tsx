'use client';

import Link from 'next/link';
import { Download } from 'lucide-react';
import RegistryLogo from '@/components/shared/RegistryLogo';
import OfficeHoursStatus from '@/components/shared/OfficeHoursStatus';
import { schoolInfo } from '@/data/mock-school-data';
import { usePwa } from '@/components/pwa/PwaProvider';

/**
 * Slim utility strip that sits directly above the footer: official registry
 * codes, postal address, the live office-hours line, portal shortcuts, and
 * the PWA install button. It lives at the bottom of every page so the sticky
 * header stays focused on the crest and primary navigation.
 */
export default function UtilityBar() {
  const { canNativeInstall, triggerNativeInstall } = usePwa();

  return (
    <div
      data-dark-surface
      className="shrink-0 w-full overflow-x-clip border-t border-white/15 bg-primary text-xs text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
          {/* Left: registry details, postal address, live office hours */}
          <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1.5 text-white/90 tabular-nums sm:gap-x-2">
            <span className="inline-flex shrink-0 items-center gap-1.5 font-medium text-white">
              <RegistryLogo agency="knec" size="bar" surface="dark" />
              <span>KNEC {schoolInfo.knecCode}</span>
            </span>
            <span className="hidden text-white/35 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5">
              <RegistryLogo agency="moe" size="bar" surface="dark" />
              <span>MoE {schoolInfo.moeReg}</span>
            </span>
            <span className="hidden text-white/35 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="min-w-0 basis-full sm:basis-auto">
              <span className="sr-only">Postal address: </span>
              {schoolInfo.postalAddress}
            </span>
            <span className="hidden text-white/35 sm:inline" aria-hidden="true">
              ·
            </span>
            <OfficeHoursStatus variant="bar" className="shrink-0" />
          </div>

          {/* Right: portal links & optional PWA install */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 shrink-0 sm:gap-x-3">
            <Link
              href="/portal"
              className="inline-flex min-h-8 items-center rounded-full px-2 py-1 font-medium text-white/90 transition-colors hover:text-white hover:underline underline-offset-4"
            >
              Student Portal
            </Link>
            <span className="text-white/30" aria-hidden="true">
              /
            </span>
            <Link
              href="/portal"
              className="inline-flex min-h-8 items-center rounded-full px-2 py-1 font-medium text-white/90 transition-colors hover:text-white hover:underline underline-offset-4"
            >
              Staff Portal
            </Link>
            {canNativeInstall && (
              <button
                type="button"
                onClick={triggerNativeInstall}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-semibold text-primary transition-colors hover:bg-blue-50"
              >
                <Download className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden="true" />
                <span>Install App</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
