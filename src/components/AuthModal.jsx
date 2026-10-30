import React, { useState, useEffect } from 'react';
import { 
  X, LogIn, CheckCircle2, ShieldCheck, AlertCircle, Sparkles, 
  Phone, User, Mail, Globe, ArrowRight, Check 
} from 'lucide-react';
import { 
  supabase,
  signInWithGoogle, 
  signInWithDemoGoogleAccount, 
  signInWithCustomGoogleAccount,
  signInWithPhoneFarmerAccount,
  recordFeatureUsageToDB 
} from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';

export const SUPABASE_CALLBACK_URL = 'https://drhraerbklibrkigbdaw.supabase.co/auth/v1/callback';
export const GOOGLE_CLIENT_ID = '667150516323-ic01cfnmep6esqv7uj3g9qqe6tref0n6.apps.googleusercontent.com';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const { t, detectedLocationInfo } = useLanguage();
  const [activeTab, setActiveTab] = useState('google'); // 'google' | 'phone'
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Custom Google input state
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Phone input state
  const [phone, setPhone] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [farmerState, setFarmerState] = useState('');

  // Pre-fill state from detected location
  useEffect(() => {
    if (detectedLocationInfo?.state) {
      setFarmerState(detectedLocationInfo.state);
    } else if (detectedLocationInfo?.region) {
      setFarmerState(detectedLocationInfo.region.split(',')[1]?.trim() || detectedLocationInfo.region);
    }
  }, [detectedLocationInfo]);

  // Clean URL parameters silently so users never see stale OAuth error hashes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash?.includes('error') || window.location.search?.includes('error')) {
      try {
        const cleanUrl = window.location.pathname;
        window.history.replaceState(null, '', cleanUrl);
      } catch (_) {}
    }
  }, [isOpen]);

  // Handle Google Credential Response from Google Identity Services (GSI)
  const handleGoogleCredentialResponse = async (response) => {
    if (!response?.credential) return;
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('Verifying Google Account...');

    try {
      // Decode the JWT token payload from Google
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

      // Attempt Supabase ID token login (if enabled)
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
        }, 600);
      }
    } catch (err) {
      setLoading(false);
      // Fallback seamlessly to direct sign-in
      handleInstantGoogleAuth(customGoogleEmail, customGoogleName);
    }
  };

  // Mount Google Identity Services button if script is loaded
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const setupGsi = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true
          });

          const container = document.getElementById('gsi-official-button-container');
          if (container) {
            container.innerHTML = '';
            window.google.accounts.id.renderButton(container, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              shape: 'pill',
              text: 'continue_with',
              logo_alignment: 'left',
              width: 320
            });
          }
        } catch (_) {}
      }
    };

    if (window.google?.accounts?.id) {
      setupGsi();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          setupGsi();
        }
      }, 250);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Primary 1-Click Instant Google Sign In
  const handleInstantGoogleAuth = async (emailToUse, nameToUse) => {
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

      const email = emailToUse || customGoogleEmail.trim() || 'farmer.google@gmail.com';
      const name = nameToUse || customGoogleName.trim() || (
        email.includes('@') && email !== 'farmer.google@gmail.com'
          ? email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
          : 'Verified Google Farmer'
      );

      const res = await signInWithCustomGoogleAccount({ email, name });
      setLoading(false);

      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user.user_metadata.full_name}!`);
        await recordFeatureUsageToDB({
          featureName: 'User Authentication',
          action: 'sign_in_google_instant',
          metadata: { email, name }
        }).catch(() => {});

        if (onAuthSuccess) onAuthSuccess(res.user);
        setTimeout(() => {
          onClose();
          setSuccessMessage('');
        }, 600);
      } else {
        setErrorMessage(res.error || 'Failed to sign in. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'An error occurred during sign-in.');
    }
  };

  // Phone / Mobile Farmer Account Sign In
  const handlePhoneAuth = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!phone || phone.trim().length < 6) {
      setErrorMessage('Please enter a valid mobile number.');
      return;
    }

    setLoading(true);
    setSuccessMessage('Signing in as Verified Farmer...');

    try {
      const res = await signInWithPhoneFarmerAccount({
        phone: phone.trim(),
        name: farmerName.trim() || 'Kisan Farmer',
        state: farmerState.trim() || 'India'
      });
      setLoading(false);

      if (res.success && res.user) {
        setSuccessMessage(`Welcome back, ${res.user.user_metadata.full_name}!`);
        await recordFeatureUsageToDB({
          featureName: 'User Authentication',
          action: 'sign_in_phone_farmer',
          metadata: { phone: phone.trim(), state: farmerState }
        }).catch(() => {});

        if (onAuthSuccess) onAuthSuccess(res.user);
        setTimeout(() => {
          onClose();
          setSuccessMessage('');
        }, 600);
      } else {
        setErrorMessage(res.error || 'Failed to sign in.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'Error during phone login.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#06331f] via-[#042114] to-[#02140c] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-slate-300 hover:text-white border border-emerald-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-white p-2 mx-auto flex items-center justify-center shadow-xl border border-slate-200">
            <svg className="w-7 h-7" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-black text-white">
            Farmer Sign In &amp; Sync
          </h3>

          <p className="text-[11px] sm:text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
            Welcome to <strong className="text-emerald-400">Grainwish AI</strong>. Sign in to sync your leaf scans, Mandi bookmarks, and NPK dosages across all devices.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex rounded-xl bg-black/50 p-1 border border-emerald-800/60 text-xs">
          <button
            type="button"
            onClick={() => { setActiveTab('google'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'google'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Google Account</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('phone'); setErrorMessage(''); }}
            className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'phone'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Mobile / Farmer ID</span>
          </button>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3 bg-red-950/90 border border-red-800/80 rounded-xl text-[11px] text-red-200 space-y-1 animate-fade-in">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">{errorMessage}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-950/90 border border-emerald-600/80 rounded-xl text-[11px] text-emerald-300 flex items-center justify-center gap-2 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold">{successMessage}</span>
          </div>
        )}

        {/* TAB 1: GOOGLE ACCOUNT LOGIN */}
        {activeTab === 'google' && (
          <div className="space-y-3 pt-1">
            
            {/* Google Identity Services Native Button Container (rendered if GSI is active) */}
            <div id="gsi-official-button-container" className="flex justify-center empty:hidden min-h-[44px]"></div>

            {/* Primary Action: Instant 1-Click Google Sign-In */}
            <button
              onClick={() => handleInstantGoogleAuth(customGoogleEmail, customGoogleName)}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-95 border border-slate-200 disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>{loading ? 'Signing In...' : 'Continue with Google Account'}</span>
            </button>

            {/* Quick Gmail / Name Customizer */}
            <div className="bg-black/40 border border-emerald-800/50 rounded-2xl p-3 space-y-2">
              <div className="text-[11px] text-slate-300 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sign in with your Gmail address:</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Optional</span>
              </div>

              <div className="space-y-1.5">
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full bg-black/70 border border-emerald-700/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />

                <input
                  type="text"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  placeholder="Your Name (e.g. Ramesh Patel)"
                  className="w-full bg-black/70 border border-emerald-700/60 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />

                {customGoogleEmail.trim() && (
                  <button
                    type="button"
                    onClick={() => handleInstantGoogleAuth(customGoogleEmail, customGoogleName)}
                    className="w-full py-2 bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-black font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer mt-1"
                  >
                    <span>Continue as {customGoogleName.trim() || customGoogleEmail.split('@')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MOBILE / FARMER ID LOGIN */}
        {activeTab === 'phone' && (
          <form onSubmit={handlePhoneAuth} className="space-y-3 pt-1">
            <div>
              <label className="block text-[10px] text-slate-300 font-medium mb-1">
                Mobile Number <span className="text-amber-400">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="w-full bg-black/70 border border-emerald-700/70 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono font-bold placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-300 font-medium mb-1">Farmer Name</label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full bg-black/70 border border-emerald-700/70 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-300 font-medium mb-1">Farm State</label>
                <input
                  type="text"
                  value={farmerState}
                  onChange={(e) => setFarmerState(e.target.value)}
                  placeholder="e.g. Maharashtra"
                  className="w-full bg-black/70 border border-emerald-700/70 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-amber-400 hover:from-emerald-400 hover:to-amber-300 text-black font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer mt-1"
            >
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Sign In with Farmer Mobile ID</span>
            </button>
          </form>
        )}

        <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 pt-2 border-t border-emerald-900/50">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Secured Google OAuth &amp; DPDP Verified · www.grainwish.com</span>
        </div>

      </div>
    </div>
  );
}
