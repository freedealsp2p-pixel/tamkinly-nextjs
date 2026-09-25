import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth-jwt';
import { grantProtocolAccess, PROTOCOL_PRODUCTS, type ProtocolSlug } from '@/lib/protocol-access';
import { BrevoEmails } from '@/lib/brevo';

// ============================================
// TRIBUTE PROTOCOL PURCHASES (admin)
// ============================================
// Digital product purchases arrive via the Tribute webhook and are stored as
// Orders with paymentId = "tribute_prod_<purchaseId>". Tribute does not share
// the buyer's email, so the protocol entitlement stays PENDING_EMAIL until an
// admin redeems it here for the buyer's email address.
// ============================================

interface ParsedNotes {
  purchaseId?: number;
  productId?: number | null;
  productName?: string | null;
  telegramUserId?: number | null;
  telegramUsername?: string | null;
  trbUserId?: string | null;
  protocolSlug?: string | null;
  grant?: string;
  redeemedEmail?: string;
  redeemedAt?: string;
}

function parseNotes(notes: string | null): ParsedNotes {
  if (!notes) return {};
  try {
    return JSON.parse(notes) as ParsedNotes;
  } catch {
    return {};
  }
}

// GET — list Tribute digital product purchases (newest first)
export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orders = await db.order.findMany({
      where: { paymentId: { startsWith: 'tribute_prod_' } },
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { items: true },
    });

    const deliveries = await db.appAccess.findMany({
      where: { orderId: { in: orders.map((o) => o.id) } },
      select: { id: true, code: true, email: true, protocolSlug: true, orderId: true, isActive: true, isUsed: true },
    });

    const purchases = orders.map((order) => {
      const notes = parseNotes(order.notes);
      const delivery = deliveries.find((d) => d.orderId === order.id) || null;
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.total,
        currency: order.currency,
        createdAt: order.createdAt,
        purchaseId: notes.purchaseId ?? null,
        productId: notes.productId ?? null,
        productName: order.items[0]?.productName || notes.productName || null,
        protocolSlug: notes.protocolSlug ?? null,
        telegramUserId: notes.telegramUserId ?? null,
        telegramUsername: notes.telegramUsername ?? null,
        trbUserId: notes.trbUserId ?? null,
        grant: delivery ? 'REDEEMED' : notes.grant || 'UNKNOWN',
        delivery: delivery
          ? { code: delivery.code, email: delivery.email, isActive: delivery.isActive, isUsed: delivery.isUsed }
          : null,
      };
    });

    return NextResponse.json({ purchases });
  } catch (error) {
    console.error('List tribute purchases error:', error);
    return NextResponse.json({ error: 'Failed to list purchases' }, { status: 500 });
  }
}

// POST — redeem a purchase for a buyer's email (grants protocol access + emails the code)
export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const orderId: string = body.orderId;
    const email: string = (body.email || '').trim().toLowerCase();
    const customerName: string | undefined = body.customerName || undefined;

    if (!orderId || !email) {
      return NextResponse.json({ error: 'orderId and email are required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!order || !order.paymentId?.startsWith('tribute_prod_')) {
      return NextResponse.json({ error: 'Tribute purchase not found' }, { status: 404 });
    }

    const notes = parseNotes(order.notes);
    const protocolSlug = notes.protocolSlug;
    if (!protocolSlug || !(protocolSlug in PROTOCOL_PRODUCTS)) {
      return NextResponse.json(
        { error: 'This purchase is not mapped to a protocol (check TRIBUTE_PRODUCT_* env vars)' },
        { status: 409 }
      );
    }

    // Already redeemed?
    const existingDelivery = await db.appAccess.findFirst({ where: { orderId: order.id } });
    if (existingDelivery) {
      return NextResponse.json({
        success: true,
        alreadyRedeemed: true,
        code: existingDelivery.code,
        email: existingDelivery.email,
        protocolSlug,
      });
    }

    // Grant the protocol entitlement
    const result = await grantProtocolAccess({
      email,
      protocolSlug: protocolSlug as ProtocolSlug,
      customerName: customerName || notes.telegramUsername || undefined,
      adminNote: `Tribute purchase ${notes.purchaseId ?? order.orderNumber}`,
    });

    if (!result.success || !result.code) {
      return NextResponse.json({ error: result.error || 'Failed to grant access' }, { status: 409 });
    }

    // Link the access record to the order + update order notes
    await db.appAccess.update({
      where: { code: result.code },
      data: { orderId: order.id },
    });

    const updatedNotes: ParsedNotes = {
      ...notes,
      grant: 'REDEEMED',
      redeemedEmail: email,
      redeemedAt: new Date().toISOString(),
    };
    await db.order.update({
      where: { id: order.id },
      data: { notes: JSON.stringify(updatedNotes) },
    });

    // Best-effort: email the access code (failure does not fail the grant)
    const product = PROTOCOL_PRODUCTS[protocolSlug as ProtocolSlug];
    let emailSent = false;
    try {
      const title = product.title.en;
      const html = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0F1C2E;">
          <h2 style="margin:0 0 8px;">🤍 Tamkinly — ${title}</h2>
          <p style="margin:0 0 16px;color:#475569;">Thank you for your purchase. Your personal access code is:</p>
          <div style="font-size:28px;font-weight:bold;letter-spacing:2px;background:#F5F9F8;border:1px solid #D8E6E4;border-radius:12px;padding:16px;text-align:center;">${result.code}</div>
          <p style="margin:16px 0 4px;"><b>How to activate:</b></p>
          <ol style="margin:0 0 16px;color:#475569;padding-left:20px;">
            <li>Open <a href="https://tamkinly.com/apps/therapeutic-protocols/${protocolSlug}">tamkinly.com — ${title}</a></li>
            <li>Click <i>Purchase</i>, then choose <i>"I have an access code"</i></li>
            <li>Enter the code above — lifetime access begins</li>
          </ol>
          <p style="margin:0;color:#94A3B8;font-size:12px;">This experience is designed for personal growth and psychological exploration. It does not replace professional mental health care.</p>
        </div>`;
      const sendResult = await BrevoEmails.send({
        to: [{ email }],
        subject: `Your Tamkinly access code — ${title}`,
        htmlContent: html,
        tags: ['tribute', 'protocol-access-code'],
      } as any);
      emailSent = !!sendResult.success;
      if (!emailSent) {
        console.error('Tribute redemption email failed:', sendResult.error);
      }
    } catch (mailError) {
      console.error('Tribute redemption email error:', mailError);
    }

    console.log('Tribute purchase redeemed:', {
      purchaseId: notes.purchaseId,
      orderId: order.id,
      protocolSlug,
      email,
      code: result.code,
      emailSent,
    });

    return NextResponse.json({
      success: true,
      code: result.code,
      email,
      protocolSlug,
      emailSent,
    });
  } catch (error) {
    console.error('Redeem tribute purchase error:', error);
    return NextResponse.json({ error: 'Failed to redeem purchase' }, { status: 500 });
  }
}
