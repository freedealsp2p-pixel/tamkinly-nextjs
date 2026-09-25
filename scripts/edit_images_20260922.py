#!/usr/bin/env python3
"""Server edit script: insert ArticleFigure into 2 published articles, wire registry image props,
fix vagus nerve AR term, write images metadata reference doc. Run from /var/www/tamkinly."""
import io, sys, datetime

TS = "20260922"
BASE = "/var/www/tamkinly"
REPORT = []
errors = []

def read(p):
    with io.open(p, "r", encoding="utf-8") as f:
        return f.read()

def write(p, s):
    with io.open(p, "w", encoding="utf-8") as f:
        f.write(s)

def backup(path):
    s = read(path)
    bak = f"{path}.bak-imgfix-{TS}"
    write(bak, s)
    return s, bak

def replace_once(content, old, new, label, path):
    n = content.count(old)
    if n != 1:
        errors.append(f"[{label}] expected 1 occurrence, found {n} in {path}")
        return content, False
    return content.replace(old, new), True

def insert_before_first(content, anchor, insertion, start_idx, label, path):
    """Insert `insertion` before the next occurrence of `anchor` at/after start_idx."""
    i = content.find(anchor, start_idx)
    if i < 0:
        errors.append(f"[{label}] anchor {anchor!r} not found after idx {start_idx} in {path}")
        return content, False
    return content[:i] + insertion + content[i:], True

def insert_after_first(content, anchor, insertion, start_idx, label, path):
    """Insert `insertion` right AFTER the next occurrence of `anchor` at/after start_idx."""
    i = content.find(anchor, start_idx)
    if i < 0:
        errors.append(f"[{label}] anchor {anchor!r} not found after idx {start_idx} in {path}")
        return content, False
    j = i + len(anchor)
    return content[:j] + insertion + content[j:], True

# ---------- 1. blog-articles.ts ----------
P = f"{BASE}/src/lib/blog-articles.ts"
s, bak = backup(P)
s2, ok1 = replace_once(s, "    slug: 'porn-recovery-roadmap',\n",
                       "    slug: 'porn-recovery-roadmap',\n    image: '/uploads/articles/porn-recovery-roadmap.webp',\n",
                       "registry-porn", P)
s2, ok2 = replace_once(s2, "    slug: 'trauma-recovery-three-stages',\n",
                       "    slug: 'trauma-recovery-three-stages',\n    image: '/uploads/articles/trauma-recovery-three-stages.webp',\n",
                       "registry-trauma", P)
if ok1 and ok2:
    write(P, s2)
    REPORT.append(f"registry: image props added (backup {bak})")

# ---------- 2. porn-recovery-roadmap/page.tsx ----------
P = f"{BASE}/src/app/blog/porn-recovery-roadmap/page.tsx"
s, bak = backup(P)
FIG = '''
            <ArticleFigure
              src="/uploads/articles/porn-recovery-roadmap.webp"
              width={1376}
              height={768}
              alt={{
                en: "Winding path of five glowing milestones ascending through fog toward dawn",
                ar: "درب متعرّج بخمس محطات مضيئة يصعد عبر الضباب نحو الفجر",
              }}
              title={{
                en: "The Porn Recovery Roadmap: Five Stages",
                ar: "خارطة التعافي من الإباحية: خمس مراحل",
              }}
              caption={{
                en: "Recovery unfolds in five stages — each one makes the next easier.",
                ar: "التعافي يتكشّف في خمس مراحل — كل مرحلة تجعل التالية أسهل.",
              }}
            />
'''
ok_all = True
# import
if "ArticleFigure" not in s:
    anchor = 'import { BlogArticleJsonLd } from "@/components/seo/JsonLd";\n'
    s, ok = replace_once(s, anchor, anchor + "import { ArticleFigure } from '@/components/blog/ArticleFigure';\n", "porn-import", P)
    ok_all &= ok
