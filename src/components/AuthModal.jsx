import React, { useState } from 'react';
import { X, User, Mail, Lock, Coffee, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, activeUser, onLogout }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const userObj = {
      name: isRegister ? (name || 'Coffee Enthusiast') : (email.split('@')[0] || 'Coffee Guest'),
      email,
      memberTier: 'Gold Roaster Club'
    };

    localStorage.setItem('aura_user', JSON.stringify(userObj));
    onLoginSuccess(userObj);

    setSuccessMsg(isRegister ? 'Account created successfully!' : 'Welcome back!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-md rounded-3xl p-6 sm:p-8 bg-stone-900 text-stone-100 shadow-2xl border border-amber-500/20 relative space-y-5 text-left">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {activeUser ? (
          // Logged In View
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center mx-auto text-xl font-bold font-heading shadow-lg shadow-amber-600/30">
              {activeUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{activeUser.memberTier}</span>
              <h3 className="text-xl font-extrabold font-heading text-stone-100 mt-1">{activeUser.name}</h3>
              <p className="text-xs text-stone-400">{activeUser.email}</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 text-left text-xs space-y-2 border border-stone-800">
              <div className="flex justify-between">
                <span className="text-stone-400">Reward Points:</span>
                <span className="font-bold text-amber-300">480 Bean Points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Exclusive Perk:</span>
                <span className="font-semibold text-stone-200">10% Off Specialty Roasts</span>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-stone-800 hover:bg-rose-900/50 text-rose-300 font-bold text-xs transition-colors"
            >
              Sign Out of Account
            </button>
          </div>
        ) : (
          // Login / Register Form
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading">
                  {isRegister ? 'Join Aura Coffee Club' : 'Sign In to Your Account'}
                </h3>
                <p className="text-xs text-stone-400">
                  {isRegister ? 'Unlock 10% off your first coffee & rewards' : 'Access order history & saved table bookings'}
                </p>
              </div>
            </div>

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {isRegister && (
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs shadow-xl shadow-amber-600/30 mt-2"
              >
                {isRegister ? 'Create Account & Join' : 'Sign In Now'}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-stone-400 border-t border-stone-800">
              {isRegister ? 'Already have an account?' : "Don't have an account yet?"}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-amber-400 font-bold hover:underline ml-1"
              >
                {isRegister ? 'Sign In' : 'Create One Free'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
