import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INDIAN_LOCALE_MAP,
  KNOWN_INDIAN_FEMALE_VOICES,
  MALE_VOICE_KEYWORDS,
  cleanAgronomyTextForSpeech,
  scoreVoiceForIndianFemale,
  getIndianFemaleVoice,
  isMaleVoice,
  isCertifiedFemaleVoice
} from '../src/lib/ananyaVoiceEngine.js';

test('Ananya Voice Engine: Indian Locales & Language Coverage', async (t) => {
  await t.test('All 22 Indian regional languages map to valid Indian BCP-47 locales', () => {
    assert.equal(INDIAN_LOCALE_MAP.English, 'en-IN');
    assert.equal(INDIAN_LOCALE_MAP.Hindi, 'hi-IN');
    assert.equal(INDIAN_LOCALE_MAP.Tamil, 'ta-IN');
    assert.equal(INDIAN_LOCALE_MAP.Telugu, 'te-IN');
    assert.equal(INDIAN_LOCALE_MAP.Punjabi, 'pa-IN');
    assert.equal(INDIAN_LOCALE_MAP.Marathi, 'mr-IN');
    assert.equal(INDIAN_LOCALE_MAP.Bengali, 'bn-IN');
    assert.equal(INDIAN_LOCALE_MAP.Gujarati, 'gu-IN');
    assert.equal(INDIAN_LOCALE_MAP.Kannada, 'kn-IN');
    assert.equal(INDIAN_LOCALE_MAP.Malayalam, 'ml-IN');
    assert.equal(INDIAN_LOCALE_MAP.Odia, 'or-IN');
    assert.equal(INDIAN_LOCALE_MAP.Assamese, 'as-IN');
    assert.equal(INDIAN_LOCALE_MAP.Urdu, 'ur-IN');
    assert.equal(INDIAN_LOCALE_MAP.Maithili, 'mai-IN');
    assert.equal(INDIAN_LOCALE_MAP.Santali, 'sat-IN');
    assert.equal(INDIAN_LOCALE_MAP.Kashmiri, 'ks-IN');
    assert.equal(INDIAN_LOCALE_MAP.Nepali, 'ne-IN');
    assert.equal(INDIAN_LOCALE_MAP.Konkani, 'kok-IN');
    assert.equal(INDIAN_LOCALE_MAP.Sindhi, 'sd-IN');
    assert.equal(INDIAN_LOCALE_MAP.Dogri, 'doi-IN');
    assert.equal(INDIAN_LOCALE_MAP.Manipuri, 'mni-IN');
    assert.equal(INDIAN_LOCALE_MAP.Sanskrit, 'sa-IN');
    assert.equal(Object.keys(INDIAN_LOCALE_MAP).length, 22);
  });

  await t.test('Known Indian female voice list includes leading platform voices', () => {
    assert.ok(KNOWN_INDIAN_FEMALE_VOICES.includes('veena'), 'Includes Apple Veena');
    assert.ok(KNOWN_INDIAN_FEMALE_VOICES.includes('lekha'), 'Includes Apple Lekha');
    assert.ok(KNOWN_INDIAN_FEMALE_VOICES.includes('heera'), 'Includes Microsoft Heera');
    assert.ok(KNOWN_INDIAN_FEMALE_VOICES.includes('swara'), 'Includes Microsoft Swara');
    assert.ok(KNOWN_INDIAN_FEMALE_VOICES.includes('neerja'), 'Includes Microsoft Neerja');
  });
});

test('Ananya Voice Engine: Agronomic Speech Normalizer & Pronunciation', async (t) => {
  await t.test('Expands dosages (ml/L, g/L, kg/acre) to natural spoken words', () => {
    const raw = 'Apply 1.0 ml/L or 2.5 g/L. Tank mix: 200 ml/acre in 200 L/acre.';
    const cleaned = cleanAgronomyTextForSpeech(raw);
    assert.match(cleaned, /1\.0 millilitres per litre of water/);
    assert.match(cleaned, /2\.5 grams per litre of water/);
    assert.match(cleaned, /200 millilitres per acre/);
    assert.match(cleaned, /200 litres per acre/);
  });

  await t.test('Expands Indian rupee symbols and agricultural acronyms', () => {
    const raw = 'Wheat MSP is ₹2,275/qtl. Verified by ICAR and CIBRC. Visit nearest KVK.';
    const cleaned = cleanAgronomyTextForSpeech(raw);
    assert.match(cleaned, /2,275 Rupees/);
    assert.match(cleaned, /I\.C\.A\.R\./);
    assert.match(cleaned, /C\.I\.B\.R\.C\./);
    assert.match(cleaned, /Krishi Vigyan Kendra/);
  });

  await t.test('Strips markdown formatting, hashtags, and emojis', () => {
    const raw = '🌾 **Yellow Rust**: • Chemical: *Tilt* 25% EC. 💡 Field Pro-Tip: Spray morning!';
    const cleaned = cleanAgronomyTextForSpeech(raw);
    assert.doesNotMatch(cleaned, /[*_•💡🌾]/);
    assert.match(cleaned, /Yellow Rust: Chemical: Tilt 25% EC/);
  });
});

