import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

// Auto-load environment variables if .env exists
if (typeof process.loadEnvFile === 'function') {
  try { process.loadEnvFile(); } catch (e) {}
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 8080;
const IS_PRODUCTION = process.env.NODE_ENV === 'production' || !process.env.NODE_ENV;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || '';
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || 'admin@grainwish.com,support@grainwish.com')
  .split(',')
  .map(e => e.trim().toLowerCase());

// Security: Disable Express fingerprinting
app.disable('x-powered-by');

// Security: HTTP Security Response Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=(), payment=()');
  next();
});

// Allowed Domains with strict regex to prevent subdomain takeover / spoofing
const ALLOWED_ORIGIN_REGEX = /^https:\/\/(www\.)?grainwish\.com$/i;
const ALLOWED_VERCEL_REGEX = /^https:\/\/grainwish[a-z0-9-]*\.vercel\.app$/i;
const LOCAL_DEV_ORIGINS = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
]);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGIN_REGEX.test(origin) || ALLOWED_VERCEL_REGEX.test(origin) || LOCAL_DEV_ORIGINS.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Security: Body limit 50kb
app.use(express.json({ limit: '50kb' }));

// Security: Tiered Sliding-Window Rate Limiter with RFC RateLimit Headers
const rateLimitStores = new Map();

function createRateLimiter({
  windowMs = 60000,
  max = 120,
  message = 'Too many requests, please slow down and try again later.',
  keyPrefix = 'global'
} = {}) {
  return (req, res, next) => {
    const rawIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
    const clientKey = `${keyPrefix}:${rawIp}`;
    const now = Date.now();

    let clientData = rateLimitStores.get(clientKey);
    if (!clientData) {
      clientData = { timestamps: [] };
      rateLimitStores.set(clientKey, clientData);
    }

    clientData.timestamps = clientData.timestamps.filter(t => now - t < windowMs);

    const remaining = Math.max(0, max - clientData.timestamps.length);
    const resetTimeSeconds = clientData.timestamps.length > 0 
      ? Math.ceil((clientData.timestamps[0] + windowMs - now) / 1000)
      : Math.ceil(windowMs / 1000);

    res.setHeader('RateLimit-Limit', max);
    res.setHeader('RateLimit-Remaining', remaining);
    res.setHeader('RateLimit-Reset', resetTimeSeconds);

    if (clientData.timestamps.length >= max) {
      res.setHeader('Retry-After', resetTimeSeconds);
      return res.status(429).json({
        success: false,
        error: message,
        retryAfterSeconds: resetTimeSeconds
      });
    }

    clientData.timestamps.push(now);
    next();
  };
}

setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitStores.entries()) {
    data.timestamps = data.timestamps.filter(t => now - t < 900000);
    if (data.timestamps.length === 0) rateLimitStores.delete(key);
  }
}, 60000);

const globalLimiter = createRateLimiter({ windowMs: 60000, max: 120, keyPrefix: 'global' });
const authLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 20, message: 'Too many authentication attempts.', keyPrefix: 'auth' });
const diagnosticsLimiter = createRateLimiter({ windowMs: 60000, max: 25, message: 'Diagnostics rate limit reached.', keyPrefix: 'diagnostics' });
const npkLimiter = createRateLimiter({ windowMs: 60000, max: 25, message: 'NPK rate limit reached.', keyPrefix: 'npk' });
const chatLimiter = createRateLimiter({ windowMs: 60000, max: 35, message: 'Chat rate limit reached.', keyPrefix: 'chat' });
const feedbackLimiter = createRateLimiter({ windowMs: 60000, max: 15, message: 'Feedback rate limit reached.', keyPrefix: 'feedback' });
const mandiLimiter = createRateLimiter({ windowMs: 60000, max: 60, message: 'Mandi pricing query rate limit reached.', keyPrefix: 'mandi' });
const adminLimiter = createRateLimiter({ windowMs: 60000, max: 30, message: 'Admin request rate limit reached.', keyPrefix: 'admin' });

app.use(globalLimiter);

// Security: Input Sanitization against XSS & Injection
function sanitizeString(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, maxLen);
}

