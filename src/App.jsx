import React, { useState, useEffect, lazy, Suspense } from 'react';
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
import SecurityPolicyPage from './components/SecurityPolicyPage';
import NotFoundPage from './components/NotFoundPage';
import { recordUserVisitToDB } from './lib/supabase';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { BrandThemeProvider } from './lib/BrandThemeContext';
import BrandThemeModal from './components/BrandThemeModal';

const ThreeFarmCanvas = lazy(() => import('./components/ThreeFarmCanvas'));

function MainLandingPage({ onOpenDownloadModal, onOpenPrivacyPolicy, onOpenTerms, onOpenSecurityPolicy }) {
  const { selectedLang, setSelectedLang } = useLanguage();

  const handleScanClick = () => {
    const el = document.getElementById('diagnostics');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#021109] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Global Smart AgriTech 4K HDR Living Background Layer (Video + Three.js Cyber Farm Grid) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Living Google Flow Farm Video Layer Without Audio - 4K HDR Filter */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/flow_farm_poster.jpg"
          className="w-full h-full object-cover opacity-60 filter brightness-108 contrast-120 saturate-130 [image-rendering:-webkit-optimize-contrast] transform-gpu"
        >
          <source src="/assets/flow_farm_background.mp4" type="video/mp4" />
          <source src="https://flow-content.google/video/5cd2638b-4b4c-4ace-b9f4-b6126ef94611?Expires=1792852818&KeyName=labs-flow-prod-cdn-key&Signature=bOEf06Hwg7HNhfowrxjPf91Kr6Q" type="video/mp4" />
        </video>

        {/* 3D Smart AgriTech Canvas (Wind Crops, Solar Rays, Furrow Grid, Pollen Sparkles) */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <ThreeFarmCanvas />
          </Suspense>
        </div>

        {/* Dark Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021109]/70 via-transparent to-[#021109]/80" />
      </div>

      <div className="relative z-10">
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
        onOpenSecurityPolicy={onOpenSecurityPolicy}
      />

      {/* Mobile Sticky Quick-Action Bar */}
      <FloatingMobileBar
        onOpenDownloadModal={onOpenDownloadModal}
        onScanClick={handleScanClick}
      />

      </div>
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
    if (path === '/security' || hash === '#security') return 'security';
    if (path === '/' || path === '' || path === '/index.html') return 'home';
    return '404';
  });

  useEffect(() => {
    let timer50, timer200;

    if (typeof window !== 'undefined') {
      // Force manual scroll restoration so browsers do not restore scroll position down to #ananya-ai
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      // If opened with #ananya-ai, strip it and stay firmly at the top Hero section
      if (window.location.hash && window.location.hash.toLowerCase() === '#ananya-ai') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }

      // Ensure website opens at the very top (Hero Section) without auto-scrolling
      const resetScrollToTop = () => {
        if (!window.location.hash || window.location.hash.toLowerCase() === '#ananya-ai') {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      };

      resetScrollToTop();
      requestAnimationFrame(resetScrollToTop);
      timer50 = setTimeout(resetScrollToTop, 50);
      timer200 = setTimeout(resetScrollToTop, 200);

      // Record initial visit in Supabase
      recordUserVisitToDB({
        path: window.location.pathname + (window.location.hash || '')
      });
    }

    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/privacy' || hash === '#privacy') {
        setCurrentRoute('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/terms' || hash === '#terms') {
        setCurrentRoute('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/security' || hash === '#security') {
        setCurrentRoute('security');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/' || path === '' || path === '/index.html' || hash.startsWith('#')) {
        setCurrentRoute('home');
      } else {
        setCurrentRoute('404');
      }

      recordUserVisitToDB({
        path: window.location.pathname + (window.location.hash || '')
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      clearTimeout(timer50);
      clearTimeout(timer200);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (route, hash = '') => {
    setCurrentRoute(route);
    let newPath = '/';
    if (route === 'privacy') newPath = '/privacy';
    else if (route === 'terms') newPath = '/terms';
    else if (route === 'security') newPath = '/security';
    else if (route === '404') newPath = '/404';

    if (hash) newPath += hash;
    window.history.pushState({}, '', newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Record route navigation visit to Supabase
    recordUserVisitToDB({ path: newPath });

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

      {currentRoute === 'security' && (
        <SecurityPolicyPage onBackToHome={() => navigateTo('home')} />
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
          onOpenSecurityPolicy={() => navigateTo('security')}
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
      <BrandThemeProvider>
        <RootApp />
        <BrandThemeModal />
      </BrandThemeProvider>
    </LanguageProvider>
  );
}
