import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Mobile App & Agritech Legal Compliance (DPDP Act 2023 & GDPR)', async (t) => {
  const authModalPath = path.join(rootDir, 'src', 'components', 'AuthModal.jsx');
  const downloadModalPath = path.join(rootDir, 'src', 'components', 'DownloadModal.jsx');
  const navbarPath = path.join(rootDir, 'src', 'components', 'Navbar.jsx');
  const footerPath = path.join(rootDir, 'src', 'components', 'FooterSection.jsx');
  const diagnosticsPath = path.join(rootDir, 'src', 'components', 'DiagnosticsTool.jsx');
  const npkPath = path.join(rootDir, 'src', 'components', 'NPKCalculator.jsx');
  const privacyPath = path.join(rootDir, 'src', 'components', 'PrivacyPolicyPage.jsx');
  const termsPath = path.join(rootDir, 'src', 'components', 'TermsConditionsPage.jsx');
  const certTermsPath = path.join(rootDir, 'src', 'components', 'CertificateTermsPage.jsx');
  const grievancePath = path.join(rootDir, 'src', 'components', 'GrievanceRedressalPage.jsx');
  const serverPath = path.join(rootDir, 'server', 'index.js');
  const supabaseLibPath = path.join(rootDir, 'src', 'lib', 'supabase.js');
  const schemaPath = path.join(rootDir, 'supabase', 'schema.sql');

  const authCode = fs.readFileSync(authModalPath, 'utf8');
  const downloadCode = fs.readFileSync(downloadModalPath, 'utf8');
  const navbarCode = fs.readFileSync(navbarPath, 'utf8');
  const footerCode = fs.readFileSync(footerPath, 'utf8');
  const diagnosticsCode = fs.readFileSync(diagnosticsPath, 'utf8');
  const npkCode = fs.readFileSync(npkPath, 'utf8');
  const privacyCode = fs.readFileSync(privacyPath, 'utf8');
  const termsCode = fs.readFileSync(termsPath, 'utf8');
  const certTermsCode = fs.readFileSync(certTermsPath, 'utf8');
  const grievanceCode = fs.readFileSync(grievancePath, 'utf8');
  const serverCode = fs.readFileSync(serverPath, 'utf8');
  const supabaseLibCode = fs.readFileSync(supabaseLibPath, 'utf8');
  const schemaCode = fs.readFileSync(schemaPath, 'utf8');

  // 1. Mandatory Public Pages & Footer Architecture
  await t.test('Component 1: /privacy-policy maps data points and lists Grievance Officer and Indian address', () => {
    assert.match(privacyCode, /Information We Collect/, 'Must categorize collected information');
    assert.match(privacyCode, /R\. Narayanan/, 'Must list Grievance Redressal Officer name');
    assert.match(privacyCode, /support@grainwish\.com/, 'Must list Grievance Officer email');
    assert.match(privacyCode, /Noida, Uttar Pradesh 201309, India/, 'Must list Indian registered address');
  });

  await t.test('Component 1: /terms-and-conditions houses Agronomic Advisory Disclaimer', () => {
    assert.match(termsCode, /Agronomic Advisory Disclaimer/, 'Must house Agronomic Advisory Disclaimer');
    assert.match(termsCode, /predictive recommendations, not guaranteed yield insurance/, 'Must stipulate predictive recommendations disclaimer');
  });

  await t.test('Component 1: /certificate-terms details criteria, self-declaration & non-tamper warranties', () => {
    assert.ok(fs.existsSync(certTermsPath), 'CertificateTermsPage.jsx must exist');
    assert.match(certTermsCode, /Certificate Issuance Criteria/, 'Must detail certificate criteria');
    assert.match(certTermsCode, /Self-Declaration/, 'Must include self-declaration clauses');
    assert.match(certTermsCode, /Non-Tamper Warranty/, 'Must warrant cryptographic non-tampering');
  });

  await t.test('Component 1: Global Footer provides persistent links across all public views', () => {
    assert.match(footerCode, /href="\/privacy-policy"/, 'Footer must link to /privacy-policy');
    assert.match(footerCode, /href="\/terms-and-conditions"/, 'Footer must link to /terms-and-conditions');
    assert.match(footerCode, /href="\/certificate-terms"/, 'Footer must link to /certificate-terms');
    assert.match(footerCode, /href="\/grievance"/, 'Footer must link to /grievance');
  });

  // 2. Website Form Integration (Explicit Checkboxes)
  await t.test('Component 2: Farmer / Trader / FPO Onboarding Form affirmative un-checked consent', () => {
    assert.match(authCode, /id="consent_tos"/, 'Must use id="consent_tos"');
    assert.match(authCode, /agreedToTerms.*false/, 'Checkbox must not be pre-ticked');
    assert.match(authCode, /I agree to the.*Terms of Service.*and authorize the processing of my profile and crop data under the.*Privacy Policy/s, 'Must contain exact consent statement');
    assert.match(authCode, /userType/, 'Must support user type selection');
  });

  await t.test('Component 2: Farmer Land Details (Survey/Khasra Screen) affirmative consent', () => {
    assert.match(npkCode, /id="consent_land"/, 'Must use id="consent_land"');
    assert.match(npkCode, /isLandCustodianDeclared.*false/, 'Land declaration must not be pre-ticked');
    assert.match(npkCode, /I declare that I am the legal titleholder or authorized representative for these survey parcel details/, 'Must contain exact land parcel declaration');
  });

  // 3. Browser Hardware Permissions
  await t.test('Component 3: Live Camera Access uses rear camera default and provides crop-scanner-feed', () => {
    assert.match(diagnosticsCode, /id="crop-scanner-feed"/, 'Video element must have id="crop-scanner-feed"');
    assert.match(diagnosticsCode, /facingMode.*ideal.*environment/i, 'Must default to rear environment camera');
    assert.match(diagnosticsCode, /startCropDiagnosticCamera/, 'Must define startCropDiagnosticCamera');
    assert.match(diagnosticsCode, /nativeCameraInputRef/, 'Must have fallback to native camera/upload');
  });

  await t.test('Component 3: GPS Geolocation captureFieldCoordinates with enableHighAccuracy', () => {
    assert.match(npkCode, /captureFieldCoordinates/, 'Must implement captureFieldCoordinates');
    assert.match(npkCode, /enableHighAccuracy:\s*true/, 'Must enable high accuracy geolocation');
    assert.match(npkCode, /Location access required for regional NPK recommendations/, 'Must handle location required error');
  });

  // 4. Backend Consent Audit Log
  await t.test('Component 4: Backend Consent Audit Log endpoint and Supabase table schema', () => {
    assert.match(serverCode, /\/api\/consent\/log/, 'Server must define /api/consent/log route');
    assert.match(supabaseLibCode, /export async function recordConsentAuditLog/, 'src/lib/supabase.js must export recordConsentAuditLog');
    assert.match(schemaCode, /CREATE TABLE IF NOT EXISTS public\.consent_audit_logs/, 'supabase/schema.sql must define consent_audit_logs table');
    assert.match(schemaCode, /consented_items TEXT\[\]/, 'schema must include consented_items array');
  });

  // 5. JSON-LD Structured Data Schema
  await t.test('Component 5: Schema.org Organization structured data in index.html', () => {
    const indexPath = path.resolve(__dirname, '../index.html');
    const indexHtml = fs.readFileSync(indexPath, 'utf8');
    assert.match(indexHtml, /<script type="application\/ld\+json">/, 'Must contain JSON-LD script tag');
    assert.match(indexHtml, /"name":\s*"GrainWish AI"/, 'Must contain Organization name');
    assert.match(indexHtml, /"url":\s*"https:\/\/www\.grainwish\.com\/"/, 'Must contain Organization URL');
    assert.match(indexHtml, /"description":\s*"AI-powered crop disease detection, fertilizer advice and mandi prices for Indian farmers\."/, 'Must contain exact requested description');
  });
});
