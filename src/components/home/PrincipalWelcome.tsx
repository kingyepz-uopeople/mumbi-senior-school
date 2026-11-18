import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import PhotoSlot from '@/components/shared/PhotoSlot';
import ScrollHighlightText from '@/components/shared/ScrollHighlightText';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { principals, schoolInfo } from '@/data/mock-school-data';
import { PHOTO_SLOTS, publicAssetExists } from '@/lib/media';

export default function PrincipalWelcome() {
  const currentPrincipal =
    principals.find((p) => p.isCurrent) ?? principals[principals.length - 1];
  const hasPortrait = publicAssetExists(PHOTO_SLOTS.principalPortrait);

  return (
    <section
      aria-labelledby="principal-welcome-heading"
      className="relative py-16 sm:py-24 bg-slate-bg"
    >
      <SectionStemBackdrop variant="welcome" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Portrait Frame (reads from public/images/principal.jpg) */}
          <div data-reveal="" className="md:col-span-4 max-w-xs w-full">
            <PhotoSlot
              src={PHOTO_SLOTS.principalPortrait}
              exists={hasPortrait}
              alt={`Portrait of ${currentPrincipal.name}, Chief Principal of ${schoolInfo.name}`}
              width={800}
              height={1000}
              sizes="(max-width: 768px) 320px, 340px"
              aspectClassName="aspect-4/5"
              caption={`${currentPrincipal.name} — Chief Principal (${currentPrincipal.period})`}
            />
          </div>

          {/* Left-Aligned Welcome Letter */}
          <div
            data-reveal=""
            data-reveal-delay="1"
            className="md:col-span-8 max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Office of the Chief Principal
            </p>
            <BlurRevealHeading
              id="principal-welcome-heading"
              seed="home-principal-welcome"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            >
              Welcome to {schoolInfo.name}
            </BlurRevealHeading>
            <div className="w-10 h-0.5 bg-accent mt-4 mb-6" aria-hidden="true" />

            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <ScrollHighlightText
                seed="home-principal-intro"
                segments={[
                  `Founded in ${schoolInfo.founded} in Mukuyu, Murang'a County, ${schoolInfo.name} is a ${schoolInfo.category} serving over 1,200 students. Our daily work is straightforward: structured classroom and laboratory teaching, supervised boarding life, and steady preparation for national examinations and university study.`,
                ]}
              />
              <p>
                Under Kenya&apos;s Competency-Based Curriculum, Senior School
                learners in Grades 10 to 12 study across three pathways — STEM,
                Social Sciences, and Arts &amp; Sports Science — taught by five
                academic departments alongside games, clubs, uniformed
                movements, and school chaplaincy.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-300 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="font-serif text-lg font-bold text-slate-900">
                  {currentPrincipal.name}
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-600 mt-0.5">
                  Chief Principal · {schoolInfo.name}
                </p>
              </div>

              <Link
                href="/about"
                className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors"
              >
                <span>School history &amp; leadership</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0 stroke-[1.75]"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
