import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Star, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Award, 
  ShieldCheck,
  ChefHat,
  Leaf
} from 'lucide-react';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-stone-950 text-white">
      
      {/* Background Motion Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-75 animate-slow-zoom"
          poster="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-hands-plating-a-gourmet-dish-41236-large.mp4" 
            type="video/mp4" 
          />
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-kitchen-41235-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Multi-layer Dark Ambient Gold Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Hero CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Luxury Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide shadow-xl animate-pulse-subtle">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="uppercase tracking-widest text-[11px] font-bold">100% Pure Eggless & Vegetarian Cafe & Bistro</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif-luxury tracking-tight leading-[1.08] text-stone-100">
              Crispy Delights. <br />
              <span className="gold-gradient-text italic font-serif-luxury">
                Culinary Elegance & Bistro.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Savor hand-cut golden crispy french fries served with house ketchup & garlic mayonnaise, artisan salads, truffle sourdoughs, French eggless pastries, and craft drinks.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-black text-sm uppercase tracking-wider shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 border border-amber-300/40"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#reservation"
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl glass-card text-stone-100 hover:text-amber-300 font-bold text-sm uppercase tracking-wider transition-all border border-amber-500/30 flex items-center justify-center gap-2 hover:border-amber-400 shadow-xl"
              >
                <span>Reserve VIP Table</span>
              </a>
            </div>

            {/* Video Controls Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-stone-400">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-amber-300 border border-stone-800 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause Motion' : 'Play Motion'}</span>
              </button>

              <button
                onClick={toggleMute}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-amber-300 border border-stone-800 transition-colors"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
              </button>

              <span className="hidden sm:inline text-stone-500">• 4K Cinematic Kitchen Motion</span>
            </div>

            {/* Trust Stats Bar */}
            <div className="pt-8 border-t border-amber-500/20 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="flex items-center gap-1 text-amber-400 font-extrabold text-2xl font-heading">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>4.98</span>
                </div>
                <p className="text-xs text-stone-400 font-medium">1,800+ Guest Reviews</p>
              </div>

              <div>
                <div className="font-extrabold text-2xl text-emerald-400 font-heading">
                  100%
                </div>
                <p className="text-xs text-stone-400 font-medium">Eggless & Pure Veg</p>
              </div>

              <div>
                <div className="font-extrabold text-2xl text-stone-100 font-heading">
                  Fresh
                </div>
                <p className="text-xs text-stone-400 font-medium">Golden Fries & Sauces</p>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Image of French Fries with Ketchup and Mayonnaise */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Central Glowing Hero Glass Box displaying French Fries with Ketchup & Mayo */}
              <div className="relative z-10 rounded-3xl overflow-hidden glass-card border border-amber-500/30 p-3 shadow-2xl gold-border-glow">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img 
                    src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=900" 
                    alt="Crispy French Fries with Ketchup & Mayonnaise" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Badge Label */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-amber-500 text-stone-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                    <span>Customer Favorite</span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-5 left-5 right-5 text-left text-white space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Crispy Signature</span>
                    <h3 className="text-2xl font-serif-luxury font-bold">French Fries with Ketchup & Mayo</h3>
                    <p className="text-xs text-stone-300 line-clamp-2">Hand-cut golden crispy fries seasoned with truffle herbs, served with tomato ketchup & garlic herb mayonnaise dips.</p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-amber-400 font-heading">$7.50</span>
                      <a href="#menu" className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold hover:bg-amber-400 transition-colors">
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Glass Badge 1 */}
              <div className="absolute -top-6 -right-6 z-20 glass-card p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-500/40 animate-float">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 flex items-center justify-center font-black shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-stone-100">Best Crispy Fries 2025</div>
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Served Hot & Fresh</div>
                </div>
              </div>

              {/* Floating Glass Badge 2 */}
              <div className="absolute -bottom-6 -left-6 z-20 glass-card p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-500/40 animate-float [animation-delay:2s]">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-extrabold text-stone-100">100% Eggless Mayo</div>
                  <div className="text-[10px] text-emerald-400 font-bold">Garlic Herb House Sauce</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