# jsonld image prop
i = s.find('slug="porn-recovery-roadmap"')
s, ok = insert_before_first(s, "\n    />", '\n        image="/uploads/articles/porn-recovery-roadmap.webp"', i, "porn-jsonld", P)
ok_all &= ok
# figure after disclaimer div (keeps safety note adjacent to intro)
i = s.find("رفيقة مجانية لتلك الرعاية، لا بديلاً عنها.")
s, ok = insert_after_first(s, "</div>", FIG, i, "porn-figure", P)
ok_all &= ok
if ok_all:
    write(P, s)
    REPORT.append(f"porn page: import + jsonld image + figure inserted (backup {bak})")

# ---------- 3. trauma-recovery-three-stages/page.tsx ----------
P = f"{BASE}/src/app/blog/trauma-recovery-three-stages/page.tsx"
s, bak = backup(P)
FIG = '''
            <ArticleFigure
              src="/uploads/articles/trauma-recovery-three-stages.webp"
              width={1376}
              height={768}
              alt={{
                en: "Three ascending illuminated plateaus under a dawn gradient with a figure on the first",
                ar: "ثلاثة هضاب مضيئة متصاعدة تحت تدرّج فجر وشخصية على الأول",
              }}
              title={{
                en: "The Three Stages of Trauma Recovery",
                ar: "مراحل التعافي من الصدمات الثلاث",
              }}
              caption={{
                en: "Safety, then regulation, then integration — the order is the map.",
                ar: "الأمان ثم التنظيم ثم التكامل — الترتيب هو الخريطة.",
              }}
            />
'''
ok_all = True
if "ArticleFigure" not in s:
    anchor = 'import { BlogArticleJsonLd } from "@/components/seo/JsonLd";\n'
    s, ok = replace_once(s, anchor, anchor + "import { ArticleFigure } from '@/components/blog/ArticleFigure';\n", "trauma-import", P)
    ok_all &= ok
i = s.find('slug="trauma-recovery-three-stages"')
s, ok = insert_before_first(s, "\n    />", '\n        image="/uploads/articles/trauma-recovery-three-stages.webp"', i, "trauma-jsonld", P)
ok_all &= ok
i = s.find("وليست بديلاً عن العلاج الموجّه للصدمات.")
s, ok = insert_after_first(s, "</div>", FIG, i, "trauma-figure", P)
ok_all &= ok
# vagus nerve term fixes
s, ok = replace_once(s, "تنفس العصب الحائر: علم تهدئة جسدك بقدرتك", "تنفس العصب المبهم: علم تهدئة جسدك بقدرتك", "trauma-related-title", P)
ok_all &= ok
s, ok = replace_once(s, "يحفّز العصب الحائر مباشرة", "يحفّز العصب المبهم مباشرة", "trauma-body", P)
ok_all &= ok
if ok_all:
    write(P, s)
    REPORT.append(f"trauma page: import + jsonld image + figure + 2 vagus fixes (backup {bak})")

# ---------- 4. vagus-nerve-breathing/page.tsx ----------
P = f"{BASE}/src/app/blog/vagus-nerve-breathing/page.tsx"
s, bak = backup(P)
s2, ok = replace_once(s, "بروتوكول العصب الحائر: التنفس البطيء والتنظيم", "بروتوكول العصب المبهم: التنفس البطيء والتنظيم", "vagus-related-title", P)
if ok:
    write(P, s2)
    REPORT.append(f"vagus page: related-article title fixed (backup {bak})")

