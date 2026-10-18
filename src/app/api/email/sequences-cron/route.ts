import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { scheduleBrevoSequence } from '@/lib/email/service';
import { type SeqTemplateKey } from '@/lib/brevo';

// ============================================
// V3 SEQUENCES CRON (2026-09-30)
// Enqueues Brevo-template sequences for:
//   - PROTOCOL purchases  -> protocol welcome + 9 daily companions
//   - PLAN purchases      -> nudges D1/D3/D7 + 20 app activations (23 days)
//   - RECOVERY grants     -> one recovery file per day (TRC 12 / REC 11)
//   - new free users      -> free apps tour (5 days)
// Idempotent: existing email_queue rows (email, sequenceId, stepNumber) are skipped.
// Protected by CRON_API_KEY (Bearer).
// ============================================

const TRC_KEYS: SeqTemplateKey[] = ['RECOVERY_TRC_01','RECOVERY_TRC_02','RECOVERY_TRC_03','RECOVERY_TRC_04','RECOVERY_TRC_05','RECOVERY_TRC_06','RECOVERY_TRC_07','RECOVERY_TRC_08','RECOVERY_TRC_09','RECOVERY_TRC_10','RECOVERY_TRC_11','RECOVERY_TRC_12'];
const REC_KEYS: SeqTemplateKey[] = ['RECOVERY_REC_01','RECOVERY_REC_02','RECOVERY_REC_03','RECOVERY_REC_04','RECOVERY_REC_05','RECOVERY_REC_06','RECOVERY_REC_07','RECOVERY_REC_08','RECOVERY_REC_09','RECOVERY_REC_10','RECOVERY_REC_11'];

const PLAN_STEPS: { key: SeqTemplateKey; dh: number }[] = [
  { key: 'NUDGE_1', dh: 24 },
  { key: 'APP_IDENTITY_BASELINE', dh: 48 },
  { key: 'NUDGE_3', dh: 72 },
  { key: 'APP_EXECUTIVE_MANUAL', dh: 96 },
  { key: 'APP_DAILY_PLANNER', dh: 120 },
  { key: 'APP_JOURNAL_SYSTEM', dh: 144 },
  { key: 'NUDGE_7', dh: 168 },
  { key: 'APP_GOAL_SYSTEM', dh: 192 },
  { key: 'APP_HABIT_TRACKER', dh: 216 },
  { key: 'APP_DAILY_REFLECTION', dh: 240 },
  { key: 'APP_ENVIRONMENTAL_AUDIT', dh: 264 },
  { key: 'APP_DECISION_ANALYSIS', dh: 288 },
  { key: 'APP_EVIDENCE_TRACKING', dh: 312 },
  { key: 'APP_PROGRESS_DASHBOARD', dh: 336 },
  { key: 'APP_IDENTITY_RECODE', dh: 360 },
  { key: 'APP_WORKSHEETS', dh: 384 },
  { key: 'APP_EMOTION_REGULATION', dh: 408 },
  { key: 'APP_COMMUNITY', dh: 432 },
  { key: 'APP_PRIORITY_SUPPORT', dh: 456 },
  { key: 'APP_AI_COACH', dh: 480 },
  { key: 'APP_VALUES', dh: 504 },
  { key: 'APP_TRIAL_PLANNER', dh: 528 },
  { key: 'APP_QUIZ', dh: 552 },
];

const FREE_KEYS: SeqTemplateKey[] = ['APP_QUIZ', 'APP_VALUES', 'APP_DAILY_REFLECTION', 'APP_HABIT_TRACKER', 'APP_TRIAL_PLANNER'];

async function resolveLocale(email: string): Promise<string> {
  try {
    const u = await db.user.findUnique({ where: { email } } as any);
    return (u as any)?.locale === 'en' ? 'en' : 'ar';
  } catch {
    return 'ar';
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.CRON_API_KEY;
    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const sinceAccess = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
    const sinceUsers = new Date(now.getTime() - 14 * 24 * 3600 * 1000);
    let enqueued = 0;
    const touched: string[] = [];

    // 1) AppAccess-driven sequences
    const accesses = await (db as any).appAccess.findMany({
      where: { isActive: true, createdAt: { gte: sinceAccess } },
    });

    for (const acc of accesses) {
      try {
        const locale = await resolveLocale(acc.email);
        const name = acc.customerName || acc.email.split('@')[0];
        const createdAt = new Date(acc.createdAt);
        let steps: { key: SeqTemplateKey; dh: number }[] = [];

        if (acc.tier === 'PROTOCOL') {
          const wkey: SeqTemplateKey = acc.protocolSlug === 'temporal-decoupling' ? 'PROTO_TD'
            : acc.protocolSlug === 'alternative-code' ? 'PROTO_AC' : 'PROTO_WM';
          steps = [{ key: wkey, dh: 2 }]
            .concat(Array.from({ length: 9 }, (_, i) => ({ key: `PROTO_DAY_${i + 1}` as SeqTemplateKey, dh: 24 * (i + 1) + 2 })));
        } else if (['BASIC', 'PREMIUM', 'MASTERY'].includes(acc.tier)) {
          steps = PLAN_STEPS;
        } else if (acc.tier === 'TRIAL') {
          steps = FREE_KEYS.map((k, i) => ({ key: k, dh: 24 * (i + 1) }));
        }

        if (!steps.length) {
          const pn = (acc.productName || '').toLowerCase();
          if (/trauma|trc|صدم/.test(pn)) steps = TRC_KEYS.map((k, i) => ({ key: k, dh: 24 * (i + 1) }));
          else if (/porn|recovery|تعافي/.test(pn)) steps = REC_KEYS.map((k, i) => ({ key: k, dh: 24 * (i + 1) }));
        }
        if (!steps.length) continue;

        const n = await scheduleBrevoSequence({
          email: acc.email,
          name,
          locale,
          createdAt,
          sequenceId: `v3_${String(acc.tier).toLowerCase()}_${String(acc.id).slice(-8)}`,
          steps: steps.map(s => ({ key: s.key, delayHours: s.dh })),
        });
        if (n > 0) { enqueued += n; touched.push(`${acc.tier}:${acc.email}:+${n}`); }
      } catch (rowErr) {
        console.error('sequence row error (appAccess):', rowErr);
      }
    }

    // 2) Recent free users without access records
    try {
      const users = await db.user.findMany({ where: { createdAt: { gte: sinceUsers } } } as any);
      const hasAccess = new Set(accesses.map((a: any) => String(a.email || '').toLowerCase()));
      for (const u of users) {
        if (hasAccess.has(String(u.email || '').toLowerCase())) continue;
        const locale = (u as any).locale === 'en' ? 'en' : 'ar';
        const n = await scheduleBrevoSequence({
          email: u.email,
          name: u.name || u.email.split('@')[0],
          locale,
          createdAt: new Date(u.createdAt),
          sequenceId: `v3_free_${String(u.id).slice(-8)}`,
          steps: FREE_KEYS.map((k, i) => ({ key: k, delayHours: 24 * (i + 1) })),
        });
        if (n > 0) { enqueued += n; touched.push(`free:${u.email}:+${n}`); }
      }
    } catch (uErr) {
      console.error('sequence rows error (users):', uErr);
    }

    return NextResponse.json({ success: true, enqueued, touched });
  } catch (error) {
    console.error('sequences-cron error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
