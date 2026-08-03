import React, { useState } from 'react';
import { X, Smartphone, QrCode, Download, Check, ShieldCheck, Sparkles, Copy, Database } from 'lucide-react';
import confetti from 'canvas-confetti';
import { recordAppDownloadToDB } from '../lib/supabase';

export default function DownloadModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadTrigger = async (platform) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    await recordAppDownloadToDB(platform);
    alert(`Thank you for installing GrainWise AI for ${platform}! Starting app package download...`);
  };

  const copyDomainLink = () => {
    navigator.clipboard.writeText('https://Grainwish.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#06331f] via-[#042114] to-[#02140c] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950 text-slate-300 hover:text-white border border-emerald-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-black mx-auto flex items-center justify-center shadow-lg shadow-amber-400/20">
            <Smartphone className="w-8 h-8" />
          </div>

          <h3 className="font-display text-2xl font-extrabold text-white">
            Download GrainWise <span className="text-amber-400">AI</span>
          </h3>

          <p className="text-xs text-slate-300">
            Tap download and take the guesswork out of farming. Available for Android & iOS.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-[11px] font-mono text-emerald-300 border border-emerald-700/50">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Official Portal: Grainwish.com
          </div>
        </div>

        {/* QR Code Container */}
        <div className="bg-[#03180f] p-4 rounded-2xl border border-emerald-800/60 flex items-center justify-between gap-4">
          <div className="w-24 h-24 bg-white p-2 rounded-xl shrink-0 flex items-center justify-center shadow-md">
            {/* SVG QR Code Simulation */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M0,0 h30 v30 h-30 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M0,40 h10 v20 h-10 z M30,40 h40 v10 h-40 z M80,40 h20 v30 h-20 z M0,70 h30 v30 h-30 z M40,80 h30 v20 h-30 z M80,80 h20 v20 h-20 z" fill="#031d10" />
            </svg>
          </div>
          <div className="space-y-1 text-xs">
            <div className="font-bold text-amber-300 flex items-center gap-1">
              <QrCode className="w-4 h-4 text-amber-400" /> Scan QR with Mobile Camera
            </div>
            <div className="text-slate-300 text-[11px]">
              Instantly open the app download link on your smartphone device.
            </div>
            <button
              onClick={copyDomainLink}
              className="mt-2 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 underline"
            >
              {copied ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Link Copied to Clipboard!' : 'Copy Link: grainwish.com'}
            </button>
          </div>
        </div>

        {/* Direct Download Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          <button
            onClick={() => handleDownloadTrigger('Android APK / Google Play')}
            className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" /> Download Android App
          </button>

          <button
            onClick={() => handleDownloadTrigger('iOS App Store')}
            className="p-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Smartphone className="w-4 h-4" /> iOS App Store
          </button>

        </div>

        {/* Footer info */}
        <div className="text-center text-[10px] text-slate-400">
          22 Languages Supported · Low Bandwidth 2G/3G Optimized · 100% Free for Farmers
        </div>

      </div>
    </div>
  );
}
