import React, { useState, useEffect } from 'react';
import {
  Utensils,
  ShoppingBag,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
  User,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function Navbar({
  darkMode,
  setDarkMode,
  cartCount,
  onOpenCart,
  onOpenAuth,
  activeUser
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Menu', href: '#menu' },
    { name: 'About Us', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Reservation', href: '#reservation' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'glass-nav shadow-2xl py-3 border-b border-amber-500/20'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform duration-300 font-black">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xl tracking-tight font-serif-luxury text-stone-100">
                AURA <span className="gold-gradient-text">GRAND CAFE</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400/80 -mt-1">
                Artisan Bistro & Dining
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase font-extrabold tracking-wider text-stone-300 hover:text-amber-400 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full text-stone-300 hover:bg-stone-800 transition-colors"
              title={darkMode ? 'Switch Theme' : 'Switch Theme'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-amber-300" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full text-stone-300 hover:bg-stone-800 transition-colors"
              title="View Food Order"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth Button */}
            <button
              onClick={onOpenAuth}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border border-amber-500/30 text-amber-200 hover:bg-amber-500/10 transition-all"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>{activeUser ? activeUser.name.split(' ')[0] : 'Sign In'}</span>
            </button>

            {/* Book VIP Table Button */}
            <a
              href="#reservation"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-700 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Table</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-300 hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-amber-500/20 px-4 pt-3 pb-6 mt-2 shadow-2xl animate-fade-in text-left">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-stone-200 hover:text-amber-400 py-2 border-b border-stone-800"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="flex items-center gap-2 text-xs font-bold text-amber-400"
              >
                <User className="w-4 h-4" />
                <span>{activeUser ? activeUser.name : 'Sign In / Register'}</span>
              </button>
              <a
                href="#reservation"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold uppercase"
              >
                Reserve Table
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
