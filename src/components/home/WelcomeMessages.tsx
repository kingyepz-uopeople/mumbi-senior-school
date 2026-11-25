import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { schoolInfo } from '@/data/mock-school-data';

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
          <Link
            href={action.href}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark hover:underline hover:underline-offset-4"
          >
            <span>{action.label}</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 stroke-[1.75]"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

const deanParagraphs = [
  'Welcome to the Academic Office of Mumbi Girls Senior School. As Dean of Studies, it is a privilege to work alongside a dedicated team of educators and highly motivated learners who consistently push the boundaries of academic achievement.',
  'Our academic philosophy is anchored in rigorous preparation, individualized mentorship, and seamless adaptation to the Competency-Based Education Senior School curriculum. Whether a learner is pursuing STEM, Social Sciences, or Arts and Sports Science, our departments ensure she receives hands-on laboratory exposure, structured revision schedules, and close academic tracking from Grade 10 through to national examinations.',
  'Beyond classroom instruction, we foster a culture of intellectual curiosity, disciplined study habits, and peer collaboration. Through our digital learning portal, learners and parents can easily access holiday assignments, termly academic calendars, and revision materials to keep learning uninterrupted both in school and at home.',
  'We remain committed to guiding every girl toward realizing her highest academic potential and securing competitive placements in premier universities and tertiary institutions across Kenya and beyond.',
];

const principalParagraphs = [
  'It is with immense pride and warm hospitality that I welcome you to the official digital home of Mumbi Girls Senior School. Located in the serene learning environment of Mukuyu in Kiharu, Murang\u2019a County, our institution stands as a center of academic rigor, moral integrity, and holistic girl-child empowerment.',
  'For decades, Mumbi Girls has nurtured young women into confident, disciplined, and visionary leaders who excel across national examinations, university placements, and diverse spheres of society. Today, as we embrace the Competency-Based Education Senior School framework, we are equipping our learners not just to pass exams, but to discover and master their unique potential across our STEM, Social Sciences, and Arts and Sports Science pathways.',
  'At Mumbi Girls Senior School, we believe that true education balances sharp intellect with strong character. Alongside dedicated classroom instruction from our committed teaching staff, we place deep emphasis on spiritual nourishment, co-curricular excellence, leadership, and personal responsibility. Every learner who walks through our gates is mentored to think critically, serve selflessly, and lead with courage.',
  'Whether you are a prospective parent, a current learner, a proud alumna, or an education partner, I invite you to explore our programs, track our achievements, and connect with our vibrant school community through this portal. Together, let us continue shaping women of substance who will transform our nation and the world.',
];

export default function WelcomeMessages() {
  return (
    <section
      aria-label="Welcome messages"
      className="relative bg-slate-bg py-16 sm:py-24"
    >
      <SectionStemBackdrop variant="welcome" />
      <div className="relative mx-auto max-w-7xl space-y-16 px-4 sm:space-y-20 sm:px-6">
        <WelcomeLetter
          id="principal-welcome-heading"
          seed="home-principal-welcome"
          kicker="Chief Principal's Welcome Message"
          title={`Welcome to ${schoolInfo.name}`}
          paragraphs={principalParagraphs}
          name="Mrs. Florence Wahito Thumbi"
          role={`Chief Principal, ${schoolInfo.name}`}
          photo={{
            src: '/images/principal.jpg',
            alt: `Portrait of Mrs. Florence Wahito Thumbi, Chief Principal of ${schoolInfo.name}`,
            width: 514,
            height: 528,
            className: 'object-center',
          }}
          action={{ href: '/about', label: 'School history & leadership' }}
        />
        <div className="border-t border-slate-200" aria-hidden="true" />
        <WelcomeLetter
          id="dean-welcome-heading"
          seed="home-dean-welcome"
          kicker="Dean's Welcome Message"
          title="Academic Excellence & Senior School Pathways"
          paragraphs={deanParagraphs}
          name="Mr. Kiruri"
          role={`Dean of Studies, ${schoolInfo.name}`}
          photo={{
            src: '/images/school/dean-of-studies.jpg',
            alt: 'Mr. Kiruri, Dean of Studies, holding a trophy beside the school KCSE target banner',
            width: 900,
            height: 1600,
            className: 'object-[center_18%]',
          }}
          action={{ href: '/academics', label: 'Academic pathways & results' }}
        />
      </div>
    </section>
  );
}
