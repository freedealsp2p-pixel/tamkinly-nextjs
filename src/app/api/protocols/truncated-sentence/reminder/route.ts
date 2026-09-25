import { NextRequest, NextResponse } from 'next/server';
import { applySecurity, API_RATE_LIMIT } from '@/lib/security';
import { queueEmail } from '@/lib/email/service';

/**
 * Truncated Sentence — night-3 reminder (FREE exercise).
 *
 * Queues a scheduled reminder email via the existing EmailQueue + cron
 * (every 5 minutes) + Brevo pipeline. Server-authoritative scheduling:
 * scheduledAt = clamp(startedAt + 72h, now, now + 72h).
 */

const RITUAL_MS = 72 * 60 * 60 * 1000;
const TEMPLATE_TAG = 'tsq-night3-reminder';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function buildEmail(locale: string): { subject: string; html: string } {
  const isAr = locale === 'ar';
  const url = isAr
    ? 'https://tamkinly.com/ar/apps/therapeutic-protocols/truncated-sentence'
    : 'https://tamkinly.com/apps/therapeutic-protocols/truncated-sentence';

  if (isAr) {
    const subject = 'ليلة اليوم الثالث قد حانت — ورقتك بانتظارك';
    const html = `
      <div style="font-family:Tahoma,Arial,sans-serif;direction:rtl;text-align:right;background:#F5F9F8;padding:32px 16px;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e2e8f0;">
          <p style="color:#1F6F78;font-size:13px;font-weight:bold;margin:0 0 12px;">تمكينلي · تقنية الجملة المبتورة</p>
          <h1 style="color:#0F1C2E;font-size:22px;margin:0 0 16px;">ليلة اليوم الثالث قد حانت</h1>
          <p style="color:#334155;font-size:15px;line-height:1.9;margin:0 0 16px;">
            مرت الأيام الثلاثة، وورقتك التي انحلّت في الكوب بانتظار الختام.
            استخدم ماء الكوب لرسم علامة (+) على جبينك، ثم تخلّص من الورقة والماء معاً.
          </p>
          <p style="margin:0 0 24px;">
            <a href="${url}" style="display:inline-block;background:#3DD4B0;color:#0F1C2E;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:12px;font-size:15px;">أكمل الطقس الختامي</a>
          </p>
          <p style="color:#94a3b8;font-size:12px;line-height:1.8;margin:0;">
            هذا تذكير من تمكينلي لتقنية الجملة المبتورة — أداة للنمو الشخصي ولا تُغني عن الرعاية النفسية المتخصصة.
          </p>
        </div>
      </div>`;
    return { subject, html };
  }

  const subject = 'Night of the third day has arrived — your paper is waiting';
  const html = `
    <div style="font-family:Arial,sans-serif;background:#F5F9F8;padding:32px 16px;">
      <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e2e8f0;">
        <p style="color:#1F6F78;font-size:13px;font-weight:bold;margin:0 0 12px;">Tamkinly · The Truncated Sentence Technique</p>
        <h1 style="color:#0F1C2E;font-size:22px;margin:0 0 16px;">Night of the third day has arrived</h1>
        <p style="color:#334155;font-size:15px;line-height:1.9;margin:0 0 16px;">
          The three days have passed, and the paper dissolving in your cup is waiting for its closing.
          Use the cup's water to draw a (+) mark on your forehead, then discard the paper and the water together.
        </p>
        <p style="margin:0 0 24px;">
          <a href="${url}" style="display:inline-block;background:#3DD4B0;color:#0F1C2E;text-decoration:none;font-weight:bold;padding:12px 28px;border-radius:12px;font-size:15px;">Complete the closing ritual</a>
        </p>
        <p style="color:#94a3b8;font-size:12px;line-height:1.8;margin:0;">
          This is a reminder from Tamkinly for the Truncated Sentence Technique — a personal growth tool, not a substitute for professional mental health care.
        </p>
      </div>
    </div>`;
  return { subject, html };
}

export async function POST(request: NextRequest) {
  try {
    const securityBlocked = await applySecurity(request, API_RATE_LIMIT);
    if (securityBlocked) return securityBlocked;

    let body: { email?: string; locale?: string; startedAt?: number };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 });
    }

    const email = (body.email || '').trim().toLowerCase();
    const locale = body.locale === 'ar' ? 'ar' : 'en';
    const startedAt = typeof body.startedAt === 'number' && body.startedAt > 0 ? body.startedAt : Date.now();

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
    }

    // Server-authoritative schedule: startedAt + 72h, clamped to [now, now + 72h]
    const now = Date.now();
    const requested = startedAt + RITUAL_MS;
    const scheduledMs = Math.min(Math.max(requested, now), now + RITUAL_MS);
    const scheduledAt = new Date(scheduledMs);

    // Idempotency: skip duplicate PENDING reminders for the same address
    try {
      const { db } = await import('@/lib/db');
      const existing = await db.emailQueue.findFirst({
        where: { email, templateName: TEMPLATE_TAG, status: 'PENDING' },
        select: { id: true },
      });
      if (existing) {
        return NextResponse.json({ ok: true, duplicate: true });
      }
    } catch {
      // DB check failure should not block queuing
    }

    const { subject, html } = buildEmail(locale);

    await queueEmail({
      email,
      subject,
      content: html,
      templateName: TEMPLATE_TAG,
      scheduledAt,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Truncated sentence reminder error:', error);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: 'method_not_allowed' }, { status: 405 });
}
