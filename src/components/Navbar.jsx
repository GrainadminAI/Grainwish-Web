import React, { useState, useEffect } from 'react';
import { Sprout, Smartphone, Globe2, ChevronDown, Sparkles, Menu, X, ShieldCheck, User, LogIn, LogOut } from 'lucide-react';
import { supabase, signOutUser, getLoggedInUser } from '../lib/supabase';
import AuthModal from './AuthModal';

const LANGUAGES = [
  "English", "Hindi (हिंदी)", "Tamil (தமிழ்)", "Telugu (తెలుగు)", "Punjabi (ਪੰਜਾਬੀ)", 
  "Marathi (मराठी)", "Bengali (বাংলা)", "Gujarati (ગુજરાતી)", "Kannada (કન્નડ)", 
  "Malayalam (മലയാളം)", "Odia (ଓଡ଼ିଆ)", "Assamese (অসমীয়া)", "Urdu (اردو)", 
  "Maithili (मैथिली)", "Santali (ᱥᱟᱱᱛᱟᱲᱤ)", "Kashmiri (كأشُر)", "Nepali (नेपाली)", 
  "Konkani (कोंकणी)", "Sindhi (سنڌي)", "Dogri (डोगरी)", "Manipuri (মৈতৈলোন্)", "Sanskrit (संस्कृतम्)"
];

export default function Navbar({ onOpenDownloadModal, selectedLang, setSelectedLang }) {
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
      isScrolled ? 'bg-[#021109]/85 backdrop-blur-md border-b border-emerald-900/40 py-3 shadow-xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Domain */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#031d10] rounded-[10px] flex items-center justify-center">
                <img src="/assets/grainwise_logo.png" alt="GrainWise AI Logo" className="w-7 h-7 object-contain" onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }} />
                <Sprout className="w-6 h-6 text-emerald-400 block" style={{ display: 'none' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  GrainWise <span className="text-amber-400 font-extrabold">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> www.grainwish.com
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase block -mt-1 font-medium">
                Smart Farming Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-emerald-950/40 p-1.5 rounded-full border border-emerald-800/30 backdrop-blur-sm">
            <a href="#features" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">Features</a>
            <a href="#diagnostics" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> AI Scan
            </a>
            <a href="#npk-calc" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">NPK Calculator</a>
            <a href="#ananya-ai" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">Ananya AI</a>
            <a href="#mandi" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">Mandi & Weather</a>
            <a href="#case-studies" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">Farmer Stories</a>
            <a href="#faq" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-emerald-800/30 rounded-full transition-all">FAQ</a>
          </nav>

          {/* Actions: 22 Languages & Auth & Download Button */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* User Auth Button */}
            {currentUser ? (
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
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 hover:scale-105 active:scale-95"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Google Sign In
              </button>
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
                          setSelectedLang(lang.split(' ')[0]);
                          setLangDropdownOpen(false);
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
                Download App
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#031d10] border-b border-emerald-800/40 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-emerald-900/50">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-950/60 text-slate-200">Features</a>
            <a href="#diagnostics" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-950/60 text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> AI Scan
            </a>
            <a href="#npk-calc" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-950/60 text-slate-200">NPK Calculator</a>
            <a href="#ananya-ai" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-950/60 text-slate-200">Ananya AI</a>
            <a href="#mandi" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-950/60 text-slate-200">Mandi Rates</a>
            <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-sm font-medium bg-emerald-950/60 text-slate-200">Farmer Stories</a>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400">Select Language (22 Languages):</label>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full bg-[#021109] border border-emerald-700/50 rounded-lg px-3 py-2 text-xs text-emerald-300"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang.split(' ')[0]}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
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
