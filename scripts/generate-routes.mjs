#!/usr/bin/env node
/**
 * Grainwish AI — Static Route Pre-renderer for SEO & Indexation
 * Generates standalone, crawler-ready HTML entry points for every canonical route in public/sitemap.xml
 * Executed automatically during npm run build.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('❌ dist/index.html does not exist. Run vite build before generating routes.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templatePath, 'utf8');

const ROUTES = [
  {
    path: 'crop-disease-diagnosis',
    title: 'AI Crop Disease Diagnosis & Treatment | Grainwish AI',
    description: 'Instant camera-based AI crop disease diagnosis and dual-track chemical and organic treatment protocols for Indian farmers across 22 native languages.',
    heading: 'AI Crop Disease Diagnosis & Leaf Health Scan',
    content: `
      <section id="tool-crop-disease-diagnosis">
        <h1>AI Crop Disease Diagnosis &amp; Leaf Health Scan</h1>
        <p>Grainwish AI delivers instant, camera-based crop pathology scans with 100% precision metrics across Indian agrarian staples including wheat, rice, cotton, soybean, maize, and vegetables.</p>
        <h2>Key Disease Detection Capabilities</h2>
        <ul>
          <li><strong>Wheat Yellow / Stripe Rust (Puccinia striiformis):</strong> Linear yellow-orange powdery pustules along leaf veins. Verified organic and chemical control schedules with Propiconazole 25% EC or NSKE bio-formulations.</li>
          <li><strong>Cotton Leaf Curl Virus Complex:</strong> Upward leaf curling, vein thickening, and enations transmitted by whitefly (Bemisia tabaci).</li>
          <li><strong>Rice Blast &amp; Sheath Blight (Magnaporthe oryzae):</strong> Spindle-shaped lesions with grayish centers and brown margins on paddy foliage.</li>
          <li><strong>Chlorophyll &amp; Leaf Surface Analysis:</strong> Multi-spectral optical analysis distinguishing healthy vegetation from necrotic lesions.</li>
        </ul>
        <p><a href="https://grainwish.com/#diagnostics">Launch Interactive Camera Scanner on Grainwish AI</a></p>
      </section>
    `
  },
  {
    path: 'npk-fertilizer-calculator',
    title: 'Precision NPK Fertilizer Dosage Calculator | Grainwish AI',
    description: 'Calculate exact nitrogen, phosphorus, and potassium dosage required per acre based on crop variety, soil test results, and regional agricultural guidelines.',
    heading: 'Precision NPK Fertilizer Dosage Calculator',
    content: `
      <section id="tool-npk-calculator">
        <h1>Precision NPK Fertilizer Dosage Calculator</h1>
        <p>Grainwish AI precision soil nutrient management eliminates chemical over-application and reduces fertilizer expenses by 18% to 25% across Indian farms.</p>
        <h2>Guided 4-Step Agronomic Progression</h2>
        <ol>
          <li><strong>Growth Stage &amp; Crop Variety:</strong> Calibrated for Wheat, Paddy, Cotton, Maize, Potato, Mustard, and Sugarcane across Basal, Vegetative, Tillering, Flowering, and Grain Filling stages.</li>
          <li><strong>Field Acreage &amp; Land Size:</strong> Custom scalable dosage calibrated in standard Bighas, Acres, and Hectares.</li>
          <li><strong>Soil Test &amp; Soil Health Card:</strong> Incorporates Nitrogen (N), Phosphorus (P), Potassium (K), Soil pH, and Organic Carbon percentage.</li>
          <li><strong>Combined Agronomic Synthesis &amp; Farmers Field Roadmap:</strong> Generates exact bag procurement schedules (Urea, DAP, MOP, SSP) and chronological application timelines.</li>
        </ol>
        <p><a href="https://grainwish.com/#npk">Launch Precision NPK Calculator on Grainwish AI</a></p>
      </section>
    `
  },
  {
    path: 'mandi-prices',
    title: 'Live APMC Mandi Prices & Today\'s MSP Rates | Grainwish AI',
    description: 'Real-time daily wholesale mandi rates, commodity arrivals, and Minimum Support Price (MSP) comparisons across 2,500+ APMC mandis in India.',
    heading: 'Live Pan-India APMC Mandi Prices & MSP Radar',
    content: `
      <section id="tool-mandi-prices">
        <h1>Live APMC Mandi Prices &amp; Today\'s MSP Rates</h1>
        <p>Grainwish AI tracks continuous wholesale arrivals and modal market prices across 2,500+ agricultural produce market committees (APMCs) throughout India.</p>
        <h2>Real-Time Agricultural Market Features</h2>
        <ul>
          <li><strong>Daily Modal Price Discovery:</strong> Real-time price updates for wheat, paddy, chana, mustard, cotton, soybean, turmeric, and vegetables.</li>
          <li><strong>MSP Price Benchmark Radar:</strong> Side-by-side comparison of local market transactions against Government Minimum Support Price (MSP) benchmarks.</li>
          <li><strong>State &amp; District Filtering:</strong> Live feeds for Punjab, Haryana, Madhya Pradesh, Rajasthan, Maharashtra, Gujarat, Uttar Pradesh, West Bengal, and Telangana.</li>
          <li><strong>Nearby Mandi Arbitrage Insights:</strong> Discover higher realization rates within a 50 km radius.</li>
        </ul>
        <p><a href="https://grainwish.com/#mandi">Explore Live Mandi Rates on Grainwish AI</a></p>
      </section>
    `
  },
  {
    path: 'about',
    title: 'About Grainwish AI: Smart Agritech Intelligence Platform',
    description: 'Learn about Grainwish Technologies Private Limited (CIN: U62013WB2026PTC296769), operating Grainwish AI smart agritech intelligence across India.',
    heading: 'About Grainwish Technologies Private Limited & Grainwish AI',
    content: `
      <section id="about-grainwish-ai">
        <h1>About Grainwish Technologies Private Limited</h1>
        <p>Grainwish Technologies Private Limited is a registered Indian private limited company (CIN: U62013WB2026PTC296769, Registrar of Companies RoC Kolkata) operating Grainwish AI, India's premier AI agritech intelligence platform.</p>
        <h2>Company Information &amp; Corporate Governance</h2>
        <ul>
          <li><strong>Corporate Identification Number (CIN):</strong> U62013WB2026PTC296769</li>
          <li><strong>Incorporation Date:</strong> September 14, 2026</li>
          <li><strong>Registrar of Companies:</strong> RoC Kolkata, West Bengal</li>
          <li><strong>Founders &amp; Directors:</strong> Suman Paramanik &amp; Sujit Ray</li>
          <li><strong>Registered Office:</strong> 3/21, Shanti Pally, Bhadreswar, Chandannagar, Hooghly, West Bengal, 712124, India</li>
          <li><strong>Official Contact Email:</strong> support@grainwish.com</li>
        </ul>
        <h2>Our Mission</h2>
        <p>Empowering over 140 million Indian agricultural producers with accessible, camera-first artificial intelligence, precision agronomic recommendations, transparent market pricing, and voice guidance in 22 regional languages.</p>
        <p><a href="https://grainwish.com/">Return to Grainwish AI Platform</a></p>
      </section>
    `
  },
  {
    path: 'ananya-ai-agronomist',
    title: 'Ananya AI: 24/7 Multilingual Agronomist | Grainwish AI',
    description: 'Conversational agronomy assistant and voice companion in 22 native Indian regional languages with ICAR and SAU scientific advisory packages.',
    heading: 'Ananya AI: 24/7 Multilingual AI Agronomist',
    content: `
      <section id="tool-ananya-ai">
        <h1>Ananya AI Multilingual Agronomist</h1>
        <p>Ananya AI is Grainwish AI's conversational agronomist supporting 22 Indian regional languages including Hindi, Bengali, Punjabi, Marathi, Telugu, Tamil, Gujarati, and Kannada.</p>
        <p><a href="https://grainwish.com/#ananya-ai">Chat with Ananya AI on Grainwish AI</a></p>
      </section>
    `
  },
  {
    path: 'government-schemes',
    title: 'Agricultural Government Schemes & Subsidies | Grainwish AI',
    description: 'Complete directory of central and state government agricultural schemes, PM-KISAN, PMFBY, and solar pump subsidies for Indian farmers.',
    heading: 'Government Schemes, Subsidies & Farmer Welfare',
    content: `
      <section id="tool-government-schemes">
        <h1>Government Schemes &amp; Subsidies for Indian Agriculture</h1>
        <p>Access step-by-step application guidance, eligibility requirements, and documentation checklists for key agrarian programs including PM-KISAN, PMFBY, and Soil Health Cards.</p>
        <p><a href="https://grainwish.com/#calendar">Explore Schemes on Grainwish AI</a></p>
      </section>
    `
  },
  {
    path: 'farming-calendar',
    title: 'Interactive Agricultural Farming Calendar | Grainwish AI',
    description: 'Seasonal crop lifecycle roadmaps for Rabi, Kharif, and Zaid seasons detailing sowing, irrigation, fertilizer, and harvesting milestones.',
    heading: 'Interactive Seasonal Agricultural Farming Calendar',
    content: `
      <section id="tool-farming-calendar">
        <h1>Interactive Agricultural Farming Calendar</h1>
        <p>Plan field operations with precision across Rabi, Kharif, and Zaid seasons with localized agronomic reminders for irrigation, weed control, and fertilizer top-dressing.</p>
        <p><a href="https://grainwish.com/#calendar">View Calendar on Grainwish AI</a></p>
      </section>
    `
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy (DPDP Act 2023 Compliant) | Grainwish AI',
    description: 'Grainwish AI privacy policy and data governance practices compliant with India\'s Digital Personal Data Protection (DPDP) Act 2023.',
    heading: 'Privacy Policy & Data Protection',
    content: `
      <section id="legal-privacy-policy">
        <h1>Privacy Policy — Grainwish AI</h1>
        <p>Grainwish Technologies Private Limited is committed to transparent, lawful data governance compliant with the Digital Personal Data Protection (DPDP) Act 2023.</p>
        <p><a href="https://grainwish.com/">Return to Grainwish AI</a></p>
      </section>
    `
  },
  {
    path: 'terms-and-conditions',
    title: 'Terms & Conditions and Advisory Disclaimer | Grainwish AI',
    description: 'Terms of service, scientific agronomic advisory disclaimers, and user obligations for Grainwish AI web and mobile platforms.',
    heading: 'Terms & Conditions of Service',
    content: `
      <section id="legal-terms-conditions">
        <h1>Terms &amp; Conditions — Grainwish AI</h1>
        <p>Terms of service and agronomic advisory terms governing the use of Grainwish AI tools and diagnostics.</p>
        <p><a href="https://grainwish.com/">Return to Grainwish AI</a></p>
      </section>
    `
  },
  {
    path: 'grievance',
    title: 'Grievance Redressal Mechanism & Officer | Grainwish AI',
    description: 'Official statutory grievance redressal mechanism and Grievance Officer contact details pursuant to Indian Information Technology rules.',
    heading: 'Grievance Redressal Mechanism',
    content: `
      <section id="legal-grievance">
        <h1>Grievance Redressal Cell — Grainwish AI</h1>
        <p>Official grievance submission channel for Grainwish Technologies Private Limited. Grievance Officer Email: support@grainwish.com.</p>
        <p><a href="https://grainwish.com/">Return to Grainwish AI</a></p>
      </section>
    `
  }
];

console.log('🚀 Generating static pre-rendered routes for SEO indexation...');

let generatedCount = 0;

for (const route of ROUTES) {
  const targetDir = path.join(distDir, route.path);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const canonicalUrl = `https://grainwish.com/${route.path}`;

  let html = templateHtml;

  // 1. Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);
  html = html.replace(/<meta\s+name="title"\s+content="[^"]*"/i, `<meta name="title" content="${route.title}"`);

  // 2. Replace Description
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/i, `<meta name="description" content="${route.description}"`);

  // 3. Replace Canonical
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 4. Replace Open Graph Metadata
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"/i, `<meta property="og:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"/i, `<meta property="og:title" content="${route.title}"`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"/i, `<meta property="og:description" content="${route.description}"`);

  // 5. Replace Twitter Card Metadata
  html = html.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"/i, `<meta name="twitter:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"/i, `<meta name="twitter:title" content="${route.title}"`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"/i, `<meta name="twitter:description" content="${route.description}"`);

  // 6. Prepend semantic content inside root for Googlebot crawler
  const preRenderedBlock = `
    <div id="root">
      <div class="sr-only" data-prerender-route="${route.path}">
        <nav aria-label="Breadcrumb">
          <a href="https://grainwish.com/">Home</a> &gt; <span>${route.heading}</span>
        </nav>
        ${route.content}
        <footer>
          <p>&copy; 2026 Grainwish Technologies Private Limited. All rights reserved.</p>
          <a href="https://grainwish.com/privacy-policy">Privacy Policy</a> |
          <a href="https://grainwish.com/terms-and-conditions">Terms</a> |
          <a href="https://grainwish.com/grievance">Grievance</a>
        </footer>
      </div>
    </div>
  `;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>/i, preRenderedBlock.trim());

  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf8');
  generatedCount++;
  console.log(`  ✔ Pre-rendered: /${route.path} -> dist/${route.path}/index.html (Canonical: ${canonicalUrl})`);
}

console.log(`🎉 Successfully generated ${generatedCount} static route pages for crawler indexation.\n`);
