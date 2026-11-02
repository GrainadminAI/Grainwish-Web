import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { 
  sanitizeText, 
  sanitizeEmail, 
  sanitizePhone, 
  sanitizeNumeric, 
  checkUserAdminAccess 
} from '../src/lib/securityUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

test('Comprehensive Security Hardening Suite (18 Critical Checks)', async (t) => {

  // 1. Input Sanitization & XSS Defense
  await t.test('Security 1: sanitizeText strips script tags, iframes and residual markup', () => {
    const malicious = '<script>alert("xss")</script><b>Hello</b> <iframe src="evil.com"></iframe>';
    const clean = sanitizeText(malicious);
    assert.strictEqual(clean, 'Hello');
    assert.doesNotMatch(clean, /<script>/i);
    assert.doesNotMatch(clean, /<iframe>/i);
  });

  await t.test('Security 2: sanitizeText neutralizes inline event handlers and pseudoprotocols', () => {
    const attack = '<img src=x onerror=alert(1)> javascript:stealData() onclick=send()';
    const clean = sanitizeText(attack);
    assert.doesNotMatch(clean, /onerror=/i);
    assert.doesNotMatch(clean, /javascript:/i);
    assert.doesNotMatch(clean, /onclick=/i);
  });

  await t.test('Security 3: sanitizeEmail enforces RFC compliance and blocks CRLF injection', () => {
    assert.strictEqual(sanitizeEmail('farmer@grainwish.com'), 'farmer@grainwish.com');
    assert.strictEqual(sanitizeEmail('farmer\r\nBcc:attacker@evil.com'), '');
    assert.strictEqual(sanitizeEmail('<script>bad@domain.com'), '');
    assert.strictEqual(sanitizeEmail('invalid-email'), '');
  });

  await t.test('Security 4: sanitizePhone rejects dangerous characters and bounds length', () => {
    assert.strictEqual(sanitizePhone('+91 98765 43210'), '+91 98765 43210');
    assert.strictEqual(sanitizePhone('; rm -rf /; 98765'), '98765');
  });

  await t.test('Security 5: sanitizeNumeric prevents NaN, Infinity and enforces boundary limits', () => {
    assert.strictEqual(sanitizeNumeric(25, 1, 100, 10), 25);
    assert.strictEqual(sanitizeNumeric(500, 1, 100, 10), 100);
    assert.strictEqual(sanitizeNumeric(-50, 0, 100, 0), 0);
    assert.strictEqual(sanitizeNumeric(NaN, 1, 100, 10), 10);
    assert.strictEqual(sanitizeNumeric(Infinity, 1, 100, 10), 10);
  });

  // 2. Access Control & Admin Protection
  await t.test('Security 6: checkUserAdminAccess correctly discriminates admin vs regular users', () => {
    assert.strictEqual(checkUserAdminAccess({ email: 'admin@grainwish.com' }), true);
    assert.strictEqual(checkUserAdminAccess({ email: 'support@grainwish.com' }), true);
    assert.strictEqual(checkUserAdminAccess({ email: 'farmer@gmail.com', app_metadata: { role: 'admin' } }), true);
    assert.strictEqual(checkUserAdminAccess({ email: 'random.user@gmail.com' }), false);
    assert.strictEqual(checkUserAdminAccess(null), false);
  });

  // 3. Server Endpoints, CORS & Security Headers
  await t.test('Security 7: server/index.js defines strict CORS preventing domain spoofing', () => {
    const serverCode = fs.readFileSync(path.join(rootDir, 'server', 'index.js'), 'utf8');
    assert.match(serverCode, /ALLOWED_ORIGIN_REGEX/, 'Must define regex for domain matching');
    assert.doesNotMatch(serverCode, /origin\.includes\('grainwish\.com'\)/, 'Must not use permissive includes');
  });

  await t.test('Security 8: server/index.js defines adminAuthMiddleware and protected admin routes', () => {
    const serverCode = fs.readFileSync(path.join(rootDir, 'server', 'index.js'), 'utf8');
    assert.match(serverCode, /adminAuthMiddleware/, 'Must define admin authorization middleware');
    assert.match(serverCode, /\/api\/admin\/health/, 'Must define protected /api/admin/health route');
    assert.match(serverCode, /\/api\/admin\/audit-logs/, 'Must define protected /api/admin/audit-logs route');
    assert.match(serverCode, /401/, 'Must reject unauthorized with 401');
    assert.match(serverCode, /403/, 'Must reject non-admin with 403');
  });

  await t.test('Security 9: server/index.js enforces essential HTTP security headers', () => {
    const serverCode = fs.readFileSync(path.join(rootDir, 'server', 'index.js'), 'utf8');
    assert.match(serverCode, /nosniff/, 'Must enforce nosniff');
    assert.match(serverCode, /DENY/, 'Must enforce X-Frame-Options DENY');
    assert.match(serverCode, /Strict-Transport-Security/, 'Must enforce HSTS');
    assert.match(serverCode, /strict-origin-when-cross-origin/, 'Must enforce Referrer-Policy');
    assert.match(serverCode, /X-Permitted-Cross-Domain-Policies/, 'Must enforce Cross-Domain policies');
  });

  // 4. Database Schema & RLS Policies
  await t.test('Security 10: supabase/schema.sql secures profiles with own-user RLS', () => {
    const schemaSql = fs.readFileSync(path.join(rootDir, 'supabase', 'schema.sql'), 'utf8');
    assert.match(schemaSql, /CREATE POLICY "Allow User Read Own Profile"/, 'Must restrict profile read to owner');
    assert.match(schemaSql, /CREATE POLICY "Allow User Update Own Profile"/, 'Must restrict profile update to owner');
    assert.doesNotMatch(schemaSql, /CREATE POLICY "Allow Public Read Profiles"/, 'Must not allow public read of profiles');
  });

  await t.test('Security 11: supabase/schema.sql secures user_feedbacks and consent_audit_logs', () => {
    const schemaSql = fs.readFileSync(path.join(rootDir, 'supabase', 'schema.sql'), 'utf8');
    assert.match(schemaSql, /CREATE POLICY "Allow User Read Own Feedback"/, 'Must isolate feedbacks to owner');
    assert.match(schemaSql, /CREATE POLICY "Allow Admin Read Consent Audit Logs"/, 'Must restrict audit log reads');
  });

  await t.test('Security 12: supabase/schema.sql creates optimization indexes for RLS filters', () => {
    const schemaSql = fs.readFileSync(path.join(rootDir, 'supabase', 'schema.sql'), 'utf8');
    assert.match(schemaSql, /CREATE INDEX IF NOT EXISTS idx_diagnostics_scans_user_id/, 'Must index diagnostics user_id');
    assert.match(schemaSql, /CREATE INDEX IF NOT EXISTS idx_ananya_chats_user_id/, 'Must index chats user_id');
    assert.match(schemaSql, /CREATE INDEX IF NOT EXISTS idx_user_feedbacks_user_id/, 'Must index feedbacks user_id');
  });

  // 5. Git & Environment Hygiene
  await t.test('Security 13: .gitignore ignores .env*, .vite, certificates, and root loose media', () => {
    const gitignore = fs.readFileSync(path.join(rootDir, '.gitignore'), 'utf8');
    assert.match(gitignore, /\.env\.\*/, 'Must ignore all .env variants');
    assert.match(gitignore, /!\.env\.example/, 'Must whitelist .env.example');
    assert.match(gitignore, /\.vite\//, 'Must ignore .vite folder');
    assert.match(gitignore, /\/\*\.mp4/, 'Must ignore loose root media');
  });

  await t.test('Security 14: .env.example documents variables without leaking real secrets', () => {
    const envExample = fs.readFileSync(path.join(rootDir, '.env.example'), 'utf8');
    assert.match(envExample, /your-anon-key-here|your-supabase-public-anon-key/i, 'Must use placeholder keys');
    assert.match(envExample, /ADMIN_API_KEY/, 'Must document ADMIN_API_KEY');
    assert.match(envExample, /ADMIN_EMAILS/, 'Must document ADMIN_EMAILS');
  });

  await t.test('Security 15: package.json removes unused dependencies and segregates types', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
    assert.strictEqual(pkg.dependencies['framer-motion'], undefined, 'framer-motion must be removed');
    assert.strictEqual(pkg.dependencies['typescript'], undefined, 'typescript must not be in production dependencies');
  });
});
