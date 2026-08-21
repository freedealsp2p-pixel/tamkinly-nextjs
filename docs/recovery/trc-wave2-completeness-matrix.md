# TRC Wave 2 Completeness Matrix — Regulation Stage Deep Audit

**Generated:** 2026-08-11  
**Auditor:** Phase 4 Agent (Wave 2 Completeness Auditor)  
**Scope:** 10 Regulation-stage TRC assets (built + planned + sidelined)  
**Source Documents:** trc-framework.md, trc-master-map.md, recovery-journey.ts, next-step-engine.ts, trc-assets.ts, en.json, ar.json  

---

## Executive Summary

| Status | Count | Assets |
|--------|-------|--------|
| **LIVE** | 4 | Trigger Mapping, Safety Plan, Regulation Toolkit, Trauma Responses |
| **PLANNED** | 1 | Shame Recovery |
| **SIDELINED** | 3 | EFT Tapping, Thought Reframing, Trauma Journal |
| **ORPHAN-LINKED** | 2 | Regulation Guide, Secondary Trauma |
| **NOT-BUILT** | 3 | EFT Tapping, Thought Reframing, Trauma Journal |
| **TOTAL** | **10** | |

### Key Metrics
- **LIVE routes returning 200:** 6 (including orphans)
- **Routes returning 404:** 3 (shame-recovery, eft-tapping, thought-reframing, trauma-journal)
- **Registry coverage:** 7/10 in TRC_ASSETS (regulation-guide, secondary-trauma, shame-recovery missing from registry)
- **Journey chain complete:** No — shame-recovery breaks the chain (isAvailable: false)
- **i18n coverage:** 6/10 have both AR+EN keys (shame-recovery, eft-tapping, thought-reframing, trauma-journal missing)
- **Safety triple present:** 6/10 have SafetyResponse + TherapeuticExit + MedicalDisclaimer
- **DistressCheckIn present:** 2/10 (trigger-mapping, safety-plan only)
- **Clinical review completed:** 0/10

---

## Completeness Matrix

