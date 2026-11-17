'use client';

import React, { useState } from 'react';
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  CircleDot,
  Clock,
  Compass,
  Cross,
  Footprints,
  Hand,
  Heart,
  HeartPulse,
  Moon,
  Newspaper,
  Shield,
  Shirt,
  Sparkles,
  Sun,
  Target,
  Theater,
  TreePine,
  Trophy,
  Users,
  Utensils,
} from 'lucide-react';
import { clubs, sports, dailyRoutine, faithGroups } from '@/data/mock';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'clubs' | 'sports' | 'routine' | 'faith' | 'boarding'>('clubs');

  const getClubIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-5 h-5 text-[#800020]" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-[#800020]" />;
      case 'Cross': return <Cross className="w-5 h-5 text-[#800020]" />;
      case 'Newspaper': return <Newspaper className="w-5 h-5 text-[#800020]" />;
      case 'Theater': return <Theater className="w-5 h-5 text-[#800020]" />;
      case 'TreePine': return <TreePine className="w-5 h-5 text-[#800020]" />;
      case 'Shield': return <Shield className="w-5 h-5 text-[#800020]" />;
      case 'CircleDot': return <CircleDot className="w-5 h-5 text-[#800020]" />;
      case 'Target': return <Target className="w-5 h-5 text-[#800020]" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-[#800020]" />;
      case 'Hand': return <Hand className="w-5 h-5 text-[#800020]" />;
      case 'Heart': return <Heart className="w-5 h-5 text-[#800020]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#800020]" />;
      case 'Moon': return <Moon className="w-5 h-5 text-[#800020]" />;
      default: return <Activity className="w-5 h-5 text-[#800020]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#800020] via-[#5c0017] to-[#800020] text-white py-16 px-4 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            Holistic Student Growth
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Student Life &amp; Co-Curriculars
          </h1>
          <p className="max-w-3xl mx-auto text-slate-200 text-lg leading-relaxed">
            Beyond the classroom: sportsmanship, character-building uniformed movements, vibrant chaplaincy, and disciplined boarding community.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Navigation Tabs */}
        <div className="flex justify-center flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('clubs')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'clubs'
                ? 'bg-[#800020] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            Clubs &amp; Movements
          </button>
          <button
            onClick={() => setActiveTab('sports')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'sports'
                ? 'bg-[#800020] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            Sports &amp; Games
          </button>
          <button
            onClick={() => setActiveTab('routine')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'routine'
                ? 'bg-[#800020] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            Daily Routine
          </button>
          <button
            onClick={() => setActiveTab('faith')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'faith'
                ? 'bg-[#800020] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className="w-4 h-4 text-[#D4AF37]" />
            Chaplaincy &amp; Faith
          </button>
          <button
            onClick={() => setActiveTab('boarding')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'boarding'
                ? 'bg-[#800020] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Utensils className="w-4 h-4 text-[#D4AF37]" />
            Boarding &amp; Uniforms
          </button>
        </div>

        {/* Tab 1: Clubs & Societies */}
        {activeTab === 'clubs' && (
          <section id="clubs" className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">Clubs, Societies &amp; Movements</h2>
              <p className="text-sm text-slate-600 mt-2">Equipping young ladies with civic responsibility, leadership, and creative expression.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clubs.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#800020] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#800020]/10 flex items-center justify-center">
                      {getClubIcon(c.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{c.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">{c.category}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{c.description}</p>
                  <div className="pt-3 border-t border-slate-100 text-xs space-y-1 text-slate-500">
                    <p><strong className="text-slate-800">Patron:</strong> {c.patron}</p>
                    <p><strong className="text-slate-800">Meets:</strong> {c.meetingDay}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 2: Sports & Games */}
        {activeTab === 'sports' && (
          <section id="sports" className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">Sports &amp; Games</h2>
              <p className="text-sm text-slate-600 mt-2">Active participation in Murang&apos;a County and National KSSSA tournaments.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sports.map((s) => (
                <div key={s.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#D4AF37] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                      {getClubIcon(s.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{s.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#800020] font-semibold">Competitive Sport</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{s.description}</p>
                  <div className="pt-3 border-t border-slate-100 text-xs space-y-1 text-slate-500">
                    <p><strong className="text-slate-800">Coach / Patron:</strong> {s.patron}</p>
                    <p><strong className="text-slate-800">Training Schedule:</strong> {s.meetingDay}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: Daily Routine */}
        {activeTab === 'routine' && (
          <section id="routine" className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">Structured Daily School Routine</h2>
              <p className="text-sm text-slate-600 mt-2">Discipline and time management guiding our student boarding timetable.</p>
            </div>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
              <div className="relative border-l-2 border-[#800020] ml-4 md:ml-6 pl-6 space-y-6">
                {dailyRoutine.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#800020] group-hover:scale-125 transition-transform" />
                    <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-black text-[#800020] tracking-wider uppercase px-2 py-1 rounded bg-[#800020]/10 w-fit">
                        {item.time}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 sm:text-right">
                        {item.activity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Tab 4: Chaplaincy & Faith */}
        {activeTab === 'faith' && (
          <section id="faith" className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">Chaplaincy &amp; Spiritual Development</h2>
              <p className="text-sm text-slate-600 mt-2">Nurturing moral uprightness and spiritual well-being across diverse faith traditions.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faithGroups.map((f) => (
                <div key={f.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#800020] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#800020]/10 flex items-center justify-center">
                      {getClubIcon(f.icon)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{f.name}</h3>
                      <span className="text-xs text-slate-500">{f.meetingDay}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{f.description}</p>
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <strong className="text-slate-800">Spiritual Patron:</strong> {f.patron}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 5: Boarding & Uniforms */}
        {activeTab === 'boarding' && (
          <section id="boarding" className="space-y-8 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">Boarding, Nutrition &amp; School Uniforms</h2>
              <p className="text-sm text-slate-600 mt-2">Creating a warm, clean, and secure home away from home for all students.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center mb-4">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Nutritious Meals</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A balanced diet prepared in modern hygienic kitchens. Daily menu includes cereals, fresh fruits, vegetables, beans, beef, and dairy milk.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center mb-4">
                  <Shirt className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Official School Uniform</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Deep Royal Maroon blazers with embroidered school crest, pleated skirts, white collared shirts, academic gold ties, and black leather shoes.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">Health &amp; Security</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  24/7 campus security surveillance, electric fencing, a resident school nurse, and prompt referral hospital arrangements in Murang&apos;a town.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
