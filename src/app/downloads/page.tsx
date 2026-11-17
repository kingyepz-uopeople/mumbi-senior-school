'use client';

import React, { useState, useMemo } from 'react';
import {
  Download,
  FileText,
  Filter,
  FolderDown,
  HardDrive,
  Search,
  Sparkles,
  Calendar,
  Building,
} from 'lucide-react';
import { downloads } from '@/data/mock';
import { DownloadItem } from '@/types';

export default function DownloadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const categories = [
    'All',
    'Holiday Assignment',
    'Newsletter',
    'Admission & Joining Instructions',
    'Fee Structure',
    'Exam Timetable',
  ];

  const levels = ['All', 'Grade 10', 'Grade 11', 'Grade 12', 'Form 3', 'Form 4'];

  const filteredDownloads = useMemo(() => {
    return downloads.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'All' || item.level === selectedLevel || item.level === 'All';

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const handleDownload = (item: DownloadItem) => {
    // Generate simple PDF-like blob / simulation download
    const blob = new Blob(
      [
        `MUMBI GIRLS SENIOR SCHOOL\nKNEC Centre: 10204102 | MoE Reg: F2030609\n\nDocument: ${item.title}\nCategory: ${item.category}\nTarget Level: ${item.level}\nDepartment: ${item.department}\nUploaded Date: ${item.uploadDate}\n\nOfficial document generated from Mumbi Girls Senior School Resource Portal (mumbiseniorschool.sc.ke).`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#800020] via-[#5c0017] to-[#800020] text-white py-16 px-4 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
            <FolderDown className="w-4 h-4" />
            Document Repository
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Downloads &amp; Resources Hub
          </h1>
          <p className="max-w-3xl mx-auto text-slate-200 text-lg leading-relaxed">
            Access official term newsletters, holiday assignments, admission instructions, and fee structures for Mumbi Girls Senior School.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, subject, or department..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800020] text-sm text-slate-800"
            />
          </div>

          {/* Category Filter Pills */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Category Filter</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#800020] text-white shadow'
                      : 'bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter Pills */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Target Class / Level</span>
            <div className="flex flex-wrap gap-2">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedLevel === lvl
                      ? 'bg-[#D4AF37] text-slate-900 shadow'
                      : 'bg-[#F8FAFC] border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong>{filteredDownloads.length}</strong> resources</span>
          <span>Kenyan Date Format: <strong>DD/MM/YYYY</strong></span>
        </div>

        {/* Downloads Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDownloads.length > 0 ? (
            filteredDownloads.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-[#800020] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded bg-[#800020]/10 text-[#800020]">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.level}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-500 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Uploaded on: <strong className="text-slate-700">{item.uploadDate}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>Dept: <strong className="text-slate-700">{item.department}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                      <span>File Size: <strong className="text-slate-700">{item.fileSize}</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(item)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#D4AF37]" />
                  Download Resource ({item.fileSize})
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-700">No documents found</h3>
              <p className="text-sm text-slate-500">Try adjusting your keyword search or category filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
