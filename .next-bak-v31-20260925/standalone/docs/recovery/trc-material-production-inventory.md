# TRC Material Production Inventory
# جرد إنتاج مواد TRC

**Date:** 2026-08-13
**Scope:** Complete inventory of all TRC materials from source material, framework, master map, journey, registry, and downloads
**Purpose:** Single source of truth for what exists, what's missing, and what needs production

---

## Inventory Sources

| Source | Path | Status |
|--------|------|--------|
| TRC Framework | docs/recovery/trc-framework.md | ❌ NOT FOUND on server |
| TRC Master Map | docs/recovery/trc-master-map.md | ❌ NOT FOUND on server |
| TRC Source Extraction | docs/recovery/trc-source-extraction.md | ❌ NOT FOUND on server |
| Stage 2 Final Matrix | docs/recovery/trc-stage2-final-matrix.md | ✅ EXISTS (97 lines) |
| Wave 2 Release Gate | docs/recovery/trc-wave2-final-release-gate.md | ✅ EXISTS (231 lines) |
| EFT Final Specification | docs/recovery/trc-eft-final-specification.md | ✅ EXISTS (182 lines) |
| TRC Assets Registry | src/registry/trc-assets.ts | ✅ EXISTS (350 lines) |
| Recovery Journey | src/lib/recovery-journey.ts | ✅ EXISTS (763 lines) |
| Material Prompts | docs/recovery/material-prompts/trc/ | ✅ EXISTS (13 files) |
| AR PDF Downloads | public/downloads/trc/ | ✅ EXISTS (12 files) |

**⚠️ Critical Gap:** trc-framework.md, trc-master-map.md, and trc-source-extraction.md are NOT on server. These are the authoritative source documents. Their absence means we're working from derived documents (stage2-matrix, release-gate) rather than primary sources. These must be restored or their content must be documented elsewhere.

---

## Complete Material Inventory — 21 Materials

### Stage 1: Safety (4 interactive tools + 1 article)

| # | Asset ID | Title (AR) | Title (EN) | Material Type | Prompt | AR PDF | EN PDF | Priority |
|---|----------|------------|------------|---------------|--------|--------|--------|----------|
| 1 | grounding-54321 | تأريض 5-4-3-2-1 | 5-4-3-2-1 Grounding | Pocket Card | ✅ | ✅ | ❌ | P0 |
| 2 | a52-breathing | تنفس A52 القتالي | A52 Combat Breathing | Pocket Card | ✅ | ✅ | ❌ | P0 |
| 3 | safe-place | المكان الآمن | Safe Place Visualization | Practice Journal | ✅ | ✅ | ❌ | P1 |
| 4 | body-scan | مسح الجسد | Guided Body Scan | Practice Guide | ✅ | ✅ | ❌ | P1 |
| 5 | trauma-psychoeducation | ماذا تفعل الصدمة بالجسد | What Trauma Does to the Body | Psychoeducation Handout | ✅ | ❌ | ❌ | P2 |

### Stage 2: Regulation (8 interactive tools)

| # | Asset ID | Title (AR) | Title (EN) | Material Type | Prompt | AR PDF | EN PDF | Priority |
|---|----------|------------|------------|---------------|--------|--------|--------|----------|
| 6 | trigger-mapping | خريطة المحفزات | Trigger Mapping | Worksheet | ✅ | ✅ | ❌ | P0 |
| 7 | safety-plan | خطة الأمان | Safety Plan | Safety Plan Card | ✅ | ✅ | ❌ | P0 |
| 8 | regulation-toolkit | أدوات التنظيم | Regulation Toolkit | Quick Reference Card | ✅ | ✅ | ❌ | P1 |
| 9 | eft-tapping | تقنية EFT للنقر العصبي | EFT Tapping | Self-Help Worksheet | ✅ | ✅ | ❌ | P2 (CLINICAL-REVIEW) |
| 10 | thought-reframing | إعادة صياغة الأفكار | Thought Reframing | Worksheet | ✅ | ✅ | ❌ | P1 |
| 11 | trauma-journal | يومية الصدمة | Trauma Journal | Structured Journal Guide | ✅ | ✅ | ❌ | P2 |
| 12 | trauma-responses | أنماط استجابة الصدمة | Trauma Response Patterns | Reference Card | ✅ | ✅ | ❌ | P1 |
| 13 | shame-recovery | العار وإعادة البناء | Shame & Self-Blame Reframing | Worksheet | ✅ | ✅ | ❌ | P1 |

### Stage 2: Articles & Workbooks

| # | Asset ID | Title (AR) | Title (EN) | Material Type | Prompt | AR PDF | EN PDF | Priority |
|---|----------|------------|------------|---------------|--------|--------|--------|----------|
| 14 | breathing-grounding (2.A1) | أدوات التنفس والتأريض | Breathing & Grounding Tools | Article | ❌ | ❌ | ❌ | P2 |
| 15 | secondary-trauma (2.A2) | الصدمة الثانوية | Secondary Trauma | Article | ❌ | ❌ | ❌ | P2 |
| 16 | regulation-workbook (2.D1) | مذكرة التنظيم | Regulation Workbook | Workbook | ❌ | ❌ | ❌ | P2 (MISSING) |

### Stage 3: Integration (Wave 3 — not built)

