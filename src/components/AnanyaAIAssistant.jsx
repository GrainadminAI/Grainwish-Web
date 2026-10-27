import React, { useState, useRef, useEffect } from 'react';
import {
  Bot, Mic, MicOff, Send, Globe, Volume2, Sparkles,
  CheckCircle2, User, Share2, Copy, Check, Pill, Zap,
  Leaf, TrendingUp, Landmark, HelpCircle, ArrowRight, X,
  MessageCircle, Minimize2, RotateCcw
} from 'lucide-react';
import { saveAnanyaChatToDB, recordFeatureUsageToDB } from '../lib/supabase';
import { useLanguage, SUPPORTED_LANGUAGES } from '../lib/LanguageContext';
import {
  ANANYA_CATEGORIES,
  POPULAR_PROMPTS,
  getAnanyaSmartResponse
} from '../lib/ananyaIntelligence';
import {
  INDIAN_LOCALE_MAP,
  VOICE_CADENCE_PRESETS,
  speakWithIndianFemaleVoice,
  stopIndianFemaleSpeech
} from '../lib/ananyaVoiceEngine';

const NATIVE_ANANYA_GREETINGS = {
  English: "Namaste! I am Ananya AI, your 24/7 ICAR-calibrated virtual agronomist. I provide actionable agronomic prescriptions, exact chemical dosages per litre, 100% bio-alternatives, live Mandi rates, and government subsidy guidance in 22 native languages.\n\nHow can I help your farm thrive today?",
  Hindi: "नमस्ते! मैं अनन्या ए.आई. हूँ, आपकी 24/7 प्रमाणित डिजिटल कृषि विशेषज्ञ। मैं फसलों के रोग, कीटनाशक की सही प्रति लीटर मात्रा, 100% जैविक विकल्प, लाइव मंडी भाव और सरकारी योजनाओं की सटीक जानकारी प्रदान करती हूँ।\n\nआज आपकी फसल के लिए क्या सहायता कर सकती हूँ?",
  Marathi: "नमस्कार! मी अनन्या एआय, आपली २४/७ डिजिटल कृषी सल्लागार. पिकांचे रोग, योग्य औषध फवारणी प्रमाण, सेंद्रिय उपाय आणि थेट बाजारभाव याबाबत अचूक मार्गदर्शन मी करते.\n\nआज आपल्या शेतीसाठी मी कशी मदत करू?",
  Tamil: "வணக்கம்! நான் அனன்யா ஏஐ, உங்கள் 24 மணி நேர விவசாய ஆலோசகர். பயிர் நோய்கள், சரியான பூச்சிக்கொல்லி மருந்தளவு, இயற்கை முறைகள் மற்றும் நேரடி மண்டி விலைகள் பற்றிய துல்லியமான வழிகாட்டுதலை வழங்குகிறேன்.\n\nஇன்று உங்கள் பயிருக்கு நான் எவ்வாறு உதவ முடியும்?",
  Telugu: "నమస్కారం! నేను అనన్య AI, మీ 24/7 డిజిటల్ వ్యవసాయ సలహాదారుని. పంట తెగుళ్లు, సరైన మందుల మోతాదులు, సేంద్రీయ పద్ధతులు మరియు లైవ్ మార్కెట్ ధరలపై ఖచ్చితమైన సలహాలు అందిస్తాను.\n\nఈరోజు మీ పంటకు ఎలా సహాయపడగలను?",
  Punjabi: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਅਨੰਨਿਆ ਏ.ਆਈ. ਹਾਂ, ਤੁਹਾਡੀ 24/7 ਖੇਤੀ ਮਾਹਿਰ। ਮੈਂ ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਸਹੀ ਕੀਟਨਾਸ਼ਕ ਮਾਤਰਾ, ਜੈਵਿਕ ਖੇਤੀ ਅਤੇ ਮੰਡੀ ਭਾਵਾਂ ਬਾਰੇ ਸਹੀ ਜਾਣਕਾਰੀ ਦਿੰਦੀ ਹਾਂ।\n\nਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਖੇਤੀ ਲਈ ਕੀ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ?",
  Gujarati: "નમસ્તે! હું અનન્યા એઆઈ છું, આપની 24/7 ડિજિટલ કૃષિ મિત્ર. પાક સંરક્ષણ, યોગ્ય દવાની માત્રા, જૈવિક ઉપાયો અને લાઈવ માર્કેટ યાર્ડના ભાવો અંગે સચોટ માહિતી આપું છું.\n\nઆજે આપના પાક માટે શું મદદ કરી શકું?",
  Bengali: "নমস্কার! আমি অনন্যা এআই, আপনার ২৪/৭ ডিজিটাল কৃষি পরামর্শদাতা। ফসলের রোগ, সঠিক কীটনাশকের মাত্রা, জৈব পদ্ধতি এবং সরাসরি মান্ডি দর সম্পর্কে নির্ভরযোগ্য তথ্য দিই।\n\nআজ আপনার ফসলের জন্য কীভাবে সাহায্য করতে পারি?",
  Kannada: "ನಮಸ್ಕಾರ! ನಾನು ಅನನ್ಯಾ ಎಐ, ನಿಮ್ಮ 24/7 ಡಿಜಿಟಲ್ ಕೃಷಿ ತಜ್ಞೆ. ಬೆಳೆ ರೋಗಗಳು, ಕೀಟನಾಶಕಗಳ ನಿಖರ ಪ್ರಮಾಣ, ಸಾವಯವ ಪದ್ಧತಿಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದರಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡುತ್ತೇನೆ.\n\nಇಂದು ನಿಮ್ಮ ಕೃಷಿಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
  Malayalam: "നമസ്കാരം! ഞാൻ അനന്യ എഐ, നിങ്ങളുടെ 24/7 കാർഷിക സഹായി. വിള രോഗങ്ങൾ, കീടനാശിനി അളവുകൾ, ജൈവ കൃഷി രീതികൾ, ലൈവ് മാർക്കറ്റ് വിലകൾ എന്നിവയെക്കുറിച്ചുള്ള മാർഗ്ഗനിർദ്ദേശം ഞാൻ നൽകുന്നു.\n\nഇന്ന് നിങ്ങളുടെ കൃഷിക്ക് എനിക്ക് എന്ത് സഹಾಯം ചെയ്യാനാകും?",
  Odia: "ନମସ୍କାର! ମୁଁ ଅନନ୍ୟା ଏଆଇ, ଆପଣଙ୍କ ୨୪/୭ ଡିଜିଟାଲ୍ କୃଷି ପରାମର୍ଶଦାତା। ଫସଲ ରୋଗ, କୀଟନାଶକର ସଠିକ୍ ମାତ୍ରା, ଜୈବିକ ଉପଚାର ଏବଂ ମଣ୍ଡି ଦର ବିଷୟରେ ସଠିକ୍ ସୂଚନା ପ୍ରଦାନ କରେ।\n\nଆଜି ଆପଣଙ୍କ ଫସଲ ପାଇଁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?",
  Assamese: "নমস্কাৰ! মই অনন্যা এআই, আপোনাৰ ২৪/৭ ডিজিটেল কৃষি বিশেষজ্ঞ। শস্যৰ ৰোগ, কীটনাশকৰ সঠিক মাত্ৰা, জৈৱিক বিকল্প আৰু লাইভ মাণ্ডিৰ দৰ সম্পৰ্কে সঠিক তথ্য দিওঁ।\n\nআজি আপোনাৰ খেতিৰ বাবে কি সহায় কৰিব পাৰোঁ?",
  Urdu: "نمستے! میں اننیا اے آئی ہوں، آپ کی 24 گھنٹے دستیاب زرعی ماہر۔ میں فصلوں کے امراض، ادویات کے درست تناسب، نامیاتی متبادل اور منڈی کے بھاؤ بتاتی ہوں۔\n\nآج میں آپ کی کھیتی کے لیے کیا مدد کر سکتی ہوں؟",
  Maithili: "प्रणाम! हम अनन्या ए.आई. छी, अहाँक 24/7 डिजिटल कृषि सलाहकार। फसलक रोग, कीटनाशकक सही मात्रा, जैविक उपाय आ मंडी भावक सटीक जानकारी दय छी।",
  Santali: "ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ ᱚᱱᱚᱱᱭᱟ ᱮ.ᱟᱭᱤ, ᱟᱯᱮᱭᱟᱜ ᱒᱔/᱗ ᱪᱟᱥᱵᱟᱥ ᱜᱚᱲᱚᱭᱤᱡ। ᱪᱟᱥ ᱨᱮᱱᱟᱜ ᱵᱮᱢᱟᱨ, ᱨᱟᱱ ᱨᱮᱱᱟᱜ ᱢᱟପ ᱟᱨ ᱡᱚᱛᱚ ᱞᱮᱠᱟᱱ ᱵᱮᱵᱚᱥᱛᱷᱟ ᱤᱧ ᱞᱟᱹᱭᱟ।",
  Kashmiri: "سلام! بَہ چھَس اننیا اے آئی، تُہنٛز 24/7 زراعتٕچ مٲہر۔ فصَلن ہٕندؠ بیمارؠ، کیڑے مار دواہَن ہُنٛد حِساب تہٕ منڈی ہٕندؠ بھاو چھَس دِوان۔",
  Nepali: "नमस्ते! म अनन्या ए.आई. हुँ, तपाईँको २४/७ डिजिटल कृषि सल्लाहकार। बालीनालीका रोगहरू, विषादीको सही मात्रा, जैविक उपचार र बजार भाउबारे म सहयोग गर्छु।",
  Konkani: "नमस्कार! हांव अनन्या ए.आय., तुमी २४/७ डिजिटल शेतकाम सल्लागार. पिकांचे रोग, योग्य प्रमाणांत वखदां, सेंद्रिय उपाय आनी मार्केट भावांची म्हायती दितां.",
  Sindhi: "سلام! مان اننيا اي آءِ آهيان، توهان جي 24/7 زرعي صلاحڪار۔ فصلن جي بيمارين، دوائن جي صحيح مقدار ۽ منڊي اگهن بابت پڇو۔",
  Dogri: "नमस्ते! मैं अनन्य ए.आई. आं, तुंदी 24/7 डिजिटल खेती सलाहकार। फसली दे रोग, कीटनाशक दी सही मात्रा ते मंडी भावै दी पूरी जानकारी दिन्नी आं।",
  Manipuri: "খোৰুমজৰি! ঐহাক অনন্যা এ.আই.নি, নহাক্কী २४/৭ লৌ-উ শিং-উগী পাউতাকপী। মহৈ-মরোংগী লাইনা-শিং, হিদাক-লাংথক্কী চাং অমসুং কৈথেলগী মমলশিংগী পাউ পীরি।",
  Sanskrit: "नमस्ते! अहम् अनन्या ए.आई., भवतः २४/७ डिजिटल-कृषि-परामर्शदात्री। सस्यरोगाणां निवारणम्, औधषाणां सम्यक् मात्रा, जैविकविकल्पाः तथा विपणिमूल्यानि अहम् उपस्थापयामि।"
};

