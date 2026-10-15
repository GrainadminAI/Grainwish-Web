-- ==========================================================
-- GrainWise AI (grainwish.com) - Supabase Database Schema
-- Run this script in your Supabase SQL Editor
-- Official Support & Inquiries: support@grainwish.com
-- ==========================================================

-- 1. Create Google OAuth User Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'google',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Mandi Prices Table
CREATE TABLE IF NOT EXISTS public.mandi_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  commodity VARCHAR(255) NOT NULL,
  state VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  market VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  msp VARCHAR(50) NOT NULL,
  diff VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  distance VARCHAR(50) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create AI Crop Diagnostic Scans Table
CREATE TABLE IF NOT EXISTS public.diagnostics_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  crop VARCHAR(100) NOT NULL,
  disease VARCHAR(255) NOT NULL,
  location VARCHAR(100),
  confidence VARCHAR(20) NOT NULL,
  severity VARCHAR(100),
  symptoms TEXT,
  treatment TEXT,
  yield_protected VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Ananya AI Chat Logs Table
CREATE TABLE IF NOT EXISTS public.ananya_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_text TEXT NOT NULL,
  ananya_response TEXT NOT NULL,
  language VARCHAR(50) DEFAULT 'English',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create NPK Calculations Table
CREATE TABLE IF NOT EXISTS public.npk_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  crop VARCHAR(100) NOT NULL,
  soil_type VARCHAR(100) NOT NULL,
  acres NUMERIC(5, 2) NOT NULL,
  growth_stage VARCHAR(100) NOT NULL,
  urea_kg INTEGER NOT NULL,
  dap_kg INTEGER NOT NULL,
  mop_kg INTEGER NOT NULL,
  cost_savings_pct INTEGER DEFAULT 18,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create App Downloads Table
CREATE TABLE IF NOT EXISTS public.app_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(100) NOT NULL,
  domain VARCHAR(100) DEFAULT 'Grainwish.com',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6b. Create Direct Mobile Feedback Table
CREATE TABLE IF NOT EXISTS public.user_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  phone VARCHAR(50),
  email VARCHAR(255),
  category VARCHAR(100) DEFAULT 'General',
  rating INTEGER DEFAULT 5,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT user_feedbacks_phone_key UNIQUE (phone)
);

-- 7. Create User Visits Table
CREATE TABLE IF NOT EXISTS public.user_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  page_path VARCHAR(255) DEFAULT '/',
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create Feature Usages Table
CREATE TABLE IF NOT EXISTS public.feature_usages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  feature_name VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- Automatic User Profile Creation Trigger for Google Sign-In
-- ==========================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Google Farmer'),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_app_meta_data->>'provider', 'google')
  )
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      avatar_url = EXCLUDED.avatar_url,
      updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-create Trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================================
-- Enable Row Level Security (RLS) & Define Public Access Policies
-- ==========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandi_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostics_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ananya_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.npk_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_usages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedbacks ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Allow Public Read Profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow User Read Own Profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow Public Read Mandi Prices" ON public.mandi_prices;
DROP POLICY IF EXISTS "Allow Public Insert Diagnostics" ON public.diagnostics_scans;
DROP POLICY IF EXISTS "Allow Public Read Diagnostics" ON public.diagnostics_scans;
DROP POLICY IF EXISTS "Allow Public Insert Ananya Chats" ON public.ananya_chats;
DROP POLICY IF EXISTS "Allow Public Read Ananya Chats" ON public.ananya_chats;
DROP POLICY IF EXISTS "Allow Public Insert NPK" ON public.npk_calculations;
DROP POLICY IF EXISTS "Allow Public Read NPK" ON public.npk_calculations;
DROP POLICY IF EXISTS "Allow Public Insert App Downloads" ON public.app_downloads;
DROP POLICY IF EXISTS "Allow Public Read App Downloads" ON public.app_downloads;
DROP POLICY IF EXISTS "Users can insert their own visits" ON public.user_visits;
DROP POLICY IF EXISTS "Allow Public Insert User Visits" ON public.user_visits;
DROP POLICY IF EXISTS "Allow Public Read User Visits" ON public.user_visits;
DROP POLICY IF EXISTS "Allow Public Insert Feature Usages" ON public.feature_usages;
DROP POLICY IF EXISTS "Allow Public Read Feature Usages" ON public.feature_usages;
DROP POLICY IF EXISTS "Allow Public Insert User Feedbacks" ON public.user_feedbacks;
DROP POLICY IF EXISTS "Allow Public Read User Feedbacks" ON public.user_feedbacks;
DROP POLICY IF EXISTS "Allow Public Update User Feedbacks" ON public.user_feedbacks;

