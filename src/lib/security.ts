/**
 * Security Module - Encryption & Data Protection
 * Handles encryption of sensitive data: emails, phones, license keys, payment data
 */

import crypto from 'crypto';

// Encryption configuration
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const AUTH_TAG_LENGTH = 16;
const SALT_LENGTH = 64;

// Get encryption key from environment or generate a default for development
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (key) {
    return Buffer.from(key, 'hex');
  }
  // Development fallback - should never be used in production
  console.warn('WARNING: Using development encryption key. Set ENCRYPTION_KEY in production!');
  return crypto.createHash('sha256').update('tamkinly-dev-key-change-in-production').digest();
}

/**
 * Encrypt sensitive data using AES-256-GCM
 * Returns: base64 encoded encrypted data with iv:authTag:ciphertext format
 */
export function encrypt(plaintext: string): string {
  if (!plaintext) return '';
  
  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const salt = crypto.randomBytes(SALT_LENGTH);
    
    // Derive key with salt for additional security
    const derivedKey = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
    
    const cipher = crypto.createCipheriv(ALGORITHM, derivedKey, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    const authTag = cipher.getAuthTag();
    
    // Format: salt:iv:authTag:encrypted
    return [
      salt.toString('base64'),
      iv.toString('base64'),
      authTag.toString('base64'),
      encrypted
    ].join(':');
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt data encrypted with AES-256-GCM
 */
export function decrypt(encryptedData: string): string {
  if (!encryptedData) return '';
  
  try {
    const key = getEncryptionKey();
    const parts = encryptedData.split(':');
    
    if (parts.length !== 4) {
      throw new Error('Invalid encrypted data format');
    }
    
    const [saltB64, ivB64, authTagB64, encrypted] = parts;
    const salt = Buffer.from(saltB64, 'base64');
    const iv = Buffer.from(ivB64, 'base64');
    const authTag = Buffer.from(authTagB64, 'base64');
    
    // Derive key with salt
    const derivedKey = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
    
    const decipher = crypto.createDecipheriv(ALGORITHM, derivedKey, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Hash data using SHA-256 (one-way, for passwords, tokens)
 */
export function hash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate a secure access code for products
 */
export function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 3;
  const segmentLength = 4;
  
  const codeSegments = [];
  for (let i = 0; i < segments; i++) {
    let segment = '';
    for (let j = 0; j < segmentLength; j++) {
      // Use crypto.randomBytes for cryptographically secure randomness
      const randomByte = crypto.randomBytes(1)[0];
      segment += chars.charAt(randomByte % chars.length);
    }
    codeSegments.push(segment);
  }
  
  return `TMLY-${codeSegments.join('-')}`;
}

/**
 * Mask email for display (e.g., a***@example.com)
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return email;
  
  const [localPart, domain] = email.split('@');
  const maskedLocal = localPart.charAt(0) + '***';
  
  return `${maskedLocal}@${domain}`;
}

/**
 * Mask phone number for display (e.g., +1***-***-1234)
 */
export function maskPhone(phone: string): string {
  if (!phone || phone.length < 4) return phone;
  
  const last4 = phone.slice(-4);
  const masked = '*'.repeat(phone.length - 4);
  
  return `${masked}${last4}`;
}

/**
 * Mask access code for display (e.g., TMLY-****-****-ABCD)
 */
export function maskAccessCode(code: string): string {
  if (!code || !code.includes('-')) return code;
  
  const parts = code.split('-');
  if (parts.length !== 4) return code;
  
  // Show only last segment
  return `TMLY-****-****-${parts[3]}`;
}

/**
 * Verify webhook signature using HMAC
 */
export function verifyHmacSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    // Use timing-safe comparison
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch {
    return false;
  }
}

/**
 * Generate HMAC signature for webhook payloads
 */
export function generateHmacSignature(payload: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (basic)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]{10,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Generate password hash with bcrypt-style format
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return `pbkdf2:sha256:100000:${salt}:${hash}`;
}

/**
 * Verify password hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(':');
    
    if (parts.length !== 5) {
      // Legacy bcrypt format or invalid
      return false;
    }
    
    const [, , iterations, salt, hash] = parts;
    const verifyHash = crypto.pbkdf2Sync(password, salt, parseInt(iterations), 64, 'sha256').toString('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(verifyHash, 'hex')
    );
  } catch {
    return false;
  }
}

/**
 * Rate limiting helper (in-memory, use Redis in production)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }
  
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }
  
  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}

/**
 * CSRF Token generation and verification
 */
const csrfTokens = new Map<string, { token: string; expires: number }>();

export function generateCsrfToken(sessionId: string): string {
  const token = generateSecureToken(32);
  csrfTokens.set(sessionId, { token, expires: Date.now() + 3600000 }); // 1 hour
  return token;
}

export function verifyCsrfToken(sessionId: string, token: string): boolean {
  const record = csrfTokens.get(sessionId);
  
  if (!record || Date.now() > record.expires) {
    csrfTokens.delete(sessionId);
    return false;
  }
  
  return record.token === token;
}

/**
 * Secure session data
 */
export interface SecureSession {
  userId: string;
  email: string;
  role: string;
  accessTier: string | null;
  createdAt: number;
  expiresAt: number;
}

export function createSecureSession(
  userId: string,
  email: string,
  role: string,
  accessTier: string | null
): string {
  const session: SecureSession = {
    userId,
    email,
    role,
    accessTier,
    createdAt: Date.now(),
    expiresAt: Date.now() + 86400000, // 24 hours
  };
  
  return encrypt(JSON.stringify(session));
}

export function parseSecureSession(encryptedSession: string): SecureSession | null {
  try {
    const decrypted = decrypt(encryptedSession);
    const session = JSON.parse(decrypted) as SecureSession;
    
    if (Date.now() > session.expiresAt) {
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}

// Security utilities export
const Security = {
  encrypt,
  decrypt,
  hash,
  generateSecureToken,
  generateAccessCode,
  maskEmail,
  maskPhone,
  maskAccessCode,
  verifyHmacSignature,
  generateHmacSignature,
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  hashPassword,
  verifyPassword,
  checkRateLimit,
  generateCsrfToken,
  verifyCsrfToken,
  createSecureSession,
  parseSecureSession,
};

export default Security;
