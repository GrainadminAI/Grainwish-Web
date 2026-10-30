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
import SecurityPolicyPage from './components/SecurityPolicyPage';
import CertificateTermsPage from './components/CertificateTermsPage';
import GrievanceRedressalPage from './components/GrievanceRedressalPage';
import CropDiseasePage, { CROP_DISEASES_DATA } from './components/CropDiseasePages';
import MandiStatePage, { MANDI_STATE_DATA } from './components/MandiStatePages';
import NotFoundPage from './components/NotFoundPage';
import { recordUserVisitToDB } from './lib/supabase';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { BrandThemeProvider } from './lib/BrandThemeContext';

const LANG_PATH_MAP = {
  '/hi': 'Hindi',
  '/pa': 'Punjabi',
  '/mr': 'Marathi',
  '/te': 'Telugu',
  '/ta': 'Tamil',
  '/bn': 'Bengali',
  '/gu': 'Gujarati',
  '/kn': 'Kannada',
  '/ml': 'Malayalam',
  '/or': 'Odia'
};

function MainLandingPage({ onOpenDownloadModal, onOpenPrivacyPolicy, onOpenTerms, onOpenSecurityPolicy, onOpenCertificateTerms, onOpenGrievance }) {
  const { selectedLang, setSelectedLang } = useLanguage();

  const handleScanClick = () => {
    const el = document.getElementById('diagnostics');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#021109] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Website Background using watermark-free Google Flow agricultural video */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/grainwish_farm_flow_poster.jpg"
          style={{
            opacity: 0.55,
            filter: "brightness(0.95) contrast(1.15)"
          }}
          aria-hidden="true"
        >
          <source src="/assets/grainwish_farm_flow.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Subtle directional gradient overlays ensuring 100% typography contrast while preserving background visuals */}
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-r from-[#021109]/95 via-[#021109]/75 to-transparent"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#021109]/80 via-transparent to-[#021109]/90"
        aria-hidden="true"
      />

      <div className="relative z-10 pb-16 md:pb-0">
        {/* Navigation */}
        <Navbar
          onOpenDownloadModal={onOpenDownloadModal}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
          onOpenPrivacyPolicy={onOpenPrivacyPolicy}
          onOpenTerms={onOpenTerms}
          onOpenSecurityPolicy={onOpenSecurityPolicy}
          onOpenCertificateTerms={onOpenCertificateTerms}
          onOpenGrievance={onOpenGrievance}
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
        onOpenCertificateTerms={onOpenCertificateTerms}
        onOpenGrievance={onOpenGrievance}
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
  const { setSelectedLang } = useLanguage();
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [diseaseSlug, setDiseaseSlug] = useState('wheat-yellow-rust');
  const [mandiSlug, setMandiSlug] = useState('punjab-wheat');
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/privacy' || path === '/privacy-policy' || hash === '#privacy' || hash === '#privacy-policy') return 'privacy';
    if (path === '/terms' || path === '/terms-and-conditions' || hash === '#terms' || hash === '#terms-and-conditions') return 'terms';
    if (path === '/security' || hash === '#security') return 'security';
    if (path === '/certificate-terms' || hash === '#certificate-terms') return 'certificate-terms';
    if (path === '/grievance' || hash === '#grievance') return 'grievance';
    if (path.startsWith('/diseases/')) return 'disease';
    if (path.startsWith('/mandi-prices/')) return 'mandi-state';
    if (LANG_PATH_MAP[path]) return 'home';
    if (path === '/' || path === '' || path === '/index.html') return 'home';
    return '404';
  });

  useEffect(() => {
    let timer50, timer200;

    if (typeof window !== 'undefined') {
      const initPath = window.location.pathname.toLowerCase();
      if (LANG_PATH_MAP[initPath]) {
        setSelectedLang(LANG_PATH_MAP[initPath]);
        document.documentElement.lang = initPath.replace('/', '');
      } else if (initPath.startsWith('/diseases/')) {
        const slug = initPath.replace('/diseases/', '').replace(/\/$/, '');
        if (CROP_DISEASES_DATA[slug]) setDiseaseSlug(slug);
      } else if (initPath.startsWith('/mandi-prices/')) {
        const slug = initPath.replace('/mandi-prices/', '').replace(/\/$/, '');
        if (MANDI_STATE_DATA[slug]) setMandiSlug(slug);
      }

      // Silence and cancel any speech synthesis per user request ("remove the website audio")
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (_) {}
      }

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
      if (path === '/privacy' || path === '/privacy-policy' || hash === '#privacy' || hash === '#privacy-policy') {
        setCurrentRoute('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/terms' || path === '/terms-and-conditions' || hash === '#terms' || hash === '#terms-and-conditions') {
        setCurrentRoute('terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/security' || hash === '#security') {
        setCurrentRoute('security');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/certificate-terms' || hash === '#certificate-terms') {
        setCurrentRoute('certificate-terms');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path === '/grievance' || hash === '#grievance') {
        setCurrentRoute('grievance');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path.startsWith('/diseases/')) {
        const slug = path.replace('/diseases/', '').replace(/\/$/, '');
        if (CROP_DISEASES_DATA[slug]) {
          setDiseaseSlug(slug);
          setCurrentRoute('disease');
        } else {
          setCurrentRoute('404');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (path.startsWith('/mandi-prices/')) {
        const slug = path.replace('/mandi-prices/', '').replace(/\/$/, '');
        if (MANDI_STATE_DATA[slug]) {
          setMandiSlug(slug);
          setCurrentRoute('mandi-state');
        } else {
          setCurrentRoute('404');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (LANG_PATH_MAP[path]) {
        setSelectedLang(LANG_PATH_MAP[path]);
        document.documentElement.lang = path.replace('/', '');
        setCurrentRoute('home');
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
    if (route === 'privacy') newPath = '/privacy-policy';
    else if (route === 'terms') newPath = '/terms-and-conditions';
    else if (route === 'security') newPath = '/security';
    else if (route === 'certificate-terms') newPath = '/certificate-terms';
    else if (route === 'grievance') newPath = '/grievance';
    else if (route === 'disease') newPath = `/diseases/${diseaseSlug}`;
    else if (route === 'mandi-state') newPath = `/mandi-prices/${mandiSlug}`;
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

      {currentRoute === 'certificate-terms' && (
        <CertificateTermsPage onBackToHome={() => navigateTo('home')} />
      )}

      {currentRoute === 'grievance' && (
        <GrievanceRedressalPage onBackToHome={() => navigateTo('home')} />
      )}

      {currentRoute === 'disease' && (
        <CropDiseasePage
          diseaseSlug={diseaseSlug}
          onBackToHome={() => navigateTo('home')}
          onOpenDiagnostics={() => navigateTo('home', '#diagnostics')}
        />
      )}

      {currentRoute === 'mandi-state' && (
        <MandiStatePage
          mandiSlug={mandiSlug}
          onBackToHome={() => navigateTo('home')}
          onOpenMandiFull={() => navigateTo('home', '#mandi')}
        />
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
          onOpenCertificateTerms={() => navigateTo('certificate-terms')}
          onOpenGrievance={() => navigateTo('grievance')}
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
      </BrandThemeProvider>
    </LanguageProvider>
  );
}