-- Create Policies
CREATE POLICY "Allow Public Read Profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow Public Read Mandi Prices" ON public.mandi_prices FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert Diagnostics" ON public.diagnostics_scans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read Diagnostics" ON public.diagnostics_scans FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert Ananya Chats" ON public.ananya_chats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read Ananya Chats" ON public.ananya_chats FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert NPK" ON public.npk_calculations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read NPK" ON public.npk_calculations FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert App Downloads" ON public.app_downloads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read App Downloads" ON public.app_downloads FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert User Visits" ON public.user_visits FOR INSERT TO public WITH CHECK ((user_id IS NULL) OR (user_id = (SELECT auth.uid())));
CREATE POLICY "Allow Public Read User Visits" ON public.user_visits FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert Feature Usages" ON public.feature_usages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read Feature Usages" ON public.feature_usages FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert User Feedbacks" ON public.user_feedbacks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read User Feedbacks" ON public.user_feedbacks FOR SELECT USING (true);
CREATE POLICY "Allow Public Update User Feedbacks" ON public.user_feedbacks FOR UPDATE USING (true);


-- ==========================================================
-- Seed Initial Mandi Prices Data
-- ==========================================================

INSERT INTO public.mandi_prices (commodity, state, district, market, price, msp, diff, status, distance) VALUES
('Wheat (Sharbati)', 'Maharashtra', 'Nashik', 'Nashik Main Mandi', '₹2,840 / qtl', '₹2,275 / qtl', '+₹565', 'Up (+4.2%)', '12 km'),
('Cotton (Long Staple)', 'Punjab', 'Bathinda', 'Bathinda Grain Market', '₹7,450 / qtl', '₹5,550 / qtl', '+₹1,900', 'Up (+6.8%)', '8 km'),
('Paddy (Basmati 1509)', 'Telangana', 'Warangal', 'Warangal Agriculture Market', '₹3,920 / qtl', '₹2,183 / qtl', '+₹1,737', 'Up (+3.1%)', '15 km'),
('Turmeric (Finger)', 'Tamil Nadu', 'Erode', 'Erode Turmeric Market', '₹14,200 / qtl', '₹10,500 / qtl', '+₹3,700', 'Up (+8.4%)', '6 km'),
('Mustard (Yellow)', 'Rajasthan', 'Bharatpur', 'Bharatpur Krishi Mandi', '₹5,680 / qtl', '₹5,450 / qtl', '+₹230', 'Stable', '22 km'),
('Soybean (Black)', 'Madhya Pradesh', 'Indore', 'Indore Central Mandi', '₹4,890 / qtl', '₹4,600 / qtl', '+₹290', 'Up (+1.5%)', '10 km');

