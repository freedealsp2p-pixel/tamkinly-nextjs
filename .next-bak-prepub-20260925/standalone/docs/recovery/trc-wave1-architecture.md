# TRC Wave 1 — خارطة البنية المعمارية

> **وثيقة معمارية** لنظام Tamkinly TRC (Trauma Recovery Content) — الموجة الأولى
>
> تاريخ الإنشاء: مارس 2025
> الحالة: مرجع تنفيذي لبناء Wave 1

---

## 1. Asset Map (خريطة الأصول)

خريطة شاملة لجميع أصول TRC في الموجة الأولى مع حالتها الحالية:

```
TRC Hub (/recovery/trc)
│
├── Grounding 5-4-3-2-1 (LIVE ✅)
│   Route: /recovery/trc/grounding
│   Type: interactive
│   Status: live
│
├── A52 Breathing (SPECIFICATION 📋)
│   Route: /recovery/trc/a52
│   Type: interactive
│   Status: specification → will become in-progress
│
├── Safe Place (PLANNED 📝)
│   Route: /recovery/trc/safe-place
│   Type: interactive
│   Status: planned
│
├── Body Scan (PLANNED 📝)
│   Route: /recovery/trc/body-scan
│   Type: interactive
│   Status: planned
│
└── What Trauma Does To The Body (PLANNED 📝)
    Route: /recovery/trc/what-trauma-does-to-the-body
    Type: psychoeducation
    Status: planned
```

### ملخص الحالات

| الأصل | النوع | الحالة | الأولوية |
|---|---|---|---|
| Grounding 5-4-3-2-1 | interactive | ✅ LIVE | — (مكتمل) |
| A52 Breathing | interactive | 📋 SPECIFICATION | P0 — التالي للبناء |
| Safe Place | interactive | 📝 PLANNED | P1 |
| Body Scan | interactive | 📝 PLANNED | P2 |
| What Trauma Does To The Body | psychoeducation | 📝 PLANNED | P3 |

---

## 2. Next Step Matrix (مصفوفة الخطوة التالية)

مصفوفة تُحدّد التدفق السريري المقترح بين الأصول — كل أصل يُوصي بالأصل التالي بناءً على المنطق العلاجي:

| الأصل الحالي | الخطوة التالية المقترحة | السبب السريري |
|---|---|---|
| Grounding | A52 Breathing | بعد التأريض الحسي، التنفس الموجّه يُعمّق التنظيم العصبي |
| A52 Breathing | Safe Place | بعد تنظيم التنفس، بناء ملاذ ذهني يُثبّت الاستقرار |
| Safe Place | Body Scan | بعد تأسيس المكان الآمن، مسح الجسد يُعمّق الوعي الجسدي |
| Body Scan | العودة لـ TRC Hub | اكتمال Safety Layer — المستخدم جاهز لاختيار الخطوة التالية |
| What Trauma Does To The Body | Grounding | الفهم أولاً → التطبيق الفوري |

### نقطة دخول المقال (Article Entry Point)

المقال التعليمي النفسي يُمثل نقطة دخول بديلة لمن يحتاج الفهم قبل التطبيق:

```
What Trauma Does To The Body (مقال)
↓
Grounding (تأريض)
↓
A52 (تنفس)
↓
Safe Place (مكان آمن)
↓
Body Scan (مسح جسد)
↓
TRC Hub
```

> **ملاحظة**: هذا التدفق اقتراحي فقط — المستخدم حر في اختيار أي أصل في أي وقت من TRC Hub. لا يُوجد إلزام أو ترتيب إجباري.

---

## 3. Shared Components Matrix (مصفوفة المكونات المشتركة)

مصفوفة توضح المكونات المشتركة بين الأصول وما يحتاجه كل أصل:

| المكون | المصدر | Grounding | A52 | Safe Place | Body Scan | Article |
|---|---|---|---|---|---|---|
| RecoveryShell | system/ | ✅ | ✅ | ✅ | ✅ | ✅ |
| TherapeuticExit | system/ (via Shell) | ✅ | ✅ | ✅ | ✅ | ❌ (standard) |
| RecoveryBreadcrumb | system/ | ✅ | ✅ | ✅ | ✅ | ✅ |
| RecoveryHeader | system/ | ✅ | ✅ | ✅ | ✅ | ✅ |
| RecoveryCard | system/ | ❌ | ❌ | ❌ | ❌ | ❌ |
| SuggestedNextStep | NEW - must create | ❌ | ✅ | ✅ | ✅ | ✅ |
| TherapeuticIntro | NEW - must create | ❌ | ✅ | ✅ | ✅ | ❌ |
| TherapeuticCompletion | NEW - must create | ❌ | ✅ | ✅ | ✅ | ❌ |
| MedicalDisclaimer | existing | ✅ | ✅ | ✅ | ✅ | ✅ |

