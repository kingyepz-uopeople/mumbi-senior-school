import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from '@/components/icons';
import HeroPathwaysRotator from '@/components/home/HeroPathwaysRotator';
import HeroMaskedTitle from '@/components/shared/HeroMaskedTitle';
import HeroStemBackdrop from '@/components/shared/HeroStemBackdrop';
import HeroTypewriterText from '@/components/shared/HeroTypewriterText';
import RegistryLogo from '@/components/shared/RegistryLogo';
import { schoolInfo } from '@/data/mock-school-data';
import { PHOTO_SLOTS, publicAssetExists } from '@/lib/media';

/**
 * Real homepage hero photograph from the supplied school photo collection.
 * The photo renders beneath the existing deep crest-blue overlay, with the
 * faint animated school/STEM line-art layer sitting directly above it.
 */
const HERO_PHOTO_PATH = PHOTO_SLOTS.heroCampus;
const HERO_PHOTO_ALT = 'Students gathered outside Mumbi Girls Senior School';

export default function CampusHero() {
  const hasCampusPhoto = publicAssetExists(HERO_PHOTO_PATH);

  return (
    <section
      data-dark-surface
      aria-labelledby="school-hero-heading"
      className="relative overflow-hidden bg-primary text-white border-b border-primary-dark scroll-mt-28"
    >
      {/* Optional real campus photograph + deep crest-blue overlay */}
      {hasCampusPhoto && (
        <>
          <Image
            src={HERO_PHOTO_PATH}
            alt={HERO_PHOTO_ALT}
            fill
            sizes="100vw"
            quality={75}
            priority
            className="z-0 object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] bg-primary-dark/85"
          />
        </>
      )}

      {/* Faint animated stroke-only school & STEM line-art layer */}
      <HeroStemBackdrop variant="home" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start lg:items-center">
          {/* Primary Identity Column */}
          <div className="lg:col-span-8 space-y-6">
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
                  {schoolInfo.locationShort} · Est. {schoolInfo.founded}
                </p>

                <HeroMaskedTitle
                  id="school-hero-heading"
                  text={schoolInfo.name}
                  baseDelayMs={110}
                  staggerMs={75}
                  className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.08] tracking-tight"
                />

                <div
                  data-hero-step="rule"
                  className="hero-rule w-12 h-0.5 bg-accent"
                  aria-hidden="true"
                />

                <div className="space-y-2">
                  <HeroTypewriterText
                    text={schoolInfo.motto}
                    prefix="“"
                    suffix="”"
                    inline
                    startDelayMs={780}
                    charDelayMs={44}
                    spaceDelayMs={62}
                    caretHoldMs={2200}
                    caretFadeMs={500}
                    className="font-serif italic text-xl sm:text-2xl text-white/95 leading-snug"
                  />

                  <HeroPathwaysRotator />
                </div>
              </div>
            </div>

            <p
              data-hero-step="intro"
              className="hero-rise text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl"
            >
              A {schoolInfo.category} in {schoolInfo.physicalLocation}. We offer
              STEM, Social Sciences, and Arts &amp; Sports Science under
              Kenya&apos;s Competency-Based Curriculum.
            </p>

            {/* Two Clear Actions */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/admissions"
                data-hero-step="cta-1"
                className="hero-rise min-h-11 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-blue-50 text-primary font-semibold text-sm transition-colors"
              >
                <span>Grade 10 admissions</span>
                <ArrowRight
                  className="w-4 h-4 shrink-0 stroke-[1.75]"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="#family-quick-links"
                data-hero-step="cta-2"
                className="hero-rise min-h-11 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/75 hover:bg-primary-dark text-white font-semibold text-sm transition-colors"
              >
                <span>Quick links for families</span>
                <ArrowDown className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Official School Particulars */}
          <div
            data-hero-step="intro"
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
              <div className="py-2.5 flex items-center justify-between gap-3 tabular-nums">
                <div>
                  <dt className="text-xs text-blue-100">KNEC Code</dt>
                  <dd className="font-semibold text-white mt-0.5">
                    {schoolInfo.knecCode}
                  </dd>
                </div>
                <RegistryLogo agency="knec" size="card" surface="dark" />
              </div>
              <div className="py-2.5 flex flex-wrap items-center justify-between gap-3 tabular-nums">
                <div>
                  <dt className="text-xs text-blue-100">MoE Registration</dt>
                  <dd className="font-semibold text-white mt-0.5">
                    {schoolInfo.moeReg}
                  </dd>
                </div>
                <RegistryLogo agency="moe" size="card" surface="dark" />
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
        </div>
      </div>
    </section>
  );
}
