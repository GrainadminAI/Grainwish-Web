import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Camera,
  TrendingUp,
  Bot,
  WifiOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe,
  Leaf
} from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const FAQS_DATA = [
  {
    id: 1,
    category: 'diagnostics',
    categoryName: 'AI Diagnostics',
    q: 'How does the AI crop disease diagnosis work?',
    a: 'Simply open the GrainWise AI app, select camera diagnostics, and point your phone at the affected leaf, stem, or grain head. Our deep computer vision neural network analyzes leaf coloration, spots, pustules, and vein patterns in under 3 seconds to identify over 300+ crop pathogens and generate a step-by-step treatment plan.',
    actionText: 'Try Diagnostics Simulator',
    actionTarget: '#diagnostics',
    actionIcon: Camera,
    tag: '300+ Pathogens'
  },
  {
    id: 2,
    category: 'diagnostics',
    categoryName: 'AI Diagnostics',
    q: 'Which crops are supported by the diagnostics tool?',
    a: 'GrainWise AI supports all major commercial Indian crops including Wheat, Paddy / Rice, Cotton, Turmeric, Sugarcane, Maize, Mustard, Soybean, Pulses (Gram, Arhar), Onion, Tomato, Chilli, and Citrus fruits with multi-spectral validation.',
    actionText: 'View Diagnostic Crops',
    actionTarget: '#diagnostics',
    actionIcon: Leaf,
    tag: '14+ Major Crops'
  },
  {
    id: 3,
    category: 'mandi',
    categoryName: 'Mandi & MSP',
    q: 'What are real-time Mandi updates?',
    a: 'Real-time Mandi updates connect directly to APMC markets and government procurement portals across India. You get live daily trading rates, historical price trend graphs, MSP (Minimum Support Price) comparisons, and distance to your nearest procurement center.',
    actionText: 'Explore Mandi Radar',
    actionTarget: '#mandi',
    actionIcon: TrendingUp,
    tag: 'Agmarknet & e-NAM'
  },
  {
    id: 4,
    category: 'mandi',
    categoryName: 'Mandi & MSP',
    q: 'How accurate are the Mandi price updates?',
    a: 'Mandi price data is updated multiple times daily directly from verified APMC market feeds, state portals, and local market reporters with 99.5% price accuracy and live volume arrivals tracking.',
    actionText: 'Check Verified Rates',
    actionTarget: '#mandi',
    actionIcon: CheckCircle2,
    tag: '99.5% Accuracy'
  },
  {
    id: 5,
    category: 'ananya',
    categoryName: 'Ananya AI',
    q: 'Who is Ananya AI and what can I ask her?',
    a: 'Ananya AI is your 24/7 agricultural companion. You can ask her anything about crop health, fertilizer dosing, pest control, weather forecasts, government subsidies, or market timing in natural spoken or written sentences.',
    actionText: 'Chat with Ananya AI',
    actionTarget: '#ananya-ai',
    actionIcon: Bot,
    tag: '24/7 Agronomist'
  },
  {
    id: 6,
    category: 'ananya',
    categoryName: 'Ananya AI',
    q: 'How many languages does Ananya AI support?',
    a: 'Ananya AI supports 22 native Indian languages including Hindi, Tamil, Telugu, Punjabi, Marathi, Bengali, Gujarati, Kannada, Malayalam, Odia, Assamese, and more with natural Indian voice speech.',
    actionText: 'Select Your Language',
    actionTarget: '#ananya-ai',
    actionIcon: Globe,
    tag: '22 Native Languages'
  },
  {
    id: 7,
    category: 'platform',
    categoryName: 'Platform & Offline',
    q: 'Can I use GrainWise AI without internet?',
    a: 'Yes! GrainWise AI includes an offline neural engine that caches your recent diagnostics, fertilizer calculations, and farming calendar operations so you can inspect crops even in remote areas with zero cell signal.',
    actionText: 'Test Offline Vision Engine',
    actionTarget: '#diagnostics',
    actionIcon: WifiOff,
    tag: 'Offline Cached'
  },
  {
    id: 8,
    category: 'platform',
    categoryName: 'Platform & Offline',
    q: 'Is GrainWise AI free to use?',
    a: 'Yes! All core features including camera diagnostics, NPK fertilizer calculator, Mandi price updates, and Ananya AI consultation are 100% free for farmers.',
    actionText: 'Start Free Today',
    actionTarget: '#features',
    actionIcon: Sparkles,
    tag: '100% Free'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions', count: 8 },
  { id: 'diagnostics', label: 'AI Diagnostics', count: 2 },
  { id: 'mandi', label: 'Mandi & MSP', count: 2 },
  { id: 'ananya', label: 'Ananya AI', count: 2 },
  { id: 'platform', label: 'Platform & Offline', count: 2 }
];

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIds, setOpenIds] = useState([1]); // First question open by default
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'all' || faq.category === selectedCategory;
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !queryLower ||
        faq.q.toLowerCase().includes(queryLower) ||
        faq.a.toLowerCase().includes(queryLower) ||
        faq.categoryName.toLowerCase().includes(queryLower) ||
        faq.tag.toLowerCase().includes(queryLower);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleActionClick = (target) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-8 sm:py-12 md:py-16 bg-[#02140b]/90 relative overflow-hidden border-b border-emerald-900/40">
      
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[10px] sm:text-xs font-semibold text-emerald-300">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('faq_badge', 'Got Questions?')}</span>
          </div>

          <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
            {t('faq_main_title', 'Frequently Asked Questions')}
          </h2>

          <p className="text-slate-300/90 text-xs sm:text-sm">
            {t('faq_main_sub', 'Quick answers on AI crop diagnostics, real-time Mandi rates, and Ananya AI.')}
          </p>
        </div>

        {/* Featurable Controls: Category Filter Tabs & Compact Search Bar */}
        <div className="max-w-4xl mx-auto mb-5 sm:mb-6 space-y-2.5">
          
          {/* Quick Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('faq_search_placeholder', 'Search questions (e.g. Mandi, offline, languages)...')}
              className="w-full bg-[#031d10]/90 border border-emerald-800/60 focus:border-emerald-400 rounded-full pl-8 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => {
              const catKey = cat.id === 'diagnostics' ? 'faq_cat_diag' : `faq_cat_${cat.id}`;
              const label = t(catKey, cat.label);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                      : 'bg-emerald-950/70 text-slate-300 hover:text-white border border-emerald-800/40 hover:border-emerald-700'
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`px-1 rounded-full text-[9px] font-mono ${
                      selectedCategory === cat.id ? 'bg-black/20 text-black' : 'bg-emerald-900/60 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Compact 2-Column Responsive FAQ Grid */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No questions matching &ldquo;{searchQuery}&rdquo;. Try another term or view all.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5 max-w-5xl mx-auto items-start">
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              const ActionIcon = faq.actionIcon;

              return (
                <div
                  key={faq.id}
                  className={`rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-gradient-to-b from-[#052917] to-[#031d10] border-emerald-500/60 shadow-lg'
                      : 'bg-[#031d10]/90 border-emerald-900/50 hover:border-emerald-700/60'
                  }`}
                >
                  {/* Accordion Question Header */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-3 sm:p-3.5 text-left flex items-start justify-between gap-2.5 text-xs sm:text-sm font-bold text-white hover:text-emerald-300 transition-colors"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <span className="text-amber-400 font-mono text-[10px] sm:text-[11px] font-extrabold mt-0.5 shrink-0">
                        0{faq.id}
                      </span>
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                            {faq.tag}
                          </span>
                        </div>
                        <span className="block leading-snug">{faq.q}</span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-emerald-400 shrink-0 mt-0.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-400' : ''
                      }`}
                    />
                  </button>

                  {/* Accordion Answer & Featurable Action Link */}
                  {isOpen && (
                    <div className="px-3 sm:px-3.5 pb-3 sm:pb-3.5 pt-1 text-[11px] sm:text-xs text-slate-300 leading-relaxed border-t border-emerald-900/40 space-y-2">
                      <p>{faq.a}</p>

                      <div className="pt-1.5 flex items-center justify-between border-t border-emerald-900/30">
                        <button
                          onClick={() => handleActionClick(faq.actionTarget)}
                          className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors"
                        >
                          <ActionIcon className="w-3 h-3 shrink-0" />
                          <span>{faq.actionText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>

                        <span className="text-[9px] text-slate-500 font-mono hidden sm:inline-block">
                          Verified Agronomic Guide
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Featurable Bottom Help Footer Pill */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-xs text-slate-300">
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>Have a specific farming question?</span>
            <button
              onClick={() => handleActionClick('#ananya-ai')}
              className="text-amber-400 font-bold hover:underline flex items-center gap-0.5"
            >
              <span>Ask Ananya AI 24/7</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
