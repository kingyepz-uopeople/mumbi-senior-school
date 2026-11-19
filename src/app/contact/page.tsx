import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import PhotoSlot from '@/components/shared/PhotoSlot';
import RegistryLogo from '@/components/shared/RegistryLogo';
import EmailLink from '@/components/shared/EmailLink';
import PhoneActions from '@/components/shared/PhoneActions';
import ContactForm from '@/components/contact/ContactForm';
import { schoolInfo } from '@/data/mock-school-data';
import { PHOTO_SLOTS, publicAssetExists } from '@/lib/media';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact & Campus Location',
  description: `Contact the ${schoolInfo.name} office or visit the campus in ${schoolInfo.physicalLocation}.`,
  path: '/contact',
});

export default function ContactPage() {
  const hasCampusPhoto = publicAssetExists(PHOTO_SLOTS.campusLocation);

  return (
    <div className="bg-slate-bg">
      <section
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
            School Office
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            Contact &amp; Campus Location
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            Enquiries on Grade 10 admissions, joining instructions, fee payments,
            examination records, and boarding matters.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        {/* Admissions band */}
        <section
          id="admissions"
          data-dark-surface
          aria-labelledby="admissions-heading"
          data-reveal=""
          className="scroll-mt-28 rounded-xl bg-primary-dark px-5 py-9 text-white sm:px-8 sm:py-12"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">
                Senior School Admissions
              </p>
              <h2
                id="admissions-heading"
                className="font-serif text-xl font-bold text-white sm:text-2xl"
              >
                Joining Grade 10?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-blue-100/85 sm:text-base">
                Find the reporting date, school fees, and a uniform photo in the
                Grade 10 admissions guide. Confirm the latest details with the
                school office before travelling, shopping, or paying fees.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admissions"
                className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-sm font-semibold text-primary hover:bg-blue-50"
              >
                View admissions guide
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
              <Link
                href="/admissions#uniform"
                className="inline-flex min-h-11 items-center justify-center px-5 py-2.5 rounded-full border border-white/60 text-sm font-semibold text-white hover:bg-white/10"
              >
                Uniform photo
              </Link>
            </div>
          </div>
        </section>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: office details + campus photo */}
          <div className="space-y-8 lg:col-span-5">
            <section
              id="school-office"
              data-dark-surface
              aria-labelledby="office-heading"
              data-reveal=""
              className="scroll-mt-4 rounded-xl bg-primary-dark px-6 py-7 text-white sm:px-7"
            >
              <div className="mb-5 flex items-start gap-3.5 border-b border-white/15 pb-5">
                <Image
                  src="/images/mumbi-logo.png"
                  alt="Mumbi Girls' Senior School crest"
                  width={50}
                  height={51}
                  sizes="50px"
                  className="w-12 h-12 shrink-0 rounded-xs border border-white/80 bg-[#f7f7f7] p-1 object-contain"
                />
                <div className="min-w-0">
                  <h2
                    id="office-heading"
                    className="font-serif text-xl font-bold leading-snug text-white"
                  >
                    Administration Office
                  </h2>
                  <p className="mt-0.5 text-xs text-blue-100">
                    {schoolInfo.category}
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-white/15 text-sm">
                <div className="py-3.5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-100">
                    Registration Codes
                  </dt>
                  <dd className="mt-1 text-white">
                    KNEC Centre <strong>{schoolInfo.knecCode}</strong> · MoE Reg.{' '}
                    <strong>{schoolInfo.moeReg}</strong>
                  </dd>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    <RegistryLogo agency="knec" size="card" surface="dark" />
                    <RegistryLogo agency="moe" size="card" surface="dark" />
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5">
                  <MapPin
                    className="mt-1 size-4 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-white">Physical Location</dt>
                    <dd className="mt-0.5 text-blue-100/85">
                      {schoolInfo.physicalLocation}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5">
                  <Mail
                    className="mt-1 size-4 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <dt className="font-semibold text-white">
                      Postal &amp; Email Address
                    </dt>
                    <dd className="mt-0.5 text-blue-100/85">
                      {schoolInfo.postalAddress}
                    </dd>
                    <dd className="mt-1">
                      <EmailLink
                        email={schoolInfo.email}
                        className="text-white hover:text-blue-100"
                      />
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5">
                  <Phone
                    className="mt-1 size-4 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-white">Telephone</dt>
                    <dd className="mt-1">
                      <PhoneActions phone={schoolInfo.phone} tone="dark" />
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5">
                  <Clock
                    className="mt-1 size-4 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-white">Office Hours</dt>
                    <dd className="mt-0.5 text-blue-100/85">
                      {schoolInfo.officeHours}
                    </dd>
                  </div>
                </div>
              </dl>
            </section>

            {/* Campus entrance photograph */}
            <section
              aria-labelledby="visiting-heading"
              data-reveal=""
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
                <h2
                  id="visiting-heading"
                  className="font-serif text-lg font-bold text-slate-900"
                >
                  Visiting the School
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  The compound is in {schoolInfo.physicalLocation}. All visitors
                  sign in at the main gate and report to the administration
                  office during weekday working hours (08:00 – 17:00).
                </p>
              </div>
            </section>
          </div>

          {/* Right: inquiry form */}
          <section
            data-reveal=""
            data-reveal-delay="1"
            aria-labelledby="inquiry-form-heading"
            className="rounded-xl border border-slate-200 bg-white p-6 sm:p-9 lg:col-span-7"
          >
            <div className="mb-6 border-b border-slate-200 pb-5">
              <h2
                id="inquiry-form-heading"
                className="font-serif text-2xl font-bold text-slate-900"
              >
                Write to the Administration Office
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                This form is a preview and does not send messages to the school.
                For admissions or fee enquiries, use the{' '}
                <a
                  href="#school-office"
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  school office contact details
                </a>
                .
              </p>
            </div>

            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}
