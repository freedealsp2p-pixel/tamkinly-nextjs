// ============================================
// BREVO EMAIL API
// Send emails through Brevo transactional API
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import BrevoClient from '@/lib/brevo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, to, name, data } = body;

    // Validate required fields
    if (!to || !type) {
      return NextResponse.json(
        { error: 'Recipient email and type are required' },
        { status: 400 }
      );
    }

    // Check if Brevo is configured
    if (!BrevoClient.account.isConfigured()) {
      return NextResponse.json(
        { error: 'Brevo API key not configured' },
        { status: 500 }
      );
    }

    let result;

    switch (type) {
      case 'welcome':
        result = await BrevoClient.emails.sendWelcome(to, name || 'Friend', data?.accessKey);
        break;

      case 'purchase':
        result = await BrevoClient.emails.sendPurchaseConfirmation(
          to,
          name || 'Friend',
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
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Brevo email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
