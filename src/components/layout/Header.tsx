'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Download, Menu, X } from '@/components/icons';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { schoolInfo } from '@/data/mock-school-data';
import { usePwa } from '@/components/pwa/PwaProvider';
import { stripLocale } from '@/i18n/config';
import LocaleLink from '@/i18n/LocaleLink';
import { useLocale } from '@/i18n/locale-context';
import { getNavigation } from '@/i18n/navigation';
import type { NavItem } from '@/types';

function useBarePathname() {
  const pathname = usePathname() || '/';
  return stripLocale(pathname);
}

function DesktopDropdown({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const clearTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.relatedTarget as Node | null)
    ) {
      setOpen(false);
    }
  };

  if (!item.children?.length) {
    return (
      <LocaleLink
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={`relative px-3 py-2 rounded-full text-sm font-medium transition-colors text-white ${
          isActive
            ? 'after:content-[""] after:absolute after:left-3 after:right-3 after:bottom-0.5 after:h-0.5 after:bg-white'
            : 'text-white/90 hover:text-white hover:bg-primary-dark/60'
        }`}
      >
        {item.label}
      </LocaleLink>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
    >
      <div
        className={`relative inline-flex items-center rounded-full transition-colors ${
          isActive
            ? 'after:content-[""] after:absolute after:left-3 after:right-2.5 after:bottom-0.5 after:h-0.5 after:bg-white'
            : 'hover:bg-primary-dark/60'
        }`}
      >
        <LocaleLink
          href={item.href}
          aria-current={isActive ? 'page' : undefined}
          onClick={() => setOpen(false)}
          className={`pl-3 pr-1 py-2 rounded-full text-sm font-medium transition-colors ${
            isActive ? 'text-white' : 'text-white/90 hover:text-white'
          }`}
        >
          {item.label}
        </LocaleLink>
        <button
          ref={toggleRef}
          type="button"
          aria-label={`${item.label} submenu`}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={() => setOpen((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
              requestAnimationFrame(() => {
                const firstLink =
                  containerRef.current?.querySelector<HTMLAnchorElement>(
                    `#${CSS.escape(menuId)} a`
                  );
                firstLink?.focus();
              });
            }
          }}
          className="px-1.5 py-2 rounded-full text-white/90 hover:text-white transition-colors"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-150 ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {open && (
        <div
          id={menuId}
          data-light-surface
          className="absolute top-full left-0 pt-1.5 w-60 z-50"
        >
          <ul className="bg-white rounded-sm shadow-lg border border-slate-300 border-t-2 border-t-primary py-1.5 divide-y divide-slate-100">
            {item.children.map((child) => (
              <li key={child.href}>
                <LocaleLink
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary focus-visible:outline-primary focus-visible:-outline-offset-2 transition-colors"
                >
                  {child.label}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MobileNavDrawer({
  onClose,
  triggerRef,
}: {
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const pathname = useBarePathname();
  const { dict } = useLocale();
  const navigation = useMemo(() => getNavigation(dict), [dict]);
  const { canNativeInstall, triggerNativeInstall } = usePwa();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const active = navigation.find(
      (item) => item.children?.length && pathname === item.href
    );
    return active ? new Set([active.label]) : new Set();
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const initialPathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== initialPathnameRef.current) {
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const triggerEl = triggerRef.current;
    document.body.style.overflow = 'hidden';

    closeBtnRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      triggerEl?.focus();
    };
  }, [onClose, triggerRef]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Solid dark backdrop (no blur/glassmorphism) */}
      <div
        className="fixed inset-0 bg-slate-950/65"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Accessible modal drawer */}
      <div
        ref={dialogRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile site navigation"
        data-light-surface
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-white border-l border-slate-300 shadow-xl flex flex-col animate-fadeIn"
      >
        <div
          className="flex items-center justify-between px-4 py-3.5 border-b border-primary-dark bg-primary text-white"
          data-dark-surface
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Image
              src="/images/mumbi-logo.png"
              alt="Mumbi Girls' Senior School crest"
              width={32}
              height={33}
              sizes="32px"
              className="w-8 h-8 rounded-xs bg-[#f7f7f7] p-0.5 object-contain shrink-0"
            />
            <span className="font-serif text-sm font-bold truncate">
              Mumbi Girls
            </span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-11 h-11 rounded-full text-white hover:bg-primary-dark transition-colors shrink-0"
            aria-label={dict.a11y.closeMenu}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-4 py-3 divide-y divide-slate-200"
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const isExpanded = expandedItems.has(item.label);
            const sectionId = `mobile-sub-${item.href.replace(/\W+/g, '')}`;

            if (item.children?.length) {
              return (
                <div key={item.label} className="py-1">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={sectionId}
                    onClick={() => toggleExpand(item.label)}
                    className={`w-full min-h-11 flex items-center justify-between px-3.5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white font-semibold'
                        : 'text-slate-800 hover:text-primary hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                        isExpanded ? 'rotate-180' : ''
                      } ${
                        isActive
                          ? 'text-white'
                          : isExpanded
                            ? 'text-primary'
                            : 'text-slate-500'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isExpanded && (
                    <ul
                      id={sectionId}
                      className="mt-1 mb-2 ml-3 pl-3 border-l border-slate-300 space-y-0.5"
                    >
                      <li>
                        <LocaleLink
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={onClose}
                          className="flex items-center min-h-11 px-2 py-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
                        >
                          {item.label}
                        </LocaleLink>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <LocaleLink
                            href={child.href}
                            onClick={onClose}
                            className="flex items-center min-h-11 px-2 py-2 text-sm text-slate-700 hover:text-primary"
                          >
                            {child.label}
                          </LocaleLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            return (
              <div key={item.label} className="py-1">
                <LocaleLink
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={onClose}
                  className={`flex items-center min-h-11 px-3.5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white font-semibold'
                      : 'text-slate-800 hover:text-primary hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </LocaleLink>
              </div>
            );
          })}
        </nav>

        {/* Mobile portal & install actions */}
        <div className="space-y-2.5 border-t border-slate-200 bg-slate-bg p-4">
          <LanguageSwitcher />
          {canNativeInstall && (
            <button
              type="button"
              onClick={async () => {
                await triggerNativeInstall();
                onClose();
              }}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary-dark px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
            >
              <Download className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
              <span>{dict.a11y.installApp}</span>
            </button>
          )}
          <div className="grid grid-cols-2 gap-2">
            <LocaleLink
              href="/portal"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {dict.a11y.studentPortal}
            </LocaleLink>
            <LocaleLink
              href="/portal"
              onClick={onClose}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-primary bg-white px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-slate-50"
            >
              {dict.a11y.staffPortal}
            </LocaleLink>
          </div>
          <p className="pt-1 text-[11px] text-slate-600">
            {schoolInfo.officeHoursShort} · {schoolInfo.postalAddress}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Header() {
  const pathname = useBarePathname();
  const { dict } = useLocale();
  const navigation = useMemo(() => getNavigation(dict), [dict]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Safe-area padding keeps the crest clear of the status bar in standalone mode */}
      <div className="bg-primary pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-3">
            <LocaleLink
              href="/"
              onClick={() => {
                if (pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex min-w-0 items-center gap-3 rounded-xs py-1"
            >
              <Image
                src="/images/mumbi-logo.png"
                alt="Mumbi Girls' Senior School crest"
                width={44}
                height={45}
                sizes="64px"
                quality={95}
                priority
                className="h-10 w-10 shrink-0 rounded-xs border border-white/80 bg-[#f7f7f7] object-contain p-0.5 sm:h-11 sm:w-11"
              />
              <div className="min-w-0">
                <span className="block truncate font-serif text-base font-bold leading-tight text-white sm:text-lg">
                  {schoolInfo.name}
                </span>
                <span className="block truncate text-[11px] tracking-wide text-blue-100">
                  {schoolInfo.locationShort} · {dict.school.foundedLabel}{' '}
                  {schoolInfo.founded}
                </span>
              </div>
            </LocaleLink>

            <nav
              aria-label={dict.a11y.primaryNav}
              className="hidden items-center gap-0.5 lg:flex"
            >
              {navigation.map((item) => (
                <DesktopDropdown
                  key={item.href}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
              <div className="ml-2">
                <LanguageSwitcher compact />
              </div>
            </nav>

            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-primary-dark lg:hidden"
              aria-label={dict.a11y.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu className="h-6 w-6 stroke-[1.75]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <MobileNavDrawer onClose={closeMobile} triggerRef={hamburgerRef} />
      )}
    </>
  );
}
