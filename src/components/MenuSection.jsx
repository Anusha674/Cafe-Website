import React, { useState, useMemo } from 'react';
import { 
  menuCategories, 
  menuItems 
} from '../data/menuData';
import { 
  Search, 
  Plus, 
  Check, 
  Star, 
  Clock, 
  Eye, 
  X, 
  Coffee, 
  Sandwich, 
  Cake, 
  GlassWater, 
  Sparkles, 
  Utensils,
  Filter
} from 'lucide-react';

const iconMap = {
  Utensils,
  Coffee,
  Sandwich,
  Cake,
  GlassWater,
  Sparkles
};

export default function MenuSection({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState('all');
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [modalQty, setModalQty] = useState(1);
  const [modalNotes, setModalNotes] = useState('');
  const [addedItemIds, setAddedItemIds] = useState([]);

  // Filtered menu items calculation
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category Filter
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      // Search Query Filter
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Dietary Filter
      const matchDietary = selectedDietary === 'all' || 
                           (item.dietary && item.dietary.includes(selectedDietary));

      return matchCategory && matchSearch && matchDietary;
    });
  }, [selectedCategory, searchQuery, selectedDietary]);

  const handleQuickAdd = (item, e) => {
    e.stopPropagation();
    onAddToCart(item, 1, '');
    
    // Trigger checkmark animation
    setAddedItemIds(prev => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds(prev => prev.filter(id => id !== item.id));
    }, 1200);
  };

  const handleModalAdd = () => {
    if (quickViewItem) {
      onAddToCart(quickViewItem, modalQty, modalNotes);
      setQuickViewItem(null);
      setModalQty(1);
      setModalNotes('');
    }
  };

  return (
    <section id="menu" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            <span>Artisan Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-heading">
            Taste Our Handcrafted Creations
          </h2>
          <p className="text-base text-stone-600 dark:text-stone-300 font-normal">
            From single-origin pour-overs to fresh organic sourdoughs & gourmet desserts. Freshly prepared to order.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-6 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
            {menuCategories.map((cat) => {
              const IconComp = iconMap[cat.icon] || Utensils;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-105'
                      : 'glass-card text-stone-700 dark:text-stone-300 hover:bg-amber-100/50 dark:hover:bg-stone-800'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Dietary Dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            
            {/* Search Box */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search coffee, avocado toast, tiramisu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl glass-card text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-amber-900/10 dark:border-amber-500/20"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Tags Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <select
                value={selectedDietary}
                onChange={(e) => setSelectedDietary(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl glass-card text-sm font-semibold text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer border border-amber-900/10 dark:border-amber-500/20"
              >
                <option value="all">All Dietary Preferences</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Chef Special">Chef Specials</option>
              </select>
            </div>

          </div>

        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl space-y-3">
            <Coffee className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-stone-800 dark:text-stone-200">No items match your search</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedDietary('all');
              }}
              className="mt-2 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const isAdded = addedItemIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="group glass-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-amber-900/10 dark:border-amber-500/15 transform hover:-translate-y-1.5"
                >
                  {/* Image Container */}
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                    
                    {/* Top Right Badges */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {item.isSpecial && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                          Special
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{item.rating}</span>
                      </span>
                    </div>

                    {/* Top Left Prep Time */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-stone-900/70 backdrop-blur-md text-stone-200 text-[11px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{item.prepTime}</span>
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={() => {
                        setQuickViewItem(item);
                        setModalQty(1);
                        setModalNotes('');
                      }}
                      className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-stone-100 hover:bg-amber-500 hover:text-white transition-all shadow-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 font-heading leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      
                      <p className="text-xs text-stone-600 dark:text-stone-300 font-normal line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Dietary Tags */}
                      {item.dietary && item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.dietary.map((tag) => (
                            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Row: Price & Add to Cart */}
                    <div className="pt-3 border-t border-stone-200/60 dark:border-stone-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-stone-400 uppercase font-semibold block">Price</span>
                        <span className="text-xl font-extrabold text-amber-700 dark:text-amber-400 font-heading">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition-all ${
                          isAdded 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-amber-600/20 hover:shadow-lg'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Quick View Item Detail Modal */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in">
          <div className="glass-card w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20 bg-stone-900 text-stone-100">
            
            {/* Modal Image Header */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={quickViewItem.image} 
                alt={quickViewItem.name} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={() => setQuickViewItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 text-white hover:bg-amber-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                  ${quickViewItem.price.toFixed(2)}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-900/80 text-amber-300 text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {quickViewItem.rating} ({quickViewItem.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-left">
              <div>
                <h3 className="text-2xl font-bold font-heading text-amber-100">{quickViewItem.name}</h3>
                <p className="text-sm text-stone-300 mt-1">{quickViewItem.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-stone-950/60 p-3 rounded-2xl">
                <div>
                  <span className="text-stone-400 block">Est. Prep Time:</span>
                  <span className="font-semibold text-amber-300">{quickViewItem.prepTime}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Caloric Info:</span>
                  <span className="font-semibold text-amber-300">{quickViewItem.calories}</span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-stone-300">Quantity:</span>
                <div className="flex items-center gap-3 bg-stone-800 p-1.5 rounded-xl border border-stone-700">
                  <button
                    onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-700 text-white font-bold hover:bg-amber-600 transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{modalQty}</span>
                  <button
                    onClick={() => setModalQty(modalQty + 1)}
                    className="w-8 h-8 rounded-lg bg-stone-700 text-white font-bold hover:bg-amber-600 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Special Instructions Notes */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Special Instructions (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g., Oat milk, extra shot, no sugar..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleModalAdd}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 mt-4"
              >
                <Plus className="w-5 h-5" />
                <span>Add to Cart — ${(quickViewItem.price * modalQty).toFixed(2)}</span>
              </button>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
