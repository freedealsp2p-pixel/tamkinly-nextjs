# تدقيق امتثال السجل — TRC
# Registry Compliance Audit — TRC Assets

> **الإصدار / Version:** 1.0
> **المنصة / Platform:** تمكينلي — Tamkinly Recovery Center
> **نوع المستند / Document Type:** تدقيق امتثال السجل (Registry Compliance Audit)
> **آخر تحديث / Last Updated:** 2025-03
> **اللغة الأساسية / Primary Language:** العربية (مع المصطلحات التقنية بالإنجليزية)
> **المرجع / Reference:** `/var/www/tamkinly/docs/recovery/trc-registry-compliance.md`
> **مصدر البيانات / Data Source:** `/var/www/tamkinly/src/registry/recovery-assets.ts`

---

## مقدمة

هذا المستند يتحقق من أن **كل أصل في السجل** يمتلك جميع الحقول المطلوبة. البيانات مأخوذة من الملف الفعلي `recovery-assets.ts` — لا تقديرات.

### الحقول المطلوبة لكل أصل

| # | الحقل | الوصف | القيم المتوقعة |
|---|---|---|---|
| 1 | `contraindications` | هل يوجد توثيق لمضادات الاستطباب؟ | حقل مُوثَّق مع تفاصيل |
| 2 | `safetyLevel` | هل يوجد مستوى أمان مُعرَّف؟ | beginner / intermediate / advanced |
| 3 | `estimatedDuration` | هل يوجد مدة تقديرية؟ | مثال: "3-5 minutes" |
| 4 | `nextStep` | هل الخطوة التالية في مسار الأمان مُعرَّفة؟ | معرّف أصل صالح |
| 5 | `downloadables` | هل الملفات القابلة للتنزيل مُرتبطة؟ | مصفوفة DownloadableRef |
| 6 | `translations` | هل جاهزية i18n مُوثَّقة؟ | none / partial / complete |
| 7 | `status` | هل الحالة دقيقة ومُحدَّثة؟ | planned / specification / in-progress / clinical-review / live / deprecated |

### مفتاح الرموز

| الرمز | المعنى |
|---|---|
| ✅ | موجود وكامل |
| ⚠️ | جزئي — الحقل موجود لكن باسم مختلف أو بقيمة غير مكتملة |
| ❌ | مفقود — الحقل غير موجود في السجل |

---

## نتائج التدقيق

### 1. grounding-54321 (تأريض 5-4-3-2-1)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. الأصل الأكثر أماناً لكن يجب توثيق عدم وجود مضادات استطباب. |
| `safetyLevel` | ⚠️ جزئي | الحقل موجود باسم `difficulty: 'beginner'` — نفس القيمة لكن اسم الحقل يختلف عن المواصفة. |
| `estimatedDuration` | ✅ موجود | `duration: '3-5 minutes'` |
| `nextStep` | ✅ موجود | `nextStep: 'a52'` — يُوجّه إلى A52 في مسار الأمان |
| `downloadables` | ✅ موجود | `grounding-pocket-card` (بطاقة التأريض الجيبية) — الحالة: `planned` |
| `translations` | ✅ موجود | `translations: 'complete'` — الأصل الوحيد بترجمة كاملة |
| `status` | ✅ موجود | `status: 'live'` — الأصل الوحيد المباشر |

**الامتثال:** 4✅ + 1⚠️ + 2❌ = **5.5 / 7 = 79%**

---

### 2. a52 (تنفس A52)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. **حرج:** A52 مُضاد استطباب لنوبات الهلع — يجب توثيقه رسمياً. |
| `safetyLevel` | ⚠️ جزئي | `difficulty: 'beginner'` — اسم الحقل يختلف عن المواصفة. |
| `estimatedDuration` | ✅ موجود | `duration: '3-5 minutes'` |
| `nextStep` | ✅ موجود | `nextStep: 'safe-place'` — يُوجّه إلى المكان الآمن |
| `downloadables` | ✅ موجود | `a52-breathing-card` (بطاقة التنفس A52) — الحالة: `planned` |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق لكن لم يُنفَّذ بعد |
| `status` | ✅ موجود | `status: 'clinical-review'` |

**الامتثال:** 4✅ + 1⚠️ + 2❌ = **5.5 / 7 = 79%**

---

### 3. safe-place (المكان الآمن)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. التخيل قد يُعمّق التفارق — يجب توثيقه. |
| `safetyLevel` | ⚠️ جزئي | `difficulty: 'beginner'` — اسم الحقل يختلف عن المواصفة. |
| `estimatedDuration` | ✅ موجود | `duration: '5-10 minutes'` |
| `nextStep` | ✅ موجود | `nextStep: 'body-scan'` — يُوجّه إلى مسح الجسد |
| `downloadables` | ✅ موجود | `safe-place-worksheet` (ورقة عمل المكان الآمن) — الحالة: `planned` |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق لكن لم يُنفَّذ بعد |
| `status` | ✅ موجود | `status: 'clinical-review'` |

**الامتثال:** 4✅ + 1⚠️ + 2❌ = **5.5 / 7 = 79%**

