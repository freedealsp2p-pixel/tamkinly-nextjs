# TRC Asset Reclassification Report — تقرير إعادة تصنيف أصول TRC

**Date:** 2026-03-05
**Agent:** Phase 3 — Asset Reclassification Agent
**Project:** /var/www/tamkinly
**Mission:** Reclassify 5 deleted/sidelined assets correctly based on scientific source material

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Assets Classified** | **5** |
| **Classification A (PR only)** | **1** (urge-surfing) |
| **Classification C (Both domains)** | **1** (shame-and-recovery) |
| **Classification D (Rejected)** | **1** (PMR) |
| **Classification E (Supporting concept)** | **2** (understanding-urges, compulsion-cycle) |
| **Added to Journey Models** | **2** (urge-surfing → PR, shame-recovery → TRC) |
| **Rejected with documented reason** | **1** (PMR) |
| **Domain Separation Violations** | **0** |

---

## Methodology

Each asset was analyzed against:
1. **TRC Framework** (`docs/recovery/frameworks/trc-framework.md`) — The clinical authority for TRC
2. **TRC Master Map** (`docs/recovery/frameworks/trc-master-map.md`) — Asset inventory from source
3. **Porn Recovery Framework** (`docs/recovery/frameworks/porn-recovery-framework.md`) — The authority for PR
4. **TRC Source Reintegration Audit** (`docs/recovery/recovery-domain-audit.md`) — Previous classification
5. **Current codebase** — `recovery-journey.ts`, `next-step-engine.ts`, registries

**Key principle:** Classification is based on the ORIGINAL scientific source, not on where the asset was previously placed in code.

---

## Classification Table

| # | Asset | Classification | Correct Domain | Correct Stage | Asset Type | Action | Reason | Needs Build? |
|---|-------|---------------|----------------|---------------|------------|--------|--------|-------------|
| 1 | urge-surfing | **A** (PR only) | Porn Recovery | replacement (Stage 3) | Interactive Tool | Register in PR journey | Marlatt & Gordon (1985) technique for riding out addiction cravings. NOT in TRC source. TRC uses grounding/breathing for regulation, not urge surfing. | Yes (PR page) |
| 2 | understanding-urges | **E** (Supporting) | Porn Recovery | awareness (Stage 1) | Psychoeducation Article | Integrate into brain-cycle step | Content about the urge mechanism is already covered by the `brain-cycle` step ("trigger → urge → response → relief → repeat"). A standalone article would duplicate. Register as downloadable guide only. | No (part of brain-cycle) |
| 3 | compulsion-cycle | **E** (Supporting) | Porn Recovery | awareness (Stage 1) | Psychoeducation Article | Integrate into brain-cycle step | The compulsion cycle IS the brain-cycle step content. "The Compulsion Cycle" as a standalone concept duplicates what `brain-cycle` already teaches. Register as downloadable guide only. | No (part of brain-cycle) |
| 4 | shame-and-recovery | **C** (Both domains) | Both (separate) | TRC: regulation / PR: resilience | TRC: Interactive Tool / PR: Article | Create 2 separate implementations | Shame exists in BOTH domains but with fundamentally different origins and interventions. TRC shame: sexual/self-blame from assault → TF-CBT reframing. PR shame: relapse shame → feeds addiction cycle. NOT the same concept. | Yes (both) |
| 5 | PMR | **D** (Rejected) | None | None | N/A | Reject with documented reason | NOT in either source document. General anxiety tool, not trauma/addiction-specific. Body Scan already covers body-attention in TRC. PMR's progressive tensing phase can trigger trauma activation. Violates source-fidelity principle. | No |

---

## Detailed Analysis

### 1. Urge Surfing — Classification A (Porn Recovery Only)

**TRC Source Analysis:**
- ❌ NOT mentioned in trc-framework.md
- ❌ NOT mentioned in trc-master-map.md
- ❌ TRC Source Reintegration Audit: "NOT in TRC source material. This is a Porn Recovery concept (mindfulness of urges without acting). Cross-domain contamination risk if placed in TRC."
- TRC uses **grounding** and **breathing** for nervous system regulation — completely different mechanism from urge surfing

