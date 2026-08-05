import React, { useState } from 'react';
import { Bot, Mic, MicOff, Send, Globe, Volume2, Sparkles, CheckCircle2, Wifi, MessageSquare, User, Database } from 'lucide-react';
import { saveAnanyaChatToDB, recordFeatureUsageToDB } from '../lib/supabase';

const SAMPLE_PROMPTS = [
  "What is the best treatment for yellow leaf rust in wheat?",
  "Ananya, what is the Mandi price of cotton in Punjab today?",
  "How much urea should I apply for my paddy field in 2nd stage?",
  "Are there any government subsidies for drip irrigation in Tamil Nadu?",
  "Is heavy rainfall expected in Nashik over the next 48 hours?"
];

const PRESET_RESPONSES = {
  default: "Namaste! I am Ananya AI, your 24/7 farming companion. I can help you with crop health, fertilizer ratios, weather forecasts, and live Mandi prices in 22 native languages. What would you like to ask today?",
  rust: "Yellow rust in wheat spreads quickly in humid weather. Apply Propiconazole 25% EC (1ml/L) immediately. Make sure to spray early in the morning before dew dries. Would you like me to check local chemical prices?",
  mandi: "Today in Bathinda, Punjab, long-staple Cotton is trading at ₹7,450 per quintal, which is ₹1,900 higher than the baseline MSP! Demand is peak right now.",
  urea: "For Paddy in the 2nd stage (tillering), apply 35kg Urea + 10kg MOP per acre. Avoid over-applying Urea to prevent stem rot and brown spot disease.",
  subsidy: "Under the PM-KSY (Pradhan Mantri Krishi Sinchayee Yojana), Tamil Nadu provides up to 100% subsidy for small farmers and 75% for general farmers installing drip irrigation systems.",
  weather: "Localized radar shows light to moderate showers (12-18mm) expected in Nashik over the next 36 hours. Hold off on any chemical sprays until the rain passes!"
};

