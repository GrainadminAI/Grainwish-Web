import posthog from 'posthog-js';

const COOKIE_CONSENT_KEY = 'grainwise_cookie_consent';

export function getConsentPreference() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveConsentPreference(pref) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      ...pref,
      timestamp: new Date().toISOString()
    }));
    applyConsentToPostHog(pref);
  } catch (e) {
    console.warn('Could not save cookie consent:', e);
  }
}

function applyConsentToPostHog(pref) {
  if (!posthog || !posthog.__loaded) return;
  if (pref?.analytics) {
    posthog.opt_in_capturing();
  } else {
    posthog.opt_out_capturing();
  }
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;

  const posthogKey = import.meta.env.VITE_POSTHOG_KEY || '';
  const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!posthogKey) return;

  const pref = getConsentPreference();
  const allowAnalytics = pref ? Boolean(pref.analytics) : false;

  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only',
    capture_pageview: allowAnalytics,
    autocapture: allowAnalytics,
    opt_out_capturing_by_default: !allowAnalytics,
    loaded: () => {
      if (pref) {
        applyConsentToPostHog(pref);
      }
    }
  });
}

export function trackEvent(eventName, properties = {}) {
  try {
    const pref = getConsentPreference();
    if (!pref || pref.analytics) {
      if (posthog && typeof posthog.capture === 'function') {
        posthog.capture(eventName, {
          ...properties,
          platform: 'GrainWise Web',
          timestamp: new Date().toISOString()
        });
      }
    }
  } catch (err) {
    console.debug('Analytics capture notice:', err);
  }
}
