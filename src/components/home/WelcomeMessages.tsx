'use client';

import Image from 'next/image';
import { ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { schoolInfo } from '@/data/mock-school-data';
import { getWelcomeParagraphs } from '@/i18n/content';
import LocaleLink from '@/i18n/LocaleLink';
import { fill } from '@/i18n/fill';
import { useLocale } from '@/i18n/locale-context';

interface WelcomeLetterProps {
  id: string;
  seed: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  name: string;
  role: string;
  photo: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  };
  action: { href: string; label: string };
}

function WelcomeLetter({
  id,
  seed,
  kicker,
  title,
  paragraphs,
  name,
  role,
  photo,
  action,
}: WelcomeLetterProps) {
  return (
    <article className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
      <div data-reveal="" className="w-full max-w-xs md:col-span-4">
        <figure className="m-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-slate-300 bg-slate-100">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 351px) calc(100vw - 2rem), 320px"
              className={`h-full w-full object-cover ${photo.className}`}
            />
          </div>
          <figcaption className="mt-2.5 text-xs leading-relaxed text-slate-600">
            {name} — {role}
          </figcaption>
        </figure>
      </div>

      <div data-reveal="" data-reveal-delay="1" className="max-w-2xl md:col-span-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {kicker}
        </p>
        <BlurRevealHeading
          id={id}
          seed={seed}
          className="font-serif text-2xl leading-tight font-bold text-slate-900 sm:text-3xl lg:text-4xl"
        >
          {title}
        </BlurRevealHeading>
        <div className="mt-4 mb-6 h-0.5 w-10 bg-accent" aria-hidden="true" />

        <div className="space-y-4 text-base leading-relaxed text-slate-700">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-300 pt-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-serif text-lg font-bold text-slate-900">{name}</p>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.1em] text-slate-600">
              {role}
            </p>
          </div>
          <LocaleLink
            href={action.href}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark hover:underline hover:underline-offset-4"
          >
            <span>{action.label}</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 stroke-[1.75]"
              aria-hidden="true"
            />
          </LocaleLink>
        </div>
      </div>
    </article>
  );
}

export default function WelcomeMessages() {
  const { locale, dict } = useLocale();
  const h = dict.home;

  return (
    <section
      aria-label={h.welcomeAria}
      className="relative bg-slate-bg py-16 sm:py-24"
    >
      <SectionStemBackdrop variant="welcome" />
      <div className="relative mx-auto max-w-7xl space-y-16 px-4 sm:space-y-20 sm:px-6">
        <WelcomeLetter
          id="principal-welcome-heading"
          seed="home-principal-welcome"
          kicker={h.principalKicker}
          title={fill(h.principalTitle, { name: schoolInfo.name })}
          paragraphs={getWelcomeParagraphs(locale, 'principal')}
          name="Mrs. Florence Wahito Thumbi"
          role={fill(h.principalRole, { name: schoolInfo.name })}
          photo={{
            src: '/images/principal.png',
            alt: `Portrait of Mrs. Florence Wahito Thumbi, Chief Principal of ${schoolInfo.name}`,
            width: 1024,
            height: 1052,
            className: 'object-center',
          }}
          action={{ href: '/about', label: h.principalAction }}
        />
        <div className="border-t border-slate-200" aria-hidden="true" />
        <WelcomeLetter
          id="dean-welcome-heading"
          seed="home-dean-welcome"
          kicker={h.deanKicker}
          title={h.deanTitle}
          paragraphs={getWelcomeParagraphs(locale, 'dean')}
          name="Mr. Kiruri"
          role={fill(h.deanRole, { name: schoolInfo.name })}
          photo={{
            src: '/images/school/dean-of-studies.jpg',
            alt: 'Mr. Kiruri, Dean of Studies, holding a trophy beside the school KCSE target banner',
            width: 900,
            height: 1600,
            className: 'object-[center_18%]',
          }}
          action={{ href: '/academics', label: h.deanAction }}
        />
      </div>
    </section>
  );
}