**Porn Recovery Source Analysis:**
- ✅ PR framework mentions "Emergency Urge Plan" (Worksheet #7)
- ✅ PR framework uses "Urge Intensity" as a progress metric (1-10 scale)
- ✅ Downloadable-asset-prompts.md references "Urge Surfing Guide" and "Urge Surfing (Marlatt)"
- ✅ PR brain-cycle step: "trigger → urge → response → relief → repeat" — urges are central to PR
- ⚠️ Not yet a standalone step in PORN_RECOVERY_STEPS — the `replacement` stage had empty steps

**Scientific Basis:**
Urge Surfing is a technique from Marlatt & Gordon's Relapse Prevention Therapy (1985). It involves mindfully observing an urge (craving) as a wave that rises and falls, without acting on it or fighting it. This is specific to ADDICTION recovery — the "urge" is a craving for a substance or behavior.

**Classification: A (Porn Recovery only)**
- Urge surfing addresses behavioral cravings, not trauma activation
- TRC has no concept of "urges" — it has "triggers" that cause trauma responses
- Placing urge surfing in TRC would be cross-domain contamination

**Action Taken:**
- Added `urge-surfing` to `PornRecoveryStepId` type
- Added step to `PORN_RECOVERY_STEPS` array (Stage: replacement)
- Updated `replacement` stage to `steps: ['urge-surfing']` (was empty)
- Updated step chain: toolkit → urge-surfing → relapse (was: toolkit → relapse)

---

### 2. Understanding Urges — Classification E (Supporting Concept)

**TRC Source Analysis:**
- ❌ NOT in TRC source material
- TRC Source Reintegration Audit: "NOT in TRC source material. These are Porn Recovery psychoeducation concepts about the addiction cycle."

**Porn Recovery Source Analysis:**
- ✅ PR framework discusses urges in Stage 1 (Awareness)
- ✅ Downloadable-asset-prompts.md lists "Understanding Urges" as a psychoeducation guide
- ⚠️ The `brain-cycle` step already covers the urge mechanism in detail

**Analysis:**
"Understanding Urges" is psychoeducation content explaining what urges are, how they work in the brain, and why they feel overwhelming. This is ALREADY covered by the `brain-cycle` step which describes "trigger → urge → response → relief → repeat". Making it a separate journey step would:
1. Duplicate content already in brain-cycle
2. Break the sequential flow (users would see it twice)
3. Add a step that isn't in the PR framework's 5-stage model

However, "Understanding Urges" as a downloadable PDF psychoeducation guide is valuable — it deepens the content beyond what the interactive step covers.

**Classification: E (Supporting concept → integrate into existing asset)**

**Action Taken:**
- NOT added as a journey step (would duplicate brain-cycle)
- Should be registered as a planned downloadable article (Psychoeducation Guide)
- Content should reference and link to the brain-cycle step

---

### 3. Compulsion Cycle — Classification E (Supporting Concept)

**TRC Source Analysis:**
- ❌ NOT in TRC source material
- TRC uses trauma response patterns, not compulsion cycles
- TRC Source Reintegration Audit: "NOT in TRC source material. These are Porn Recovery psychoeducation concepts about the addiction cycle."

**Porn Recovery Source Analysis:**
- ✅ PR framework's Stage 1 is about "understanding the pattern" — this IS the compulsion cycle
- ✅ The `brain-cycle` step describes the full cycle: "trigger → urge → response → relief → repeat"
- ✅ Downloadable-asset-prompts.md lists "The Compulsion Cycle" as a psychoeducation guide
- ✅ PR Principle 2 describes pornography as an "emotional painkiller" — core compulsion cycle concept

**Analysis:**
"The Compulsion Cycle" is essentially another name for the content already in `brain-cycle`. The addiction cycle (trigger → craving → use → relief → repeat) IS the compulsion cycle. Making it a separate step would be redundant.

**Classification: E (Supporting concept → integrate into existing asset)**

**Action Taken:**
- NOT added as a journey step (would duplicate brain-cycle)
- Should be registered as a planned downloadable article (Psychoeducation Guide)
- Content should reference and link to the brain-cycle step

---

### 4. Shame And Recovery — Classification C (Both Domains, Separate Implementations)

**TRC Source Analysis:**
- ✅ TRC Framework Principle 7: "العار ولوم الذات" (Shame and Self-Blame) — explicitly in source
- ✅ Section 1.3 referenced: shame as a core trauma consequence
- ✅ TF-CBT (Section 2.2) specifically addresses shame reframing
- ✅ TRC trigger mapping includes 'shame' as an emotion type
- ✅ TRC safety plan includes 'shame' as an emotional option
- Source quotes: "الصدمة تخلق قصة مدمّرة عن الذات: 'أنا السبب'، 'جسدي قذر'، 'لا أحد يمكن الوثوق به'"
- TF-CBT reframing: "'كنت طفلاً بريئًا'، 'المسؤولية على المعتدي'"

**Porn Recovery Source Analysis:**
- ✅ PR language tone: "لا لوم، لا خجل" (No blame, no shame)
- ✅ PR relapse management discusses "جلد الذات" (self-flagellation/shame)
- ✅ PR Principle 7 (Resilience): "لا تبالغ في جلد الذات: 'أنا فاسد، أنا منافق' — هذه الأفكار تغذي الانتكاسة القادمة"
- ✅ Downloadable-asset-prompts.md lists "Shame And Recovery" as a psychoeducation guide
- ⚠️ PR doesn't have a standalone shame step — shame is embedded in relapse management

**Critical Analysis — Why C, not A or B:**

Shame exists in BOTH domains, but the origins and interventions are fundamentally different:

| Aspect | TRC Shame | PR Shame |
|--------|-----------|----------|
| **Origin** | The assault/harassment itself → "I caused it", "My body is dirty", "I'm broken" | Relapse or behavior → "I'm corrupt", "I'm a hypocrite", "No hope for me" |
| **Type** | Sexual shame, body shame, self-blame shame | Behavioral shame, moral shame, identity shame |
| **Mechanism** | Trauma creates distorted self-narrative (cognitive distortion) | Shame feeds the addiction cycle (shame → urge → use → more shame) |
| **Intervention** | TF-CBT cognitive restructuring: reframe self-blame → assign responsibility to perpetrator | Relapse reframing: shame is a status report, not a character judgment |
| **Stage** | Regulation (after understanding trauma responses) | Resilience (as part of relapse management) |
| **Safety Concern** | High — shame in trauma context can trigger dissociation or self-harm ideation | Low-Moderate — shame feeds relapse but no dissociation risk |
| **Language** | "ما حدث لم يكن اختيارك" (What happened was not your choice) | "الانتكاسة ليست فشلاً" (Relapse is not a failure) |

These are **NOT** the same concept with different framing. They address different shame origins, different mechanisms, and different interventions. Both are clinically justified by their respective source materials.

**Classification: C (Both domains, separate implementations)**

**TRC Version: `trc-shame-recovery`**
- ID: `shame-recovery`
- Stage: `regulation` (after trauma-responses, before boundaries)
- Type: Interactive Tool (TF-CBT thought reframing exercise)
- isAvailable: `false` (planned — depends on thought-reframing being built)
- Safety: `moderate`, contraindications: severe-dissociation, acute-crisis
- Content: Identify shame-based self-narratives → examine evidence → reframe with reality
- Dependencies: safety stage complete, trauma-responses complete

**PR Version: `pr-shame-recovery`**
- Not a journey step (shame is embedded in relapse management)
- Type: Psychoeducation Article / Downloadable Guide
- Stage: resilience (as part of relapse understanding)
- Content: How shame feeds the relapse cycle → reframing relapse as a status report
- This is already partially covered by the `relapse` step

**Action Taken:**
- Added `shame-recovery` to `TrcStepId` type
- Added step to `TRC_STEPS` array (Stage: regulation)
- Added to `TRC_STAGES` regulation steps array
- Updated step chain: trauma-responses → shame-recovery → boundaries
- Added shame-recovery logic to `next-step-engine.ts`
- Updated `TRC_REGULATION_STEP_IDS` in next-step-engine.ts
- PR version: noted as planned downloadable article (not a new step)

---

### 5. PMR (Progressive Muscle Relaxation) — Classification D (Rejected)

**TRC Source Analysis:**
- ❌ NOT in trc-framework.md
- ❌ NOT in trc-master-map.md
- ❌ NOT in any TRC source document
- TRC Source Reintegration Audit: "NOT in any TRC source document. PMR is a general anxiety tool, not trauma-specific. Adding it would violate the source-fidelity principle."
- a52-specification.md mentions PMR in passing as an alternative for chronic anxiety, but NOT as a TRC tool

**Porn Recovery Source Analysis:**
- ❌ NOT in PR framework
- ❌ NOT in any PR source document
- PMR is not mentioned in addiction recovery literature as a core technique

**Clinical Analysis — Why D (Rejected):**

1. **Source-fidelity violation**: PMR appears in neither source document. Adding it to either domain would fabricate clinical justification.

2. **Body Scan already serves the body-attention function**: TRC has `body-scan` which is trauma-specific (observing body sensations without the tensing phase). Body Scan is in the TRC source; PMR is not.

3. **PMR can be counterproductive in trauma**: The progressive tensing phase (tense → hold → release) can:
   - Trigger trauma activation in survivors with somatic symptoms
   - Increase hypervigilence rather than reduce it
   - Be re-traumatizing for those who store tension as a protective mechanism
   - This is well-documented in trauma literature (van der Kolk, 2014; Levine, 2010)

4. **Not domain-specific**: PMR is a general anxiety/relaxation tool. It doesn't belong in a specialized trauma recovery or addiction recovery program — it belongs in a general wellness section (which doesn't exist in this project).