### ملاحظات على المصفوفة

- **RecoveryShell**: يُغلّف كل أصل، يوفّر `TherapeuticExit` تلقائياً عند `sectionType="therapeutic"`
- **RecoveryCard**: غير مُستخدم حالياً في أي أصل — يُحتمل استخدامه في TRC Hub
- **SuggestedNextStep**: مكون جديد يجب بناؤه — يظهر في نهاية كل أصل تفاعلي وفي المقال
- **TherapeuticIntro**: مكون جديد — شاشة بداية علاجية للأصول التفاعلية
- **TherapeuticCompletion**: مكون جديد — شاشة إتمام علاجية (اعتراف بالجهد، لا احتفال)
- **Grounding** لا يستخدم المكونات الجديدة لأنه مُنجز بالفعل (LIVE) — لا يُعاد بناؤه

---

## 4. New Components to Build (مكونات جديدة يجب بناؤها)

ثلاثة مكونات جديدة يجب بناؤها قبل أو أثناء بناء A52 Breathing:

### 4.1 SuggestedNextStep

**الغرض**: مكون قابل لإعادة الاستخدام يعرض الأصل العلاجي التالي المُقترح بعد إتمام تمرين

**المواصفات**:

| الخاصية | التفاصيل |
|---|---|
| Purpose | عرض الأصل العلاجي التالي المُقترح بعد إتمام تمرين |
| Props | `currentAssetId: string`, `nextAssetId: string`, `locale: Locale` |
| Data Source | TRC_ASSETS registry — للحصول على العناوين والمسارات |
| Render | بطاقة تحتوي: أيقونة، عنوان، وصف، وزر "Continue" (متابعة) |
| sectionType | `therapeutic` — يحترم طبيعة القسم العلاجي |

**القيود الحرجة**:
- ❌ لا يُستخدم أي gamification (لا نقاط، لا شارات، لا مستويات)
- ❌ لا يُستخدم أي ضغط أو إلزام — اقتراح فقط
- ✅ يجب أن يُظهر السبب السريري للاقتراح (اختياري)
- ✅ يجب أن يُوفر خيار "العودة للرئيسية" بجانب "متابعة"

**مثال الاستخدام**:
```tsx
<SuggestedNextStep
  currentAssetId="a52"
  nextAssetId="safe-place"
  locale={locale}
/>
```

---

### 4.2 TherapeuticIntro

**الغرض**: شاشة بداية علاجية قابلة لإعادة الاستخدام للأصول التفاعلية

**المحتويات**:
- عنوان الأصل (title)
- وصف مختصر (description)
- المدة المتوقعة (duration)
- مستوى الصعوبة (difficulty)
- تنويه الأمان (Safety Notice)
- زر البدء (start button)

**المواصفات**:

| الخاصية | التفاصيل |
|---|---|
| Props | `assetId: string`, `onBegin: () => void`, `onGoBack: () => void`, `locale: Locale` |
| Data Source | TRC_ASSETS registry — للبيانات الوصفية |
| Safety Notice | تنويه الأمان — إلزامي في كل شاشة بداية |
| Go Back | خيار "لن أبدأ الآن" — بدون شعور بالذنب |

**القيود الحرجة**:
- ✅ يجب أن يحتوي على تنويه الأمان (Safety Notice) واضح ومرئي
- ✅ يجب أن يُوفر خيار "العودة" (لن أبدأ الآن) بشكل واضح وبارز
- ❌ لا يُستخدم أي ضغط أو حثّ على البدء
- ❌ لا يُستخدم أي لوم إذا اختار المستخدم عدم البدء
- ✅ اللغة يجب أن تكون محايدة وداعمة

**مثال الاستخدام**:
```tsx
<TherapeuticIntro
  assetId="a52"
  onBegin={() => dispatch({ type: 'BRIDGE' })}
  onGoBack={() => router.push('/recovery/trc')}
  locale={locale}
/>
```

