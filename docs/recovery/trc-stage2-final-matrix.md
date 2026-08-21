# TRC Stage 2 — Final Asset Matrix
# مصفوفة أصول المرحلة 2 النهائية

**Date:** 2026-08-12
**Scope:** All Stage 2 (Regulation) assets — source material, journey, and implementation
**Method:** Cross-reference of trc-master-map.md × trc-framework.md × recovery-journey.ts × trc-assets.ts × page.tsx routes × i18n × downloads

---

## Stage 2 Assets from Master Map

The master map (trc-master-map.md) defines 5 therapeutic tools + 2 articles + 1 workbook for Stage 2:

| # | Asset ID | Title (EN) | Title (AR) |
|---|----------|-------------|-------------|
| 2.1 | trc-trigger-mapping | Trigger Mapping | خريطة المحفزات |
| 2.2 | trc-regulation-toolkit | Regulation Toolkit | صندوق أدوات التنظيم |
| 2.3 | trc-eft-tapping | EFT Tapping | تقنية EFT للنقر العصبي |
| 2.4 | trc-thought-reframing | Thought Reframing | إعادة صياغة الأفكار |
| 2.5 | trc-trauma-journal | Trauma Journal | يومية الصدمة |
| 2.A1 | trc-article-breathing-grounding | Breathing & Grounding Tools | أدوات التنفس والتأريض |
| 2.A2 | trc-article-secondary-trauma | Secondary Trauma | الصدمة الثانوية |
| 2.D1 | trc-regulation-workbook | Regulation Workbook | مذكرة التنظيم |

**Additional assets in journey model but NOT in master map:**

| # | Asset ID | Title | Source |
|---|----------|-------|--------|
| — | trauma-responses | Trauma Response Patterns | recovery-journey.ts |
| — | shame-recovery | Shame & Self-Blame Reframing | recovery-journey.ts |

---

## Complete Matrix

| Asset | Source (Master Map) | Framework | Registry (trc-assets.ts) | Specification | Implementation (page.tsx) | Route | i18n (AR+EN) | Safety | Download | Journey (TRC_STEPS) | Next Step | Clinical Status |
|-------|--------------------|-----------|-------------------------|---------------|--------------------------|-------|--------------|--------|----------|---------------------|-----------|-----------------|
| trigger-mapping | YES (2.1) | YES | YES (planned) | N/A | YES | /recovery/trc/worksheets/trigger-mapping | COMPLETE | ✅ (SR+ME+TE+DCI) | trc-05 | YES (isAvailable: true) | → safety-plan | LIVE |
| regulation-toolkit | YES (2.2) | YES | ❌ NOT IN REGISTRY | N/A | YES | /recovery/trc/regulation-toolkit | COMPLETE | ✅ (SR+ME+TE+DCI) | trc-07 | YES (isAvailable: true) | → eft-tapping | LIVE |
| eft-tapping | YES (2.3) | YES | ❌ NOT IN REGISTRY | YES (trc-eft-final-spec) | YES | /recovery/trc/eft-tapping | COMPLETE | ✅ (SR+ME+TE+DCI+Dissoc) | trc-12 | YES (isAvailable: true) | → thought-reframing | CLINICAL-REVIEW |
| thought-reframing | YES (2.4) | YES | ❌ NOT IN REGISTRY | N/A | YES | /recovery/trc/thought-reframing | COMPLETE (15K AR, 5K EN) | ✅ (SR+ME+TE+DCI) | trc-09 | YES (isAvailable: true) | → trauma-journal | LIVE |
| trauma-journal | YES (2.5) | YES | ❌ NOT IN REGISTRY | N/A | YES | /recovery/trc/trauma-journal | COMPLETE (17K AR, 6K EN) | ✅ (SR+ME+TE+DCI) | trc-11 | YES (isAvailable: true) | → trauma-responses | LIVE |
| trauma-responses | ❌ NOT IN MASTER MAP | YES (Principle 5) | YES (planned) | N/A | YES | /recovery/trc/what-happens-during-trauma-responses | COMPLETE | ✅ (SR+ME+TE+DCI) | trc-08 | YES (isAvailable: true) | → shame-recovery | LIVE |
| shame-recovery | ❌ NOT IN MASTER MAP | YES (TF-CBT) | ❌ NOT IN REGISTRY | N/A | YES | /recovery/trc/shame-recovery | COMPLETE (19K AR, 6K EN) | ✅ (SR+ME+TE+DCI) | trc-10 | YES (isAvailable: true) | → boundaries | LIVE |
| breathing-grounding (2.A1) | YES | YES | ❌ NOT IN REGISTRY | N/A | YES (regulation-guide) | /recovery/trc/regulation-guide | COMPLETE | Standard | ❌ No dedicated PDF | ❌ NOT IN TRC_STEPS | N/A | LIVE |
| secondary-trauma (2.A2) | YES | YES | ❌ NOT IN REGISTRY | N/A | YES | /recovery/trc/secondary-trauma | COMPLETE | Standard | ❌ No dedicated PDF | ❌ NOT IN TRC_STEPS | N/A | LIVE |
| regulation-workbook (2.D1) | YES | YES | ❌ NOT IN REGISTRY | N/A | ❌ NO PAGE | N/A | N/A | N/A | ❌ No PDF built | ❌ NOT IN TRC_STEPS | N/A | MISSING |

**Legend:**
- SR = SafetyResponse, ME = MedicalDisclaimer, TE = TherapeuticExit, DCI = DistressCheckIn, Dissoc = Dissociation Screening
- COMPLETE = Full AR + EN i18n coverage

---

## Assets in Source Material but NOT Built/Registered

| Asset | Master Map | TRC_STEPS | TRC_ASSETS | Page Exists | Reason |
|-------|-----------|-----------|------------|-------------|--------|
| regulation-workbook (2.D1) | YES (2.D1) | ❌ | ❌ | ❌ | Not yet built — comprehensive workbook covering all Stage 2 exercises |

**Note:** breathing-grounding and secondary-trauma articles exist as pages but are not in TRC_STEPS (journey-orphans). They have incoming links from the TRC hub but aren't tracked for completion.

---

## Assets in Journey but NOT in Source Material

| Asset | TRC_STEPS | Master Map | Reason |
|-------|-----------|-----------|--------|
| trauma-responses | YES | ❌ | Added during Wave 2 build — justified by framework Principle 5 |
| shame-recovery | YES | ❌ | Added during Wave 2 build — justified by TF-CBT approach for trauma-related shame |

Both assets have clinical justification in the TRC framework and represent real therapeutic need. They are NOT inventions of the code — they correspond to established trauma recovery approaches.

---

## Registry Gaps

**5 assets in TRC_STEPS but NOT in TRC_ASSETS registry:**

1. regulation-toolkit — Built and live
2. eft-tapping — Built, clinical-review
3. thought-reframing — Built and live
4. trauma-journal — Built and live
5. shame-recovery — Built and live

**Impact:** `getTrcAssetById()` returns undefined for these assets. This is a structural inconsistency — two sources of truth (TRC_STEPS and TRC_ASSETS) disagree.

**Recommendation:** Add all 5 to TRC_ASSETS with correct status fields.

---

## Clinical Status Summary

| Status | Assets |
|--------|--------|
| LIVE | trigger-mapping, regulation-toolkit, thought-reframing, trauma-journal, trauma-responses, shame-recovery |
| CLINICAL-REVIEW | eft-tapping |
| MISSING | regulation-workbook |