-- ==========================================================
-- 9. Create Virtual Pools Table (16 MT Aggregated Pools)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.virtual_pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_code VARCHAR(100) NOT NULL UNIQUE,
  fpo_name VARCHAR(255) NOT NULL,
  commodity VARCHAR(100) NOT NULL DEFAULT 'ITC Grade A Wheat',
  quantity_mt NUMERIC(10, 2) NOT NULL DEFAULT 16.00,
  lot_count INTEGER NOT NULL DEFAULT 4,
  avg_moisture NUMERIC(5, 2) NOT NULL DEFAULT 12.1,
  broken_pct NUMERIC(5, 2) NOT NULL DEFAULT 1.2,
  foreign_matter_pct NUMERIC(5, 2) NOT NULL DEFAULT 0.8,
  offered_price NUMERIC(10, 2) NOT NULL DEFAULT 2550.00,
  status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE', -- AVAILABLE, LOCKED, DISPATCHED, COMPLETED
  ble_device_model VARCHAR(100) DEFAULT 'Dickey-John MiniGAC',
  ble_serial VARCHAR(100) DEFAULT 'DJ-GAC-9842-X',
  ble_rssi VARCHAR(20) DEFAULT '-64 dBm',
  ble_battery VARCHAR(20) DEFAULT '92%',
  gps_accuracy VARCHAR(50) DEFAULT '± 2.4 meters',
  ambient_lux VARCHAR(50) DEFAULT '14,200 Lux (Direct Sunlight)',
  bsa_hash_stamp VARCHAR(255) DEFAULT 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- 10. Create Buyer Procurement Specs Table
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.buyer_procurement_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_name VARCHAR(255) NOT NULL DEFAULT 'ITC Foods & Agri-Business',
  grade_name VARCHAR(100) NOT NULL DEFAULT 'ITC Grade A Wheat',
  max_moisture_pct NUMERIC(5, 2) NOT NULL DEFAULT 12.0,
  max_broken_pct NUMERIC(5, 2) NOT NULL DEFAULT 2.0,
  max_foreign_matter_pct NUMERIC(5, 2) NOT NULL DEFAULT 1.0,
  max_chalkiness_pct NUMERIC(5, 2) NOT NULL DEFAULT 1.5,
  offered_price NUMERIC(10, 2) NOT NULL DEFAULT 2550.00,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- 11. Create Active Consignments Table (In-Transit Trucks)
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.consignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gate_pass_code VARCHAR(100) NOT NULL UNIQUE,
  truck_number VARCHAR(50) NOT NULL,
  driver_name VARCHAR(100) NOT NULL,
  driver_phone VARCHAR(50) NOT NULL,
  origin_fpo VARCHAR(255) NOT NULL,
  destination_mill VARCHAR(255) NOT NULL DEFAULT 'ITC Mill #4, Dewas, MP',
  commodity VARCHAR(100) NOT NULL DEFAULT 'ITC Grade A Wheat',
  origin_weight_kg NUMERIC(10, 2) NOT NULL DEFAULT 16000.00,
  origin_moisture_pct NUMERIC(5, 2) NOT NULL DEFAULT 12.1,
  dest_weight_kg NUMERIC(10, 2),
  dest_moisture_pct NUMERIC(5, 2),
  transit_status VARCHAR(50) NOT NULL DEFAULT 'In Transit', -- In Transit, Approaching Weighbridge, Gate-In Completed
  signed_contract_url TEXT,
  dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  arrived_at TIMESTAMP WITH TIME ZONE
);

-- ==========================================================
-- 12. Create NABL Escalations & Referee Testing Table
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.nabl_escalations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_id UUID REFERENCES public.consignments(id) ON DELETE CASCADE,
  gate_pass_code VARCHAR(100) NOT NULL,
  dispute_reason TEXT NOT NULL,
  origin_moisture NUMERIC(5, 2) NOT NULL,
  destination_moisture NUMERIC(5, 2) NOT NULL,
  deviation_pct NUMERIC(5, 2) NOT NULL,
  referee_lab VARCHAR(100) NOT NULL DEFAULT 'SGS India (NABL Accredited)',
  escalation_status VARCHAR(50) NOT NULL DEFAULT 'REFEREE_TEST_PENDING', -- REFEREE_TEST_PENDING, RESULT_VERIFIED, RESOLVED
  nabl_certificate_url TEXT,
  original_escrow_amount NUMERIC(12, 2) NOT NULL DEFAULT 408000.00,
  recalculated_escrow_amount NUMERIC(12, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- 13. Create Live Settlements Table
-- ==========================================================
CREATE TABLE IF NOT EXISTS public.settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consignment_id UUID REFERENCES public.consignments(id) ON DELETE SET NULL,
  gate_pass_code VARCHAR(100) NOT NULL,
  fpo_name VARCHAR(255) NOT NULL,
  gross_amount NUMERIC(12, 2) NOT NULL,
  deductions NUMERIC(12, 2) DEFAULT 0.00,
  net_payout NUMERIC(12, 2) NOT NULL,
  disbursement_status VARCHAR(50) NOT NULL DEFAULT 'T+2 Escrow Release Pending',
  settled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE public.virtual_pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.buyer_procurement_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nabl_escalations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow Public Access Pools" ON public.virtual_pools FOR ALL USING (true);
CREATE POLICY "Allow Public Access Specs" ON public.buyer_procurement_specs FOR ALL USING (true);
CREATE POLICY "Allow Public Access Consignments" ON public.consignments FOR ALL USING (true);
CREATE POLICY "Allow Public Access NABL" ON public.nabl_escalations FOR ALL USING (true);
CREATE POLICY "Allow Public Access Settlements" ON public.settlements FOR ALL USING (true);

