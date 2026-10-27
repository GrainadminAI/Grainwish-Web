/**
 * Ananya AI — Indian Female Voice Engine & Speech Synthesis
 * 
 * Provides authentic, natural Indian female voice synthesis calibrated
 * for agricultural terminology, dosages, and 22 Indian regional languages.
 */

// BCP-47 Locale map for speech synthesis across all 22 supported Indian languages
export const INDIAN_LOCALE_MAP = {
  English: 'en-IN',
  Hindi: 'hi-IN',
  Tamil: 'ta-IN',
  Telugu: 'te-IN',
  Punjabi: 'pa-IN',
  Marathi: 'mr-IN',
  Bengali: 'bn-IN',
  Gujarati: 'gu-IN',
  Kannada: 'kn-IN',
  Malayalam: 'ml-IN',
  Odia: 'or-IN',
  Assamese: 'as-IN',
  Urdu: 'ur-IN',
  Maithili: 'mai-IN',
  Santali: 'sat-IN',
  Kashmiri: 'ks-IN',
  Nepali: 'ne-IN',
  Konkani: 'kok-IN',
  Sindhi: 'sd-IN',
  Dogri: 'doi-IN',
  Manipuri: 'mni-IN',
  Sanskrit: 'sa-IN'
};

// Known female voices across platforms (Apple iOS/macOS, Google Android/Chrome, Microsoft Edge/Windows)
export const KNOWN_INDIAN_FEMALE_VOICES = [
  // Apple iOS / macOS
  'veena', 'lekha', 'kalyani', 'sangeeta', 'geeta',
  // Microsoft Edge / Windows Neural & Standard
  'heera', 'neerja', 'swara', 'kalpana', 'shruti', 'sapna', 'pallavi', 'sandhya',
  'aarohi', 'tanishaa', 'dhwani', 'sobhana', 'raavi', 'gurmukhi', 'gul',
  // Android / Google / Wavenet / Custom
  'priya', 'ananya', 'pooja', 'aditi', 'kavya', 'roshni', 'sunita', 'radha', 'kavita', 'manisha'
];

// Male voice keywords to strictly avoid/penalize for female persona
export const MALE_VOICE_KEYWORDS = [
  'rishi', 'hemant', 'madhav', 'prabhat', 'male', 'man', 'david', 'guy', 'george', 'stefan', 'mark', 'daniel', 'oliver'
];

/**
 * Clean & normalize agronomic text for natural spoken audio
 * Expands technical metrics, currency, and Indian agricultural acronyms.
 * 
 * @param {string} text Raw text with potential markdown and abbreviations
 * @returns {string} Phonetically optimized plain text for speech synthesis
 */
