import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.NEXTAUTH_SECRET || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const SESSION_DURATION = 8 * 60 * 60; // 8 hours

export interface AdminSession {
  role: 'admin';
  iat: number;
  exp: number;
}

export function verifyAdminPassword(password: string): boolean {
  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD not configured');
    return false;
  }
  return password === ADMIN_PASSWORD;
}

export function createAdminToken(): string {
  if (!JWT_SECRET) {
    throw new Error('ADMIN_JWT_SECRET / NEXTAUTH_SECRET not configured — cannot create admin token');
  }
  const payload: Omit<AdminSession, 'iat' | 'exp'> = { role: 'admin' };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: SESSION_DURATION });
}

export function verifyAdminToken(token: string): AdminSession | null {
  if (!JWT_SECRET) {
    console.error('ADMIN_JWT_SECRET / NEXTAUTH_SECRET not configured — cannot verify admin token');
    return null;
  }
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
