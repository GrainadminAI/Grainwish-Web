import React from 'react';
import { Smartphone, ShieldCheck, Heart, ArrowUp, Lock, FileText, Cookie, Mail } from 'lucide-react';
import MadeInIndiaTag from './MadeInIndiaTag';
import { useLanguage } from '../lib/LanguageContext';
import { useBrandTheme } from '../lib/BrandThemeContext';

export default function FooterSection({ onOpenDownloadModal, onOpenPrivacyPolicy, onOpenTerms, onOpenSecurityPolicy }) {
  const { t } = useLanguage();
  const { currentOption } = useBrandTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open_cookie_preferences'));
  };

  return (
    <footer className="bg-[#010c06] text-slate-300 border-t border-emerald-900/60 pt-10 pb-24 md:pb-12 sm:pt-16 relative overflow-hidden">
      
      {/* Single Unified Primary CTA Footer Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-16">
        <div className="bg-gradient-to-r from-[#052b19] via-[#083b23] to-[#042013] border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-8 md:p-14 text-center shadow-2xl space-y-4 sm:space-y-6 relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="px-3 sm:px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40 text-[11px] sm:text-xs font-bold uppercase tracking-wider inline-block">
              Empower Your Fields Today
            </span>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {t('footer_hero_title')} <span className="gradient-text-gold">{t('footer_hero_gold')}</span>
            </h2>

            <p className="text-slate-200 text-xs sm:text-base leading-relaxed">
              {t('footer_hero_sub')}
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={onOpenDownloadModal}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-xs sm:text-base"
              >
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                {t('hero_cta_download')}
              </button>
              <div className="text-[10px] sm:text-xs text-amber-300 font-mono flex items-center gap-1.5 text-center px-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span>Application Phase is Coming Soon · Android Pre-Register will get Free 14 days trial pack</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-emerald-900/60 text-xs">
          
          {/* Brand Col */}
          <div className="space-y-4 lg:col-span-5">
            <div className="flex items-center gap-4">
              <img 
                src={currentOption.src} 
                alt="GrainWise AI Logo - Trusted Indian AgriTech Platform" 
                loading="lazy"
                decoding="async"
                width="84"
                height="84"
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] shrink-0"
              />
              <div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">GrainWise AI</div>
                <div className="text-xs sm:text-sm text-amber-400 font-mono font-medium">Smart Farming Intelligence</div>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Instant camera-based AI crop diagnostics, precision NPK calculations, live Mandi rates &amp; 24/7 Ananya AI guidance in 22 native Indian languages.
            </p>

            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Certified AgriTech Platform · ISO 27001 Secured</span>
            </div>

            <div className="pt-1">
              <a 
                href="mailto:support@grainwish.com" 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-800/60 text-slate-200 hover:text-emerald-300 hover:border-emerald-500/60 transition-all font-medium text-xs"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@grainwish.com</span>
              </a>
            </div>
          </div>

          {/* Core Features */}
          <div className="space-y-3 lg:col-span-3 lg:col-start-7">
            <div className="font-bold text-white uppercase tracking-wider text-xs">Features &amp; Tools</div>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#diagnostics" className="hover:text-emerald-300 transition-colors">AI Crop Diagnostics</a></li>
              <li><a href="#npk-calc" className="hover:text-emerald-300 transition-colors">Precision NPK Calculator</a></li>
              <li><a href="#ananya-ai" className="hover:text-emerald-300 transition-colors">Ananya AI 22 Languages</a></li>
              <li><a href="#mandi" className="hover:text-emerald-300 transition-colors">Live Mandi Prices &amp; MSP</a></li>
              <li><a href="#calendar" className="hover:text-emerald-300 transition-colors">Interactive Farming Calendar</a></li>
            </ul>
          </div>

          {/* Legal & Compliance Links */}
          <div className="space-y-3 lg:col-span-3">
            <div className="font-bold text-white uppercase tracking-wider text-xs">Legal &amp; Trust</div>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Privacy Policy (DPDP &amp; GDPR)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Terms &amp; Conditions</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSecurityPolicy}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left text-slate-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Security Policy &amp; Charter</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookiePreferences}
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Cookie className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Cookie Preferences</span>
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@grainwish.com"
                  className="hover:text-emerald-300 transition-colors flex items-center gap-1.5 text-left text-slate-300"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Support: support@grainwish.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span>
              © {new Date().getFullYear()} GrainWise AI. All rights reserved. Built for farmers with <Heart className="w-3 h-3 text-red-500 inline mx-1" />.
            </span>
            <MadeInIndiaTag variant="footer" />
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-slate-300 flex items-center gap-1 transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-amber-400" /> Top
          </button>
        </div>

      </div>
    </footer>
  );
}
