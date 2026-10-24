import { db } from '@/lib/db';
import { Lock, Download, FileText, KeyRound, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// ============================================
// TASK 71 (2026-10-25) — GATED Planner files page (founder directive:
// pay on Tribute FIRST, then get the entry link / access key).
//
// SECURITY MODEL (server-side only — nothing leaks in the HTML payload):
//  - GET /downloads/planner?code=XXXX&email=... is verified against the DB
//    (same rules as /api/access/verify: code exists, email matches purchase,
//    isActive, not expired) PLUS tier >= PREMIUM (The Planner package files).
//  - Without a valid pair the page renders the unlock form ONLY — zero file
//    URLs in the payload. The form is a plain GET form (no JS required).
//  - D2: legacy codes with tier BASIC land on the upgrade note (their plan
//    never included these files — honest message, one-click path).
//  - D1: the six legacy single worksheets (root PDFs) stay listed — the old
//    paths stay alive until the Cutover migration completes.
// ============================================

const TIER_LEVEL: Record<string, number> = { FREE: 0, BASIC: 1, PREMIUM: 2, MASTERY: 3 };

interface PlannerFile {
  name: string;
  nameAr: string;
  desc: string;
  descAr: string;
  href: string;
  size: string;
}

// PRIMARY: the four founder-supplied v2 files (official Names Register §2)
const plannerFilesV2: PlannerFile[] = [
  {
    name: 'Identity Recode Planner — Digital Interactive Edition',
    nameAr: 'مخطط إعادة صياغة الهوية — النسخة الرقمية التفاعلية',
    desc: 'The complete interactive planner: fillable fields, 30-day system, the full Identity Recode method.',
    descAr: 'المخطط التفاعلي الكامل: حقول قابلة للتعبئة، نظام 30 يوماً، منهجية إعادة صياغة الهوية كاملة.',
    href: '/downloads/v2/Identity-Recode-Planner-Digital-Interactive.pdf',
    size: '19.9 MB',
  },
  {
    name: 'Identity Recode Planner — Print-Ready Edition',
    nameAr: 'مخطط إعادة صياغة الهوية — نسخة الطباعة عالية الدقة',
    desc: 'High-resolution print edition of the full planner. Print it, reuse the weekly cycles indefinitely.',
    descAr: 'نسخة طباعة عالية الدقة للمخطط الكامل. اطبعها وأعد دوراتك الأسبوعية بلا حدود.',
    href: '/downloads/v2/Identity-Recode-Planner-Print-Ready-HighRes.pdf',
    size: '52.7 MB',
  },
  {
    name: 'The 7-Day Identity Reset — Mini Guide',
    nameAr: 'إعادة ضبط الهوية في 7 أيام — الدليل المصغر',
    desc: 'The 7-day guided discipline journey: daily identity prompts, evidence tracking, progress dashboard.',
    descAr: 'رحلة الانضباط الموجّهة لسبعة أيام: مطالبات هوية يومية، تتبع الأدلة، لوحة التقدم.',
    href: '/downloads/v2/Tamkinly-7-Day-Identity-Reset.pdf',
    size: '5.6 MB',
  },
  {
    name: 'Identity Reset Checklist',
    nameAr: 'قائمة إعادة ضبط الهوية',
    desc: 'Weekly-cycle tool with the Failure Recovery Protocol — print and rerun indefinitely.',
    descAr: 'أداة دورة أسبوعية مع بروتوكول التعافي من الفشل — اطبعها وأعد الدورة كما تشاء.',
    href: '/downloads/v2/Tamkinly-Identity-Reset-Checklist.pdf',
    size: '1.7 MB',
  },
];

// LEGACY single worksheets (root PDFs — still alive per D1 until migration completes)
const legacyWorksheets: PlannerFile[] = [
  { name: 'Executive Manual', nameAr: 'الدليل التنفيذي', desc: '', descAr: '', href: '/Executive-Manual.pdf', size: '74 KB' },
  { name: 'Identity Baseline Worksheet', nameAr: 'ورقة عمل خط الأساس للهوية', desc: '', descAr: '', href: '/Identity-Baseline-Worksheet.pdf', size: '75 KB' },
  { name: 'Environmental Audit', nameAr: 'التدقيق البيئي', desc: '', descAr: '', href: '/Environmental-Audit.pdf', size: '62 KB' },
  { name: 'Decision Pattern Analysis', nameAr: 'تحليل أنماط القرار', desc: '', descAr: '', href: '/Decision-Pattern-Analysis.pdf', size: '58 KB' },
  { name: 'Evidence Tracking System', nameAr: 'نظام تتبع الأدلة', desc: '', descAr: '', href: '/Evidence-Tracking-System.pdf', size: '60 KB' },
  { name: 'Progress Dashboard Guide', nameAr: 'دليل لوحة التقدم', desc: '', descAr: '', href: '/Progress-Dashboard-Guide.pdf', size: '58 KB' },
];

async function verifyPlannerAccess(code?: string, email?: string): Promise<
  { ok: true; tier: string } | { ok: false; reason: 'missing' | 'invalid' | 'email' | 'expired' | 'inactive' | 'tier'; tier?: string }
> {
  if (!code || !email) return { ok: false, reason: 'missing' };
  try {
    const access = await db.appAccess.findUnique({
      where: { code: code.trim().toUpperCase() },
    });
    if (!access) return { ok: false, reason: 'invalid' };
    if (access.email && access.email.toLowerCase() !== email.trim().toLowerCase()) {
      return { ok: false, reason: 'email' };
    }
    if (access.expiresAt && new Date() > access.expiresAt) return { ok: false, reason: 'expired' };
    if (!access.isActive) return { ok: false, reason: 'inactive' };
    const level = TIER_LEVEL[access.tier] || 0;
    if (level < TIER_LEVEL.PREMIUM) return { ok: false, reason: 'tier', tier: access.tier };
    return { ok: true, tier: access.tier };
  } catch {
    return { ok: false, reason: 'invalid' };
  }
}

export default async function PlannerDownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; email?: string }>;
}) {
  const { code, email } = await searchParams;
  const result = await verifyPlannerAccess(code, email);

  // ---------- UNLOCK FORM (no file URLs anywhere in this branch) ----------
  if (!result.ok) {
    const isTier = result.reason === 'tier';
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-12 px-4">
        <div className="max-w-2xl mx-auto" dir="ltr">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#3DD4B0]/10 mb-4">
              <Lock className="w-7 h-7 text-[#3DD4B0]" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              ملفات المخطط <span className="text-slate-500">·</span>{' '}
              <span dir="ltr">Planner Files</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              {isTier
                ? 'رمزك فعّال ويمنحك وصول خطتك الحالية — ملفات المخطط الكاملة مشمولة في The Planner (دفعة واحدة $9.99) وفي الإتقان Mastery.'
                : 'أدخل رمز الوصول والبريد الذي اشتريت به لفتح ملفات المخطط. Enter your access code and purchase email to unlock the Planner files.'}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <form method="get" action="/downloads/planner" className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-white mb-1.5">
                  رمز الوصول <span className="text-slate-500">·</span> <span dir="ltr">Access code</span>
                </label>
                <input
                  id="code"
                  name="code"
                  required
                  defaultValue={code || ''}
                  placeholder="TK-XXXXXX"
                  className="w-full h-12 rounded-lg bg-white/5 border border-white/20 px-4 text-white placeholder:text-slate-600 focus:border-[#3DD4B0] focus:outline-none font-mono tracking-widest"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                  البريد الإلكتروني <span className="text-slate-500">·</span> <span dir="ltr">Email</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  defaultValue={email || ''}
                  placeholder="you@example.com"
                  className="w-full h-12 rounded-lg bg-white/5 border border-white/20 px-4 text-white placeholder:text-slate-600 focus:border-[#3DD4B0] focus:outline-none"
                />
              </div>
              {code && email && !isTier && (
                <p className="text-sm text-red-400" dir="rtl">
                  لم يتم القبول — تأكد من تطابق البريد مع عملية الشراء ومن صلاحية الرمز.
                </p>
              )}
              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#3DD4B0] text-[#0F1C2E] font-semibold hover:bg-[#2BC49E] transition-colors flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                فتح الملفات <span className="text-[#0F1C2E]/60">·</span> Unlock files
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-slate-400 text-sm mb-3">
                لم تشترِ بعد؟ المخطط بـ $9.99 دفعة واحدة — وصول دائم لكل الملفات والتطبيقات.
              </p>
              <Link
                href="/products/premium"
                className="inline-flex items-center gap-2 text-[#3DD4B0] hover:text-white text-sm font-medium"
              >
                احصل على المخطط الآن <span className="text-slate-500">·</span> Get The Planner
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- GRANTED: render the files ----------
  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto" dir="ltr">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#3DD4B0]/10 mb-4">
            <ShieldCheck className="w-7 h-7 text-[#3DD4B0]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            ملفاتك جاهزة <span className="text-slate-500">·</span> <span dir="ltr">Your files are ready</span>
          </h1>
          <p className="text-slate-400 text-sm">
            وصول مؤكد عبر رمزك ({result.tier}) — دفعة واحدة، وصول دائم. Verified via your access code — one payment, lifetime access.
          </p>
        </div>

        {/* Primary v2 files */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {plannerFilesV2.map((f) => (
            <div key={f.href} className="bg-white/5 border border-white/10 hover:border-[#3DD4B0]/50 transition-all rounded-2xl p-5 flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-[#3DD4B0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-[#3DD4B0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm leading-snug">{f.name}</h3>
                  <p className="text-slate-400 text-xs leading-snug mt-0.5" dir="rtl">{f.nameAr}</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs mb-1">{f.desc}</p>
              <p className="text-slate-400 text-xs mb-4" dir="rtl">{f.descAr}</p>
              <div className="mt-auto">
                <a
                  href={f.href}
                  className="w-full h-11 rounded-lg bg-[#3DD4B0] text-[#0F1C2E] font-semibold hover:bg-[#2BC49E] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  تحميل <span className="text-[#0F1C2E]/60">·</span> Download <span className="text-[#0F1C2E]/60">({f.size})</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Legacy single worksheets */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <h2 className="text-white font-semibold text-base mb-1">
            أوراق العمل المنفردة <span className="text-slate-500">·</span> <span dir="ltr">Single worksheets</span>
          </h2>
          <p className="text-slate-500 text-xs mb-4">
            النسخ الفردية السابقة — تبقى متاحة لك (تُستبدل تدريجياً بالمخطط الكامل أعلاه). Previous individual versions — still available to you.
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {legacyWorksheets.map((f) => (
              <li key={f.href}>
                <a href={f.href} className="flex items-center gap-2 text-sm text-slate-300 hover:text-[#3DD4B0] transition-colors">
                  <FileText className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{f.name}</span>
                  <span className="text-slate-600 text-xs ms-auto">{f.size}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link href="/apps" className="text-[#3DD4B0] hover:text-white text-sm font-medium">
            افتح التطبيقات التفاعلية برمزك نفسه <span className="text-slate-500">·</span> Open the interactive apps with the same code
          </Link>
        </div>
      </div>
    </div>
  );
}
