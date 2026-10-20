import React, { useState, useRef, useEffect } from 'react';
import {
  Bot, Mic, MicOff, Send, Globe, Volume2, VolumeX, Sparkles,
  CheckCircle2, Wifi, MessageSquare, User, Database, Share2, Copy,
  Check, Pill, ShieldAlert, Zap, Leaf, TrendingUp, Landmark,
  CloudRain, HelpCircle, ArrowRight, CornerDownLeft
} from 'lucide-react';
import { saveAnanyaChatToDB, recordFeatureUsageToDB } from '../lib/supabase';
import { useLanguage } from '../lib/LanguageContext';
import {
  ANANYA_CATEGORIES,
  POPULAR_PROMPTS,
  getAnanyaSmartResponse
} from '../lib/ananyaIntelligence';

import {
  INDIAN_LOCALE_MAP,
  VOICE_CADENCE_PRESETS,
  getIndianFemaleVoice,
  speakWithIndianFemaleVoice,
  stopIndianFemaleSpeech
} from '../lib/ananyaVoiceEngine';
import { SUPPORTED_LANGUAGES } from '../lib/LanguageContext';

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
  Santali: "ᱡᱚᱦᱟᱨ! ᱤᱧ ᱫᱚ ᱚᱱᱚᱱᱭᱟ ᱮ.ᱟᱭᱤ, ᱟᱯᱮᱭᱟᱜ ᱒᱔/᱗ ᱪᱟᱥᱵᱟᱥ ᱜᱚᱲᱚᱭᱤᱡ। ᱪᱟᱥ ᱨᱮᱱᱟᱜ ᱵᱮᱢᱟᱨ, ᱨᱟᱱ ᱨᱮᱱᱟᱜ ᱢᱟᱯ ᱟᱨ ᱡᱚᱛᱚ ᱞᱮᱠᱟᱱ ᱵᱮᱵᱚᱥᱛᱷᱟ ᱤᱧ ᱞᱟᱹᱭᱟ।",
  Kashmiri: "سلام! بَہ چھَس اننیا اے آئی، تُہنٛز 24/7 زراعتٕچ مٲہر۔ فصَلن ہٕندؠ بیمارؠ، کیڑے مار دواہَن ہُنٛد حِساب تہٕ منڈی ہٕندؠ بھاو چھَس دِوان۔",
  Nepali: "नमस्ते! म अनन्या ए.आई. हुँ, तपाईँको २४/७ डिजिटल कृषि सल्लाहकार। बालीनालीका रोगहरू, विषादीको सही मात्रा, जैविक उपचार र बजार भाउबारे म सहयोग गर्छु।",
  Konkani: "नमस्कार! हांव अनन्या ए.आय., तुमी २४/७ डिजिटल शेतकाम सल्लागार. पिकांचे रोग, योग्य प्रमाणांत वखदां, सेंद्रिय उपाय आनी मार्केट भावांची म्हायती दितां.",
  Sindhi: "سلام! مان اننيا اي آءِ آهيان، توهان جي 24/7 زرعي صلاحڪار۔ فصلن جي بيمارين، دوائن جي صحيح مقدار ۽ منڊي اگهن بابت پڇو۔",
  Dogri: "नमस्ते! मैं अनन्य ए.आई. आं, तुंदी 24/7 डिजिटल खेती सलाहकार। फसली दे रोग, कीटनाशक दी सही मात्रा ते मंडी भावै दी पूरी जानकारी दिन्नी आं।",
  Manipuri: "খোৰুমজৰি! ঐহাক অনন্যা এ.আই.নি, নহাক্কী ২৪/৭ লৌ-উ শিং-উগী পাউতাকপী। মহৈ-মরোংগী লাইনা-শিং, হিদাক-লাংথক্কী চাং অমসুং কৈথেলগী মমলশিংগী পাউ পীরি।",
  Sanskrit: "नमस्ते! अहम् अनन्या ए.आई., भवतः २४/७ डिजिटल-कृषि-परामर्शदात्री। सस्यरोगाणां निवारणम्, औधषाणां सम्यक् मात्रा, जैविकविकल्पाः तथा विपणिमूल्यानि अहम् उपस्थापयामि।"
};

