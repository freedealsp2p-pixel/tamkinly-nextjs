# تقرير جرد محتوى Porn Recovery الموجود على السيرفر

**التاريخ:** 2025-07-26  
**السيرفر:** 192.3.218.191:2222  
**المسار:** `/var/www/tamkinly/src/app/recovery/porn-recovery/` + `/var/www/tamkinly/src/components/recovery/` + `/var/www/tamkinly/src/registry/`  
**الطريقة:** SSH/SFTP (paramiko) → قراءة مباشرة من السيرفر

---

## ملخص تنفيذي

- **عدد الملفات:** 20 ملف (TSX/TS)
  - ملفات المسار (`app/recovery/porn-recovery/`): 1
  - مكونات المحتوى (`components/recovery/`): 18
  - سجل الأصول (`registry/`): 1
- **إجمالي الأسطر:** 3,291 سطر
- **مراحل التعافي المُغطَّاة:** إعادة البناء, التعافي, التعلم, المحافظة
- **عدد المكونات:** 20
- **المكونات المطابقة للمادة العلمية:** 6 نعم / 6 جزئي / 1 لا / 7 لا ينطبق

### الفجوات الرئيسية مقابل المادة العلمية
- أوراق عمل تفاعلية على المنصة (No On-Platform Interactive Worksheets)
- تتبع طويل المدى (No Long-Term Tracking)
- مقالات تثقيف نفسي (No Psychoeducation Articles)
- كتب عمل (No Workbooks)
- مصدر أزمة (No Crisis Resource)
- قسم الهوية ثابت (Identity Section is Static)
- CTA يوجه خارج النظام (CTA Routes Outside)

### النتيجة الأساسية

- تجربة Porn Recovery الحية هي **صفحة واحدة طويلة** تتكون من 11 قسمًا تعرضها `RecoveryPage.tsx` على المسار `/recovery/porn-recovery`.
- **صفر أصول مسجلة حية** في `recovery-assets.ts` للأثر porn-recovery — الأصل الوحيد الحي هو `grounding` (تعافي من الصدمات).
- 4 أصول porn-recovery مسجلة (`urge-log`, `relapse-analysis`, `recovery-planning`, `porn-recovery-workbook`) كلها `planned` وغير مبنية.
- التجربة الحالية **غير مسجلة** في سجل الأصول — هناك فجوة بين السجل والواقع.

---

## الملفات الموجودة

### 1. `src/app/recovery/porn-recovery//page.tsx`
- **الفئة:** porn-recovery/app
- **عدد الأسطر:** 32
- **المكون:** `Page`
- **المرحلة:** جميع المراحل (مدخل)
- **المواضيع الرئيسية:** التعافي / Recovery, الدماغ / Neuroscience, الإطار / Framework, الأدوات / Tools, الانتكاس / Relapse, الهوية / Identity, CTA / دعوة للعمل, البطل / Hero, SEO / البيانات الوصفية
- **مطابق للمادة العلمية:** نعم
- **ملاحظات:** يغطي محتوى علمي عميق + أدوات عملية

### 2. `src/components/recovery//RecoveryProgress.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 442
- **المكون:** `RecoveryProgress`
- **المرحلة:** جميع المراحل (تنقل)
- **المواضيع الرئيسية:** التعافي / Recovery, الاعتراف / Recognition, الدماغ / Neuroscience, الإطار / Framework, الأدوات / Tools, الانتكاس / Relapse, الهوية / Identity, الذات المستقبلية / Future Self, التقدم / Progress, الخروج العلاجي / Therapeutic Exit, التصميم / UI, localStorage / الاستمرارية, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** نعم
- **ملاحظات:** يغطي محتوى علمي عميق + أدوات عملية

### 3. `src/components/recovery//RecoveryIdentity.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 161
- **المكون:** `RecoveryIdentity`
- **المرحلة:** إعادة البناء — بناء الهوية
- **المواضيع الرئيسية:** التعافي / Recovery, الأدوات / Tools, الهوية / Identity, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** جزئي
- **ملاحظات:** يغطي محتوى علمي لكن ينقص أدوات تفاعلية كاملة

### 4. `src/components/recovery//RecoveryRelapse.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 267
- **المكون:** `RecoveryRelapse`
- **المرحلة:** إعادة البناء — التعامل مع الانتكاس
- **المواضيع الرئيسية:** التعافي / Recovery, الأدوات / Tools, الانتكاس / Relapse, التقدم / Progress, الخروج العلاجي / Therapeutic Exit, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** جزئي
- **ملاحظات:** يغطي محتوى علمي لكن ينقص أدوات تفاعلية كاملة

