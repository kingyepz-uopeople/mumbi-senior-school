import type { Metadata } from 'next';
import Image from 'next/image';
import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact & Campus Location',
  description:
    "Reach Mumbi Girls Senior School administration in Mukuyu Sub-location, Kiharu Constituency, Murang'a (P.O. Box 115 - 10200, Murang'a; KNEC 10204102; MoE F2030609).",
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="bg-slate-bg">
      <PageHeader
        badge="Administration Office"
        title="Contact & Campus Location"
        description="Reach the Mumbi Girls Senior School administration for admissions, academic records, fee structure inquiries, and boarding communication."
        icon={MapPin}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Official Registry Details & Campus Map */}
          <div className="lg:col-span-5 space-y-6">
            <section
              aria-labelledby="official-details-heading"
              className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-maroon p-6 sm:p-7 shadow-xs space-y-5"
            >
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <Image
                  src="/images/school-crest.png"
                  alt="Mumbi Girls Senior School crest"
                  width={48}
                  height={48}
                  sizes="48px"
                  className="w-12 h-12 rounded-xl object-contain shrink-0"
                />
                <div className="min-w-0">
                  <h2
                    id="official-details-heading"
                    className="font-bold text-lg text-slate-900 leading-snug"
                  >
                    Official School Details
                  </h2>
                  <p className="text-xs text-slate-600">{schoolInfo.category}</p>
                </div>
              </div>

              <dl className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    className="w-5 h-5 text-maroon shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-bold text-slate-900">
                      Registration Codes
                    </dt>
                    <dd className="text-slate-600">
                      KNEC Centre: <strong className="text-slate-800">{schoolInfo.knecCode}</strong>{' '}
                      • MoE Reg:{' '}
                      <strong className="text-slate-800">{schoolInfo.moeReg}</strong>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 text-maroon shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-bold text-slate-900">
                      Physical Location
                    </dt>
                    <dd className="text-slate-600">
                      {schoolInfo.physicalLocation}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    className="w-5 h-5 text-maroon shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <dt className="font-bold text-slate-900">
                      Postal &amp; Official Email
                    </dt>
                    <dd className="text-slate-600">{schoolInfo.postalAddress}</dd>
                    <dd className="mt-0.5">
                      <a
                        href={`mailto:${schoolInfo.email}`}
                        className="text-maroon font-semibold underline decoration-maroon/40 hover:decoration-maroon break-all"
                      >
                        {schoolInfo.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone
                    className="w-5 h-5 text-maroon shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-bold text-slate-900">
                      Telephone Office
                    </dt>
                    <dd className="text-slate-600">
                      {schoolInfo.phonePlaceholder}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="w-5 h-5 text-maroon shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-bold text-slate-900">Office Hours</dt>
                    <dd className="text-slate-600">{schoolInfo.officeHours}</dd>
                  </div>
                </div>
              </dl>
            </section>

            {/* Local Campus Locator Map */}
            <section
              aria-labelledby="campus-map-heading"
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
            >
              <div className="relative aspect-16/9 w-full bg-slate-100">
                <Image
                  src="/images/campus-map.webp"
                  alt="Illustrated campus locator map showing Mumbi Girls Senior School in Mukuyu Sub-location, Kiharu Constituency, Murang'a County"
                  width={800}
                  height={450}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <h2
                  id="campus-map-heading"
                  className="font-bold text-base text-slate-900"
                >
                  Campus Location Overview
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Situated in {schoolInfo.physicalLocation}. Visitors are
                  requested to report at the main gate and register with the
                  administration office during weekday office hours.
                </p>
              </div>
            </section>
          </div>

          {/* Inquiry Form */}
          <section
            aria-labelledby="inquiry-form-heading"
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 sm:p-8 shadow-xs"
          >
            <div className="mb-6">
              <h2
                id="inquiry-form-heading"
                className="text-xl sm:text-2xl font-bold text-slate-900 mb-1"
              >
                Send an Inquiry
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Complete the form below and our administration desk will review
                your inquiry regarding admissions, academics, finances, or
                student welfare.
              </p>
            </div>

            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}