| # | Asset | Framework | Source | Registry | Spec | Built | Route | HTTP | i18n | Safety | Download | Journey | NextStep | Clinical | Contraindic | Distress | Status |
|---|-------|-----------|--------|----------|------|-------|-------|------|------|--------|----------|---------|----------|----------|-------------|----------|--------|
| 1 | Trigger Mapping | ✅ | ✅ trc-framework §2 | ✅ TRC_STEPS + TRC_ASSETS | ✅ CBT/DBT ref | ✅ | `/recovery/trc/worksheets/trigger-mapping` | 200 | ✅ AR+EN | ✅ SR+TE+MD | ❌ None | ✅ prev:body-scan next:safety-plan | ✅ Basic | ❌ Needed | ⚠️ Not shown | ✅ | **LIVE** |
| 2 | Regulation Toolkit | ✅ | ✅ trc-framework §2 | ✅ TRC_STEPS | ⚠️ No spec doc | ✅ | `/recovery/trc/regulation-toolkit` | 200 | ✅ AR+EN | ✅ SR+TE+MD | ❌ None | ✅ prev:safety-plan next:trauma-responses | ✅ Enhanced | ❌ Needed | ✅ Shown | ❌ | **LIVE** |
| 3 | Safety Plan | ✅ | ✅ trc-framework §1+§2 | ✅ TRC_STEPS + TRC_ASSETS | ✅ Stanley&Brown ref | ✅ | `/recovery/trc/worksheets/safety-plan` | 200 | ✅ AR+EN | ✅ SR+TE+MD | ❌ None | ✅ prev:trigger-mapping next:regulation-toolkit | ✅ Basic | ❌ Needed | ⚠️ Not shown | ✅ | **LIVE** |
| 4 | Trauma Responses | ✅ | ✅ trc-framework §2 | ✅ TRC_STEPS + TRC_ASSETS | ⚠️ Article only | ✅ | `/recovery/trc/what-happens-during-trauma-responses` | 200 | ✅ AR+EN | ✅ SR+TE+MD | ❌ None | ✅ prev:regulation-toolkit next:shame-recovery | ✅ Basic | ❌ Needed | ⚠️ Not shown | ❌ | **LIVE** |
| 5 | Shame Recovery | ✅ | ✅ trc-framework §2 (Principle 7) | ✅ TRC_STEPS (isAvailable:false) | ❌ None | ❌ | `/recovery/trc/shame-recovery` | 404 | ❌ No keys | ❌ N/A | ❌ None | ✅ prev:trauma-responses next:boundaries | ✅ Engine | ❌ Needed | ✅ In model | ❌ | **PLANNED** |
| 6 | EFT Tapping | ✅ | ✅ trc-framework §2 | ❌ Not in TRC_STEPS | ❌ None | ❌ | `/recovery/trc/eft-tapping` | 404 | ❌ No keys | ❌ N/A | ❌ None | ❌ Not linked | ❌ Not linked | ❌ Needed | ❌ None | ❌ | **SIDELINED** |
| 7 | Thought Reframing | ✅ | ✅ trc-framework §2 | ❌ Not in TRC_STEPS | ❌ None | ❌ | `/recovery/trc/thought-reframing` | 404 | ❌ No keys | ❌ N/A | ❌ None | ❌ Not linked | ❌ Not linked | ❌ Needed | ❌ None | ❌ | **SIDELINED** |
| 8 | Trauma Journal | ✅ | ✅ trc-framework §2 | ❌ Not in TRC_STEPS | ❌ None | ❌ | `/recovery/trc/trauma-journal` | 404 | ❌ No keys | ❌ N/A | ❌ None | ❌ Not linked | ❌ Not linked | ❌ Needed | ❌ None | ❌ | **SIDELINED** |
| 9 | Regulation Guide | ⚠️ Not in framework | ❌ Orphan article | ❌ Not in TRC_ASSETS | ❌ None | ✅ | `/recovery/trc/regulation-guide` | 200 | ✅ AR+EN | ✅ SR+TE+MD | ❌ None | ❌ Not in journey chain | ❌ None | ❌ Needed | ❌ None | ❌ | **ORPHAN-LINKED** |
| 10 | Secondary Trauma | ⚠️ Art. in framework | ✅ trc-master-map 2.A2 | ❌ Not in TRC_ASSETS | ❌ None | ✅ | `/recovery/trc/secondary-trauma` | 200 | ✅ AR+EN | ✅ SR+TE+MD | ❌ None | ❌ Not in journey chain | ❌ None | ❌ Needed | ❌ None | ❌ | **ORPHAN-LINKED** |

### Legend
- **SR** = SafetyResponse, **TE** = TherapeuticExit, **MD** = MedicalDisclaimer
- **Framework** = Defined in trc-framework.md or trc-master-map.md
- **Registry** = In TRC_STEPS (recovery-journey.ts) AND/OR TRC_ASSETS (trc-assets.ts)
- **Spec** = Detailed specification/blueprint exists
- **Journey** = Properly positioned in TRC_STEPS with nextStep/previousStep
- **NextStep** = Linked in next-step-engine.ts

---

## Per-Asset Detail

### 1. Trigger Mapping — LIVE ✅
- **Route:** `/recovery/trc/worksheets/trigger-mapping` → **200**
- **TRC_STEPS:** id=`trigger-mapping`, stage=`regulation`, isAvailable=`true`
- **TRC_ASSETS:** id=`trigger-mapping`, status=`planned` ⚠️ (should be `live`)
- **nextStep:** `safety-plan` ✅
- **previousStep:** `body-scan` ✅
- **Safety:** SafetyResponse ✅, TherapeuticExit ✅, MedicalDisclaimer ✅, DistressCheckIn ✅
- **i18n:** AR+EN via translations.ts + recoveryAssets.trc-trigger-mapping keys
- **Gaps:** No downloadable companion; no EnhancedSuggestedNextStep; contraindications not shown in UI; registry status outdated

### 2. Regulation Toolkit — LIVE ✅
- **Route:** `/recovery/trc/regulation-toolkit` → **200**
- **TRC_STEPS:** id=`regulation-toolkit`, stage=`regulation`, isAvailable=`true`
- **TRC_ASSETS:** ❌ NOT in TRC_ASSETS registry
- **nextStep:** `trauma-responses` ✅
- **previousStep:** `safety-plan` ✅
- **Safety:** SafetyResponse ✅, TherapeuticExit ✅, MedicalDisclaimer ✅, DistressCheckIn ❌
- **i18n:** AR+EN via recoveryAssets.trc-regulation-toolkit keys
- **Gaps:** No DistressCheckIn; no downloadable; not in TRC_ASSETS registry; no spec doc

