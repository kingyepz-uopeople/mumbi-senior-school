import type { Metadata } from 'next';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { ArrowRight, Clock, Mail, Phone } from '@/components/icons';
import PhotoSlot from '@/components/shared/PhotoSlot';
import RegistryLogo from '@/components/shared/RegistryLogo';
import EmailLink from '@/components/shared/EmailLink';
import PhoneActions from '@/components/shared/PhoneActions';
import CopyValueButton from '@/components/shared/CopyValueButton';
import OfficeHoursStatus from '@/components/shared/OfficeHoursStatus';
import ContactForm from '@/components/contact/ContactForm';
import DirectionsLink from '@/components/shared/DirectionsLink';
import LocaleLink from '@/i18n/LocaleLink';
import { getLocaleDictionary } from '@/i18n/server';
import { schoolInfo } from '@/data/mock-school-data';
import { PHOTO_SLOTS, publicAssetExists } from '@/lib/media';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact & Campus Location',
  description: `Contact the ${schoolInfo.name} office or visit the campus in ${schoolInfo.physicalLocation}.`,
  path: '/contact',
});

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);
  const c = dict.contact;
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
            {c.kicker}
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {c.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            {c.subtitle}
          </p>
          <div className="mt-6 border-t border-white/15 pt-5">
            <OfficeHoursStatus variant="hero" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
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
                {c.admissionsBand}
              </p>
              <h2
                id="admissions-heading"
                className="font-serif text-xl font-bold text-white sm:text-2xl"
              >
                {c.joiningGrade10}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-blue-100/85 sm:text-base">
                {c.admissionsBody}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <LocaleLink
                href="/admissions"
                className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-sm font-semibold text-primary hover:bg-blue-50"
              >
                {c.viewAdmissions}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </LocaleLink>
              <LocaleLink
                href="/admissions#uniform"
                className="inline-flex min-h-11 items-center justify-center px-5 py-2.5 rounded-full border border-white/60 text-sm font-semibold text-white hover:bg-white/10"
              >
                {c.uniformPhoto}
              </LocaleLink>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
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
                    {c.adminOffice}
                  </h2>
                  <p className="mt-0.5 text-xs text-blue-100">
                    {schoolInfo.category}
                  </p>
                </div>
              </div>

              <dl className="divide-y divide-white/15 text-sm">
                <div className="py-3.5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-blue-100">
                    {c.registrationCodes}
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
                    strokeWidth={1.75}
                    className="mt-1 size-4 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-white">{c.physicalLocation}</dt>
                    <dd className="mt-0.5 text-blue-100/85">
                      {schoolInfo.physicalLocation}
                    </dd>
                    <dd className="mt-1">
                      <DirectionsLink tone="dark" />
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5">
                  <Mail
                    className="mt-1 size-4 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <dt className="font-semibold text-white">{c.postalEmail}</dt>
                    <dd className="mt-0.5 text-blue-100/85">
                      {schoolInfo.postalAddress}
                    </dd>
                    <dd className="mt-1 flex flex-wrap items-center gap-2">
                      <EmailLink
                        email={schoolInfo.email}
                        className="text-white hover:text-blue-100 break-all"
                      />
                      <CopyValueButton
                        value={schoolInfo.email}
                        label={c.emailAddress}
                        tone="dark"
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
                    <dt className="font-semibold text-white">{c.telephone}</dt>
                    <dd className="mt-1 flex flex-wrap items-center gap-2">
                      <PhoneActions phone={schoolInfo.phone} tone="dark" />
                      <CopyValueButton
                        value={schoolInfo.phone}
                        label={c.phoneNumber}
                        tone="dark"
                      />
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-3.5">
                  <Clock
                    className="mt-1 size-4 shrink-0 text-blue-100"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-semibold text-white">{c.officeHours}</dt>
                    <dd className="mt-0.5 text-blue-100/85">
                      {schoolInfo.officeHours}
                    </dd>
                    <dd className="mt-2">
                      <OfficeHoursStatus variant="bar" />
                    </dd>
                  </div>
                </div>
              </dl>
            </section>

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
                placeholderLabel={c.photoSoon}
              />
              <div>
                <h2
                  id="visiting-heading"
                  className="font-serif text-lg font-bold text-slate-900"
                >
                  {c.visitingHeading}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {c.visitingBody}
                </p>
                <div className="mt-4 overflow-hidden rounded-md border border-slate-200 bg-white">
                  <iframe
                    title={c.mapTitle}
                    src={schoolInfo.mapsEmbedUrl}
                    className="block aspect-16/9 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <DirectionsLink variant="button" className="mt-4" />
              </div>
            </section>
          </div>

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
                {c.writeHeading}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {c.writeDisclaimer}
              </p>
            </div>

            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}