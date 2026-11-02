/**
 * Grainwish AI — Client & Backend Security Utilities
 * Input Sanitization, XSS Neutralization, and Access Control
 * Official Security Contact: support@grainwish.com
 */

/**
 * Strips HTML tags, script vectors, and control characters to prevent Stored & Reflected XSS.
 * @param {any} input
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeText(input, maxLength = 500) {
  if (input === null || input === undefined) return '';
  const str = String(input);

  // 1. Remove null bytes and control characters (except common whitespace)
  const cleanCtrl = str.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');

  // 2. Remove script / html tags and dangerous attributes
  const cleanTags = cleanCtrl
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<[^>]+>/g, '') // strip all residual tags
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/on\w+\s*=/gi, ''); // remove event handlers like onerror=, onload=

  return cleanTags.trim().slice(0, maxLength);
}

/**
 * Sanitizes and validates email addresses, preventing CRLF / Header Injection.
 * Rejects any email carrying dangerous injection characters.
 * @param {string} email
 * @returns {string}
 */
export function sanitizeEmail(email) {
  if (!email || typeof email !== 'string') return '';
  // Check for forbidden characters (<, >, quotes, control characters, newlines)
  if (/[<>'";`\r\n\t\\]/.test(email)) return '';

  const clean = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean) || clean.length > 254) return '';
  return clean;
}

/**
 * Sanitizes phone numbers, stripping any unexpected characters or injection attempts.
 * @param {string} phone
 * @returns {string}
 */
export function sanitizePhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  // Only allow digits, plus, and spaces
  const clean = phone.replace(/[^\d+]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 20);
  return clean;
}

/**
 * Safely parses and bounds numerical input to prevent overflow / NaN injection.
 * @param {any} value
 * @param {number} min
 * @param {number} max
 * @param {number} defaultVal
 * @returns {number}
 */
export function sanitizeNumeric(value, min = 0, max = 1000000, defaultVal = 0) {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num)) return defaultVal;
  return Math.min(Math.max(num, min), max);
}

/**
 * Verifies whether an authenticated user profile carries admin privileges.
 * @param {object|null} user
 * @param {string[]} customAdminList
 * @returns {boolean}
 */
export function checkUserAdminAccess(user, customAdminList = []) {
  if (!user) return false;
  
  // 1. Check Supabase app_metadata role
  const role = user.app_metadata?.role || user.user_metadata?.role;
  if (role === 'admin' || role === 'superadmin') return true;

  // 2. Check email against trusted administrator emails
  const defaultAdmins = ['admin@grainwish.com', 'support@grainwish.com'];
  const allowed = [...defaultAdmins, ...customAdminList].map(e => e.toLowerCase().trim());
  const userEmail = (user.email || '').toLowerCase().trim();

  return Boolean(userEmail && allowed.includes(userEmail));
}