### 3. Safety Plan — LIVE ✅
- **Route:** `/recovery/trc/worksheets/safety-plan` → **200**
- **TRC_STEPS:** id=`safety-plan`, stage=`regulation`, isAvailable=`true`
- **TRC_ASSETS:** id=`safety-plan`, status=`planned` ⚠️, stage=`safety` ⚠️ (WRONG — should be `regulation`)
- **nextStep:** `regulation-toolkit` ✅
- **previousStep:** `trigger-mapping` ✅
- **Safety:** SafetyResponse ✅, TherapeuticExit ✅, MedicalDisclaimer ✅, DistressCheckIn ✅
- **i18n:** AR+EN via recoveryAssets.trc-safety-plan keys
- **Gaps:** Registry status outdated; registry stage WRONG; no downloadable; layout.tsx missing RecoveryShell

### 4. Trauma Responses — LIVE ✅
- **Route:** `/recovery/trc/what-happens-during-trauma-responses` → **200**
- **TRC_STEPS:** id=`trauma-responses`, stage=`regulation`, isAvailable=`true`
- **TRC_ASSETS:** id=`trauma-responses`, status=`planned` ⚠️
- **nextStep:** `shame-recovery` ✅ (but shame-recovery is unavailable)
- **previousStep:** `regulation-toolkit` ✅
- **Safety:** SafetyResponse ✅, TherapeuticExit ✅, MedicalDisclaimer ✅, DistressCheckIn ❌
- **i18n:** AR+EN via recoveryAssets.trc-trauma-responses keys
- **Gaps:** No DistressCheckIn; built as article (40768 chars) not interactive tool; registry status outdated; next step leads to unavailable asset

### 5. Shame Recovery — PLANNED 🔶
- **Route:** `/recovery/trc/shame-recovery` → **404**
- **TRC_STEPS:** id=`shame-recovery`, stage=`regulation`, isAvailable=`false`
- **TRC_ASSETS:** ❌ NOT in TRC_ASSETS
- **nextStep:** `boundaries` ✅
- **previousStep:** `trauma-responses` ✅
- **Contraindications:** `severe-dissociation`, `acute-crisis` ✅ (in journey model)
- **i18n:** ❌ No AR or EN translation keys
- **Safety:** ❌ N/A (not built)
- **Gaps:** Page not built; no i18n keys; breaks journey chain (isAvailable:false); no spec document; needed to complete Regulation stage

### 6. EFT Tapping — SIDELINED ⏸️
- **Route:** N/A → **404**
- **Framework:** Referenced in trc-framework.md Stage 2 (Regulation) as "EFT كأداة دعم ذاتي"
- **Master-map:** Asset 2.3 `trc-eft-tapping`
- **TRC_STEPS:** ❌ Not registered
- **TRC_ASSETS:** ❌ Not registered
- **Gaps:** Deliberately sidelined for Wave 2; clinically requires professional guidance concern; no page, no i18n, no journey link

### 7. Thought Reframing — SIDELINED ⏸️
- **Route:** N/A → **404**
- **Framework:** Referenced in trc-framework.md Stage 2 as "إعادة بناء السرد الذاتي (TF-CBT)"
- **Master-map:** Asset 2.4 `trc-thought-reframing`
- **TRC_STEPS:** ❌ Not registered
- **TRC_ASSETS:** ❌ Not registered
- **Gaps:** Deliberately sidelined; is a prerequisite for Shame Recovery (TF-CBT reframing); no page, no i18n, no journey link

### 8. Trauma Journal — SIDELINED ⏸️
- **Route:** N/A → **404**
- **Framework:** Referenced in trc-framework.md Stage 2 as "يوميات التعافي"
- **Master-map:** Asset 2.5 `trc-trauma-journal`
- **TRC_STEPS:** ❌ Not registered
- **TRC_ASSETS:** ❌ Not registered
- **Gaps:** Deliberately sidelined; journal system exists at `/apps/journal-system` but not TRC-specific; no page, no i18n, no journey link

