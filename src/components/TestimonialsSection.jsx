import React, { useState } from 'react';
import { initialTestimonials } from '../data/testimonialsData';
import { Star, MessageSquareQuote, Plus, CheckCircle, User } from 'lucide-react';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Local Resident',
    rating: 5,
    comment: ''
  });
  const [submittedToast, setSubmittedToast] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const reviewObj = {
      id: 't-' + Date.now(),
      name: newReview.name,
      role: newReview.role || 'Guest',
      rating: Number(newReview.rating),
      comment: newReview.comment,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      date: 'Just now'
    };

    setTestimonials([reviewObj, ...testimonials]);
    setShowReviewModal(false);
    setNewReview({ name: '', role: 'Local Resident', rating: 5, comment: '' });
    
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  return (
    <section id="reviews" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Community Love</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-heading">
            What Coffee Lovers Say
          </h2>
          <p className="text-base text-stone-600 dark:text-stone-300 font-normal">
            Real stories from our daily guests, remote creators, and coffee connoisseurs.
          </p>

          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-colors mt-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Testimonial Toast Feedback */}
        {submittedToast && (
          <div className="max-w-md mx-auto mb-6 p-3 rounded-2xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>Thank you! Your review has been added live.</span>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between border border-amber-900/10 dark:border-amber-500/15 shadow-lg relative"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300 dark:text-stone-700'}`}
                  />
                ))}
              </div>

              {/* Quote Comment */}
              <p className="text-stone-700 dark:text-stone-300 text-sm font-normal italic leading-relaxed flex-1 text-left">
                "{t.comment}"
              </p>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-200/50 dark:border-stone-800/80">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/40"
                />
                <div className="text-left">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 font-heading">{t.name}</h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">{t.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-lg rounded-3xl p-6 bg-stone-900 text-stone-100 shadow-2xl border border-amber-500/20 space-y-4 text-left">
            <h3 className="text-xl font-bold font-heading text-stone-50">Write a Customer Review</h3>
            
            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samantha Wright"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Your Role / Occupation</label>
                <input
                  type="text"
                  placeholder="e.g. Designer, Espresso Lover, Student..."
                  value={newReview.role}
                  onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Rating (1 to 5 Stars)</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="5">5 Stars (Outstanding)</option>
                  <option value="4">4 Stars (Great Experience)</option>
                  <option value="3">3 Stars (Average)</option>
                  <option value="2">2 Stars (Could be better)</option>
                  <option value="1">1 Star (Poor)</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Review Comments *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Tell us about the coffee, pastry taste, or cafe ambiance..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 text-stone-300 font-bold hover:bg-stone-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
