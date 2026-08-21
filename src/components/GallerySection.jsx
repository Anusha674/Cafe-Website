import React, { useState } from 'react';
import { galleryCategories, galleryItems } from '../data/galleryData';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-heading">
            A Glimpse Into Aura Roast
          </h2>
          <p className="text-base text-stone-600 dark:text-stone-300 font-normal">
            Explore our artisanal roasting lab, cozy Scandinavian seating nooks, and freshly prepared culinary delights.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'glass-card text-stone-700 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-900/10 dark:border-amber-500/15"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold font-heading">{item.title}</h3>
                <p className="text-xs text-stone-300 line-clamp-2 mt-1">{item.description}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal Overlay */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl">

            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-950/80 text-white hover:bg-amber-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev/Next Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-950/80 text-white hover:bg-amber-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-stone-950/80 text-white hover:bg-amber-600 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image & Info */}
            <div className="flex flex-col md:flex-row h-[75vh]">
              <div className="flex-1 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full object-cover max-h-[75vh]"
                />
              </div>

              <div className="w-full md:w-80 p-6 bg-stone-900 text-stone-100 flex flex-col justify-between text-left space-y-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="text-xl font-bold font-heading mt-1">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 flex justify-between">
                  <span>Photo {lightboxIndex + 1} of {filteredItems.length}</span>
                  <span className="text-amber-400 font-semibold">Aura Roast Gallery</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
