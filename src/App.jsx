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
import CookieConsentBanner from './components/CookieConsentBanner';
import FloatingMobileBar from './components/FloatingMobileBar';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import NotFoundPage from './components/NotFoundPage';
import { recordUserVisitToDB } from './lib/supabase';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';

function MainLandingPage({ onOpenDownloadModal, onOpenPrivacyPolicy, onOpenTerms }) {
  const { selectedLang, setSelectedLang } = useLanguage();

  const handleScanClick = () => {
    const el = document.getElementById('diagnostics');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#021109] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Navigation */}
      <Navbar
        onOpenDownloadModal={onOpenDownloadModal}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />

      {/* Hero Section with 3D Canvas */}
      <HeroSection
        onOpenDownloadModal={onOpenDownloadModal}
        onScanClick={handleScanClick}
      />

      {/* 3 Core Highlights */}
      <CoreHighlights selectedLang={selectedLang} />

      {/* Empower Harvest & Features Grid */}
      <EmpowerHarvest onOpenDownloadModal={onOpenDownloadModal} />

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
      <FooterSection
        onOpenDownloadModal={onOpenDownloadModal}
        onOpenPrivacyPolicy={onOpenPrivacyPolicy}
        onOpenTerms={onOpenTerms}
      />

      {/* Mobile Sticky Quick-Action Bar */}
      <FloatingMobileBar
        onOpenDownloadModal={onOpenDownloadModal}
        onScanClick={handleScanClick}
      />

    </div>
  );
}

function RootApp() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/privacy' || hash === '#privacy') return 'privacy';
    if (path === '/terms' || hash === '#terms') return 'terms';
    if (path === '/' || path === '' || path === '/index.html') return 'home';
    return '404';
  });

  useEffect(() => {
    recordUserVisitToDB();

    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/privacy' || hash === '#privacy') {
        setCurrentRoute('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/terms' || hash === '#terms') {
        setCurrentRoute('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/' || path === '' || path === '/index.html' || hash.startsWith('#')) {
        setCurrentRoute('home');
      } else {
        setCurrentRoute('404');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (route, hash = '') => {
    setCurrentRoute(route);
    let newPath = '/';
    if (route === 'privacy') newPath = '/privacy';
    else if (route === 'terms') newPath = '/terms';
    else if (route === '404') newPath = '/404';

    if (hash) newPath += hash;
    window.history.pushState({}, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      {currentRoute === 'privacy' && (
        <PrivacyPolicyPage onBackToHome={() => navigateTo('home')} />
      )}

      {currentRoute === 'terms' && (
        <TermsConditionsPage onBackToHome={() => navigateTo('home')} />
      )}

      {currentRoute === '404' && (
        <NotFoundPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateSection={(secId) => navigateTo('home', `#${secId}`)}
        />
      )}

      {currentRoute === 'home' && (
        <MainLandingPage
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
          onOpenPrivacyPolicy={() => navigateTo('privacy')}
          onOpenTerms={() => navigateTo('terms')}
        />
      )}

      {/* App Download / Pre-Registration Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacyPolicy={() => navigateTo('privacy')}
      />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RootApp />
    </LanguageProvider>
  );
}
