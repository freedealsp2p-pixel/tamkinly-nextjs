import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeEmail } from '@/lib/email/service';

// Unsubscribe from email list
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await unsubscribeEmail(email);

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed'
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}

// GET method for one-click unsubscribe links
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.redirect(
        new URL('/unsubscribe?error=missing_email', request.url)
      );
    }

    await unsubscribeEmail(email);

    return NextResponse.redirect(
      new URL('/unsubscribe?success=true', request.url)
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.redirect(
      new URL('/unsubscribe?error=server_error', request.url)
    );
  }
}
