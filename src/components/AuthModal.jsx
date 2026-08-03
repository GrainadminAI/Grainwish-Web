import React, { useState } from 'react';
import { X, LogIn, UserPlus, Mail, Lock, Sparkles, CheckCircle2, ShieldCheck, Chrome, UserCheck, AlertCircle } from 'lucide-react';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, signInAsGuestFarmer } from '../lib/supabase';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    if (isSignUp) {
      const res = await signUpWithEmail(email, password);
      setLoading(false);
      if (res.success) {
        if (res.autoSignedIn) {
          setSuccessMessage('Account created and logged in!');
          if (onAuthSuccess) onAuthSuccess(res.data.user);
          setTimeout(() => onClose(), 1200);
        } else {
          setSuccessMessage('Registration submitted! If Email Confirmation is enabled in your Supabase Dashboard, please check your inbox. Or try instant Guest Farmer Sign In below.');
          setTimeout(() => setIsSignUp(false), 3000);
        }
      } else {
        setErrorMessage(res.error || 'Failed to create account.');
      }
    } else {
      const res = await signInWithEmail(email, password);
      setLoading(false);
      if (res.success) {
        setSuccessMessage('Logged in successfully!');
        if (onAuthSuccess) onAuthSuccess(res.data.user);
        setTimeout(() => onClose(), 1200);
      } else {
        if (res.error?.toLowerCase().includes('confirm') || res.error?.toLowerCase().includes('not confirmed')) {
          setErrorMessage('Email not confirmed in Supabase yet. Please check your email inbox, or click "Quick Guest Login" below to sign in immediately.');
        } else {
          setErrorMessage(res.error || 'Invalid email or password.');
        }
      }
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    const res = await signInAsGuestFarmer();
    setLoading(false);
    if (res.success) {
      setSuccessMessage('Signed in as Guest Farmer!');
      if (onAuthSuccess) onAuthSuccess(res.user);
      setTimeout(() => onClose(), 1000);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage('');
    setLoading(true);
    const res = await signInWithGoogle();
    setLoading(false);
    if (res.success) {
      setSuccessMessage('Signed in with Google OAuth!');
      if (res.user && onAuthSuccess) onAuthSuccess(res.user);
      setTimeout(() => onClose(), 1000);
    } else {
      setErrorMessage(res.error || 'Failed to authenticate with Google.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#06331f] via-[#042114] to-[#02140c] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-slate-300 hover:text-white border border-emerald-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
            {isSignUp ? <UserPlus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
          </div>

          <h3 className="font-display text-2xl font-extrabold text-white">
            {isSignUp ? 'Create Farmer Account' : 'Sign In to GrainWise AI'}
          </h3>

          <p className="text-xs text-slate-300">
            Access personalized AI diagnostics, field logs & Mandi price alerts on <strong className="text-amber-300">Grainwish.com</strong>
          </p>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3 bg-red-950/80 border border-red-800/60 rounded-xl text-xs text-red-300">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Quick Auth Options: Google OAuth & Instant Guest Login */}
        <div className="space-y-2">
          <button
            onClick={handleGoogleAuth}
            className="w-full p-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-md flex items-center justify-center gap-2.5 transition-colors border border-slate-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            Continue with Google OAuth
          </button>

          <button
            onClick={handleGuestLogin}
            className="w-full p-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <UserCheck className="w-4 h-4 text-amber-400" /> Instant Demo / Guest Farmer Sign In
          </button>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 my-2">
          <div className="h-px bg-emerald-900/60 flex-1" />
          <span>or email authentication</span>
          <div className="h-px bg-emerald-900/60 flex-1" />
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="farmer@domain.com"
                className="w-full bg-emerald-950/80 border border-emerald-700/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-emerald-950/80 border border-emerald-700/50 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 text-black font-extrabold text-xs shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* Toggle Sign Up / Sign In */}
        <div className="text-center text-xs text-slate-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage('');
              setSuccessMessage('');
            }}
            className="text-amber-400 font-bold underline hover:text-amber-300"
          >
            {isSignUp ? 'Sign In' : 'Create One'}
          </button>
        </div>

        <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-emerald-900/60 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secured by Supabase Auth · Grainwish.com</span>
        </div>

      </div>
    </div>
  );
}