---

### 4.3 TherapeuticCompletion

**الغرض**: شاشة إتمام علاجية قابلة لإعادة الاستخدام للأصول التفاعلية

**المحتويات**:
- رسالة اعتراف بالجهد (acknowledgment message)
- مساحة تأمل اختيارية (optional reflection textarea)
- اقتراحات للخطوة التالية (next step suggestions)

**المواصفات**:

| الخاصية | التفاصيل |
|---|---|
| Props | `assetId: string`, `completedCycles?: number`, `totalCycles?: number`, `locale: Locale` |
| Acknowledgment | اعتراف بالجهد، لا احتفال |
| Reflection | textarea اختياري — لا يُلزم المستخدم بالكتابة |
| Next Step | يتضمن SuggestedNextStep |

**القيود الحرجة**:
- ❌ لا يُستخدم أي gamification (لا نقاط، لا شارات، لا مستويات)
- ❌ لا يُستخدم أي confetti أو بالونات أو تصفيق
- ❌ لا يُقال "أحسنت!" أو "ممتاز!" — لغة اعتراف فقط
- ✅ اللغة: "شكراً لك على مشاركتك هذه اللحظة" أو ما شابه
- ✅ يتضمن SuggestedNextStep كاقتراح (لا إلزام)
- ✅ مساحة التأمل اختيارية تماماً — لا يُوجد حقل إلزامي

**مثال الاستخدام**:
```tsx
<TherapeuticCompletion
  assetId="a52"
  completedCycles={3}
  totalCycles={3}
  locale={locale}
/>
```

---

## 5. Asset Type Classification (تصنيف نوع الأصل)

### Interactive Therapeutic Assets (أصول علاجية تفاعلية)

الأصول التفاعلية هي أدوات علاجية — ليست صفحات تعليمية. تستخدم State Machine لإدارة التدفق:

| الأصل | التدفق |
|---|---|
| A52 Breathing | State Machine → Breathing Cycle → Therapeutic Flow → Completion State |
| Safe Place | Guided Visualization Experience → Sensory Building → Completion |
| Body Scan | Interactive Body Scan Journey → Sequential Body Parts → Completion |

### ⚠️ القاعدة الحرجة (CRITICAL RULE)

> هذه الأصول **ليست صفحات تعليمية**. هي أدوات علاجية تفاعلية تحتوي على:

- **State Machine**: `entry → bridge → preparation → core → completion`
- **Timer/Progress Tracking**: تتبع الوقت والتقدم داخل التمرين
- **TherapeuticExit Integration**: تكامل مع مخرج علاجي آمن
- **SuggestedNextStep**: اقتراح الخطوة التالية عند الإتمام
- **لا يُوجد أي gamification**: ممنوع أي عنصر تعويضي

### State Machine العامة للأصول التفاعلية

```
┌─────────┐     ┌─────────┐     ┌──────────────┐     ┌──────────┐     ┌────────────┐
│  ENTRY   │────▶│  BRIDGE │────▶│ PREPARATION  │────▶│   CORE   │────▶│ COMPLETION │
│ (البدء)  │     │ (جسر)   │     │ (التحضير)    │     │ (الأساس) │     │ (الإتمام)  │
└─────────┘     └─────────┘     └──────────────┘     └──────────┘     └────────────┘
     │                                                                               │
     │                    TherapeuticExit (available at any phase)                     │
     └───────────────────────────────────────────────────────────────────────────────▶│
                                                                                    (خروج آمن)
```

**وصف المراحل**:

| المرحلة | الوصف | المكون |
|---|---|---|
| Entry | شاشة بداية — TherapeuticIntro | EntryScreen.tsx |
| Bridge | انتقال هادئ — تحضير ذهني | BridgeScreen.tsx |
| Preparation | تحضير مفصّل — تعليمات | PreparationPhase.tsx |
| Core | التجربة العلاجية الأساسية | {CorePhase}.tsx |
| Completion | إتمام — TherapeuticCompletion | CompletionScreen.tsx |

---

### Psychoeducation Asset (أصل تعليمي نفسي)

| الأصل | الوصف |
|---|---|
| What Trauma Does To The Body | مقال يحتوي على أقسام، محتوى سريري، ووسائل بصرية |

