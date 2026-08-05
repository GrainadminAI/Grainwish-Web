import { createClient } from '@supabase/supabase-js';

let rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://drhraerbklibrkigbdaw.supabase.co';
if (rawUrl && !rawUrl.startsWith('http://') && !rawUrl.startsWith('https://')) {
  rawUrl = `https://${rawUrl}.supabase.co`;
}

const supabaseUrl = rawUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyaHJhZXJia2xpYnJraWdiZGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODc2MTQsImV4cCI6MjEwMTI2MzYxNH0.xa6alTF9SSgVhWD8SrtgQmAcUyO7jpyvRNg7R7mVU_8';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : null
  }
});

/**
 * Fetch Mandi Prices from Supabase or fallback
 */
export async function fetchMandiPricesFromDB() {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('mandi_prices')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn('Supabase Mandi Fetch Warning:', err.message);
    return null;
  }
}

/**
 * Save Crop Diagnostic Scan to Supabase
 */
export async function saveDiagnosticScanToDB(scan) {
  if (!isSupabaseConfigured) return { success: false, reason: 'unconfigured' };
  try {
    const { data, error } = await supabase
      .from('diagnostics_scans')
      .insert([{
        crop: scan.crop,
        disease: scan.disease,
        location: scan.location,
        confidence: scan.confidence,
        severity: scan.severity,
        symptoms: scan.symptoms,
        treatment: scan.treatment,
        yield_protected: scan.yieldProtected
      }])
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.warn('Supabase Save Scan Error:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Save Ananya AI Chat to Supabase
 */
export async function saveAnanyaChatToDB(chat) {
  if (!isSupabaseConfigured) return { success: false, reason: 'unconfigured' };
  try {
    const { data, error } = await supabase
      .from('ananya_chats')
      .insert([{
        user_text: chat.userText,
        ananya_response: chat.ananyaResponse,
        language: chat.language
      }]);
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.warn('Supabase Save Chat Error:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Save NPK Calculation to Supabase
 */
export async function saveNPKToDB(calc) {
  if (!isSupabaseConfigured) return { success: false, reason: 'unconfigured' };
  try {
    const { data, error } = await supabase
      .from('npk_calculations')
      .insert([{
        crop: calc.crop,
        soil_type: calc.soilType,
        acres: calc.acres,
        growth_stage: calc.growthStage,
        urea_kg: calc.ureaKg,
        dap_kg: calc.dapKg,
        mop_kg: calc.mopKg,
        cost_savings_pct: calc.costSavingsPct
      }]);
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.warn('Supabase Save NPK Error:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Record App Download Event
 */
export async function recordAppDownloadToDB(platform) {
  if (!isSupabaseConfigured) return { success: false, reason: 'unconfigured' };
  try {
    const { data, error } = await supabase
      .from('app_downloads')
      .insert([{ platform, domain: 'Grainwish.com' }]);
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.warn('Supabase Record Download Error:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Save or Update User Feedback in Supabase
 */
export async function saveFeedbackToDB(feedback) {
  try {
    const user = await getLoggedInUser();
    const payload = {
      user_id: user?.id || null,
      phone: feedback.phone || '',
      email: feedback.email || '',
      category: feedback.category || 'General',
      rating: feedback.rating || 5,
      comments: feedback.comments || '',
      updated_at: new Date().toISOString()
    };

    // Save to local storage for quick offline retrieval & update on phone
    localStorage.setItem('grainwise_user_feedback', JSON.stringify({
      ...payload,
      id: feedback.id || 'fb_' + Date.now()
    }));

    if (!isSupabaseConfigured) {
      return { success: true, isLocalOnly: true, data: payload };
    }

    // Attempt insert/upsert into user_feedbacks table or fallback to feature_usages
    let result = null;
    try {
      const { data, error } = await supabase
        .from('user_feedbacks')
        .upsert([payload], { onConflict: 'phone' })
        .select();
      if (!error && data) {
        result = data;
      }
    } catch (e) {
      // Table user_feedbacks might not exist yet, fallback to feature_usages table
    }

    if (!result) {
      await recordFeatureUsageToDB({
        featureName: 'Direct Phone Feedback',
        action: feedback.isUpdate ? 'update_feedback' : 'submit_feedback',
        metadata: payload
      });
    }

    return { success: true, data: payload };
  } catch (err) {
    console.warn('Supabase Feedback Save Error:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Get stored feedback from local storage or Supabase
 */
export function getSavedUserFeedback() {
  try {
    const stored = localStorage.getItem('grainwise_user_feedback');
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
}


/**
 * Record User Site Visit to Supabase
 */
export async function recordUserVisitToDB(visitInfo = {}) {
  if (!isSupabaseConfigured) return { success: false, reason: 'unconfigured' };
  try {
    const user = await getLoggedInUser();
    const pagePath = visitInfo.path || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const referrer = typeof document !== 'undefined' ? document.referrer : '';

    const { data, error } = await supabase
      .from('user_visits')
      .insert([{
        user_id: user?.id || null,
        page_path: pagePath,
        user_agent: userAgent,
        referrer: referrer
      }])
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.warn('Supabase Record Visit Error:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Record Feature Usage Event to Supabase
 */
export async function recordFeatureUsageToDB({ featureName, action, metadata = {} }) {
  if (!isSupabaseConfigured) return { success: false, reason: 'unconfigured' };
  try {
    const user = await getLoggedInUser();
    const { data, error } = await supabase
      .from('feature_usages')
      .insert([{
        user_id: user?.id || null,
        feature_name: featureName,
        action: action,
        metadata: metadata
      }])
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.warn('Supabase Record Feature Usage Error:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * ==========================================================
 * Supabase Authentication Helpers
 * ==========================================================
 */

export async function signUpWithEmail(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}`
      }
    });
    if (error) throw error;
    
    // Check if session was granted or confirmation email sent
    if (data.session) {
      return { success: true, data, autoSignedIn: true };
    }
    return { success: true, data, requiresConfirmation: true };
  } catch (err) {
    console.error('Supabase Sign Up Error:', err);
    return { success: false, error: err.message || 'Failed to sign up.' };
  }
}

export async function signInWithEmail(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Supabase Sign In Error:', err);
    return { success: false, error: err.message || 'Invalid email or password.' };
  }
}

export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    });
    if (error) throw error;
    
    // Notify Express backend auth API
    try {
      await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'google',
          redirectUrl: window.location.origin
        })
      });
    } catch (e) {
      // API call warning handled silently
    }

    return { success: true, data };
  } catch (err) {
    console.error('Supabase Google OAuth Error:', err);
    
    // Fallback Demo Google Authentication if Google OAuth Client ID is pending in Supabase Dashboard
    const mockGoogleUser = {
      id: 'google-' + Date.now(),
      email: 'farmer.google@Grainwish.com',
      user_metadata: {
        full_name: 'Verified Google Farmer',
        avatar_url: 'https://lh3.googleusercontent.com/a/default-user',
        provider: 'google'
      }
    };
    localStorage.setItem('grainwise_guest_user', JSON.stringify(mockGoogleUser));

    // Send to backend API
    try {
      await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockGoogleUser)
      });
    } catch (e) {}

    return { success: true, user: mockGoogleUser, isFallback: true };
  }
}

export async function signInAsGuestFarmer() {
  try {
    // Try Anonymous sign in first
    const { data, error } = await supabase.auth.signInAnonymously();
    if (!error && data?.user) {
      return { success: true, user: data.user };
    }
  } catch (e) {
    // Fallback to local session user if anonymous auth is disabled in Supabase dashboard
  }

  const mockGuest = {
    id: 'guest-' + Date.now(),
    email: 'farmer.guest@Grainwish.com',
    user_metadata: { name: 'Guest Farmer' }
  };
  localStorage.setItem('grainwise_guest_user', JSON.stringify(mockGuest));
  return { success: true, user: mockGuest };
}

export async function signOutUser() {
  try {
    localStorage.removeItem('grainwise_guest_user');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function getLoggedInUser() {
  try {
    const localGuest = localStorage.getItem('grainwise_guest_user');
    if (localGuest) return JSON.parse(localGuest);

    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    return null;
  }
}

/**
 * ==========================================================
 * Supabase Realtime Private Broadcast Channels
 * ==========================================================
 */

/**
 * Subscribe to a private user Realtime channel for INSERT, UPDATE, and DELETE broadcast events.
 * 
 * @param {Object} user - The authenticated Supabase user object containing user.id
 * @param {Object} callbacks - Event callbacks { onInsert, onUpdate, onDelete }
 * @returns {Object|null} The subscribed channel instance
 */
export async function subscribeToUserRealtimeBroadcast(user, { onInsert, onUpdate, onDelete } = {}) {
  if (!isSupabaseConfigured || !user?.id) return null;

  try {
    // 1. Get current session JWT token for Realtime Auth
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      await supabase.realtime.setAuth(session.access_token);
    }

    // 2. Initialize private channel for user topic
    const channel = supabase.channel(`user:${user.id}`, {
      config: { private: true }
    });

    if (onInsert) {
      channel.on('broadcast', { event: 'INSERT' }, (payload) => onInsert(payload));
    }
    if (onUpdate) {
      channel.on('broadcast', { event: 'UPDATE' }, (payload) => onUpdate(payload));
    }
    if (onDelete) {
      channel.on('broadcast', { event: 'DELETE' }, (payload) => onDelete(payload));
    }

    // 3. Subscribe to the channel
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`Realtime private channel user:${user.id} subscribed`);
      }
    });

    return channel;
  } catch (err) {
    console.error('Supabase Realtime Private Channel Subscription Error:', err);
    return null;
  }
}