export default function AnanyaAIAssistant({ selectedLang: propLang, setSelectedLang: propSetLang }) {
  const langContext = useLanguage();
  const selectedLang = langContext.selectedLang || propLang || 'English';
  const setSelectedLang = langContext.setSelectedLang || propSetLang;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [voiceCadence] = useState('suitable');
  const [messages, setMessages] = useState([
    {
      sender: 'ananya',
      text: NATIVE_ANANYA_GREETINGS[selectedLang] || NATIVE_ANANYA_GREETINGS.English,
      richData: null,
      lang: selectedLang,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-open floating chat if URL hash is #ananya-ai or when custom event is dispatched
  useEffect(() => {
    const handleCheckHash = () => {
      if (typeof window !== 'undefined' && window.location.hash.toLowerCase() === '#ananya-ai') {
        setIsChatOpen(true);
      }
    };

    handleCheckHash();
    window.addEventListener('hashchange', handleCheckHash);

    const handleCustomOpen = () => setIsChatOpen(true);
    window.addEventListener('open-ananya-ai', handleCustomOpen);

    const handleVoiceOpen = () => {
      setIsChatOpen(true);
      setTimeout(() => {
        toggleMic();
      }, 350);
    };
    window.addEventListener('open-ananya-ai-voice', handleVoiceOpen);

    return () => {
      window.removeEventListener('hashchange', handleCheckHash);
      window.removeEventListener('open-ananya-ai', handleCustomOpen);
      window.removeEventListener('open-ananya-ai-voice', handleVoiceOpen);
    };
  }, []);

  // Confine auto-scroll strictly inside the chat container ONLY when user converses
  useEffect(() => {
    if (messages.length <= 1) return;
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isChatOpen]);

  // Synchronize Ananya AI greeting message when language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'ananya') {
        return [{
          sender: 'ananya',
          text: NATIVE_ANANYA_GREETINGS[selectedLang] || NATIVE_ANANYA_GREETINGS.English,
          richData: null,
          lang: selectedLang,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }];
      }
      return prev;
    });
  }, [selectedLang]);

  // Text-To-Speech Synthesis using Ananya Indian Female Voice Engine
  const speakText = (text, lang) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      stopIndianFemaleSpeech();
      setIsSpeaking(false);
      return;
    }

    const cadence = VOICE_CADENCE_PRESETS[voiceCadence] || VOICE_CADENCE_PRESETS.suitable;

    speakWithIndianFemaleVoice(text, {
      language: lang || selectedLang,
      rate: cadence.rate,
      pitch: cadence.pitch,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const handleClearChat = () => {
    stopIndianFemaleSpeech();
    setIsSpeaking(false);
    setMessages([
      {
        sender: 'ananya',
        text: NATIVE_ANANYA_GREETINGS[selectedLang] || NATIVE_ANANYA_GREETINGS.English,
        richData: null,
        lang: selectedLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSend = (customText, isVoiceQuery = false) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    // Add User Message
    const userMsg = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate High-Efficacy Structured Agronomy Response
    const smartResponse = getAnanyaSmartResponse(textToSend, selectedLang);

    // Simulate Ananya AI Typing & Neural Knowledge Look-Up
    setTimeout(async () => {
      const ananyaMsg = {
        sender: 'ananya',
        text: smartResponse.text,
        richData: smartResponse.data,
        spokenSummary: smartResponse.spokenSummary,
        lang: selectedLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, ananyaMsg]);

      // Automatically speak out the answer with Indian female voice if queried by voice
      if (isVoiceQuery) {
        const textToSpeak = smartResponse.spokenSummary || smartResponse.text;
        speakText(textToSpeak, selectedLang);
      }

      // Persist to Supabase Database
      try {
        await saveAnanyaChatToDB({
          userText: textToSend,
          ananyaResponse: smartResponse.text,
          language: selectedLang
        });
        await recordFeatureUsageToDB({
          featureName: 'Ananya AI Assistant',
          action: 'send_message',
          metadata: {
            userText: textToSend,
            language: selectedLang,
            category: smartResponse.data?.category || 'general'
          }
        });
      } catch (err) {
        console.warn('Chat logging error:', err);
      }
    }, 450);
  };

  const toggleMic = () => {
    const SpeechRec = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (SpeechRec) {
      try {
        if (isMicActive) {
          setIsMicActive(false);
          return;
        }
        const recognition = new SpeechRec();
        recognition.lang = INDIAN_LOCALE_MAP[selectedLang] || 'en-IN';
        recognition.continuous = false;
        recognition.interimResults = false;
        setIsMicActive(true);
        recognition.onresult = (event) => {
          const transcript = event.results[0]?.[0]?.transcript;
          if (transcript) {
            setInputText(transcript);
            handleSend(transcript, true);
          }
          setIsMicActive(false);
        };
        recognition.onerror = () => {
          setIsMicActive(false);
        };
        recognition.onend = () => {
          setIsMicActive(false);
        };
        recognition.start();
        return;
      } catch (e) {
        console.warn('SpeechRecognition exception:', e);
      }
    }

    // Fallback demo query if browser lacks Web Speech API
    setIsMicActive(!isMicActive);
    if (!isMicActive) {
      setTimeout(() => {
        handleSend("How to protect crops from leaf diseases and yellow rust?", true);
        setIsMicActive(false);
      }, 1800);
    }
  };

  const copyToClipboard = (text, index) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    }
  };

  const shareViaWhatsApp = (title, text) => {
    const shareText = encodeURIComponent(
      `🌾 *GrainWise AI — Ananya Agronomy Prescription*\n\n*${title || 'Crop Health Advice'}*\n\n${text}\n\n👉 Diagnose your crops 100% free at https://www.grainwish.com`
    );
    const waUrl = `https://wa.me/?text=${shareText}`;
    if (!window.open(waUrl, '_blank')) {
      window.location.href = waUrl;
    }
  };

  // Filter popular prompts by category
  const filteredPrompts = activeCategory === 'all'
    ? POPULAR_PROMPTS
    : POPULAR_PROMPTS.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Anchor point for Ananya AI navigation without rendering banner */}
      <div id="ananya-ai" className="scroll-mt-20" />

      {/* ============================================================ */}
      {/* 2. Floating Small Icon (Persistent bottom-right widget)     */}
      {/* ============================================================ */}
      {!isChatOpen && (
        <aside
          aria-label="Floating Ananya AI Agronomist Launcher"
          className="fixed bottom-20 md:bottom-6 right-3.5 md:right-6 z-50 flex items-center gap-2 animate-slide-up"
        >
          {/* Subtle Callout Pill on Desktop with Instant Voice Trigger */}
          <button
            onClick={() => {
              setIsChatOpen(true);
              setTimeout(() => toggleMic(), 350);
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#021d11]/95 hover:bg-[#042817] border border-amber-400/60 shadow-xl shadow-black/50 text-xs font-bold text-amber-300 whitespace-nowrap backdrop-blur-md transition-all hover:scale-105 active:scale-95 group touch-manipulation"
          >
            <Mic className="w-3.5 h-3.5 text-amber-400 animate-pulse group-hover:scale-110 transition-transform" />
            <span>Talk to Ananya AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          {/* Small Floating Circular Avatar Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            aria-label="Open Ananya AI 24/7 Virtual Agronomist Chat"
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-emerald-400 to-emerald-600 shadow-2xl shadow-emerald-950/90 transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none touch-manipulation"
          >
            {/* Inner Avatar Image */}
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#02180d] bg-emerald-950 relative">
              <img
                src="/assets/ananya_hero_ai.png"
                alt="Ananya AI Virtual Agronomist"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/assets/ananya_avatar.jpg';
                }}
              />
            </div>

            {/* Sparkle Badge Top-Right */}
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md animate-bounce pointer-events-none">
              <Sparkles className="w-3 h-3 text-black fill-black" />
            </span>

            {/* Online 24/7 Badge Bottom */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] font-black tracking-wider uppercase flex items-center gap-1 shadow-lg border border-emerald-300 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              <span>24/7</span>
            </span>
          </button>
        </aside>
      )}

      {/* ============================================================ */}
      {/* 3. Expandable Floating Chat Window (Glassmorphic Popover)    */}
      {/* ============================================================ */}
      {isChatOpen && (
        <aside
          role="dialog"
          aria-label="Ananya AI 24/7 Virtual Agronomist Chat Window"
          className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 left-3 sm:left-auto sm:w-[430px] h-[580px] max-h-[calc(100vh-100px)] z-50 bg-[#02180d]/98 backdrop-blur-2xl border-2 border-emerald-500/60 rounded-3xl shadow-2xl shadow-black/90 flex flex-col overflow-hidden animate-slide-up"
        >
          {/* Header */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-[#042816] via-[#032012] to-[#02180d] border-b border-emerald-800/70 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-amber-400 shadow-md bg-emerald-950">
                  <img
                    src="/assets/ananya_hero_ai.png"
                    alt="Ananya AI"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.target.src = '/assets/ananya_avatar.jpg';
                    }}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-white truncate">Ananya AI</h3>
                  <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black font-black text-[9px] uppercase tracking-wider">
                    24/7
                  </span>
                </div>
                <p className="text-[10px] text-amber-300 font-medium truncate">
                  Chief Virtual Agronomist · ICAR Certified
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Voice Speaking Indicator & Stop Button */}
              {isSpeaking && (
                <button
                  type="button"
                  onClick={() => { stopIndianFemaleSpeech(); setIsSpeaking(false); }}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-black text-[9.5px] font-black uppercase tracking-wider animate-pulse transition-all active:scale-95 shadow-sm"
                  title="Stop voice speech"
                >
                  <Volume2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Speaking</span>
                </button>
              )}

              {/* 22 Languages Dropdown */}
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-[#032012] border border-emerald-600/70 rounded-lg px-2 py-1 text-[11px] font-bold text-amber-300 focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner max-w-[100px] sm:max-w-[125px] truncate"
                title="Select from 22 Indian Languages"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#032012] text-slate-100">
                    {lang.name}
                  </option>
                ))}
              </select>

              {/* Clear Chat Button */}
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-slate-300 hover:text-amber-400 border border-emerald-800 transition-colors touch-manipulation active:scale-95"
                title="Restart / Clear Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Minimize / Close Button */}
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-slate-300 hover:text-white border border-emerald-800 transition-colors touch-manipulation active:scale-95"
                title="Minimize Chat"
                aria-label="Minimize Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Category Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto px-3 py-2 bg-[#031d10]/90 border-b border-emerald-900/60 scrollbar-none text-[11px] shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 text-slate-300 border border-emerald-800'
              }`}
            >
              🌾 All Topics
            </button>
            {ANANYA_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20'
                    : 'bg-emerald-950/80 hover:bg-emerald-900 text-slate-300 border border-emerald-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Stream Log */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3.5 scrollbar-none text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Sender Avatar Icon */}
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === 'user' ? 'bg-emerald-600 text-white shadow-md' : 'border border-amber-400 shadow-sm'
                }`}>
                  {msg.sender === 'user' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <img
                      src="/assets/ananya_hero_ai.png"
                      alt="Ananya AI Avatar"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.src = '/assets/ananya_avatar.jpg';
                      }}
                    />
                  )}
                </div>

                {/* Message Bubble Container */}
                <div className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-lg ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-gradient-to-b from-[#06331e] to-[#042416] border border-emerald-700/60 text-slate-100 rounded-tl-none space-y-2.5'
                }`}>
                  
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <>
                      {/* Rich Structured Answer Card */}
                      {msg.richData ? (
                        <div className="space-y-2.5">
                          
                          {/* Diagnosis / Prescription Header */}
                          <div className="border-b border-emerald-800/60 pb-2">
                            <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase mb-1">
                              {msg.richData.category}
                            </span>
                            <h4 className="text-xs sm:text-sm font-black text-white">
                              {msg.richData.title}
                            </h4>
                            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                              {msg.richData.summary}
                            </p>
                          </div>

                          {/* Recommended Chemical Control */}
                          <div className="p-2.5 rounded-xl bg-black/60 border border-emerald-700/70 space-y-1 text-[11px]">
                            <div className="text-amber-400 font-extrabold flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                              <Zap className="w-3 h-3 text-amber-400" />
                              <span>{msg.richData.chemicalFix.headline}</span>
                            </div>
                            <div className="text-white font-bold text-xs pt-0.5">
                              {msg.richData.chemicalFix.sprayName}
                            </div>
                            <div className="text-emerald-300 font-mono text-[10px]">
                              <strong>Dilution:</strong> {msg.richData.chemicalFix.dosagePerLiter}
                            </div>
                            <div className="text-amber-200 font-mono text-[9px]">
                              <strong>Tank Mix:</strong> {msg.richData.chemicalFix.acreageFormula}
                            </div>
                            <div className="text-slate-400 text-[9px] italic pt-0.5 border-t border-emerald-900/60">
                              💡 {msg.richData.chemicalFix.applicationTip}
                            </div>
                          </div>

                          {/* Organic / Bio-Alternative */}
                          <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-800/80 space-y-1 text-[11px]">
                            <div className="text-emerald-400 font-extrabold flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                              <Leaf className="w-3 h-3 text-emerald-400" />
                              <span>{msg.richData.organicFix.headline}</span>
                            </div>
                            <div className="text-slate-200 font-semibold text-xs pt-0.5">
                              {msg.richData.organicFix.sprayName}
                            </div>
                            <div className="text-amber-300 font-mono text-[10px]">
                              <strong>Bio-Rate:</strong> {msg.richData.organicFix.dosagePerLiter}
                            </div>
                            <div className="text-slate-400 text-[9px] italic">
                              🌱 {msg.richData.organicFix.applicationTip}
                            </div>
                          </div>

                          {/* Safety & Pre-Harvest Advice */}
                          <div className="p-2 bg-blue-950/40 rounded-xl border border-blue-800/50 text-[10px] text-blue-200 leading-relaxed">
                            <strong>⚠️ Safety &amp; PHI:</strong> {msg.richData.safetyAdvice}
                          </div>

                          {/* Key Metrics Chips */}
                          {msg.richData.keyMetrics && (
                            <div className="grid grid-cols-3 gap-1 pt-0.5 text-center">
                              {msg.richData.keyMetrics.map((met, mIdx) => (
                                <div key={mIdx} className="bg-black/50 p-1.5 rounded-lg border border-emerald-900">
                                  <div className="text-[8px] text-slate-400">{met.label}</div>
                                  <div className="text-amber-300 font-bold text-[10px] mt-0.5 truncate">{met.value}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Interactive Follow-up Question Chips */}
                          {msg.richData.followUps && msg.richData.followUps.length > 0 && (
                            <div className="pt-1.5 border-t border-emerald-900/60 space-y-1">
                              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                <HelpCircle className="w-2.5 h-2.5 text-emerald-400" />
                                <span>Follow-Up Questions:</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {msg.richData.followUps.map((q, qIdx) => (
                                  <button
                                    key={qIdx}
                                    onClick={() => handleSend(q)}
                                    className="px-2 py-0.5 rounded-md bg-emerald-950 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-800/80 text-[10px] font-medium flex items-center gap-1 transition-colors text-left touch-manipulation"
                                  >
                                    <span>{q}</span>
                                    <ArrowRight className="w-2 h-2 text-amber-400 shrink-0" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      ) : (
                        /* Plain Fallback Text */
                        <div className="whitespace-pre-wrap leading-relaxed text-slate-200 text-xs">
                          {msg.text}
                        </div>
                      )}

                      {/* Action Bar: Listen (Voice), Copy, WhatsApp */}
                      <div className="flex items-center justify-between border-t border-emerald-900/70 pt-1.5 text-[9px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => speakText(msg.spokenSummary || msg.text, msg.lang || selectedLang)}
                            className={`px-2 py-0.5 rounded flex items-center gap-1 border transition-colors touch-manipulation active:scale-95 ${
                              isSpeaking
                                ? 'bg-amber-400 text-black border-amber-300 font-bold'
                                : 'bg-emerald-950 hover:bg-emerald-900 text-slate-300 hover:text-white border border-emerald-800'
                            }`}
                            title="Listen to Ananya's voice prescription"
                          >
                            <Volume2 className={`w-2.5 h-2.5 ${isSpeaking ? 'animate-bounce text-black' : 'text-amber-400'}`} />
                            <span>{isSpeaking ? 'Stop Voice' : 'Listen'}</span>
                          </button>

                          <button
                            onClick={() => copyToClipboard(msg.text, i)}
                            className="px-2 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-slate-300 hover:text-white flex items-center gap-1 border border-emerald-800 transition-colors touch-manipulation"
                            title="Copy answer"
                          >
                            {copiedIndex === i ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                            <span>{copiedIndex === i ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <button
                          onClick={() => shareViaWhatsApp(msg.richData?.title, msg.text)}
                          className="px-2 py-0.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white flex items-center gap-1 font-bold transition-colors touch-manipulation"
                          title="Share on WhatsApp"
                        >
                          <Share2 className="w-2.5 h-2.5" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </>
                  )}

                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Sample Prompts Carousel */}
          <div className="px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto border-t border-emerald-900/60 bg-[#031d10]/95 scrollbar-none shrink-0">
            <span className="text-[9px] text-slate-400 uppercase font-bold shrink-0">Try:</span>
            {filteredPrompts.slice(0, 5).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.text)}
                className="px-2.5 py-0.5 rounded-full bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-[10px] text-emerald-300 hover:text-white whitespace-nowrap transition-colors touch-manipulation shrink-0"
              >
                {prompt.text}
              </button>
            ))}
          </div>

          {/* Active Listening Voice Banner */}
          {isMicActive && (
            <div className="px-3 py-2 bg-gradient-to-r from-red-950/90 via-amber-950/70 to-red-950/90 border-t border-red-500/60 flex items-center justify-between gap-2 text-xs shrink-0 animate-pulse">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                </span>
                <Mic className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>Listening in {selectedLang}... Speak now</span>
              </div>
              <button
                onClick={toggleMic}
                className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white font-extrabold text-[10px] uppercase tracking-wider active:scale-95 transition-all"
              >
                Stop
              </button>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-2.5 bg-[#02180d] border-t border-emerald-800/60 flex items-center gap-1.5 shrink-0">
            <button
              onClick={toggleMic}
              className={`p-2.5 rounded-xl border transition-all touch-manipulation shrink-0 ${
                isMicActive
                  ? 'bg-red-500 border-red-400 text-white animate-pulse'
                  : 'bg-emerald-950 border-emerald-800 text-amber-400 hover:border-amber-400'
              }`}
              title="Voice Query Input"
              aria-label="Voice Query Input"
            >
              {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask in ${selectedLang}...`}
              className="flex-1 bg-emerald-950/90 border border-emerald-700/50 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
            />

            <button
              onClick={() => handleSend()}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1 text-xs touch-manipulation shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
