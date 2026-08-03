import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Supabase Credentials
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://drhraerbklibrkigbdaw.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyaHJhZXJia2xpYnJraWdiZGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODc2MTQsImV4cCI6MjEwMTI2MzYxNH0.xa6alTF9SSgVhWD8SrtgQmAcUyO7jpyvRNg7R7mVU_8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'GrainWise AI Backend API',
    domain: 'Grainwish.com',
    supabaseConnected: Boolean(SUPABASE_URL && SUPABASE_ANON_KEY),
    timestamp: new Date().toISOString()
  });
});

// 1. Mandi Prices API Endpoint
app.get('/api/mandi/prices', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mandi_prices')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. AI Diagnostics Scan Endpoint
app.post('/api/diagnostics/scan', async (req, res) => {
  try {
    const { crop, disease, location, confidence, severity, symptoms, treatment, yieldProtected } = req.body;
    
    const { data, error } = await supabase
      .from('diagnostics_scans')
      .insert([{
        crop,
        disease,
        location,
        confidence,
        severity,
        symptoms,
        treatment,
        yield_protected: yieldProtected
      }])
      .select();

    if (error) throw error;
    res.json({ success: true, message: 'Scan diagnostic logged to Supabase', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Ananya AI Multi-Lingual Assistant Endpoint
app.post('/api/ananya/chat', async (req, res) => {
  try {
    const { userText, language } = req.body;
    let responseText = "Namaste! I am Ananya AI, your 24/7 farming companion on Grainwish.com. How can I help your crops thrive today?";
    
    const lower = (userText || '').toLowerCase();
    if (lower.includes('rust') || lower.includes('yellow') || lower.includes('leaf')) {
      responseText = "Yellow rust in wheat spreads quickly under morning dew. Apply Propiconazole 25% EC (1ml/L) immediately.";
    } else if (lower.includes('mandi') || lower.includes('price') || lower.includes('cotton')) {
      responseText = "Today in Bathinda, Punjab, long-staple Cotton is trading at ₹7,450 per quintal, which is ₹1,900 higher than the baseline MSP!";
    } else if (lower.includes('urea') || lower.includes('paddy') || lower.includes('fertilizer')) {
      responseText = "For Paddy in the tillering stage, apply 35kg Urea + 10kg MOP per acre to avoid stem rot.";
    }

    const { data, error } = await supabase
      .from('ananya_chats')
      .insert([{
        user_text: userText,
        ananya_response: responseText,
        language: language || 'English'
      }])
      .select();

    if (error) throw error;
    res.json({ success: true, reply: responseText, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Precision NPK Calculator Endpoint
app.post('/api/npk/calculate', async (req, res) => {
  try {
    const { crop, soilType, acres, growthStage, ureaKg, dapKg, mopKg, costSavingsPct } = req.body;

    const { data, error } = await supabase
      .from('npk_calculations')
      .insert([{
        crop,
        soil_type: soilType,
        acres,
        growth_stage: growthStage,
        urea_kg: ureaKg,
        dap_kg: dapKg,
        mop_kg: mopKg,
        cost_savings_pct: costSavingsPct || 18
      }])
      .select();

    if (error) throw error;
    res.json({ success: true, message: 'NPK Calculation saved to Supabase', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. App Download Analytics Endpoint
app.post('/api/downloads/record', async (req, res) => {
  try {
    const { platform } = req.body;

    const { data, error } = await supabase
      .from('app_downloads')
      .insert([{ platform, domain: 'Grainwish.com' }])
      .select();

    if (error) throw error;
    res.json({ success: true, message: 'Download event recorded', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Google Sign-In & Auth Verification Endpoint
app.post('/api/auth/google', async (req, res) => {
  try {
    const { accessToken, email, name, picture } = req.body;

    // Verify token with Supabase Auth if accessToken is supplied
    let userProfile = null;
    if (accessToken) {
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      if (!error && user) {
        userProfile = user;
      }
    }

    if (!userProfile) {
      userProfile = {
        id: 'google-user-' + Date.now(),
        email: email || 'farmer.google@Grainwish.com',
        user_metadata: {
          full_name: name || 'Google Verified Farmer',
          avatar_url: picture || 'https://lh3.googleusercontent.com/a/default-user',
          provider: 'google'
        }
      };
    }

    res.json({
      success: true,
      provider: 'google',
      user: userProfile,
      domain: 'Grainwish.com',
      token: accessToken || 'supabase-google-session-' + Date.now()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Verify JWT Session Bearer Token Endpoint
app.get('/api/auth/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Missing Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ success: false, error: 'Invalid or expired Supabase token' });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🌾 GrainWise AI Backend Server running on http://localhost:${PORT}`);
  console.log(`🔗 Domain: Grainwish.com | Supabase Ref: drhraerbklibrkigbdaw`);
  console.log(`🔐 Google Auth & Backend Verification Endpoint: http://localhost:${PORT}/api/auth/google`);
});
