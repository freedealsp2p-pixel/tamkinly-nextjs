# 🗺️ خريطة موقع تمكّنلي الكاملة — TAMKINLY FULL SITE MAP
### المرجع الرسمي لأسوار Hermes: التسويق • خدمة العملاء • صناعة المحتوى

| البند | القيمة |
|---|---|
| **الإصدار** | v1.0 — مبدئي هندسي قابل للتوسعة |
| **التاريخ** | 2026-10-01 |
| **المصدر** | مستخرج مباشرة من الكود المنتج على الخادم (ليس تخميناً) |
| **الدومين** | https://tamkinly.com |
| **اللغات** | عربي/إنجليزي (المحتوى الأساسي إنجليزي + مقالات عربية + واجهات ثنائية) |
| **قاعدة الوصول** | `https://tamkinly.com` + كل الروابط النسبية أدناه |

> **الغرض من هذا الملف:** تعليم أسوار التسويق وخدمة العملاء وصناعة المحتوى ما يقدمه الموقع من فائدة حقيقية، وأين يذهب المستخدم من كل صفحة، وما الـ CTA المناسب لكل سياق. أي سرب يستخدم هذا الملف يجب أن يلتزم بـ:**لا تختلق رابطاً غير موجود هنا، لا تعد بخصائص غير موصوفة، ووصّل دائماً المستخدم إلى أقرب خطوة عملية.**

---

## 1) هوية الموقع وعرض القيمة

**تمكّنلي (Tamkinly)** = منصة تحول الهوية (Identity Transformation) مبنية على علم النفس التجريبي وعلم الأعصاب. الفلسفة الأساسية: **لا تغيّر سلوكك — غيّر هويتك والسلوك يتبع** (Identity-Based Change).

- **الجمهور:** الباحثون عن تغيير ذاتي حقيقي (انضباط، عادات، أهداف) + الناجون من الإدمان والصدمات (قسم التعافي).
- **النموذج التجاري:** اشتراكات شهرية — **Basic 7$ / Premium 17$ / Mastery 27$** + بروتوكولات علاجية بوصول مفاتيح.
- **الرحلة التصميمية:** اختبار مجاني (Quiz) → أدوات مجانية → اشتراك Basic (7 أيام) → Premium (30 يوم) → Mastery (كل شيء + مدرب ذكي).
- **الميزة التنافسية:** منظومة تطبيقات تفاعلية مترابطة (20 تطبيقاً) + محرك "الخطوة التالية" يوجّه المستخدم تلقائياً + مدرب AI يرد بالعربية والإنجليزية بأسعار المنتجات الدقيقة.

---

## 2) الصفحات الأساسية والتنقل الرئيسي (Header/Footer)

| الرابط | الصفحة | ماذا يفعل المستخدم | أين ينتقل منها |
|---|---|---|---|
| `/` | الرئيسية | يستوعب فلسفة تحول الهوية، يرى الأقسام الثلاثة | `/quiz` (ابدأ الاختبار) • `/products` (الاشتراكات) • `/recovery` (التعافي) |
| `/about` | من نحن | يتعرف على الرؤية والمنهجية | `/methodology` • `/products` |
| `/methodology` | المنهجية | يفهم الأساس العلمي لتحول الهوية قبل الشراء | `/products` • `/quiz` |
| `/search` | البحث | يبحث في كل محتوى الموقع | أي صفحة |
| `/resources` | الموارد | مكتبة الموارد المجانية المجمعة | `/apps` • `/guides` • `/blog` |
| `/offline` | وضع عدم الاتصال | صفحة تقنية تلقائية عند انقطاع الشبكة | — (تلقائية) |

**CTA الرئيسية في الهيدر/الفوتر (31 رابطاً):** Products (hub + basic/premium/mastery) • Apps (hub + المميز: ai-identity-coach, identity-gap-quiz, identity-baseline, values-clarification, therapeutic-protocols hub + 3 بروتوكولات) • Recovery (hub + porn-recovery + trc) • Blog • Guides • Methodology • FAQ • Contact • Downloads • Cart • Order Status • Search • Sign In • Privacy/Terms/Refund.

---

## 3) الحساب والوصول والمدفوعات

