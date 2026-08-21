import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CulinaryExperience from './components/CulinaryExperience';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ReservationSection from './components/ReservationSection';
import TestimonialsSection from './components/TestimonialsSection';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('aura_theme');
    return saved ? JSON.parse(saved) : true;
  });

  // Cart State
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Active User State
  const [activeUser, setActiveUser] = useState(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('aura_theme', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item, quantity = 1, notes = '') => {
    setCartItems(prevCart => {
      const existingIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.notes === notes
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...item, quantity, notes }];
      }
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prevCart =>
      prevCart.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-stone-950 text-stone-100">
      
      {/* Top Glass Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={totalCartCount}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        activeUser={activeUser}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <MenuSection onAddToCart={handleAddToCart} />
        <CulinaryExperience onAddToCart={handleAddToCart} />
        <AboutSection />
        <GallerySection />
        <ReservationSection />
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Login / Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        activeUser={activeUser}
        onLoginSuccess={(user) => setActiveUser(user)}
        onLogout={() => {
          setActiveUser(null);
          localStorage.removeItem('aura_user');
        }}
      />

    </div>
  );
}