5. **Redundancy**: Even if safe, PMR would overlap with Body Scan's body-attention function while adding the risky tensing phase.

**Classification: D (Not suitable for either TRC or PR)**

**Rejection documented for:**
- TRC: Violates source-fidelity, Body Scan already covers body-attention, PMR tensing can trigger trauma
- PR: Violates source-fidelity, not in addiction recovery literature as core technique

**Future consideration**: If a general wellness section is created, PMR could be placed there with appropriate disclaimers. But it does NOT belong in either clinical recovery program.

---

## Code Changes Made

### 1. `/var/www/tamkinly/src/lib/recovery-journey.ts`

**Changes:**
- Added `'urge-surfing'` to `PornRecoveryStepId` type (line ~17)
- Added `'shame-recovery'` to `TrcStepId` type (line ~85)
- Updated `PORN_RECOVERY_STAGES[2]` (replacement): `steps: []` → `steps: ['urge-surfing']`
- Added `urge-surfing` step to `PORN_RECOVERY_STEPS` array (between toolkit and relapse)
- Updated step chain: toolkit → urge-surfing → relapse (was: toolkit → relapse)
- Updated `TRC_STAGES[1]` (regulation): added `'shame-recovery'` to steps array
- Added `shame-recovery` step to `TRC_STEPS` array (between trauma-responses and boundaries)
- Updated step chain: trauma-responses → shame-recovery → boundaries (was: trauma-responses → boundaries)