| الرابط | الوظيفة | ماذا يفعل المستخدم | ينتقل إلى |
|---|---|---|---|
| `/auth/signup` | إنشاء حساب | يسجل ببريده ويبدأ رحلته | `/dashboard` • بريد الترحيب الفوري |
| `/auth/signin` | تسجيل الدخول | يدخل لحسابه وتطبيقاته | `/dashboard` • آخر تطبيق استخدمه |
| `/auth/forgot-password` | استعادة كلمة المرور | يطلب رابط إعادة التعيين (بريد من noreply@) | `/auth/reset-password` |
| `/auth/reset-password` | إعادة التعيين | يضع كلمة مرور جديدة من الرابط المرسل | `/auth/signin` |
| `/account` | حسابي | يدير ملفه واشتراكه ومفاتيح وصوله | `/dashboard` • `/products` |
| `/dashboard` | لوحة التحكم | مركز كل شيء: التطبيقات، التقدم، الإنجازات | كل التطبيقات • `/apps/progress-dashboard` |
| `/cart` | السلة | يراجع اختياراته قبل الشراء | `/checkout` |
| `/checkout` | الدفع | يدفع (بطاقة/Tribute) ويستلم مفاتيح وصول فورية | `/payment/success` |
| `/payment/success` | نجاح الدفع | يستلم تأكيد الشراء + مفاتيح الوصول (بريد فوري) | `/dashboard` • التطبيق المشترى |
| `/payment/cancel` | إلغاء الدفع | يعود بأمان دون خصم | `/products` (CTA إعادة المحاولة) |
| `/order-status` | حالة الطلب | يتتبع طلبه ومفاتيحه | `/downloads` |
| `/downloads` | التنزيلات | يحمل كل ملفاته الرقمية المشتراة | ملفات PDF + التطبيقات |
| `/referral` | برنامج الإحالة | يحصل على رابط إحالة خاص ويكافأ | `/ref/[code]` (رابط صديق → الموقع كله) |
| `/ref/[code]` | رابط إحالة | الصديق يدخل عبر رابط صاحب الإحالة (يُسجَّل تلقائياً) | `/` • `/products` |

**ملاحظة لسرب الدعم:** مفاتيح الوصول تُنشأ وتُتحقق عبر `/api/access/*`، ومشتريات Tribute تصل عبر `/api/tribute/webhook` — أي مشكلة "ما وصلني المفتاح" تُفحص من حالة الطلب في `/order-status` ثم إيميل noreply@.

---

## 4) المنتجات المجانية (FREE) — بوابة الدخول

| الرابط | العنوان | ماذا يفعل المستخدم | أين ينتقل | CTA المقترح |
|---|---|---|---|---|
| `/quiz` | Identity Gap Quiz | اختبار 3 دقائق يقيس الفجوة بين هويته الحالية والمثالية — نتائج فورية شخصية | `/quiz/results` | "اكتشف فجوتك الآن — مجاناً" |
| `/quiz/results` | نتائج الاختبار | يرى درجته وتصنيفه بأحد 4 مستويات: **beginner / explorer / builder / master** + خطوته التالية المخصصة | المنتج المطابق لمستواه (Free apps → Basic → Premium) | "خطوتك التالية بالضبط" |
| `/apps/identity-gap-quiz` | تطبيق الاختبار | نسخة التطبيق الكاملة لاختبار الفجوة | `/quiz/results` • المنتجات | "ابدأ التحول من معرفة ذاتك" |
| `/apps/values-clarification` | توضيح القيم (مجاني) | يكتشف قيمه الجوهرية بمنهجية ACT علمية | `/apps/goal-system` | "اعرف قيمك ثم ابنِ عليها" |
| `/apps/daily-reflection` | التأمل اليومي (مجاني) | ممارسة تأمل يومية بـ7 ثيمات بحثية تعيد برمجة المسارات العصبية | `/apps/journal-system` | "5 دقائق يومياً تغيّر هويتك" |
| `/apps/habit-tracker` | متتبع العادات (مجاني) | يتتبع عاداته المتوافقة مع هويته المرغوبة بسلاسل تحفيزية | `/apps/evidence-tracking` • Premium | "كل يوم التزام = صوت لهويتك الجديدة" |

**قاعدة أسوار التسويق:** المنتجات المجانية مصممة لتُظهر الفجوة ثم تعرض الحل المدفوع — الـ CTA الطبيعي دائماً بعد نتيجة مجانية هو "الخطوة التالية المقاسة" وليس البيع المباشر.

---

## 5) التمارين والملفات العملية (Worksheets & Downloads)

| الرابط | الوظيفة | ماذا يفعل المستخدم |
|---|---|---|
| `/apps/worksheets` | مكتبة أوراق العمل (Premium) | يصل لكل أوراق عمل تمكّنلي في مكان واحد: استكشاف هوية، بناء عادات، تمارين تحول |
| `/downloads` | مركز التنزيلات | يحمل كل ملفاته الرقمية (PDF رقمي + نسخ للطباعة) حسب اشتراكه |
| `/recovery/porn-recovery/downloads` | ملفات برنامج التعافي | يحمل ملفات برنامج التعافي من الإباحية |
| `/recovery/trc/downloads` | ملفات أدوات الصدمات | يحمل حزمة أدوات تنظيم الصدمات |
| `/recovery/trc/worksheets/safety-plan` | خطة الأمان (ورقة عمل) | يبني خطة أمان شخصية خطوة بخطوة |
| `/recovery/trc/worksheets/trigger-mapping` | خريطة المحفزات (ورقة عمل) | يرسم محفزاته وأنماطها على ورقة منظمة |

**ورق العمل المرتبطة بمقالات المدونة (6):** who-am-i • identity-based-habits • self-authorship • identity-baseline-8d • environmental-audit • erq-emotional-regulation — كل مقال ورقة عمل يربط القارئ بالتطبيق/المنتج المدفوع المطابق.

---

## 6) قسم تحول الهوية — المنتجات المدفوعة الثلاثة

**صفحة العرض:** `/products` — المستخدم يقارن الحزم الثلاث جانباً بجانب. صفحات الحزم: `/products/basic` • `/products/premium` • `/products/mastery`

