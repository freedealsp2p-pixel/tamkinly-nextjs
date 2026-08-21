# TRC Wave 2 — Orphan Final Audit

**Date:** 2025-07-13  
**Auditor:** Combined Agent (Tasks 6+7+8)  
**Scope:** All TRC assets, routes, steps, downloads, and registry entries

---

## 1. TRC_STEPS Journey Chain Verification

| Step ID | nextStep | previousStep | Chain Valid? | Route Exists? |
|---------|----------|-------------|-------------|--------------|
| grounding | a52-breathing | null | ✅ | ✅ |
| a52-breathing | safe-place | grounding | ✅ | ✅ |
| safe-place | body-scan | a52-breathing | ✅ | ✅ |
| body-scan | trigger-mapping | safe-place | ✅ | ✅ |
| trauma-psychoeducation | null | null | ✅ (informational) | ✅ |
| trigger-mapping | safety-plan | body-scan | ✅ | ✅ |
| safety-plan | regulation-toolkit | trigger-mapping | ✅ | ✅ |
| regulation-toolkit | eft-tapping | safety-plan | ✅ | ✅ |
| eft-tapping | thought-reframing | regulation-toolkit | ✅ | ✅ |
| thought-reframing | trauma-journal | eft-tapping | ✅ | ✅ |
| trauma-journal | trauma-responses | thought-reframing | ✅ | ✅ |
| trauma-responses | shame-recovery | trauma-journal | ✅ | ✅ |
| shame-recovery | **boundaries** | trauma-responses | ⚠️ (nextStep=boundaries not in TRC_STEPS) | ✅ (shame-recovery route OK) |
| therapist-selection | recovery-milestones | boundaries | ⚠️ (isAvailable:false, boundaries not in steps) | ❌ (no page) |
| recovery-milestones | null | therapist-selection | ✅ (isAvailable:false) | ❌ (no page) |

**Dead reference:** `shame-recovery.nextStep = 'boundaries'` — 'boundaries' does not exist as a TRC_STEPS entry. The next-step-engine handles this via fallback, but the journey chain is technically broken at the integration stage. This is acceptable for Wave 3 placeholder.

---

## 2. Route Verification (All Available Steps)

All 14 TRC routes return HTTP 200:

| Route | HTTP Status |
|-------|------------|
| /recovery/trc | 200 ✅ |
| /recovery/trc/grounding | 200 ✅ |
| /recovery/trc/a52 | 200 ✅ |
| /recovery/trc/safe-place | 200 ✅ |
| /recovery/trc/body-scan | 200 ✅ |
| /recovery/trc/journey | 200 ✅ |
| /recovery/trc/regulation-toolkit | 200 ✅ |
| /recovery/trc/what-happens-during-trauma-responses | 200 ✅ |
| /recovery/trc/worksheets/trigger-mapping | 200 ✅ |
| /recovery/trc/worksheets/safety-plan | 200 ✅ |
| /recovery/trc/thought-reframing | 200 ✅ |
| /recovery/trc/shame-recovery | 200 ✅ |
| /recovery/trc/trauma-journal | 200 ✅ |
| /recovery/trc/eft-tapping | 200 ✅ |

---

## 3. Orphan Analysis

### 3A: Pages WITHOUT TRC_STEPS entries (supporting content — acceptable)

| Route | Type | Linked From | Status |
|-------|------|------------|--------|
| /recovery/trc/downloads | Supporting | Search page | ✅ Linked |
| /recovery/trc/grounding-guide | Supporting | GroundingIntro, CompletionScreen | ✅ Linked |
| /recovery/trc/regulation-guide | Supporting | Search page, Regulation Toolkit | ✅ Linked |
| /recovery/trc/secondary-trauma | Supporting | Safety Plan, Trauma Responses | ✅ Linked |
| /recovery/trc/journey | UI | TRC main page | ✅ Linked |
| /recovery/trc/page.tsx | Main | /recovery | ✅ Linked |

### 3B: TRC_STEPS WITHOUT page routes (Wave 3 — acceptable)

| Step | isAvailable | Route | Status |
|------|------------|-------|--------|
| therapist-selection | false | /recovery/trc/therapist-selection | ✅ Expected (Wave 3) |
| recovery-milestones | false | /recovery/trc/recovery-milestones | ✅ Expected (Wave 3) |

### 3C: Assets in trc-assets.ts Registry — Stale Statuses

| Asset ID | Registry Status | Actual Status | Issue |
|----------|----------------|---------------|-------|
| grounding-54321 | live | live | ✅ |
| trauma-responses | planned | **implemented** | ⚠️ Stale — should be 'live' |
| a52 | clinical-review | clinical-review | ✅ |
| safe-place | clinical-review | clinical-review | ✅ |
| body-scan | clinical-review | clinical-review | ✅ |
| trigger-mapping | planned | **implemented** | ⚠️ Stale — should be 'live' |
| safety-plan | planned | **implemented** | ⚠️ Stale — should be 'live' |
| what-trauma-does-to-the-body | clinical-review | clinical-review | ✅ |

