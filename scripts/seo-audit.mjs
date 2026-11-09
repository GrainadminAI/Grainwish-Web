#!/usr/bin/env node
/**
 * Grainwish AI - Automated SEO, Schema & Accessibility Compliance Audit Script
 * Executed via: npm run audit or node scripts/seo-audit.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
const failedChecks = [];

function assertCheck(name, condition, errorDetails = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  \x1b[32m✔\x1b[0m ${name}`);
  } else {
    failedChecks.push({ name, errorDetails });
    console.error(`  \x1b[31m✖\x1b[0m ${name}`);
    if (errorDetails) {
      console.error(`    \x1b[33mIssue: ${errorDetails}\x1b[0m`);
    }
  }
}

console.log('\n=======================================================');
console.log('🌾 Grainwish AI — Automated SEO & Compliance Audit');
console.log('=======================================================\n');

// 1. Homepage Metadata, Title & Open Graph Audit
console.log('🔍 1. Homepage Metadata, Title & Canonical Configuration');
const indexPath = path.join(rootDir, 'index.html');
assertCheck('index.html exists and is readable', fs.existsSync(indexPath));
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const titleMatch = indexHtml.match(/<title>(.*?)<\/title>/i);
const titleText = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').trim() : '';
assertCheck('Homepage <title> tag is present', Boolean(titleMatch), 'Missing <title> tag in index.html');
assertCheck(
  `Homepage title length is under 60 characters (Current: ${titleText.length} chars)`,
  titleText.length > 0 && titleText.length <= 60,
  `Title "${titleText}" is ${titleText.length} chars (must be <= 60)`
);
assertCheck(
  'Brand name in title is strictly "Grainwish AI"',
  titleText.includes('Grainwish AI') && !titleText.includes('GrainWise') && !titleText.includes('GrainWish'),
  `Title contains incorrect brand casing or name: "${titleText}"`
);

const descMatch = indexHtml.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
const descText = descMatch ? descMatch[1].trim() : '';
assertCheck(
  `Meta description is present and optimal length (Current: ${descText.length} chars)`,
  descText.length >= 50 && descText.length <= 165,
  `Meta description length ${descText.length} is outside 50-165 range`
);

const canonicalMatch = indexHtml.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
assertCheck(
  'Canonical URL points to https://www.grainwish.com',
  canonicalMatch && (canonicalMatch[1] === 'https://www.grainwish.com' || canonicalMatch[1] === 'https://www.grainwish.com/'),
  `Canonical URL is ${canonicalMatch ? canonicalMatch[1] : 'missing'}`
);

assertCheck(
  'Google Analytics / Tag Manager container (G-9QS8VQ5GJ2) is installed',
  indexHtml.includes('G-9QS8VQ5GJ2'),
  'Missing Google Analytics tracking tag G-9QS8VQ5GJ2'
);

assertCheck(
  'Content Security Policy (CSP) meta tag enforces anti-XSS protection',
  indexHtml.includes('http-equiv="Content-Security-Policy"'),
  'Missing CSP meta tag in index.html'
);

// 2. Open Graph & Social Sharing Cards
console.log('\n📱 2. Open Graph & Social Sharing Cards');
assertCheck('og:site_name is "Grainwish AI"', indexHtml.includes('content="Grainwish AI"'));
assertCheck('og:type is "website"', indexHtml.includes('property="og:type" content="website"'));
assertCheck('og:url is canonical', indexHtml.includes('property="og:url" content="https://www.grainwish.com/"'));
assertCheck(
  'og:image points to valid high-res preview (https://www.grainwish.com/assets/og-preview.png)',
  indexHtml.includes('property="og:image" content="https://www.grainwish.com/assets/og-preview.png"')
);
assertCheck(
  'Social preview image exists on disk (public/assets/og-preview.png)',
  fs.existsSync(path.join(rootDir, 'public/assets/og-preview.png'))
);
assertCheck('twitter:card is summary_large_image', indexHtml.includes('name="twitter:card" content="summary_large_image"'));
assertCheck('twitter:site handle is configured', indexHtml.includes('name="twitter:site" content="@GrainwishAI"'));

// 3. Schema.org Structured Data Audit
console.log('\n🏷️ 3. Schema.org JSON-LD Structured Data');
const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
assertCheck('Schema.org JSON-LD script tag is present', Boolean(jsonLdMatch), 'Missing JSON-LD script in index.html');

let parsedJsonLd = null;
if (jsonLdMatch) {
  try {
    parsedJsonLd = JSON.parse(jsonLdMatch[1]);
    assertCheck('JSON-LD structured data parses as valid JSON', true);
  } catch (err) {
    assertCheck('JSON-LD structured data parses as valid JSON', false, err.message);
  }
}

if (parsedJsonLd && parsedJsonLd['@graph']) {
  const graph = parsedJsonLd['@graph'];
  const org = graph.find(e => e['@type'] === 'Organization');
  const webApp = graph.find(e => e['@type'] === 'WebApplication');
  const webPage = graph.find(e => e['@type'] === 'WebPage');
  const faqPage = graph.find(e => e['@type'] === 'FAQPage');

  assertCheck('Organization entity exists in @graph', Boolean(org));
  assertCheck('Organization name is "Grainwish AI"', org && org.name === 'Grainwish AI');
  assertCheck('Organization logo references valid logo URL', Boolean(org && org.logo && org.logo.url));
  assertCheck(
    'Organization sameAs includes official Instagram profile',
    Boolean(org && Array.isArray(org.sameAs) && org.sameAs.includes('https://www.instagram.com/grainwish_ai'))
  );
  assertCheck(
    'Organization sameAs includes official Facebook profile',
    Boolean(org && Array.isArray(org.sameAs) && org.sameAs.includes('https://www.facebook.com/share/16NAw1dF7mn/'))
  );

  assertCheck('WebApplication entity exists in @graph', Boolean(webApp));
  assertCheck('WebApplication applicationCategory is "AgricultureApplication"', webApp && webApp.applicationCategory === 'AgricultureApplication');

  assertCheck('WebPage entity exists with speakable specification', Boolean(webPage && webPage.speakable));
  assertCheck('FAQPage entity exists with FAQ questions and answers', Boolean(faqPage && Array.isArray(faqPage.mainEntity) && faqPage.mainEntity.length > 0));
}

// 4. Sitemap.xml & Robots.txt Indexation
console.log('\n🗺️ 4. XML Sitemap & Robots.txt Indexation');
const sitemapPath = path.join(rootDir, 'public/sitemap.xml');
assertCheck('public/sitemap.xml exists on disk', fs.existsSync(sitemapPath));
const sitemapContent = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
assertCheck('sitemap.xml contains valid <urlset> declaration', sitemapContent.includes('<urlset') && sitemapContent.includes('</urlset>'));
assertCheck('sitemap.xml includes canonical homepage URL', sitemapContent.includes('https://www.grainwish.com/'));

const robotsPath = path.join(rootDir, 'public/robots.txt');
assertCheck('public/robots.txt exists on disk', fs.existsSync(robotsPath));
const robotsContent = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : '';
assertCheck(
  'public/robots.txt declares correct Sitemap URL',
  robotsContent.includes('Sitemap: https://www.grainwish.com/sitemap.xml'),
  'robots.txt missing Sitemap declaration'
);

// 5. Image Accessibility & Alt Attributes
console.log('\n🖼️ 5. Image Accessibility (WCAG 2.1 Non-Empty Alt Attributes)');
const componentsDir = path.join(rootDir, 'src/components');
const componentFiles = fs.readdirSync(componentsDir).filter(f => f.endsWith('.jsx'));
let totalImages = 0;
let missingAltCount = 0;
const missingAltDetails = [];

for (const file of componentFiles) {
  const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
  const imgMatches = content.match(/<img[^>]*>/g) || [];
  for (const img of imgMatches) {
    totalImages++;
    if (!img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''")) {
      missingAltCount++;
      missingAltDetails.push(`${file}: ${img.slice(0, 60)}...`);
    }
  }
}

assertCheck(
  `All <img> elements in JSX components have non-empty alt attributes (${totalImages} audited)`,
  missingAltCount === 0,
  `${missingAltCount} images missing alt: ${missingAltDetails.join('; ')}`
);

// 6. DPDP Act 2023 & Grievance Compliance
console.log('\n⚖️ 6. DPDP Act 2023, Legal Compliance & Grievance Channels');
const footerPath = path.join(rootDir, 'src/components/FooterSection.jsx');
const footerContent = fs.readFileSync(footerPath, 'utf8');
assertCheck(
  'FooterSection declares official grievance email (support@grainwish.com)',
  footerContent.includes('support@grainwish.com')
);
assertCheck(
  'FooterSection includes official Instagram link without tracking params',
  footerContent.includes('https://www.instagram.com/grainwish_ai') && !footerContent.includes('obrf=')
);
assertCheck(
  'FooterSection includes official Facebook link without tracking params',
  footerContent.includes('https://www.facebook.com/share/16NAw1dF7mn/') && !footerContent.includes('mibextid=')
);
assertCheck(
  'FooterSection social links enforce rel="noopener noreferrer" and target="_blank"',
  footerContent.includes('rel="noopener noreferrer"') && footerContent.includes('target="_blank"')
);

const privacyPath = path.join(rootDir, 'src/components/PrivacyPolicyPage.jsx');
const privacyContent = fs.readFileSync(privacyPath, 'utf8');
assertCheck(
  'PrivacyPolicyPage references DPDP Act 2023 statutory compliance',
  privacyContent.includes('DPDP')
);
assertCheck(
  'PrivacyPolicyPage designates official Data Protection Officer',
  privacyContent.includes('Data Protection')
);

// 7. Brand Name Consistency Across Codebase
console.log('\n🔒 7. Brand Name Integrity Check');
assertCheck(
  'No obsolete "GrainWise" brand references in index.html',
  !indexHtml.includes('GrainWise')
);
assertCheck(
  'No obsolete "GrainWish" casing mismatches in index.html',
  !indexHtml.includes('GrainWish')
);

// Final Audit Summary
console.log('\n=======================================================');
console.log(`📊 Audit Finished: ${passedChecks} / ${totalChecks} Checks Passed`);
if (failedChecks.length === 0) {
  console.log('\x1b[32m🎉 100% Core SEO, Schema & Accessibility Compliance Passed!\x1b[0m');
  console.log('=======================================================\n');
  process.exit(0);
} else {
  console.error(`\x1b[31m⚠️ ${failedChecks.length} checks failed. Details above.\x1b[0m`);
  console.log('=======================================================\n');
  process.exit(1);
}

