import React, { useState, useEffect } from 'react';
import { X, LogIn, CheckCircle2, ShieldCheck, AlertCircle, Copy, Check, ChevronDown, ChevronUp, Sparkles, ExternalLink } from 'lucide-react';
import { signInWithGoogle, signInWithDemoGoogleAccount, recordFeatureUsageToDB } from '../lib/supabase';

const SUPABASE_CALLBACK_URL = 'https://drhraerbklibrkigbdaw.supabase.co/auth/v1/callback';
const GOOGLE_CLIENT_ID = '667150516323-ic01cfnmep6esqv7uj3g9qqe6tref0n6.apps.googleusercontent.com';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfigGuide, setShowConfigGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check URL on mount or open for returned OAuth errors
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    
    const err = params.get('error') || hashParams.get('error');
    const errDesc = params.get('error_description') || hashParams.get('error_description');

    if (err || errDesc) {
      if (err === 'redirect_uri_mismatch' || errDesc?.includes('redirect_uri_mismatch')) {
        setErrorMessage(
          'Google OAuth 400 (redirect_uri_mismatch): The Authorized Redirect URI is missing in Google Cloud Console. See setup checklist below.'
        );
        setShowConfigGuide(true);
      } else {
        setErrorMessage(errDesc || `Authentication error: ${err}`);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      setSuccessMessage('Connecting to Google OAuth...');
      const res = await signInWithGoogle();
      
      if (res.success) {
        setSuccessMessage('Redirecting to Google Sign-In...');
        await recordFeatureUsageToDB({
          featureName: 'User Authentication',
          action: 'sign_in_google_initiated',
          metadata: { isFallback: false }
        });
        // Browser is redirected by Supabase OAuth
      } else {
        setLoading(false);
        setErrorMessage(res.error || 'Failed to authenticate with Google.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'An unexpected error occurred during Google sign-in.');
    }
  };

  const handleDemoGoogleAuth = async () => {
    setErrorMessage('');
    setLoading(true);
    setSuccessMessage('Logging in as Verified Google Farmer...');
    
    const res = await signInWithDemoGoogleAccount();
    setLoading(false);

    if (res.success && res.user) {
      setSuccessMessage('Signed in as ' + res.user.user_metadata.full_name + '!');
      await recordFeatureUsageToDB({
        featureName: 'User Authentication',
        action: 'sign_in_demo_google',
        metadata: { isFallback: true }
      });
      if (onAuthSuccess) onAuthSuccess(res.user);
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 700);
    }
  };

  const copyCallbackUrl = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(SUPABASE_CALLBACK_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#06331f] via-[#042114] to-[#02140c] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
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
            Welcome to <strong className="text-emerald-400">Grainwish AI</strong>. Sign in using your Google account to access crop diagnostics & Mandi alerts on <strong className="text-amber-300">Grainwish.com</strong>.
          </p>
        </div>

        {/* Alerts */}
        {errorMessage && (
          <div className="p-3.5 bg-red-950/80 border border-red-800/80 rounded-xl text-xs text-red-200 space-y-1.5">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-snug font-medium">{errorMessage}</span>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-xl text-xs text-emerald-300 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-1">
          {/* 1. Official Google OAuth Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 border border-slate-200 disabled:opacity-50"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>{loading ? 'Connecting to Google...' : 'Continue with Google Account'}</span>
          </button>

          {/* 2. Instant One-Click Demo Google Farmer (Works unconditionally) */}
          <button
            onClick={handleDemoGoogleAuth}
            disabled={loading}
            className="w-full py-3 px-5 rounded-2xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-600/70 text-emerald-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Instant Demo Google Farmer (One-Click Test)</span>
          </button>
        </div>

        {/* Collapsible Setup Checklist for Developer / Admin */}
        <div className="pt-2 border-t border-emerald-900/60">
          <button
            onClick={() => setShowConfigGuide(!showConfigGuide)}
            className="w-full flex items-center justify-between text-[11px] text-amber-300/90 hover:text-amber-200 py-1 transition-colors"
          >
            <span className="font-semibold flex items-center gap-1.5">
              <span>🔧 Google Cloud Console Setup Checklist</span>
            </span>
            {showConfigGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showConfigGuide && (
            <div className="mt-2 p-3 bg-[#02180e] border border-emerald-800/80 rounded-xl text-[11px] text-slate-300 space-y-2.5">
              <p className="text-amber-200 font-medium">
                To eliminate <code className="text-red-300 bg-black/40 px-1 py-0.5 rounded">Error 400: redirect_uri_mismatch</code> from Google:
              </p>
              
              <ol className="list-decimal list-inside space-y-1 text-slate-300">
                <li>Open <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline inline-flex items-center gap-0.5">Google Cloud Console <ExternalLink className="w-2.5 h-2.5" /></a></li>
                <li>Edit OAuth 2.0 Client ID: <code className="text-[10px] text-slate-400 block truncate font-mono mt-0.5">{GOOGLE_CLIENT_ID}</code></li>
                <li>Under <strong>Authorized redirect URIs</strong>, add this exact URL:</li>
              </ol>

              <div className="flex items-center gap-1 bg-black/60 p-1.5 rounded-lg border border-emerald-900/80">
                <code className="text-[10px] text-emerald-300 font-mono truncate flex-1 select-all">
                  {SUPABASE_CALLBACK_URL}
                </code>
                <button
                  onClick={copyCallbackUrl}
                  title="Copy Callback URL"
                  className="p-1 rounded bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 shrink-0"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="text-[10px] text-slate-400 border-t border-emerald-900/50 pt-1.5">
                💡 Also update the OAuth Consent Screen App Name from <span className="text-red-300 font-semibold">&quot;Potato App&quot;</span> to <span className="text-emerald-300 font-semibold">&quot;Grainwish AI&quot;</span>.
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Secured Google OAuth · www.grainwish.com</span>
        </div>

      </div>
    </div>
  );
}
