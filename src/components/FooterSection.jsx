import React from 'react';
import { Sprout, Smartphone, ShieldCheck, Heart, Globe2, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import MadeInIndiaTag from './MadeInIndiaTag';
import { useLanguage } from '../lib/LanguageContext';

export default function FooterSection({ onOpenDownloadModal }) {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#010c06] text-slate-300 border-t border-emerald-900/60 pt-20 pb-12 relative overflow-hidden">
      
      {/* CTA Footer Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-[#052b19] via-[#083b23] to-[#042013] border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-14 text-center shadow-2xl space-y-6 relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider inline-block">
              Empower Your Fields Today
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {t('footer_hero_title')} <span className="gradient-text-gold">{t('footer_hero_gold')}</span>
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              {t('footer_hero_sub')}
            </p>

            <div className="pt-4 flex flex-col items-center justify-center gap-3">
              <button
                onClick={onOpenDownloadModal}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-black font-extrabold rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 text-base"
              >
                <Smartphone className="w-5 h-5 text-black" />
                {t('hero_cta_download')}
              </button>
              <div className="text-xs text-amber-300 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Application Phase is Coming Soon · Android Pre-Register will get Free 14 days trial pack
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-emerald-900/60 text-xs">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/grainwise_icon_transparent.png" 
                alt="GrainWise AI Shield Logo" 
                className="h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]"
              />
              <div>
                <div className="font-display text-xl font-bold text-white">GrainWise AI</div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              GrainWise AI provides camera-based AI crop diagnostics, precision NPK fertilizer calculations, live Mandi prices, localized weather alerts, and 24/7 Ananya AI guidance in 22 native Indian languages.
            </p>

            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Certified AgriTech Platform · ISO 27001 Secured</span>
            </div>
          </div>

          {/* Core Features */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-xs">Features</div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#diagnostics" className="hover:text-emerald-300">AI Crop Diagnostics</a></li>
              <li><a href="#npk-calc" className="hover:text-emerald-300">Precision NPK Calculator</a></li>
              <li><a href="#ananya-ai" className="hover:text-emerald-300">Ananya AI 22 Languages</a></li>
              <li><a href="#mandi" className="hover:text-emerald-300">Live Mandi Prices & MSP</a></li>
              <li><a href="#case-studies" className="hover:text-emerald-300">Interactive Farming Calendar</a></li>
            </ul>
          </div>

          {/* Crops Supported */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-xs">Crops & Regions</div>
            <ul className="space-y-2 text-slate-400">
              <li>Wheat (Maharashtra & Punjab)</li>
              <li>Paddy (Telangana & Andhra)</li>
              <li>Cotton (Bathinda & Gujarat)</li>
              <li>Turmeric (Erode, Tamil Nadu)</li>
              <li>Sugarcane & Vegetables</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-xs">Connect & Support</div>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400" /> support@grainwise.ai</li>
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400" /> 1800-KISAAN-AI (Toll Free)</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span>
              © {new Date().getFullYear()} GrainWise AI. All rights reserved. Built for farmers with <Heart className="w-3 h-3 text-red-500 inline mx-1" />.
            </span>
            <MadeInIndiaTag variant="footer" />
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-slate-300 flex items-center gap-1 transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-amber-400" /> Top
          </button>
        </div>

      </div>
    </footer>
  );
}