export default function AnanyaAIAssistant({ selectedLang: propLang, setSelectedLang: propSetLang }) {
  const langContext = useLanguage();
  const selectedLang = langContext.selectedLang || propLang || 'English';
  const setSelectedLang = langContext.setSelectedLang || propSetLang;
  const t = langContext.t;

  const [activeCategory, setActiveCategory] = useState('all');
  const [voiceCadence, setVoiceCadence] = useState('suitable'); // 'sweet' (0.76x) | 'suitable' (0.82x) | 'standard' (0.90x)
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
  const [activeVoiceInfo, setActiveVoiceInfo] = useState(() => getIndianFemaleVoice(selectedLang));
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Confine auto-scroll strictly inside the chat container ONLY when user converses (never scroll window on mount)
  useEffect(() => {
    if (messages.length <= 1) return;

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

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

  // Synchronize Indian Female Voice engine with system available voices
  useEffect(() => {
    const refreshVoice = () => {
      const resolved = getIndianFemaleVoice(selectedLang);
      setActiveVoiceInfo(resolved);
    };

    refreshVoice();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = refreshVoice;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedLang]);

  // Text-To-Speech Synthesis using Ananya Indian Female Voice Engine with Gentle/Suitable Cadence
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
      onStart: (voiceInfo) => {
        setIsSpeaking(true);
        if (voiceInfo) setActiveVoiceInfo(voiceInfo);
      },
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  // Preview Ananya's Indian Female Voice with regional greeting
  const handleVoicePreview = () => {
    if (isSpeaking) {
      stopIndianFemaleSpeech();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = NATIVE_ANANYA_GREETINGS[selectedLang] || NATIVE_ANANYA_GREETINGS.English;
    speakText(textToSpeak, selectedLang);
  };

  const handleSend = (customText) => {
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

      // Automatically speak summary for accessibility if voice mode preferred
      speakText(smartResponse.spokenSummary, selectedLang);

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
            handleSend(transcript);
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
        handleSend("How to protect crops from leaf diseases and yellow rust?");
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
    <section id="ananya-ai" className="py-10 sm:py-16 md:py-20 bg-[#02180d] relative overflow-hidden border-b border-emerald-900/40">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3.5">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-[11px] sm:text-xs font-bold text-amber-300 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>ICAR &amp; CIBRC Calibrated Agronomy Intelligence</span>
            <span className="bg-amber-400 text-black px-1.5 sm:px-2 py-0.5 rounded-full font-mono text-[9px] sm:text-[10px] font-black uppercase">
              100% Verified Rx
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Meet <span className="gradient-text-gold">Ananya AI</span>, Your 24/7 Virtual Agronomist
          </h2>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Get instant actionable prescriptions with exact chemical dilution rates per litre, 100% biological alternatives, live Mandi rates, and government subsidies in <strong>22 Indian languages</strong>.
          </p>
        </div>

        {/* 4 Feature Value Props Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-5 sm:mb-8">
          <div className="p-2.5 sm:p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 flex items-start gap-2 sm:gap-3 shadow-md">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <Pill className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Dual-Track Rx</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Approved chemical doses + organic bio-alternatives.</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 flex items-start gap-2.5 sm:gap-3 shadow-md">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">22 Indian Languages</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Voice and text in Hindi, Tamil, Marathi &amp; more.</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 flex items-start gap-2.5 sm:gap-3 shadow-md">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Live Mandi &amp; MSP</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">Real-time APMC prices with moisture thresholds.</div>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-[#042013] border border-emerald-800/50 flex items-start gap-2.5 sm:gap-3 shadow-md">
            <span className="p-2 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
              <Landmark className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">Govt Subsidies</div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">PM-KUSUM 90% solar, PM-KSY drip &amp; KCC loans.</div>
            </div>
          </div>
        </div>

        {/* Interactive Chat Box Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Ananya Avatar Showcase Card */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#06301d] via-[#042516] to-[#02180d] border border-emerald-500/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 shadow-2xl flex flex-col justify-between text-center relative overflow-hidden">
            
            <div className="w-full space-y-3 sm:space-y-4">
              
              {/* Avatar Portrait with High-Resolution User Image */}
              <div className="relative inline-block mx-auto mt-1 sm:mt-2">
                <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400 shadow-2xl shadow-amber-400/30 mx-auto ring-4 ring-emerald-500/30 bg-emerald-950">
                  <img
                    src="/assets/ananya_hero_ai.png"
                    alt="Ananya AI 24/7 Virtual Agronomist in Indian Wheat Field"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/ananya_avatar.jpg';
                    }}
                  />
                </div>

                {/* Online Badge */}
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-black font-black text-[10px] flex items-center gap-1.5 shadow-lg border border-emerald-300 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping shrink-0" />
                  <span>Online 24/7</span>
                </span>
              </div>

              <div className="pt-2">
                <h3 className="font-display text-xl sm:text-2xl font-black text-white">Ananya AI</h3>
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mt-0.5">
                  Chief Virtual Agronomist &amp; Companion
                </p>
                <div className="mt-1 text-[11px] text-emerald-400 font-mono flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% CIBRC &amp; ICAR Scientific Knowledge</span>
                </div>
              </div>

              {/* Indian Female Voice Engine Card */}
              <div className="bg-[#02180d]/90 p-3 sm:p-3.5 rounded-2xl border border-amber-500/40 text-left space-y-2.5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-xs font-extrabold text-amber-300">Indian Female Voice</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                    {activeVoiceInfo?.voiceName || 'Calibrated Indian Female'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 leading-tight">
                  Authentic Indian cadence &amp; pronunciation calibrated for agricultural terms &amp; 22 languages.
                </div>

                {/* Voice Status Indicator / Equalizer or Action Buttons */}
                {isSpeaking ? (
                  <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-400/50 flex items-center justify-between gap-2 animate-pulse">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-xs font-bold text-amber-300">Speaking in {selectedLang}...</span>
                      <div className="flex items-center gap-0.5 h-3.5">
                        <span className="w-1 bg-amber-400 h-full animate-pulse" />
                        <span className="w-1 bg-amber-400 h-1/2 animate-pulse" />
                        <span className="w-1 bg-amber-400 h-3/4 animate-pulse" />
                      </div>
                    </div>
                    <button
                      onClick={() => speakText('', selectedLang)}
                      className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-extrabold text-[10px] hover:bg-amber-300 transition-colors shadow"
                    >
                      Stop
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleVoicePreview}
                      className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 touch-manipulation"
                      title="Preview Indian Female Voice"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Preview Voice</span>
                    </button>
                    <button
                      onClick={() => speakText(messages[messages.length - 1]?.spokenSummary || messages[messages.length - 1]?.text, selectedLang)}
                      className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 text-[11px] font-bold text-emerald-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 touch-manipulation"
                      title="Hear Last Answer Spoken Aloud"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Hear Answer</span>
                    </button>
                  </div>
                )}
                {/* Voice Cadence / Pace Selector */}
                <div className="pt-2 border-t border-amber-500/30 flex items-center justify-between text-[10px]">
                  <span className="text-amber-200/80 font-bold">Speech Speed:</span>
                  <div className="inline-flex rounded-lg bg-black/60 p-0.5 border border-emerald-800">
                    <button
                      onClick={() => setVoiceCadence('sweet')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        voiceCadence === 'sweet'
                          ? 'bg-amber-400 text-black shadow-sm font-extrabold'
                          : 'text-slate-400 hover:text-amber-300'
                      }`}
                      title="Gentle, sweet and relaxed speech rate (0.76x)"
                    >
                      Sweet (0.76x)
                    </button>
                    <button
                      onClick={() => setVoiceCadence('suitable')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        voiceCadence === 'suitable'
                          ? 'bg-emerald-500 text-black shadow-sm font-extrabold'
                          : 'text-slate-400 hover:text-emerald-300'
                      }`}
                      title="Suitable, clear and comfortable speech rate (0.82x)"
                    >
                      Suitable (0.82x)
                    </button>
                    <button
                      onClick={() => setVoiceCadence('standard')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                        voiceCadence === 'standard'
                          ? 'bg-emerald-600 text-white shadow-sm font-extrabold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Standard speech rate (0.90x)"
                    >
                      0.90x
                    </button>
                  </div>
                </div>
              </div>

              {/* Active 22-Language Selector Box - Updates Entire Page */}
              <div className="bg-black/50 p-3 rounded-2xl border border-emerald-800/60 text-left space-y-1.5 shadow-md">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-amber-400" />
                    <span>Language &amp; Voice Dialect</span>
                  </span>
                  <span className="text-amber-400 font-mono text-[9px] bg-amber-500/20 px-1.5 py-0.5 rounded font-extrabold">
                    22 Languages
                  </span>
                </div>

                <select
                  value={selectedLang}
                  onChange={(e) => {
                    const newLang = e.target.value;
                    setSelectedLang(newLang);
                  }}
                  className="w-full bg-[#032012] border border-emerald-600/70 rounded-xl px-2.5 py-2 text-xs font-extrabold text-amber-300 focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-[#032012] text-slate-100">
                      {lang.name} ({lang.native})
                    </option>
                  ))}
                </select>

                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-0.5">
                  <span>BCP-47: {INDIAN_LOCALE_MAP[selectedLang] || 'en-IN'}</span>
                  <span className="text-emerald-400 font-semibold">Entire App Synced</span>
                </div>
              </div>

              {/* Expertise Highlights */}
              <div className="text-[11px] text-slate-300 text-left space-y-1 pt-1 bg-emerald-950/30 p-3 rounded-2xl border border-emerald-900/50">
                <div className="font-bold text-white text-[11px] mb-1">Ananya's Core Specializations:</div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-emerald-400">✓</span> Exact chemical dosages per litre of water
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-emerald-400">✓</span> Biological &amp; organic IPM bio-controls
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-emerald-400">✓</span> Pre-harvest safety intervals (PHI)
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-emerald-400">✓</span> Split NPK, Urea &amp; Micronutrients
                </div>
              </div>

            </div>

            <div className="w-full pt-4 border-t border-emerald-900/60 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>GrainWise AI Multi-Modal Engine</span>
            </div>

          </div>

          {/* Chat Window Showcase */}
          <div className="lg:col-span-8 bg-[#042013] border border-emerald-800/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-2xl flex flex-col h-[460px] sm:h-[560px] md:h-[640px]">
            
            {/* Category Quick Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-2 border-b border-emerald-900/60 scrollbar-none text-xs">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
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
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
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
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-1.5 sm:pr-2 scrollbar-none">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 sm:gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Sender Avatar Icon */}
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-2xl overflow-hidden flex items-center justify-center text-xs font-bold shrink-0 ${
                    msg.sender === 'user' ? 'bg-emerald-600 text-white shadow-md' : 'border border-amber-400 shadow-sm'
                  }`}>
                    {msg.sender === 'user' ? (
                      <User className="w-4 h-4" />
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
                  <div className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-gradient-to-b from-[#06331e] to-[#042416] border border-emerald-700/60 text-slate-100 rounded-tl-none space-y-3'
                  }`}>
                    
                    {msg.sender === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <>
                        {/* Rich Structured Answer Card */}
                        {msg.richData ? (
                          <div className="space-y-3">
                            
                            {/* Diagnosis / Prescription Header */}
                            <div className="border-b border-emerald-800/60 pb-2.5">
                              <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase mb-1">
                                {msg.richData.category}
                              </span>
                              <h4 className="text-sm sm:text-base font-black text-white">
                                {msg.richData.title}
                              </h4>
                              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                                {msg.richData.summary}
                              </p>
                            </div>

                            {/* Recommended Chemical Control */}
                            <div className="p-3 rounded-xl bg-black/60 border border-emerald-700/70 space-y-1 text-xs">
                              <div className="text-amber-400 font-extrabold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                                <Zap className="w-3.5 h-3.5 text-amber-400" />
                                <span>{msg.richData.chemicalFix.headline}</span>
                              </div>
                              <div className="text-white font-bold text-xs pt-0.5">
                                {msg.richData.chemicalFix.sprayName}
                              </div>
                              <div className="text-emerald-300 font-mono text-[11px]">
                                <strong>Dilution Rate:</strong> {msg.richData.chemicalFix.dosagePerLiter}
                              </div>
                              <div className="text-amber-200 font-mono text-[10px]">
                                <strong>Tank Mix:</strong> {msg.richData.chemicalFix.acreageFormula}
                              </div>
                              <div className="text-slate-400 text-[10px] italic pt-1 border-t border-emerald-900/60">
                                💡 {msg.richData.chemicalFix.applicationTip}
                              </div>
                            </div>

                            {/* Organic / Bio-Alternative */}
                            <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/80 space-y-1 text-xs">
                              <div className="text-emerald-400 font-extrabold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{msg.richData.organicFix.headline}</span>
                              </div>
                              <div className="text-slate-200 font-semibold text-xs pt-0.5">
                                {msg.richData.organicFix.sprayName}
                              </div>
                              <div className="text-amber-300 font-mono text-[10px]">
                                <strong>Bio-Rate:</strong> {msg.richData.organicFix.dosagePerLiter}
                              </div>
                              <div className="text-slate-400 text-[10px] italic">
                                🌱 {msg.richData.organicFix.applicationTip}
                              </div>
                            </div>

                            {/* Safety & Pre-Harvest Advice */}
                            <div className="p-2.5 bg-blue-950/40 rounded-xl border border-blue-800/50 text-[11px] text-blue-200 leading-relaxed">
                              <strong>⚠️ Safety &amp; Spray Timing:</strong> {msg.richData.safetyAdvice}
                            </div>

                            {/* Key Metrics Chips */}
                            {msg.richData.keyMetrics && (
                              <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                                {msg.richData.keyMetrics.map((met, mIdx) => (
                                  <div key={mIdx} className="bg-black/50 p-2 rounded-xl border border-emerald-900">
                                    <div className="text-[9px] text-slate-400">{met.label}</div>
                                    <div className="text-amber-300 font-bold text-[11px] mt-0.5 truncate">{met.value}</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Interactive Follow-up Question Chips */}
                            {msg.richData.followUps && msg.richData.followUps.length > 0 && (
                              <div className="pt-2 border-t border-emerald-900/60 space-y-1.5">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                  <HelpCircle className="w-3 h-3 text-emerald-400" />
                                  <span>Recommended Follow-Up Questions:</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {msg.richData.followUps.map((q, qIdx) => (
                                    <button
                                      key={qIdx}
                                      onClick={() => handleSend(q)}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-800/80 text-[11px] font-medium flex items-center gap-1 transition-colors text-left"
                                    >
                                      <span>{q}</span>
                                      <ArrowRight className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        ) : (
                          /* Plain Fallback Text */
                          <div className="whitespace-pre-wrap leading-relaxed text-slate-200">
                            {msg.text}
                          </div>
                        )}

                        {/* Action Bar: Listen Audio, Copy, WhatsApp */}
                        <div className="flex items-center justify-between border-t border-emerald-900/70 pt-2 text-[10px] text-slate-400">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => speakText(msg.spokenSummary || msg.text, msg.lang)}
                              className="px-2 py-1 rounded-md bg-emerald-950 hover:bg-emerald-900 text-amber-300 flex items-center gap-1.5 border border-emerald-800 transition-colors shadow-sm"
                              title="Listen to response in Indian Female Voice"
                            >
                              <Volume2 className={`w-3 h-3 text-amber-400 ${isSpeaking ? 'animate-bounce' : ''}`} />
                              <span>{isSpeaking ? 'Stop Voice' : `Listen (${msg.lang} Indian Female)`}</span>
                            </button>

                            <button
                              onClick={() => copyToClipboard(msg.text, i)}
                              className="px-2 py-1 rounded-md bg-emerald-950 hover:bg-emerald-900 text-slate-300 hover:text-white flex items-center gap-1 border border-emerald-800 transition-colors"
                              title="Copy answer"
                            >
                              {copiedIndex === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedIndex === i ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>

                          <button
                            onClick={() => shareViaWhatsApp(msg.richData?.title, msg.text)}
                            className="px-2 py-1 rounded-md bg-emerald-800 hover:bg-emerald-700 text-white flex items-center gap-1 font-bold transition-colors"
                            title="Share on WhatsApp"
                          >
                            <Share2 className="w-3 h-3" />
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
            <div className="py-2.5 flex items-center gap-1.5 overflow-x-auto border-t border-emerald-900/60 scrollbar-none">
              <span className="text-[10px] text-slate-400 uppercase font-bold shrink-0">Try Asking:</span>
              {filteredPrompts.slice(0, 5).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  className="px-3 py-1 rounded-full bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-[11px] text-emerald-300 hover:text-white whitespace-nowrap transition-colors flex items-center gap-1 touch-manipulation"
                >
                  <span>{prompt.text}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={toggleMic}
                className={`p-3 rounded-xl border transition-all touch-manipulation ${
                  isMicActive
                    ? 'bg-red-500 border-red-400 text-white animate-pulse'
                    : 'bg-emerald-950 border-emerald-800 text-amber-400 hover:border-amber-400'
                }`}
                title="Voice Query Input"
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
                className="px-4 sm:px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-1.5 text-xs touch-manipulation shrink-0"
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