---

### 4. body-scan (مسح الجسد)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. التركيز على الجسد قد يُحفّز الهلع والتفارق — يجب توثيقه. |
| `safetyLevel` | ⚠️ جزئي | `difficulty: 'beginner'` — اسم الحقل يختلف عن المواصفة. |
| `estimatedDuration` | ✅ موجود | `duration: '10-15 minutes'` |
| `nextStep` | ✅ موجود | `nextStep: 'trigger-mapping'` — يُوجّه إلى خريطة المحفزات |
| `downloadables` | ✅ موجود | `body-awareness-worksheet` (ورقة عمل الوعي الجسدي) — الحالة: `planned` |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق لكن لم يُنفَّذ بعد |
| `status` | ✅ موجود | `status: 'clinical-review'` |

**الامتثال:** 4✅ + 1⚠️ + 2❌ = **5.5 / 7 = 79%**

---

### 5. what-trauma-does-to-the-body (ماذا يفعل الصدمة بالجسم)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. المحتوى قد يُحفّز الضيق — يجب توثيقه. |
| `safetyLevel` | ❌ مفقود | لا يوجد حقل `difficulty` أو `safetyLevel` — المقال التثقيفي لا يُصنَّف حسب المستوى. |
| `estimatedDuration` | ✅ موجود | `duration: '10-15 minutes'` |
| `nextStep` | ✅ موجود | `nextStep: 'grounding-54321'` — يُوجّه إلى التأريض |
| `downloadables` | ✅ موجود | `psychoeducation-pdf` (ملف التثقيف النفسي) — الحالة: `planned` |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق لكن لم يُنفَّذ بعد |
| `status` | ✅ موجود | `status: 'clinical-review'` |

**الامتثال:** 4✅ + 0⚠️ + 3❌ = **4 / 7 = 57%**

---

### 6. trigger-mapping (خريطة المحفزات)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. |
| `safetyLevel` | ❌ مفقود | لا يوجد حقل `difficulty` — ورقة العمل غير مُصنَّفة. |
| `estimatedDuration` | ❌ مفقود | لا يوجد حقل `duration` — يجب تقدير مدة الملء. |
| `nextStep` | ✅ موجود | `nextStep: 'safety-plan'` — يُوجّه إلى خطة الأمان |
| `downloadables` | ❌ مفقود | لا يوجد حقل `downloadables` — يجب ربط ورقة عمل قابلة للتنزيل. |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق |
| `status` | ✅ موجود | `status: 'planned'` |

**الامتثال:** 3✅ + 0⚠️ + 4❌ = **3 / 7 = 43%**

---

### 7. safety-plan (خطة الأمان)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. |
| `safetyLevel` | ❌ مفقود | لا يوجد حقل `difficulty` — ورقة العمل غير مُصنَّفة. |
| `estimatedDuration` | ❌ مفقود | لا يوجد حقل `duration` — يجب تقدير مدة الملء. |
| `nextStep` | ✅ موجود | `nextStep: 'a52'` — يُوجّه إلى A52 |
| `downloadables` | ❌ مفقود | لا يوجد حقل `downloadables` — يجب ربط خطة أمان قابلة للتنزيل. |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق |
| `status` | ✅ موجود | `status: 'planned'` |

**الامتثال:** 3✅ + 0⚠️ + 4❌ = **3 / 7 = 43%**

---

### 8. urge-log (سجل الدوافع)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. |
| `safetyLevel` | ❌ مفقود | لا يوجد حقل `difficulty`. |
| `estimatedDuration` | ❌ مفقود | لا يوجد حقل `duration`. |
| `nextStep` | ❌ مفقود | لا يوجد حقل `nextStep` — يجب تعريف مسار التعافي. |
| `downloadables` | ❌ مفقود | لا يوجد حقل `downloadables`. |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق |
| `status` | ✅ موجود | `status: 'planned'` |

**الامتثال:** 2✅ + 0⚠️ + 5❌ = **2 / 7 = 29%**

---

### 9. relapse-analysis (تحليل الانتكاس)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. |
| `safetyLevel` | ❌ مفقود | لا يوجد حقل `difficulty`. |
| `estimatedDuration` | ❌ مفقود | لا يوجد حقل `duration`. |
| `nextStep` | ❌ مفقود | لا يوجد حقل `nextStep`. |
| `downloadables` | ❌ مفقود | لا يوجد حقل `downloadables`. |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق |
| `status` | ✅ موجود | `status: 'planned'` |

**الامتثال:** 2✅ + 0⚠️ + 5❌ = **2 / 7 = 29%**

---

### 10. recovery-planning (تخطيط التعافي)

| الحقل | الحالة | ملاحظات |
|---|---|---|
| `contraindications` | ❌ مفقود | لا يوجد حقل `contraindications` في السجل. |
| `safetyLevel` | ❌ مفقود | لا يوجد حقل `difficulty`. |
| `estimatedDuration` | ❌ مفقود | لا يوجد حقل `duration`. |
| `nextStep` | ❌ مفقود | لا يوجد حقل `nextStep`. |
| `downloadables` | ❌ مفقود | لا يوجد حقل `downloadables`. |
| `translations` | ✅ موجود | `translations: 'none'` — مُوثَّق |
| `status` | ✅ موجود | `status: 'planned'` |

