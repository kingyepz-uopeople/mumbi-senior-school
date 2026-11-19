'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyValueButtonProps {
  /** Exact text placed on the clipboard, e.g. the email address or phone number. */
  value: string;
  /** Screen-reader description of what gets copied, e.g. "email address". */
  label: string;
  /** `dark` for deep-blue panels, `light` for white surfaces. */
  tone?: 'dark' | 'light';
  className?: string;
}

async function writeToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the legacy path (insecure context or denied permission).
  }

  try {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(field);
    return copied;
  } catch {
    return false;
  }
}

/**
 * Small icon button that copies a contact value and confirms with a short
 * "Copied" toast. The toast is announced politely and disappears after a
 * couple of seconds; the confirmation chip only fades and lifts, so nothing
 * around it reflows.
 */
export default function CopyValueButton({
  value,
  label,
  tone = 'dark',
  className = '',
}: CopyValueButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    const ok = await writeToClipboard(value);
    if (!ok) return;
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2200);
  }, [value]);

  const buttonTone =
    tone === 'dark'
      ? 'border-white/35 text-white hover:border-white hover:bg-white/15'
      : 'border-slate-300 text-primary hover:border-primary hover:bg-blue-50';

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label} to clipboard`}
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${buttonTone}`}
      >
        {copied ? (
          <Check className="h-4 w-4 stroke-[2]" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
        )}
      </button>

      <span
        role="status"
        aria-live="polite"
        className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap"
      >
        <span
          data-copied={copied ? 'true' : 'false'}
          className={`copied-toast inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            tone === 'dark'
              ? 'bg-white text-primary-dark'
              : 'bg-primary text-white'
          }`}
        >
          {copied ? 'Copied' : ''}
        </span>
      </span>
    </span>
  );
}