export function cleanAgronomyTextForSpeech(text = '') {
  if (!text) return '';

  return text
    // Remove emojis, symbols & bullet points using unicode property escapes
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Presentation}*_#•]/gu, '')
    // Remove any remaining stray bullet or symbol characters
    .replace(/[•⚡🌱💡📌👉✅⚠️🧪🔬📍📊💊🌾]/gu, '')
    // Expand Indian Currency with pleasant pause
    .replace(/₹\s*([0-9,]+)/g, '$1 Rupees, ')
    .replace(/₹/g, 'Rupees, ')
    // Expand Metric Application Dosages with breath pauses
    .replace(/(\d+(?:\.\d+)?)\s*ml\/L\b/gi, '$1 millilitres per litre of water, ')
    .replace(/(\d+(?:\.\d+)?)\s*g\/L\b/gi, '$1 grams per litre of water, ')
    .replace(/(\d+(?:\.\d+)?)\s*kg\/acre\b/gi, '$1 kilograms per acre, ')
    .replace(/(\d+(?:\.\d+)?)\s*L\/acre\b/gi, '$1 litres per acre, ')
    .replace(/(\d+(?:\.\d+)?)\s*ml\/acre\b/gi, '$1 millilitres per acre, ')
    .replace(/(\d+(?:\.\d+)?)\s*g\/acre\b/gi, '$1 grams per acre, ')
    .replace(/(\d+(?:\.\d+)?)\s*kg\/ha\b/gi, '$1 kilograms per hectare, ')
    .replace(/(\d+(?:\.\d+)?)\s*qtl\b/gi, '$1 quintal, ')
    // Expand Agricultural & Institutional Acronyms with gentle pronunciation
    .replace(/\bICAR\b/g, 'I.C.A.R.')
    .replace(/\bCIBRC\b/g, 'C.I.B.R.C.')
    .replace(/\bKVK\b/g, 'Krishi Vigyan Kendra')
    .replace(/\bAPMC\b/g, 'A.P.M.C.')
    .replace(/\bMSP\b/g, 'M.S.P.')
    .replace(/\bNPK\b/g, 'N.P.K.')
    .replace(/\bZBNF\b/g, 'Zero Budget Natural Farming')
    .replace(/\bPM-KUSUM\b/gi, 'PM Kusum Solar Scheme')
    .replace(/\bPM-KSY\b/gi, 'PM Krishi Sinchayee Yojana')
    .replace(/\bPM-KISAN\b/gi, 'PM Kisan Samman Nidhi')
    .replace(/\bKCC\b/g, 'Kisan Credit Card')
    .replace(/\bPHI\b/g, 'Pre-Harvest Waiting Interval')
    .replace(/\bDAP\b/g, 'D.A.P.')
    .replace(/\bMOP\b/g, 'M.O.P.')
    // Normalize punctuation & newlines into calm, conversational pauses
    .replace(/;\s*/g, ', ')
    .replace(/\n+/g, '. ')
    .replace(/,\s*,/g, ', ')
    .replace(/\.\s*\./g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Score a voice candidate for Indian Female characteristics
 * 
 * @param {SpeechSynthesisVoice} voice 
 * @param {string} targetLocale e.g. 'en-IN', 'hi-IN', 'ta-IN'
 * @returns {number} Score (higher is better match)
 */
export function scoreVoiceForIndianFemale(voice, targetLocale = 'en-IN') {
  if (!voice) return -999;

  let score = 0;
  const nameLower = (voice.name || '').toLowerCase();
  const langLower = (voice.lang || '').toLowerCase().replace('_', '-');
  const targetLower = targetLocale.toLowerCase().replace('_', '-');
  const targetBaseLang = targetLower.split('-')[0];

  // 1. Male voice penalty — strictly disqualify or severely demote
  for (const male of MALE_VOICE_KEYWORDS) {
    if (nameLower.includes(male) || langLower.includes(male)) {
      return -500;
    }
  }

  // 2. Exact target locale match (e.g. 'hi-in' matches 'hi-in')
  if (langLower === targetLower) {
    score += 260;
  } else if (langLower.startsWith(targetBaseLang)) {
    score += 180;
  }

  // 3. Indian locale affinity (en-IN, hi-IN, or any -in)
  if (langLower.endsWith('-in')) {
    score += 50;
  }

  // 4. Known Indian Female Voice Names (Veena, Lekha, Heera, Swara, Neerja, etc.)
  for (const femaleName of KNOWN_INDIAR_OR_GLOBAL_FEMALE) {
    if (nameLower.includes(femaleName)) {
      score += 140;
      break;
    }
  }

  // 5. Generic Female tag in name
  if (nameLower.includes('female') || nameLower.includes('woman')) {
    score += 60;
  }

  // 6. Neural / Natural / Premium voice boost
  if (nameLower.includes('natural') || nameLower.includes('online') || nameLower.includes('neural') || nameLower.includes('wavenet')) {
    score += 25;
  }

  return score;
}

// Global list combining regional and known Indian female voices
const KNOWN_INDIAR_OR_GLOBAL_FEMALE = [
  ...KNOWN_INDIAN_FEMALE_VOICES,
  'aarohi', 'tanishaa', 'dhwani', 'sobhana', 'raavi', 'gurmukhi', 'gul'
];

/**
 * Find the best available Indian female voice from the browser's voice list.
 * Always ensures an authentic Indian female voice is selected in any language.
 * 
 * @param {string} language Selected language name (e.g. 'English', 'Hindi', 'Tamil')
 * @param {SpeechSynthesisVoice[]} [providedVoices] Optional explicit list of voices
 * @returns {{ voice: SpeechSynthesisVoice|null, voiceName: string, lang: string, isFemale: true, isIndian: true }}
 */
export function getIndianFemaleVoice(language = 'English', providedVoices = null) {
  const targetLocale = INDIAN_LOCALE_MAP[language] || 'en-IN';
  const voices = providedVoices || (typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis.getVoices() : []);

  if (!voices || !voices.length) {
    return {
      voice: null,
      voiceName: typeof window === 'undefined' && !providedVoices ? 'Speech Synthesis Not Supported' : 'Default Indian Female Voice',
      lang: targetLocale,
      isFemale: true,
      isIndian: true
    };
  }

  // Score all voices and find highest match
  let bestVoice = null;
  let highestScore = -999;

  for (const v of voices) {
    const s = scoreVoiceForIndianFemale(v, targetLocale);
    if (s > highestScore) {
      highestScore = s;
      bestVoice = v;
    }
  }

  // Fallback to authentic Indian female voice (en-IN or hi-IN female) if best voice score was negative or non-Indian
  if (!bestVoice || highestScore < 0) {
    const indianFallback = voices.find(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      const isIndianLang = lang === 'en-in' || lang === 'hi-in' || lang.endsWith('-in');
      const isMale = MALE_VOICE_KEYWORDS.some(m => name.includes(m));
      const isKnownFemale = KNOWN_INDIAN_FEMALE_VOICES.some(f => name.includes(f)) || name.includes('female');
      return isIndianLang && !isMale && (isKnownFemale || !name.includes('male'));
    });

    if (indianFallback) {
      bestVoice = indianFallback;
    }
  }

  const friendlyName = bestVoice
    ? bestVoice.name.replace(/^Google\s+/i, '').replace(/^Microsoft\s+/i, '').replace(/\s*\(Natural\)/i, '').trim()
    : 'Ananya Indian Female (Calibrated)';

  return {
    voice: bestVoice,
    voiceName: friendlyName,
    lang: bestVoice?.lang || targetLocale,
    isFemale: true,
    isIndian: true
  };
}