**خصائص الأصل التعليمي**:
- يستخدم `sectionType="standard"` (وليس therapeutic)
- لا يحتاج State Machine
- يربط بالأصول التفاعلية داخل المحتوى
- لا يحتاج TherapeuticIntro أو TherapeuticCompletion
- يستخدم SuggestedNextStep في نهاية المقال

---

## 6. File Structure Convention (هيكل الملفات)

### Interactive Assets (A52, Safe Place, Body Scan)

هيكل الملفات للأصول التفاعلية يتبع نمطاً موحّداً:

```
src/app/recovery/trc/{asset-slug}/
├── layout.tsx      # RecoveryShell sectionType="therapeutic"
└── page.tsx        # Main component with phase manager

src/lib/recovery/{asset-id}/
├── reducer.ts      # State machine (pure reducer)
├── types.ts        # TypeScript types
└── constants.ts    # Timing constants, etc.

src/components/recovery/{asset-id}/
├── EntryScreen.tsx
├── BridgeScreen.tsx
├── PreparationPhase.tsx
├── {CorePhase}.tsx    # The main therapeutic experience
├── CompletionScreen.tsx
└── {SpecificComponents}.tsx
```

**مثال مفصّل — A52 Breathing**:

```
src/app/recovery/trc/a52/
├── layout.tsx
└── page.tsx

src/lib/recovery/a52/
├── reducer.ts
├── types.ts
└── constants.ts

src/components/recovery/a52/
├── EntryScreen.tsx
├── BridgeScreen.tsx
├── PreparationPhase.tsx
├── BreathingCycle.tsx
├── CompletionScreen.tsx
└── BreathCircle.tsx
```

**مثال مفصّل — Safe Place**:

```
src/app/recovery/trc/safe-place/
├── layout.tsx
└── page.tsx

src/lib/recovery/safe-place/
├── reducer.ts
├── types.ts
└── constants.ts

src/components/recovery/safe-place/
├── EntryScreen.tsx
├── BridgeScreen.tsx
├── PreparationPhase.tsx
├── GuidedVisualization.tsx
├── SensoryBuilder.tsx
├── CompletionScreen.tsx
└── SafePlaceCanvas.tsx
```

**مثال مفصّل — Body Scan**:

```
src/app/recovery/trc/body-scan/
├── layout.tsx
└── page.tsx

src/lib/recovery/body-scan/
├── reducer.ts
├── types.ts
└── constants.ts

src/components/recovery/body-scan/
├── EntryScreen.tsx
├── BridgeScreen.tsx
├── PreparationPhase.tsx
├── BodyScanJourney.tsx
├── BodyPartSelector.tsx
├── CompletionScreen.tsx
└── BodyMap.tsx
```

---

### Psychoeducation Assets

هيكل الملفات للأصول التعليمية أبسط — لا يحتاج State Machine:

```
src/app/recovery/trc/{article-slug}/
├── layout.tsx      # RecoveryShell sectionType="standard"
└── page.tsx        # Article page
```

**مثال مفصّل — What Trauma Does To The Body**:

```
src/app/recovery/trc/what-trauma-does-to-the-body/
├── layout.tsx
└── page.tsx
```

---

## 7. Color System (نظام الألوان)

نظام الألوان العلاجي لـ TRC — ألوان هادئة ومُهدئة:

| Element | Color | Hex |
|---|---|---|
| Primary | Teal | #1F6F78 |
| Accent | Mint | #3DD4B0 |
| Text | Dark | #0F1C2E |
| Background Light | Soft White | #F5F9F8 |
| Background Dark | Deep Black | #0A1A1F |

### مبادئ استخدام الألوان

- **Primary (Teal)**: يُستخدم للعناوين، الأزرار الرئيسية، والعناصر المهمة
- **Accent (Mint)**: يُستخدم للتأكيد، التنبيهات الخفيفة، والأيقونات
- **Text (Dark)**: النص الأساسي — يُستخدم على خلفيات فاتحة
- **Background Light**: الخلفية الافتراضية في الوضع الفاتح
- **Background Dark**: الخلفية الافتراضية في الوضع الداكن

> **ملاحظة**: الألوان مُختارة بعناية لتوفير شعور بالأمان والهدوء — لا تُستخدم ألوان حادة أو مُثيرة.

---

## 8. Forbidden Patterns (أنماط ممنوعة)

> ⚠️ هذه القيود **غير قابلة للتفاوض** — يجب الالتزام بها في كل مرحلة من مراحل التطوير.