| # | Asset ID | Title (AR) | Title (EN) | Material Type | Prompt | AR PDF | EN PDF | Priority |
|---|----------|------------|------------|---------------|--------|--------|--------|----------|
| 17 | boundaries | — | Boundaries | Worksheet | ❌ | ❌ | ❌ | Wave 3 |
| 18 | therapist-selection | — | Therapist Selection | Guide/Checklist | ❌ | ❌ | ❌ | Wave 3 |
| 19 | recovery-milestones | — | Recovery Milestones | Tracker | ❌ | ❌ | ❌ | Wave 3 |

### Companion Articles (journey-orphans)

| # | Asset ID | Title | Route | In Journey? | Priority |
|---|----------|-------|-------|-------------|----------|
| 20 | grounding-guide | — | /recovery/trc/grounding-guide | No | P2 |
| 21 | regulation-guide | — | /recovery/trc/regulation-guide | No | P2 |

---

## Priority Summary

| Priority | Count | Materials | Production Ready? |
|----------|-------|-----------|-------------------|
| P0 | 4 | Grounding Card, A52 Card, Safety Plan, Trigger Mapping | ✅ All have prompts + AR PDFs. Need EN production. |
| P1 | 6 | Safe Place, Body Scan, Regulation Ref, Thought Reframing, Trauma Responses, Shame Recovery | ✅ All have prompts + AR PDFs. After P0 template. |
| P2 | 5 | Psychoeducation, EFT (clinical-review), Trauma Journal, Breathing Article, Secondary Trauma | ⚠️ Mixed readiness. EFT needs clinical review. |
| P2 (MISSING) | 1 | Regulation Workbook | ❌ No prompt, no PDF, no page. Needs specification. |
| Wave 3 | 3 | Boundaries, Therapist Selection, Recovery Milestones | ❌ Not built. Specs only. |

---

## Production Pipeline Status

```
Source Material → Framework → Registry → Prompt → External Production → Review → Integration → UI → Verification

Current position for ALL 12 materials:
  ✅ Source Material → ✅ Framework → ⚠️ Registry (5 missing) → ✅ Prompt → ❌ External Production (EN) → ❌ Review → ⚠️ Integration (AR only) → ❌ UI → ❌ Verification
```

### Missing by Stage of Pipeline

| Pipeline Stage | Missing | Details |
|---------------|---------|---------|
| Source Material | 3 docs | trc-framework.md, trc-master-map.md, trc-source-extraction.md |
| Registry | 5 assets | regulation-toolkit, eft-tapping, thought-reframing, trauma-journal, shame-recovery |
| EN Prompt | 12 prompts | No dedicated EN production prompts exist |
| External Production | 12 EN PDFs | Zero English versions produced |
| Review | All | No validation has been performed on any PDF |
| Canonical Naming | All 12 | All files use trc-NN-name.pdf, not TRC-Name-Type-Lang.pdf |
| Downloads Page | 7 items | 7 of 12 files not shown on downloads page |
| UI Links | All | No tool page links to companion PDF |
| Verification | All | No end-to-end verification performed |

---

## Existing Prompts Inventory

| Prompt File | Lines | Material | Language | Quality |
|-------------|-------|----------|----------|---------|
| trc-grounding-pocket-card-prompt.md | 161 | Grounding Card | AR | ✅ Detailed |
| trc-a52-breathing-card-prompt.md | 145 | A52 Card | AR | ✅ Detailed |
| trc-safety-plan-prompt.md | 182 | Safety Plan | AR | ✅ Detailed |
| trc-trigger-mapping-worksheet-prompt.md | 208 | Trigger Mapping | AR | ✅ Detailed |
| trc-eft-self-help-worksheet-prompt.md | 56 | EFT Self-Help | AR | ⚠️ Brief |
| trc-regulation-quick-reference-prompt.md | 49 | Regulation Ref | AR | ⚠️ Brief |
| trc-thought-reframing-worksheet-prompt.md | 51 | Thought Reframing | AR | ⚠️ Brief |
| trc-body-awareness-worksheet-prompt.md | 55 | Body Scan | AR | ⚠️ Brief |
| trc-trauma-journal-guide-prompt.md | 52 | Trauma Journal | AR | ⚠️ Brief |
| trc-shame-recovery-worksheet-prompt.md | 51 | Shame Recovery | AR | ⚠️ Brief |
| trc-safe-place-practice-prompt.md | 52 | Safe Place | AR | ⚠️ Brief |
| trc-trauma-responses-reference-prompt.md | 49 | Trauma Responses | AR | ⚠️ Brief |
| TRC-MATERIAL-PRODUCTION-MASTER-PROMPT.md | 297 | Master Template | Both | ✅ Comprehensive |

**Note:** P0 materials (Grounding, A52, Safety Plan, Trigger Mapping) have detailed prompts (145-208 lines). P1/P2 materials have brief prompts (~50 lines). EN-specific prompts do not exist for any material.

---

## What Must Happen Next

1. **P0 First** — Produce 8 files: Grounding Card (AR+EN), A52 Card (AR+EN), Safety Plan (AR+EN), Trigger Mapping (AR+EN)
2. **Validate** — Run Identity + Content + Safety + Clinical validation on each
3. **Integrate** — Place files, update registry, rewrite downloads page, add UI links
4. **Verify** — End-to-end check for each P0 material
5. **Template** — If P0 cycle succeeds, use as template for P1
6. **Then P1** — 6 materials × 2 languages = 12 files
7. **Then P2** — 5 materials × 2 languages = 10 files
8. **NOT Wave 3** — Until P0+P1 complete and gate document reviewed
