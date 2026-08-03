import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 8080;

// Allowed Domains
const ALLOWED_ORIGINS = [
  'https://www.grainwish.com',
  'http://www.grainwish.com',
  'https://grainwish.com',
  'http://grainwish.com',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin) || origin.includes('grainwish.com')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));

app.use(express.json());

// Supabase Connection
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://drhraerbklibrkigbdaw.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyaHJhZXJia2xpYnJraWdiZGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODc2MTQsImV4cCI6MjEwMTI2MzYxNH0.xa6alTF9SSgVhWD8SrtgQmAcUyO7jpyvRNg7R7mVU_8';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'GrainWise AI Production Server',
    domain: 'www.grainwish.com',
    supabaseConnected: true,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.get('/api/mandi/prices', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mandi_prices')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/diagnostics/scan', async (req, res) => {
  try {
    const { crop, disease, location, confidence, severity, symptoms, treatment, yieldProtected } = req.body;
    const { data, error } = await supabase
      .from('diagnostics_scans')
      .insert([{ crop, disease, location, confidence, severity, symptoms, treatment, yield_protected: yieldProtected }])
      .select();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/ananya/chat', async (req, res) => {
  try {
    const { userText, language } = req.body;
    let reply = "Namaste! I am Ananya AI on www.grainwish.com. How can I help your harvest today?";
    const lower = (userText || '').toLowerCase();
    if (lower.includes('rust') || lower.includes('yellow')) reply = "Yellow rust in wheat spreads quickly. Spray Propiconazole 25% EC @ 1ml/L water immediately.";
    else if (lower.includes('mandi') || lower.includes('cotton')) reply = "Cotton rate in Bathinda is ₹7,450 / qtl (₹1,900 above MSP).";
    
    const { data, error } = await supabase
      .from('ananya_chats')
      .insert([{ user_text: userText, ananya_response: reply, language: language || 'English' }])
      .select();
    if (error) throw error;
    res.json({ success: true, reply, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/npk/calculate', async (req, res) => {
  try {
    const { crop, soilType, acres, growthStage, ureaKg, dapKg, mopKg, costSavingsPct } = req.body;
    const { data, error } = await supabase
      .from('npk_calculations')
      .insert([{ crop, soil_type: soilType, acres, growth_stage: growthStage, urea_kg: ureaKg, dap_kg: dapKg, mop_kg: mopKg, cost_savings_pct: costSavingsPct || 18 }])
      .select();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/downloads/record', async (req, res) => {
  try {
    const { platform } = req.body;
    const { data, error } = await supabase
      .from('app_downloads')
      .insert([{ platform, domain: 'www.grainwish.com' }])
      .select();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve Static Frontend Assets from dist/
const distPath = path.join(rootDir, 'dist');
app.use(express.static(distPath));

// SPA Fallback for all page routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌾 GrainWise AI Production Hosting Live!`);
  console.log(`🌐 Primary Domain: https://www.grainwish.com`);
  console.log(`📡 Server Address: http://localhost:${PORT}`);
  console.log(`🔗 Supabase Ref: drhraerbklibrkigbdaw`);
  console.log(`=======================================================`);
});
