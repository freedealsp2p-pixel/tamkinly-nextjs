// ============================================
// INDEXNOW KEY VERIFICATION ROUTE
// ============================================
// Serves the IndexNow key file at /{key}.txt
// This is required by IndexNow protocol for ownership verification
// ============================================

import { NextResponse } from 'next/server';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';

// Dynamic route handler — serves /api/indexnow/key (or use a static file)
export async function GET() {
  if (!INDEXNOW_KEY) {
    return NextResponse.json({ error: 'IndexNow not configured' }, { status: 503 });
  }

  // Return key as plain text (per IndexNow protocol)
  return new NextResponse(INDEXNOW_KEY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
