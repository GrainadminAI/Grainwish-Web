import React, { useState } from 'react';
import { X, Check, Download, Sparkles, Layers, Palette, Eye, Crosshair, ArrowRight, ShieldCheck } from 'lucide-react';
import { useBrandTheme } from '../lib/BrandThemeContext';

export default function BrandThemeModal() {
  const { brandModalOpen, setBrandModalOpen, activeLogo, setActiveLogo, options } = useBrandTheme();
  const [copiedHex, setCopiedHex] = useState(null);

  if (!brandModalOpen) return null;

  const handleCopyHex = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Outer Card */}
      <div 
        className="relative w-full max-w-5xl rounded-3xl bg-[#03150d] border border-emerald-500/30 shadow-2xl shadow-emerald-950/70 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Glow Header Accents */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500" />
        <div className="absolute -top-24 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-emerald-900/40 flex items-start justify-between gap-4 shrink-0 bg-[#041a10]/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Brand Identity Suite
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30">
                v2.0 Theme
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-display">
              GrainWise <span className="text-amber-400">AI</span> Logo & Theme Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explore the 3 brand design directions. Select any logo below to update the live website emblem, favicon, and brand identity in real-time.
            </p>
          </div>

          <button
            onClick={() => setBrandModalOpen(false)}
            className="p-2 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/60 text-slate-400 hover:text-white border border-emerald-800/40 transition-colors shrink-0"
            aria-label="Close Brand Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Logo Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {options.map((opt) => {
              const isActive = activeLogo === opt.id;

              return (
                <div
                  key={opt.id}
                  className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? 'bg-gradient-to-b from-[#082a1c] to-[#041910] border-2 border-emerald-400 shadow-xl shadow-emerald-500/20'
                      : 'bg-[#051c12]/70 hover:bg-[#072418] border border-emerald-900/60'
                  }`}
                >
                  {/* Active Indicator Top Tag */}
                  {isActive && (
                    <div className="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-emerald-400 text-black text-[10px] font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" /> Active Website Logo
                    </div>
                  )}

                  <div>
                    {/* Visual Preview Box */}
                    <div className={`relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center p-4 border transition-all ${
                      opt.id === 'option2' 
                        ? 'bg-gradient-to-br from-black/80 via-[#03150d] to-black/90 border-emerald-500/30' 
                        : 'bg-white/95 border-slate-200'
                    }`}>
                      <img
                        src={opt.src}
                        alt={opt.title}
                        className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                          opt.id === 'option2' ? 'drop-shadow-[0_0_24px_rgba(16,185,129,0.5)]' : ''
                        }`}
                      />

                      {/* Tag pill */}
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center pointer-events-none">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold backdrop-blur-md ${
                          opt.id === 'option2' 
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' 
                            : 'bg-black/80 text-slate-200'
                        }`}>
                          {opt.tag}
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="mt-4 space-y-1.5">
                      <h3 className="font-extrabold text-base text-white tracking-tight leading-snug">
                        {opt.title}
                      </h3>
                      <p className="text-[11px] text-amber-400 font-mono font-medium">
                        {opt.subtitle}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {opt.description}
                      </p>
                    </div>

                    {/* Color Swatches */}
                    <div className="mt-4 pt-3 border-t border-emerald-900/50">
                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Palette className="w-3 h-3 text-emerald-400" /> Signature Palette
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {opt.colors.map((c) => (
                          <button
                            key={c.hex}
                            onClick={() => handleCopyHex(c.hex)}
                            title={`Click to copy ${c.name} (${c.hex})`}
                            className="group/color text-left p-1 rounded-lg bg-black/40 hover:bg-black/70 border border-emerald-900/40 transition-colors"
                          >
                            <div 
                              className="w-full h-4 rounded-md border border-white/10 mb-1" 
                              style={{ backgroundColor: c.hex }} 
                            />
                            <div className="text-[9px] text-slate-300 truncate font-mono">
                              {copiedHex === c.hex ? 'Copied!' : c.hex}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 pt-3 border-t border-emerald-900/50 flex items-center gap-2">
                    <button
                      onClick={() => setActiveLogo(opt.id)}
                      className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        isActive
                          ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/20'
                          : 'bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/40'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Active
                        </>
                      ) : (
                        <>
                          Apply to Website
                        </>
                      )}
                    </button>

                    <a
                      href={opt.fullSrc || opt.src}
                      download={`grainwise-logo-${opt.id}.png`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-black/40 hover:bg-emerald-950 text-slate-300 hover:text-white border border-emerald-900/60 transition-colors"
                      title="Download high-resolution file"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Design System & Motifs Breakdown */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#062115] to-[#03130c] border border-emerald-800/40">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-emerald-400" /> GrainWise AI Core Icon Geometry
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/30 border border-emerald-900/40">
                <div className="text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                  🌾 Golden Wheat Stalk
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Center core symbol of prosperity, abundance, and healthy grain yield across India.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-emerald-900/40">
                <div className="text-orange-400 font-bold mb-1 flex items-center gap-1.5">
                  🍂 Terracotta & Earth Leaves
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Flanking leaves in warm terracotta and fertile humus brown, honoring native Indian soils.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-emerald-900/40">
                <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Vision Eye & Reticle
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Subtle computer vision eye glyph & precision targeting crosshair representing AI disease diagnostics.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/30 border border-emerald-900/40">
                <div className="text-green-500 font-bold mb-1 flex items-center gap-1.5">
                  🚜 Field Furrows Foundation
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Deep curved semicircular ridges grounding the circular composition into regenerative agricultural soil.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-emerald-900/40 bg-[#041a10] flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Active theme: <strong>{options.find(o => o.id === activeLogo)?.title}</strong></span>
          </div>

          <button
            onClick={() => setBrandModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold transition-all"
          >
            Done
          </button>
        </div>

      </div>

    </div>
  );
}
