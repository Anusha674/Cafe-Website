import React from 'react';
import {
  Coffee,
  Flame,
  Leaf,
  Award,
  Wifi,
  Users,
  CheckCircle,
  HeartHandshake
} from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: Flame,
      title: 'Micro-Batch Roasting',
      description: 'We roast small 5kg batches daily using custom drum roasters to lock in optimal floral and cocoa aromatics.'
    },
    {
      icon: Leaf,
      title: 'Direct-Trade Sourcing',
      description: 'Directly partnered with organic micro-lot farmers across Ethiopia, Colombia, and Guatemala at 40% above fair trade.'
    },
    {
      icon: Award,
      title: 'Master Baristas & Chefs',
      description: 'Our team includes SCA-certified sensory judges and French-trained pastry artisans committed to excellence.'
    },
    {
      icon: Wifi,
      title: 'Work & Creative Haven',
      description: 'Equipped with ultra-fast Wi-Fi, ergonomic leather seating, quiet nooks, and individual power access at every table.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-amber-100/30 dark:bg-stone-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Visual Showcase Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=700"
                  alt="Specialty Roasting"
                  className="rounded-3xl object-cover h-64 w-full shadow-lg border border-amber-900/10 dark:border-amber-500/20"
                />
                <img
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=700"
                  alt="Barista Crafting Coffee"
                  className="rounded-3xl object-cover h-48 w-full shadow-lg border border-amber-900/10 dark:border-amber-500/20"
                />
              </div>

              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=700"
                  alt="Cafe Ambiance Seating"
                  className="rounded-3xl object-cover h-48 w-full shadow-lg border border-amber-900/10 dark:border-amber-500/20"
                />
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=700"
                  alt="Artisan Pastries"
                  className="rounded-3xl object-cover h-64 w-full shadow-lg border border-amber-900/10 dark:border-amber-500/20"
                />
              </div>
            </div>

            {/* Experience Counter Floating Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card p-4 rounded-2xl shadow-2xl border border-amber-500/30 text-center backdrop-blur-md">
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-heading">Est. 2018</div>
              <div className="text-xs font-bold text-stone-800 dark:text-stone-200">6+ Years of Passion</div>
            </div>
          </div>

          {/* Right Column: Story & Quality */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Our Story & Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-heading leading-tight">
              Where Specialty Coffee Meets Culinary Passion
            </h2>

            <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed">
              Founded in 2018, <strong className="text-amber-700 dark:text-amber-400 font-semibold">Aura Roast</strong> was born from a simple belief: coffee is not just a morning routine, but a sensory ritual. We select only top 3% single-origin beans, roasting them in-house to bring out naturally sweet floral and chocolaty notes.
            </p>

            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              Every pastry is laminated by hand at 5 AM using French butter, and every breakfast plate is designed to celebrate local organic farmers. Whether you're here to spark your morning, host a business chat, or relax with a book, Aura Roast is your sanctuary.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl glass-card space-y-1 border border-amber-900/10 dark:border-amber-500/15">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                      <Icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 leading-normal">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
