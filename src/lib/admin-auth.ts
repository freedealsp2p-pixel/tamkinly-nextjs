/**
 * Admin Authentication Utilities
 * 
 * IMPORTANT: In production, set ADMIN_PASSWORD environment variable!
 * The fallback is only for development and should NEVER be used in production.
 */

/**
 * Verify admin password against environment variable
 * @param password - The password to verify
 * @returns true if password is correct
 */
export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  // In production, ADMIN_PASSWORD MUST be set
  if (process.env.NODE_ENV === 'production') {
    if (!adminPassword) {
      console.error('CRITICAL: ADMIN_PASSWORD environment variable not set in production!');
      return false;
    }
    return password === adminPassword;
  }
  
  // In development, use env var or fallback
  const devPassword = adminPassword || 'dev-admin-password';
  return password === devPassword;
}

/**
 * Get admin password hint for development only
 * Shows a hint in the UI for developers
 */
export function getAdminPasswordHint(): string | null {
  if (process.env.NODE_ENV === 'production') {
    return null; // Never show hint in production
  }
  
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return 'Set ADMIN_PASSWORD in .env file';
  }
  return null;
}

/**
 * Check if admin authentication is properly configured
 */
export function isAdminAuthConfigured(): boolean {
  if (process.env.NODE_ENV === 'production') {
    return !!process.env.ADMIN_PASSWORD;
  }
  return true; // Development mode doesn't require configuration
}
