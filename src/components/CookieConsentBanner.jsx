import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, X, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { getConsentPreference, saveConsentPreference } from '../lib/analytics';

export default function CookieConsentBanner({ onOpenPrivacyPolicy }) {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const [allowPreferences, setAllowPreferences] = useState(true);

  useEffect(() => {
    const existing = getConsentPreference();
    if (!existing) {
      // Small delay before showing so page loads smoothly
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }

    // Listen for custom event to reopen cookie settings from footer
    const handleReopen = () => {
      setVisible(true);
      setShowPreferences(true);
    };
    window.addEventListener('open_cookie_preferences', handleReopen);
    return () => window.removeEventListener('open_cookie_preferences', handleReopen);
  }, []);

  if (!visible) return null;

  const handleAcceptAll = () => {
    saveConsentPreference({
      essential: true,
      analytics: true,
      preferences: true
    });
    setVisible(false);
  };

  const handleRejectNonEssential = () => {
    saveConsentPreference({
      essential: true,
      analytics: false,
      preferences: false
    });
    setVisible(false);
  };

  const handleSaveCustom = () => {
    saveConsentPreference({
      essential: true,
      analytics: allowAnalytics,
      preferences: allowPreferences
    });
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-up pointer-events-none">
      
      <div className="max-w-4xl mx-auto bg-[#031d10]/95 backdrop-blur-xl border-2 border-emerald-500/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-auto space-y-4">
        
        {/* Banner Top Row */}
        <div className="flex items-start justify-between gap-4">
          
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center shrink-0 shadow-md shadow-amber-400/20 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-display text-sm sm:text-base font-extrabold text-white">
                  We Respect Your Privacy &amp; Data Rights
                </h4>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  DPDP Act 2023 &amp; GDPR
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                GrainWise AI uses cookies and privacy-conscious analytics to remember your preferred language, provide localized Mandi updates, and improve AI crop diagnostic accuracy. You have complete control over your preferences. Read our{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="text-emerald-400 hover:text-emerald-300 underline font-semibold"
                >
                  Privacy Policy
                </button>.
              </p>
            </div>
          </div>

          <button
            onClick={handleRejectNonEssential}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
            title="Dismiss with essential cookies only"
          >
            <X className="w-5 h-5" />
          </button>

        </div>

        {/* Detailed Preferences Drawer */}
        {showPreferences && (
          <div className="pt-3 border-t border-emerald-900/60 space-y-3 animate-fade-in text-xs">
            <div className="font-bold text-amber-300 text-xs">Customize Your Preferences:</div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Category 1: Essential */}
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Strictly Necessary</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Always On</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Required for secure navigation, leaf scan simulators, and language cookies.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Performance Analytics</span>
                  <input
                    type="checkbox"
                    checked={allowAnalytics}
                    onChange={(e) => setAllowAnalytics(e.target.checked)}
                    className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Helps us analyze model response times to deliver 3-second diagnoses.
                </p>
              </div>

              {/* Category 3: Personalization */}
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Regional Cache</span>
                  <input
                    type="checkbox"
                    checked={allowPreferences}
                    onChange={(e) => setAllowPreferences(e.target.checked)}
                    className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Remembers your selected crop and closest APMC Mandi market distance.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleSaveCustom}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Save My Custom Preferences
              </button>
            </div>
          </div>
        )}

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-emerald-900/40">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1.5 order-2 sm:order-1"
          >
            <Sliders className="w-3.5 h-3.5" />
            {showPreferences ? 'Hide Preferences' : 'Customize Preferences'}
            {showPreferences ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
            <button
              onClick={handleRejectNonEssential}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-slate-300 hover:text-white font-bold text-xs transition-colors text-center"
            >
              Necessary Only
            </button>

            <button
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4 text-black stroke-[3]" />
              Accept All Cookies
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