### 6.1 حزمة BASIC — 7$/شهر (`/products/basic`)
> "ابدأ برحلة انضباط موجهة 7 أيام نحو تحول الهوية — نقطة الدخول المثالية لتجربة المنهجية"

| المكوّن | التفصيل |
|---|---|
| **الرحلة** | 7-Day Guided Discipline Journey يومية موجّهة |
| **التطبيقات المفتوحة** | كل المجاني + `/apps/trial-planner` (مخطط تجريبي بعينات من الأدوات المتقدمة) |
| **التمارين** | Daily identity prompts يومية + أساسيات تتبع الأدلة `/apps/evidence-tracking` |
| **الملفات** | **7 Days System PDF** قابل للتنزيل (من `/downloads`) |
| **المتابعة** | Progress dashboard `/apps/progress-dashboard` |
| **الإلغاء** | في أي وقت |
| **بريد الترحيب** | تسلسل BASIC Onboarding (7 أيام + upsell تدريجي لـ Premium) |

### 6.2 حزمة PREMIUM — 17$/شهر (`/products/premium`) ⭐ الأكثر عرضاً
> "نظام التحول الكامل 30 يوماً مع التطبيقات التفاعلية وملفات PDF — مبني على علم النفس التجريبي"

| المكوّن | التفصيل |
|---|---|
| **كل ما في Basic** | + الرحلة الكاملة 30 يوماً |
| **التطبيقات المفتوحة (11)** | `/apps/identity-recode-system` (نظام إعادة البرمجة 30 يوم بـ6 مكونات مترابطة) • `/apps/goal-system` • `/apps/identity-baseline` (قياس 8 أبعاد للهوية) • `/apps/environmental-audit` (تدقيق البيئة الجسدية/الاجتماعية/الرقمية) • `/apps/decision-analysis` (تحليل أنماط القرار والتحيزات) • `/apps/evidence-tracking` الكامل • `/apps/daily-planner` (تخطيط يومي بهوية) • `/apps/journal-system` • `/apps/worksheets` • `/apps/executive-manual` (الدليل التنفيذي الشامل) • `/apps/progress-dashboard` |
| **الملفات** | 30-Day Identity Planner + Executive Manual + Identity Baseline Worksheet — PDF رقمي وطباعة |
| **التمارين** | تحليل أنماط القرار + أوراق العمل الكاملة |
| **بريد الترحيب** | تسلسل PREMIUM Onboarding (30 يوم + upsell لـ Mastery) |

### 6.3 حزمة MASTERY — 27$/شهر (`/products/mastery`) ⭐ الأفضل قيمة
> "الحزمة النهائية: كل التطبيقات + مدرب ذكي + مجتمع + دعم أولوية — للجادين في التحول الشامل"

| المكوّن | التفصيل |
|---|---|
| **كل ما في Premium** | + فتح كل التطبيقات (20/20) |
| **التطبيقات الإضافية (4)** | `/apps/emotion-regulation` (ERQ — تنظيم الانفعالات بمنهج Gross & John) • **`/apps/ai-identity-coach` (المدرب الذكي — حي ويعمل الآن!)** • `/apps/community-access` (مجتمع المتحولين) • `/apps/priority-support` (دعم الأسرعة القصوى) |
| **الملفات** | Emotion Regulation Toolkit + كل ملفات Premium |
| **الدعم** | ردود أسرع من خبراء التحول + مجتمع داعم |
| **بريد الترحيب** | تسلسل MASTERY Onboarding (رحلة VIP) |

### 6.4 البروتوكولات العلاجية (وصول بمفاتيح — جزء من العروض)
**المركز:** `/apps/therapeutic-protocols` — أربعة بروتوكولات علاجية موجّهة:

| البروتوكول | الرابط | ماذا يفعل المستخدم |
|---|---|---|
| White Mirror | `/apps/therapeutic-protocols/white-mirror` | تمرين مواجهة ذاتية موجّه (وصول بمفتاح) |
| Temporal Decoupling | `/apps/therapeutic-protocols/temporal-decoupling` | فصل زمني عن الذكريات المؤلمة (وصول بمفتاح) |
| Truncated Sentence | `/apps/therapeutic-protocols/truncated-sentence` | إكمال الجملة المبتورة — معالجة الجرح اللفظي + تذكيرات ممارسة |
| Alternative Code | `/apps/therapeutic-protocols/alternative-code` | استبدال الشيفرة السلوكية القديمة ببديل واعٍ (وصول بمفتاح) |

كل بروتوكول له: بريد تسليم وصول (PROTO_* بقالبين لغويين) + متابعة 9 أيام (PROTO_DAY_1→9) + APIs وصول مخصصة. **سرب الدعم:** مشكلة "البروتوكول لا يفتح" = فحص المفتاح من `/order-status` ثم بريد noreply@.

---

## 7) سجل التطبيقات التفاعلية الكامل (20 تطبيقاً)

