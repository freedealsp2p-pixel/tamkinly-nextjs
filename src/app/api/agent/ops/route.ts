import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email-service';

// ============================================
// TAMKINLY SWARM OPS — Agent Operations API
// v1.0 — 2026-09-30 (Task: SWARM-OPS-20260930)
//
// One secure surface for the external agent swarm (Hermes):
//  GET  ?view=summary     full business heartbeat
//  GET  ?view=customers   recent registrations + access status
//  GET  ?view=expiring    access codes expiring soon (renewal outreach)
//  GET  ?view=emails      email queue failures / pending
//  GET  ?view=coach       recent AI Identity Coach conversations
//  GET  ?view=support     unread contact messages + open support tickets
//  GET  ?view=events      swarm event log (findings, drafts, heartbeats, errors)
//  GET  ?view=health      deep health probe for the bug catcher
//  POST {type:heartbeat|finding|draft|action}   swarm writes its log
//  POST ?action=mark-contact-read   body {id, replied?} — mark a contact message handled
//  POST ?action=digest    daily digest email to admin (cron)
//
// Auth: Bearer AGENT_OPS_TOKEN (agent) | Bearer CRON_API_KEY (digest cron)
// No Prisma schema change: agent_events created lazily via raw SQL.
// ============================================

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const DAY = 86400000;
const iso = (msAgo: number): string => new Date(Date.now() - msAgo).toISOString();

// ---------- agent_events (lazy table) ----------
let tableEnsured = false;

const EVENTS_DDL = [
  `CREATE TABLE IF NOT EXISTS "agent_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'INFO',
    "title" TEXT,
    "payload" TEXT NOT NULL DEFAULT '{}',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE INDEX IF NOT EXISTS "agent_events_type_idx" ON "agent_events"("type")`,
  `CREATE INDEX IF NOT EXISTS "agent_events_createdAt_idx" ON "agent_events"("createdAt")`,
];

async function ensureEventsTable(): Promise<void> {
  if (tableEnsured) return;
  for (const ddl of EVENTS_DDL) {
    await db.$executeRawUnsafe(ddl);
  }
  tableEnsured = true;
}