### أنماط ممنوعة في التصميم والتفاعل

| النمط الممنوع | السبب |
|---|---|
| ❌ Gamification (نقاط، شارات، مستويات، XP، streaks) | يُحوّل التجربة العلاجية إلى لعبة — يُضاد الهدف السريري |
| ❌ Celebration animations (confetti، بالونات، تصفيق) | يُشعر المستخدم بالضغط إذا لم "يحتفل" — يُناقض الاحترام العلاجي |
| ❌ Spiritual imagery (lotus، بخور، mandalas، شموع) | يُمثل تقليداً ثقافياً محدداً — لا يُناسب الجميع |
| ❌ Marketing language ("غيّر حياتك"، "الحل"، "الأفضل") | يُقدّم وعوداً لا يمكن الوفاء بها — يُضلّل المستخدم |
| ❌ Blame language ("لم تُكمل") | يُسبب شعوراً بالذنب — يُناقض مبدأ الأمان العلاجي |
| ❌ Healing promises ("ستشعر بتحسّن كبير") | يُقدم وعوداً سريرية — لا يمكن ضمان النتائج |
| ❌ Social comparison ("أنت أفضل من 80%") | يُقارن المستخدم بآخرين — يُناقض الخصوصية والأمان |

### أنماط ممنوعة في التطوير

| النمط الممنوع | السبب |
|---|---|
| ❌ New Prisma models أو database tables | لا يُخزّن بيانات مستخدم علاجية — حماية الخصوصية |
| ❌ Recovery Dashboard أو Progress APIs لـ TRC | لا يُتبع تقدم المستخدم العلاجي — حماية الخصوصية |
| ❌ بناء Wave 2/3 assets قبل إتمام Wave 1 | يُشتّت التركيز — يجب إتمام الموجة الأولى أولاً |

### لغة مُسموحة vs ممنوعة

| ❌ ممنوع | ✅ مُسموح |
|---|---|
| "أحسنت! أكملت التمرين!" | "شكراً لك على مشاركتك هذه اللحظة" |
| "لم تُكمل الجلسة" | "لا بأس — يمكنك العودة متى شئت" |
| "مستوى متقدم" | "تجرِبة أعمق" |
| "ستشعر بتحسّن كبير" | "قد تساعدك هذه التجرِبة" |
| "أنت أفضل من 80% من المستخدمين" | (لا يُوجد مقارنة) |

---

## 9. Translation Key Structure (هيكل مفاتيح الترجمة)

جميع أصول TRC تستخدم مفاتيح ترجمة مُتداخلة تحت `recovery.trc` في `messages/ar.json` و `messages/en.json`.

### الهيكل العام

```
recovery.trc.{asset-id}.entry.*
recovery.trc.{asset-id}.bridge.*
recovery.trc.{asset-id}.breathing.* (or core phase)
recovery.trc.{asset-id}.completion.*
recovery.trc.{asset-id}.exit.*
```

### مثال مفصّل — A52 Breathing

```json
{
  "recovery": {
    "trc": {
      "a52": {
        "entry": {
          "title": "تنفس A52",
          "description": "تقنية تنفس موجّهة لتنظيم الجهاز العصبي",
          "duration": "5-10 دقائق",
          "difficulty": "مبتدئ",
          "safetyNotice": "إذا شعرت بأي انزعاج، يمكنك التوقف في أي وقت",
          "beginButton": "أبدأ الآن",
          "goBackButton": "لن أبدأ الآن"
        },
        "bridge": {
          "title": "هيّا نبدأ بهدوء",
          "instruction": "أغمض عينيك وخذ نفساً عميقاً"
        },
        "breathing": {
          "inhale": "شهيق",
          "hold": "حبس",
          "exhale": "زفير",
          "cyclesRemaining": "الدورات المتبقية: {count}",
          "pauseButton": "إيقاف مؤقت",
          "resumeButton": "متابعة"
        },
        "completion": {
          "acknowledgment": "شكراً لك على مشاركتك هذه اللحظة",
          "reflection": "كيف تشعر الآن؟ (اختياري)",
          "reflectionPlaceholder": "اكتب هنا إذا شئت...",
          "nextStep": "الخطوة التالية المقترحة"
        },
        "exit": {
          "title": "هل تريد التوقف؟",
          "message": "لا بأس بالتوقف — يمكنك العودة متى شئت",
          "confirmButton": "نعم، أتوقف",
          "cancelButton": "أواصل"
        }
      }
    }
  }
}
```

