'use client';

import { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, Download, User, LogIn } from 'lucide-react';

export default function TopUtilityBar() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promptEvent = deferredPrompt as any;
    promptEvent.prompt();
    await promptEvent.userChoice;
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="bg-maroon text-white text-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
        {/* Left: School info */}
        <div className="flex items-center gap-4">
          {/* Full info on desktop */}
          <div className="hidden md:flex items-center gap-4">
            <span className="flex items-center gap-1 text-gold font-semibold">
              <Phone className="w-3 h-3" />
              KNEC: 10204102
            </span>
            <span className="text-white/60">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gold" />
              P.O. Box 115 - 10200, Murang&apos;a
            </span>
            <span className="text-white/60">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gold" />
              Mon-Fri: 8AM - 5PM
            </span>
          </div>
          {/* Condensed on mobile */}
          <div className="flex md:hidden items-center gap-2">
            <span className="text-gold font-semibold">KNEC: 10204102</span>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          <a
            href="/student-login"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded text-gold hover:bg-white/10 transition-colors font-medium"
          >
            <User className="w-3 h-3" />
            Student Login
          </a>
          <a
            href="/staff-login"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded text-gold hover:bg-white/10 transition-colors font-medium"
          >
            <LogIn className="w-3 h-3" />
            Staff Login
          </a>
          {isInstallable && (
            <button
              onClick={handleInstall}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gold text-maroon hover:bg-yellow-400 transition-colors font-semibold"
            >
              <Download className="w-3 h-3" />
              <span className="hidden sm:inline">Install App</span>
              <span className="sm:hidden">Install</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
