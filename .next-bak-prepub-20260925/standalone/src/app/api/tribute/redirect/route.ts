// ============================================
// TRIBUTE REDIRECT ROUTE (Updated for subscriptions)
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getPaymentLink, TIER_CONFIG } from '@/lib/tribute';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const tier = url.searchParams.get('tier') as 'basic' | 'premium' | 'mastery' | null;
  
  if (!tier || !TIER_CONFIG[tier]) {
    return NextResponse.json(
      { error: 'Invalid tier. Must be: basic, premium, or mastery' },
      { status: 400 }
    );
  }
  
  const link = getPaymentLink(tier);
  
  if (!link.configured) {
    return NextResponse.json({
      error: 'Tribute not configured',
      message: `Please set ${TIER_CONFIG[tier].subscriptionIdEnv} in environment variables`,
      instructions: 'Create a subscription in Tribute bot and add its ID to .env',
    }, { status: 503 });
  }
  
  // Redirect to Tribute web payment page
  return NextResponse.redirect(link.webLink!, 302);
}
