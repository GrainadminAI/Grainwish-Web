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
import AboutPage from './components/AboutPage';
import AdminPortalPage from './components/AdminPortalPage';
import NotFoundPage from './components/NotFoundPage';
import { recordUserVisitToDB } from './lib/supabase';
import { LanguageProvider, useLanguage } from './lib/LanguageContext';
import { BrandThemeProvider } from './lib/BrandThemeContext';

function MainLandingPage({ onOpenDownloadModal, onOpenPrivacyPolicy, onOpenTerms, onOpenSecurityPolicy, onOpenCertificateTerms, onOpenGrievance, onOpenAbout }) {
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
        onOpenAbout={onOpenAbout}
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

const TOOL_ROUTE_TARGETS = {
  '/crop-disease-diagnosis': {
    selector: '#diagnostics',
    title: 'AI Crop Disease Diagnosis & Treatment | Grainwish AI',
    description: 'Instant camera-based AI crop disease diagnosis and dual-track chemical and organic treatment protocols for Indian farmers across 22 native languages.'
  },
  '/crop-disease-diagnosis/': {
    selector: '#diagnostics',
    title: 'AI Crop Disease Diagnosis & Treatment | Grainwish AI',
    description: 'Instant camera-based AI crop disease diagnosis and dual-track chemical and organic treatment protocols for Indian farmers across 22 native languages.'
  },
  '/npk-fertilizer-calculator': {
    selector: '#npk-calc',
    title: 'Precision NPK Fertilizer Dosage Calculator | Grainwish AI',
    description: 'Calculate exact nitrogen, phosphorus, and potassium dosage required per acre based on crop variety, soil test results, and regional agricultural guidelines.'
  },
  '/npk-fertilizer-calculator/': {
    selector: '#npk-calc',
    title: 'Precision NPK Fertilizer Dosage Calculator | Grainwish AI',
    description: 'Calculate exact nitrogen, phosphorus, and potassium dosage required per acre based on crop variety, soil test results, and regional agricultural guidelines.'
  },
  '/mandi-prices': {
    selector: '#mandi',
    title: "Live APMC Mandi Prices & Today's MSP Rates | Grainwish AI",
    description: 'Real-time daily wholesale mandi rates, commodity arrivals, and Minimum Support Price (MSP) comparisons across 2,500+ APMC mandis in India.'
  },
  '/mandi-prices/': {
    selector: '#mandi',
    title: "Live APMC Mandi Prices & Today's MSP Rates | Grainwish AI",
    description: 'Real-time daily wholesale mandi rates, commodity arrivals, and Minimum Support Price (MSP) comparisons across 2,500+ APMC mandis in India.'
  },
  '/ananya-ai-agronomist': {
    selector: '#ananya-ai',
    title: 'Ananya AI: 24/7 Multilingual Agronomist | Grainwish AI',
    description: 'Conversational agronomy assistant and voice companion in 22 native Indian regional languages with ICAR and SAU scientific advisory packages.'
  },
  '/ananya-ai-agronomist/': {
    selector: '#ananya-ai',
    title: 'Ananya AI: 24/7 Multilingual Agronomist | Grainwish AI',
    description: 'Conversational agronomy assistant and voice companion in 22 native Indian regional languages with ICAR and SAU scientific advisory packages.'
  },
  '/government-schemes': {
    selector: '#calendar',
    title: 'Agricultural Government Schemes & Subsidies | Grainwish AI',
    description: 'Complete directory of central and state government agricultural schemes, PM-KISAN, PMFBY, and solar pump subsidies for Indian farmers.'
  },
  '/government-schemes/': {
    selector: '#calendar',
    title: 'Agricultural Government Schemes & Subsidies | Grainwish AI',
    description: 'Complete directory of central and state government agricultural schemes, PM-KISAN, PMFBY, and solar pump subsidies for Indian farmers.'
  },
  '/farming-calendar': {
    selector: '#calendar',
    title: 'Interactive Agricultural Farming Calendar | Grainwish AI',
    description: 'Seasonal crop lifecycle roadmaps for Rabi, Kharif, and Zaid seasons detailing sowing, irrigation, fertilizer, and harvesting milestones.'
  },
  '/farming-calendar/': {
    selector: '#calendar',
    title: 'Interactive Agricultural Farming Calendar | Grainwish AI',
    description: 'Seasonal crop lifecycle roadmaps for Rabi, Kharif, and Zaid seasons detailing sowing, irrigation, fertilizer, and harvesting milestones.'
  }
};

function updatePageMetadata(title, description, path) {
  if (typeof document === 'undefined') return;
  if (title) {
    document.title = title;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
  }
  if (path) {
    const canonicalUrl = `https://grainwish.com${path === '/' ? '' : path.replace(/\/+$/, '')}`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', canonicalUrl);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    const twUrl = document.querySelector('meta[name="twitter:url"]');
    if (twUrl) twUrl.setAttribute('content', canonicalUrl);
  }
  if (description) {
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', description);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }
}

function RootApp() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const { setSelectedLang } = useLanguage();
  const [currentRoute, setCurrentRoute] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/instagram' || hash === '#instagram') {
      window.location.replace('https://www.instagram.com/grainwish_ai');
      return 'redirect';
    }
    if (path === '/facebook' || hash === '#facebook') {
      window.location.replace('https://www.facebook.com/share/16NAw1dF7mn/');
      return 'redirect';
    }
    if (path === '/about' || path === '/about/' || hash === '#about') return 'about';
    if (path === '/hi' || path === '/hi/') return 'home';
    if (path === '/bn' || path === '/bn/') return 'home';
    if (path in TOOL_ROUTE_TARGETS) return 'home';
    if (path === '/privacy' || path === '/privacy-policy' || hash === '#privacy' || hash === '#privacy-policy') return 'privacy';
    if (path === '/terms' || path === '/terms-and-conditions' || hash === '#terms' || hash === '#terms-and-conditions') return 'terms';
    if (path === '/security' || hash === '#security') return 'security';
    if (path === '/certificate-terms' || hash === '#certificate-terms') return 'certificate-terms';
    if (path === '/grievance' || hash === '#grievance') return 'grievance';
    if (path === '/admin' || hash === '#admin') return 'admin';
    if (path === '/' || path === '' || path === '/index.html') return 'home';
    return '404';
  });

  useEffect(() => {
    let timer50, timer200;

    if (typeof window !== 'undefined') {
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

      // Ensure website opens at the very top (Hero Section) without auto-scrolling unless a tool route was targeted
      const initialPath = window.location.pathname.toLowerCase();
      const toolTarget = TOOL_ROUTE_TARGETS[initialPath];

      if (toolTarget) {
        updatePageMetadata(toolTarget.title, toolTarget.description, initialPath);
        setTimeout(() => {
          const el = document.querySelector(toolTarget.selector);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      } else if (initialPath === '/about' || initialPath === '/about/') {
        updatePageMetadata(
          'About Grainwish AI: Smart Agritech Intelligence Platform',
          'Learn about Grainwish Technologies Private Limited (CIN: U62013WB2026PTC296769), operating Grainwish AI smart agritech intelligence across India.',
          '/about'
        );
      } else {
        const resetScrollToTop = () => {
          if (!window.location.hash || window.location.hash.toLowerCase() === '#ananya-ai') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }
        };

        resetScrollToTop();
        requestAnimationFrame(resetScrollToTop);
        timer50 = setTimeout(resetScrollToTop, 50);
        timer200 = setTimeout(resetScrollToTop, 200);
      }

      // Record initial visit in Supabase
      recordUserVisitToDB({
        path: window.location.pathname + (window.location.hash || '')
      });
    }

    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/instagram' || hash === '#instagram') {
        window.location.replace('https://www.instagram.com/grainwish_ai');
        return;
      }
      if (path === '/facebook' || hash === '#facebook') {
        window.location.replace('https://www.facebook.com/share/16NAw1dF7mn/');
        return;
      }
      if (path === '/about' || path === '/about/' || hash === '#about') {
        setCurrentRoute('about');
        updatePageMetadata(
          'About Grainwish AI: Smart Agritech Intelligence Platform',
          'Learn about Grainwish Technologies Private Limited (CIN: U62013WB2026PTC296769), operating Grainwish AI smart agritech intelligence across India.',
          '/about'
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (path === '/hi' || path === '/hi/') {
        setSelectedLang('Hindi (हिंदी)');
        setCurrentRoute('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (path === '/bn' || path === '/bn/') {
        setSelectedLang('Bengali (বাংলা)');
        setCurrentRoute('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (path in TOOL_ROUTE_TARGETS) {
        const target = TOOL_ROUTE_TARGETS[path];
        setCurrentRoute('home');
        updatePageMetadata(target.title, target.description, path);
        setTimeout(() => {
          const el = document.querySelector(target.selector);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
        return;
      }
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
      } else if (path === '/admin' || hash === '#admin') {
        setCurrentRoute('admin');
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
    else if (route === 'about') newPath = '/about';
    else if (route === 'terms') newPath = '/terms-and-conditions';
    else if (route === 'security') newPath = '/security';
    else if (route === 'certificate-terms') newPath = '/certificate-terms';
    else if (route === 'grievance') newPath = '/grievance';
    else if (route === 'admin') newPath = '/admin';
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

      {currentRoute === 'about' && (
        <AboutPage onBackToHome={() => navigateTo('home')} />
      )}

      {currentRoute === 'admin' && (
        <AdminPortalPage
          onBackToHome={() => navigateTo('home')}
          onOpenAuthModal={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('grainwise_open_auth_modal'));
            }
          }}
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
          onOpenAbout={() => navigateTo('about')}
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
