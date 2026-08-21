// ============================================
// BREVO EMAIL API (PROTECTED)
// Send emails through Brevo transactional API
// Requires authentication
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import BrevoClient from '@/lib/brevo';

// Internal server key for server-to-server calls (e.g., cron jobs)
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
    const { type, to, name, data } = body;

    if (!to || !type) {
      return NextResponse.json({ error: 'Recipient email and type are required' }, { status: 400 });
    }

    if (!BrevoClient.account.isConfigured()) {
      return NextResponse.json({ error: 'Brevo API key not configured' }, { status: 500 });
    }

    let result;

    switch (type) {
      case 'welcome':
        result = await BrevoClient.emails.sendWelcome(to, name || 'Friend', data?.accessKey);
        break;

      case 'purchase':
        result = await BrevoClient.emails.sendPurchaseConfirmation(
          to, name || 'Friend',
          data?.productName || 'Identity Recode System',
          data?.accessKey
        );
        break;

      case 'quiz':
        result = await BrevoClient.emails.sendQuizResults(to, name || 'Friend', {
          clarityScore: data?.clarityScore || 0,
          alignmentScore: data?.alignmentScore || 0,
          momentumScore: data?.momentumScore || 0,
        });
        break;

      case 'custom':
        // 'custom' type requires server authorization (not available to regular users)
        if (!serverAuth) {
          return NextResponse.json({ error: 'Unauthorized for custom emails' }, { status: 403 });
        }
        result = await BrevoClient.emails.send({
          to: [{ email: to, name }],
          sender: {
            name: process.env.BREVO_SENDER_NAME || 'Tamkinly',
            email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
          },
          subject: data?.subject || 'Message from Tamkinly',
          htmlContent: data?.htmlContent || data?.content || '',
          textContent: data?.textContent,
          tags: data?.tags || ['transactional'],
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type. Use: welcome, purchase, quiz, or custom' },
          { status: 400 }
        );
    }

    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: result.messageId, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Brevo email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
