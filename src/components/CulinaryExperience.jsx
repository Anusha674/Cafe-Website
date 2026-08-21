import React, { useState } from 'react';
import { Utensils, Sparkles, Award, ChefHat, Check, Heart, Leaf } from 'lucide-react';

export default function CulinaryExperience({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('specials');

  const highlights = {
    specials: {
      title: 'Aura Signature Pure Veg Grand Platter',
      category: '100% Eggless & Vegetarian Platter',
      chefNotes: 'Hand-curated morning feast featuring grilled Cyprus halloumi, wild mushroom ragu, smashed avocado, vine tomatoes & sourdough.',
      prepStyle: 'Slow-Cooked & Plated Fresh',
      badge: '100% Eggless & Veg',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
      price: 18.50,
      tags: ['100% Eggless', 'Vegetarian', 'Organic']
    },
    entrees: {
      title: 'Truffle Avocado & Heirloom Tomato Sourdough',
      category: 'Gourmet Eggless Toast',
      chefNotes: 'Smashed Hass avocado on toasted country sourdough with sliced heirloom tomatoes, roasted seeds & white truffle glaze.',
      prepStyle: 'Freshly Assembled',
      badge: '100% Vegan & Veg',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800',
      price: 12.50,
      tags: ['100% Eggless', 'Avocado', 'Truffle Glaze']
    },
    desserts: {
      title: 'Valrhona Triple Chocolate Eggless Lava Cake',
      category: 'Eggless French Bakery Dessert',
      chefNotes: 'Warm French dark chocolate eggless molten cake, served alongside Madagascar vanilla gelato.',
      prepStyle: 'Freshly Baked (8 mins)',
      badge: 'Eggless Patisserie',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
      price: 8.90,
      tags: ['100% Eggless', 'Valrhona Chocolate', 'Gelato']
    },
    beverages: {
      title: 'Passionfruit Elderflower Spritz',
      category: 'Craft Refreshment',
      chefNotes: 'Fresh yellow passionfruit pulp shaken over ice with elderflower botanical elixir & sparkling mineral water.',
      prepStyle: 'Muddled & Shaken Ice Cold',
      badge: 'Vegan & Refreshing',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
      price: 6.50,
      tags: ['100% Eggless', 'Fresh Passionfruit', 'Elderflower']
    }
  };

  const current = highlights[activeCategory];

  const handleOrderHighlight = () => {
    onAddToCart({
      id: 'highlight-' + activeCategory,
      name: current.title,
      price: current.price,
      image: current.image,
      description: current.chefNotes
    }, 1, 'Eggless Special Order');
  };

  return (
    <section className="py-20 bg-stone-950 text-stone-100 relative overflow-hidden border-t border-b border-amber-500/20">

      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-card border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>100% Eggless & Pure Vegetarian Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-luxury text-stone-50">
            Crafted for Pure Eggless Delights
          </h2>
          <p className="text-base text-stone-400">
            Every creation on our menu is 100% Eggless & Vegetarian — prepared with organic farm produce, artisanal sourdough, and eggless French pastry techniques.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {[
            { id: 'specials', label: 'Eggless Specials', icon: Sparkles },
            { id: 'entrees', label: 'Gourmet Entrees', icon: Utensils },
            { id: 'desserts', label: 'Eggless Desserts', icon: Award },
            { id: 'beverages', label: 'Craft Drinks', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`p-4 rounded-2xl border text-xs font-extrabold transition-all flex flex-col items-center gap-2 ${isActive
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

        {/* Selected Culinary Feature Card */}
        <div className="max-w-5xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">

          {/* Image Left */}
          <div className="lg:col-span-5 relative h-72 lg:h-96 rounded-2xl overflow-hidden shadow-xl border border-amber-500/20">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs shadow-md flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-stone-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Preparation Style</span>
              <p className="text-xs font-semibold">{current.prepStyle}</p>
            </div>
          </div>

          {/* Info Right */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">{current.category}</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-stone-100 mt-1">
                {current.title}
              </h3>
              <p className="text-sm text-stone-300 mt-2 leading-relaxed">{current.chefNotes}</p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">Culinary Highlights:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {current.tags.map((tag) => (
                  <div key={tag} className="px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-semibold text-amber-300 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Chef Price</span>
                <span className="text-2xl font-extrabold text-amber-400 font-heading">${current.price.toFixed(2)}</span>
              </div>

              <button
                onClick={handleOrderHighlight}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
              >
                Add This Creation to Order
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