export default function AnanyaAIAssistant({ selectedLang, setSelectedLang }) {
  const [messages, setMessages] = useState([
    { sender: 'ananya', text: PRESET_RESPONSES.default, lang: selectedLang }
  ]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);

  const handleSend = (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Determine Ananya response
    let responseText = PRESET_RESPONSES.default;
    const lower = textToSend.toLowerCase();
    if (lower.includes('rust') || lower.includes('yellow') || lower.includes('leaf')) responseText = PRESET_RESPONSES.rust;
    else if (lower.includes('mandi') || lower.includes('price') || lower.includes('cotton')) responseText = PRESET_RESPONSES.mandi;
    else if (lower.includes('urea') || lower.includes('paddy') || lower.includes('fertilizer')) responseText = PRESET_RESPONSES.urea;
    else if (lower.includes('subsid') || lower.includes('drip') || lower.includes('government')) responseText = PRESET_RESPONSES.subsidy;
    else if (lower.includes('rain') || lower.includes('weather') || lower.includes('nashik')) responseText = PRESET_RESPONSES.weather;

    // Simulate Ananya AI Typing & Voice response
    setTimeout(async () => {
      setMessages(prev => [...prev, { sender: 'ananya', text: responseText, lang: selectedLang }]);
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3500);

      // Persist to Supabase Database
      await saveAnanyaChatToDB({
        userText: textToSend,
        ananyaResponse: responseText,
        language: selectedLang
      });
      await recordFeatureUsageToDB({
        featureName: 'Ananya AI Assistant',
        action: 'send_message',
        metadata: { userText: textToSend, language: selectedLang }
      });
    }, 600);
  };

  const toggleMic = () => {
    setIsMicActive(!isMicActive);
    if (!isMicActive) {
      setTimeout(() => {
        handleSend("Ananya, how to protect turmeric crop from rhizome rot during monsoon?");
        setIsMicActive(false);
      }, 2500);
    }
  };

  return (
    <section id="ananya-ai" className="py-24 bg-[#02180d] relative overflow-hidden border-b border-emerald-900/40">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-semibold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" /> Meet Your 24/7 AI Farming Companion
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Meet <span className="gradient-text-gold">Ananya AI</span>, Your Farming Companion
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Ananya AI is always in your corner — thoughtful, helpful, and ready to answer questions about pests, prices, weather, and more in the language you speak best.
          </p>
        </div>

        {/* 4 Feature Value Props Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 flex items-start gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-bold text-white">Ask Anything</div>
              <div className="text-[11px] text-slate-400">Crop health, nutrition, pest control or market trends.</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 flex items-start gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Globe className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-bold text-white">22 Languages</div>
              <div className="text-[11px] text-slate-400">Voice and text replies in your native tongue.</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 flex items-start gap-3">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
              <Wifi className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-bold text-white">24/7 & Low Bandwidth</div>
              <div className="text-[11px] text-slate-400">Fast replies even on 2G/3G rural networks.</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 flex items-start gap-3">
            <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs font-bold text-white">Hyper-Personalized</div>
              <div className="text-[11px] text-slate-400">Tailored tips based on your location & crop.</div>
            </div>
          </div>
        </div>

        {/* Interactive Chat Box Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Ananya Avatar Showcase Card */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#06301d] to-[#031d10] border border-emerald-500/40 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-between text-center">
            
            <div className="w-full space-y-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl shadow-amber-400/20 mx-auto">
                  <img
                    src="/assets/ananya_hero_ai.png"
                    alt="Ananya AI Assistant"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/farmer_hologram.jpeg';
                    }}
                  />
                </div>
                <span className="absolute -bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold text-[10px] flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" /> Online
                </span>
              </div>

              <div>
                <h3 className="font-display text-xl font-extrabold text-white">Ananya AI</h3>
                <p className="text-xs text-amber-300 font-medium">Your Native Language Companion</p>
              </div>

              {/* Speaking Voice Equalizer */}
              {isSpeaking && (
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 flex items-center justify-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span className="text-xs font-bold text-amber-300">Speaking in {selectedLang}...</span>
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-1 bg-amber-400 h-full animate-pulse" />
                    <span className="w-1 bg-amber-400 h-2/3 animate-pulse" />
                    <span className="w-1 bg-amber-400 h-full animate-pulse" />
                  </div>
                </div>
              )}

              {/* Language Quick Switcher */}
              <div className="bg-emerald-950/60 p-3 rounded-2xl border border-emerald-800/60 text-left">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Language</div>
                <div className="text-xs font-bold text-emerald-300 flex items-center justify-between">
                  <span>{selectedLang}</span>
                  <span className="text-[10px] text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    22 Supported
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full pt-4 border-t border-emerald-900/50 text-[11px] text-slate-400 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Powered by GrainWise AI Neural Network
            </div>

          </div>

          {/* Chat Window */}
          <div className="lg:col-span-8 bg-[#042013] border border-emerald-800/50 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col h-[520px]">
            
            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    msg.sender === 'user' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-black'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-emerald-950/80 border border-emerald-800/60 text-slate-100 rounded-tl-none shadow-md'
                  }`}>
                    {msg.text}
                    {msg.sender === 'ananya' && (
                      <div className="mt-2 text-[10px] text-amber-400 font-mono flex items-center gap-1 border-t border-emerald-900/60 pt-1">
                        <Volume2 className="w-3 h-3 text-amber-400" /> Audio response available in {msg.lang}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Sample Chips */}
            <div className="py-3 flex items-center gap-2 overflow-x-auto border-t border-emerald-900/60 scrollbar-none">
              <span className="text-[10px] text-slate-400 uppercase font-bold shrink-0">Try Asking:</span>
              {SAMPLE_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1 rounded-full bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-[11px] text-emerald-300 whitespace-nowrap transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={toggleMic}
                className={`p-3 rounded-xl border transition-all ${
                  isMicActive
                    ? 'bg-red-500 border-red-400 text-white animate-pulse'
                    : 'bg-emerald-950 border-emerald-800 text-amber-400 hover:border-amber-400'
                }`}
                title="Voice Input"
              >
                {isMicActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Ask Ananya AI anything in ${selectedLang}...`}
                className="flex-1 bg-emerald-950/90 border border-emerald-700/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />

              <button
                onClick={() => handleSend()}
                className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1 text-xs"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
