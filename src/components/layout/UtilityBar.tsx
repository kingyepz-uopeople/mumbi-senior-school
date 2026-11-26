'use client';

import { Download } from '@/components/icons';
import OfficeHoursStatus from '@/components/shared/OfficeHoursStatus';
import { usePwa } from '@/components/pwa/PwaProvider';
import LocaleLink from '@/i18n/LocaleLink';
import { useLocale } from '@/i18n/locale-context';

/**
 * Slim utility strip that sits directly above the footer: the live
 * office-hours line, portal shortcuts, and the PWA install button.
 */
export default function UtilityBar() {
  const { canNativeInstall, triggerNativeInstall } = usePwa();
  const { dict } = useLocale();

  return (
    <div
      data-dark-surface
      className="w-full shrink-0 overflow-x-clip border-t border-white/15 bg-primary text-xs text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
          <OfficeHoursStatus variant="bar" className="shrink-0" />

          <div className="flex shrink-0 flex-wrap items-center gap-x-1.5 gap-y-1 sm:gap-x-3">
            <LocaleLink
              href="/portal"
              className="inline-flex min-h-8 items-center rounded-full px-2 py-1 font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {dict.a11y.studentPortal}
            </LocaleLink>
            <span className="text-white/30" aria-hidden="true">
              /
            </span>
            <LocaleLink
              href="/portal"
              className="inline-flex min-h-8 items-center rounded-full px-2 py-1 font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              {dict.a11y.staffPortal}
            </LocaleLink>
            {canNativeInstall && (
              <button
                type="button"
                onClick={triggerNativeInstall}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-semibold text-primary transition-colors hover:bg-blue-50"
              >
                <Download
                  className="h-3.5 w-3.5 stroke-[1.75]"
                  aria-hidden="true"
                />
                <span>{dict.a11y.installApp}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