| # | التطبيق | الرابط | الفئة | ماذا يفعل المستخدم |
|---|---|---|---|---|
| 1 | Identity Gap Quiz | `/apps/identity-gap-quiz` | FREE | يقيس فجوة هويته ببحث مسند |
| 2 | Values Clarification | `/apps/values-clarification` | FREE | يحدد قيمه الجوهرية (ACT) |
| 3 | Daily Reflection | `/apps/daily-reflection` | FREE | تأمل يومي بـ7 ثيمات |
| 4 | Habit Tracker | `/apps/habit-tracker` | FREE | يتتبع عادات الهوية |
| 5 | Trial Planner | `/apps/trial-planner` | BASIC | عيّنات مجانية من الأدوات المتقدمة |
| 6 | Goal System | `/apps/goal-system` | PREMIUM | أهداف متوافقة مع الهوية + خطوات عملية |
| 7 | Identity Baseline | `/apps/identity-baseline` | PREMIUM | قياس 8 أبعاد لوضوح الذات |
| 8 | Identity Recode System | `/apps/identity-recode-system` | PREMIUM | برنامج 30 يوم بـ6 مكونات مترابطة |
| 9 | Environmental Audit | `/apps/environmental-audit` | PREMIUM | تدقيق بيئته الفيزيائية/الاجتماعية/الرقمية |
| 10 | Emotion Regulation (ERQ) | `/apps/emotion-regulation` | MASTERY | إعادة تقييم معرفي vs كبت — ذكاء انفعالي |
| 11 | Decision Analysis | `/apps/decision-analysis` | PREMIUM | يكشف تحيزاته ويحسّن قراراته |
| 12 | Evidence Tracking | `/apps/evidence-tracking` | PREMIUM | يوثق أدلة هويته الجديدة لحظة بلحظة |
| 13 | Daily Planner | `/apps/daily-planner` | PREMIUM | يخطط يومه حول من يريد أن يصبح |
| 14 | Journal System | `/apps/journal-system` | PREMIUM | قوالب تدوين منظمة للعمل على الذات |
| 15 | Worksheets Library | `/apps/worksheets` | PREMIUM | كل أوراق العمل في مكان واحد |
| 16 | Progress Dashboard | `/apps/progress-dashboard` | PREMIUM | متابعة موحدة: درجة الهوية + إنجازات |
| 17 | Executive Manual | `/apps/executive-manual` | PREMIUM | دليل شامل خطوة بخطوة لاستخدام كل الأدوات |
| 18 | AI Identity Coach | `/apps/ai-identity-coach` | MASTERY | مدرب ذكي يرد عربي/إنجليزي بمعرفة المنتجات والأسعار والبروتوكولات — **حي ويعمل** |
| 19 | Community Access | `/apps/community-access` | MASTERY | مجتمع المشاركين في رحلة التحول |
| 20 | Priority Support | `/apps/priority-support` | MASTERY | مساعدة شخصية بأسرع وقت |

✅ **تم الإصلاح 2026-10-01:** عنوان "Coming Soon" أُزيل نهائياً من السجل المركزي والبناء المُجمَّع — المدرب حي ويُعرض بعنوانه الصحيح (AI Identity Coach — حي على محرك qwen3.8-27b).

---

## 8) قسم التعافي (Recovery) — خط الدفاع الأعمق

| الرابط | الوظيفة |
|---|---|
| `/recovery` | المركز: طريقان واضحان + محتوى دعم |
| `/recovery/porn-recovery` | برنامج التعافي من الإباحية — خارطة 5 مراحل عملية |
| `/recovery/porn-recovery/journey` | رحلة التعافي الشخصية القابلة للتتبع |
| `/recovery/porn-recovery/downloads` | ملفات البرنامج |
| `/recovery/trc` | **مركز TRC (التنظيم Trauma Recovery Center):** أدوات تنظيم الجهاز العصبي |
| `/recovery/trc/journey` | رحلة التعافي من الصدمات خطوة بخطوة |
| `/recovery/trc/grounding` | أرضنة 5-4-3-2-1 للحظات الذعر (+`/grounding-guide` شرح + `/grounding/printable` نسخة للطباعة) |
| `/recovery/trc/body-scan` | مسح جسدي تفاعلي لتفكيك التوتر |
| `/recovery/trc/safe-place` | بناء المكان الآمن الذهني |
| `/recovery/trc/a52` | أداة A52 المتخصصة |
| `/recovery/trc/eft-tapping` | الضربات الجلدية EFT لتهدئة الجهاز العصبي |
| `/recovery/trc/thought-reframing` | إعادة صياغة الأفكار المُعطِّلة |
| `/recovery/trc/shame-recovery` | التعافي من الخجل الداخلي |
| `/recovery/trc/secondary-trauma` | الصدمة الثانوية (للمساعدين والأمهات) |
| `/recovery/trc/what-happens-during-trauma-responses` | تفسير استجابات الصدمة |
| `/recovery/trc/what-trauma-does-to-the-body` | أثر الصدمة في الجسد |
| `/recovery/trc/regulation-guide` | دليل التنظيم العصبي الكامل |
| `/recovery/trc/regulation-toolkit` | حزمة الأدوات العملية |
| `/recovery/trc/trauma-journal` | تدوين علاجي للدمج |
| `/recovery/trc/downloads` | تنزيلات TRC |
| `/trc` + `/trc/grounding` | روابط قديمة توجّه تلقائياً للمركز الجديد |

