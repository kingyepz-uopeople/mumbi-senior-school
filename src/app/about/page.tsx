import React from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  Heart,
  Music,
  Shield,
  Star,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  schoolInfo,
  schoolAnthem,
  principals,
  bomChairpersons,
} from '@/data/mock';

export const metadata = {
  title: 'About Us | Mumbi Girls Senior School',
  description:
    'Learn about Mumbi Girls Senior School history, mission, vision, dual school anthems, and leadership governance in Murang\'a County, Kenya.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-[#800020] via-[#5c0017] to-[#800020] text-white py-16 px-4 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4" />
            Heritage & Governance
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            About Mumbi Girls Senior School
          </h1>
          <p className="max-w-3xl mx-auto text-slate-200 text-lg leading-relaxed">
            A premier C2 Public Girls&apos; Boarding Senior School in Murang&apos;a County nurturing competent, ethical, and transformative leaders for the 21st century.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-300">
            <span className="bg-black/30 px-3 py-1.5 rounded-md border border-white/10">KNEC Centre: {schoolInfo.knecCode}</span>
            <span className="bg-black/30 px-3 py-1.5 rounded-md border border-white/10">MoE Reg: {schoolInfo.moeReg}</span>
            <span className="bg-black/30 px-3 py-1.5 rounded-md border border-white/10">Founded: {schoolInfo.founded}</span>
            <span className="bg-black/30 px-3 py-1.5 rounded-md border border-white/10">Mukuyu, Murang&apos;a East</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* History & Background */}
        <section id="history" className="scroll-mt-24">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#800020]/10 rounded-xl text-[#800020]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Historical Heritage</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Our History & Background</h2>
              </div>
            </div>
            <div className="prose max-w-none text-slate-700 leading-relaxed space-y-4">
              <p>
                Established in <strong>1960</strong> in the historic township of <strong>Mukuyu, Murang&apos;a</strong>, Mumbi Girls Senior School was founded on the firm belief that educating a girl is educating an entire nation. Named after <em>Mumbi</em>, the revered matriarch of the Agikuyu community symbolizing motherly strength, dignity, and wisdom, the institution began as a community-driven initiative to bridge the gap in secondary education for young women in Central Kenya.
              </p>
              <p>
                Through decades of steadfast commitment from the Board of Management, Parents Teachers Association, Ministry of Education, and local community leaders, Mumbi Girls expanded from a modest single-stream campus into a premier <strong>C2 Public Girls&apos; Boarding Senior School</strong>. The institution has consistently recorded impressive KCSE academic performances, sending thousands of alumni to prestigious public and private universities locally and internationally.
              </p>
              <p>
                With the rollout of Kenya&apos;s <strong>Competency-Based Curriculum (CBC)</strong>, Mumbi Girls successfully transitioned to become a fully accredited <strong>Senior School Pathways Hub</strong> offering <strong>STEM</strong>, <strong>Social Sciences</strong>, and <strong>Arts &amp; Sports Science</strong> pathways, modernizing science labs, multimedia resource centres, and vocational workshops.
              </p>
            </div>
          </div>
        </section>

        {/* Foundational Pillars: Motto, Mission, Vision, Core Values */}
        <section id="mission" className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">Our Foundations</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">Motto, Mission, Vision &amp; Values</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-[#800020] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#800020] text-[#D4AF37] flex items-center justify-center font-bold text-xl mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#800020] mb-2">School Motto</h3>
              <p className="text-2xl font-serif font-black text-slate-800 italic">
                &ldquo;{schoolInfo.motto}&rdquo;
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Reflecting our unwavering commitment to unlocking every girl&apos;s latent potential through academic rigor, self-discipline, and character formation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-[#800020] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#800020] text-[#D4AF37] flex items-center justify-center font-bold text-xl mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#800020] mb-2">Our Mission</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {schoolInfo.mission}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-[#800020] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#800020] text-[#D4AF37] flex items-center justify-center font-bold text-xl mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#800020] mb-2">Our Vision</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {schoolInfo.vision}
              </p>
            </div>
          </div>

          {/* Core Values Detailed Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#800020]" />
              Core Values &amp; Guiding Principles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schoolInfo.coreValues.map((val, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 text-[#800020] font-bold text-sm flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{val}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Practiced daily in classes, dining, student assemblies, and co-curricular sports.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dual School Anthems */}
        <section id="anthems" className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">Musical Heritage</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">Dual School Anthems</h2>
            <p className="text-sm text-slate-600 mt-2">Sung with pride and unity at every official school assembly and function.</p>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* English Anthem */}
            <div className="bg-gradient-to-br from-[#800020] to-[#590016] text-white rounded-2xl p-8 shadow-md border-2 border-[#D4AF37]">
              <div className="flex items-center justify-between mb-6 border-b border-white/20 pb-4">
                <div className="flex items-center gap-3">
                  <Music className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="text-xl font-bold text-[#D4AF37]">{schoolAnthem.english.title}</h3>
                </div>
                <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white font-semibold">
                  English Edition
                </span>
              </div>
              <div className="space-y-6 text-sm md:text-base leading-relaxed font-serif text-slate-100 italic">
                {schoolAnthem.english.verses.map((verse, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/20 border border-white/10">
                    <p className="whitespace-pre-line">{verse}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kiswahili Anthem */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-slate-200">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <Music className="w-6 h-6 text-[#800020]" />
                  <h3 className="text-xl font-bold text-[#800020]">{schoolAnthem.kiswahili.title}</h3>
                </div>
                <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#800020]/10 text-[#800020] font-semibold">
                  Toleo la Kiswahili
                </span>
              </div>
              <div className="space-y-6 text-sm md:text-base leading-relaxed font-serif text-slate-800 italic">
                {schoolAnthem.kiswahili.verses.map((verse, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200">
                    <p className="whitespace-pre-line">{verse}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Governance Timelines */}
        <section id="leadership" className="scroll-mt-24 space-y-12">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">Governance &amp; Stewardship</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">Leadership Through the Decades</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Principals Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 bg-[#800020] text-white rounded-xl">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Roll of Principals</h3>
                  <p className="text-xs text-slate-500">1960 to Present Date</p>
                </div>
              </div>

              <div className="space-y-4">
                {principals.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                      idx === principals.length - 1
                        ? 'bg-[#800020]/5 border-[#800020] shadow-sm'
                        : 'bg-[#F8FAFC] border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        idx === principals.length - 1
                          ? 'bg-[#800020] text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                        {idx === principals.length - 1 && (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#800020] text-white mt-0.5">
                            Current Chief Principal
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                      {p.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* BOM Chairpersons Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2.5 bg-[#D4AF37] text-[#800020] rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Board of Management (BOM) Chairs</h3>
                  <p className="text-xs text-slate-500">Stewardship Timeline</p>
                </div>
              </div>

              <div className="space-y-4">
                {bomChairpersons.map((b, idx) => (
                  <div
                    key={b.id}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                      idx === bomChairpersons.length - 1
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-sm'
                        : 'bg-[#F8FAFC] border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        idx === bomChairpersons.length - 1
                          ? 'bg-[#D4AF37] text-slate-900'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{b.name}</h4>
                        {idx === bomChairpersons.length - 1 && (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37] text-slate-900 mt-0.5">
                            Incumbent BOM Chair
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                      {b.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Administration & Student Council */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-8 border border-slate-700">
            <h3 className="text-xl font-bold mb-6 text-[#D4AF37] flex items-center gap-2">
              <Award className="w-5 h-5" />
              Current Administrative Deputies &amp; Student Council Governance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-1">Deputy Principal</div>
                <div className="text-base font-bold text-white">Academics &amp; Curriculum</div>
                <p className="text-xs text-slate-300 mt-2">
                  Oversees CBC Pathway implementation, syllabus coverage, internal assessments, and national examination preparedness.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-1">Deputy Principal</div>
                <div className="text-base font-bold text-white">Administration &amp; Discipline</div>
                <p className="text-xs text-slate-300 mt-2">
                  Coordinates school operations, student welfare, boarding facilities, maintenance, and adherence to school regulations.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-1">Student Council</div>
                <div className="text-base font-bold text-white">Democratic Student Governance</div>
                <p className="text-xs text-slate-300 mt-2">
                  Led by the School President and Deputy President, representing student interests, peer mentoring, and co-ordinating campus activities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
