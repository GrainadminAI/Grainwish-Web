#!/usr/bin/env node
/**
 * GrainWish AI - Weekly Automated SEO, Compliance & Health Audit Script
 * Run with: npm run audit or node scripts/seo-audit.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = [];

function assertCheck(name, condition, errorDetails = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  \x1b[32m✔\x1b[0m ${name}`);
  } else {
    failedChecks.push({ name, errorDetails });
    console.error(`  \x1b[31m✖\x1b[0m ${name}`);
    if (errorDetails) console.error(`    \x1b[33mIssue: ${errorDetails}\x1b[0m`);
  }
}

console.log('\n=======================================================');
console.log('🌾 Running GrainWish AI Weekly SEO & Compliance Audit');
console.log('=======================================================\n');

// 1. Audit index.html: Title length, spelling, canonical, verification tags
console.log('🔍 1. Homepage Metadata, Title & Verification Tags');
const indexPath = path.join(rootDir, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const titleMatch = indexHtml.match(/<title>(.*?)<\/title>/i);
const titleText = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : '';
assertCheck('Homepage title is present', Boolean(titleMatch), 'Missing <title> tag in index.html');
assertCheck(
  `Homepage title length is under 60 characters (Current: ${titleText.length} chars)`,
  titleText.length > 0 && titleText.length <= 60,
  `Title "${titleText}" is ${titleText.length} characters (must be <= 60)`
);
assertCheck(
  'Brand name is spelled correctly as "GrainWish AI"',
  titleText.includes('GrainWish AI') && !titleText.includes('GrainWise'),
  `Title does not contain correct brand spelling "GrainWish AI"`
);

const canonicalMatch = indexHtml.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
assertCheck(
  'Canonical URL points to https://www.grainwish.com/',
  canonicalMatch && (canonicalMatch[1] === 'https://www.grainwish.com/' || canonicalMatch[1] === 'https://www.grainwish.com'),
  `Canonical URL is ${canonicalMatch ? canonicalMatch[1] : 'missing'}`
);

assertCheck(
  'Google Search Console verification meta tag is present',
  indexHtml.includes('name="google-site-verification"'),
  'Missing google-site-verification in index.html'
);

assertCheck(
  'Bing Webmaster Tools verification meta tag is present',
  indexHtml.includes('name="msvalidate.01"'),
  'Missing msvalidate.01 in index.html'
);

// 2. Audit 301 Permanent Redirects
console.log('\n🔀 2. 301 Permanent Domain Redirects (grainwish.com -> www.grainwish.com)');
const htaccessPath = path.join(rootDir, 'public/.htaccess');
const htaccess = fs.existsSync(htaccessPath) ? fs.readFileSync(htaccessPath, 'utf8') : '';
assertCheck(
  '.htaccess enforces 301 redirect to www.grainwish.com',
  htaccess.includes('RewriteCond %{HTTP_HOST} ^grainwish\\.com$ [NC]') && htaccess.includes('https://www.grainwish.com/'),
  'Missing 301 rewrite rule in public/.htaccess'
);

const redirectsPath = path.join(rootDir, 'public/_redirects');
const redirects = fs.existsSync(redirectsPath) ? fs.readFileSync(redirectsPath, 'utf8') : '';
assertCheck(
  '_redirects enforces 301 redirect for bare domain',
  redirects.includes('http://grainwish.com/*') && redirects.includes('https://www.grainwish.com/:splat   301!'),
  'Missing 301 rule in public/_redirects'
);

const serverHostPath = path.join(rootDir, 'server/host.js');
const serverHost = fs.existsSync(serverHostPath) ? fs.readFileSync(serverHostPath, 'utf8') : '';
assertCheck(
  'Express production server (server/host.js) enforces 301 redirect',
  serverHost.includes("host === 'grainwish.com'") && serverHost.includes('res.redirect(301,'),
  'Missing 301 host redirect middleware in server/host.js'
);

// 3. Pre-rendered HTML inside #root
console.log('\n📄 3. Googlebot Server Pre-Rendering & Crawler Visibility');
const rootMatch = indexHtml.match(/<div id="root">([\s\S]*?)<\/div>/i);
const rootContent = rootMatch ? rootMatch[1] : '';
assertCheck(
  'Pre-rendered semantic HTML exists inside #root for crawlers',
  rootContent.includes('<h1>GrainWish AI: Crop Diagnostics &amp; Mandi Rates</h1>') || rootContent.includes('<h1>GrainWish AI: Crop Diagnostics & Mandi Rates</h1>'),
  'No pre-rendered <h1> found inside <div id="root">'
);
assertCheck(
  'Pre-rendered content includes disease pathology summaries',
  rootContent.includes('Puccinia striiformis') && rootContent.includes('Wheat Yellow'),
  'Pre-rendered content missing crop disease summaries'
);
assertCheck(
  'Pre-rendered content includes statutory legal notice',
  rootContent.includes('DPDP Act 2023') && rootContent.includes('support@grainwish.com'),
  'Pre-rendered content missing DPDP/GDPR footer notice'
);

// 4. Schema.org Structured Data
console.log('\n🏷️ 4. Schema.org JSON-LD Structured Data');
assertCheck(
  'Organization schema JSON-LD exists with exact attributes',
  indexHtml.includes('"@type": "Organization"') &&
  indexHtml.includes('"name": "GrainWish AI"') &&
  indexHtml.includes('"url": "https://www.grainwish.com/"'),
  'Missing or invalid Organization schema in index.html'
);
assertCheck(
  'WebApplication schema JSON-LD exists',
  indexHtml.includes('"@type": "WebApplication"') &&
  indexHtml.includes('"applicationCategory": "AgricultureApplication"'),
  'Missing WebApplication schema in index.html'
);

// 5. Sitemap.xml & Robots.txt
console.log('\n🗺️ 5. XML Sitemap & Robots.txt Indexation');
const sitemapPath = path.join(rootDir, 'public/sitemap.xml');
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
assertCheck(
  'public/sitemap.xml exists and is populated',
  Boolean(sitemap) && sitemap.includes('<urlset'),
  'sitemap.xml is missing or empty'
);
assertCheck(
  'sitemap.xml references canonical www.grainwish.com',
  sitemap.includes('https://www.grainwish.com/'),
  'sitemap.xml does not reference https://www.grainwish.com/'
);
assertCheck(
  'sitemap.xml includes individual disease guide pages',
  sitemap.includes('/diseases/wheat-yellow-rust') && sitemap.includes('/diseases/cotton-leaf-curl'),
  'sitemap.xml missing crop disease routes'
);
assertCheck(
  'sitemap.xml includes state mandi price pages',
  sitemap.includes('/mandi-prices/punjab-wheat') && sitemap.includes('/mandi-prices/madhya-pradesh-soybean'),
  'sitemap.xml missing mandi price routes'
);

const robotsPath = path.join(rootDir, 'public/robots.txt');
const robots = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : '';
assertCheck(
  'public/robots.txt declares correct Sitemap URL',
  robots.includes('Sitemap: https://www.grainwish.com/sitemap.xml'),
  'robots.txt missing Sitemap declaration'
);

// 6. Regional Hreflang Tags
console.log('\n🌐 6. Regional Language Hreflang Tags (Pan-India Coverage)');
const requiredLangs = ['hi', 'pa', 'mr', 'te', 'ta', 'bn', 'gu', 'kn', 'ml', 'or'];
let allHreflangsPresent = true;
for (const lang of requiredLangs) {
  if (!indexHtml.includes(`hreflang="${lang}"`)) {
    allHreflangsPresent = false;
    break;
  }
}
assertCheck(
  'index.html declares hreflang tags for all major Indian regional languages',
  allHreflangsPresent,
  'Missing one or more regional hreflang alternate tags in index.html'
);

// 7. Image Alt Text Audit
console.log('\n🖼️ 7. Image Accessibility & Core Web Vitals (Alt Text Audit)');
const componentsDir = path.join(rootDir, 'src/components');
const componentFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));
let totalImages = 0;
let imagesWithoutAlt = 0;

for (const file of componentFiles) {
  const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
  const imgMatches = content.match(/<img[^>]*>/g) || [];
  for (const img of imgMatches) {
    totalImages++;
    if (!img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''")) {
      imagesWithoutAlt++;
      console.error(`    \x1b[33mWarning in ${file}: Missing or empty alt in ${img.slice(0, 50)}...\x1b[0m`);
    }
  }
}
assertCheck(
  `Every <img> element has a non-empty alt attribute (${totalImages} audited)`,
  imagesWithoutAlt === 0,
  `${imagesWithoutAlt} images found with missing or empty alt tags`
);

// 8. Expert Reviewer & Scientific Citations
console.log('\n🔬 8. Agronomic Expert Review & Scientific Sources');
const diagToolPath = path.join(rootDir, 'src/components/DiagnosticsTool.jsx');
const diagCode = fs.readFileSync(diagToolPath, 'utf8');
assertCheck(
  'DiagnosticsTool includes Expert Agronomist Reviewer (Dr. Surender K. Verma, Ph.D.)',
  diagCode.includes('Dr. Surender K. Verma, Ph.D.') && diagCode.includes('ICAR Plant Pathologist'),
  'Missing expert reviewer in DiagnosticsTool.jsx'
);

const npkCalcPath = path.join(rootDir, 'src/components/NPKCalculator.jsx');
const npkCode = fs.readFileSync(npkCalcPath, 'utf8');
assertCheck(
  'NPKCalculator includes Expert Soil Scientist Reviewer (Dr. R. S. Chhina, Ph.D.)',
  npkCode.includes('Dr. R. S. Chhina, Ph.D.') && npkCode.includes('Soil Scientist'),
  'Missing expert reviewer in NPKCalculator.jsx'
);

// Final Audit Summary
console.log('\n=======================================================');
console.log(`📊 Audit Finished: ${passedChecks} / ${totalChecks} Checks Passed`);
if (failedChecks.length === 0) {
  console.log('\x1b[32m🎉 100% Core SEO & Regulatory Compliance Achieved!\x1b[0m');
  console.log('=======================================================\n');
  process.exit(0);
} else {
  console.error(`\x1b[31m⚠️ ${failedChecks.length} checks failed. See details above.\x1b[0m`);
  console.log('=======================================================\n');
  process.exit(1);
}
