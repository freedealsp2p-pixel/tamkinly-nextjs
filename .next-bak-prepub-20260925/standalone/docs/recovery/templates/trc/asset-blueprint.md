# TRC Asset Blueprint — مخطط أصول التعافي من الصدمات

> **المسار / Track:** TRC (Trauma Recovery / التعافي من الصدمات)
> **المرجع السريري / Clinical Reference:** docs/recovery/frameworks/trc-framework.md
> **الطبقة الهندسية المشتركة:** RecoveryShell (sectionType="therapeutic")

---

## أ) الفروقات الجوهرية عن مسار Porn Recovery

| البعد | Porn Recovery | TRC |
|-------|-------------|-----|
| **TherapeuticExit** | غير مطلوب | **مطلوب دائمًا** |
| **sectionType** | `standard` | `therapeutic` |
| **مخاطر التفارق** | غير موجود | **موجود — بروتوكول إلزامي** |
| **مخاطر التجمد** | غير موجود | **موجود — بروتوكول إلزامي** |
| **الذكريات الاقتحامية** | غير موجود | **موجود — بروتوكول إلزامي** |
| **نوبات الهلع** | غير موجود | **موجود — بروتوكول إلزامي** |
| **النبرة** | إخوية عملية | سريرية/علاجية |
| **التركيز** | التحفيز والإجراء والتتبع | الأمان والتنظيم والاستقرار |
| **الإيقاع** | سريع ومباشر | بطيء ومتدرج |
| **تحذيرات المحتوى** | غير مطلوبة | **مطلوبة قبل كل محتوى قد يُحرِّك** |

---

## ب) البيانات الوصفية لكل أصل

```typescript
interface TRCAsset {
  id: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  
  type: 'therapeutic-exercise' | 'safety-plan' | 'grounding' | 'psychoeducation' | 'worksheet' | 'tool';
  stage: 'safety' | 'regulation' | 'integration';
  format: 'interactive' | 'printable-pdf' | 'article' | 'checklist';
  
  audience: 'survivor-adult' | 'survivor-child' | 'parent' | 'therapist';
  status: 'available' | 'planned' | 'coming-soon';
  i18n: boolean; // دائمًا true
  
  route?: string;
  downloadUrl?: string;
  
  // TRC-specific fields
  sectionType: 'therapeutic'; // دائمًا therapeutic
  requiresTherapeuticExit: true; // دائمًا true
  contentWarning?: string; // تحذير محتوى إن وُجد
  safetyProtocols: string[]; // قائمة بروتوكولات السلامة المطلوبة
  contraindications?: string[]; // موانع الاستخدام
  methodology: 'trc';
}
```

---

## ج) أنواع الأصول المسموحة

| النوع | الوصف | أمثلة | القالب المرجعي |
|-------|-------|--------|-------------|
| **therapeutic-exercise** | تمرين علاجي تفاعلي | A52 Breathing, Body Scan, Safe Place | trc-framework.md |
| **safety-plan** | خطة أمان | Safety Plan, Parents Guide | trc-worksheet-template.md |
| **grounding** | تمرين ارتكاز | 5-4-3-2-1, Grounding Techniques | trc-framework.md |
| **psychoeducation** | مقال تثقيفي | أثر الصدمة، خيارات العلاج | trc-article-template.md |
| **worksheet** | ورقة عمل | Trigger Map, Thought Reframing | trc-worksheet-template.md |
| **tool** | أداة تفاعلية | Regulation Toolkit, EFT | trc-framework.md |

---

## د) قواعد المحتوى

### اللغة المسموحة
- آمنة ومُهَدِّئة: "أنا أصدقك"
- لا إكراه: "يمكنك أن تقول لا أريد الكلام الآن"
- مُصدِّقة: "خوفك مفهوم في علم الصدمة"
- علمية متعاطفة: "دماغك عالق في وضعية نجاة"
- تمكينية: "أنا ناجٍ ولست مجرد ضحية"

### اللغة الممنوعة
- ❌ لغة إكراه أو ضغط
- ❌ وعود شفاء سريع
- ❌ لومة أو إدانة
- ❌ تفاصيل صادمة غير ضرورية
- ❌ لغة "تمام كده" أو تقليل من شدة الأعراض
- ❌ توجيه الناجي للاسترجاع القسري

---

## هـ) متطلبات السلامة الإلزامية

### قبل المحتوى
- **تحذير المحتوى:** إن كان المحتوى قد يُحرِّك ذكريات، ضع تحذيرًا واضحًا قبل البداية.
- **تأكيد الأمان:** رسالة قصيرة: "أنت في مكان آمن الآن."

### أثناء المحتوى
- **TherapeuticExit:** دائمًا مرئي في الزاوية.
- **تأمين الارتكاز:** إمكانية الوصول لتقنيات الارتكاز في أي لحظة.
- **التحقق من الحالة:** أسئلة دورية: "كيف تشعر الآن؟"

### بعد المحتوى
- **تثبيت:** تمرين إغلاق (تنفس أو ارتكاز).
- **رسالة تمكين:** عبارة إيجابية من المادة.
- **خطة ما بعد الجلسة:** ماذا تفعل إذا ظهرت أعراض لاحقًا.

---

## و) مراجعة الجودة

- [ ] مستخرج من المادة العلمية
- [ ] TherapeuticExit مفعّل (sectionType = therapeutic)
- [ ] النبرة سريرية/علاجية لا إخوية
- [ ] تحذيرات محتوى موجودة إن لزم
- [ ] بروتوكولات السلامة مُحدَّدة
- [ ] موانع الاستخدام مُحدَّدة
- [ ] ثنائي اللغة (ar + en)
- [ ] لا وعود شفاء، لا إكراه، لا لوم

---

*إصدار ۱.٠ — مشتق من trc-framework.md والمادة العلمية*
*الحالة: Active Build Track*
