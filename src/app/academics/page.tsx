'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Briefcase,
  Calculator,
  Cpu,
  FlaskConical,
  GraduationCap,
  Languages,
  Microscope,
  Music,
  Palette,
  Sparkles,
  TrendingUp,
  Trophy,
  Wrench,
  Globe,
} from 'lucide-react';
import { cbcPathways, departments, topStudents } from '@/data/mock';

export default function AcademicsPage() {
  const [selectedPathway, setSelectedPathway] = useState<'stem' | 'social-sciences' | 'arts-sports'>('stem');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const currentPathwayData = cbcPathways.find((p) => p.id === selectedPathway);

  const years = Array.from(new Set(topStudents.map((s) => s.year))).sort((a, b) => b - a);

  const filteredStudents = selectedYear === 'all'
    ? topStudents
    : topStudents.filter((s) => s.year === selectedYear);

  const getDeptIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator': return <Calculator className="w-6 h-6 text-[#800020]" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-[#800020]" />;
      case 'Languages': return <Languages className="w-6 h-6 text-[#800020]" />;
      case 'Globe': return <Globe className="w-6 h-6 text-[#800020]" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-[#800020]" />;
      default: return <BookOpen className="w-6 h-6 text-[#800020]" />;
    }
  };

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-[#800020]" />;
      case 'Microscope': return <Microscope className="w-5 h-5 text-[#800020]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#800020]" />;
      case 'Globe': return <Globe className="w-5 h-5 text-[#800020]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#800020]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#800020]" />;
      case 'Music': return <Music className="w-5 h-5 text-[#800020]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#800020]" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-[#800020]" />;
      default: return <Sparkles className="w-5 h-5 text-[#800020]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#800020] via-[#5c0017] to-[#800020] text-white py-16 px-4 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            Curriculum &amp; Academic Excellence
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Academic Programs &amp; CBC Pathways
          </h1>
          <p className="max-w-3xl mx-auto text-slate-200 text-lg leading-relaxed">
            Delivering holistic education aligned with Kenya&apos;s Competency-Based Curriculum (CBC) for Grades 10, 11 &amp; 12 and senior secondary examinations.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* CBC Pathways Explorer */}
        <section id="pathways" className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">Senior School Hub</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">CBC Senior School Pathways (Grades 10 – 12)</h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
              Under Kenya&apos;s Basic Education Curriculum Framework, Mumbi Girls Senior School offers three specialized pathways tailored to diverse student passions and career goals.
            </p>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Pathway Selector Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-xl bg-slate-200/80 border border-slate-300">
              <button
                onClick={() => setSelectedPathway('stem')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                  selectedPathway === 'stem'
                    ? 'bg-[#800020] text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-[#D4AF37]" />
                STEM Pathway
              </button>
              <button
                onClick={() => setSelectedPathway('social-sciences')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                  selectedPathway === 'social-sciences'
                    ? 'bg-[#800020] text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                Social Sciences
              </button>
              <button
                onClick={() => setSelectedPathway('arts-sports')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                  selectedPathway === 'arts-sports'
                    ? 'bg-[#800020] text-white shadow-md'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Palette className="w-4 h-4 text-[#D4AF37]" />
                Arts &amp; Sports Science
              </button>
            </div>
          </div>

          {/* Tracks in Selected Pathway */}
          {currentPathwayData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentPathwayData.tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#800020]/10 flex items-center justify-center">
                        {getTrackIcon(track.icon)}
                      </div>
                      <h3 className="font-bold text-lg text-slate-900">{track.name}</h3>
                    </div>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                      {track.description}
                    </p>

                    {/* Core Subjects */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#800020] mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Key Subject Offerings
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {track.subjects.map((sub, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-slate-200 text-slate-700 font-medium"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Career Pathways */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      Target Careers
                    </h4>
                    <p className="text-xs text-slate-600">
                      {track.careers.join(' • ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Academic Departments Directory */}
        <section id="departments" className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">Faculty &amp; Departments</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">Academic Departments Directory</h2>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#800020] transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#800020]/10 flex items-center justify-center">
                    {getDeptIcon(dept.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{dept.name}</h3>
                    <p className="text-xs text-[#800020] font-semibold">HOD: {dept.hod}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {dept.description}
                </p>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Subjects Covered</span>
                  <div className="flex flex-wrap gap-1">
                    {dept.subjects.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full KCSE Wall of Fame & Performance Trends */}
        <section id="wall-of-fame" className="scroll-mt-24">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">Academic Glory</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">KCSE Wall of Fame (Top Scholars)</h2>
            <p className="text-sm text-slate-600 mt-2">
              Celebrating our exceptional alumnae admitted to prestigious university degree programs.
            </p>
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-3 rounded-full"></div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 mr-2">Filter by Exam Year:</span>
            <button
              onClick={() => setSelectedYear('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedYear === 'all'
                  ? 'bg-[#800020] text-white shadow'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Years ({topStudents.length})
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-[#800020] text-white shadow'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                KCSE {year}
              </button>
            ))}
          </div>

          {/* Wall of Fame Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStudents.map((st) => (
              <div
                key={st.id}
                className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm hover:border-[#D4AF37] transition-all hover:shadow-md"
              >
                <div className="bg-gradient-to-r from-[#800020] to-[#590016] text-white p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#D4AF37] font-semibold">KCSE {st.year}</span>
                    <h3 className="font-bold text-sm text-white truncate max-w-[170px]">{st.name}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white text-[#800020] flex flex-col items-center justify-center font-black shadow-inner">
                    <span className="text-base leading-none">{st.meanGrade}</span>
                    <span className="text-[10px] text-slate-500 font-bold">{st.points} pts</span>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">University</span>
                    <p className="font-bold text-slate-800 text-sm">{st.university}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">Admitted Course</span>
                    <p className="text-slate-600 font-medium">{st.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
