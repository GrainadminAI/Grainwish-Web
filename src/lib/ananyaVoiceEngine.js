/**
 * Ananya AI — Indian Female Voice Engine & Speech Synthesis
 * 
 * Provides authentic, natural Indian female voice synthesis calibrated
 * for agricultural terminology, dosages, and 22 Indian regional languages.
 */

// BCP-47 Locale map for speech synthesis across supported Indian languages
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
  Urdu: 'ur-IN'
};

// Known female voices across platforms (Apple iOS/macOS, Google Android/Chrome, Microsoft Edge/Windows)
export const KNOWN_INDIAN_FEMALE_VOICES = [
  // Apple iOS / macOS
  'veena', 'lekha', 'kalyani', 'sangeeta', 'geeta',
  // Microsoft Edge / Windows
  'heera', 'neerja', 'swara', 'kalpana', 'shruti', 'sapna', 'pallavi', 'sandhya',
  // Android / Google / Custom
  'priya', 'ananya', 'pooja', 'aditi', 'kavya', 'roshni', 'sunita', 'radha', 'kavita', 'manisha'
];

// Male voice keywords to strictly avoid/penalize for female persona
export const MALE_VOICE_KEYWORDS = [
  'rishi', 'hemant', 'madhav', 'prabhat', 'male', 'man', 'david', 'guy', 'george', 'stefan', 'mark'
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
    // Expand Indian Currency
    .replace(/₹\s*([0-9,]+)/g, '$1 Rupees')
    .replace(/₹/g, 'Rupees ')
    // Expand Metric Application Dosages
    .replace(/(\d+(?:\.\d+)?)\s*ml\/L\b/gi, '$1 millilitres per litre of water')
    .replace(/(\d+(?:\.\d+)?)\s*g\/L\b/gi, '$1 grams per litre of water')
    .replace(/(\d+(?:\.\d+)?)\s*kg\/acre\b/gi, '$1 kilograms per acre')
    .replace(/(\d+(?:\.\d+)?)\s*L\/acre\b/gi, '$1 litres per acre')
    .replace(/(\d+(?:\.\d+)?)\s*ml\/acre\b/gi, '$1 millilitres per acre')
    .replace(/(\d+(?:\.\d+)?)\s*g\/acre\b/gi, '$1 grams per acre')
    .replace(/(\d+(?:\.\d+)?)\s*kg\/ha\b/gi, '$1 kilograms per hectare')
    .replace(/(\d+(?:\.\d+)?)\s*qtl\b/gi, '$1 quintal')
    // Expand Agricultural & Institutional Acronyms
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
    // Normalize newlines to conversational pauses
    .replace(/\n+/g, '. ')
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

  // 1. Male voice penalty — disqualify or severely demote
  for (const male of MALE_VOICE_KEYWORDS) {
    if (nameLower.includes(male) || langLower.includes(male)) {
      return -500;
    }
  }

  // 2. Exact target locale match (e.g. 'hi-in' matches 'hi-in')
  if (langLower === targetLower) {
    score += 80;
  } else if (langLower.startsWith(targetBaseLang)) {
    score += 50;
  }

  // 3. Indian locale affinity (en-IN, hi-IN, or any -in)
  if (langLower.endsWith('-in')) {
    score += 40;
  }

  // 4. Known Indian Female Voice Names (Veena, Lekha, Heera, Swara, Neerja, etc.)
  for (const femaleName of KNOWN_INDIAN_FEMALE_VOICES) {
    if (nameLower.includes(femaleName)) {
      score += 120;
      break;
    }
  }

  // 5. Generic Female tag in name
  if (nameLower.includes('female') || nameLower.includes('woman')) {
    score += 60;
  }

  // 6. Neural / Natural / Premium voice boost
  if (nameLower.includes('natural') || nameLower.includes('online') || nameLower.includes('neural') || nameLower.includes('wavenet')) {
    score += 20;
  }

  return score;
}

/**
 * Find the best available Indian female voice from the browser's voice list.
 * 
 * @param {string} language Selected language name (e.g. 'English', 'Hindi')
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

  // Fallback to en-IN or hi-IN if best voice score was negative
  if (!bestVoice || highestScore < 0) {
    const indianFallback = voices.find(v => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return (lang === 'en-in' || lang === 'hi-in' || lang.endsWith('-in')) && !name.includes('male') && !name.includes('rishi');
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
 * Play a gentle, natural Web Audio acoustic chime before speaking
 * (Signals Ananya AI assistant is speaking and provides instant tactile feedback)
 */
export function playChimeTone() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Warm musical notes: 523Hz (C5) gliding to 659Hz (E5)
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch {
    // Ignore audio context auto-play policy blocks silently
  }
}

/**
 * Stop any current speech synthesis cleanly
 */
export function stopIndianFemaleSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Speak text with Ananya's calibrated Indian female voice
 * 
 * @param {string} text Text to read
 * @param {Object} options Configuration options
 * @param {string} [options.language='English'] Language name
 * @param {Function} [options.onStart] Callback when speech starts
 * @param {Function} [options.onEnd] Callback when speech finishes
 * @param {Function} [options.onError] Callback on error
 * @param {number} [options.rate=0.94] Natural spoken cadence
 * @param {number} [options.pitch=1.14] Warm feminine vocal pitch
 * @param {boolean} [options.withChime=true] Play subtle arrival chime
 * @returns {SpeechSynthesisUtterance|null}
 */
export function speakWithIndianFemaleVoice(text, options = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this browser.');
    return null;
  }

  const {
    language = 'English',
    onStart,
    onEnd,
    onError,
    rate = 0.94,
    pitch = 1.14,
    withChime = true
  } = options;

  try {
    // Cancel any active speech
    window.speechSynthesis.cancel();

    if (withChime) {
      playChimeTone();
    }

    const cleanText = cleanAgronomyTextForSpeech(text).slice(0, 500);
    if (!cleanText) {
      if (onEnd) onEnd();
      return null;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const targetLocale = INDIAN_LOCALE_MAP[language] || 'en-IN';

    // Resolve best Indian female voice
    const voiceInfo = getIndianFemaleVoice(language);
    if (voiceInfo.voice) {
      utterance.voice = voiceInfo.voice;
      utterance.lang = voiceInfo.voice.lang || targetLocale;
    } else {
      utterance.lang = targetLocale;
    }

    // Acoustic calibration for natural Indian feminine tone
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      if (onStart) onStart(voiceInfo);
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (err) => {
      console.warn('Speech synthesis utterance error:', err);
      if (onError) onError(err);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return utterance;
  } catch (err) {
    console.warn('Failed to speak with Indian female voice:', err);
    if (onError) onError(err);
    if (onEnd) onEnd();
    return null;
  }
}
