'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigation } from '@/data/navigation';
import type { NavItem } from '@/types';

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className="px-3 py-2 text-sm font-medium text-white hover:text-gold transition-colors rounded-md"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-gold transition-colors rounded-md"
      >
        {item.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </Link>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gold/10 hover:text-maroon transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Slide-in sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-lg font-bold text-maroon">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {navigation.map((item) => (
            <div key={item.label} className="mb-1">
              {item.children?.length ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-maroon/5 hover:text-maroon rounded-md transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedItems.has(item.label) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedItems.has(item.label) && (
                    <div className="ml-3 pl-3 border-l-2 border-gold/30">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onClose}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-maroon hover:bg-maroon/5 rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-maroon/5 hover:text-maroon rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile login links */}
          <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
            <a
              href="/student-login"
              className="block w-full px-3 py-2.5 text-center text-sm font-semibold text-white bg-maroon rounded-md hover:bg-maroon/90 transition-colors"
            >
              Student Login
            </a>
            <a
              href="/staff-login"
              className="block w-full px-3 py-2.5 text-center text-sm font-semibold text-maroon border border-maroon rounded-md hover:bg-maroon/5 transition-colors"
            >
              Staff Login
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-maroon sticky top-[36px] z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + School Name */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {/* Logo placeholder: gradient circle */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#800020] to-[#D4AF37] flex items-center justify-center border-2 border-gold shadow-sm">
              <span className="text-white text-xs font-bold tracking-wide">
                MGS
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white text-base font-bold leading-tight">
                Mumbi Girls Senior School
              </h1>
              <p className="text-gold text-[10px] tracking-wider uppercase">
                Education for Empowerment
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <DesktopDropdown key={item.label} item={item} />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