### مثال مفصّل — Safe Place

```json
{
  "recovery": {
    "trc": {
      "safe-place": {
        "entry": {
          "title": "المكان الآمن",
          "description": "بناء ملاذ ذهني يُثبّت الاستقرار العاطفي",
          "duration": "8-12 دقيقة",
          "difficulty": "مبتدئ",
          "safetyNotice": "إذا شعرت بأي انزعاج، يمكنك التوقف في أي وقت",
          "beginButton": "أبدأ الآن",
          "goBackButton": "لن أبدأ الآن"
        },
        "bridge": {
          "title": "تخيّل مكاناً تشعر فيه بالأمان",
          "instruction": "أغمض عينيك واسمح لنفسك بالاسترخاء"
        },
        "visualization": {
          "imaginePlace": "تخيّل مكانك الآمن...",
          "addSight": "ماذا ترى؟",
          "addSound": "ماذا تسمع؟",
          "addTouch": "ماذا تشعر باللمس؟",
          "addSmell": "ماذا تشمّ؟"
        },
        "completion": {
          "acknowledgment": "شكراً لك على بناء هذا المكان الآمن",
          "reflection": "كيف كان شعورك في مكانك الآمن؟ (اختياري)",
          "reflectionPlaceholder": "اكتب هنا إذا شئت...",
          "nextStep": "الخطوة التالية المقترحة"
        },
        "exit": {
          "title": "هل تريد التوقف؟",
          "message": "لا بأس بالتوقف — يمكنك العودة متى شئت",
          "confirmButton": "نعم، أتوقف",
          "cancelButton": "أواصل"
        }
      }
    }
  }
}
```

### مفاتيح المكونات المشتركة

المكونات المشتركة الجديدة (SuggestedNextStep, TherapeuticIntro, TherapeuticCompletion) لها مفاتيح مستقلة:

```json
{
  "recovery": {
    "trc": {
      "shared": {
        "suggestedNextStep": {
          "title": "الخطوة التالية",
          "continueButton": "متابعة",
          "goHomeButton": "العودة للرئيسية",
          "clinicalReason": "السبب السريري"
        },
        "therapeuticIntro": {
          "safetyNotice": "تنويه الأمان",
          "duration": "المدة المتوقعة",
          "difficulty": "مستوى الصعوبة",
          "beginButton": "أبدأ الآن",
          "goBackButton": "لن أبدأ الآن"
        },
        "therapeuticCompletion": {
          "acknowledgment": "شكراً لك على مشاركتك هذه اللحظة",
          "reflection": "كيف تشعر الآن؟ (اختياري)",
          "reflectionPlaceholder": "اكتب هنا إذا شئت..."
        }
      }
    }
  }
}
```

---

## ملخص تنفيذي (Executive Summary)

### ترتيب البناء المقترح

| الترتيب | المهمة | المكونات المتأثرة |
|---|---|---|
| 1 | بناء `SuggestedNextStep` | مكون جديد — يُستخدم في كل أصل |
| 2 | بناء `TherapeuticIntro` | مكون جديد — يُستخدم في الأصول التفاعلية |
| 3 | بناء `TherapeuticCompletion` | مكون جديد — يُستخدم في الأصول التفاعلية |
| 4 | بناء A52 Breathing | أول أصل تفاعلي كامل |
| 5 | بناء Safe Place | ثاني أصل تفاعلي |
| 6 | بناء Body Scan | ثالث أصل تفاعلي |
| 7 | بناء What Trauma Does To The Body | أصل تعليمي نفسي |

### المبادئ الأساسية

1. **الأمان أولاً**: كل تفاعل يجب أن يحترم الأمان العلاجي للمستخدم
2. **لا تعقب**: لا يُخزّن أي بيانات علاجية — حماية الخصوصية
3. **الاعتراف لا الاحتفال**: شاشات الإتمام تعترف بالجهد، لا تحتفل
4. **الاقتراح لا الإلزام**: الخطوة التالية اقتراح، لا إلزام
5. **المحتوى قبل التقنية**: المحتوى العلاجي هو الأساس — التقنية تخدمه

---

> **نهاية الوثيقة** — TRC Wave 1 Architecture Document
> يجب الرجوع لهذه الوثيقة عند كل قرار تصميمي أو تنفيذي في Wave 1
