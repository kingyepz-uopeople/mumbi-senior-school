'use client';

import { RotateCw } from 'lucide-react';

export default function OfflineRetryButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-maroon hover:bg-maroon/90 text-white text-sm font-bold transition-colors shadow-xs"
    >
      <RotateCw className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
      <span>Retry Connection</span>
    </button>
  );
}