### 5. `src/components/recovery//RecoveryRecognition.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 138
- **المكون:** `RecoveryRecognition`
- **المرحلة:** التعلم — الاعتراف
- **المواضيع الرئيسية:** التعافي / Recovery, الاعتراف / Recognition, الأدوات / Tools, الخروج العلاجي / Therapeutic Exit, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** نعم
- **ملاحظات:** يغطي محتوى علمي عميق + أدوات عملية

### 6. `src/components/recovery//RecoveryFailedAttempts.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 215
- **المكون:** `RecoveryFailedAttempts`
- **المرحلة:** التعلم — إعادة التأطير المعرفي
- **المواضيع الرئيسية:** التعافي / Recovery, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** لا
- **ملاحظات:** محتوى عام / هيكلي

### 7. `src/components/recovery//RecoveryBrain.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 224
- **المكون:** `RecoveryBrain`
- **المرحلة:** التعلم — التثقيف النفسي
- **المواضيع الرئيسية:** التعافي / Recovery, الدماغ / Neuroscience, التقدم / Progress, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** جزئي
- **ملاحظات:** يغطي محتوى علمي لكن ينقص أدوات تفاعلية كاملة

### 8. `src/components/recovery//system/RecoveryCard.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 70
- **المكون:** `RecoveryCard`
- **المرحلة:** بنية تحتية
- **المواضيع الرئيسية:** التعافي / Recovery, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** لا ينطبق
- **ملاحظات:** مكون نظمي

### 9. `src/components/recovery//system/RecoveryBreadcrumb.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 43
- **المكون:** `RecoveryBreadcrumb`
- **المرحلة:** بنية تحتية
- **المواضيع الرئيسية:** التعافي / Recovery, التنقل / Navigation, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** لا ينطبق
- **ملاحظات:** مكون نظمي

### 10. `src/components/recovery//system/RecoveryShell.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 28
- **المكون:** `RecoveryShell`
- **المرحلة:** بنية تحتية
- **المواضيع الرئيسية:** التعافي / Recovery, الخروج العلاجي / Therapeutic Exit, التنقل / Navigation
- **مطابق للمادة العلمية:** لا ينطبق
- **ملاحظات:** مكون نظمي

### 11. `src/components/recovery//system/RecoveryHeader.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 57
- **المكون:** `RecoveryHeader`
- **المرحلة:** بنية تحتية
- **المواضيع الرئيسية:** التعافي / Recovery, التنقل / Navigation, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** لا ينطبق
- **ملاحظات:** مكون نظمي

### 12. `src/components/recovery//system/index.ts`
- **الفئة:** recovery/components
- **عدد الأسطر:** 7
- **المكون:** `index`
- **المرحلة:** بنية تحتية
- **المواضيع الرئيسية:** التعافي / Recovery, الخروج العلاجي / Therapeutic Exit, التنقل / Navigation, التصميم / UI
- **مطابق للمادة العلمية:** لا ينطبق
- **ملاحظات:** مكون نظمي

### 13. `src/components/recovery//system/TherapeuticExit.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 127
- **المكون:** `TherapeuticExit`
- **المرحلة:** بنية تحتية
- **المواضيع الرئيسية:** التعافي / Recovery, الخروج العلاجي / Therapeutic Exit, التنقل / Navigation, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** لا ينطبق
- **ملاحظات:** مكون نظمي

### 14. `src/components/recovery//RecoveryHero.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 96
- **المكون:** `RecoveryHero`
- **المرحلة:** التعلم — الوعي (مدخل)
- **المواضيع الرئيسية:** التعافي / Recovery, الدماغ / Neuroscience, البطل / Hero, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** جزئي
- **ملاحظات:** يغطي محتوى علمي لكن ينقص أدوات تفاعلية كاملة

### 15. `src/components/recovery//RecoveryPage.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 32
- **المكون:** `RecoveryPage`
- **المرحلة:** غير محدد
- **المواضيع الرئيسية:** التعافي / Recovery, الاعتراف / Recognition, الدماغ / Neuroscience, الإطار / Framework, الأدوات / Tools, الانتكاس / Relapse, الهوية / Identity, الذات المستقبلية / Future Self, CTA / دعوة للعمل, التقدم / Progress, البطل / Hero
- **مطابق للمادة العلمية:** نعم
- **ملاحظات:** يغطي محتوى علمي عميق + أدوات عملية

### 16. `src/components/recovery//RecoveryFramework.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 190
- **المكون:** `RecoveryFramework`
- **المرحلة:** التعافي — الإطار المرحلي
- **المواضيع الرئيسية:** التعافي / Recovery, الدماغ / Neuroscience, الإطار / Framework, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** نعم
- **ملاحظات:** يغطي محتوى علمي عميق + أدوات عملية

