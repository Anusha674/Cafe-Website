import React, { useState } from 'react';
import { Flame, Compass, Sparkles, Check, Coffee, Shield } from 'lucide-react';

export default function RoasteryExperience({ onAddToCart }) {
  const [activeFlavor, setActiveFlavor] = useState('floral');

  const flavorProfiles = {
    floral: {
      title: 'Ethiopian Yirgacheffe G1 (Heirloom)',
      origin: 'Yirgacheffe Highlands, Ethiopia (2,100m Elev.)',
      roastLevel: 'Light City Roast',
      process: 'Washed / Sun-Dried on Raised Beds',
      notes: ['Jasmine Blossom', 'Bergamot Tea', 'Wild Honey', 'Peach Nectar'],
      score: 'SCA 92.5',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=700',
      price: 6.50,
      itemId: 'c4'
    },
    chocolate: {
      title: 'Colombian Supremo Micro-Lot',
      origin: 'Huila Region, Colombia (1,850m Elev.)',
      roastLevel: 'Medium Dark Velvet Roast',
      process: 'Anaerobic Natural Fermentation',
      notes: ['Dark Valrhona Chocolate', 'Toasted Hazelnut', 'Caramel Fudge', 'Pecan'],
      score: 'SCA 90.0',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=700',
      price: 5.95,
      itemId: 'c1'
    },
    spiced: {
      title: 'Guatemala Antigua Pastoral',
      origin: 'Sacatepéquez Valley, Guatemala (1,600m Elev.)',
      roastLevel: 'Medium Roast',
      process: 'Semi-Washed Honey Process',
      notes: ['Green Cardamom', 'Cinnamon Bark', 'Ripe Plum', 'Smoked Cocoa'],
      score: 'SCA 91.0',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=700',
      price: 5.80,
      itemId: 'c4'
    },
    creamy: {
      title: 'Sumatra Mandheling Triple-Picked',
      origin: 'Lake Toba, Sumatra (1,500m Elev.)',
      roastLevel: 'Dark Vienna Roast',
      process: 'Wet-Hulled (Giling Basah)',
      notes: ['Sweet Vanilla Bean', 'Dark Cherry', 'Pipe Tobacco', 'Heavy Crema'],
      score: 'SCA 89.5',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=700',
      price: 6.20,
      itemId: 'c5'
    }
  };

  const current = flavorProfiles[activeFlavor];

  const handleOrderCustomRoast = () => {
    onAddToCart({
      id: 'roast-' + activeFlavor,
      name: current.title,
      price: current.price,
      image: current.image,
      description: current.notes.join(', ') + ' - Single Origin Reserve'
    }, 1, 'Freshly brewed pour-over');
  };

  return (
    <section className="py-20 bg-stone-950 text-stone-100 relative overflow-hidden border-t border-b border-amber-500/20">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-card border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Flavor Profiler</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury text-stone-50">
            Discover Your Signature Roast Profile
          </h2>
          <p className="text-base text-stone-400">
            Select your preferred taste palate to explore our single-origin micro-lots roasted in-house daily.
          </p>
        </div>

        {/* Flavor Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {[
            { id: 'floral', label: 'Floral & Citrus', icon: Sparkles },
            { id: 'chocolate', label: 'Chocolate & Nutty', icon: Flame },
            { id: 'spiced', label: 'Spiced & Exotic', icon: Compass },
            { id: 'creamy', label: 'Creamy & Dark', icon: Coffee },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFlavor === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFlavor(tab.id)}
                className={`p-4 rounded-2xl border text-xs font-extrabold transition-all flex flex-col items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-xl shadow-amber-500/20 scale-105'
                    : 'glass-card text-stone-300 border-amber-500/20 hover:border-amber-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Flavor Detail Card */}
        <div className="max-w-5xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* Image Left */}
          <div className="lg:col-span-5 relative h-72 lg:h-96 rounded-2xl overflow-hidden shadow-xl border border-amber-500/20">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-stone-950/80 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
              {current.score} Rating
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Micro-Lot Origin</span>
              <p className="text-xs font-semibold">{current.origin}</p>
            </div>
          </div>

          {/* Info Right */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">{current.roastLevel}</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-stone-100 mt-1">
                {current.title}
              </h3>
              <p className="text-xs text-stone-400 mt-1">Process: <strong className="text-stone-200 font-semibold">{current.process}</strong></p>
            </div>

            {/* Flavor Notes Grid */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">Tasting Notes & Aromatics:</span>
              <div className="grid grid-cols-2 gap-2">
                {current.notes.map((note) => (
                  <div key={note} className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-semibold text-amber-300 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-500" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Fresh Pour-Over</span>
                <span className="text-2xl font-extrabold text-amber-400 font-heading">${current.price.toFixed(2)}</span>
              </div>

              <button
                onClick={handleOrderCustomRoast}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
              >
                Add This Reserve to Order
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