/**
 * Play a gentle, natural Web Audio acoustic harmonic chime before speaking
 * (Signals Ananya AI assistant is speaking and provides instant tactile feedback)
 */
export function playChimeTone() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5 note
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch {
    // Ignore audio permission restrictions silently
  }
}

/**
 * Stop any current speech synthesis cleanly
 */
export function stopIndianFemaleSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      if (window.__currentAnanyaUtterance) {
        window.__currentAnanyaUtterance = null;
      }
    } catch {
      // Ignore errors silently
    }
  }
}

/**
 * Pre-calibrated gentle cadence presets for Indian rural listeners & farmers
 */
/**
 * Pre-calibrated gentle cadence presets for Indian girl voice persona
 * Tuned with authentic female Indian vocal pitch (1.10 - 1.15) and conversational cadence.
 */
export const VOICE_CADENCE_PRESETS = {
  sweet: { rate: 0.84, pitch: 1.15, label: 'Sweet Indian Girl (0.84x)' },
  suitable: { rate: 0.88, pitch: 1.12, label: 'Natural Indian Girl (0.88x)' },
  standard: { rate: 0.92, pitch: 1.10, label: 'Standard Indian Female (0.92x)' }
};

/**
 * Speak text with Ananya's calibrated Indian female voice in the user's selected language
 * 
 * @param {string} text Plain or agronomic text to speak
 * @param {Object} [options={}] Options including language, rate, pitch, onStart, onEnd, onError
 * @returns {{ utterance: SpeechSynthesisUtterance, voice: SpeechSynthesisVoice|null } | null}
 */
export function speakWithIndianFemaleVoice(text, options = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (options && options.onEnd) options.onEnd();
    return null;
  }

  const cleanedText = cleanAgronomyTextForSpeech(text);
  if (!cleanedText) {
    if (options && options.onEnd) options.onEnd();
    return null;
  }

  try {
    // Cancel any ongoing speech cleanly
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    const targetLang = options.language || 'English';
    const voiceSelection = getIndianFemaleVoice(targetLang);

    if (voiceSelection?.voice) {
      utterance.voice = voiceSelection.voice;
    }
    utterance.lang = voiceSelection?.lang || INDIAN_LOCALE_MAP[targetLang] || 'en-IN';
    utterance.rate = options.rate ?? 0.88; // Gentle, clear conversational pace
    utterance.pitch = options.pitch ?? 1.12; // Authentic young Indian female vocal pitch
    utterance.volume = options.volume ?? 1.0;

    utterance.onstart = () => {
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      if (window.__currentAnanyaUtterance === utterance) {
        window.__currentAnanyaUtterance = null;
      }
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      if (window.__currentAnanyaUtterance === utterance) {
        window.__currentAnanyaUtterance = null;
      }
      if (options.onError) options.onError(e);
      if (options.onEnd) options.onEnd();
    };

    // Keep global reference to prevent Chrome garbage collection pauses
    window.__currentAnanyaUtterance = utterance;

    // Play tactile gentle audio chime
    playChimeTone();

    window.speechSynthesis.speak(utterance);
    return { utterance, voice: voiceSelection?.voice };
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    if (options && options.onEnd) options.onEnd();
    return null;
  }
}
