'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Download, LogIn, Menu, User, X } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { schoolInfo } from '@/data/mock-school-data';
import { usePwa } from '@/components/pwa/PwaProvider';
import type { NavItem } from '@/types';

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
      <Link
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        className={`relative px-3 py-2 text-sm font-semibold rounded-md transition-colors text-white ${
          isActive
            ? 'bg-white/15 after:content-[""] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:rounded-full after:bg-white'
            : 'hover:bg-white/12'
        }`}
      >
        {item.label}
      </Link>
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
        className={`relative inline-flex items-center rounded-md transition-colors ${
          isActive
            ? 'bg-white/15 after:content-[""] after:absolute after:left-3 after:right-2.5 after:bottom-1 after:h-0.5 after:rounded-full after:bg-white'
            : 'hover:bg-white/12'
        }`}
      >
        <Link
          href={item.href}
          aria-current={isActive ? 'page' : undefined}
          onClick={() => setOpen(false)}
          className="pl-3 pr-1 py-2 text-sm font-semibold rounded-l-md text-white transition-colors"
        >
          {item.label}
        </Link>
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
          className="px-1.5 py-2 rounded-r-md text-white transition-colors"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
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
          <ul className="bg-white rounded-xl shadow-xl border border-slate-200 py-2 overflow-hidden">
            {item.children.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-primary/8 hover:text-primary focus-visible:outline-primary focus-visible:-outline-offset-2 transition-colors"
                >
                  {child.label}
                </Link>
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
  const pathname = usePathname();
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

  // Close drawer automatically whenever pathname changes
  useEffect(() => {
    if (pathname !== initialPathnameRef.current) {
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll, set initial focus, trap Tab focus, handle Escape, and restore focus
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
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
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col animate-fadeIn"
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
              className="w-8 h-8 rounded-md bg-white p-0.5 object-contain shrink-0"
            />
            <span className="text-sm font-bold truncate">Navigation Menu</span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/15 transition-colors shrink-0"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const isExpanded = expandedItems.has(item.label);
            const sectionId = `mobile-sub-${item.href.replace(/\W+/g, '')}`;

            if (item.children?.length) {
              return (
                <div key={item.label} className="rounded-lg">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={sectionId}
                    onClick={() => toggleExpand(item.label)}
                    className={`w-full min-h-11 flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-800 hover:bg-primary/6 hover:text-primary'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-primary' : 'text-slate-500'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isExpanded && (
                    <ul
                      id={sectionId}
                      className="mt-1 ml-3 pl-3 border-l-2 border-accent space-y-0.5"
                    >
                      <li>
                        <Link
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={onClose}
                          className="flex items-center min-h-11 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/6 rounded-lg transition-colors"
                        >
                          {item.label} Overview
                        </Link>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="flex items-center min-h-11 px-3 py-2 text-sm text-slate-700 hover:text-primary hover:bg-primary/6 rounded-lg transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={onClose}
                className={`flex items-center min-h-11 px-3.5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary border-l-3 border-accent'
                    : 'text-slate-800 hover:bg-primary/6 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile portal & install actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-bg space-y-2.5">
          {canNativeInstall && (
            <button
              type="button"
              onClick={async () => {
                await triggerNativeInstall();
                onClose();
              }}
              className="w-full min-h-11 px-4 py-2.5 rounded-xl bg-primary-dark text-white font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-primary transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Install Mumbi Portal App
            </button>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/portal"
              onClick={onClose}
              className="min-h-11 px-3 py-2.5 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors"
            >
              <User className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Student</span>
            </Link>
            <Link
              href="/portal"
              onClick={onClose}
              className="min-h-11 px-3 py-2.5 inline-flex items-center justify-center gap-1.5 text-sm font-bold text-primary bg-white border border-primary rounded-xl hover:bg-primary/6 transition-colors"
            >
              <LogIn className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Staff</span>
            </Link>
          </div>
          <p className="text-[11px] text-center text-slate-600">
            {schoolInfo.officeHoursShort} • {schoolInfo.postalAddress}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <div className="bg-primary border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* School Crest + Name */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 min-w-0 rounded-lg py-1"
            >
              <Image
                src="/images/mumbi-logo.png"
                alt="Mumbi Girls' Senior School crest"
                width={44}
                height={45}
                sizes="44px"
                priority
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white p-0.5 object-contain shrink-0 shadow-xs"
              />
              <div className="min-w-0">
                <span className="block text-white text-sm sm:text-base font-bold leading-tight truncate">
                  {schoolInfo.name}
                </span>
                <span className="block text-blue-100 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase truncate">
                  {schoolInfo.motto}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center gap-1"
            >
              {navigation.map((item) => (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  isActive={pathname === item.href}
                />
              ))}
            </nav>

            {/* Mobile Hamburger Button (44x44px touch target) */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/15 transition-colors shrink-0"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
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