### 2. `/var/www/tamkinly/src/lib/next-step-engine.ts`

**Changes:**
- Added `'shame-recovery'` to `TRC_REGULATION_STEP_IDS` array
- Added shame-recovery completion logic (after trauma-responses check)
- Handles isAvailable: false gracefully (shows "under development" message)

---

## Journey Model Summary (After Reclassification)

### Porn Recovery Journey (9 steps)

| Stage | Steps | New |
|-------|-------|-----|
| awareness | recognition, brain-cycle, failed-attempts | — |
| protection | framework, toolkit | — |
| replacement | **urge-surfing** | ✅ NEW |
| support | relapse | — |
| resilience | identity, future-self | — |

### TRC Journey (13 steps)

| Stage | Steps | New |
|-------|-------|-----|
| safety | grounding, a52-breathing, safe-place, body-scan, trauma-psychoeducation | — |
| regulation | trigger-mapping, safety-plan, regulation-toolkit, trauma-responses, **shame-recovery** | ✅ NEW (isAvailable: false) |
| integration | boundaries, therapist-selection, recovery-milestones | — |

---

## Rejected Assets Summary

| Asset | Rejected From | Reason | Alternative |
|-------|--------------|--------|-------------|
| PMR | TRC & PR | Not in source, violates source-fidelity, Body Scan covers body-attention, PMR tensing can trigger trauma | General wellness section (if created) |

## Deferred Assets Summary

| Asset | Deferred To | Reason | Current Status |
|-------|-----------|--------|---------------|
| understanding-urges | PR downloadable guide | Content covered by brain-cycle step | Planned downloadable |
| compulsion-cycle | PR downloadable guide | Content covered by brain-cycle step | Planned downloadable |
| pr-shame-recovery | PR downloadable guide | Content partially covered by relapse step | Planned downloadable |

---

## Domain Separation Verification

| Check | Result |
|-------|--------|
| TRC_STEPS references PR steps? | ✅ CLEAN |
| PR steps reference TRC steps? | ✅ CLEAN |
| Cross-domain imports? | ✅ CLEAN |
| Shame content properly separated? | ✅ Different IDs, different stages, different content |
| Urge surfing only in PR? | ✅ Not in TRC_STEPS |
| PMR in neither domain? | ✅ Correctly rejected |

---

*Generated by Phase 3 Agent — Asset Reclassification Agent*
*Date: 2026-03-05*
*All classifications traceable to original source documents (trc-framework.md, porn-recovery-framework.md)*
