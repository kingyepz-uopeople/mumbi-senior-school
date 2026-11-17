import type { Metadata } from 'next';
import {
  Award,
  CheckCircle2,
  Clock,
  Compass,
  Music,
  Shield,
  Star,
  UserCheck,
  Users,
} from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import {
  bomChairpersons,
  governanceRoles,
  principals,
  schoolAnthem,
  schoolInfo,
} from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Us',
  description:
    "Explore Mumbi Girls Senior School's history since 1960, motto, mission, vision, core values, English and Kiswahili school anthems, principals and BOM leadership timelines, and student council governance in Mukuyu, Murang'a.",
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="bg-slate-bg">
      <PageHeader
        badge="Heritage & Governance"
        title={`About ${schoolInfo.name}`}
        description={`A ${schoolInfo.category} in Murang'a County nurturing competent, ethical, and transformative young women since ${schoolInfo.founded}.`}
        icon={Compass}
        chips={[
          `KNEC Centre: ${schoolInfo.knecCode}`,
          `MoE Reg: ${schoolInfo.moeReg}`,
          `Founded: ${schoolInfo.founded}`,
          "Mukuyu, Kiharu, Murang'a East",
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* History & Background */}
        <section
          id="history"
          aria-labelledby="about-history-heading"
          className="scroll-mt-28"
        >
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 border-t-4 border-t-primary p-6 sm:p-10 md:p-12">
            <div className="flex items-start sm:items-center gap-3.5 mb-6">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <Clock className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Historical Heritage
                </span>
                <h2
                  id="about-history-heading"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5"
                >
                  Our History &amp; Background
                </h2>
              </div>
            </div>

            <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Established in <strong>{schoolInfo.founded}</strong> in the
                historic township of <strong>Mukuyu, Murang&apos;a</strong>,{' '}
                {schoolInfo.name} was founded on the firm belief that educating
                a girl strengthens an entire nation. Named after <em>Mumbi</em>,
                the revered matriarch of the Agikuyu community symbolising
                motherly strength, dignity, and wisdom, the school began as a
                community-driven effort to expand quality secondary education
                for young women in Central Kenya.
              </p>
              <p>
                Through decades of dedicated service by the Board of Management,
                parents, teaching and non-teaching staff, the Ministry of
                Education, and the local community, Mumbi Girls grew steadily
                into an established <strong>{schoolInfo.category}</strong> (KNEC
                Centre <strong>{schoolInfo.knecCode}</strong>, MoE Registration{' '}
                <strong>{schoolInfo.moeReg}</strong>), preparing thousands of
                alumnae for university study and public service.
              </p>
              <p>
                Under Kenya&apos;s{' '}
                <strong>Competency-Based Curriculum (CBC)</strong>, the school
                serves Senior School learners across three structured pathways —{' '}
                <strong>STEM</strong>, <strong>Social Sciences</strong>, and{' '}
                <strong>Arts &amp; Sports Science</strong> — combining modern
                classroom and laboratory learning with vibrant co-curricular and
                boarding life.
              </p>
            </div>
          </div>
        </section>

        {/* Motto, Mission, Vision & Core Values */}
        <section
          id="mission"
          aria-labelledby="about-mission-heading"
          className="scroll-mt-28"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Our Foundations
            </span>
            <h2
              id="about-mission-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-3"
            >
              Motto, Mission, Vision &amp; Core Values
            </h2>
            <div
              className="w-16 h-1 bg-accent mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <article className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-primary shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                <Star className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                School Motto
              </h3>
              <p className="text-xl sm:text-2xl font-serif font-black text-slate-900 italic">
                &ldquo;{schoolInfo.motto}&rdquo;
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Reflecting our daily commitment to unlocking every learner&apos;s
                full potential through rigorous scholarship, discipline, and
                character formation.
              </p>
            </article>

            <article className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-primary shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {schoolInfo.mission}
              </p>
            </article>

            <article className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 border-t-4 border-t-primary shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4">
                <Award className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {schoolInfo.vision}
              </p>
            </article>
          </div>

          {/* Core Values Detailed Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <Shield
                className="w-5 h-5 text-primary shrink-0"
                aria-hidden="true"
              />
              <span>Core Values &amp; Guiding Principles</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {schoolInfo.coreValues.map((val, idx) => (
                <div
                  key={val.title}
                  className="p-4 sm:p-5 rounded-xl bg-slate-bg border border-slate-200 flex items-start gap-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0"
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {val.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dual School Anthems */}
        <section
          id="anthems"
          aria-labelledby="about-anthems-heading"
          className="scroll-mt-28"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Musical Heritage
            </span>
            <h2
              id="about-anthems-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2"
            >
              Dual School Anthems
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-3">
              Sung with pride and unity in English and Kiswahili at official
              school assemblies and ceremonies.
            </p>
            <div
              className="w-16 h-1 bg-accent mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* English Anthem */}
            <article className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl p-6 sm:p-8 shadow-md border border-primary-dark">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-white/20 pb-4">
                <div className="flex items-center gap-3">
                  <Music
                    className="w-6 h-6 text-blue-100 shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold text-white">
                    {schoolAnthem.english.title}
                  </h3>
                </div>
                <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 text-white font-semibold">
                  English
                </span>
              </div>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed font-serif text-white/95 italic">
                {schoolAnthem.english.verses.map((verse, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-black/20 border border-white/15"
                  >
                    <p className="whitespace-pre-line">{verse}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Kiswahili Anthem */}
            <article
              lang="sw"
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-200 border-t-4 border-t-primary"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <Music
                    className="w-6 h-6 text-primary shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="text-xl font-bold text-primary">
                    {schoolAnthem.kiswahili.title}
                  </h3>
                </div>
                <span className="text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                  Kiswahili
                </span>
              </div>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed font-serif text-slate-800 italic">
                {schoolAnthem.kiswahili.verses.map((verse, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-bg border border-slate-200"
                  >
                    <p className="whitespace-pre-line">{verse}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* Leadership & Governance Timelines */}
        <section
          id="leadership"
          aria-labelledby="about-leadership-heading"
          className="scroll-mt-28 space-y-10"
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Governance &amp; Stewardship
            </span>
            <h2
              id="about-leadership-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-3"
            >
              Leadership Through the Decades
            </h2>
            <div
              className="w-16 h-1 bg-accent mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Principals Timeline */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 bg-primary text-white rounded-xl shrink-0">
                  <UserCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Roll of Principals
                  </h3>
                  <p className="text-xs text-slate-600">
                    {schoolInfo.founded} to Present
                  </p>
                </div>
              </div>

              <ol className="space-y-3">
                {principals.map((principal, idx) => (
                  <li
                    key={principal.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                      principal.isCurrent
                        ? 'bg-primary/6 border-primary'
                        : 'bg-slate-bg border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        aria-hidden="true"
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          principal.isCurrent
                            ? 'bg-primary text-white'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900">
                          {principal.name}
                        </h4>
                        {principal.isCurrent && (
                          <span className="inline-block px-2 py-0.5 rounded-sm text-[11px] font-bold bg-accent text-white mt-1">
                            Current Chief Principal
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="self-start sm:self-center ml-11 sm:ml-0 text-xs font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shrink-0">
                      {principal.period}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BOM Chairpersons Timeline */}
            <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 bg-primary-dark text-white rounded-xl shrink-0">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Board of Management (BOM) Chairs
                  </h3>
                  <p className="text-xs text-slate-600">
                    Institutional Stewardship ({schoolInfo.founded} – Present)
                  </p>
                </div>
              </div>

              <ol className="space-y-3">
                {bomChairpersons.map((chair, idx) => (
                  <li
                    key={chair.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors ${
                      chair.isCurrent
                        ? 'bg-primary/6 border-primary'
                        : 'bg-slate-bg border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        aria-hidden="true"
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          chair.isCurrent
                            ? 'bg-primary text-white'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900">
                          {chair.name}
                        </h4>
                        {chair.isCurrent && (
                          <span className="inline-block px-2 py-0.5 rounded-sm text-[11px] font-bold bg-accent text-white mt-1">
                            Incumbent BOM Chair
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="self-start sm:self-center ml-11 sm:ml-0 text-xs font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shrink-0">
                      {chair.period}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Deputies & Student Council Governance */}
          <div
            data-dark-surface
            className="bg-gradient-to-br from-primary via-primary to-primary-dark text-white rounded-2xl p-6 sm:p-8 border border-primary-dark shadow-md"
          >
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2.5">
              <Award
                className="w-5 h-5 text-blue-100 shrink-0"
                aria-hidden="true"
              />
              <span>Administrative Deputies &amp; Student Council</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {governanceRoles.map((item) => (
                <article
                  key={item.id}
                  className="p-5 rounded-xl bg-black/20 border border-white/15 flex flex-col"
                >
                  <span className="text-xs text-blue-100 font-semibold uppercase tracking-wider mb-1">
                    {item.role}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/90 mt-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <ul className="mt-auto pt-3 border-t border-white/15 space-y-1.5 text-xs text-white/90">
                    {item.responsibilities.map((resp) => (
                      <li key={resp} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-blue-100 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
