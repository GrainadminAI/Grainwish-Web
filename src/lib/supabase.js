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
