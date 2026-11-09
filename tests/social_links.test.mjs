import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Social Media Links & Logos: Facebook and Instagram integration', async (t) => {
  const footerPath = path.join(rootDir, 'src', 'components', 'FooterSection.jsx');
  const navbarPath = path.join(rootDir, 'src', 'components', 'Navbar.jsx');
  const indexPath = path.join(rootDir, 'index.html');
  const serverIndexPath = path.join(rootDir, 'server', 'index.js');
  const serverHostPath = path.join(rootDir, 'server', 'host.js');
  const appPath = path.join(rootDir, 'src', 'App.jsx');

  const footerCode = fs.readFileSync(footerPath, 'utf8');
  const navbarCode = fs.readFileSync(navbarPath, 'utf8');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const serverIndexCode = fs.readFileSync(serverIndexPath, 'utf8');
  const serverHostCode = fs.readFileSync(serverHostPath, 'utf8');
  const appCode = fs.readFileSync(appPath, 'utf8');

  const cleanInstagramUrl = 'https://www.instagram.com/grainwish_ai';
  const cleanFacebookUrl = 'https://www.facebook.com/share/16NAw1dF7mn/';

  await t.test('1. FooterSection imports Facebook and Instagram icons from lucide-react', () => {
    assert.match(footerCode, /Facebook/);
    assert.match(footerCode, /Instagram/);
    assert.match(footerCode, /from\s+['"]lucide-react['"]/);
  });

  await t.test('2. FooterSection renders Instagram logo button with clean URL and safe attributes', () => {
    assert.ok(footerCode.includes(cleanInstagramUrl), 'Footer must link to clean Instagram profile');
    assert.ok(!footerCode.includes('obrf='), 'Footer must NOT contain Instagram tracking parameters (obrf)');
    assert.match(footerCode, /aria-label="Follow Grainwish AI on Instagram"/);
    assert.match(footerCode, /target="_blank"/);
    assert.match(footerCode, /rel="noopener noreferrer"/);
  });

  await t.test('3. FooterSection renders Facebook logo button with clean URL and safe attributes', () => {
    assert.ok(footerCode.includes(cleanFacebookUrl), 'Footer must link to clean Facebook share/page');
    assert.ok(!footerCode.includes('mibextid='), 'Footer must NOT contain Facebook tracking parameters (mibextid)');
    assert.match(footerCode, /aria-label="Follow Grainwish AI on Facebook"/);
    assert.match(footerCode, /target="_blank"/);
    assert.match(footerCode, /rel="noopener noreferrer"/);
  });

  await t.test('4. Navbar mobile drawer renders Instagram and Facebook logo buttons', () => {
    assert.ok(navbarCode.includes(cleanInstagramUrl), 'Navbar mobile drawer must link to clean Instagram profile');
    assert.ok(navbarCode.includes(cleanFacebookUrl), 'Navbar mobile drawer must link to clean Facebook share/page');
    assert.match(navbarCode, /aria-label="Follow Grainwish AI on Instagram"/);
    assert.match(navbarCode, /aria-label="Follow Grainwish AI on Facebook"/);
  });

  await t.test('5. index.html Schema.org JSON-LD contains both social profiles in sameAs array', () => {
    const jsonLdMatch = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    assert.ok(jsonLdMatch, 'JSON-LD script must exist in index.html');
    const parsed = JSON.parse(jsonLdMatch[1]);
    const org = parsed['@graph'].find(e => e['@type'] === 'Organization');
    assert.ok(org, 'Organization entity must exist');
    assert.ok(Array.isArray(org.sameAs), 'sameAs must be an array');
    assert.ok(org.sameAs.includes(cleanInstagramUrl), 'sameAs must include clean Instagram URL');
    assert.ok(org.sameAs.includes(cleanFacebookUrl), 'sameAs must include clean Facebook URL');
  });

  await t.test('6. server/index.js defines /instagram and /facebook vanity redirects', () => {
    assert.match(serverIndexCode, /app\.get\(['"]\/instagram['"]/);
    assert.match(serverIndexCode, /app\.get\(['"]\/facebook['"]/);
    assert.ok(serverIndexCode.includes(cleanInstagramUrl));
    assert.ok(serverIndexCode.includes(cleanFacebookUrl));
  });

  await t.test('7. server/host.js defines /instagram and /facebook vanity redirects', () => {
    assert.match(serverHostCode, /app\.get\(['"]\/instagram['"]/);
    assert.match(serverHostCode, /app\.get\(['"]\/facebook['"]/);
    assert.ok(serverHostCode.includes(cleanInstagramUrl));
    assert.ok(serverHostCode.includes(cleanFacebookUrl));
  });

  await t.test('8. src/App.jsx handles /instagram and /facebook SPA navigation redirects', () => {
    assert.ok(appCode.includes('/instagram'));
    assert.ok(appCode.includes('/facebook'));
    assert.ok(appCode.includes(cleanInstagramUrl));
    assert.ok(appCode.includes(cleanFacebookUrl));
  });
});