### 17. `src/components/recovery//RecoveryCTA.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 199
- **المكون:** `RecoveryCTA`
- **المرحلة:** المحافظة — دعوة للعمل
- **المواضيع الرئيسية:** التعافي / Recovery, الأدوات / Tools, CTA / دعوة للعمل, البطل / Hero, التنقل / Navigation, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** نعم
- **ملاحظات:** يغطي محتوى علمي عميق + أدوات عملية

### 18. `src/components/recovery//RecoveryToolkitApps.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 311
- **المكون:** `RecoveryToolkitApps`
- **المرحلة:** التعافي — الأدوات العملية
- **المواضيع الرئيسية:** التعافي / Recovery, الأدوات / Tools, التقدم / Progress, الخروج العلاجي / Therapeutic Exit, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** جزئي
- **ملاحظات:** يغطي محتوى علمي لكن ينقص أدوات تفاعلية كاملة

### 19. `src/components/recovery//RecoveryFutureSelf.tsx`
- **الفئة:** recovery/components
- **عدد الأسطر:** 172
- **المكون:** `RecoveryFutureSelf`
- **المرحلة:** المحافظة — الذات المستقبلية
- **المواضيع الرئيسية:** التعافي / Recovery, الأدوات / Tools, الهوية / Identity, الذات المستقبلية / Future Self, الخروج العلاجي / Therapeutic Exit, التصميم / UI, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** جزئي
- **ملاحظات:** يغطي محتوى علمي لكن ينقص أدوات تفاعلية كاملة

### 20. `src/registry/recovery-assets.ts`
- **الفئة:** registry
- **عدد الأسطر:** 480
- **المكون:** `getAssetsByCategory`
- **المرحلة:** بنية تحتية — سجل الأصول
- **المواضيع الرئيسية:** التعافي / Recovery, الدماغ / Neuroscience, الإطار / Framework, الأدوات / Tools, الانتكاس / Relapse, الذات المستقبلية / Future Self, CTA / دعوة للعمل, التقدم / Progress, البطل / Hero, الخروج العلاجي / Therapeutic Exit, التنفس / Breathing, التأريض / Grounding, سجل الأصول / Asset Registry, التنقل / Navigation, التصميم / UI, SEO / البيانات الوصفية, bilingual / ثنائي اللغة
- **مطابق للمادة العلمية:** لا ينطبق
- **ملاحظات:** مكون نظمي

---

## مصفوفة التغطية

| المرحلة | الأدوات المطلوبة (من المادة العلمية) | ما يوجد على السيرفر | الفجوة |
|---------|--------------------------------------|---------------------|-------|
| **التعلم — الوعي والاعتراف**<br/>(Learn (Awareness + Recognition)) | محتوى تعريفي، بطاقات اعتراف ذاتي، تثقيف نفسي (دورة الاندفاع، اللدونة العصبية)، إعادة تأطير إدراكي | RecoveryHero, RecoveryRecognition, RecoveryBrain, RecoveryFailedAttempts | مقالات تثقيفية معمقة مسجلة لكن غير مبنية (understanding-urges, the-compulsion-cycle, etc.) |
| **التعافي — بناء الأنظمة**<br/>(Recovery (Building Systems)) | إطار مرحلي، أدوات HALT، سجل الرغبات، خطة طوارئ، أوراق عمل تفاعلية (urge-log, relapse-analysis, recovery-planning) | RecoveryFramework (وصفي فقط), RecoveryToolkitApps (3 أدوات مصغرة بدون حفظ) | جميع أوراق العمل التفاعلية (3 porn-recovery + 5 trauma) غير مبنية. لا حفظ بيانات. لا persistence. |
| **إعادة البناء — الانتكاس والهوية**<br/>(Reconstruct (Relapse + Identity)) | تحليل الانتكاس (3 سيناريوهات)، إعادة بناء الهوية (تفاعلي)، مقال Shame & Recovery | RecoveryRelapse (3 سيناريوهات تفاعلية), RecoveryIdentity (4 بطاقات ثابتة) | قسم الهوية غير تفاعلي. مقال shame-and-recovery غير مبنى. |
| **المحافظة — الذات المستقبلية والمتابعة**<br/>(Maintain (Future Self + Continuity)) | رسالة الذات المستقبلية، متتبع خطوات، لوحة تحكم، مجتمع/أقران، خطة تعافي شاملة (workbook) | RecoveryFutureSelf (4 هويات), RecoveryCTA (print/share/donate) | لا تتبع طويل المدى، لا streak counter، لا لوحة تحكم، CTA يوجه خارج نظام التعافي. Workbook غير مبنى. |

---

## مقارنة مع تقرير استخراج المعرفة

