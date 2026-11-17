'use client';

import React, { useState } from 'react';
import {
  Camera,
  Eye,
  Filter,
  Image as ImageIcon,
  Maximize2,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { galleryAlbums } from '@/data/mock';
import { GalleryImage } from '@/types';

export default function GalleryPage() {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryImage | null>(null);

  // Flatten all images
  const allImages: GalleryImage[] = galleryAlbums.flatMap((a) => a.images);

  const displayedImages = selectedAlbumId === 'all'
    ? allImages
    : galleryAlbums.find((a) => a.id === selectedAlbumId)?.images || [];

  const handleNextLightbox = () => {
    if (!activeLightboxImage) return;
    const currentIndex = displayedImages.findIndex((img) => img.id === activeLightboxImage.id);
    const nextIndex = (currentIndex + 1) % displayedImages.length;
    setActiveLightboxImage(displayedImages[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!activeLightboxImage) return;
    const currentIndex = displayedImages.findIndex((img) => img.id === activeLightboxImage.id);
    const prevIndex = (currentIndex - 1 + displayedImages.length) % displayedImages.length;
    setActiveLightboxImage(displayedImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Banner */}
      <section className="bg-gradient-to-r from-[#800020] via-[#5c0017] to-[#800020] text-white py-16 px-4 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-4 h-4" />
            Visual Memories
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Photo &amp; Media Gallery
          </h1>
          <p className="max-w-3xl mx-auto text-slate-200 text-lg leading-relaxed">
            Capturing the vibrant moments, academic achievements, national competitions, and cultural celebrations of Mumbi Girls Senior School.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        {/* Album Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2">
          <button
            onClick={() => setSelectedAlbumId('all')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
              selectedAlbumId === 'all'
                ? 'bg-[#800020] text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Albums ({allImages.length})
          </button>
          {galleryAlbums.map((album) => (
            <button
              key={album.id}
              onClick={() => setSelectedAlbumId(album.id)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                selectedAlbumId === album.id
                  ? 'bg-[#800020] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {album.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setActiveLightboxImage(img)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Image Container / Placeholder Graphic */}
              <div className="h-56 bg-gradient-to-br from-[#800020]/80 via-slate-800 to-[#D4AF37]/60 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white mb-2 shadow-inner">
                  <ImageIcon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <span className="text-xs font-bold text-white tracking-wide uppercase px-2 py-0.5 rounded bg-black/40">
                  {img.event}
                </span>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#800020]/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                  <Maximize2 className="w-6 h-6 text-[#D4AF37]" />
                  <span className="text-xs font-bold">View Fullscreen</span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 bg-white">
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#800020] transition-colors">
                  {img.alt}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>{img.event}</span>
                  <span className="font-semibold text-[#800020]">{img.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="h-96 bg-gradient-to-br from-[#800020] via-slate-900 to-[#D4AF37]/50 flex flex-col items-center justify-center text-center p-8">
              <ImageIcon className="w-16 h-16 text-[#D4AF37] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{activeLightboxImage.alt}</h3>
              <p className="text-sm text-slate-300">{activeLightboxImage.event} ({activeLightboxImage.year})</p>
            </div>
            <div className="p-4 bg-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Mumbi Girls Senior School Archival Photography</span>
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
