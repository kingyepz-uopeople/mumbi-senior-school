import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from '@/components/icons';
import HeroPathwaysRotator from '@/components/home/HeroPathwaysRotator';
import HeroPhotoLoop from '@/components/home/HeroPhotoLoop';
import HeroMaskedTitle from '@/components/shared/HeroMaskedTitle';
import HeroStemBackdrop from '@/components/shared/HeroStemBackdrop';
import HeroTypewriterText from '@/components/shared/HeroTypewriterText';
import RegistryLogo from '@/components/shared/RegistryLogo';
import { schoolInfo } from '@/data/mock-school-data';

export default function CampusHero() {
  return (
    <section
      aria-labelledby="school-hero-heading"
      className="relative overflow-hidden border-b border-primary-dark bg-primary text-white scroll-mt-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div data-dark-surface className="relative overflow-hidden">
          <HeroStemBackdrop variant="home" />

          <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-7">
              <div
                data-hero-step="0"
                className="hero-rise w-32 shrink-0 self-start rounded-xs border border-white bg-[#f7f7f7] p-2.5 sm:w-36 sm:p-3"
              >
                <Image
                  src="/images/mumbi-logo.png"
                  alt="Mumbi Girls' Senior School crest"
                  width={310}
                  height={316}
                  sizes="(max-width: 639px) 128px, 144px"
                  quality={95}
                  priority
                  className="block aspect-[310/316] h-auto w-full object-contain"
                />
              </div>

              <div className="min-w-0 space-y-3">
                <p
                  data-hero-step="1"
                  className="hero-rise text-xs font-semibold uppercase tracking-[0.14em] text-blue-100 tabular-nums sm:text-sm"
                >
                  {schoolInfo.locationShort} · Est. {schoolInfo.founded}
                </p>

                <HeroMaskedTitle
                  id="school-hero-heading"
                  text={schoolInfo.name}
                  baseDelayMs={110}
                  staggerMs={75}
                  className="font-serif text-3xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl"
                />

                <div
                  data-hero-step="rule"
                  className="hero-rule h-0.5 w-12 bg-accent"
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
                    className="font-serif text-xl leading-snug text-white/95 italic sm:text-2xl"
                  />

                  <HeroPathwaysRotator />
                </div>
              </div>
            </div>

            <p
              data-hero-step="intro"
              className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
            >
              A {schoolInfo.category} in {schoolInfo.physicalLocation}. We offer
              STEM, Social Sciences, and Arts &amp; Sports Science under
              Kenya&apos;s Competency-Based Curriculum.
            </p>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/admissions"
                data-hero-step="cta-1"
                className="hero-rise inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-blue-50"
              >
                <span>Grade 10 admissions</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 stroke-[1.75]"
                  aria-hidden="true"
                />
              </Link>
              <a
                href="#family-quick-links"
                data-hero-step="cta-2"
                className="hero-rise inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/75 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <span>Quick links for families</span>
                <ArrowDown className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <dl className="hero-rise mt-8 grid grid-cols-1 gap-x-6 border-t border-white/20 pt-5 text-sm sm:grid-cols-2">
              <div className="border-b border-white/15 py-2.5 sm:col-span-2">
                <dt className="text-xs text-blue-100">Classification</dt>
                <dd className="mt-0.5 font-medium text-white">
                  {schoolInfo.category}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-white/15 py-2.5 tabular-nums">
                <div>
                  <dt className="text-xs text-blue-100">KNEC Code</dt>
                  <dd className="mt-0.5 font-semibold text-white">
                    {schoolInfo.knecCode}
                  </dd>
                </div>
                <RegistryLogo agency="knec" size="card" surface="dark" />
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-white/15 py-2.5 tabular-nums">
                <div>
                  <dt className="text-xs text-blue-100">MoE Registration</dt>
                  <dd className="mt-0.5 font-semibold text-white">
                    {schoolInfo.moeReg}
                  </dd>
                </div>
                <RegistryLogo agency="moe" size="card" surface="dark" />
              </div>
              <div className="border-b border-white/15 py-2.5 sm:border-b-0">
                <dt className="text-xs text-blue-100">Postal Address</dt>
                <dd className="mt-0.5 font-medium text-white">
                  {schoolInfo.postalAddress}
                </dd>
              </div>
              <div className="py-2.5">
                <dt className="text-xs text-blue-100">Office Hours</dt>
                <dd className="mt-0.5 font-medium text-white">
                  {schoolInfo.officeHours}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="relative h-80 sm:h-[28rem] lg:h-auto lg:min-h-full">
          <HeroPhotoLoop />
        </div>
      </div>
    </section>
  );
}
