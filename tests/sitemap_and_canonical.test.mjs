import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Sitemap.xml, Robots.txt & Non-WWW Canonical Alignment', async (t) => {
  const robotsPath = path.join(rootDir, 'public', 'robots.txt');
  const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  const indexPath = path.join(rootDir, 'index.html');
  const serverIndexPath = path.join(rootDir, 'server', 'index.js');
  const serverHostPath = path.join(rootDir, 'server', 'host.js');
  const vercelPath = path.join(rootDir, 'vercel.json');
  const appPath = path.join(rootDir, 'src', 'App.jsx');
  const aboutPath = path.join(rootDir, 'src', 'components', 'AboutPage.jsx');

  const robots = fs.readFileSync(robotsPath, 'utf8');
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const serverIndex = fs.readFileSync(serverIndexPath, 'utf8');
  const serverHost = fs.readFileSync(serverHostPath, 'utf8');
  const vercel = fs.readFileSync(vercelPath, 'utf8');
  const appCode = fs.readFileSync(appPath, 'utf8');

  await t.test('1. robots.txt declares non-www canonical Sitemap and has no www mismatch', () => {
    assert.match(robots, /Sitemap:\s+https:\/\/grainwish\.com\/sitemap\.xml/);
    assert.ok(!robots.includes('www.grainwish.com'), 'robots.txt should not reference www domain');
  });

  await t.test('2. sitemap.xml declares all 11 URLs with non-www domain and updated lastmod', () => {
    assert.ok(sitemap.includes('<loc>https://grainwish.com/</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/crop-disease-diagnosis</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/npk-fertilizer-calculator</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/mandi-prices</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/ananya-ai-agronomist</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/government-schemes</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/farming-calendar</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/about</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/privacy-policy</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/terms-and-conditions</loc>'));
    assert.ok(sitemap.includes('<loc>https://grainwish.com/grievance</loc>'));
    assert.ok(sitemap.includes('hreflang="hi-in"'));
    assert.ok(sitemap.includes('hreflang="bn-in"'));
    assert.ok(sitemap.includes('hreflang="en-in"'));
    assert.ok(sitemap.includes('hreflang="x-default"'));
    assert.ok(sitemap.includes('2026-11-21T00:00:00+00:00'));
    assert.ok(!sitemap.includes('www.grainwish.com'), 'sitemap.xml should only use non-www canonical domain');
  });

  await t.test('3. Server index.js, host.js, and vercel.json 301-redirect www to non-www', () => {
    assert.match(serverIndex, /startsWith\(['"]www\.grainwish\.com['"]\)/);
    assert.match(serverIndex, /res\.redirect\(301,\s*`https:\/\/grainwish\.com/);
    assert.match(serverHost, /startsWith\(['"]www\.grainwish\.com['"]\)/);
    assert.match(serverHost, /res\.redirect\(301,\s*`https:\/\/grainwish\.com/);
    assert.match(vercel, /"value":\s*"www\.grainwish\.com"/);
    assert.match(vercel, /"Location":\s*"https:\/\/grainwish\.com\/\$1"/);
  });

  await t.test('4. index.html specifies non-www canonical URL and Schema.org entities', () => {
    assert.match(indexHtml, /<link rel="canonical" href="https:\/\/grainwish\.com" \/>/);
    assert.match(indexHtml, /content="https:\/\/grainwish\.com\/"/);
    assert.match(indexHtml, /"@id":\s*"https:\/\/grainwish\.com\/#organization"/);
  });

  await t.test('5. AboutPage exists and exports corporate profile', () => {
    assert.ok(fs.existsSync(aboutPath), 'src/components/AboutPage.jsx must exist');
    const aboutCode = fs.readFileSync(aboutPath, 'utf8');
    assert.match(aboutCode, /Grainwish Technologies Private Limited/);
    assert.match(aboutCode, /U62013WB2026PTC296769/);
    assert.match(aboutCode, /Suman Paramanik/);
  });

  await t.test('6. App.jsx handles all 11 sitemap live routes and prevents soft-404', () => {
    assert.match(appCode, /\/crop-disease-diagnosis/);
    assert.match(appCode, /\/npk-fertilizer-calculator/);
    assert.match(appCode, /\/mandi-prices/);
    assert.match(appCode, /\/ananya-ai-agronomist/);
    assert.match(appCode, /\/government-schemes/);
    assert.match(appCode, /\/farming-calendar/);
    assert.match(appCode, /\/about/);
    assert.match(appCode, /\/hi/);
    assert.match(appCode, /\/bn/);
  });
});
