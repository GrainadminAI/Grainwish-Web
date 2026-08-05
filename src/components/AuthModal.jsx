import React, { useState } from 'react';
import { X, LogIn, CheckCircle2, ShieldCheck } from 'lucide-react';
import { signInWithGoogle, recordFeatureUsageToDB } from '../lib/supabase';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    const res = await signInWithGoogle();
    setLoading(false);
    if (res.success) {
      setSuccessMessage('Signed in with Google!');
      await recordFeatureUsageToDB({
        featureName: 'User Authentication',
        action: 'sign_in_google',
        metadata: { isFallback: Boolean(res.isFallback) }
      });
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
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-slate-300 hover:text-white border border-emerald-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-white p-2.5 mx-auto flex items-center justify-center shadow-xl border border-slate-200">
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
          </div>

          <h3 className="font-display text-2xl font-extrabold text-white pt-2">
            Sign In with Google
          </h3>

          <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
            Welcome to <strong className="text-emerald-400">GrainWise AI</strong>. Sign in using your Google account to access crop diagnostics & Mandi alerts on <strong className="text-amber-300">Grainwish.com</strong>.
          </p>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3 bg-red-950/80 border border-red-800/60 rounded-xl text-xs text-red-300 text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-emerald-300 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Single Exclusive Auth Method: Google OAuth */}
        <div className="pt-2">
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 border border-slate-200 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            {loading ? 'Connecting to Google...' : 'Continue with Google Account'}
          </button>
        </div>

        <div className="text-center text-[11px] text-slate-400 pt-3 border-t border-emerald-900/60 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secured Google OAuth · www.grainwish.com</span>
        </div>

      </div>
    </div>
  );
}
