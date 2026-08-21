import React, { useState } from 'react';
import {
  Coffee,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Share2,
  Globe,
  MessageCircle
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800 text-left">

          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <a href="#hero" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white font-bold">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-stone-100 font-heading">
                AURA <span className="text-amber-500">ROAST</span>
              </span>
            </a>
            <p className="text-xs text-stone-400 leading-relaxed">
              Crafting micro-lot coffees, artisan sourdoughs, and memorable bistro experiences. Dedicated to organic quality and warm community vibes.
            </p>
            <div className="flex items-center gap-3 text-stone-400">
              <a href="#" className="p-2 rounded-xl bg-stone-900 hover:bg-amber-600 hover:text-white transition-colors" title="Social Hub">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-stone-900 hover:bg-amber-600 hover:text-white transition-colors" title="Website">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-stone-900 hover:bg-amber-600 hover:text-white transition-colors" title="Community Chat">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider font-heading">Navigation</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">Home & Specials</a></li>
              <li><a href="#menu" className="hover:text-amber-400 transition-colors">Full Food & Coffee Menu</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">About Our Roastery</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Ambiance Gallery</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Customer Reviews</a></li>
              <li><a href="#reservation" className="hover:text-amber-400 transition-colors">Book a Table</a></li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider font-heading">Opening Hours</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-semibold text-amber-300">07:00 AM - 09:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="font-semibold text-amber-300">08:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="font-semibold text-amber-300">08:00 AM - 08:00 PM</span>
              </li>
              <li className="flex justify-between border-t border-stone-800 pt-2 text-[11px] text-stone-500">
                <span>Kitchen Closes 30 mins before closing</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider font-heading">Join The Coffee Club</h4>
            <p className="text-xs text-stone-400">
              Subscribe for weekly micro-batch release alerts, coffee brewing tips & secret promo discounts!
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Check your inbox for 10% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>452 Artisan Roasters Ave, Suite 100</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+1 (555) 892-3411</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Aura Roast & Artisan Cafe. All rights reserved.</p>
          <p>
            Designed & Developed for <strong className="text-stone-300 font-semibold">Sqrock IT Solutions Internship (Task 2)</strong>
          </p>
        </div>

      </div>
    </footer>
  );
}