test('Ananya Voice Engine: Voice Matching & Heuristic Scoring', async (t) => {
  const mockVoices = [
    { name: 'Microsoft David Desktop - English (United States)', lang: 'en-US' },
    { name: 'Rishi - English (India)', lang: 'en-IN' },
    { name: 'Veena - English (India)', lang: 'en-IN' },
    { name: 'Lekha - Hindi (India)', lang: 'hi-IN' },
    { name: 'Microsoft Heera - English (India)', lang: 'en-IN' },
    { name: 'Microsoft Swara - Hindi (India)', lang: 'hi-IN' }
  ];

  await t.test('Veena scores significantly higher than male voice Rishi for en-IN', () => {
    const veenaScore = scoreVoiceForIndianFemale(mockVoices[2], 'en-IN');
    const rishiScore = scoreVoiceForIndianFemale(mockVoices[1], 'en-IN');
    assert.ok(veenaScore > 150, `Veena score should be > 150, got ${veenaScore}`);
    assert.ok(rishiScore < 0, `Rishi score should be penalized (< 0), got ${rishiScore}`);
  });

  await t.test('Lekha or Swara is chosen for Hindi language', () => {
    const selection = getIndianFemaleVoice('Hindi', mockVoices);
    assert.ok(
      selection.voiceName.toLowerCase().includes('lekha') || selection.voiceName.toLowerCase().includes('swara'),
      `Expected Lekha or Swara for Hindi, got ${selection.voiceName}`
    );
  });

  await t.test('Veena or Heera is chosen for English (India)', () => {
    const selection = getIndianFemaleVoice('English', mockVoices);
    assert.ok(
      selection.voiceName.toLowerCase().includes('veena') || selection.voiceName.toLowerCase().includes('heera'),
      `Expected Veena or Heera for English, got ${selection.voiceName}`
    );
  });

  await t.test('Strictly excludes all male voices (David, Rishi, George, etc.)', () => {
    assert.equal(isMaleVoice({ name: 'Microsoft David Desktop - English (United States)' }), true);
    assert.equal(isMaleVoice({ name: 'Rishi - English (India)' }), true);
    assert.equal(isMaleVoice({ name: 'Google UK English Male' }), true);
    assert.equal(isMaleVoice({ name: 'Daniel' }), true);
    assert.equal(isMaleVoice({ name: 'Veena' }), false);
    assert.equal(isMaleVoice({ name: 'Microsoft Zira Desktop' }), false);
  });

  await t.test('Never picks a male voice even if no Indian voice is installed', () => {
    const genericVoices = [
      { name: 'Microsoft David Desktop', lang: 'en-US' },
      { name: 'Microsoft Zira Desktop', lang: 'en-US' }
    ];
    const selection = getIndianFemaleVoice('English', genericVoices);
    assert.ok(selection.voice);
    assert.ok(selection.voice.name.includes('Zira'), `Expected Zira (Female), got ${selection.voice.name}`);
    assert.equal(isMaleVoice(selection.voice), false);
  });

  await t.test('Returns null voice rather than ever selecting a male voice if only male voices exist', () => {
    const onlyMaleVoices = [
      { name: 'Microsoft David Desktop', lang: 'en-US' },
      { name: 'Rishi - English (India)', lang: 'en-IN' },
      { name: 'Google UK English Male', lang: 'en-GB' }
    ];
    const selection = getIndianFemaleVoice('Hindi', onlyMaleVoices);
    assert.equal(selection.voice, null, 'Must NOT pick any male voice');
  });
});

import {
  INDIAN_STATE_TO_LANGUAGE,
  BROWSER_LOCALE_TO_LANGUAGE,
  matchStateToLanguage,
  detectLanguageFromBrowser
} from '../src/lib/locationLanguageDetector.js';

