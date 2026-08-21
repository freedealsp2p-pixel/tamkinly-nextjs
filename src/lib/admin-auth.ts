/**
 * Admin Authentication Utilities
 * 
 * DEPRECATED: Use admin-auth-jwt.ts instead for JWT-based sessions.
 * This file is kept for backward compatibility only.
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

/**
 * Verify admin password against environment variable
 * @deprecated Use getAdminSession() from admin-auth-jwt.ts instead
 */
export function verifyAdminPassword(password: string): boolean {
  if (!ADMIN_PASSWORD) {
    console.error('⚠️ ADMIN_PASSWORD not set in environment');
    return false;
  }
  return password === ADMIN_PASSWORD;
}

/**
 * Get the current admin password (for internal API use)
 * @deprecated Use JWT-based admin auth instead
 */
export function getAdminPassword(): string {
  return ADMIN_PASSWORD;
}

/**
 * Get admin password hint for development only
 */
export function getAdminPasswordHint(): string | null {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return 'Set ADMIN_PASSWORD in .env file';
}

/**
 * Check if admin authentication is properly configured
 */
export function isAdminAuthConfigured(): boolean {
  if (process.env.NODE_ENV === 'production') {
    return !!process.env.ADMIN_PASSWORD;
  }
  return true;
}

