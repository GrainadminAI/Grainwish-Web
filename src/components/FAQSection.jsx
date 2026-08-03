import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';

const FAQS = [
  {
    q: "How does the AI crop disease diagnosis work?",
    a: "Simply open the GrainWise AI app, select camera diagnostics, and point your phone at the affected leaf, stem, or grain head. Our deep computer vision neural network analyzes leaf coloration, spots, pustules, and vein patterns in under 3 seconds to identify over 300+ crop pathogens and generate a step-by-step treatment plan."
  },
  {
    q: "Which crops are supported by the diagnostics tool?",
    a: "GrainWise AI supports all major commercial Indian crops including Wheat, Paddy / Rice, Cotton, Turmeric, Sugarcane, Maize, Mustard, Soybean, Pulses (Gram, Arhar), Onion, Tomato, Chilli, and Citrus fruits."
  },
  {
    q: "What are real-time Mandi updates?",
    a: "Real-time Mandi updates connect directly to APMC markets and government procurement portals across India. You get live daily trading rates, historical price trend graphs, MSP (Minimum Support Price) comparisons, and distance to your nearest procurement center."
  },
  {
    q: "How accurate are the Mandi price updates?",
    a: "Mandi price data is updated multiple times daily directly from verified APMC market feeds and local market reporters with 99.5% price accuracy."
  },
  {
    q: "Who is Ananya AI and what can I ask her?",
    a: "Ananya AI is your 24/7 agricultural companion. You can ask her anything about crop health, fertilizer dosing, pest control, weather forecasts, government subsidies, or market timing in natural spoken or written sentences."
  },
  {
    q: "How many languages does Ananya AI support?",
    a: "Ananya AI supports 22 native Indian languages including Hindi, Tamil, Telugu, Punjabi, Marathi, Bengali, Gujarati, Kannada, Malayalam, Odia, Assamese, and more."
  },
  {
    q: "Can I use GrainWise AI without internet?",
    a: "Yes! GrainWise AI includes an offline neural engine that caches your recent diagnostics, fertilizer calculations, and farming calendar operations so you can inspect crops even in remote areas with zero cell signal."
  },
  {
    q: "Is GrainWise AI free to use?",
    a: "Yes! All core features including camera diagnostics, NPK fertilizer calculator, Mandi price updates, and Ananya AI consultation are 100% free for farmers."
  }
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-24 bg-[#02180d] relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-xs font-semibold text-emerald-300">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Got Questions?
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Frequently Asked <span className="gradient-text-gold">Questions</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Everything you need to know about crop diagnostics, real-time Mandi updates, and guidance from Ananya AI.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-gradient-to-r from-[#052917] to-[#041f12] border-emerald-500/50 shadow-xl'
                    : 'bg-[#042013] border-emerald-800/40 hover:border-emerald-700/60'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-emerald-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-amber-400 font-mono text-xs font-extrabold">0{idx + 1}</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-amber-400' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-emerald-900/50 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