**لغة أسوار المحتوى في هذا القسم:** التعاطف أولاً، صفر لوم، خصوصية تامة، والـ CTA ناعم (أداة مجانية ← برنامج ← اشتراك). ممنوع أي وعود شفائية.

---

## 9) الأدلة المجانية (Guides) — 4 أدلة عميقة ثنائية اللغة

| الرابط | الدليل | الفكرة المحورية |
|---|---|---|
| `/guides/behavior-trap-why-habits-fail` | فخ السلوك: لماذا تفشل العادات | التغيير السلوكي يفشل دون تغيير هوية |
| `/guides/identity-vs-behavior-change` | الهوية مقابل تغيير السلوك | الفرق الجوهري بين المدرستين |
| `/guides/environment-shapes-you` | البيئة تصنعك | هندسة المحيط قبل محاربة النفس |
| `/guides/recode-identity-30-days` | أعد برمجة هويتك في 30 يوماً | المعاينة الكاملة لمنهج Premium |

**CTA الطبيعي:** كل دليل ينتهي بالجسر إلى المنتج المطابق (الأسوار تستخدم هذه الجسور في المحتوى).

---

## 10) المدونة — 54 مقالاً حسب التصنيف

**مراكز المدونة:** `/blog` (الكل) • `/blog/category/[category]` (حسب تصنيف) • `/blog/author/[slug]` (حسب كاتب) • التصنيفات النظامية: App Guides • Identity & Transformation • Mindset & Strategy • Productivity & Growth • Recovery • Worksheets (+ تصنيفات عربية)

### تطبيقات (App Guides)
- `/blog/identity-gap-assessment` — تقييم فجوة الهوية (FREE App)
- `/blog/values-clarification-tool` — أداة توضيح القيم (FREE App)
- `/blog/daily-reflection-practice` — ممارسة التأمل اليومي (FREE App)
- `/blog/identity-recode-system-guide` — الدليل الكامل لنظام إعادة البرمجة (BASIC App)
- `/blog/ai-identity-coach-guide` — دليل المدرب الذكي (MASTERY App)

### أوراق عمل (Worksheets)
- `/blog/who-am-i-worksheet` — من أنا؟ استكشاف الهوية الكامل
- `/blog/identity-based-habits-worksheet` — عادات قائمة على الهوية (منهجية James Clear)
- `/blog/self-authorship-worksheet` — تأليف الذات والصوت الداخلي
- `/blog/identity-baseline-8d-worksheet` — خط الأساس ثماني الأبعاد
- `/blog/environmental-audit-worksheet` — تدقيق البيئة ورقة عملية
- `/blog/erq-emotional-regulation-worksheet` — ERQ ورقة تنظيم الانفعالات

### تحول الهوية (Identity Shift)
- `/blog/physics-of-momentum` — فيزيكا الزخم: لماذا 18 دقيقة تغير كل شيء
- `/blog/and-the-bamboo-kept-growing` — والخيزران ظل ينمو: أثر العمل الخفي
- `/blog/automatic-change` — التغيير التلقائي: كيف تخدع دماغك لصالحك
- `/blog/physics-of-consciousness` — فيزيكا الوعي: كيف يعيد التكرار كتابة هويتك
- `/blog/the-memory-illusion` — وهم الذاكرة: لست ممن تتذكر أنك كنت
- `/blog/stop-procrastinating-identity-shift` — إيقاف التسويف عبر نقلب الهوية

### الالتزام والانضباط (Commitment)
- `/blog/all-in-or-nothing` — الكل أو لا شيء: قوة الالتزام الكامل
- `/blog/redefining-discipline` — إعادة تعريف الانضباط: أسمى صور حب الذات
- `/blog/self-discipline-science` — علم الانضباط الذاتي الحقيقي

### استراتيجية وتنفيذ وإنتاجية (Strategy / Execution / Productivity)
- `/blog/inversion-thinking` — التفكير بالعكس: اربح بتجنب الخسارة
- `/blog/speed-as-strategy` — السرعة كاستراتيجية: ميزة التنفيذ
- `/blog/goal-setting-framework` — إطار الأهداف المتوافقة مع الهوية
- `/blog/ten-minute-block-system` — نظام الكتل العشر دقائق

### وضوح ذهني وتميز (Mental Clarity / Excellence / ...)
- `/blog/dopamine-reset` — إعادة ضبط الدوبامين في 24 ساعة
- `/blog/vagus-nerve-breathing` — بروتوكول العصب الحائر: تنفس 4-2-8-2
- `/blog/becoming-exceptional` — أن تصبح استثنائياً
- `/blog/identity-millionaire` — مليونير الهوية: الثروة عبر تحول الذات
- `/blog/five-steps-to-miracles` — خمس خطوات للمعجزات: تحرير الذات
- `/blog/magic-in-work-you-avoid` — السحر في العمل الذي تتجنبه
- `/blog/work-on-yourself` — العمل على الذات: سيبرنطيقا الصورة الذهنية
- `/blog/how-to-build-habits-that-stick` — عادات تدوم: العلم والتطبيق
- `/blog/morning-routine-identity` — روتين الصباح القائم على الهوية