**الامتثال:** 2✅ + 0⚠️ + 5❌ = **2 / 7 = 29%**

---

## ملخص الامتثال

### نسبة الامتثال لكل أصل

| الأصل | ✅ | ⚠️ | ❌ | النسبة |
|---|---|---|---|---|
| grounding-54321 | 4 | 1 | 2 | 79% |
| a52 | 4 | 1 | 2 | 79% |
| safe-place | 4 | 1 | 2 | 79% |
| body-scan | 4 | 1 | 2 | 79% |
| what-trauma-does-to-the-body | 4 | 0 | 3 | 57% |
| trigger-mapping | 3 | 0 | 4 | 43% |
| safety-plan | 3 | 0 | 4 | 43% |
| urge-log | 2 | 0 | 5 | 29% |
| relapse-analysis | 2 | 0 | 5 | 29% |
| recovery-planning | 2 | 0 | 5 | 29% |

### نسبة الامتثال الإجمالية

| المقياس | القيمة |
|---|---|
| إجمالي الحقول المطلوبة | 70 (10 أصول × 7 حقول) |
| ✅ كامل | 30 |
| ⚠️ جزئي | 4 |
| ❌ مفقود | 36 |
| **الامتثال الإجمالي** | **(30 + 2) / 70 = 45.7%** |

> **ملاحظة:** ⚠️ يُحتسب كنصف نقطة (0.5) في الامتثال الإجمالي.

---

## الثغرات الحرجة

### 🔴 ثغرة #1: `contraindications` مفقود من جميع الأصول

**الخطورة:** عالية — مطلوب سريرياً وسابقاً قانونياً

لا يوجد حقل `contraindications` في واجهة `RecoveryAsset` أو في أي أصل. هذا يعني:

- **A52** مُضاد استطباب لنوبات الهلع لكن هذا غير موثَّق في السجل
- **المكان الآمن** قد يُعمّق التفارق لكن هذا غير موثَّق
- **مسح الجسد** قد يُحفّز الهلع لكن هذا غير موثَّق
- **المقال التثقيفي** قد يُحفّز الضيق لكن هذا غير موثَّق

**الإجراء المطلوب:** إضافة حقل `contraindications` إلى واجهة `RecoveryAsset` مع توثيق كل مضادات الاستطباب.

### 🔴 ثغرة #2: `safetyLevel` غير موحَّد

**الخطورة:** متوسطة — يُؤثر على سلامة المستخدم

السجل يستخدم حقل `difficulty` بدلاً من `safetyLevel`. و 5 من 10 أصول لا تملك أي تصنيف:

- ما يملك `difficulty`: grounding-54321, a52, safe-place, body-scan
- ما لا يملك: what-trauma-does-to-the-body, trigger-mapping, safety-plan, urge-log, relapse-analysis, recovery-planning

**الإجراء المطلوب:** توحيد اسم الحقل إلى `safetyLevel` وإضافة القيمة لكل الأصول.

### 🟡 ثغرة #3: أصول فئة تعافي الإباحية غير مكتملة

**الخطورة:** متوسطة — حالة `planned` تبرر النقص جزئياً

أصول `urge-log` و `relapse-analysis` و `recovery-planning` تمتلك فقط `translations` و `status`. جميع الحقول الأخرى مفقودة.

**الإجراء المطلوب:** ملء جميع الحقول المطلوبة قبل تحويل الحالة إلى `specification`.

---

## خطة الإصلاح

| الأولوية | الحقل | الإجراء | الأصول المتأثرة |
|---|---|---|---|
| P0 | `contraindications` | إضافة حقل إلى الواجهة + توثيق كل مضادات الاستطباب | جميع الأصول العشرة |
| P0 | `safetyLevel` | إعادة تسمية `difficulty` إلى `safetyLevel` أو إضافة حقل موازي | 6 أصول (التي تفتقر للحقل) |
| P1 | `downloadables` | إضافة ملفات قابلة للتنزيل لكل ورقة عمل | trigger-mapping, safety-plan, urge-log, relapse-analysis, recovery-planning |
| P1 | `estimatedDuration` | تقدير مدة الملء لكل ورقة عمل | trigger-mapping, safety-plan, urge-log, relapse-analysis, recovery-planning |
| P2 | `nextStep` | تعريف مسار التعافي لأصول فئة الإباحية | urge-log, relapse-analysis, recovery-planning |

---

## التوقيع السريري

| الحقل | القيمة |
|---|---|
| **المؤلف** | فريق التدقيق السريري — TRC |
| **مصدر البيانات** | `/var/www/tamkinly/src/registry/recovery-assets.ts` |
| **المراجعة** | مطلوبة قبل تحويل أي أصل إلى `live` |
| **الإصدار التالي** | إعادة التدقيق بعد إصلاح الثغرات |
