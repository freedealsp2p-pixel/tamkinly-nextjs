import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth-jwt';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({ authenticated: true, role: session.role });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