### التعافي (Recovery) — 13 مقالاً
- `/blog/porn-recovery-roadmap` — خارطة التعافي الكاملة: 5 مراحل
- `/blog/trauma-recovery-three-stages` — مراحل التعافي الثلاث: أمان/تنظيم/دمج
- `/blog/understanding-the-compulsion-cycle` — فهم حلقة الإدمان: لحظة الكسر
- `/blog/relapse-prevention-system` — نظام منع الانتكاس: هيكل يقرر قبلك
- `/blog/urge-surfing-10-minute-window` — ركوب الموجة: نافذة الـ10 دقائق
- `/blog/what-trauma-does-to-the-body` — ماذا تفعل الصدمة بالجسد
- `/blog/grounding-for-flashbacks` — الأرضنة للذكريات المبهرة
- `/blog/paced-breathing-for-regulation` — التنفس المتدرج 4/6
- `/blog/separating-self-from-shame` — الفصل بين الذات والخجل
- `/blog/relapse-is-data` — الانتكاسة بيانات لا فشل
- `/blog/rebuild-identity-after-addiction` — إعادة بناء الهوية بعد الإدمان
- `/blog/window-of-tolerance` — نافذة التحمّل: العيش داخل منطقتك المثلى
- `/blog/trauma-journaling-integration` — التدوين العلاجي للدمج

### مقالات عربية (8)
- `/blog/ar-tatweer-althat` — تطوير الذات: الدليل الكامل للتغيير من الداخل
- `/blog/ar-binaa-al3aadat` — بناء العادات: الدليل العلمي للعادات الدائمة
- `/blog/ar-tahqeeq-alahdaf` — تحقيق الأهداف: لماذا لا تحقق أهدافك والطريقة الصحيحة
- `/blog/ar-aldhibat-althati` — الانضباط الذاتي: الحقيقة التي لا يخبرك بها أحد
- `/blog/ar-idarat-alwaqt` — إدارة الوقت الحقيقية: لا أن تفعل أكثر بل أن تفعل الأهم
- `/blog/ar-hindasat-al-dimag` — هندسة الدماغ: الدليل العلمي لإعادة تشكيل حياتك
- `/blog/ar-karizma-al-tatheer` — كاريزما التأثير: كيف تصبح الشخص المحبوب والمؤثر
- `/blog/ar-khulasat-al-arbaeen` — خلاصة الأربعين: سبع ركائز ذهبية للتغيير الإيجابي

**قاعدة سرب المحتوى:** كل مقال = قمع جاهز (مشكلة ← علم ← أداة مجانية ← تطبيق ← حزمة). المقالات العربية للجمهور الخليجي/المغاربي، والإنجليزية للعالمي.

---

## 11) الأسئلة الشائعة (FAQ)

- **الرابط:** `/faq` — صفحة موحدة ثنائية اللغة: **6 فئات × 3 أسئلة** + قسم "إجابات سريعة" (Quick Answers) — المحتوى من ملفات الترجمة i18n.
- **لأسرب الدعم:** قبل صياغة رد، راجع صيغة FAQ الرسمية حتى يتسق ردك مع ما يقرؤه المستخدم هناك. الفئات تغطي: الحساب والدخول، الاشتراكات والفواتير، الوصول للتطبيقات والمفاتيح، المنتجات والفروقات بينها، التعافي والبروتوكولات، الخصوصية والدعم.
- **قواعد إجابة الأسوار:** رد قصير ← رابط الصفحة المعنية من هذه الخريطة ← عرض مساعدة إضافية. لا تختلق سياسة استرجاع أو تفاصيل فوترة من عندك — حوّل للصفحات الرسمية (القسم 12) أو ارتفع التذكرة.

## 12) السياسات واللوائح (Legal)

| الرابط | الوظيفة |
|---|---|
| `/privacy` | سياسة الخصوصية — جمع البيانات، البريد، حماية المعلومات |
| `/terms` | الشروط والأحكام — الاستخدام، الاشتراكات، حقوق المحتوى |
| `/refund` | سياسة الاسترجاع — شروط وشروط عدم الأهلية |
| شريط الكوكيز | `CookieConsent` — موافقة تتبع تلقائية لأول زيارة |

**قاعدة صارمة لكل الأسوار:** أي سؤال قانوني/فواتير/استرجاع = الرابط الرسمي فقط + تذكرة دعم. الردود التسويقية لا تعد أبداً بتغطية أو استرجاع غير موثقين في `/refund`.

## 13) التواصل وخدمة العملاء

| القناة | الرابط/العنوان | الاستخدام |
|---|---|---|
| نموذج التواصل | `/contact` (API: `/api/contact` → Brevo) | رسائل عامة — تُسجل وتظهر للسرب في `view=support` |
| تذاكر الدعم | API `/api/support/tickets` | مشاكل الحساب/الوصول/الفوترة — تتبع بحالة مفتوحة/مغلقة |
| بريد الدعم | **support@tamkinly.com** | الردود البشرية على التذاكر والاستفسارات |
| دعم الأسرعة | `/apps/priority-support` | حصري لـ MASTERY — أسرع زمن استجابة |
| المدرب الذكي | `/apps/ai-identity-coach` | خط الدعم الأول الآلي (عربي/إنجليزي) — يحيل للدعم عند الحاجة |

