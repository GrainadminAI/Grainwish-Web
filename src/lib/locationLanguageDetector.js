/**
 * Location-to-Language Intelligence for Grainwish AI
 * 
 * Automatically detects the farmer's state/region in India using:
 * 1. Geolocation API (lat/lng) with fast reverse geocoding
 * 2. IP-based location fallback (zero-permission)
 * 3. Browser locale / Timezone heuristics
 * 
 * Maps Indian states to their primary regional language among the 22 supported languages.
 */

export const INDIAN_STATE_TO_LANGUAGE = {
  // Northern & Central (Hindi Belt & Northern)
  'punjab': 'Punjabi',
  'haryana': 'Hindi',
  'himachal pradesh': 'Hindi',
  'rajasthan': 'Hindi',
  'uttar pradesh': 'Hindi',
  'uttarakhand': 'Hindi',
  'madhya pradesh': 'Hindi',
  'chhattisgarh': 'Hindi',
  'bihar': 'Hindi',
  'jharkhand': 'Hindi',
  'delhi': 'Hindi',
  'national capital territory of delhi': 'Hindi',
  'chandigarh': 'Punjabi',
  'jammu and kashmir': 'Kashmiri',
  'jammu & kashmir': 'Kashmiri',
  'ladakh': 'Hindi',

  // Western India
  'gujarat': 'Gujarati',
  'maharashtra': 'Marathi',
  'goa': 'Konkani',

  // Southern India
  'tamil nadu': 'Tamil',
  'andhra pradesh': 'Telugu',
  'telangana': 'Telugu',
  'karnataka': 'Kannada',
  'kerala': 'Malayalam',
  'puducherry': 'Tamil',

  // Eastern & North-Eastern India
  'west bengal': 'Bengali',
  'odisha': 'Odia',
  'orissa': 'Odia',
  'assam': 'Assamese',
  'tripura': 'Bengali',
  'manipur': 'Manipuri',
  'meghalaya': 'English',
  'nagaland': 'English',
  'mizoram': 'English',
  'sikkim': 'Nepali',
  'arunachal pradesh': 'Hindi'
};

export const BROWSER_LOCALE_TO_LANGUAGE = {
  'hi': 'Hindi',
  'hi-in': 'Hindi',
  'ta': 'Tamil',
  'ta-in': 'Tamil',
  'te': 'Telugu',
  'te-in': 'Telugu',
  'pa': 'Punjabi',
  'pa-in': 'Punjabi',
  'mr': 'Marathi',
  'mr-in': 'Marathi',
  'bn': 'Bengali',
  'bn-in': 'Bengali',
  'bn-bd': 'Bengali',
  'gu': 'Gujarati',
  'gu-in': 'Gujarati',
  'kn': 'Kannada',
  'kn-in': 'Kannada',
  'ml': 'Malayalam',
  'ml-in': 'Malayalam',
  'or': 'Odia',
  'or-in': 'Odia',
  'as': 'Assamese',
  'as-in': 'Assamese',
  'ur': 'Urdu',
  'ur-in': 'Urdu',
  'ur-pk': 'Urdu',
  'mai': 'Maithili',
  'mai-in': 'Maithili',
  'ks': 'Kashmiri',
  'ks-in': 'Kashmiri',
  'ne': 'Nepali',
  'ne-np': 'Nepali',
  'ne-in': 'Nepali',
  'kok': 'Konkani',
  'kok-in': 'Konkani',
  'sd': 'Sindhi',
  'doi': 'Dogri',
  'mni': 'Manipuri',
  'sa': 'Sanskrit',
  'en-in': 'English',
  'en': 'English'
};

/**
 * Match a raw state or region name to one of our supported regional languages
 */
