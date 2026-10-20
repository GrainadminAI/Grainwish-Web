import React, { useState, useEffect } from 'react';
import { Sprout, Smartphone, Globe2, ChevronDown, Sparkles, Menu, X, ShieldCheck, User, LogIn, LogOut } from 'lucide-react';
import { supabase, signOutUser, getLoggedInUser, recordFeatureUsageToDB } from '../lib/supabase';
import AuthModal from './AuthModal';

const LANGUAGES = [
  "English", "Hindi (हिंदी)", "Tamil (தமிழ்)", "Telugu (తెలుగు)", "Punjabi (ਪੰਜਾਬੀ)", 
  "Marathi (मराठी)", "Bengali (বাংলা)", "Gujarati (ગુજરાતી)", "Kannada (કન્નડ)", 
  "Malayalam (മലയാളം)", "Odia (ଓଡ଼ିଆ)", "Assamese (অসমীয়া)", "Urdu (اردو)", 
  "Maithili (मैथिली)", "Santali (ᱥᱟᱱᱛᱟᱲᱤ)", "Kashmiri (كأشُر)", "Nepali (नेपाली)", 
  "Konkani (कोंकणी)", "Sindhi (سنڌي)", "Dogri (डोगरी)", "Manipuri (মৈতৈলোন্)", "Sanskrit (संस्कृतम्)"
];

import MadeInIndiaTag from './MadeInIndiaTag';
import { useLanguage } from '../lib/LanguageContext';

export default function Navbar({ onOpenDownloadModal, selectedLang, setSelectedLang }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial User Check
    getLoggedInUser().then(u => setCurrentUser(u));

    // Auth State Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#021109]/90 backdrop-blur-md border-b border-emerald-900/40 py-2 sm:py-3 shadow-xl' : 'bg-transparent py-2.5 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Domain */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-4 group">
            <img 
              src="/assets/grainwise_icon_transparent.png" 
              alt="GrainWise AI Logo - Smart Agriculture Intelligence Platform" 
              width="64"
              height="64"
              className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_18px_rgba(16,185,129,0.5)] shrink-0"
              onError={(e) => {
                e.target.src = '/favicon.png';
              }}
            />
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  GrainWise <span className="text-amber-400 font-black">AI</span>
                </span>
                <MadeInIndiaTag variant="navbar" />
              </div>
              <span className="text-[10px] sm:text-xs text-slate-300 tracking-wider uppercase block -mt-0.5 font-medium">
                {t('nav_smart_farming')}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-emerald-950/40 p-1.5 rounded-full border border-emerald-800/30 backdrop-blur-sm">
            <a href="#features" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">{t('nav_features')}</a>
            <a href="#diagnostics" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> {t('nav_ai_scan')}
            </a>
            <a href="#npk-calc" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">{t('nav_npk_calc')}</a>
            <a href="#ananya-ai" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">{t('nav_ananya_ai')}</a>
            <a href="#mandi" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">{t('nav_mandi')}</a>
            <a href="#case-studies" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">{t('nav_farmer_stories')}</a>
            <a href="#faq" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">{t('nav_faq')}</a>
          </nav>

          {/* Actions: 22 Languages & Download Button */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* User Profile if Logged In */}
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/80 border border-emerald-700/50 rounded-xl text-xs">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-emerald-300 font-semibold truncate max-w-[110px]">
                  {currentUser.email?.split('@')[0]}
                </span>
                <button
                  onClick={() => signOutUser()}
                  title="Sign Out"
                  className="p-1 text-slate-400 hover:text-red-400 transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Language Picker */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/40 rounded-lg text-xs font-medium text-emerald-200 transition-colors"
              >
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <span>{selectedLang}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto bg-[#042013] border border-emerald-600/40 rounded-xl shadow-2xl z-50 p-1 divide-y divide-emerald-900/40">
                  <div className="px-3 py-2 text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                    22 Languages Supported
                  </div>
                  <div className="py-1">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          const newLang = lang.split(' ')[0];
                          setSelectedLang(newLang);
                          setLangDropdownOpen(false);
                          recordFeatureUsageToDB({
                            featureName: 'Language Switcher',
                            action: 'change_language',
                            metadata: { language: newLang, fullLabel: lang }
                          });
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs rounded-md transition-colors ${
                          selectedLang === lang.split(' ')[0]
                            ? 'bg-emerald-600 text-white font-semibold'
                            : 'text-slate-300 hover:bg-emerald-900/50 hover:text-emerald-300'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Download CTA */}
            <button
              onClick={onOpenDownloadModal}
              className="relative group overflow-hidden rounded-xl p-px font-semibold text-xs tracking-wide shadow-lg shadow-emerald-600/30 active:scale-95 transition-transform"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 rounded-xl animate-shimmer" />
              <span className="relative flex items-center gap-2 px-4 py-2 bg-[#042114] group-hover:bg-opacity-80 rounded-[11px] text-emerald-300 group-hover:text-white transition-colors">
                <Smartphone className="w-4 h-4 text-amber-400 group-hover:animate-bounce" />
                {t('nav_download_app')}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenDownloadModal}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1 shadow-md shadow-emerald-600/20"
            >
              <Smartphone className="w-3.5 h-3.5" /> App
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-50 md:hidden bg-[#031d10] border-b border-emerald-800/60 px-4 pt-3 pb-6 space-y-3.5 shadow-2xl max-h-[85vh] overflow-y-auto">
            
            {/* User Account / Auth Bar on Mobile */}
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              {currentUser ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-500/50 flex items-center justify-center text-amber-400 font-bold text-xs">
                      {currentUser.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-xs">
                      <div className="text-white font-bold truncate max-w-[150px]">{currentUser.email?.split('@')[0]}</div>
                      <div className="text-[10px] text-emerald-400 font-mono">Logged In</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      signOutUser();
                      setMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4 text-amber-400" />
                  <span>Farmer Account / Sign In</span>
                </button>
              )}
            </div>

            {/* Complete Mobile Navigation Links */}
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-emerald-900/50">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-slate-200 hover:bg-emerald-900">Features</a>
              <a href="#diagnostics" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-amber-300 flex items-center gap-1.5 hover:bg-emerald-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Scan
              </a>
              <a href="#npk-calc" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-slate-200 hover:bg-emerald-900">NPK Calculator</a>
              <a href="#ananya-ai" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-slate-200 hover:bg-emerald-900">Ananya AI</a>
              <a href="#mandi" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-slate-200 hover:bg-emerald-900">Mandi Rates</a>
              <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-slate-200 hover:bg-emerald-900">Farmer Stories</a>
              <a href="#calendar" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-slate-200 hover:bg-emerald-900">Agri Calendar</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-950/60 text-slate-200 hover:bg-emerald-900">FAQ</a>
            </div>

            {/* Mobile Language Selector */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Select Language (22 Native Languages):</span>
              </label>
              <select
                value={selectedLang}
                onChange={(e) => {
                  const newLang = e.target.value;
                  setSelectedLang(newLang);
                  recordFeatureUsageToDB({
                    featureName: 'Language Switcher (Mobile)',
                    action: 'change_language',
                    metadata: { language: newLang }
                  });
                }}
                className="w-full bg-[#021109] border border-emerald-700/60 rounded-xl px-3 py-2.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-400"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.split(' ')[0]}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}
      {/* Supabase Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
      />
    </header>
  );
}