**عدد سرب الدعم (من تقارير حية):** الرسائل غير المقروءة والتذاكر المفتوحة تُسحب من `/api/agent/ops?view=support` — تُغلق رسالة التواصل بعد الرد عبر `POST ?action=mark-contact-read`.

---

## 14) منظومة البريد الإلكتروني الكاملة (172 قالباً حياً في Brevo)

### 14.1 عناوين المرسلين وأغراضها

| المرسل | الغرض | يُستخدم في |
|---|---|---|
| **noreply@tamkinly.com** | معاملات ونظام: تأكيدات شراء، تسليم مفاتيح وصول، إعادة تعيين كلمة مرور، إشعارات تقنية | رسائل فورية بعد حدث (اشترى/سجّل/نسي كلمة مرور) |
| **team@tamkinly.com** | التسويق والتسلسلات: onboarding، drip، upsell، إعادة تفعيل، رسائل القصة | رسائل مجدولة وعلاقية |
| **support@tamkinly.com** | الدعم البشري: ردود التذاكر ومتابعة المشاكل | ردود مباشرة على طلب مساعدة |
| *(مستلم داخلي)* admin@tamkinly.com | تقرير Digest اليومي للسرب (7:35 صباحاً بتوقيت الخادم = 12:35 الجزائر) | ملخص عمليات بالعربية RTL |

### 14.2 الإيميلات المعاملاتية الفورية (email-templates.ts — 13 قالباً)

| القالب | متى يُرسل | المحتوى و CTA |
|---|---|---|
| Welcome | فور التسجيل | ترحيب + خطوة أولى → `/quiz` أو `/dashboard` |
| Purchase Confirmation | فور أي شراء | تأكيد + مفاتيح الوصول → `/downloads` |
| Trial Purchase | شراء Basic | بدء رحلة الـ7 أيام → `/apps/trial-planner` |
| Planner Purchase | شراء Premium | تجهيز الـ30 يوم → `/apps/identity-recode-system` |
| Premium Purchase | ترقية Premium | فتح التطبيقات الـ11 → `/dashboard` |
| Bundle Purchase | شراء Mastery | فتح كل شيء + المدرب → `/apps/ai-identity-coach` |
| Abandoned Cart ×2 | بعد 1 ساعة ثم 24 ساعة | تذكير ناعم بالسلة المتروكة → `/cart` |
| Quiz Results | إكمال الاختبار | النتائج + التوصية المخصصة → حسب المستوى |
| Identity Milestone | إنجاز موثق | احتفال + مشاركة → `/apps/evidence-tracking` |
| Re-Engagement | خمول مستخدم | "هويتك تنتظرك" → آخر نشاط له |

### 14.3 تسلسلات التسليم والمتابعة (SEQ_TEMPLATES — 58 مفتاحاً × لغتين = قوالب 80–195)

| المجموعة | القوالب (ar/en) | الغرض | الجمهور |
|---|---|---|---|
| RECOVERY_TRC 01–12 | 80–91 / 138–149 | مسار تعافي الصدمات (12 رسالة تدريجية) | زوار قسم TRC |
| RECOVERY_REC 01–11 | 92–102 / 150–160 | مسار التعافي من الإدمان (11 رسالة) | زوار porn-recovery |
| PROTO_TD / AC / WM | 103–105 / 161–163 | تسليم وصول 3 بروتوكولات | مشترو البروتوكولات |
| PROTO_DAY 1–9 | 106–114 / 164–172 | متابعة ممارسة يومية بعد البروتوكول | مستخدمو بروتوكول |
| APP_* (21 مفتاحاً) | 115–134 / 173–192 | onboarding كل تطبيق من الـ21 + Quiz | حسب اشتراك المستخدم |
| NUDGE 1/3/7 | 135–137 / 193–195 | تنبيهات العودة بعد غياب قصير | المستخدمون الخاملون |

### 14.4 تسلسلات Drip الاستراتيجية (11 تسلسلاً)

| التسلسل | الفئة | الهدف التجاري |
|---|---|---|
| Lead Nurture — Quiz to BASIC | free | تحويل نتائج الاختبار إلى أول اشتراك 7$ |
| BASIC Onboarding — 7-Day Journey | basic | نجاح الـ7 أيام + تمهيد upsell |
| PREMIUM Onboarding — 30-Day Journey | premium | تفعيل كامل + تمهيد upsell |
| MASTERY Onboarding — VIP Journey | mastery | استهلاك كل المزايا (تقليل الإلغاء) |
| Abandoned Cart — 1 Hour | سلات | استرجاع دفعة عاطفية |
| Abandoned Cart — 24 Hours | سلات | عرض/تذكير أخير |
| Re-Engagement — Inactive | خمول | إعادة إشعال الرحلة |
| Upsell — BASIC → PREMIUM | ترقية | "أنت جاهز للنظام الكامل" |
| Upsell — PREMIUM → MASTERY | ترقية | "فُتح المدرب والمجتمع" |
| Quiz Results Follow-up (Legacy) | قديم | احتفاظي — يُستبدل تدريجياً |

### 14.5 الجدولة الحية (Cron)
- معالجة طابور البريد: **كل 5 دقائق** (`/api/email/process`)
- إطلاق التسلسلات: **كل 15 دقيقة** (`/api/email/sequences-cron`)
- Digest السرب: **يومياً** عبر `/api/agent/ops?action=digest`

