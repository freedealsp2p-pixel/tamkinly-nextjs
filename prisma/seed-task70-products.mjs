/**
 * TASK70 (AUD-1, 2026-10-25) — Guarded V2 sync of the `products` table.
 *
 * WHY: the DB products table is a cache of src/lib/products.ts (LOCAL_PRODUCTS,
 * PRICING MODEL V2 — one-time payments). ProductsService.syncToDatabase() was
 * never invoked since V2 (2026-10-21), so the cache still holds the retired
 * monthly rows: trial='Basic (Monthly)' $7, planner='Premium (Monthly)' $17,
 * premium='Mastery (Monthly)' $27.
 *
 * WHAT (mirrors syncToDatabase semantics exactly — id 'premium' = Planner,
 * id 'mastery' = Mastery, id 'basic' = legacy Basic — plus AR enrichment and
 * explicit retirement of the two stale rows syncToDatabase never touches):
 *   1. upsert id='premium'  → Identity Recode Planner $9.99 one-time (PREMIUM tier)
 *   2. upsert id='mastery'  → Mastery $27 one-time (MASTERY tier)
 *   3. upsert id='basic'    → legacy Basic, isActive=false (D2: subscribers keep access)
 *   4. update id='trial'    → retired pointer row  (GUARD: only if name='Basic (Monthly)')
 *   5. update id='planner'  → retired pointer row  (GUARD: only if name='Premium (Monthly)')
 *
 * SAFETY: type map mirrors DB_TYPE_MAP (ONE_TIME→BUNDLE, DB enum has no ONE_TIME).
 * Guards: never touches rows that diverged from the expected stale snapshot —
 * logs and skips instead. Full DB backup is taken by deploy.yml before this runs.
 * Image fields stay null — covers pending DOWNLOAD_CUTOVER §3 (slots ready).
 *
 * Run: node prisma/seed-task70-products.mjs   (idempotent — second run = no-op)
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(here, '..');

// Resolve DATABASE_URL exactly like the app does (process.env, then .env files).
if (!process.env.DATABASE_URL) {
  for (const f of ['.env', '.env.local']) {
    const p = join(projectRoot, f);
    if (existsSync(p)) {
      const m = readFileSync(p, 'utf8').match(/^DATABASE_URL\s*=\s*"?([^"\r\n]*)"?\s*$/m);
      if (m && m[1].trim()) {
        process.env.DATABASE_URL = m[1].trim();
        console.log(`[TASK70-DB] DATABASE_URL loaded from ${f}`);
        break;
      }
    }
  }
}
if (!process.env.DATABASE_URL) {
  console.log('[TASK70-DB] no DATABASE_URL found — nothing to do (non-fatal).');
  process.exit(0);
}

const { PrismaClient } = await import('@prisma/client');
const db = new PrismaClient();

// ---- V2 content (mirror of src/lib/products.ts @ 2026-10-25 + AR enrichment) ----
const PLANNER_FEATURES_EN = [
  '7-Day Guided Discipline Journey',
  '30-Day Identity Planner',
  'Daily identity prompts',
  'Executive Manual',
  'Identity Baseline Worksheet',
  'Identity Reset Checklist — weekly cycle tool with Failure Recovery Protocol (printable, reuse indefinitely)',
  'All core interactive apps',
  'Digital + Print PDFs',
  'Decision Pattern Analysis',
  'Evidence tracking',
  'Progress dashboard',
  'Lifetime access — pay once, keep it forever',
];
const PLANNER_FEATURES_AR = [
  'رحلة الانضباط الموجهة 7 أيام',
  'مخطط الهوية 30 يومًا',
  'موجهات هوية يومية',
  'الدليل التنفيذي',
  'ورقة أساس الهوية',
  'قائمة إعادة ضبط الهوية — أداة دورة أسبوعية مع بروتوكول التعافي من الفشل (قابلة للطباعة وإعادة الاستخدام بلا حدود)',
  'كل التطبيقات التفاعلية الأساسية',
  'ملفات PDF رقمية + للطباعة',
  'تحليل أنماط القرار',
  'تتبع الأدلة',
  'لوحة التقدم',
  'وصول دائم — ادفع مرة واحدة واحتفظ به للأبد',
];
const MASTERY_FEATURES_EN = [
  'Everything in the Identity Recode Planner',
  'All Interactive Apps',
  'AI Identity Coach',
  'Transformation Community',
  'Priority Support',
  'Emotion Regulation Toolkit',
  'Lifetime access — pay once, keep it forever',
];
const MASTERY_FEATURES_AR = [
  'كل ما في مخطط إعادة صياغة الهوية',
  'كل التطبيقات التفاعلية',
  'مدرب الهوية الذكي (AI)',
  'مجتمع التحول',
  'الدعم ذو الأولوية',
  'أدوات تنظيم العواطف',
  'وصول دائم — ادفع مرة واحدة واحتفظ به للأبد',
];

const V2_ROWS = [
  {
    id: 'premium', // mirrors LOCAL_PRODUCTS[0] — the Identity Recode Planner
    name: 'Identity Recode Planner',
    nameAr: 'مخطط إعادة صياغة الهوية — The Planner',
    slug: 'premium',
    price: 9.99,
    comparePrice: 17, // anchor: old Premium $17/mo crossed out (founder decision #3)
    description:
      'The complete Identity Recode Planner: the 7-day discipline reset PLUS the 30-day transformation system, all interactive apps of both former plans, and every PDF download — in one single payment. Based on evidence-based psychology and identity science.',
    descriptionAr:
      'مخطط إعادة صياغة الهوية الكامل: إعادة الضبط الانضباطية لسبعة أيام + نظام التحول لثلاثين يومًا + كل التطبيقات التفاعلية للحزمتين السابقتين + كل ملفات PDF — في دفعة واحدة. مبني على علم النفس القائم على الأدلة وعلم الهوية.',
    shortDesc: '7-day reset + 30-day transformation + all apps — one payment',
    category: 'planner',
    type: 'BUNDLE', // DB enum has no ONE_TIME — same mapping as DB_TYPE_MAP
    accessTier: 'PREMIUM',
    features: JSON.stringify(PLANNER_FEATURES_EN),
    featuresAr: JSON.stringify(PLANNER_FEATURES_AR),
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'mastery', // mirrors LOCAL_PRODUCTS[1]
    name: 'Mastery',
    nameAr: 'إتقان — Mastery',
    slug: 'mastery',
    price: 27,
    comparePrice: null,
    description:
      'The ultimate one-time package: everything in the Identity Recode Planner plus ALL interactive apps, AI coaching, community access and priority support. Best value for committed individuals ready for total transformation.',
    descriptionAr:
      'الباقة النهائية بدفعة واحدة: كل ما في مخطط إعادة صياغة الهوية + كل التطبيقات التفاعلية + تدريب AI + مجتمع التحول + الدعم ذو الأولوية. أفضل قيمة لمن مستعد لتحول كامل.',
    shortDesc: 'Everything + AI Coach + Community — one payment',
    category: 'mastery',
    type: 'BUNDLE',
    accessTier: 'MASTERY',
    features: JSON.stringify(MASTERY_FEATURES_EN),
    featuresAr: JSON.stringify(MASTERY_FEATURES_AR),
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'basic', // mirrors LOCAL_PRODUCTS[2] — legacy, not sold, still resolvable
    name: 'Basic',
    nameAr: 'أساسي (قديم)',
    slug: 'basic',
    price: 7,
    comparePrice: null,
    description:
      'Legacy monthly plan — no longer available for new purchases. Existing Basic subscribers keep full access. New users: get the Identity Recode Planner ($9.99 one-time) which includes everything Basic had and much more.',
    descriptionAr:
      'خطة شهرية قديمة — غير متاحة للمشترين الجدد. المشتركون الحاليون يحتفظون بوصولهم الكامل. للمستخدمين الجدد: مخطط إعادة صياغة الهوية (9.99$ دفعة واحدة) يشمل كل ما في الأساسية وأكثر.',
    shortDesc: 'Legacy plan — replaced by the Identity Recode Planner',
    category: 'legacy',
    type: 'BUNDLE',
    accessTier: 'BASIC',
    features: JSON.stringify([
      'Legacy monthly plan (no longer sold)',
      'Existing subscribers keep access',
      'Upgrade to the Identity Recode Planner for the full system',
    ]),
    featuresAr: null,
    isActive: false,
    isFeatured: false,
  },
];

// Stale-row retirement pointers (guarded — only exact legacy snapshots are touched)
const RETIRE = [
  {
    id: 'trial',
    expect: { name: 'Basic (Monthly)', price: 7.0 },
    name: 'Legacy 7-Day Trial (retired — merged into the Identity Recode Planner)',
    nameAr: 'تجربة 7 أيام القديمة (أُوقفت — دُمجت في مخطط إعادة صياغة الهوية)',
    description:
      'Retired V1 product (2026-10-21 V2). Old trial/basic purchases resolve to the Identity Recode Planner access path; existing subscribers keep access per founder decision D2.',
    descriptionAr:
      'منتج قديم أُوقف مع نموذج V2 (2026-10-21). مشترو التجربة القديمة يُعالجون ضمن مسار مخطط إعادة صياغة الهوية؛ والمشتركون الحاليون يحتفظون بوصولهم وفق قرار D2.',
    shortDesc: 'Retired — see Identity Recode Planner',
  },
  {
    id: 'planner',
    expect: { name: 'Premium (Monthly)', price: 17.0 },
    name: 'Legacy Premium Monthly (retired — now the Identity Recode Planner $9.99 one-time)',
    nameAr: 'مميز شهري قديم (أُوقف — أصبح مخطط إعادة صياغة الهوية 9.99$ دفعة واحدة)',
    description:
      'Retired V1 monthly product. The Identity Recode Planner ($9.99 one-time) now includes everything this plan had. Existing subscribers keep access per founder decision D2.',
    descriptionAr:
      'منتج شهري قديم أُوقف. مخطط إعادة صياغة الهوية (9.99$ دفعة واحدة) يضم الآن كل ما كانت توفره هذه الخطة. المشتركون الحاليون يحتفظون بوصولهم وفق قرار D2.',
    shortDesc: 'Retired — see Identity Recode Planner',
  },
];

const FEATURES_UPD = {
  features: JSON.stringify([
    'Legacy plan (no longer sold)',
    'Existing subscribers keep access (D2)',
    'Upgrade to the Identity Recode Planner for the full system',
  ]),
};

let synced = 0, skipped = 0, retired = 0, warn = 0;

for (const row of V2_ROWS) {
  try {
    const existing = await db.product.findUnique({ where: { id: row.id } });
    if (existing && existing.name === row.name && Number(existing.price) === row.price) {
      console.log(`[TASK70-DB] ${row.id}: already V2 — skip`);
      skipped++;
      continue;
    }
    const before = existing ? `${existing.name} $${existing.price}` : '(absent)';
    const data = { ...row };
    await db.product.upsert({ where: { id: row.id }, create: data, update: data });
    console.log(`[TASK70-DB] ${row.id}: ${before} -> ${row.name} $${row.price}`);
    synced++;
  } catch (err) {
    console.error(`[TASK70-DB] ${row.id}: FAILED —`, err.message || err);
    skipped++;
    warn++;
  }
}

for (const r of RETIRE) {
  try {
    const existing = await db.product.findUnique({ where: { id: r.id } });
    if (!existing) {
      console.log(`[TASK70-DB] ${r.id}: absent — skip`);
      skipped++;
      continue;
    }
    const matches =
      existing.name === r.expect.name && Number(existing.price) === r.expect.price;
    if (!matches && !String(existing.name).startsWith('Legacy')) {
      console.warn(
        `[TASK70-DB] ${r.id}: DIVERGED (${existing.name} $${existing.price}) — skip (never overwrite unknown state)`
      );
      skipped++;
      warn++;
      continue;
    }
    if (String(existing.name).startsWith('Legacy')) {
      console.log(`[TASK70-DB] ${r.id}: already retired — skip`);
      skipped++;
      continue;
    }
    await db.product.update({
      where: { id: r.id },
      data: {
        name: r.name,
        nameAr: r.nameAr,
        description: r.description,
        descriptionAr: r.descriptionAr,
        shortDesc: r.shortDesc,
        category: 'legacy',
        isActive: false,
        isFeatured: false,
        ...FEATURES_UPD,
      },
    });
    console.log(`[TASK70-DB] ${r.id}: retired (${existing.name} $${existing.price} -> pointer row)`);
    retired++;
  } catch (err) {
    console.error(`[TASK70-DB] ${r.id}: RETIRE FAILED —`, err.message || err);
    warn++;
  }
}

console.log(`[TASK70-DB] done: synced=${synced} retired=${retired} skipped=${skipped} warnings=${warn}`);
await db.$disconnect();
if (warn > 0) process.exit(0); // non-fatal by design — deploy continues, warnings logged
