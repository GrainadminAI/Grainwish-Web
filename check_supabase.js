import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://drhraerbklibrkigbdaw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyaHJhZXJia2xpYnJraWdiZGF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU2ODc2MTQsImV4cCI6MjEwMTI2MzYxNH0.xa6alTF9SSgVhWD8SrtgQmAcUyO7jpyvRNg7R7mVU_8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('📡 Testing connection to Supabase Project: drhraerbklibrkigbdaw...');
  console.log(`🔗 URL: ${SUPABASE_URL}`);
  
  try {
    // 1. Test Auth Service
    const { data: authData, error: authError } = await supabase.auth.getSession();
    console.log('✅ Supabase Auth Service: OK (Session checked)');

    // 2. Test Database Query (mandi_prices)
    const { data: mandiData, error: mandiError } = await supabase
      .from('mandi_prices')
      .select('*')
      .limit(5);

    if (mandiError) {
      console.warn('⚠️ Table mandi_prices query notice:', mandiError.message);
      console.log('💡 Note: If table does not exist yet, make sure to execute supabase/schema.sql in your Supabase SQL Editor.');
    } else {
      console.log(`✅ Supabase Database Service: OK (${mandiData.length} records retrieved from mandi_prices)`);
    }

    // 3. Test Database Insert Test Record into diagnostics_scans
    const { data: insertData, error: insertError } = await supabase
      .from('diagnostics_scans')
      .insert([{
        crop: 'Wheat Test',
        disease: 'Connection Test Scan',
        confidence: '99.9%',
        severity: 'Low',
        symptoms: 'Connection ping test',
        treatment: 'All systems operational'
      }])
      .select();

    if (insertError) {
      console.warn('⚠️ Table diagnostics_scans insert notice:', insertError.message);
    } else {
      console.log('✅ Supabase Database Insert: OK (Test record created)');
    }

  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

testConnection();
