import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Mobile App Legal Compliance & Contextual Prompts', async (t) => {
  const authModalPath = path.join(rootDir, 'src', 'components', 'AuthModal.jsx');
  const downloadModalPath = path.join(rootDir, 'src', 'components', 'DownloadModal.jsx');
  const navbarPath = path.join(rootDir, 'src', 'components', 'Navbar.jsx');
  const diagnosticsPath = path.join(rootDir, 'src', 'components', 'DiagnosticsTool.jsx');
  const npkPath = path.join(rootDir, 'src', 'components', 'NPKCalculator.jsx');

  const authCode = fs.readFileSync(authModalPath, 'utf8');
  const downloadCode = fs.readFileSync(downloadModalPath, 'utf8');
  const navbarCode = fs.readFileSync(navbarPath, 'utf8');
  const diagnosticsCode = fs.readFileSync(diagnosticsPath, 'utf8');
  const npkCode = fs.readFileSync(npkPath, 'utf8');

  await t.test('Registration & Sign-Up Screen: Un-ticked checkbox and explicit consent in AuthModal', () => {
    assert.match(authCode, /agreedToTerms.*false/, 'Consent state must be un-ticked by default');
    assert.match(authCode, /By proceeding, you agree to our.*Terms of Service.*and consent to our.*Privacy Policy/s, 'Must contain exact consent statement');
    assert.match(authCode, /if \(!agreedToTerms\)/, 'Must enforce validation requiring active consent');
  });

  await t.test('Pre-Registration / OTP Screen: Un-ticked checkbox and explicit consent in DownloadModal', () => {
    assert.match(downloadCode, /androidAgreedToTerms.*false/, 'Pre-reg consent state must be un-ticked by default');
    assert.match(downloadCode, /By proceeding, you agree to our.*Terms of Service.*and consent to our.*Privacy Policy/s, 'Must contain exact consent statement in pre-reg');
    assert.match(downloadCode, /if \(!androidAgreedToTerms\)/, 'Must enforce validation requiring active consent');
  });

  await t.test('App Settings / About Menu: Permanent tap-to-read links (Profile > Settings > Legal & Privacy)', () => {
    assert.match(navbarCode, /Profile &gt; Settings &gt; Legal &amp; Privacy/i, 'Navbar must feature Profile > Settings > Legal & Privacy');
    assert.match(navbarCode, /onOpenPrivacyPolicy/, 'Must have tap-to-read Privacy Policy action');
    assert.match(navbarCode, /onOpenTerms/, 'Must have tap-to-read Terms of Service action');
    assert.match(navbarCode, /onOpenSecurityPolicy/, 'Must have tap-to-read Security Charter action');
    assert.match(downloadCode, /Profile &gt; Settings &gt; Legal &amp; Privacy/i, 'App modal must feature Profile > Settings > Legal & Privacy');
  });

  await t.test('Contextual Prompt - Camera: Exact disclosure before triggering permission', () => {
    assert.match(diagnosticsCode, /Camera access is required only to scan and diagnose crop diseases/, 'Must display exact required camera disclosure string');
    assert.match(diagnosticsCode, /showCameraPermissionModal/, 'Must have in-app permission dialog state');
    assert.match(diagnosticsCode, /requestCameraWithConsent/, 'Camera trigger must route through consent handler');
  });

  await t.test('Contextual Prompt - GPS Location: Clear agronomic advisories notice for NPK', () => {
    assert.match(npkCode, /farm-level agronomic advisories/i, 'Must clearly note usage for farm-level agronomic advisories');
    assert.match(npkCode, /showGPSPromptModal/, 'Must feature in-app GPS modal');
    assert.match(npkCode, /handleConfirmGPSLocation/, 'GPS trigger must calibrate localized NPK');
  });

  await t.test('Land Details / Khasra Data: Explicit declaration before submission', () => {
    assert.match(npkCode, /I confirm that I am the owner or authorized custodian of this land parcel/, 'Must contain exact land custodian declaration');
    assert.match(npkCode, /isLandCustodianDeclared.*false/, 'Declaration checkbox must not be pre-ticked');
    assert.match(npkCode, /if \(!isLandCustodianDeclared\)/, 'Must enforce declaration before submission');
  });
});