export function matchStateToLanguage(regionName = '') {
  if (!regionName) return null;
  const clean = regionName.toLowerCase().trim();
  const normalized = clean.replace(/[^a-z]/g, '');

  // Direct lookup
  if (INDIAN_STATE_TO_LANGUAGE[clean]) {
    return INDIAN_STATE_TO_LANGUAGE[clean];
  }

  // Partial or space-free normalized match
  for (const [stateKey, lang] of Object.entries(INDIAN_STATE_TO_LANGUAGE)) {
    const keyNorm = stateKey.replace(/[^a-z]/g, '');
    if (
      clean.includes(stateKey) ||
      stateKey.includes(clean) ||
      (normalized.length >= 4 && keyNorm.includes(normalized)) ||
      (keyNorm.length >= 4 && normalized.includes(keyNorm))
    ) {
      return lang;
    }
  }

  return null;
}

/**
 * Detect client connection telemetry via Network Information API
 * Identifies mobile cellular connections (4G, 5G, 3G) and broadband WiFi.
 */
export function getNetworkConnectionInfo() {
  if (typeof navigator === 'undefined') {
    return { type: 'unknown', isMobile: false, effectiveType: 'unknown' };
  }

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) {
    return { type: 'unknown', isMobile: false, effectiveType: 'unknown' };
  }

  const type = conn.type || '';
  const effectiveType = conn.effectiveType || '';
  const isMobile = type === 'cellular' || effectiveType === '4g' || effectiveType === '3g' || effectiveType === '2g';

  return {
    type: type || (isMobile ? 'cellular' : 'broadband'),
    effectiveType: effectiveType || '4g',
    isMobile
  };
}

/**
 * Clean & format mobile network carrier / ISP display name
 */
export function formatNetworkCarrier(carrierStr = '') {
  if (!carrierStr) return 'Internet';
  if (/jio/i.test(carrierStr)) return 'Jio 4G/5G';
  if (/airtel/i.test(carrierStr)) return 'Airtel';
  if (/vodafone|idea|\bvi\b/i.test(carrierStr)) return 'Vi Cellular';
  if (/bsnl/i.test(carrierStr)) return 'BSNL';
  if (/act\s*fiber/i.test(carrierStr)) return 'ACT Fibernet';
  if (/tata/i.test(carrierStr)) return 'Tata Tele';
  return carrierStr.split(',')[0].replace(/^AS\d+\s*/i, '').trim();
}

/**
 * Detect location via Internet Connections & Mobile Network Operators.
 * Multi-provider strategy: ipwho.is (instant zero-limit), ipapi.co (rich telemetry), bigdatacloud.
 */
export async function detectLocationViaNetwork() {
  const connectionInfo = getNetworkConnectionInfo();

  // Provider 1: ipwho.is (fast, high availability, no rate-limits)
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeout = controller ? setTimeout(() => controller.abort(), 2200) : null;
    const res = await fetch('https://ipwho.is/', {
      signal: controller?.signal
    });
    if (timeout) clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false) {
        const region = data.region || data.city || '';
        const country = data.country || '';
        const rawCarrier = data.connection?.isp || data.connection?.org || '';
        const carrier = formatNetworkCarrier(rawCarrier);
        const isMobile = connectionInfo.isMobile || /jio|airtel|cellular|mobile|vodafone|vi|idea|bsnl mobile|telecom/i.test(rawCarrier);
        const networkType = isMobile ? 'Mobile Network' : 'Internet Connection';
        const lang = matchStateToLanguage(region);

        if (lang) {
          return {
            language: lang,
            region,
            country,
            carrier,
            isMobile,
            networkType,
            source: isMobile ? 'mobile_network' : 'internet_connection'
          };
        }
        if (data.country_code === 'IN') {
          return {
            language: 'Hindi',
            region: region || 'India',
            country: 'India',
            carrier,
            isMobile,
            networkType,
            source: isMobile ? 'mobile_network_india' : 'internet_connection_india'
          };
        }
      }
    }
  } catch {
    // Continue to next provider
  }

  // Provider 2: ipapi.co (detailed ASN and organizational telemetry)
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeout = controller ? setTimeout(() => controller.abort(), 2200) : null;
    const res = await fetch('https://ipapi.co/json/', {
      signal: controller?.signal,
      headers: { 'Accept': 'application/json' }
    });
    if (timeout) clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const region = data.region || data.region_name || data.city || '';
      const country = data.country_name || data.country_code || '';
      const rawCarrier = data.org || data.asn || '';
      const carrier = formatNetworkCarrier(rawCarrier);
      const isMobile = connectionInfo.isMobile || /jio|airtel|cellular|mobile|vodafone|vi|idea|bsnl mobile|telecom/i.test(rawCarrier);
      const networkType = isMobile ? 'Mobile Network' : 'Internet Connection';
      const lang = matchStateToLanguage(region);

      if (lang) {
        return {
          language: lang,
          region,
          country,
          carrier,
          isMobile,
          networkType,
          source: isMobile ? 'mobile_network' : 'internet_connection'
        };
      }
      if (data.country_code === 'IN') {
        return {
          language: 'Hindi',
          region: region || 'India',
          country: 'India',
          carrier,
          isMobile,
          networkType,
          source: isMobile ? 'mobile_network_india' : 'internet_connection_india'
        };
      }
    }
  } catch {
    // Fall through
  }

  return null;
}

