import { COMPREHENSIVE_MANDI_RECORDS, calculateHaversineDistance } from './allStatesMandiData.js';

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
        const city = data.city || '';
        const state = data.region || '';
        const region = city && state && !city.toLowerCase().includes(state.toLowerCase())
          ? `${city}, ${state}`
          : (state || city || '');
        const country = data.country || '';
        const rawCarrier = data.connection?.isp || data.connection?.org || '';
        const carrier = formatNetworkCarrier(rawCarrier);
        const isMobile = connectionInfo.isMobile || /jio|airtel|cellular|mobile|vodafone|vi|idea|bsnl mobile|telecom/i.test(rawCarrier);
        const networkType = isMobile ? 'Mobile Network' : 'Internet Connection';
        const lang = matchStateToLanguage(state || region);

        if (lang) {
          return {
            language: lang,
            region,
            city,
            state,
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
            city,
            state,
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
      const city = data.city || '';
      const state = data.region || data.region_name || '';
      const region = city && state && !city.toLowerCase().includes(state.toLowerCase())
        ? `${city}, ${state}`
        : (state || city || '');
      const country = data.country_name || data.country_code || '';
      const rawCarrier = data.org || data.asn || '';
      const carrier = formatNetworkCarrier(rawCarrier);
      const isMobile = connectionInfo.isMobile || /jio|airtel|cellular|mobile|vodafone|vi|idea|bsnl mobile|telecom/i.test(rawCarrier);
      const networkType = isMobile ? 'Mobile Network' : 'Internet Connection';
      const lang = matchStateToLanguage(state || region);

      if (lang) {
        return {
          language: lang,
          region,
          city,
          state,
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
          city,
          state,
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
 * Offline fallback: matches coordinates to the nearest Indian district & state
 * based on our comprehensive 28-state APMC Mandi database.
 */
export function getNearestAreaFromCoords(latitude, longitude) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number' || isNaN(latitude) || isNaN(longitude)) {
    return null;
  }
  let nearest = null;
  let minDist = Infinity;
  for (const r of COMPREHENSIVE_MANDI_RECORDS) {
    if (r.lat && r.lon) {
      const d = calculateHaversineDistance(latitude, longitude, r.lat, r.lon);
      if (d < minDist) {
        minDist = d;
        nearest = r;
      }
    }
  }
  if (nearest) {
    const district = nearest.district ? nearest.district.split(',')[0].trim() : '';
    const state = nearest.state || '';
    if (district && state && !district.toLowerCase().includes(state.toLowerCase())) {
      return `${district}, ${state}`;
    }
    return district || state || 'India';
  }
  return null;
}

/**
 * Checks if a string looks like raw coordinates e.g. "22.83°, 88.35°"
 */
export function isCoordinateString(str) {
  if (!str || typeof str !== 'string') return false;
  return /^\s*-?\d+(\.\d+)?\s*°?[NSEW]?\s*,\s*-?\d+(\.\d+)?\s*°?[NSEW]?\s*$/i.test(str.trim());
}

/**
 * Resolves latitude and longitude coordinates to a human-readable Area Name (City, District, State)
 * Multi-tier fallback: BigDataCloud -> OpenStreetMap Nominatim -> Offline 28-State Mandi Database
 */
export async function reverseGeocodeCoords(latitude, longitude) {
  if (typeof latitude !== 'number' || typeof longitude !== 'number' || isNaN(latitude) || isNaN(longitude)) {
    return null;
  }

  // Tier 1: BigDataCloud (fast locality & principal subdivision)
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeout = controller ? setTimeout(() => controller.abort(), 2500) : null;
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      { signal: controller?.signal }
    );
    if (timeout) clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      const city = data.locality || data.city || '';
      const state = data.principalSubdivision || '';
      if (city && state) {
        const area = !city.toLowerCase().includes(state.toLowerCase()) ? `${city}, ${state}` : state;
        return { area, city, state, country: data.countryName || 'India' };
      }
      if (state || city) {
        return { area: state || city, city, state, country: data.countryName || 'India' };
      }
    }
  } catch {}

  // Tier 2: OpenStreetMap Nominatim
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeout = controller ? setTimeout(() => controller.abort(), 2500) : null;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      { signal: controller?.signal, headers: { 'Accept': 'application/json' } }
    );
    if (timeout) clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const locality = addr.suburb || addr.town || addr.village || addr.county || addr.city || '';
      const district = addr.state_district || addr.district || '';
      const state = addr.state || '';
      const chosenCity = locality || district;
      if (chosenCity && state) {
        const area = !chosenCity.toLowerCase().includes(state.toLowerCase()) ? `${chosenCity}, ${state}` : state;
        return { area, city: chosenCity, state, country: addr.country || 'India' };
      }
      if (district && state) {
        return { area: `${district}, ${state}`, city: district, state, country: addr.country || 'India' };
      }
      if (state) {
        return { area: state, city: '', state, country: addr.country || 'India' };
      }
    }
  } catch {}

  // Tier 3: Offline 28-State Mandi Database (Zero latency, 100% reliability, no network needed)
  const offlineArea = getNearestAreaFromCoords(latitude, longitude);
  if (offlineArea) {
    const parts = offlineArea.split(',').map(s => s.trim());
    return {
      area: offlineArea,
      city: parts[0] || '',
      state: parts[1] || parts[0] || '',
      country: 'India'
    };
  }

  return {
    area: 'Local Farm Plot',
    city: '',
    state: '',
    country: 'India'
  };
}

/**
 * High-accuracy GPS reverse geocoding to human-readable Area Name
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
          const geocoded = await reverseGeocodeCoords(latitude, longitude);
          const area = geocoded?.area || getNearestAreaFromCoords(latitude, longitude) || 'Local Farm Plot';
          const state = geocoded?.state || area;
          const matched = matchStateToLanguage(state || area);

          return resolve({
            language: matched || 'English',
            region: area,
            city: geocoded?.city || '',
            state: geocoded?.state || '',
            country: geocoded?.country || 'India',
            coords: { latitude, longitude },
            source: 'gps'
          });
        } catch {
          const { latitude, longitude } = position.coords || {};
          if (latitude && longitude) {
            const offlineArea = getNearestAreaFromCoords(latitude, longitude) || 'Local Farm Plot';
            const matched = matchStateToLanguage(offlineArea);
            return resolve({
              language: matched || 'English',
              region: offlineArea,
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