تقرير استخراج المعرفة (`knowledge-extraction-report.md`) يذكر:

- **إجمالي ملفات الكود:** 27 ملف (3,625 سطر) — تم التحقق من 20 ملف (3,291 سطر)
- **5 ملفات توثيق:** (4,771 سطر) — لم يتم إعادة قراءتها (تقرير سابق تم التحقق منه)
- **18 أصل مسجل:** 1 حي (grounding) + 1 مواصفات (a52) + 16 مخطط
- **4 أصول porn-recovery مسجلة:** كلها `planned`

### التحقق من البيانات
- **المكونات المتوقعة والموجودة (19):** RecoveryBrain.tsx, RecoveryBreadcrumb.tsx, RecoveryCTA.tsx, RecoveryCard.tsx, RecoveryFailedAttempts.tsx, RecoveryFramework.tsx, RecoveryFutureSelf.tsx, RecoveryHeader.tsx, RecoveryHero.tsx, RecoveryIdentity.tsx, RecoveryPage.tsx, RecoveryProgress.tsx, RecoveryRecognition.tsx, RecoveryRelapse.tsx, RecoveryShell.tsx, RecoveryToolkitApps.tsx, TherapeuticExit.tsx, index.ts, recovery-assets.ts
- **المكونات المتوقعة والمفقودة:** لا يوجد — جميع المكونات المتوقعة موجودة ✓

---

## التوصيات

### أولوية عالية — فجوات حرجة

1. **تسجيل التجربة الحية في السجل:** صفحة Porn Recovery الحالية (11 قسم) غير مسجلة في `recovery-assets.ts`. يجب إضافتها كأصل `psychoeducation` أو تقسيمها إلى 11 أصل منفصل.
2. **بناء أوراق العمل التفاعلية الثلاثة:** `urge-log`، `relapse-analysis`، `recovery-planning` — كلها `planned` لكنها الفجوة الأكبر في مرحلة التعافي.
3. **إضافة طبقة حفظ البيانات:** الأدوات المصغرة الحالية (HALT، Trigger Journal) تفقد البيانات عند مغادرة الصفحة. تحتاج إلى localStorage أو backend.

### أولوية متوسطة

4. **بناء `porn-recovery-workbook`:** دليل تعافي شامل من 7 أيام — المواصفات والقوالب جاهزة، التنفيذ فقط.
5. **تحويل قسم الهوية إلى تفاعلي:** `RecoveryIdentity` حاليًا ثابت بينما `RecoveryFutureSelf` تفاعلي — يجب توحيدهما.
6. **إصلاح مسارات CTA:** "Begin Recovery" يوجه إلى `/quiz` و"Explore Methodology" إلى `/methodology` — كلاهما خارج نظام التعافي.
7. **بناء `emergency-coping-card`:** بطاقة أزمة مستقلة — المكون الحالي في ToolkitApps ليس كافيًا.

### أولوية منخفضة — تنظيف

8. **حذف `ExitButton.tsx` القديم:** في `/src/components/trc/grounding/` — تم استبداله بـ `TherapeuticExit`.
9. **إصلاح i18n في `RecoveryCTA`:** سلاسل نصية مضمنة بدلاً من نظام الترجمة.
10. **إضافة `dir` attribute:** مفقود في `RecoveryHero` و `RecoveryRecognition`.
11. **توحيد مفردات المراحل:** إطار الرحلة (Awareness/Understanding/Recovery/Growth) لا يتطابق مع النموذج العلمي (Learn/Recovery/Reconstruct/Maintain).

---

## ملخص هيكلي

```
/var/www/tamkinly/src/app/recovery/porn-recovery/
  └── page.tsx

/var/www/tamkinly/src/components/recovery/
    ├── /RecoveryProgress.tsx
    ├── /RecoveryIdentity.tsx
    ├── /RecoveryRelapse.tsx
    ├── /RecoveryRecognition.tsx
    ├── /RecoveryFailedAttempts.tsx
    ├── /RecoveryBrain.tsx
    ├── /system/RecoveryCard.tsx
    ├── /system/RecoveryBreadcrumb.tsx
    ├── /system/RecoveryShell.tsx
    ├── /system/RecoveryHeader.tsx
    ├── /system/index.ts
    ├── /system/TherapeuticExit.tsx
    ├── /RecoveryHero.tsx
    ├── /RecoveryPage.tsx
    ├── /RecoveryFramework.tsx
    ├── /RecoveryCTA.tsx
    ├── /RecoveryToolkitApps.tsx
    └── /RecoveryFutureSelf.tsx

/var/www/tamkinly/src/registry/
  └── recovery-assets.ts
```

---

*نهاية التقرير — الملفات المُقرأة: 20 | إجمالي الأسطر: 3,291*