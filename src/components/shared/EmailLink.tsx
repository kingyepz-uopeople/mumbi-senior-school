import type { ReactNode } from 'react';

interface EmailLinkProps {
  email: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Renders an email address as an italic `mailto:` link. Used site-wide so every
 * published school address is styled consistently and opens a mail client.
 */
export default function EmailLink({ email, className, children }: EmailLinkProps) {
  return (
    <a href={`mailto:${email}`} className={`italic ${className ?? ''}`}>
      {children ?? email}
    </a>
  );
}
