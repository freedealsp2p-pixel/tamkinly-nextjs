// ============================================
// BREVO CONTACT API (PROTECTED)
// Add/Update contacts in Brevo for email sequences
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import BrevoClient, { BREVO_LISTS } from '@/lib/brevo';

function isServerAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronKey = process.env.CRON_API_KEY;
  if (!cronKey || !authHeader) return false;
  const providedKey = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  return providedKey === cronKey;
}

export async function POST(request: NextRequest) {
  try {
    // Require either user session or server authorization
    const session = await getServerSession(authOptions);
    const serverAuth = isServerAuthorized(request);

    if (!session?.user?.id && !serverAuth) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { email, name, type, accessKey, quizScore, listIds } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!BrevoClient.account.isConfigured()) {
      return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 500 });
    }

    const targetLists = listIds || [BREVO_LISTS.ALL_CONTACTS];
    
    if (type === 'trial') {
      targetLists.push(BREVO_LISTS.TRIAL_USERS);
      targetLists.push(BREVO_LISTS.CUSTOMERS);
    } else if (type === 'planner' || type === 'premium' || type === 'bundle') {
      targetLists.push(BREVO_LISTS.CUSTOMERS);
    } else if (type === 'quiz') {
      targetLists.push(BREVO_LISTS.QUIZ_TAKERS);
    }

    const attributes: Record<string, string | number | undefined> = {};
    
    if (name) {
      const nameParts = name.split(' ');
      attributes.FIRSTNAME = nameParts[0];
      attributes.NAME = name;
      if (nameParts.length > 1) {
        attributes.LASTNAME = nameParts.slice(1).join(' ');
      }
    }
    
    if (type) { attributes.CUSTOMER_TYPE = type; }
    if (accessKey) { attributes.ACCESS_KEY = accessKey; }
    if (quizScore !== undefined) { attributes.QUIZ_SCORE = quizScore; }
    attributes.LAST_ACTIVITY = new Date().toISOString().split('T')[0];

    const result = await BrevoClient.contacts.upsert({
      email,
      attributes,
      listIds: [...new Set(targetLists)],
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to create contact' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.id, message: 'Contact added to Brevo successfully' });
  } catch (error) {
    console.error('Brevo contact error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const serverAuth = isServerAuthorized(request);

    if (!session?.user?.id && !serverAuth) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    if (!BrevoClient.account.isConfigured()) {
      return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 500 });
    }

    const contact = await BrevoClient.contacts.get(email);

    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error('Brevo contact lookup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