### 3D: Implemented Assets MISSING from trc-assets.ts Registry

| Asset | Route | Page Exists | Missing from Registry |
|-------|-------|------------|---------------------|
| regulation-toolkit | /recovery/trc/regulation-toolkit | ✅ | ⚠️ Missing |
| eft-tapping | /recovery/trc/eft-tapping | ✅ | ⚠️ Missing |
| thought-reframing | /recovery/trc/thought-reframing | ✅ | ⚠️ Missing |
| shame-recovery | /recovery/trc/shame-recovery | ✅ | ⚠️ Missing |
| trauma-journal | /recovery/trc/trauma-journal | ✅ | ⚠️ Missing |

### 3E: Downloadable Mismatch

TRC_STEPS downloadables: trc-01 through trc-09 (9 items)  
Downloads page: 5 items with different IDs (grounding-pocket-card, a52-breathing-card, etc.)  
**Status:** ⚠️ ID mismatch between TRC_STEPS and downloads page. Downloads all marked 'planned'.

---

## 4. Contraindication UI Audit

| Tool | Contraindications in TRC_STEPS | UI Display | Bilingual AR+EN | Grounding Alternative | Status |
|------|-------------------------------|-----------|----------------|---------------------|--------|
| Grounding | None (correct) | N/A | N/A | N/A | ✅ |
| A52 Breathing | panic-disorder, severe-dissociation | EntryScreen.tsx (inline) | ✅ | ✅ Link to /recovery/trc/grounding | ✅ |
| Safe Place | severe-dissociation, active-flashbacks | EntryScreen.tsx (inline) | ✅ | ✅ Link to /recovery/trc/grounding | ✅ |
| Body Scan | severe-dissociation, recent-trauma, active-flashbacks | EntryScreen.tsx (inline) | ✅ | ✅ Link to /recovery/trc/grounding | ✅ |
| Psychoeducation | None | N/A | N/A | N/A | ✅ |
| Trigger Mapping | None | N/A | N/A | N/A | ✅ |
| Safety Plan | None | N/A | N/A | N/A | ✅ |
| Regulation Toolkit | None (planning tool) | "No contraindications" | ✅ | N/A | ✅ |
| EFT Tapping | active-dissociation, severe-dissociation | page.tsx (t() key) | ✅ en.json+ar.json | ✅ (mentions grounding) | ✅ |
| Thought Reframing | acute-crisis | page.tsx (t() key) | ✅ en.json+ar.json | ✅ (mentions grounding/regulation) | ✅ |
| Trauma Journal | active-dissociation, severe-dissociation, recent-trauma | page.tsx (t() key) | ✅ en.json+ar.json | ✅ (mentions grounding/breathing) | ✅ |
| Shame Recovery | severe-dissociation, acute-crisis | page.tsx (t() key) | ✅ en.json+ar.json | ✅ (mentions grounding/breathing) | ✅ |
| Trauma Responses | None | N/A | N/A | N/A | ✅ |

---

## 5. Next-Step Engine Coverage

The next-step-engine handles all available TRC steps:

- **Safety stage:** grounding → a52-breathing → safe-place → body-scan ✅
- **Regulation stage:** trigger-mapping → safety-plan → regulation-toolkit → eft-tapping → thought-reframing → trauma-journal → trauma-responses → shame-recovery ✅
- **Fallback:** findFirstIncompleteTrcStep catches any gaps ✅
- **Safety gate:** Never recommends Regulation before Safety complete ✅
- **High activation override:** Redirects to grounding ✅
- **Integration (Wave 3):** Returns "under development" message ✅

**Note:** The engine has explicit logic for trigger-mapping, safety-plan, regulation-toolkit, trauma-responses, and shame-recovery, but relies on the fallback for eft-tapping, thought-reframing, and trauma-journal in the regulation stage. This is functionally correct.

---

## 6. Summary of Findings

| Category | Count | Status |
|----------|-------|--------|
| Dead journey references | 1 (boundaries) | ⚠️ Acceptable (Wave 3 placeholder) |
| Orphan pages (unlinked) | 0 | ✅ |
| Missing route pages | 2 (therapist-selection, recovery-milestones) | ✅ Expected (Wave 3) |
| Stale registry statuses | 3 (trauma-responses, trigger-mapping, safety-plan) | ⚠️ Should update |
| Missing registry entries | 5 (regulation-toolkit, eft-tapping, thought-reframing, shame-recovery, trauma-journal) | ⚠️ Should add |
| Downloadable ID mismatch | 1 set | ⚠️ Non-blocking |
| Contraindication gaps | 0 | ✅ |

**Unexplained orphan assets: 0** — All pages without TRC_STEPS entries are intentional supporting content.