### 9. Regulation Guide — ORPHAN-LINKED 📎
- **Route:** `/recovery/trc/regulation-guide` → **200**
- **TRC_STEPS:** ❌ Not in journey chain
- **TRC_ASSETS:** ❌ Not in registry
- **Safety:** SafetyResponse ✅, TherapeuticExit ✅, MedicalDisclaimer ✅, DistressCheckIn ❌
- **i18n:** AR+EN safety keys only (no content keys)
- **Gaps:** Not positioned in journey chain; no next/previous step; no DistressCheckIn; article-style (5643 chars) with minimal content; was "orphan" — now linked from regulation-toolkit but not in formal journey

### 10. Secondary Trauma — ORPHAN-LINKED 📎
- **Route:** `/recovery/trc/secondary-trauma` → **200**
- **TRC_STEPS:** ❌ Not in journey chain
- **TRC_ASSETS:** ❌ Not in registry
- **Safety:** SafetyResponse ✅, TherapeuticExit ✅, MedicalDisclaimer ✅, DistressCheckIn ❌
- **i18n:** AR+EN safety keys only (no content keys)
- **Gaps:** Not positioned in journey chain; no next/previous step; no DistressCheckIn; article-style (5902 chars); was "orphan" — now linked from regulation-toolkit but not in formal journey

---

## Gap Analysis

### Critical Gaps (Block Stage Completion)
1. **Shame Recovery not built** — Journey chain breaks at `trauma-responses → shame-recovery → boundaries`. Users completing Trauma Responses have no next step within Regulation.
2. **Registry status mismatches** — 4 built assets still marked `planned` in TRC_ASSETS; Safety Plan has WRONG stage (`safety` instead of `regulation`).
3. **Regulation Toolkit not in TRC_ASSETS** — Built and live but invisible to registry system.

### High Gaps (Safety & Clinical)
4. **DistressCheckIn missing on 4/6 built assets** — Only trigger-mapping and safety-plan have it.
5. **Contraindications never shown to users** — They exist in journey model and registry but are NOT rendered in any UI component.
6. **No clinical review completed** — All assets are in production without clinical sign-off.
7. **No downloadable companions** — All Regulation assets have `downloadables: []`. Zero PDF/printable resources.

### Medium Gaps (Journey & Navigation)
8. **Orphan articles not in journey chain** — Regulation Guide and Secondary Trauma are built but not in TRC_STEPS, breaking the formal journey model.
9. **EnhancedSuggestedNextStep missing** — Only regulation-toolkit uses it; trigger-mapping, safety-plan, trauma-responses use basic SuggestedNextStep.
10. **Thought Reframing is prerequisite for Shame Recovery** — TF-CBT reframing is the methodology behind shame recovery, but it's sidelined. Building Shame Recovery without Thought Reframing creates a dependency gap.

### Low Gaps (i18n & Polish)
11. **No i18n keys for sidelined assets** — EFT, Thought Reframing, Trauma Journal have zero translation keys.
12. **Regulation Guide/Secondary Trauma have minimal i18n** — Only safety keys, no content translation keys.

---

## Dependency Graph

```
SAFETY STAGE (prerequisite)
  grounding → a52 → safe-place → body-scan
      │
      ▼ (safety gate)
REGULATION STAGE
  trigger-mapping ──→ safety-plan ──→ regulation-toolkit ──→ trauma-responses
                                                              │
                                                              ▼
                                                        shame-recovery ──→ [INTEGRATION: boundaries]
                                                              ▲
                                                              │ (TF-CBT dependency)
                                                        thought-reframing ⏸️
                                                              ▲
                                                              │
  eft-tapping ⏸️                                        trauma-journal ⏸️

ORPHAN ARTICLES (linked from regulation-toolkit):
  regulation-guide ────→ regulation-toolkit (cross-link)
  secondary-trauma ────→ regulation-toolkit (cross-link)
```

### Dependency Rules
- `shame-recovery` DEPENDS ON `thought-reframing` (TF-CBT methodology)
- `safety-plan` DEPENDS ON `trigger-mapping` (you need to know triggers before planning)
- ALL Regulation assets DEPEND ON Safety stage completion (safety gate in next-step-engine.ts)

---

## Recommended Build Order for Missing Assets