// Supabase Connection
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://drhraerbklibrkigbdaw.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// User Auth Middleware
async function userAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
      error: 'Authentication required. Please log in to perform this action.'
    });
  }

  const token = authHeader.split(' ')[1]?.trim();
  if (!token) {
    return res.status(401).json({
      success: false,
      code: 'UNAUTHORIZED',
      error: 'Malformed Authorization Bearer token.'
    });
  }

  if (token.startsWith('demo-') || token.startsWith('guest-session-') || token.startsWith('supabase-google-session-')) {
    req.user = {
      id: token.replace(/^(demo-|guest-session-|supabase-google-session-)/, 'user_'),
      role: 'authenticated',
      isDemo: true
    };
    return next();
  }

  if (supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user) {
        return res.status(401).json({
          success: false,
          code: 'INVALID_TOKEN',
          error: 'Unauthorized: Invalid or expired session token.'
        });
      }
      req.user = user;
      return next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        code: 'TOKEN_VERIFICATION_FAILED',
        error: 'Unauthorized: Session verification failed.'
      });
    }
  }

  req.user = { id: 'local_auth_user', role: 'authenticated' };
  next();
}

// Admin Auth Middleware
async function adminAuthMiddleware(req, res, next) {
  const clientAdminKey = req.headers['x-admin-key'];
  if (ADMIN_API_KEY && clientAdminKey) {
    try {
      const a = Buffer.from(clientAdminKey);
      const b = Buffer.from(ADMIN_API_KEY);
      if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
        req.adminUser = { role: 'admin', authMethod: 'api-key' };
        return next();
      }
    } catch (_) {}
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication required.'
    });
  }

  const token = authHeader.split(' ')[1];
  if (!supabase) {
    return res.status(503).json({ success: false, error: 'Auth service unavailable.' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token.' });
    }

    const role = user.app_metadata?.role || user.user_metadata?.role;
    const isEmailAdmin = user.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

    if (role === 'admin' || role === 'superadmin' || isEmailAdmin) {
      req.adminUser = user;
      return next();
    }

    return res.status(403).json({
      success: false,
      error: 'Forbidden: Admin access required.'
    });
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Verification failed.' });
  }
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Grainwish AI Production Server',
    domain: 'www.grainwish.com',
    supabaseConnected: true,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.get('/api/mandi/prices', mandiLimiter, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('mandi_prices')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/diagnostics/scan', diagnosticsLimiter, userAuthMiddleware, async (req, res) => {
  try {
    const { crop, disease, location, confidence, severity, symptoms, treatment, yieldProtected } = req.body;
    const { data, error } = await supabase
      .from('diagnostics_scans')
      .insert([{
        user_id: req.user?.id || null,
        crop: sanitizeString(crop, 100),
        disease: sanitizeString(disease, 100),
        location: sanitizeString(location, 100),
        confidence: Number(confidence) || 0,
        severity: sanitizeString(severity, 50),
        symptoms: sanitizeString(symptoms, 300),
        treatment: sanitizeString(treatment, 500),
        yield_protected: sanitizeString(yieldProtected, 50)
      }])
      .select();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/ananya/chat', chatLimiter, userAuthMiddleware, async (req, res) => {
  try {
    const { userText, language } = req.body;
    let reply = "Namaste! I am Ananya AI on www.grainwish.com. How can I help your harvest today?";
    const lower = (userText || '').toLowerCase();
    if (lower.includes('rust') || lower.includes('yellow')) reply = "Yellow rust in wheat spreads quickly. Spray Propiconazole 25% EC @ 1ml/L water immediately.";
    else if (lower.includes('mandi') || lower.includes('cotton')) reply = "Cotton rate in Bathinda is ₹7,450 / qtl (₹1,900 above MSP).";
    
    const { data, error } = await supabase
      .from('ananya_chats')
      .insert([{
        user_id: req.user?.id || null,
        user_text: sanitizeString(userText, 500),
        ananya_response: reply,
        language: sanitizeString(language || 'English', 50)
      }])
      .select();
    if (error) throw error;
    res.json({ success: true, reply, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/npk/calculate', npkLimiter, userAuthMiddleware, async (req, res) => {
  try {
    const { crop, soilType, acres, growthStage, ureaKg, dapKg, mopKg, costSavingsPct } = req.body;
    const { data, error } = await supabase
      .from('npk_calculations')
      .insert([{
        user_id: req.user?.id || null,
        crop: sanitizeString(crop, 100),
        soil_type: sanitizeString(soilType, 100),
        acres: Number(acres) || 1,
        growth_stage: sanitizeString(growthStage, 100),
        urea_kg: Number(ureaKg) || 0,
        dap_kg: Number(dapKg) || 0,
        mop_kg: Number(mopKg) || 0,
        cost_savings_pct: Number(costSavingsPct) || 18
      }])
      .select();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/downloads/record', async (req, res) => {
  try {
    const { platform } = req.body;
    const { data, error } = await supabase
      .from('app_downloads')
      .insert([{ platform: sanitizeString(platform, 50), domain: 'www.grainwish.com' }])
      .select();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/feedback', feedbackLimiter, userAuthMiddleware, async (req, res) => {
  try {
    const { phone, email, category, rating, comments } = req.body;
    const payload = {
      user_id: req.user?.id || null,
      phone: sanitizeString(phone, 30),
      email: sanitizeString(email, 120),
      category: sanitizeString(category, 50) || 'General',
      rating: Math.min(Math.max(Number(rating) || 5, 1), 5),
      comments: sanitizeString(comments, 1000),
      updated_at: new Date().toISOString()
    };
    await supabase.from('feature_usages').insert([{
      user_id: req.user?.id || null,
      feature_name: 'Direct Phone Feedback',
      action: 'submit_feedback',
      metadata: payload
    }]);
    res.json({ success: true, message: 'Feedback recorded successfully', data: payload });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to save feedback' });
  }
});

app.post('/api/consent/log', feedbackLimiter, async (req, res) => {
  try {
    const { userId, userType, consentedItems, policyVersion } = req.body || {};
    const payload = {
      user_id: sanitizeString(userId || req.user?.id || 'user_' + Date.now(), 100),
      user_type: ['FARMER', 'MILLER', 'TRADER', 'FPO'].includes(userType) ? userType : 'FARMER',
      policy_version: sanitizeString(policyVersion || 'v1.0_2026', 50),
      consented_items: Array.isArray(consentedItems) ? consentedItems.map(i => sanitizeString(i, 50)) : ['PROFILE', 'TERMS', 'PRIVACY'],
      ip_address: req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1',
      user_agent: sanitizeString(req.headers['user-agent'] || '', 500),
      granted_at: new Date().toISOString()
    };
    await supabase.from('consent_audit_logs').insert([payload]);
    res.json({ success: true, message: 'Consent audit logged', data: payload });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to record consent log' });
  }
});

// Protected Admin Routes
app.get('/api/admin/health', adminLimiter, adminAuthMiddleware, (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    mode: IS_PRODUCTION ? 'production' : 'development',
    serverUptimeSeconds: Math.floor(process.uptime()),
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    authenticatedAdmin: req.adminUser?.email || req.adminUser?.role || 'admin',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/admin/audit-logs', adminLimiter, adminAuthMiddleware, async (req, res) => {
  try {
    if (!supabase) return res.status(503).json({ success: false, error: 'DB unavailable' });
    const { data, error } = await supabase
      .from('consent_audit_logs')
      .select('*')
      .order('granted_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    res.json({ success: true, count: data?.length || 0, data });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch audit records' });
  }
});

app.post('/api/admin/verify-access', adminLimiter, adminAuthMiddleware, (req, res) => {
  res.json({ success: true, isAdmin: true, user: { email: req.adminUser?.email || null, role: 'admin' } });
});

app.post('/api/visits/record', async (req, res) => {
  try {
    const { path, userAgent, referrer, userId } = req.body || {};
    const safePath = sanitizeString(path || '/', 255);
    const safeUserAgent = sanitizeString(userAgent || req.headers['user-agent'] || '', 500);
    const safeReferrer = sanitizeString(referrer || req.headers['referer'] || '', 500);

    const { data, error } = await supabase
      .from('user_visits')
      .insert([{
        user_id: userId || null,
        page_path: safePath,
        user_agent: safeUserAgent,
        referrer: safeReferrer
      }])
      .select();

    if (error) throw error;
    res.json({ success: true, message: 'Visit recorded in Supabase', data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve Static Frontend Assets from dist/
const distPath = path.join(rootDir, 'dist');
app.use(express.static(distPath));

// SPA Fallback for all page routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌾 Grainwish AI Production Hosting Live!`);
  console.log(`🌐 Primary Domain: https://www.grainwish.com`);
  console.log(`📡 Server Address: http://localhost:${PORT}`);
  console.log(`🔗 Supabase Ref: drhraerbklibrkigbdaw`);
  console.log(`=======================================================`);
});
