import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import PageHero from '@/components/shared/PageHero';
import PhotoSlot from '@/components/shared/PhotoSlot';
import RegistryLogo from '@/components/shared/RegistryLogo';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import ContactForm from '@/components/contact/ContactForm';
import { schoolInfo } from '@/data/mock-school-data';
import { PHOTO_SLOTS, publicAssetExists } from '@/lib/media';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact & Campus Location',
  description:
    `Contact the ${schoolInfo.name} office or visit the campus in ${schoolInfo.physicalLocation}.`,
  path: '/contact',
});

export default function ContactPage() {
  const hasCampusPhoto = publicAssetExists(PHOTO_SLOTS.campusLocation);

  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="contact"
        kicker="School Office"
        title="Contact & Campus Location"
        subtitle="Enquiries on Grade 10 admissions, joining instructions, fee payments, examination records, and boarding matters."
        meta={[
          schoolInfo.postalAddress,
          `KNEC ${schoolInfo.knecCode}`,
          `MoE ${schoolInfo.moeReg}`,
          schoolInfo.officeHoursShort,
        ]}
      />

      <div className="relative">
        <SectionStemBackdrop variant="contact" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Admissions Guidance Band */}
        <section
          id="admissions"
          data-reveal=""
          aria-labelledby="admissions-heading"
          className="scroll-mt-28 bg-white/50 border border-slate-200 border-l-4 border-l-primary p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1.5">
              Senior School Admissions
            </p>
            <BlurRevealHeading
              id="admissions-heading"
              seed="contact-admissions"
              className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2"
            >
              Joining Grade 10?
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Find the reporting date, school fee guidance, and a uniform photo
              in the Grade 10 admissions guide. Confirm the latest details with
              the school office before travelling, shopping, or paying fees.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/admissions"
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
            >
              <span>View admissions guide</span>
              <ArrowRight
                className="w-4 h-4 shrink-0 stroke-[1.75]"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/admissions#uniform"
              className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:border-primary text-slate-800 hover:text-primary text-sm font-semibold transition-colors"
            >
              Uniform photo
            </Link>
          </div>
        </section>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Official Office Details & Location Photo Slot */}
          <div className="lg:col-span-5 space-y-8">
            <section
              id="school-office"
              data-reveal=""
              aria-labelledby="official-details-heading"
              className="scroll-mt-4 bg-white/50 border border-slate-200 border-t-2 border-t-primary p-6 sm:p-7"
            >
              <div className="flex items-start gap-3.5 pb-5 mb-5 border-b border-slate-200">
                <Image
                  src="/images/mumbi-logo.png"
                  alt="Mumbi Girls' Senior School crest"
                  width={50}
                  height={51}
                  sizes="50px"
                  className="w-12 h-12 rounded-xs bg-[#f7f7f7] border border-slate-200 p-1 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <BlurRevealHeading
                    id="official-details-heading"
                    seed="contact-office-details"
                    className="font-serif font-bold text-xl text-slate-900 leading-snug"
                  >
                    Administration Office
                  </BlurRevealHeading>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {schoolInfo.category}
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-slate-200 text-sm">
                <div className="py-3.5 tabular-nums">
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
                    Registration Codes
                  </dt>
                  <dd className="text-slate-900 mt-1">
                    KNEC Centre <strong>{schoolInfo.knecCode}</strong> · MoE
                    Reg. <strong>{schoolInfo.moeReg}</strong>
                  </dd>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <RegistryLogo agency="knec" size="card" surface="light" />
                    <RegistryLogo agency="moe" size="card" surface="light" />
                  </div>
                </div>

                <div className="py-3.5 flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 text-primary shrink-0 mt-1 stroke-[1.75]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-slate-900">
                      Physical Location
                    </dt>
                    <dd className="text-slate-600 mt-0.5 leading-relaxed">
                      {schoolInfo.physicalLocation}
                    </dd>
                  </div>
                </div>

                <div className="py-3.5 flex items-start gap-3">
                  <Mail
                    className="w-4 h-4 text-primary shrink-0 mt-1 stroke-[1.75]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <dt className="font-semibold text-slate-900">
                      Postal &amp; Email Address
                    </dt>
                    <dd className="text-slate-600 mt-0.5">
                      {schoolInfo.postalAddress}
                    </dd>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${schoolInfo.email}`}
                        className="text-primary font-medium underline underline-offset-4 decoration-primary/40 hover:text-primary-dark hover:decoration-primary-dark break-all"
                      >
                        {schoolInfo.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="py-3.5 flex items-start gap-3">
                  <Phone
                    className="w-4 h-4 text-primary shrink-0 mt-1 stroke-[1.75]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-slate-900">Telephone</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${schoolInfo.phone}`}
                        className="text-primary font-medium underline underline-offset-4 decoration-primary/40 hover:text-primary-dark hover:decoration-primary-dark tabular-nums"
                      >
                        {schoolInfo.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="py-3.5 flex items-start gap-3">
                  <Clock
                    className="w-4 h-4 text-primary shrink-0 mt-1 stroke-[1.75]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-slate-900">
                      Office Hours
                    </dt>
                    <dd className="text-slate-600 mt-0.5">
                      {schoolInfo.officeHours}
                    </dd>
                  </div>
                </div>
              </dl>
            </section>

            {/* Campus entrance photograph from the supplied school photo collection */}
            <section
              data-reveal=""
              aria-labelledby="campus-location-heading"
              className="space-y-3"
            >
              <PhotoSlot
                src={PHOTO_SLOTS.campusLocation}
                exists={hasCampusPhoto}
                alt="Blue entrance gate of Mumbi Girls Senior School"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 40vw"
                aspectClassName="aspect-16/9"
                placeholderLabel="Photo coming soon"
              />
              <div>
                <BlurRevealHeading
                  id="campus-location-heading"
                  seed="contact-visiting"
                  className="font-serif text-lg font-bold text-slate-900"
                >
                  Visiting the School
                </BlurRevealHeading>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  The compound is in {schoolInfo.physicalLocation}. All visitors
                  sign in at the main gate and report to the administration
                  office during weekday working hours (08:00 – 17:00).
                </p>
              </div>
            </section>
          </div>

          {/* Right: Inquiry Form */}
          <section
            data-reveal=""
            data-reveal-delay="1"
            aria-labelledby="inquiry-form-heading"
            className="lg:col-span-7 bg-white/55 border border-slate-200 border-t-2 border-t-primary p-6 sm:p-9"
          >
            <div className="pb-5 mb-6 border-b border-slate-200">
              <BlurRevealHeading
                id="inquiry-form-heading"
                seed="contact-inquiry-form"
                className="font-serif text-2xl font-bold text-slate-900 mb-1.5"
              >
                Write to the Administration Office
              </BlurRevealHeading>
              <p className="text-sm text-slate-600 leading-relaxed">
                This form is a preview and does not send messages to the school.
                For admissions or fee enquiries, use the{' '}
                <a href="#school-office" className="font-semibold text-primary underline underline-offset-4">
                  school office contact details
                </a>.
              </p>
            </div>

            <ContactForm />
          </section>
        </div>
        </div>
      </div>
    </div>
  );
}
