import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PrincipalWelcome() {
  return (
    <section
      aria-labelledby="principal-welcome-heading"
      className="py-14 sm:py-20 bg-slate-bg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-primary shadow-xs overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 p-6 sm:p-10 md:p-12">
            {/* Local Optimized Portrait Placeholder */}
            <div className="shrink-0 text-center">
              <Image
                src="/images/principal-placeholder.webp"
                alt="Official portrait placeholder for Mrs. Eunice Wangari Muturi, Chief Principal of Mumbi Girls Senior School"
                width={208}
                height={208}
                sizes="(max-width: 768px) 160px, 208px"
                className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-md ring-4 ring-primary/20 mx-auto"
              />
            </div>

            {/* Welcome Message */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Message from the Administration
              </span>
              <h2
                id="principal-welcome-heading"
                className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-3"
              >
                Chief Principal&apos;s Welcome
              </h2>
              <div
                className="w-16 h-1 rounded-full bg-accent mb-6 mx-auto md:mx-0"
                aria-hidden="true"
              />

              <p className="text-slate-700 leading-relaxed text-sm sm:text-base md:text-lg mb-6">
                Welcome to Mumbi Girls Senior School — a centre of excellence
                nurturing empowered girls since 1960. Our school stands as a
                pillar of quality public girls&apos; boarding education in
                Murang&apos;a County, uniting strong academic traditions with
                Kenya&apos;s Competency-Based Curriculum (CBC) to prepare our
                learners for a dynamic global society. We are committed to
                holistic education that shapes the intellect, character, and
                talents of every young woman who walks through our gates.
              </p>

              <div className="border-t border-slate-200 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-lg text-primary">
                    Mrs. Eunice Wangari Muturi
                  </p>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                    Chief Principal
                  </span>
                </div>

                <Link
                  href="/about"
                  className="min-h-11 inline-flex items-center justify-center sm:justify-start gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  <span>Read Our History &amp; Governance</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