### Priority 1: Complete the Journey Chain (Unblock Regulation → Integration)
| Order | Asset | Effort | Impact | Rationale |
|-------|-------|--------|--------|-----------|
| 1 | **Shame Recovery** | 3-4 days | CRITICAL | Breaks the journey chain. Users completing Trauma Responses hit a dead end. Must be built to unblock Integration stage. |

### Priority 2: Clinical Safety Gaps
| Order | Asset | Effort | Impact | Rationale |
|-------|-------|--------|--------|-----------|
| 2 | Add DistressCheckIn to regulation-toolkit, trauma-responses | 2-3 hours | HIGH | Interactive tools without distress monitoring are clinically unsafe |
| 3 | Show contraindications in UI | 3-4 hours | HIGH | Data exists in model but is invisible to users |
| 4 | Fix registry status mismatches | 1-2 hours | MEDIUM | 4 assets marked "planned" that are actually live |

### Priority 3: Thought Reframing (Enables Better Shame Recovery)
| Order | Asset | Effort | Impact | Rationale |
|-------|-------|--------|--------|-----------|
| 5 | **Thought Reframing** | 3-4 days | HIGH | TF-CBT cognitive restructuring is the methodology behind Shame Recovery. Building it enriches Shame Recovery and is independently valuable. |

### Priority 4: Journey Formalization
| Order | Asset | Effort | Impact | Rationale |
|-------|-------|--------|--------|-----------|
| 6 | Add regulation-guide to TRC_STEPS as article | 2-3 hours | MEDIUM | Currently orphan; should be formalized |
| 7 | Add secondary-trauma to TRC_STEPS as article | 2-3 hours | MEDIUM | Currently orphan; should be formalized |
| 8 | Add regulation-toolkit to TRC_ASSETS | 1-2 hours | MEDIUM | Missing from registry despite being built |

### Priority 5: Downloadable Companions
| Order | Asset | Effort | Impact | Rationale |
|-------|-------|--------|--------|-----------|
| 9 | PDF for trigger-mapping worksheet | 2-3 hours | MEDIUM | Users want printable trigger log |
| 10 | PDF for safety-plan worksheet | 2-3 hours | MEDIUM | Stanley & Brown intervention is paper-based |
| 11 | PDF for regulation-toolkit quick-reference | 2-3 hours | LOW | Emergency reference card |

### Priority 6: Sidelined Assets (Future Waves)
| Order | Asset | Effort | Impact | Rationale |
|-------|-------|--------|--------|-----------|
| 12 | **EFT Tapping** | 4-5 days | MEDIUM | Requires clinical review; self-tap concerns |
| 13 | **Trauma Journal** | 3-4 days | MEDIUM | Journal system exists; TRC-specific prompts needed |

---

## Summary Statistics

| Metric | Value |
|--------|-------|
| **Total Regulation Assets** | 10 |
| **LIVE (built + route 200)** | 4 |
| **ORPHAN-LINKED (built but not in journey)** | 2 |
| **PLANNED (in journey but not built)** | 1 |
| **SIDELINED / NOT-BUILT** | 3 |
| **Routes returning 200** | 6 |
| **Routes returning 404** | 4 |
| **i18n complete (AR+EN)** | 6 |
| **Safety triple (SR+TE+MD)** | 6 |
| **DistressCheckIn** | 2 |
| **Downloadable companions** | 0 |
| **Clinical reviews completed** | 0 |
| **Journey chain complete** | ❌ No (breaks at shame-recovery) |
| **Registry accuracy** | ⚠️ 3 mismatches |
| **Gap count** | 12 (3 critical, 4 high, 3 medium, 2 low) |

---

## Next Actions (Immediate)

1. **Build Shame Recovery page** — This is the #1 blocker. Without it, the Regulation journey is incomplete and Integration stage is inaccessible via the formal journey.
2. **Fix TRC_ASSETS registry** — Update status for 4 built assets from `planned` to `live`; fix safety-plan stage from `safety` to `regulation`; add regulation-toolkit entry.
3. **Add DistressCheckIn** to regulation-toolkit and trauma-responses pages.
4. **Build Thought Reframing** as a prerequisite enrichment for Shame Recovery (TF-CBT methodology).
5. **Formalize orphan articles** — Add regulation-guide and secondary-trauma to TRC_STEPS as non-sequential articles.

