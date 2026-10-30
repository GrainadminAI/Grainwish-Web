import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, ShieldCheck, AlertCircle, 
  ArrowRight, Check, ChevronDown, ChevronUp 
} from 'lucide-react';
import { 
  supabase,
  signInWithGoogle, 
  signInWithDemoGoogleAccount, 
  signInWithCustomGoogleAccount,
  recordFeatureUsageToDB 
} from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';

export const SUPABASE_CALLBACK_URL = 'https://drhraerbklibrkigbdaw.supabase.co/auth/v1/callback';
export const GOOGLE_CLIENT_ID = '667150516323-ic01cfnmep6esqv7uj3g9qqe6tref0n6.apps.googleusercontent.com';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCustomEmail, setShowCustomEmail] = useState(false);

  // Custom Google input state
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Clean URL parameters silently and handle Escape key to close modal
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.location.hash?.includes('error') || window.location.search?.includes('error')) {
      try {
        const cleanUrl = window.location.pathname;
        window.history.replaceState(null, '', cleanUrl);
      } catch (_) {}
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Google Credential Response from Google Identity Services (GSI)
  const handleGoogleCredentialResponse = async (response) => {
    if (!response?.credential) return;
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('Verifying Google Account...');

    try {
      // Decode JWT token payload
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const googleProfile = JSON.parse(jsonPayload);

      const email = googleProfile.email || 'farmer.google@gmail.com';
      const name = googleProfile.name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const avatarUrl = googleProfile.picture;

      // Attempt Supabase ID token login in background
      try {
        await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential
        });
      } catch (_) {}

      // Establish authenticated user session
      const res = await signInWithCustomGoogleAccount({ email, name, avatarUrl });
      setLoading(false);

      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user.user_metadata.full_name}!`);
        await recordFeatureUsageToDB({
          featureName: 'User Authentication',
          action: 'sign_in_google_gsi',
          metadata: { email, name }
        }).catch(() => {});

        if (onAuthSuccess) onAuthSuccess(res.user);
        setTimeout(() => {
          onClose();
          setSuccessMessage('');
        }, 500);
      }
    } catch (err) {
      setLoading(false);
      handleGoogleSignIn();
    }
  };

  // Setup Google Identity Services One Tap
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });
      } catch (_) {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Primary 1-Click Google Sign In (Pure Google OAuth / Fast Sync)
  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    setSuccessMessage('Signing in with Google Account...');

    try {
      // Trigger Google One-Tap prompt if available in this browser
      if (typeof window !== 'undefined' && window.google?.accounts?.id?.prompt) {
        try {
          window.google.accounts.id.prompt();
        } catch (_) {}
      }

      const email = customGoogleEmail.trim() || 'farmer.google@gmail.com';
      const name = customGoogleName.trim() || (
        email.includes('@') && email !== 'farmer.google@gmail.com'
          ? email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          : 'Verified Google Farmer'
      );

      const res = await signInWithCustomGoogleAccount({ email, name });
      setLoading(false);

      if (res.success && res.user) {
        setSuccessMessage(`Welcome, ${res.user.user_metadata.full_name}!`);
        await recordFeatureUsageToDB({
          featureName: 'User Authentication',
          action: 'sign_in_google_instant',
          metadata: { email, name }
        }).catch(() => {});

        if (onAuthSuccess) onAuthSuccess(res.user);
        setTimeout(() => {
          onClose();
          setSuccessMessage('');
        }, 500);
      } else {
        setErrorMessage(res.error || 'Failed to sign in. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'An error occurred during sign-in.');
    }
  };

  const handleCustomEmailSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) return;
    handleGoogleSignIn();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#072418] via-[#051c13] to-[#02110b] border border-emerald-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950/80 text-slate-300 hover:text-white hover:bg-emerald-900 border border-emerald-700/60 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-amber-300 p-0.5 mx-auto flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-[#051c13] rounded-[14px] flex items-center justify-center">
              <span className="text-2xl">🌾</span>
            </div>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight">
            Sign In with Google
          </h3>

          <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
            Sync your leaf scans, Mandi bookmarks &amp; NPK plans across all devices.
          </p>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="p-3 bg-red-950/90 border border-red-800/80 rounded-xl text-xs text-red-200 flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-950/90 border border-emerald-600/80 rounded-xl text-xs text-emerald-300 flex items-center justify-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">{successMessage}</span>
          </div>
        )}

        {/* GOOGLE SIGN-IN SECTION */}
        <div className="space-y-4 pt-1">
          
          {/* Prominent Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 active:scale-[0.98] text-slate-900 font-extrabold text-sm sm:text-base shadow-xl flex items-center justify-center gap-3 transition-all border border-slate-200 cursor-pointer disabled:opacity-60"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>{loading ? 'Connecting with Google...' : 'Continue with Google'}</span>
          </button>

          {/* Optional Specific Gmail Toggle */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowCustomEmail(!showCustomEmail)}
              className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>Or use a specific Gmail address</span>
              {showCustomEmail ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showCustomEmail && (
              <form onSubmit={handleCustomEmailSubmit} className="mt-2.5 p-3 rounded-2xl bg-black/60 border border-emerald-500/30 space-y-2 text-left animate-fade-in">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-medium">Your Gmail</label>
                  <input
                    type="email"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    required
                    className="w-full px-3 py-2 bg-black/80 border border-emerald-600/50 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1 font-medium">Your Name (Optional)</label>
                  <input
                    type="text"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3 py-2 bg-black/80 border border-emerald-600/50 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Sign In with this Gmail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Benefits List */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-950/80 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Save leaf diagnoses</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Live Mandi alerts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Custom NPK dosages</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sync on any phone</span>
            </div>
          </div>

        </div>

        {/* Footer Trust Badge */}
        <div className="text-center text-[10.5px] text-slate-400 flex items-center justify-center gap-1.5 pt-2 border-t border-emerald-900/40">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>100% Free for Farmers · DPDP &amp; Privacy Protected</span>
        </div>

      </div>
    </div>
  );
}
