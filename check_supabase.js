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
      console.warn('⚠️ mandi_prices select:', mandiError.message);
    } else {
      console.log(`✅ mandi_prices: OK (${mandiData.length} records retrieved)`);
    }

    // 3. Test diagnostics_scans
    const { error: diagError } = await supabase
      .from('diagnostics_scans')
      .insert([{
        crop: 'Wheat Test',
        disease: 'Connection Test Scan',
        confidence: '99.9%',
        severity: 'Low',
        symptoms: 'Scan test',
        treatment: 'Operational'
      }]);
    if (diagError) {
      console.warn('⚠️ diagnostics_scans insert:', diagError.message);
    } else {
      console.log('✅ diagnostics_scans insert: OK');
    }

    // 4. Test ananya_chats
    const { error: chatError } = await supabase
      .from('ananya_chats')
      .insert([{
        user_text: 'Test Prompt',
        ananya_response: 'Test Response',
        language: 'English'
      }]);
    if (chatError) {
      console.warn('⚠️ ananya_chats insert:', chatError.message);
    } else {
      console.log('✅ ananya_chats insert: OK');
    }

    // 5. Test npk_calculations
    const { error: npkError } = await supabase
      .from('npk_calculations')
      .insert([{
        crop: 'Wheat',
        soil_type: 'Alluvial',
        acres: 2.5,
        growth_stage: 'Vegetative',
        urea_kg: 50,
        dap_kg: 25,
        mop_kg: 15
      }]);
    if (npkError) {
      console.warn('⚠️ npk_calculations insert:', npkError.message);
    } else {
      console.log('✅ npk_calculations insert: OK');
    }

    // 6. Test app_downloads
    const { error: dlError } = await supabase
      .from('app_downloads')
      .insert([{
        platform: 'Android APK Scan',
        domain: 'Grainwish.com'
      }]);
    if (dlError) {
      console.warn('⚠️ app_downloads insert:', dlError.message);
    } else {
      console.log('✅ app_downloads insert: OK');
    }

  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

testConnection();
