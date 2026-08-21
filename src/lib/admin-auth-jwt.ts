import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.NEXTAUTH_SECRET || 'fallback-secret-change-me';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Tamkinly@26';
const SESSION_DURATION = 8 * 60 * 60; // 8 hours

export interface AdminSession {
  role: 'admin';
  iat: number;
  exp: number;
}

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createAdminToken(): string {
  const payload: Omit<AdminSession, 'iat' | 'exp'> = { role: 'admin' };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: SESSION_DURATION });
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

export function isAdminAuthConfigured(): boolean {
  if (process.env.NODE_ENV === 'production') {
    return !!process.env.ADMIN_PASSWORD;
  }
  return true;
}