---

## 15) دليل CTA الجاهز لكل سياق (لأسوار المحتوى والتسويق والدعم)

| السياق | CTA العربي | CTA الإنجليزي | الوجهة |
|---|---|---|---|
| زائر بارد (مقال/سوشيال) | "اكتشف فجوة هويتك في 3 دقائق — مجاناً" | "Discover your Identity Gap in 3 minutes — free" | `/quiz` |
| بعد نتيجة Quiz | "خطوتك التالية جاهزة — ابدأها الآن" | "Your next step is ready — start now" | حسب مستوى النتيجة |
| مستخدم مجاني نشط | "افتح النظام الكامل — 9.99$ دفعة واحدة بلا اشتراك" | "Unlock the full system — $9.99 once, no subscription" | `/products/premium` |
| Basic ينجح في الأسبوع | "أنت جاهز للتحول الكامل — 30 يوماً بانتظارك" | "You're ready for the full 30-day transformation" | `/products/premium` |
| Premium يُظهر انضباطاً | "افتح مدربك الذكي ومجتمعك — Mastery" | "Unlock your AI Coach & community — Mastery" | `/products/mastery` |
| سلة متروكة | "رحلتك تنتظر — أكمل ما بدأت" | "Your journey is waiting — finish checkout" | `/cart` |
| مستخدم خامل 7+ يوم | "هويتك الجديدة تُبنى بالأيام الصغيرة — عد اليوم" | "Your new identity is built in small days — come back" | آخر تطبيق استخدمه |
| زائر قسم التعافي | "ابدأ بأداة أمان واحدة — خطوة واحدة تكفي اليوم" | "Start with one grounding tool — one step is enough today" | `/recovery/trc/grounding` |
| مشترٍ بروتوكول | "احجز 15 دقيقة هادئة وابدأ جلستك الأولى" | "Book 15 quiet minutes — start your first session" | صفحة البروتوكول |
| سؤال دعم مُغلق | "هل تحتاج شيئاً آخر؟ أنا هنا" | "Anything else? I'm here" | `/faq` • `/contact` |

**قاعدة ذهبية للأسوار:** CTA واحد لكل رسالة، وجهة واحدة واضحة، وقيمة فورية مرتبطة بالفائدة الحقيقية الموثقة في هذا الملف.

---

## 16) خريطة رحلة المستخدم (Journey Map)

```
زائر → الرئيسية/مقال/دليل → Quiz مجاني (3 دقائق) → نتائج + مستوى
  → أدوات مجانية (values / reflection / habit-tracker)
  → Basic 7$ (رحلة 7 أيام + trial-planner + PDF)
  → Premium 17$ (نظام 30 يوم + 11 تطبيق + ملفات)
  → Mastery 27$ (كل شيء + AI Coach + مجتمع + أولوية)
  مسارات موازية: التعافي (TRC/porn-recovery) → برامج مسندة → اشتراك
  بريد مستمر: onboarding → قيمة → upsell → إعادة تفعيل → digest داخلي
```
- **محرك الخطوة التالية** (`next-step-engine`) يقود المستخدم داخلياً بخطوات ثنائية اللغة بين التطبيقات حسب سلوكه — الأسوار تحاكي نفس المنطق في رسائلها.
- **تصنيفات نتائج Quiz:** beginner / explorer / builder / master — كل مستوى له توصية منتج مختلفة.

## 17) ملاحظات تقنية للأسوار (حقائق لا تُخترع)

- **نقطة عمليات السرب:** `GET /api/agent/ops?view=summary|customers|expiring|emails|coach|events|health|support` + `POST` (heartbeat/finding/draft/action) — مصادقة `Authorization: Bearer AGENT_OPS_TOKEN` (التوكن ليس توكن Cloudflare).
- **الأسعار الرسمية الوحيدة:** 7$/17$/27$ شهرياً — أي رقم آخر = خطأ.
- **المدرب الذكي:** حي، يرد بالعربية والإنجليزية، يعرف المنتجات والأسعار والبروتوكولات من حزمة المعرفة `config/coach-knowledge.md`.
- **مصفوفة الوصول tier→apps** كما في القسم 7 — لا تَعِد مستخدم Basic بتطبيق Premium.
- **الروابط في هذا الملف كلها حقيقية ومقروءة من كود الإنتاج** — إذا احتجت رابطاً غير موجود هنا، اسأل مهندس المشروع قبل نشر أي شيء.

## 18) سجل الملاحظات المرفوعة (للمهندس)

1. عنوان `/apps/ai-identity-coach` في السجل الداخلي ما زال "Coming Soon" — التطبيق حي؛ يلزم تحديث `src/lib/app-pages.ts` في بناء قادم.
2. ملف FAQ مصدره الترجمات i18n — عند توسعة الأسئلة حدَّث الترجمات لا الصفحة فقط.
3. الأكواد الـ7 القديمة `telegram_*@tribute.tg` (منتهية منذ 14 شهراً وisActive=true) ما زالت بانتظار تنظيف بيانات.
4. رسائل التواصل والتذاكر الحالية بيانات اختبار — لا تعاملها كعملاء حقيقيين.
