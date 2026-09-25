# مخطط الأصول — TRC Asset Blueprint

> **المسار / Track:** Trauma Recovery Center (TRC)
> **المرجع السريري / Clinical Reference:** trc-methodology.md
> **الطبقة الهندسية المشتركة:** RecoveryShell (sectionType="therapeutic")

---

## أ) الفروقات الجوهرية عن Porn Recovery

| البعد | Porn Recovery | TRC |
|-------|-------------|-----|
| **TherapeuticExit** | غير مطلوب | **مطلوب** في كل أصل علاجي |
| **sectionType** | `standard` | `therapeutic` |
| **تحذير الصدمة** | غير مطلوب | **مطلوب** قبل كل محتوى علاجي |
| **إعادة الارتكاز** | غير مطلوب | **مطلوب** — تقنية ۵-۴-۳-۲-۱ معروضة دائمًا |
| **التوجيه للمختص** | نادر | **إلزامي** في كل أداة ذاتية |
| **النبرة** | إخوية عملية | سريرية مُصدِّقة مُهدئة |
| **التركيز** | التحفيز والإجراء | الاستقرار والأمان والمعالجة |
| **مخاطر التفارق** | غير موجود | **موجود** — بروتوكولات صارمة |
| **مخاطر التجمد** | غير موجود | **موجود** — بروتوكولات صارمة |

---

## ب) البيانات الوصفية — Asset Metadata

```typescript
interface TRCAsset {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  
  type: 'stabilization' | 'safety' | 'psychoeducation' | 'assessment' | 'journal';
  stage: 'understanding' | 'stabilization' | 'safety' | 'processing' | 'reconstruction';
  format: 'interactive' | 'printable-pdf' | 'article' | 'guided-exercise';
  
  audience: 'adult-survivor' | 'parent' | 'child-via-parent';
  
  // السلامة
  requiresTherapeuticExit: boolean;   // دائمًا true للأصول العلاجية
  traumaWarning: boolean;                // دائمًا true
  groundingAvailable: boolean;           // دائمًا true
  therapistReferral: boolean;            // true لكل الأدوات الذاتية
  
  status: 'available' | 'planned' | 'coming-soon';
  i18n: boolean;
  route?: string;
  downloadUrl?: string;
}
```

---

## ج) أنواع الأصول المسموحة

| النوع | الوصف | أمثلة | القالب |
|--------|-------|--------|-------|
| **stabilization** | تمرين لتنظيم الجهاز العصبي | A52، Box Breathing، الارتكاز | trc-methodology.md (قسم ط) |
| **safety** | خطة أمان أو بروتوكول طوارئ | خطة الأمان الشخصية | trc-worksheet-template.md |
| **psychoeducation** | مقال تثقيفي عن جانب من الصدمة | EMDR، TF-CBT، العلاج الجسدي | trc-article-template.md |
| **assessment** | أداة تقييم | فاحص الحالة (هل أنت مستقر؟) | — |
| **journal** | أدوات كتابة موجهة | يوميات التعافي (Prompts) | trc-worksheet-template.md |

---

## د) بروتوكولات السلامة الإلزامية — Safety Protocols

### ۱. TherapeuticExit
- زر سهم خروج ثابت (bottom-right).
- تأكيد بالحوار: "هل تريد مغادرة هذا التمرين؟".
- دعم مفتاح Escape.
- اللون: #1F6F78.

### ۲. تحذير الصدمة — Trauma Content Warning
نص يُعرض قبل كل أصل علاجي:
```
[!تحذير]
قد تحتوي هذه الصفحة على محتوى يُذكّر بتجارب صادمة.
تذكّر: يمكنك المغادرة في أي لحظة عبر زر الخروج أو مفتاح Escape.
إذا كانت الأعراض شديدة، تواصل مع معالج صدمات أو خط طوارئ.
```

### ۳. إعادة الارتكاز — Grounding Reset
زر أو قسم ثابت يعرض:
- تقنية ۵-۴-۳-۲-۱ خطوة بخطوة.
- "خذ نفسًا عميقًا. سمِّ ۵ أشياء تراها الآن."

### ۴. التوجيه للمختص — Therapist Referral
نص في كل أداة ذاتية:
```
هذه الأداة داعمة ذاتيًا ولا تُغني عن علاج متخصص.
إذا كانت الأعراض شديدة (نوبات هلع، ذكريات غامرة، أفكار إيذاء النفس)،
تواصل فورًا مع معالج صدمات أو خدمة طوارئ نفسية.
```

---

## هـ) النبرة واللغة — Tone Rules

### المسموح
- تصديق التجربة: "أنا أصدقك"
- شرح علمي دقيق: "الجهاز العصبي تعرّض لصدمة تتجاوز قدرته على المعالجة"
- تمكين لطيف: "التعافي يمكن أن يكون اختيارك"
- لا ضغط: "يمكنك أن تقول لا أريد الكلام الآن"

### الممنوع
- ❌ لوم الضحية أو التلميح بمسؤوليتها
- ❌ وعود شفاء: "ستشفى تمامًا"
- ❌ إجبار على الكلام أو المواجهة
- ❌ نشر التفاصيل: "حتى في سياق العِبرة"
- ❌ تشخيص: لا نقول "لديك PTSD" بل "أعراض مشابهة لما يُسمى PTSD"

---

## و) مراجعة الجودة — Quality Checklist

- [ ] مستخرج من المادة العلمية لصدمات التحرّش
- [ ] TherapeuticExit مفعّل (sectionType = therapeutic)
- [ ] تحذير صدمة موجود في البداية
- [ ] إعادة ارتكاز متاحة
- [ ] التوجيه للمختص موجود
- [ ] النبرة سريرية مُصدِّقة لا إخوية
- [ ] لا وعود شفاء، لا لوم، لا ضغط
- [ ] ثنائي اللغة (ar + en)
- [ ] بروتوكولات التفارق والتجمد مُراعاة

---

*إصدار ۱.۰ — مشتق من trc-methodology.md والمادة العلمية*
*تاريخ: ۲۰۲۵-۰۷-۲۶*