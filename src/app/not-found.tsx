import Image from 'next/image';
import Link from 'next/link';
import { FolderDown, Home, Mail } from 'lucide-react';
import { schoolInfo } from '@/data/mock-school-data';

export default function NotFound() {
  return (
    <div className="bg-slate-bg py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 border-t-4 border-t-primary p-6 sm:p-10 shadow-sm text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shadow-xs">
          <Image
            src="/images/mumbi-logo.png"
            alt="Mumbi Girls' Senior School crest"
            width={68}
            height={69}
            sizes="68px"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-accent/10 text-accent">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The page or notice you requested could not be found on the{' '}
            {schoolInfo.name} website. It may have been moved or updated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href="/"
            className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors shadow-xs"
          >
            <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Go to Home</span>
          </Link>
          <Link
            href="/downloads"
            className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-colors"
          >
            <FolderDown className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Downloads Hub</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-slate-700 hover:text-primary hover:bg-slate-100 text-sm font-bold transition-colors"
          >
            <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Contact Office</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
