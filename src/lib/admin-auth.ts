/**
 * Admin Authentication Utilities
 * 
 * IMPORTANT: In production, set ADMIN_PASSWORD environment variable!
 * The fallback is only for development and should NEVER be used in production.
 */

// Default password for development and fallback
const DEFAULT_ADMIN_PASSWORD = 'Tamkinly@26';

/**
 * Verify admin password against environment variable
 * @param password - The password to verify
 * @returns true if password is correct
 */
export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  // Use environment variable if set, otherwise use default
  const validPassword = adminPassword || DEFAULT_ADMIN_PASSWORD;
  
  return password === validPassword;
}

/**
 * Get the current admin password (for internal API use)
 * @returns The valid admin password
 */
export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
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
