import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { schoolInfo } from '@/data/mock-school-data';
import { PHOTO_SLOTS, publicAssetExists } from '@/lib/media';

/**
 * Real homepage hero photograph slot.
 *
 * To display an actual school photograph in the hero:
 *   1. Save a landscape photograph at `public/images/hero/campus.jpg`
 *      (recommended: 1600x1067 px or 1920x1280 px JPG).
 *   2. Optionally update `HERO_PHOTO_ALT` below to describe the scene.
 *   3. Rebuild or redeploy — this component detects the file automatically
 *      and renders it alongside the crest and school name.
 *
 * Until `public/images/hero/campus.jpg` is added, the hero renders on solid
 * crest blue (#115191) with a subtle repeating line pattern derived from the
 * Mumbi Girls shield crest.
 */
const HERO_PHOTO_PATH = PHOTO_SLOTS.heroCampus; // '/images/hero/campus.jpg'
const HERO_PHOTO_ALT =
  "Mumbi Girls Senior School campus in Mukuyu, Murang'a County";

export default function CampusHero() {
  const hasCampusPhoto = publicAssetExists(HERO_PHOTO_PATH);

  return (
    <section
      data-dark-surface
      aria-labelledby="school-hero-heading"
      className="relative bg-crest-pattern text-white border-b border-primary-dark scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start lg:items-center">
          {/* Primary Identity Column */}
          <div
            className={
              hasCampusPhoto ? 'lg:col-span-6 space-y-6' : 'lg:col-span-8 space-y-6'
            }
          >
            {/* Official Crest + Provenance */}
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-7">
              <div
                data-hero-step="0"
                className="hero-rise self-start shrink-0 w-32 sm:w-36 md:w-38 rounded-xs bg-[#f7f7f7] p-2.5 sm:p-3 border border-white"
              >
                <Image
                  src="/images/mumbi-logo.png"
                  alt="Mumbi Girls' Senior School crest"
                  width={310}
                  height={316}
                  sizes="(max-width: 639px) 128px, 155px"
                  quality={95}
                  priority
                  className="block w-full h-auto aspect-[310/316] object-contain"
                />
              </div>

              <div className="space-y-3 min-w-0">
                <p
                  data-hero-step="1"
                  className="hero-rise text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-blue-100 tabular-nums"
                >
                  Mukuyu, Murang&apos;a County · Est. {schoolInfo.founded}
                </p>

                <h1
                  id="school-hero-heading"
                  data-hero-step="2"
                  className="hero-rise font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight"
                >
                  {schoolInfo.name}
                </h1>

                <div
                  data-hero-step="3"
                  className="hero-rule w-12 h-0.5 bg-accent"
                  aria-hidden="true"
                />

                <p
                  data-hero-step="4"
                  className="hero-rise font-serif italic text-xl sm:text-2xl text-white/95 leading-snug"
                >
                  &ldquo;{schoolInfo.motto}&rdquo;
                </p>
              </div>
            </div>

            <p
              data-hero-step="5"
              className="hero-rise text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl"
            >
              A {schoolInfo.category} in Mukuyu Sub-location, Kiharu
              Constituency, offering Senior School instruction in STEM, Social
              Sciences, and Arts &amp; Sports Science under Kenya&apos;s
              Competency-Based Curriculum.
            </p>

            {/* Two Clear Actions */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/contact#admissions"
                data-hero-step="6"
                className="hero-rise min-h-11 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-blue-50 text-primary font-semibold text-sm transition-colors"
              >
                <span>Admissions</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0 stroke-[1.75]"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/explore"
                data-hero-step="7"
                className="hero-rise min-h-11 inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/75 hover:bg-primary-dark text-white font-semibold text-sm transition-colors"
              >
                Explore the school
              </Link>
            </div>
          </div>

          {/* Right Column: Real Campus Photograph (when public/images/hero/campus.jpg exists)
              or Official School Register on solid crest blue */}
          {hasCampusPhoto ? (
            <div data-hero-step="5" className="hero-rise lg:col-span-6">
              <figure className="m-0 border border-white/40 bg-primary-dark p-1.5">
                <div className="relative aspect-3/2 w-full overflow-hidden">
                  <Image
                    src={HERO_PHOTO_PATH}
                    alt={HERO_PHOTO_ALT}
                    width={1600}
                    height={1067}
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </figure>
            </div>
          ) : (
            <div
              data-hero-step="5"
              className="hero-rise lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/25 pt-7 lg:pt-1 lg:pl-9"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100 mb-4">
                School Particulars
              </p>
              <dl className="divide-y divide-white/15 text-sm">
                <div className="py-2.5">
                  <dt className="text-xs text-blue-100">Classification</dt>
                  <dd className="font-medium text-white mt-0.5">
                    {schoolInfo.category}
                  </dd>
                </div>
                <div className="py-2.5 grid grid-cols-2 gap-4 tabular-nums">
                  <div>
                    <dt className="text-xs text-blue-100">KNEC Code</dt>
                    <dd className="font-semibold text-white mt-0.5">
                      {schoolInfo.knecCode}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-blue-100">MoE Registration</dt>
                    <dd className="font-semibold text-white mt-0.5">
                      {schoolInfo.moeReg}
                    </dd>
                  </div>
                </div>
                <div className="py-2.5">
                  <dt className="text-xs text-blue-100">Postal Address</dt>
                  <dd className="font-medium text-white mt-0.5">
                    {schoolInfo.postalAddress}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="text-xs text-blue-100">Office Hours</dt>
                  <dd className="font-medium text-white mt-0.5">
                    {schoolInfo.officeHours}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
