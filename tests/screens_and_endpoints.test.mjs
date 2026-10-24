import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Test Suite 1: Backend API Endpoints & Server Handlers
test('Backend Endpoints & Handlers: Verify server structure and API route definitions', async (t) => {
  const serverPath = path.join(rootDir, 'server', 'index.js');
  assert.ok(fs.existsSync(serverPath), 'server/index.js must exist');
  
  const serverCode = fs.readFileSync(serverPath, 'utf8');

  await t.test('Health endpoint is defined', () => {
    assert.match(serverCode, /\/api\/health/, 'Health check route should be defined');
  });

  await t.test('Mandi prices endpoint is defined', () => {
    assert.match(serverCode, /\/api\/mandi\/prices/, 'Mandi prices route should be defined');
  });

  await t.test('Diagnostics scan endpoint is defined', () => {
    assert.match(serverCode, /\/api\/diagnostics\/scan/, 'Diagnostics scan route should be defined');
  });

  await t.test('Ananya AI chat endpoint is defined', () => {
    assert.match(serverCode, /\/api\/ananya\/chat/, 'Ananya chat route should be defined');
  });

  await t.test('NPK calculate endpoint is defined', () => {
    assert.match(serverCode, /\/api\/npk\/calculate/, 'NPK calculate route should be defined');
  });

  await t.test('Feedback endpoint is defined', () => {
    assert.match(serverCode, /\/api\/feedback/, 'Feedback route should be defined');
  });
});

// Test Suite 2: Supabase Client Library Endpoints
test('Supabase Client Helpers: Verify query and mutation functions exist', async (t) => {
  const supabaseLibPath = path.join(rootDir, 'src', 'lib', 'supabase.js');
  assert.ok(fs.existsSync(supabaseLibPath), 'src/lib/supabase.js must exist');
  
  const supabaseCode = fs.readFileSync(supabaseLibPath, 'utf8');

  await t.test('Exports fetchMandiPricesFromDB', () => {
    assert.match(supabaseCode, /export (async )?function fetchMandiPricesFromDB/, 'fetchMandiPricesFromDB should be exported');
  });

  await t.test('Exports saveDiagnosticScanToDB', () => {
    assert.match(supabaseCode, /export (async )?function saveDiagnosticScanToDB/, 'saveDiagnosticScanToDB should be exported');
  });

  await t.test('Exports saveAnanyaChatToDB', () => {
    assert.match(supabaseCode, /export (async )?function saveAnanyaChatToDB/, 'saveAnanyaChatToDB should be exported');
  });

  await t.test('Exports saveNPKToDB', () => {
    assert.match(supabaseCode, /export (async )?function saveNPKToDB/, 'saveNPKToDB should be exported');
  });

  await t.test('Exports saveFeedbackToDB', () => {
    assert.match(supabaseCode, /export (async )?function saveFeedbackToDB/, 'saveFeedbackToDB should be exported');
  });

  await t.test('Exports signInWithGoogle and signInWithDemoGoogleAccount', () => {
    assert.match(supabaseCode, /export (async )?function signInWithGoogle/, 'signInWithGoogle should be exported');
    assert.match(supabaseCode, /export (async )?function signInWithDemoGoogleAccount/, 'signInWithDemoGoogleAccount should be exported');
  });

  await t.test('Exports signOutUser and getLoggedInUser', () => {
    assert.match(supabaseCode, /export (async )?function signOutUser/, 'signOutUser should be exported');
    assert.match(supabaseCode, /export (async )?function getLoggedInUser/, 'getLoggedInUser should be exported');
  });
});

// Test Suite 3: Screens and UI Components Integrity
test('Screen Components: Verify target screens exist and are intact', async (t) => {
  const componentsDir = path.join(rootDir, 'src', 'components');
  
  const screens = [
    'Navbar.jsx',
    'HeroSection.jsx',
    'DiagnosticsTool.jsx',
    'NPKCalculator.jsx',
    'AnanyaAIAssistant.jsx',
    'MandiPrices.jsx',
    'FarmingCalendar.jsx',
    'FarmerStories.jsx',
    'DownloadModal.jsx',
    'AuthModal.jsx',
    'CookieConsentBanner.jsx',
    'FloatingMobileBar.jsx',
    'FooterSection.jsx',
    'PrivacyPolicyPage.jsx',
    'TermsConditionsPage.jsx',
    'SecurityPolicyPage.jsx',
    'NotFoundPage.jsx'
  ];

  for (const screen of screens) {
    await t.test(`Screen component ${screen} exists and is readable`, () => {
      const fullPath = path.join(componentsDir, screen);
      assert.ok(fs.existsSync(fullPath), `${screen} must exist in src/components`);
      const content = fs.readFileSync(fullPath, 'utf8');
      assert.ok(content.length > 50, `${screen} must have content`);
      assert.match(content, /export default function/, `${screen} must have a default export`);
    });
  }
});

