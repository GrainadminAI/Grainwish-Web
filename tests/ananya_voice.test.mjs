import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INDIAN_LOCALE_MAP,
  KNOWN_INDIAN_FEMALE_VOICES,
  MALE_VOICE_KEYWORDS,
  cleanAgronomyTextForSpeech,
  scoreVoiceForIndianFemale,
  getIndianFemaleVoice
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
});
