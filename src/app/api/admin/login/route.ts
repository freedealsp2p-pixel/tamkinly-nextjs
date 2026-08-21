import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, createAdminToken } from '@/lib/admin-auth-jwt';

// Rate limiting for admin login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('cf-connecting-ip') || 
               request.headers.get('x-forwarded-for')?.split(',')[0] || 
               'unknown';
    
    // Rate limiting
    const now = Date.now();
    const record = loginAttempts.get(ip);
    if (record && record.count >= MAX_ATTEMPTS && (now - record.lastAttempt) < WINDOW_MS) {
      const remainingMs = WINDOW_MS - (now - record.lastAttempt);
      return NextResponse.json(
        { error: 'Too many login attempts. Try again later.', remainingMs },
        { status: 429 }
      );
    }
    
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }
    
    if (!verifyAdminPassword(password)) {
      // Track failed attempt
      const existing = loginAttempts.get(ip);
      if (existing && (now - existing.lastAttempt) < WINDOW_MS) {
        existing.count++;
        existing.lastAttempt = now;
      } else {
        loginAttempts.set(ip, { count: 1, lastAttempt: now });
      }
      
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    
    // Clear rate limit on success
    loginAttempts.delete(ip);
    
    // Create JWT token
    const token = createAdminToken();
    
    const response = NextResponse.json({ success: true, message: 'Logged in' });
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