test('Location & Locale Detection: Indian States to Regional Languages', async (t) => {
  await t.test('Accurately maps Indian agrarian states to their native official languages', () => {
    assert.equal(matchStateToLanguage('Punjab'), 'Punjabi');
    assert.equal(matchStateToLanguage('Tamil Nadu'), 'Tamil');
    assert.equal(matchStateToLanguage('Andhra Pradesh'), 'Telugu');
    assert.equal(matchStateToLanguage('Telangana'), 'Telugu');
    assert.equal(matchStateToLanguage('Maharashtra'), 'Marathi');
    assert.equal(matchStateToLanguage('Gujarat'), 'Gujarati');
    assert.equal(matchStateToLanguage('West Bengal'), 'Bengali');
    assert.equal(matchStateToLanguage('Karnataka'), 'Kannada');
    assert.equal(matchStateToLanguage('Kerala'), 'Malayalam');
    assert.equal(matchStateToLanguage('Odisha'), 'Odia');
    assert.equal(matchStateToLanguage('Assam'), 'Assamese');
    assert.equal(matchStateToLanguage('Uttar Pradesh'), 'Hindi');
    assert.equal(matchStateToLanguage('Madhya Pradesh'), 'Hindi');
    assert.equal(matchStateToLanguage('Haryana'), 'Hindi');
    assert.equal(matchStateToLanguage('Bihar'), 'Hindi');
    assert.equal(matchStateToLanguage('Rajasthan'), 'Hindi');
  });

  await t.test('Handles partial and lowercase state variations', () => {
    assert.equal(matchStateToLanguage('State of Punjab'), 'Punjabi');
    assert.equal(matchStateToLanguage('gujarat state'), 'Gujarati');
    assert.equal(matchStateToLanguage('tamilnadu'), 'Tamil');
  });

  await t.test('Maps BCP-47 browser locales to regional languages', () => {
    assert.equal(BROWSER_LOCALE_TO_LANGUAGE['hi'], 'Hindi');
    assert.equal(BROWSER_LOCALE_TO_LANGUAGE['ta-in'], 'Tamil');
    assert.equal(BROWSER_LOCALE_TO_LANGUAGE['te-in'], 'Telugu');
    assert.equal(BROWSER_LOCALE_TO_LANGUAGE['pa-in'], 'Punjabi');
    assert.equal(BROWSER_LOCALE_TO_LANGUAGE['mr-in'], 'Marathi');
    assert.equal(BROWSER_LOCALE_TO_LANGUAGE['bn-in'], 'Bengali');
  });

  await t.test('Browser fallback detector returns supported language string', () => {
    const lang = detectLanguageFromBrowser();
    assert.ok(typeof lang === 'string' && lang.length > 0);
  });
});

import {
  formatNetworkCarrier,
  getNetworkConnectionInfo
} from '../src/lib/locationLanguageDetector.js';
import { VOICE_CADENCE_PRESETS } from '../src/lib/ananyaVoiceEngine.js';

test('Network & Cellular Telemetry: Internet Connection & Mobile Network Carrier', async (t) => {
  await t.test('Formats major Indian mobile carriers and ISPs accurately', () => {
    assert.equal(formatNetworkCarrier('Reliance Jio Infocomm Limited'), 'Jio 4G/5G');
    assert.equal(formatNetworkCarrier('Bharti Airtel Ltd Telecommunications'), 'Airtel');
    assert.equal(formatNetworkCarrier('Vodafone Idea Cellular Service'), 'Vi Cellular');
    assert.equal(formatNetworkCarrier('Bharat Sanchar Nigam Limited (BSNL)'), 'BSNL');
    assert.equal(formatNetworkCarrier('ACT Fibernet India'), 'ACT Fibernet');
    assert.equal(formatNetworkCarrier(''), 'Internet');
  });

  await t.test('Network connection info detector handles browser environments gracefully', () => {
    const info = getNetworkConnectionInfo();
    assert.ok(typeof info.isMobile === 'boolean');
    assert.ok(typeof info.type === 'string');
    assert.ok(typeof info.effectiveType === 'string');
  });

  await t.test('Voice cadence presets are calibrated for Indian girl persona (pitch 1.10 - 1.15)', () => {
    assert.ok(VOICE_CADENCE_PRESETS.sweet.pitch >= 1.10 && VOICE_CADENCE_PRESETS.sweet.pitch <= 1.20);
    assert.ok(VOICE_CADENCE_PRESETS.suitable.pitch >= 1.10 && VOICE_CADENCE_PRESETS.suitable.pitch <= 1.15);
    assert.ok(VOICE_CADENCE_PRESETS.standard.pitch >= 1.08 && VOICE_CADENCE_PRESETS.standard.pitch <= 1.15);
    assert.ok(VOICE_CADENCE_PRESETS.suitable.rate <= 0.95);
  });
});


