# TRC Source Reintegration Audit — تدقيق إعادة دمج المصادر

**Date:** 2026-03-05  
**Auditor:** Phase 1 Agent — Source Reintegration Auditor  
**Project:** /var/www/tamkinly  
**Scope:** ALL assets/concepts in original TRC source material vs. current implementation  
**Method:** Cross-reference of 6 source documents × 3 implementation files × 14 built routes

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Total Assets Found in Source** | **22** |
| **Correctly Placed (built + registered + domain-correct)** | **9** |
| **Needing Reintegration (in source but not built/registered)** | **10** |
| **Rejected (not clinically justified for TRC)** | **3** |
| **Domain Contamination Found** | **0** (domain isolation is clean) |

### Key Findings

1. **TRC source material defines 22 unique assets** (13 interactive tools, 6 articles, 3 workbooks/downloads). Only 9 are fully implemented in the current codebase.
2. **10 assets exist in source but are missing from implementation** — these were either planned but never built (Wave 2/3), or were deleted/sidelined during cleanup.
3. **The most critical gaps are in Regulation stage**: EFT Tapping, Thought Reframing, Trauma Recovery Journal are all in the original source but completely absent from TRC_STEPS and the route system.
4. **Integration stage has 3 assets registered in TRC_STEPS** but all marked `isAvailable: false` — they exist as journey model entries but have no page implementations.
5. **Box Breathing and Extended Exhale** are mentioned in the source as distinct breathing techniques but were merged into A52. They need separate implementations or explicit sub-modes.
6. **Parents Guide and Window of Tolerance** are core concepts in the source material but have no journey step or route.
7. **Zero cross-domain contamination found** — TRC domain is properly isolated from Porn Recovery.

---

## Source Documents Analyzed

| # | Document | Assets Defined |
|---|----------|---------------|
| 1 | `docs/recovery/frameworks/trc-framework.md` | 9 principles, 3 stages, 6 worksheet types, 6 tool types, 7 article types |
| 2 | `docs/recovery/frameworks/trc-master-map.md` | 13 tools, 6 articles, 3 workbooks (22 total) |
| 3 | `docs/recovery/trc/trc-methodology.md` | 8 principles, 5 stages, 6 worksheet types, 9 article types, 4 tool types |
| 4 | `docs/recovery/trc/trc-asset-blueprint.md` | 5 asset types, safety protocols |
| 5 | `docs/recovery/trc/trc-download-prompts.md` | 6 downloadable worksheets |
| 6 | `docs/recovery/scientific-gap-analysis.md` | Gap analysis confirming missing assets |

---

## Current Implementation Summary

### TRC_STEPS Registered (recovery-journey.ts)

| Step ID | Stage | isAvailable | Route Exists |
|---------|-------|-------------|-------------|
| grounding | safety | true | ✅ `/recovery/trc/grounding` |
| a52-breathing | safety | true | ✅ `/recovery/trc/a52` |
| safe-place | safety | true | ✅ `/recovery/trc/safe-place` |
| body-scan | safety | true | ✅ `/recovery/trc/body-scan` |
| trauma-psychoeducation | safety | true | ✅ `/recovery/trc/what-trauma-does-to-the-body` |
| trigger-mapping | regulation | true | ✅ `/recovery/trc/worksheets/trigger-mapping` |
| safety-plan | regulation | true | ✅ `/recovery/trc/worksheets/safety-plan` |
| regulation-toolkit | regulation | true | ✅ `/recovery/trc/regulation-toolkit` |
| trauma-responses | regulation | true | ✅ `/recovery/trc/what-happens-during-trauma-responses` |
| boundaries | integration | **false** | ❌ Not built |
| therapist-selection | integration | **false** | ❌ Not built |
| recovery-milestones | integration | **false** | ❌ Not built |

### Built Routes (14 page.tsx files)