async function insertEvent(
  type: string,
  title: string,
  payload: Record<string, unknown>,
  severity: string = 'INFO',
  status: string = 'OPEN'
): Promise<string> {
  await ensureEventsTable();
  const id = globalThis.crypto.randomUUID();
  await db.$executeRawUnsafe(
    `INSERT INTO agent_events (id, type, severity, title, payload, status, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    id, type, severity, title.slice(0, 300), JSON.stringify(payload || {}).slice(0, 8000), status
  );
  return id;
}

// ---------- auth ----------
function authorize(request: NextRequest): { agent: boolean; cron: boolean } {
  const header = request.headers.get('authorization') || '';
  const token = header.replace(/^Bearer\s+/i, '').trim();
  const agentTok = process.env.AGENT_OPS_TOKEN || '';
  const cronTok = process.env.CRON_API_KEY || '';
  return {
    agent: agentTok.length > 0 && token === agentTok,
    cron: cronTok.length > 0 && token === cronTok,
  };
}

const num = (v: number | bigint | undefined | null): number => Number(v || 0);

// ---------- views ----------
async function getSummary() {
  const t0 = Date.now();
  await db.$queryRawUnsafe('SELECT 1');
  const dbLatencyMs = Date.now() - t0;
  const now = new Date();

  const [totalUsers, new24h, new7d, active7d, neverLoggedIn] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { createdAt: { gte: new Date(now.getTime() - DAY) } } }),
    db.user.count({ where: { createdAt: { gte: new Date(now.getTime() - 7 * DAY) } } }),
    db.user.count({ where: { lastLoginAt: { gte: new Date(now.getTime() - 7 * DAY) } } }),
    db.user.count({ where: { lastLoginAt: null } }),
  ]);

  const revRows = await db.$queryRawUnsafe<Array<{ c: number | bigint; s: number | bigint }>>(
    `SELECT COUNT(*) as c, COALESCE(SUM(total),0) as s FROM orders WHERE status='COMPLETED' AND paidAt > ?`,
    iso(7 * DAY)
  );
  const [pendingOrders, orders7d] = await Promise.all([
    db.order.count({ where: { status: 'PENDING' } }),
    db.order.count({ where: { createdAt: { gte: new Date(now.getTime() - 7 * DAY) } } }),
  ]);

  const byTier = await db.appAccess.groupBy({ by: ['tier'], _count: { id: true }, where: { isActive: true } });
  const expiringSoon = await db.appAccess.findMany({
    where: { isActive: true, expiresAt: { not: null, gte: now, lte: new Date(now.getTime() + 7 * DAY) } },
    select: { email: true, customerName: true, tier: true, expiresAt: true },
    orderBy: { expiresAt: 'asc' },
    take: 10,
  });
  const expired7d = await db.appAccess.count({
    where: { isActive: true, expiresAt: { not: null, lt: now, gte: new Date(now.getTime() - 7 * DAY) } },
  });

  const pendingRows = await db.$queryRawUnsafe<Array<{ c: number | bigint; m: string | null }>>(
    `SELECT COUNT(*) as c, MIN(scheduledAt) as m FROM email_queue WHERE status IN ('PENDING','QUEUED','SENDING')`
  );
  const failedRows = await db.$queryRawUnsafe<Array<{ c: number | bigint }>>(
    `SELECT COUNT(*) as c FROM email_queue WHERE status='FAILED' AND scheduledAt > ?`,
    iso(7 * DAY)
  );
  const sent24h = await db.emailQueue.count({ where: { status: 'SENT', sentAt: { gte: new Date(now.getTime() - DAY) } } });

  const [coachTotal, coach24h] = await Promise.all([
    db.aICoachConversation.count(),
    db.aICoachConversation.count({ where: { lastMessageAt: { gte: new Date(now.getTime() - DAY) } } }),
  ]);

  const ticketRows = await db.$queryRawUnsafe<Array<{ status: string; c: number | bigint }>>(
    `SELECT status, COUNT(*) as c FROM support_tickets GROUP BY status`
  );
  const openTickets = ticketRows
    .filter((r) => !/RESOL|CLOSE|CANCEL/i.test(String(r.status)))
    .reduce((acc, r) => acc + num(r.c), 0);
  const contactRows = await db.$queryRawUnsafe<Array<{ c: number | bigint }>>(
    `SELECT COUNT(*) as c FROM contact_messages WHERE isRead = 0`
  );

  let openFindings = 0;
  let errors24h = 0;
  try {
    await ensureEventsTable();
    const fRows = await db.$queryRawUnsafe<Array<{ c: number | bigint }>>(
      `SELECT COUNT(*) as c FROM agent_events WHERE type='FINDING' AND status='OPEN'`
    );
    const eRows = await db.$queryRawUnsafe<Array<{ c: number | bigint }>>(
      `SELECT COUNT(*) as c FROM agent_events WHERE type='ERROR' AND createdAt > datetime('now','-1 day')`
    );
    openFindings = num(fRows[0]?.c);
    errors24h = num(eRows[0]?.c);
  } catch {
    /* table may not exist yet */
  }

  const pc = num(pendingRows[0]?.c);
  let oldestPendingMin: number | null = null;
  const rawMin = pendingRows[0]?.m;
  if (pc > 0 && rawMin) {
    const rawStr = String(rawMin);
    const parsed = /^\d+$/.test(rawStr) ? new Date(Number(rawStr)) : new Date(rawStr.replace(' ', 'T'));
    const t = parsed.getTime();
    if (!Number.isNaN(t)) oldestPendingMin = Math.max(0, Math.round((Date.now() - t) / 60000));
  }

  return {
    generatedAt: now.toISOString(),
    dbLatencyMs,
    users: { total: totalUsers, new24h, new7d, active7d, neverLoggedIn },
    revenue: {
      last7dCount: num(revRows[0]?.c),
      last7dTotal: num(revRows[0]?.s),
      pendingOrders,
      orders7d,
    },
    access: {
      activeByTier: byTier.map((t) => ({ tier: t.tier, count: t._count.id })),
      expiringSoon,
      expiredLast7d: expired7d,
    },
    emailEngine: { pending: pc, oldestPendingMin, failed7d: num(failedRows[0]?.c), sent24h },
    coach: { conversationsTotal: coachTotal, activeLast24h: coach24h },
    support: { openTickets, unreadContactMessages: num(contactRows[0]?.c) },
    swarm: { openFindings, serverErrors24h: errors24h },
  };
}

async function getCustomers(limit: number) {
  const users = await db.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: Math.min(Math.max(limit, 1), 100),
    select: {
      email: true,
      name: true,
      locale: true,
      createdAt: true,
      lastLoginAt: true,
      accessCodes: {
        select: { tier: true, isActive: true, expiresAt: true, productName: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
  return users.map((u) => ({
    ...u,
    topTier: u.accessCodes[0]?.tier || 'FREE',
    hasActiveAccess: u.accessCodes.some((c) => c.isActive && (!c.expiresAt || new Date(c.expiresAt) > new Date())),
  }));
}

async function getExpiring(days: number) {
  return db.appAccess.findMany({
    where: { isActive: true, expiresAt: { not: null, lte: new Date(Date.now() + Math.min(Math.max(days, 1), 60) * DAY) } },
    select: { email: true, customerName: true, tier: true, expiresAt: true, productName: true },
    orderBy: { expiresAt: 'asc' },
    take: 50,
  });
}

async function getEmails(status: string | null, limit: number) {
  const where = status
    ? { status: status as 'PENDING' | 'QUEUED' | 'SENDING' | 'SENT' | 'FAILED' | 'CANCELLED' }
    : { status: 'FAILED' as const };
  return db.emailQueue.findMany({
    where,
    orderBy: { scheduledAt: 'desc' },
    take: Math.min(Math.max(limit, 1), 100),
    select: { email: true, subject: true, templateName: true, status: true, error: true, scheduledAt: true, sentAt: true },
  });
}

async function getCoach(limit: number) {
  const convs = await db.aICoachConversation.findMany({
    orderBy: { lastMessageAt: 'desc' },
    take: Math.min(Math.max(limit, 1), 25),
    select: { sessionId: true, messageCount: true, createdAt: true, lastMessageAt: true, messages: true },
  });
  return convs.map((c) => {
    let msgs: Array<{ role: string; content: string }> = [];
    try {
      msgs = JSON.parse(c.messages);
    } catch {
      msgs = [];
    }
    return {
      sessionId: c.sessionId,
      messageCount: c.messageCount,
      createdAt: c.createdAt,
      lastMessageAt: c.lastMessageAt,
      recentMessages: msgs.slice(-6).map((m) => ({ role: m.role, content: String(m.content).slice(0, 600) })),
    };
  });
}

async function getEvents(type: string | null, limit: number) {
  await ensureEventsTable();
  const rows = await db.$queryRawUnsafe<Array<Record<string, unknown>>>(
    type
      ? `SELECT id, type, severity, title, payload, status, createdAt FROM agent_events WHERE type = ? ORDER BY createdAt DESC LIMIT ?`
      : `SELECT id, type, severity, title, payload, status, createdAt FROM agent_events ORDER BY createdAt DESC LIMIT ?`,
    ...(type ? [type, Math.min(Math.max(limit, 1), 200)] : [Math.min(Math.max(limit, 1), 200)])
  );
  return rows.map((r) => {
    let payload: unknown = r.payload;
    try {
      payload = JSON.parse(String(r.payload));
    } catch {
      /* keep raw */
    }
    return { ...r, payload };
  });
}

async function getSupport(limit: number) {
  const [unreadMessages, openTickets] = await Promise.all([
    db.contactMessage.findMany({
      where: { isRead: false },
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 50),
      select: { id: true, name: true, email: true, subject: true, message: true, isRead: true, isReplied: true, createdAt: true },
    }),
    db.supportTicket.findMany({
      where: { status: { notIn: ['RESOLVED', 'CLOSED'] } },
      orderBy: { createdAt: 'desc' },
      take: Math.min(Math.max(limit, 1), 50),
      select: { id: true, ticketNumber: true, email: true, name: true, subject: true, message: true, category: true, priority: true, status: true, createdAt: true, updatedAt: true, firstResponseAt: true },
    }),
  ]);
  return { unreadContactMessages: unreadMessages, openTickets };
}

async function getHealth() {
  const summary = await getSummary();
  const mem = process.memoryUsage();
  return {
    ...summary,
    process: {
      uptimeSec: Math.round(process.uptime()),
      rssMB: Math.round(mem.rss / 1048576),
      heapUsedMB: Math.round(mem.heapUsed / 1048576),
      node: process.version,
    },
    checks: {
      dbReachable: summary.dbLatencyMs < 2000,
      emailQueueFlowing: summary.emailEngine.pending === 0 || (summary.emailEngine.oldestPendingMin ?? 0) < 120,
      noEmailFailureSpike: summary.emailEngine.failed7d < 10,
      noServerErrorSpike: summary.swarm.serverErrors24h < 20,
    },
  };
}

// ---------- daily digest ----------
function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildDigestHtml(s: Record<string, unknown>): string {
  const users = s.users as Record<string, number>;
  const rev = s.revenue as Record<string, number>;
  const access = s.access as { activeByTier: Array<{ tier: string; count: number }>; expiringSoon: Array<{ email: string; tier: string; expiresAt: string | Date }>; expiredLast7d: number };
  const mail = s.emailEngine as Record<string, number | null>;
  const coach = s.coach as Record<string, number>;
  const support = s.support as Record<string, number>;
  const swarm = s.swarm as Record<string, number>;

  const tierLine = access.activeByTier.map((t) => `${t.tier}: ${t.count}`).join(' • ') || 'لا شيء';
  const expLines = access.expiringSoon
    .slice(0, 5)
    .map((e) => `<li style="color:#0F1C2E;">${esc(e.email)} — ${esc(e.tier)} — ينتهي ${esc(String(e.expiresAt).slice(0, 10))}</li>`)
    .join('');

  const row = (label: string, value: string | number, warn = false) =>
    `<tr><td style="padding:8px 12px;color:#8A94A6;border-bottom:1px solid #EEF1F4;">${label}</td>` +
    `<td style="padding:8px 12px;text-align:left;font-weight:700;color:${warn ? '#B04A4A' : '#0F1C2E'};border-bottom:1px solid #EEF1F4;">${value}</td></tr>`;

  const warnings: string[] = [];
  if ((mail.failed7d as number) > 0) warnings.push(`${mail.failed7d} رسالة بريد فشلت خلال 7 أيام`);
  if ((mail.oldestPendingMin as number | null) !== null && (mail.oldestPendingMin as number) > 120) warnings.push(`طابور البريد متأخر ${mail.oldestPendingMin} دقيقة`);
  if ((swarm.serverErrors24h as number) > 5) warnings.push(`${swarm.serverErrors24h} خطأ سيرفر خلال 24 ساعة`);
  if (users.new7d === 0) warnings.push('لا تسجيلات جديدة خلال 7 أيام — يلزم تعزيز قنوات الجذب');

  return `<div dir="rtl" style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:640px;margin:0 auto;background:#F6F8FA;padding:20px;">
  <div style="background:linear-gradient(135deg,#0F1C2E,#1F6F78);border-radius:16px;padding:28px;text-align:center;">
    <h1 style="color:#3DD4B0;margin:0 0 6px;">تقرير السرب اليومي</h1>
    <p style="color:#ffffff;margin:0;font-size:14px;">تمكنلي — ${esc(String(s.generatedAt).slice(0, 16).replace('T', ' '))} UTC</p>
  </div>
  <div style="background:white;border-radius:12px;padding:20px;margin-top:16px;">
    <h2 style="color:#0F1C2E;font-size:16px;margin:0 0 8px;">العملاء والنشاط</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${row('إجمالي المستخدمين', users.total)}
      ${row('تسجيلات 24 ساعة', users.new24h)}
      ${row('تسجيلات 7 أيام', users.new7d, users.new7d === 0)}
      ${row('نشطون آخر 7 أيام', users.active7d)}
      ${row('لم يسجلوا دخولاً إطلاقاً', users.neverLoggedIn)}
    </table>
    <h2 style="color:#0F1C2E;font-size:16px;margin:16px 0 8px;">الإيرادات والاشتراكات</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${row('مكتمل آخر 7 أيام', `$${rev.last7dTotal} (${rev.last7dCount} طلب)`)}
      ${row('طلبات معلقة', rev.pendingOrders, rev.pendingOrders > 0)}
      ${row('أكواد نشطة بالفئة', tierLine)}
      ${row('أكواد انتهت آخر 7 أيام', access.expiredLast7d)}
    </table>
    ${expLines ? `<p style="color:#8A94A6;font-size:13px;margin:10px 0 0;">تنتهي قريباً — فرص تجديد:</p><ul style="color:#0F1C2E;font-size:13px;margin:6px 0;padding-right:18px;">${expLines}</ul>` : ''}
    <h2 style="color:#0F1C2E;font-size:16px;margin:16px 0 8px;">محرك البريد والمدرب والدعم</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${row('بريد مُرسل 24 ساعة', mail.sent24h ?? 0)}
      ${row('بريد معلق الآن', mail.pending ?? 0)}
      ${row('بريد فاشل 7 أيام', mail.failed7d ?? 0, (mail.failed7d as number) > 0)}
      ${row('محادثات المدرب 24 ساعة', coach.activeLast24h)}
      ${row('تذاكر دعم مفتوحة', support.openTickets, support.openTickets > 0)}
      ${row('رسائل تواصل غير مقروءة', support.unreadContactMessages, support.unreadContactMessages > 0)}
      ${row('ملاحظات سرب مفتوحة', swarm.openFindings)}
      ${row('أخطاء سيرفر 24 ساعة', swarm.serverErrors24h, (swarm.serverErrors24h as number) > 5)}
    </table>
    ${warnings.length ? `<div style="background:#F8EEEF;border-right:4px solid #B88A8E;border-radius:8px;padding:12px 16px;margin-top:14px;"><strong style="color:#B04A4A;">تنبيهات:</strong><ul style="margin:6px 0 0;padding-right:18px;color:#0F1C2E;font-size:13px;">${warnings.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></div>` : ''}
    <p style="text-align:center;margin:18px 0 0;"><a href="https://tamkinly.com/admin" style="color:#1F6F78;font-weight:700;">لوحة التحكم</a> • <a href="https://hermes-swarm-ai.tamkinly.com/api/agent/ops?view=summary" style="color:#1F6F78;font-weight:700;">واجهة السرب</a></p>
  </div>
  <p style="text-align:center;color:#8A94A6;font-size:12px;">أُرسل آلياً بواسطة سرب هرمز — تمكنلي</p>
</div>`;
}

async function sendDigest(): Promise<{ success: boolean; sentTo?: string; error?: string }> {
  const summary = (await getSummary()) as unknown as Record<string, unknown>;
  const to = process.env.DIGEST_EMAIL || 'admin@tamkinly.com';
  const result = await sendEmail({
    to,
    subject: 'تمكنلي — تقرير السرب اليومي',
    htmlContent: buildDigestHtml(summary),
    tags: ['swarm-digest'],
  });
  return { success: result.success, sentTo: to, error: result.error };
}

// ---------- handlers ----------
export async function GET(request: NextRequest) {
  const auth = authorize(request);
  if (!auth.agent && !auth.cron) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view') || 'summary';
    const limit = parseInt(searchParams.get('limit') || '20', 10) || 20;

    switch (view) {
      case 'summary':
        return NextResponse.json({ success: true, summary: await getSummary() });
      case 'customers':
        return NextResponse.json({ success: true, customers: await getCustomers(limit) });
      case 'expiring': {
        const days = parseInt(searchParams.get('days') || '7', 10) || 7;
        return NextResponse.json({ success: true, expiring: await getExpiring(days) });
      }
      case 'emails':
        return NextResponse.json({ success: true, emails: await getEmails(searchParams.get('status'), limit) });
      case 'coach':
        return NextResponse.json({ success: true, conversations: await getCoach(limit) });
      case 'events':
        return NextResponse.json({ success: true, events: await getEvents(searchParams.get('type'), limit) });
      case 'support':
        return NextResponse.json({ success: true, support: await getSupport(limit) });
      case 'health':
        return NextResponse.json({ success: true, health: await getHealth() });
      default:
        return NextResponse.json({ success: false, error: `Unknown view: ${view}` }, { status: 400 });
    }
  } catch (error) {
    console.error('[SwarmOps] GET error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auth = authorize(request);
  const { searchParams } = new URL(request.url);

  if (searchParams.get('action') === 'digest') {
    if (!auth.agent && !auth.cron) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    try {
      const result = await sendDigest();
      return NextResponse.json({ ...result });
    } catch (error) {
      console.error('[SwarmOps] digest error:', error);
      return NextResponse.json({ success: false, error: 'Digest failed' }, { status: 500 });
    }
  }

  if (searchParams.get('action') === 'mark-contact-read') {
    if (!auth.agent) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    try {
      const body = await request.json().catch(() => ({}));
      const id = String((body as Record<string, unknown>).id || '');
      if (!id) {
        return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
      }
      const replied = Boolean((body as Record<string, unknown>).replied);
      await db.contactMessage.update({ where: { id }, data: { isRead: true, isReplied: replied } });
      return NextResponse.json({ success: true, id, isRead: true, isReplied: replied });
    } catch (error) {
      console.error('[SwarmOps] mark-contact-read error:', error);
      return NextResponse.json({ success: false, error: 'Message not found or update failed' }, { status: 404 });
    }
  }

  if (!auth.agent) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    const type = String(body.type || '').toUpperCase();
    if (!['HEARTBEAT', 'FINDING', 'DRAFT', 'ACTION'].includes(type)) {
      return NextResponse.json({ success: false, error: 'type must be heartbeat|finding|draft|action' }, { status: 400 });
    }

    const payload = (body.payload as Record<string, unknown>) || {};
    const severity = String(body.severity || 'INFO').toUpperCase();
    const title = String(body.title || type);

    if (type === 'HEARTBEAT') {
      const id = await insertEvent('HEARTBEAT', title, { ...payload, note: 'swarm alive' }, 'INFO', 'CLOSED');
      await db.$executeRawUnsafe(`DELETE FROM agent_events WHERE createdAt < datetime('now','-30 days')`);
      return NextResponse.json({ success: true, id });
    }

    const status = type === 'DRAFT' ? 'PENDING' : 'OPEN';
    const id = await insertEvent(type, title, payload, type === 'FINDING' ? severity : 'INFO', status);
    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error('[SwarmOps] POST error:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