// Test Suite 4: Icon-Only Buttons Inventory & Accessibility Baseline
test('Icon-Only Buttons Audit: Catalog current button elements', async (t) => {
  const componentsDir = path.join(rootDir, 'src', 'components');
  
  await t.test('Navbar mobile menu button inspection', () => {
    const navbar = fs.readFileSync(path.join(componentsDir, 'Navbar.jsx'), 'utf8');
    assert.ok(navbar.includes('setMobileMenuOpen'), 'Navbar has mobile menu toggle button');
  });

  await t.test('AuthModal close button inspection', () => {
    const authModal = fs.readFileSync(path.join(componentsDir, 'AuthModal.jsx'), 'utf8');
    assert.ok(authModal.includes('onClick={onClose}'), 'AuthModal has close button');
  });

  await t.test('DownloadModal close button inspection', () => {
    const dlModal = fs.readFileSync(path.join(componentsDir, 'DownloadModal.jsx'), 'utf8');
    assert.ok(dlModal.includes('onClick={onClose}'), 'DownloadModal has close button');
  });

  await t.test('AnanyaAIAssistant mic and send button inspection', () => {
    const ananya = fs.readFileSync(path.join(componentsDir, 'AnanyaAIAssistant.jsx'), 'utf8');
    assert.ok(ananya.includes('onClick={toggleMic}'), 'Ananya has mic toggle button');
    assert.ok(ananya.includes('handleSend'), 'Ananya has send button');
  });

  await t.test('DiagnosticsTool camera switch button inspection', () => {
    const diag = fs.readFileSync(path.join(componentsDir, 'DiagnosticsTool.jsx'), 'utf8');
    assert.ok(diag.includes('toggleCameraFacing'), 'DiagnosticsTool has camera flip button');
  });
});

// Test Suite 5: Pagination Candidate Endpoints Baseline
test('List Endpoints Baseline: Verify candidate list endpoints currently fetch without pagination parameters', async (t) => {
  const serverPath = path.join(rootDir, 'server', 'index.js');
  const serverCode = fs.readFileSync(serverPath, 'utf8');
  
  await t.test('Mandi prices currently queries all rows', () => {
    assert.match(serverCode, /\.from\('mandi_prices'\)\s*\.select\('\*'\)/, 'Mandi prices endpoint currently queries all records');
  });
});

// Test Suite 6: Information Security Policy & Governance Verification
test('Security Policy: Verify SECURITY.md and SecurityPolicyPage adhere to 15-section charter', async (t) => {
  const securityMdPath = path.join(rootDir, 'SECURITY.md');
  const githubSecPath = path.join(rootDir, '.github', 'SECURITY.md');
  const secPagePath = path.join(rootDir, 'src', 'components', 'SecurityPolicyPage.jsx');

  await t.test('Root SECURITY.md exists and contains all 15 sections', () => {
    assert.ok(fs.existsSync(securityMdPath), 'SECURITY.md must exist in root');
    const content = fs.readFileSync(securityMdPath, 'utf8');
    assert.ok(content.includes('1. Purpose'));
    assert.ok(content.includes('2. Scope'));
    assert.ok(content.includes('3. Access Control and Authentication'));
    assert.ok(content.includes('4. Password and Secret Management'));
    assert.ok(content.includes('5. Website and Application Security'));
    assert.ok(content.includes('6. Data Protection and Privacy'));
    assert.ok(content.includes('7. GitHub and Source Code Security'));
    assert.ok(content.includes('8. Vercel and Cloud Infrastructure Security'));
    assert.ok(content.includes('9. API and Third-Party Integrations'));
    assert.ok(content.includes('10. Security Monitoring and Incident Response'));
    assert.ok(content.includes('11. Backup and Business Continuity'));
    assert.ok(content.includes('12. Employee and Developer Responsibilities'));
    assert.ok(content.includes('13. Vulnerability Management'));
    assert.ok(content.includes('14. Compliance and Policy Enforcement'));
    assert.ok(content.includes('15. Policy Review and Approval'));
  });

  await t.test('.github/SECURITY.md exists for GitHub security advisories', () => {
    assert.ok(fs.existsSync(githubSecPath), '.github/SECURITY.md must exist');
    const content = fs.readFileSync(githubSecPath, 'utf8');
    assert.ok(content.includes('Reporting a Vulnerability'));
    assert.ok(content.includes('security@grainwish.com'));
  });

  await t.test('SecurityPolicyPage.jsx has 15 sections and incident response stepper', () => {
    assert.ok(fs.existsSync(secPagePath), 'SecurityPolicyPage.jsx must exist');
    const content = fs.readFileSync(secPagePath, 'utf8');
    assert.ok(content.includes('Identify'));
    assert.ok(content.includes('Contain'));
    assert.ok(content.includes('Investigate'));
    assert.ok(content.includes('Recover'));
    assert.ok(content.includes('Notify'));
    assert.ok(content.includes('Review'));
  });
});

