import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoreHighlights from './components/CoreHighlights';
import EmpowerHarvest from './components/EmpowerHarvest';
import DiagnosticsTool from './components/DiagnosticsTool';
import NPKCalculator from './components/NPKCalculator';
import AnanyaAIAssistant from './components/AnanyaAIAssistant';
import MandiPrices from './components/MandiPrices';
import FarmingCalendar from './components/FarmingCalendar';
import FarmerStories from './components/FarmerStories';
import FAQSection from './components/FAQSection';
import DownloadModal from './components/DownloadModal';
import FooterSection from './components/FooterSection';
import { recordUserVisitToDB } from './lib/supabase';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  useEffect(() => {
    // Record user visit when landing on website
    recordUserVisitToDB();
  }, []);

  return (
    <div className="min-h-screen bg-[#021109] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Navigation */}
      <Navbar
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />

      {/* Hero Section with 3D Canvas */}
      <HeroSection
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        onGoogleSignIn={() => {
          const navAuthBtn = document.querySelector('header button');
          if (navAuthBtn) navAuthBtn.click();
        }}
        onScanClick={() => {
          const el = document.getElementById('diagnostics');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3 Core Highlights */}
      <CoreHighlights selectedLang={selectedLang} />

      {/* Empower Harvest & 7 Features Grid */}
      <EmpowerHarvest onOpenDownloadModal={() => setDownloadModalOpen(true)} />

      {/* Camera-Based AI Diagnostics Simulator */}
      <DiagnosticsTool />

      {/* Precision NPK Calculator */}
      <NPKCalculator />

      {/* Ananya AI Assistant (22 Languages) */}
      <AnanyaAIAssistant
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />

      {/* Live Mandi Prices & MSP Locator */}
      <MandiPrices />

      {/* Farming Calendar & Government Schemes */}
      <FarmingCalendar />

      {/* Farmer Stories & Case Studies */}
      <FarmerStories />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Footer Section */}
      <FooterSection onOpenDownloadModal={() => setDownloadModalOpen(true)} />

      {/* App Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

    </div>
  );
}
