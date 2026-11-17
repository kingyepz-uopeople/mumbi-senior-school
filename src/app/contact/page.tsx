import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import PhotoSlot from '@/components/shared/PhotoSlot';
import ContactForm from '@/components/contact/ContactForm';
import { schoolInfo } from '@/data/mock-school-data';
import { PHOTO_SLOTS, publicAssetExists } from '@/lib/media';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact & Admissions',
  description:
    "Contact Mumbi Girls Senior School administration in Mukuyu Sub-location, Kiharu Constituency, Murang'a County (P.O. Box 115 - 10200, Murang'a; KNEC 10204102; MoE F2030609).",
  path: '/contact',
});

export default function ContactPage() {
  const hasCampusPhoto = publicAssetExists(PHOTO_SLOTS.campusLocation);

  return (
    <div className="bg-slate-bg">
      <PageHeader
        kicker="School Office & Admissions"
        title="Contact & Campus Location"
        description="Enquiries on Grade 10 admissions, joining instructions, fee payments, examination records, and boarding matters."
        meta={[
          schoolInfo.postalAddress,
          `KNEC ${schoolInfo.knecCode}`,
          `MoE ${schoolInfo.moeReg}`,
          schoolInfo.officeHoursShort,
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Admissions Guidance Band */}
        <section
          id="admissions"
          aria-labelledby="admissions-heading"
          className="scroll-mt-28 bg-white border border-slate-200 border-l-4 border-l-primary p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1.5">
              Senior School Admissions
            </p>
            <h2
              id="admissions-heading"
              className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2"
            >
              Grade 10 Joining Instructions &amp; Fee Structure
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Students placed at {schoolInfo.name} (KNEC Centre{' '}
              {schoolInfo.knecCode}) can download the joining instructions
              booklet and annual fee structure from the Downloads page, or send
              an admissions question to the school office using the form below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/downloads"
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
            >
              <span>Joining documents</span>
              <ArrowRight
                className="w-4 h-4 shrink-0 stroke-[1.75]"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/academics#pathways"
              className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-sm border border-slate-300 bg-white hover:border-primary text-slate-800 hover:text-primary text-sm font-semibold transition-colors"
            >
              CBC pathways
            </Link>
          </div>
        </section>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Official Office Details & Location Photo Slot */}
          <div className="lg:col-span-5 space-y-8">
            <section
              aria-labelledby="official-details-heading"
              className="bg-white border border-slate-200 border-t-2 border-t-primary p-6 sm:p-7"
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
                  <h2
                    id="official-details-heading"
                    className="font-serif font-bold text-xl text-slate-900 leading-snug"
                  >
                    Administration Office
                  </h2>
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
                    <dd className="text-slate-600 mt-0.5">
                      {schoolInfo.phonePlaceholder}
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

            {/* Campus Gate / Location Photo Slot (reads from public/images/campus-location.jpg) */}
            <section
              aria-labelledby="campus-location-heading"
              className="space-y-3"
            >
              <PhotoSlot
                src={PHOTO_SLOTS.campusLocation}
                exists={hasCampusPhoto}
                alt="Main gate and administration block at Mumbi Girls Senior School, Mukuyu, Murang'a County"
                width={1200}
                height={675}
                sizes="(max-width: 1024px) 100vw, 40vw"
                aspectClassName="aspect-16/9"
                placeholderLabel="Photo coming soon"
              />
              <div>
                <h2
                  id="campus-location-heading"
                  className="font-serif text-lg font-bold text-slate-900"
                >
                  Visiting the School
                </h2>
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
            aria-labelledby="inquiry-form-heading"
            className="lg:col-span-7 bg-white border border-slate-200 border-t-2 border-t-primary p-6 sm:p-9"
          >
            <div className="pb-5 mb-6 border-b border-slate-200">
              <h2
                id="inquiry-form-heading"
                className="font-serif text-2xl font-bold text-slate-900 mb-1.5"
              >
                Write to the Administration Office
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Send a message concerning Grade 10 admission, school fees,
                academic records, or student boarding matters.
              </p>
            </div>

            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}
