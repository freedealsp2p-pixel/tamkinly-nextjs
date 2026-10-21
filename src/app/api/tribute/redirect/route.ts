// ============================================
// TRIBUTE REDIRECT ROUTE (PRICING MODEL V2, 2026-10-21)
// One-time products first: ?product=planner|mastery
// Legacy subscriptions still honored: ?tier=basic|premium|mastery
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { getPaymentLink, TIER_CONFIG, getOneTimePaymentLink } from '@/lib/tribute';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  // --------------------------------------------
  // V2: one-time products (?product=planner|mastery)
  // --------------------------------------------
  const product = url.searchParams.get('product') as 'planner' | 'mastery' | null;
  if (product) {
    if (product !== 'planner' && product !== 'mastery') {
      return NextResponse.json(
        { error: 'Invalid product. Must be: planner or mastery' },
        { status: 400 }
      );
    }
    const link = getOneTimePaymentLink(product);
    if (!link.configured) {
      return NextResponse.json({
        error: 'Tribute one-time product not configured',
        message: `Please set ${product === 'planner' ? 'TRIBUTE_LINK_PLANNER (+ _WEB)' : 'TRIBUTE_LINK_MASTERY (+ _WEB)'} in environment variables`,
        instructions: 'Create the one-time product in the Tribute dashboard, then add its payment links to .env',
      }, { status: 503 });
    }
    // Redirect to Tribute web payment page
    return NextResponse.redirect(link.webLink || link.telegramLink!, 302);
  }

  // --------------------------------------------
  // LEGACY: monthly subscriptions (?tier=basic|premium|mastery)
  // Kept for existing subscribers — no longer sold to new users (V2).
  // --------------------------------------------
  const tier = url.searchParams.get('tier') as 'basic' | 'premium' | 'mastery' | null;

  if (!tier || !TIER_CONFIG[tier]) {
    return NextResponse.json(
      { error: 'Invalid tier. Use ?product=planner|mastery (one-time) or ?tier=basic|premium|mastery (legacy)' },
      { status: 400 }
    );
  }

  // --------------------------------------------
  // V2 BRIDGE (2026-10-22): the site's checkout buttons call
  // ?tier=premium|mastery (LOCAL_PRODUCTS ids 'premium'/'mastery'). Under
  // PRICING MODEL V2 those map to the ONE-TIME products (planner $9.99 /
  // mastery $27) — legacy monthly plans are no longer sold. Serve the live
  // Tribute product link FIRST (TRIBUTE_LIVE_LINKS defaults, env override);
  // fall back to the legacy subscription link only if the product link is
  // somehow unavailable.
  // --------------------------------------------
  if (tier === 'premium' || tier === 'mastery') {
    const productKey = tier === 'premium' ? 'planner' : 'mastery';
    const v2Link = getOneTimePaymentLink(productKey);
    if (v2Link.configured && (v2Link.webLink || v2Link.telegramLink)) {
      return NextResponse.redirect(v2Link.webLink || v2Link.telegramLink!, 302);
    }
    // fall through to legacy subscription handling below
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
