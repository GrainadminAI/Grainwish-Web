-- ==========================================================
-- GrainWise AI (grainwish.com) - Supabase Database Schema
-- Run this script in your Supabase SQL Editor
-- ==========================================================

-- 1. Create Mandi Prices Table
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

-- 2. Create AI Crop Diagnostic Scans Table
CREATE TABLE IF NOT EXISTS public.diagnostics_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 3. Create Ananya AI Chat Logs Table
CREATE TABLE IF NOT EXISTS public.ananya_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_text TEXT NOT NULL,
  ananya_response TEXT NOT NULL,
  language VARCHAR(50) DEFAULT 'English',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create NPK Calculations Table
CREATE TABLE IF NOT EXISTS public.npk_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 5. Create App Downloads Table
CREATE TABLE IF NOT EXISTS public.app_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(100) NOT NULL,
  domain VARCHAR(100) DEFAULT 'Grainwish.com',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================================
-- Enable Row Level Security (RLS) & Public Read Access
-- ==========================================================

ALTER TABLE public.mandi_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostics_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ananya_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.npk_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_downloads ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Allow Public Read Mandi Prices" ON public.mandi_prices FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert Diagnostics" ON public.diagnostics_scans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read Diagnostics" ON public.diagnostics_scans FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert Ananya Chats" ON public.ananya_chats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Read Ananya Chats" ON public.ananya_chats FOR SELECT USING (true);
CREATE POLICY "Allow Public Insert NPK" ON public.npk_calculations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow Public Insert App Downloads" ON public.app_downloads FOR INSERT WITH CHECK (true);

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