/**
 * Fast IP-based geolocation lookup (wrapper for backwards compatibility)
 */
export async function detectLocationViaIP() {
  return detectLocationViaNetwork();
}

/**
 * High-accuracy GPS reverse geocoding
 */
export async function detectLocationViaGPS() {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            const region = data.principalSubdivision || data.locality || '';
            const country = data.countryName || '';
            const matched = matchStateToLanguage(region);
            if (matched) {
              return resolve({
                language: matched,
                region: region,
                country: country,
                coords: { latitude, longitude },
                source: 'gps'
              });
            }
            if (region || country) {
              return resolve({
                language: country === 'India' ? 'Hindi' : 'English',
                region: region || country,
                country: country,
                coords: { latitude, longitude },
                source: 'gps'
              });
            }
          }
          return resolve({
            language: 'English',
            region: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
            country: 'India',
            coords: { latitude, longitude },
            source: 'gps'
          });
        } catch {
          const { latitude, longitude } = position.coords || {};
          if (latitude && longitude) {
            return resolve({
              language: 'English',
              region: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
              country: 'India',
              coords: { latitude, longitude },
              source: 'gps'
            });
          }
        }
        resolve(null);
      },
      () => resolve(null),
      { timeout: 7000, maximumAge: 300000, enableHighAccuracy: true }
    );
  });
}

/**
 * Detect language from browser locale preferences
 */
export function detectLanguageFromBrowser() {
  if (typeof navigator === 'undefined') return 'English';

  const langs = navigator.languages || [navigator.language || 'en'];
  for (const raw of langs) {
    const code = (raw || '').toLowerCase().trim();
    if (BROWSER_LOCALE_TO_LANGUAGE[code]) {
      return BROWSER_LOCALE_TO_LANGUAGE[code];
    }
    const base = code.split('-')[0];
    if (BROWSER_LOCALE_TO_LANGUAGE[base]) {
      return BROWSER_LOCALE_TO_LANGUAGE[base];
    }
  }

  // Check timezone
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Kolkata') || tz.includes('Calcutta')) {
      return 'Hindi';
    }
  } catch {
    // ignore
  }

  return 'English';
}

/**
 * Master Language & Location Detection:
 * 1. Checks Mobile Network & Internet Connection Telemetry (zero-permission)
 * 2. Checks GPS if requested / allowed
 * 3. Falls back to browser locale / Indian timezone
 * 
 * @param {boolean} [requestGPS=false] If true, requests browser GPS coordinates
 * @returns {Promise<{ language: string, region: string|null, carrier?: string, isMobile?: boolean, source: string }>}
 */
export async function detectUserRegionalLanguage(requestGPS = false) {
  // 1. GPS if explicit user request
  if (requestGPS) {
    const gpsResult = await detectLocationViaGPS();
    if (gpsResult && gpsResult.language) {
      return gpsResult;
    }
  }

  // 2. Internet Connection & Mobile Network Detection
  const networkResult = await detectLocationViaNetwork();
  if (networkResult && networkResult.language) {
    return networkResult;
  }

  // 3. Browser locale fallback
  const browserLang = detectLanguageFromBrowser();
  return {
    language: browserLang || 'English',
    region: null,
    source: 'browser_locale'
  };
}