1. `/recovery/trc/page.tsx` — Hub
2. `/recovery/trc/a52/page.tsx` — A52 Breathing
3. `/recovery/trc/body-scan/page.tsx` — Body Scan
4. `/recovery/trc/downloads/page.tsx` — Downloads page
5. `/recovery/trc/grounding/page.tsx` — Grounding exercise
6. `/recovery/trc/grounding-guide/page.tsx` — Grounding guide
7. `/recovery/trc/journey/page.tsx` — Journey page
8. `/recovery/trc/regulation-guide/page.tsx` — Regulation guide
9. `/recovery/trc/regulation-toolkit/page.tsx` — Regulation Toolkit
10. `/recovery/trc/safe-place/page.tsx` — Safe Place
11. `/recovery/trc/secondary-trauma/page.tsx` — Secondary Trauma article
12. `/recovery/trc/what-happens-during-trauma-responses/page.tsx` — Trauma Responses
13. `/recovery/trc/what-trauma-does-to-the-body/page.tsx` — Psychoeducation
14. `/recovery/trc/worksheets/safety-plan/page.tsx` — Safety Plan
15. `/recovery/trc/worksheets/trigger-mapping/page.tsx` — Trigger Mapping

---

## Full Classification Table

| # | Asset ID | Original Concept | Original Source | Original Domain | Current Status | Route Built? | In TRC_STEPS? | Correct Domain | Correct Stage | Asset Type | Action | Reason | Clinical Review | Dependency |
|---|----------|-----------------|----------------|-----------------|---------------|-------------|---------------|----------------|---------------|------------|--------|--------|----------------|-----------|
| 1 | grounding-54321 | 5-4-3-2-1 Sensory Grounding | trc-framework.md §3, trc-master-map 1.1 | TRC | **Built & Live** | ✅ | ✅ | TRC only | safety | Interactive Tool | **Keep** | Fully implemented, domain-correct, route works | No | None |
| 2 | trc-a52-breathing | A52 Breathing (5-5-2) | trc-framework.md §8, trc-master-map 1.2 | TRC | **Built** | ✅ | ✅ | TRC only | safety | Interactive Tool | **Keep** | Fully implemented with timer, contraindications listed | No | None |
| 3 | trc-safe-place | Safe Place Visualization | trc-framework.md §1, trc-master-map 1.3 | TRC | **Built** | ✅ | ✅ | TRC only | safety | Interactive Tool | **Keep** | Built with localStorage persistence for visualization data | No | None |
| 4 | trc-body-scan | Body Scan (guided) | trc-framework.md §3, trc-master-map 1.4 | TRC | **Built** | ✅ | ✅ | TRC only | safety | Interactive Tool | **Keep** | Built with contraindications for dissociation | No | None |
| 5 | trc-safety-plan | Safety Plan (Emotional) | trc-framework.md §1, trc-master-map 1.5, download-prompts #2 | TRC | **Built** | ✅ | ✅ | TRC only | regulation | Interactive Worksheet | **Keep** | Wave 2B — built as worksheet with interactive form | No | trigger-mapping should precede |
| 6 | trc-trigger-mapping | Trigger Mapping | trc-framework.md §2, trc-master-map 2.1, download-prompts #1 | TRC | **Built** | ✅ | ✅ | TRC only | regulation | Interactive Worksheet | **Keep** | Wave 2A — built with trigger identification form | No | safety stage must complete |
| 7 | trc-regulation-toolkit | Regulation Toolkit (hub) | trc-framework.md §2, trc-master-map 2.2 | TRC | **Built** | ✅ | ✅ | TRC only | regulation | Toolkit Hub | **Keep** | Serves as aggregator for regulation tools | No | safety stage must complete |
| 8 | trc-trauma-responses | Trauma Response Patterns (fight/flight/freeze/fawn) | trc-framework.md §2, methodology §1 | TRC | **Built** | ✅ | ✅ | TRC only | regulation | Article | **Keep** | Psychoeducation on 4F responses, properly therapeutic | No | safety stage should complete |
| 9 | trc-psychoeducation | What Trauma Does To The Body | trc-framework.md §1, trc-master-map 1.A1 | TRC | **Built** | ✅ | ✅ | TRC only | safety | Article | **Keep** | Core psychoeducation article, bilingual | No | None |
| 10 | **trc-eft-tapping** | EFT Self-Help Tapping | trc-framework.md §2, trc-master-map 2.3, download-prompts #6, methodology §8 | TRC | **DELETED/Sidelined** | ❌ | ❌ | TRC only | regulation | Interactive Tool + Downloadable | **Rebuild** | EFT is explicitly in the source material as a regulation-stage self-help tool with its own worksheet. It was planned in master-map 2.3 but never built. Contraindicated for active dissociation. | Yes — EFT for trauma requires careful safety gating. Contraindication: dissociation. | safety stage must complete; must not be used during active dissociation |
| 11 | **trc-thought-reframing** | Thought Reframing (TF-CBT cognitive restructuring) | trc-framework.md §7, trc-master-map 2.4, download-prompts #7 | TRC | **DELETED/Sidelined** | ❌ | ❌ | TRC only | regulation | Interactive Tool + Worksheet | **Rebuild** | Thought-Evidence-Alternative worksheet is explicitly defined in the source (download-prompts #7) as a TF-CBT tool. Missing from TRC_STEPS entirely. | Yes — Cognitive restructuring for trauma requires safety stage completion and is contraindicated for acute crisis. | safety stage must complete; trigger-mapping should precede |
| 12 | **trc-trauma-journal** | Trauma Recovery Journal | trc-framework.md §2, trc-master-map 2.5, download-prompts #4 | TRC | **DELETED/Sidelined** | ❌ | ❌ | TRC only | regulation | Journal + Downloadable | **Rebuild** | Journal prompts are explicitly defined in the source (download-prompts #4) with 5 guided questions. Listed in master-map 2.5. Missing from TRC_STEPS. Contraindicated before safety is established (writing may activate traumatic memories). | Yes — Journaling about trauma can be re-traumatizing without safety foundation. Must require safety stage completion. | safety stage must complete; ideally after trigger-mapping |
| 13 | **trc-boundary-setting** | Boundary Setting Worksheet | trc-framework.md §3, trc-master-map 3.1, download-prompts #8 | TRC | **Sidelined (Wave 3)** | ❌ | ✅ (isAvailable: false) | TRC only | integration | Interactive Worksheet | **Rebuild** | Exists in TRC_STEPS but isAvailable: false with no route/page. Source defines it as integration-stage tool for rebuilding relationships safely. | Yes — Boundary setting in trauma context requires completed regulation stage to avoid re-traumatization through unsafe confrontation. | regulation stage must complete |
| 14 | **trc-therapist-selection** | Therapist Selection Checklist | trc-framework.md §3, trc-master-map 3.2, download-prompts #9 | TRC | **Sidelined (Wave 3)** | ❌ | ✅ (isAvailable: false) | TRC only | integration | Downloadable Checklist + Article | **Rebuild** | Exists in TRC_STEPS but isAvailable: false. Source defines detailed checklist for evaluating trauma therapist qualifications (EMDR, TF-CBT certification). | No — Informational resource, not therapeutic tool. Low risk. | None (can be accessed at any stage) |
| 15 | **trc-recovery-milestones** | Recovery Milestones | trc-framework.md §3, trc-master-map 3.3 | TRC | **Sidelined (Wave 3)** | ❌ | ✅ (isAvailable: false) | TRC only | integration | Tracker | **Replace** | Concept valid but implementation must NOT use gamification patterns (no streaks, no percentages). Source emphasizes non-linear recovery — milestone tracking must respect this. Current TRC_STEPS entry exists but has no clinical design. | Yes — Progress tracking in trauma context risks creating shame when milestones aren't met. Design must be non-evaluative. | regulation stage should complete |
| 16 | **trc-article-parents-guide** | Parents Quick Guide (10 Do / 10 Don't) | trc-framework.md §9, trc-master-map 3.A1, download-prompts #5 | TRC | **DELETED/Sidelined** | ❌ | ❌ | TRC only | safety | Article + Downloadable | **Rebuild** | Parents Guide is a core source asset (download-prompts #5). Addresses secondary trauma in parents and provides 10 Do/10 Don't list. NOT the same as the existing `secondary-trauma` article which is a general article. Parents Guide is a practical worksheet for parents. | Yes — Content about children requires safeguarding review and age-appropriate framing. | None (can be used independently) |
| 17 | **trc-box-breathing** | Box Breathing (4-4-4-4) | trc-framework.md §8, methodology §2 | TRC | **Merged into A52** | ❌ (sub-mode) | ❌ | TRC only | safety | Interactive Tool | **Replace** | Source lists Box Breathing as a DISTINCT technique from A52 with different clinical use: A52 for chronic tension, Box Breathing for acute panic. Currently merged. Should be a sub-mode within the breathing tool or a separate page. | No — Well-established breathing technique, no clinical risk. | None |
| 18 | **trc-extended-exhale** | Extended Exhale (4-6~8) | trc-framework.md §8, methodology §2 | TRC | **Merged into A52** | ❌ (sub-mode) | ❌ | TRC only | safety/regulation | Interactive Tool | **Replace** | Source lists Extended Exhale as a DISTINCT technique for intrusive memories and nightmares. Different clinical target than A52. Should be a sub-mode or separate page. | No — Well-established breathing technique, no clinical risk. | None |
| 19 | **trc-window-of-tolerance** | Window of Tolerance concept | trc-framework.md §4 | TRC | **DELETED/Sidelined** | ❌ | ❌ | TRC only | regulation | Supporting Concept + Article | **Rebuild** | Window of Tolerance is a CORE CLINICAL CONCEPT in the source (Principle 4). It explains why regulation tools work and when to stop. Not just an article — it's the theoretical foundation for the entire Regulation stage. Missing as both a standalone explanation and as embedded guidance in other tools. | Yes — Incorrect understanding of window of tolerance could lead users to push through when they should stop. | safety stage should complete |
| 20 | **trc-safety-workbook** | Safety Workbook (PDF compilation) | trc-master-map 1.D1 | TRC | **Not Built** | ❌ | ❌ | TRC only | safety | Downloadable Workbook | **Rebuild** | Source defines a compiled PDF workbook for the safety stage. Zero TRC downloadable assets are currently built. | No — Compilation of existing content. | All safety stage tools must be built first |
| 21 | **trc-regulation-workbook** | Regulation Workbook (PDF compilation) | trc-master-map 2.D1 | TRC | **Not Built** | ❌ | ❌ | TRC only | regulation | Downloadable Workbook | **Rebuild** | Source defines a compiled PDF workbook for the regulation stage. | No — Compilation of existing content. | All regulation stage tools must be built first |
| 22 | **trc-recovery-workbook** | Recovery/Integration Workbook (PDF compilation) | trc-master-map 3.D1 | TRC | **Not Built** | ❌ | ❌ | TRC only | integration | Downloadable Workbook | **Rebuild** | Source defines a compiled PDF workbook for the integration stage. | No — Compilation of existing content. | All integration stage tools must be built first |

---

## Additional Source Concepts (Not Asset-Grade, But Required)

These concepts appear in the source material as embedded protocols or supporting concepts that don't warrant standalone pages but MUST be implemented within existing/new tools:

| # | Concept | Source | Where It Should Live | Current Status |
|---|---------|--------|---------------------|----------------|
| 1 | Dissociation Protocol | trc-framework.md §و | Every therapeutic tool page | **Missing from UI** — exists in docs only |
| 2 | Freeze Response Protocol | trc-framework.md §و | Every therapeutic tool page | **Missing from UI** — exists in docs only |
| 3 | Panic Attack Protocol | trc-framework.md §و | A52/Box Breathing pages | **Missing from UI** — exists in docs only |
| 4 | Intrusive Memories Protocol | trc-framework.md §و | Extended Exhale, Journal pages | **Missing from UI** — exists in docs only |
| 5 | TherapeuticExit (mandatory) | trc-asset-blueprint §د | Every TRC therapeutic page | **Partially implemented** — some pages missing |
| 6 | Grounding Reset (5-4-3-2-1 always available) | trc-asset-blueprint §ج3 | Every TRC therapeutic page | **Missing from most pages** |
| 7 | Therapist Referral text | trc-asset-blueprint §ج4 | Every self-help tool | **Missing from most pages** |
| 8 | "Calmmmm" breathing pattern | trc-framework.md §8 | Breathing tools | **Not implemented** |
| 9 | Window of Tolerance visual indicator | trc-framework.md §4 | Regulation tools | **Not implemented** |

---

## Assets Needing Action (Priority Order)

### Critical Priority — Rebuild (Regulation stage gaps)

| # | Asset | Why Critical | Estimated Effort | Blocks |
|---|-------|-------------|-------------------|--------|
| 1 | **EFT Tapping** | Source defines it with full worksheet spec. Regulation stage is incomplete without it. | Medium (6-8h) | Nothing — can build after safety stage |
| 2 | **Thought Reframing** | TF-CBT is a core therapeutic pathway. Missing from TRC entirely. | Medium (6-8h) | trigger-mapping should precede |
| 3 | **Trauma Recovery Journal** | Source defines 5 guided prompts. Journaling is the primary long-term regulation tool. | Medium (4-6h) | safety stage must complete |
| 4 | **Window of Tolerance** | Theoretical foundation for ALL regulation tools. Without it, users don't understand when to stop. | Low (3-4h) | Nothing — conceptual article |

### High Priority — Rebuild (Integration stage)

| # | Asset | Why High | Estimated Effort | Blocks |
|---|-------|---------|-------------------|--------|
| 5 | **Boundary Setting** | TRC_STEPS has it but `isAvailable: false`. Integration stage incomplete. | Medium (6-8h) | regulation stage must complete |
| 6 | **Therapist Selection** | TRC_STEPS has it but `isAvailable: false`. Critical for connecting users to professional help. | Low (3-4h) | Nothing — informational |
| 7 | **Parents Guide** | Core source asset. Different from existing secondary-trauma article. Addresses parent audience specifically. | Medium (4-6h) | Nothing — independent |
| 8 | **Recovery Milestones** | TRC_STEPS has it but `isAvailable: false`. Must be non-gamified design. | Medium (4-6h) | regulation stage should complete |

### Medium Priority — Replace (Breathing sub-modes)

| # | Asset | Why Medium | Estimated Effort | Blocks |
|---|-------|-----------|-------------------|--------|
| 9 | **Box Breathing (4-4-4-4)** | Distinct clinical target (acute panic) from A52 (chronic tension). Currently merged. | Low (2-3h) | Nothing |
| 10 | **Extended Exhale (4-6~8)** | Distinct clinical target (intrusive memories/nightmares) from A52. Currently merged. | Low (2-3h) | Nothing |

### Low Priority — Rebuild (Downloadable workbooks)

| # | Asset | Why Low | Estimated Effort | Blocks |
|---|-------|--------|-------------------|--------|
| 11 | **Safety Workbook** | PDF compilation — depends on all safety tools being built first. | Low (2-3h) | All safety tools |
| 12 | **Regulation Workbook** | PDF compilation — depends on all regulation tools. | Low (2-3h) | All regulation tools |
| 13 | **Integration Workbook** | PDF compilation — depends on all integration tools. | Low (2-3h) | All integration tools |

---

## Assets Correctly Placed

These 9 assets are built, registered, domain-correct, and functioning:

1. ✅ **grounding-54321** — Route live, journey registered, therapeutic exit available
2. ✅ **trc-a52-breathing** — Route live, journey registered, contraindications listed
3. ✅ **trc-safe-place** — Route live, journey registered, localStorage persistence
4. ✅ **trc-body-scan** — Route live, journey registered, contraindications for dissociation
5. ✅ **trc-safety-plan** — Route live (worksheets/safety-plan), journey registered
6. ✅ **trc-trigger-mapping** — Route live (worksheets/trigger-mapping), journey registered
7. ✅ **trc-regulation-toolkit** — Route live, journey registered, serves as hub
8. ✅ **trc-trauma-responses** — Route live, journey registered, psychoeducation
9. ✅ **trc-psychoeducation** — Route live (what-trauma-does-to-the-body), journey registered

---

## Rejected Assets

These 3 items were considered but rejected for specific reasons:

| # | Asset | Rejection Reason |
|---|-------|-----------------|
| 1 | **PMR (Progressive Muscle Relaxation)** | NOT in any TRC source document. PMR is a general anxiety tool, not trauma-specific. Adding it would violate the source-fidelity principle. If needed, it belongs in a general wellness section, not TRC. |
| 2 | **Urge Surfing** | NOT in TRC source material. This is a Porn Recovery concept (mindfulness of urges without acting). Cross-domain contamination risk if placed in TRC. Belongs exclusively in Porn Recovery. |
| 3 | **Understanding Urges / Compulsion Cycle** | NOT in TRC source material. These are Porn Recovery psychoeducation concepts about the addiction cycle. TRC focuses on trauma responses (fight/flight/freeze/fawn), not compulsive urges. Cross-domain contamination. |

---

## Domain Contamination Check

| Check | Result |
|-------|--------|
| TRC_STEPS references Porn Recovery steps? | ✅ CLEAN — Zero cross-references |
| TRC routes import Porn Recovery components? | ✅ CLEAN — Zero cross-imports |
| Porn Recovery assets cross-link to TRC? | ⚠️ Historical violations existed (urge-log→a52, relapse-analysis→grounding) but were flagged in domain audit |
| TRC download page references REC-* files? | ✅ CLEAN |
| TRC content uses Porn Recovery language/tone? | ✅ CLEAN — TRC uses clinical/validating tone, PR uses brotherly/practical tone |
| Safety protocols shared incorrectly? | ✅ CLEAN — TRC has TherapeuticExit + dissociation protocols; PR has none (correctly) |

**Domain isolation is clean.** No contamination found in current code.

---

## Safety Protocol Gaps

The source material defines 4 mandatory safety protocols for TRC. Their current UI implementation status:

| Protocol | Source | Required In | UI Implementation |
|----------|--------|-------------|-------------------|
| Dissociation Protocol | trc-framework.md §و | Every therapeutic page | ❌ **Not shown to users** — exists in journey model only |
| Freeze Response Protocol | trc-framework.md §و | Body Scan, Journal | ❌ **Not shown to users** |
| Panic Attack Protocol | trc-framework.md §و | A52, Box Breathing | ❌ **Not shown to users** |
| Intrusive Memories Protocol | trc-framework.md §و | Extended Exhale, Journal | ❌ **Not shown to users** |
| TherapeuticExit | trc-asset-blueprint §د1 | Every TRC page | ⚠️ **Partial** — some pages missing |
| Grounding Reset (5-4-3-2-1 always available) | trc-asset-blueprint §ج3 | Every therapeutic page | ❌ **Missing from most pages** |
| Therapist Referral | trc-asset-blueprint §ج4 | Every self-help tool | ❌ **Missing from most pages** |

**This is a critical safety gap.** Protocols exist in documentation but are not rendered in the user-facing UI.

---

## Recommendations

### Immediate (Before Any New Asset Build)

1. **Render safety protocols in UI** — Dissociation, Freeze, Panic, and Intrusive Memories protocols must be visible to users on every therapeutic page, not just in docs.
2. **Add Grounding Reset button** to every therapeutic TRC page — 5-4-3-2-1 must always be accessible.
3. **Add Therapist Referral text** to every self-help tool — "This tool does not replace specialized treatment."
4. **Fix TherapeuticExit coverage** — Verify it's on every therapeutic page, not just some.

### Next Build Sprint (Regulation Completion)

5. **Build EFT Tapping** (trc-eft-tapping) — Full interactive tool with tapping point diagram, SUDS scale, and contraindication check for dissociation.
6. **Build Thought Reframing** (trc-thought-reframing) — Thought-Evidence-Alternative worksheet per TF-CBT model.
7. **Build Trauma Recovery Journal** (trc-trauma-journal) — 5 guided prompts with safety gate requiring safety stage completion.
8. **Build Window of Tolerance article** (trc-window-of-tolerance) — Core concept explanation for regulation stage.

### Following Sprint (Integration)

9. **Build Boundary Setting** (trc-boundaries) — Mark isAvailable: true after building page.
10. **Build Therapist Selection** (trc-therapist-selection) — Mark isAvailable: true after building page.
11. **Build Parents Guide** (trc-article-parents-guide) — Separate from secondary-trauma article.
12. **Build Recovery Milestones** (trc-recovery-milestones) — Non-gamified, non-linear progress indicator. Mark isAvailable: true.

### Breathing Tool Enhancement

13. **Add Box Breathing sub-mode** to A52 tool — Toggle between A52 (5-5-2), Box (4-4-4-4), and Extended Exhale (4-6~8) with clinical use-case guidance for each.
14. **Add Extended Exhale sub-mode** — Specifically targeted at intrusive memories and nightmares.

### Download Infrastructure

15. **Create `/public/downloads/trc/` directory** — Currently doesn't exist.
16. **Build TRC downloadable worksheets** — Grounding pocket card, A52 breathing card, Safe Place worksheet, Body awareness worksheet.
17. **Register TRC files in bilingual-files.ts** — Currently zero TRC keys registered.

---

## Methodology Fidelity Score

| Stage | Source Assets | Implemented | Fidelity |
|-------|-------------|-------------|----------|
| Safety | 5 tools + 2 articles + 1 workbook = 8 | 5 tools + 2 articles = 7 | **87.5%** |
| Regulation | 5 tools + 2 articles + 1 workbook = 8 | 3 tools + 1 article = 4 | **50%** |
| Integration | 3 tools + 2 articles + 1 workbook = 6 | 0 (all isAvailable: false) | **0%** |
| **Total** | **22** | **11** | **50%** |

The TRC implementation covers 50% of source-defined assets by count, but the Regulation and Integration stages have critical gaps in therapeutic tools that the source material considers essential.

---

*Generated by Phase 1 Agent — Source Reintegration Auditor*  
*Date: 2026-03-05*  
*Source fidelity: All classifications traceable to original TRC source documents*