# ---------- 5. images metadata reference doc ----------
META = f"""# Recovery Blog Images — Metadata Reference (2026-09-22)

13 صورة أعُدّت لقسم التعافي. الملفات مرفوعة في /uploads/articles/ بالأسماء النهائية.
المقالان المنشوران (porn-recovery-roadmap، trauma-recovery-three-stages) مدمج فيهما الصورة
(Registry image + BlogArticleJsonLd image + ArticleFigure في المحتوى).
عند بناء أي مقال من الـ 11 المتبقية استخدم الحقول أدناه داخل <ArticleFigure> + registry `image` + JSON-LD image.

ملاحظة إلزامية للمقال 8 (paced-breathing-for-regulation): عند كتابة الميتاداتا الكاملة
استخدم «العصب المبهم» لا «العصب الحائر» في meta description (تصحيح معتمد من المستخدم).

ملاحظة إلزامية للمقال 13 (trauma-journaling-integration): Meta Title الخاص بالمقال يجب ألا يتضمن
عبارة «اكتب لتتماكى» (خطأ لغوي مرصود سابقاً) — صياغة سليمة بديلة مطلوبة عند النشر.

---
1. porn-recovery-roadmap.webp ✅ merged
   Title: The Porn Recovery Roadmap: Five Stages / خارطة التعافي من الإباحية: خمس مراحل
   Caption EN: Recovery unfolds in five stages — each one makes the next easier.
   Caption AR: التعافي يتكشّف في خمس مراحل — كل مرحلة تجعل التالية أسهل.
   Alt EN: Winding path of five glowing milestones ascending through fog toward dawn
   Alt AR: درب متعرّج بخمس محطات مضيئة يصعد عبر الضباب نحو الفجر
2. understanding-the-compulsion-cycle.webp
   Title: The Compulsion Cycle and Its Breaking Point / دورة الإدمان القهري ونقطة انكسارها
   Caption EN: Every loop has a weak link — recovery begins where the circle cracks open.
   Caption AR: لكل حلقة حلقةُ ضعف — ويبدأ التعافي حيث تنشق الدائرة.
   Alt EN: Circular loop of arrows around a calm figure with one cracked glowing segment
   Alt AR: حلقة سهمين دائرية حول شخصية هادئة وفجوة متوهجة تنكسر فيها
3. relapse-prevention-system.webp
   Title: A System That Protects Your Recovery / نظامٌ يحمي تعافيك
   Caption EN: You do not need stronger willpower — you need a structure that chooses before you do.
   Caption AR: لا تحتاج إرادة أقوى — بل بنية تختار قبل أن تفعل.
   Alt EN: Calm figure inside a thin teal geometric dome while chaos stays outside
   Alt AR: شخصية هادئة داخل قبة هندسية تركوازية رقيقة والفوضى تبقى خارجها
4. trauma-recovery-three-stages.webp ✅ merged
   Title: The Three Stages of Trauma Recovery / مراحل التعافي من الصدمات الثلاث
   Caption EN: Safety, then regulation, then integration — the order is the map.
   Caption AR: الأمان ثم التنظيم ثم التكامل — الترتيب هو الخريطة.
   Alt EN: Three ascending illuminated plateaus under a dawn gradient with a figure on the first
   Alt AR: ثلاثة هضاب مضيئة متصاعدة تحت تدرّج فجر وشخصية على الأول
5. urge-surfing-10-minute-window.webp
   Title: Riding the Urge Like a Wave / ركوب الرغبة كموجة
   Caption EN: An urge rises, peaks, and falls — your only task is to stay on the board for ten minutes.
   Caption AR: الرغبة تنهض وتبلغ ذروتها ثم تتراجع — مهمتك الوحيدة البقاء على اللوح عشر دقائق.
   Alt EN: Steady figure standing on the crest of an abstract wave under a dawn sky
   Alt AR: شخصية ثابتة تقف على قمة موجة مجرّدة تحت سماء الفجر
6. what-trauma-does-to-the-body.webp
   Title: Where Trauma Lives in the Body / أين تسكن الصدمة في الجسد
   Caption EN: The body remembers what the mind survived — and the body can learn safety again.
   Caption AR: الجسد يذكر ما نجا منه العقل — ويمكن للجسد أن يتعلّم الأمان من جديد.
   Alt EN: Translucent silhouette with glowing nodes along the spine as an outer storm settles
   Alt AR: سيلويت شفاف بنقاط ضوء على العمود الفقري وعاصفة خارجية تهدأ
7. grounding-for-flashbacks.webp
   Title: Grounding: Evidence of Now / التأريض: دليل الحاضر
   Caption EN: Five senses, sixty seconds, one truth: you are here, and it is now.
   Caption AR: خمس حواس، ستون ثانية، حقيقة واحدة: أنت هنا، وهذا الآن.
   Alt EN: Bare feet on solid ground with roots of light spreading as fog thins above
   Alt AR: قدمان حافيتان على أرض صلبة وجذور ضوء تتمدد والضباب يتناثر فوقها
8. paced-breathing-for-regulation.webp
   Title: The Breathing Rhythm That Resets Alarm / إيقاع التنفس الذي يعيد ضبط الإنذار
   Caption EN: Inhale four, exhale six — the oldest off-switch in the human body.
   Caption AR: شهيق أربعة وزفير ستة — أقدم مفتاح إطفاء في جسد الإنسان.
   Alt EN: Concentric ripples expanding and contracting on deep navy water
   Alt AR: دوائر متجمّعة تتمدد وتنكمش على ماء كحلي عميق
9. separating-self-from-shame.webp
   Title: You Are Not Your Shadow / لست ظلّك
   Caption EN: Shame hides; connection and self-compassion dissolve it.
   Caption AR: الخجل يختبئ؛ والارتباط والتعاطف مع الذات يذيبانه.
   Alt EN: Figure stepping out of a heavy shadow left behind on the wall, walking toward light
   Alt AR: شخصية تخرج من ظل ثقيل تركته على الجدار وتمشي نحو الضوء
10. relapse-is-data.webp
   Title: What the Slip Was Trying to Tell You / ماذا أرادت الزلة أن تقول لك
   Caption EN: A relapse reports where the system failed — it never rules on who you are.
   Caption AR: الانتكاس يبلّغ أين فشل النظام — ولا يحكم أبداً على من أنت.
   Alt EN: Cracked path re-routing forward beside a gauge turning toward glowing mint
   Alt AR: درب متشقق يعيد توجيهه إلى الأمام بجانب مؤشر يتجه نحو النعناعي المضيء
11. rebuild-identity-after-addiction.webp
   Title: Every Vote Builds the New Self / كل صوت يبني الذات الجديدة
   Caption EN: You are not recovering the old you — you are assembling someone sturdier.
   Caption AR: أنت لا تستعيد ذاتك القديمة — بل تركّب شخصاً أكثر صلابة.
   Alt EN: Figure assembling a translucent geometric self-portrait from glowing fragments
   Alt AR: شخصية تركّب بورتريهها الشفاف الهندسي من شظايا متوهجة
12. window-of-tolerance.webp
   Title: Living Inside the Window / العيش داخل النافذة
   Caption EN: Between explosion and shutdown there is a window — and it can widen.
   Caption AR: بين الانفجار والانسحاب نافذة — ويمكن أن تتّسع.
   Alt EN: Calm luminous horizontal band between deep abyss and chaotic storm, a figure inside
   Alt AR: شريط ضوء هادئ أفقي بين هاوية عميقة وعاصفة فوضوية وشخصية داخله
13. trauma-journaling-integration.webp
   Title: The Page That Holds What You Carry / الصفحة التي تحمل ما تحمله
   Caption EN: Written at the right pace, the story files itself as past — and stops visiting as present.
   Caption AR: بوتيرة صحيحة، تحفظ القصة نفسها كماضٍ — وتتوقف عن زيارتك كحاضر.
   Alt EN: Open journal with constellations of ordered light rising from its pages
   Alt AR: دفتر مفتوح تتصاعد منه كوكبات ضوء مرتّبة من صفحاته
"""
write(META, META)
REPORT.append(f"metadata reference doc written: {META}")

print("=" * 30)
for r in REPORT:
    print("OK:", r)
if errors:
    print("-" * 30)
    for e in errors:
        print("ERROR:", e)
    sys.exit(1)
print("=" * 30)
print("ALL EDITS SUCCEEDED")
