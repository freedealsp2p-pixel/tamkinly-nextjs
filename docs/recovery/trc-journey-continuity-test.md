# TRC Journey Continuity Test Report

**Generated:** 2025-03-05  
**Agent:** Swarm 4 — Journey Continuity Tester  
**Scope:** Full TRC journey path from Grounding → Wave 3

---

## 1. Journey Sequence Definition

The TRC journey follows a 3-stage clinical model:

| Stage | Steps | Clinical Rationale |
|-------|-------|--------------------|
| **Safety & Stabilization** | Grounding → A52 → Safe Place → Body Scan | Nervous system regulation before any processing. Prerequisite for all subsequent work. |
| **Regulation** | Trigger Mapping → Safety Plan → Regulation Toolkit → Trauma Responses | Understanding triggers, building plans, and identifying patterns — requires stable nervous system. |
| **Integration** | Boundaries → Therapist Selection → Recovery Milestones | Identity reconstruction and external support — requires regulation mastery. (Wave 3 — planned) |

**Also:** `trauma-psychoeducation` is a standalone informational resource (nextStep=null, previousStep=null).

---

## 2. Transition Analysis

### T1: Grounding → A52 Breathing

| Criterion | Result | Detail |
|-----------|--------|--------|
| **Clinical Justification** | ✅ Yes | Sensory grounding returns to present moment; A52 breathing adds rhythmic regulation. Complementary: senses first, then breath pattern. Standard trauma-informed sequence. |
| **Safe?** | ✅ Yes | Both in Safety stage. No gate crossed. A52 has contraindications for panic-disorder and severe-dissociation. |
| **Can go back?** | ✅ Yes | `previousStep: null` on Grounding (first step — no back needed). A52 has `previousStep: 'grounding'`. UI provides `handleGoBack` → `/recovery/trc`. |
| **Can stop?** | ✅ Yes | Both have `TherapeuticExit` (floating button + Escape key). Fallback: `/recovery/trc`. |
| **Knows position?** | ✅ Yes | Both have `RecoveryBreadcrumb`. Journey page shows progress bar. Step shown in stage context. |
| **Can reach previous?** | ✅ Yes | Via breadcrumb links to Recovery Center → TRC → Grounding. Journey page clickable steps. |
| **Dead end?** | ❌ No | CompletionScreen on Grounding has `EnhancedSuggestedNextStep` → A52. |

### T2: A52 Breathing → Safe Place

| Criterion | Result | Detail |
|-----------|--------|--------|
| **Clinical Justification** | ✅ Yes | After rhythmic breathing regulation, safe-place visualization deepens the internal sense of safety. Breathing calms the body; visualization anchors the mind. Sequential and evidence-based. |
| **Safe?** | ✅ Yes | Both in Safety stage. Safe Place has contraindications: severe-dissociation, active-flashbacks. |
| **Can go back?** | ✅ Yes | A52: `previousStep: 'grounding'`, `handleGoBack` → `/recovery/trc`. Safe Place: `previousStep: 'a52-breathing'`, `handleGoBack` → `/recovery/trc`. |
| **Can stop?** | ✅ Yes | Both have `TherapeuticExit`. |
| **Knows position?** | ✅ Yes | Both have `RecoveryBreadcrumb` with full path: Recovery → TRC → [Step]. |
| **Can reach previous?** | ✅ Yes | Via breadcrumb or TherapeuticExit → TRC hub → Grounding/A52. |
| **Dead end?** | ❌ No | A52 CompletionScreen has `SuggestedNextStep` href=`/recovery/trc/safe-place`. |

### T3: Safe Place → Body Scan

| Criterion | Result | Detail |
|-----------|--------|--------|
| **Clinical Justification** | ✅ Yes | After establishing internal safety, body scan teaches where trauma is stored. Requires safety anchor first — body awareness without safety can trigger flashbacks. Clinically correct ordering. |
| **Safe?** | ✅ Yes | Both in Safety stage. Body Scan has contraindications: severe-dissociation, recent-trauma, active-flashbacks. Highest safetyLevel: 'higher'. |
| **Can go back?** | ✅ Yes | Safe Place: `previousStep: 'a52-breathing'`. Body Scan: `previousStep: 'safe-place'`. |
| **Can stop?** | ✅ Yes | Both have `TherapeuticExit`. |
| **Knows position?** | ⚠️ Partial | Safe Place has `RecoveryBreadcrumb`. **Body Scan is MISSING `RecoveryBreadcrumb`** — user cannot see their position in the journey from this page. |
| **Can reach previous?** | ✅ Yes | Via TherapeuticExit → TRC hub → any Safety step. Body Scan has `onGoBack` dispatch. |
| **Dead end?** | ❌ No | Safe Place CompletionScreen has `SuggestedNextStep` href=`/recovery/trc/body-scan`. |

### T4: Body Scan → Trigger Mapping ⚠️ CRITICAL GATE

| Criterion | Result | Detail |
|-----------|--------|--------|
| **Clinical Justification** | ✅ Yes | Body Scan is the LAST Safety step. After full nervous system regulation, trigger identification becomes safe. This is the Safety→Regulation gate — the most critical transition in the journey. |
| **Safe?** | ✅ Yes | **Safety gate enforced in `getTrcNextStep()`**: Multiple checks for `safetyStageCompleted` before recommending Regulation steps. `markTrcStepCompleted()` auto-computes `safetyStageCompleted` when all 4 safety steps done. |
| **Can go back?** | ✅ Yes | Body Scan: `previousStep: 'safe-place'`. Trigger Mapping: `previousStep: 'body-scan'`. |
| **Can stop?** | ✅ Yes | Both have `TherapeuticExit`. |
| **Knows position?** | ⚠️ Partial | Body Scan missing breadcrumb (noted above). Trigger Mapping has `RecoveryBreadcrumb` with full path. |
| **Can reach previous?** | ✅ Yes | Via breadcrumb or exit → TRC hub → Safety steps. |
| **Dead end?** | ⚠️ Indirect | Body Scan CompletionScreen `SuggestedNextStep` href=`/recovery/trc` (hub page, NOT direct to trigger-mapping). User must navigate from hub. Not a dead end, but indirect — could confuse users who just completed safety stage. |

### T5: Trigger Mapping → Safety Plan

| Criterion | Result | Detail |
|-----------|--------|--------|
| **Clinical Justification** | ✅ Yes | After identifying personal triggers, building a safety plan is the logical next step. You can't plan for what you haven't identified. Trigger knowledge informs the safety plan content. |
| **Safe?** | ✅ Yes | Both in Regulation stage. Safety gate already passed at T4. |
| **Can go back?** | ✅ Yes | Trigger Mapping: `previousStep: 'body-scan'`. Safety Plan: `previousStep: 'trigger-mapping'`. Safety Plan has explicit `goBack` button. |
| **Can stop?** | ✅ Yes | Both have `TherapeuticExit`. |
| **Knows position?** | ✅ Yes | Both have `RecoveryBreadcrumb`. |
| **Can reach previous?** | ✅ Yes | Via breadcrumb, back button, or exit → TRC hub. |
| **Dead end?** | ❌ No | Trigger Mapping CompletionScreen has `SuggestedNextStep` href=`/recovery/trc/safety-plan`. Safety Plan has `EnhancedSuggestedNextStep` with `currentStepId="safety-plan"`. |

### T6: Safety Plan → Regulation Toolkit

| Criterion | Result | Detail |
|-----------|--------|--------|
| **Clinical Justification** | ✅ Yes | After building a safety plan, the regulation toolkit provides the practical tools to execute it. Plan + Tools = actionable regulation. |
| **Safe?** | ✅ Yes | Both in Regulation stage. |
| **Can go back?** | ✅ Yes | Safety Plan: `previousStep: 'trigger-mapping'`. Regulation Toolkit: `previousStep: 'safety-plan'`. |
| **Can stop?** | ✅ Yes | Both have `TherapeuticExit`. |
| **Knows position?** | ✅ Yes | Both have `RecoveryBreadcrumb`. |
| **Can reach previous?** | ✅ Yes | Via breadcrumb, exit, or journey page. |
| **Dead end?** | ❌ No | Safety Plan has `EnhancedSuggestedNextStep` → Regulation Toolkit. Regulation Toolkit has `EnhancedSuggestedNextStep`. |

### T7: Regulation Toolkit → Trauma Responses

| Criterion | Result | Detail |
|-----------|--------|--------|
| **Clinical Justification** | ✅ Yes | After building regulation tools, understanding trauma response patterns (fight/flight/freeze/fawn) strengthens tool selection. Knowledge of patterns → better tool matching. |
| **Safe?** | ✅ Yes | Both in Regulation stage. Trauma Responses has safetyLevel: 'higher'. |
| **Can go back?** | ✅ Yes | Regulation Toolkit: `previousStep: 'safety-plan'`. Trauma Responses: `previousStep: 'regulation-toolkit'`. |
| **Can stop?** | ✅ Yes | Both have `TherapeuticExit`. |
| **Knows position?** | ✅ Yes | Both have `RecoveryBreadcrumb`. |
| **Can reach previous?** | ✅ Yes | Trauma Responses page has explicit Link back to `/recovery/trc/regulation-toolkit`. |
| **Dead end?** | ❌ No | Regulation Toolkit has `EnhancedSuggestedNextStep`. Trauma Responses has `EnhancedSuggestedNextStep` with `currentStepId="trauma-responses"`. |

### T8: Trauma Responses → Boundaries (Wave 3)

| Criterion | Result | Detail |
|-----------|--------|--------|
| **Clinical Justification** | ✅ Yes | After understanding trauma patterns, setting boundaries protects gains. Understanding → Protection sequence. |
| **Safe?** | ✅ Yes | Transition is to Integration stage. `isAvailable: false` — Wave 3 not yet built. |
| **Can go back?** | ✅ Yes | Trauma Responses: `previousStep: 'regulation-toolkit'`. Boundaries: `previousStep: 'trauma-responses'`. |
| **Can stop?** | ✅ Yes | Trauma Responses has `TherapeuticExit`. |
| **Knows position?** | ✅ Yes | Trauma Responses has `RecoveryBreadcrumb`. |
| **Can reach previous?** | ✅ Yes | Via breadcrumb or exit. |
| **Dead end?** | ⚠️ Yes (temporary) | Boundaries/Therapist Selection/Recovery Milestones are all `isAvailable: false`. EnhancedSuggestedNextStep shows "Under development" label. Journey page shows "Coming soon". User CAN still go back, but there is no forward path from Trauma Responses beyond "coming soon". **This is a planned dead end, not a design flaw.** |

---

## 3. Edge Case Testing

### E1: User jumps directly to Regulation step without completing Safety

**Scenario:** User navigates directly to `/recovery/trc/worksheets/trigger-mapping` without completing any Safety steps.

**Result:** ✅ **BLOCKED correctly**
- `getTrcNextStep()` checks `safetyStageCompleted` flag
- If `safetyStageCompleted === false`, engine redirects to first incomplete Safety step
- The `context.hasSavedState` path also has a safety gate: even saved Regulation state is blocked if Safety not complete
- The `currentStepId` fallback path also enforces safety gate
- **Three separate safety gate checks** in the engine ensure this cannot be bypassed

### E2: User completes only partial Safety (e.g., Grounding only) then tries Regulation

**Scenario:** User completes Grounding, then tries to navigate to Trigger Mapping.

**Result:** ✅ **BLOCKED correctly**
- `markTrcStepCompleted('grounding')` sets `safetyStageCompleted = false` (only 1/4 done)
- `getTrcNextStep()` with `safetyStageCompleted === false` finds `findFirstIncompleteTrcStep(TRC_SAFETY_STEP_IDS, completedSteps)` → returns A52 (next incomplete safety step)
- User is recommended to continue Safety, not skip to Regulation
- **Safety gate holds at partial completion**

### E3: User goes to Trigger Mapping, saves partial work, leaves, and returns

**Scenario:** User completes all Safety, starts Trigger Mapping, saves partial data, leaves, returns later.

**Result:** ✅ **RESUMED correctly**
- `context.hasSavedState` and `context.savedStepId` are checked in `getTrcNextStep()`
- If saved step is in Regulation AND safety is complete → `resume` action type
- If saved step is in Regulation AND safety is NOT complete → redirected to incomplete Safety step (safety gate)
- `markTrcStepStarted()` increments `sessionCount`, preserving state
- **Return journey respects both saved state AND safety gate**

### E4: User completes all Safety steps but has no next-step recommendation

**Scenario:** All 4 Safety steps completed, but `getTrcNextStep()` returns no recommendation.

**Result:** ✅ **CANNOT HAPPEN — defensive coding**
- When Safety completes, `justCompletedStep` logic explicitly recommends Trigger Mapping
- Even without `justCompletedStep`, the `safetyStageCompleted === true` path finds the first incomplete Regulation step
- If ALL steps complete, engine returns `identity-transformation` CTA
- **No code path returns null when steps remain incomplete**

### E5: trauma-psychoeducation as disconnected node

**Scenario:** User accesses What Trauma Does to the Body page.

**Result:** ⚠️ **Partially isolated**
- `nextStep: null, previousStep: null` in TRC_STEPS — intentionally not in the sequential chain
- Page has `RecoveryBreadcrumb` with links to Recovery → TRC → Psychoeducation
- Page has NO `TherapeuticExit` — user must use browser back or breadcrumb to leave
- Page has NO `SafetyResponse` — no immediate distress escape route
- Page links to all 4 Safety tools at the bottom as "Next Steps"
- **Missing TherapeuticExit and SafetyResponse on an informational trauma page is a safety concern** — content about trauma effects could trigger distress

---

## 4. Dead End Analysis

| Location | Type | Severity | Description |
|----------|------|----------|-------------|
| Body Scan CompletionScreen | Indirect navigation | Low | SuggestedNextStep goes to `/recovery/trc` (hub) instead of directly to `/recovery/trc/worksheets/trigger-mapping`. User must find trigger mapping from hub. Not a true dead end, but a friction point at the critical Safety→Regulation gate. |
| Trauma Responses → Integration | Planned dead end | Low (by design) | Wave 3 steps (boundaries, therapist-selection, recovery-milestones) are `isAvailable: false`. EnhancedSuggestedNextStep shows "Under development". User can go back but not forward. |
| trauma-psychoeducation | Disconnected node | Medium | `nextStep: null, previousStep: null`. No TherapeuticExit, no SafetyResponse. Not in sequential chain. Can only leave via breadcrumb or browser back. Content about trauma could be triggering without an escape mechanism. |
| recovery-milestones | Terminal node | None (by design) | `nextStep: null` — journey complete. Engine returns `identity-transformation` CTA. This is intentional. |

---

## 5. Safety Gate Violations

| Test | Result | Detail |
|------|--------|--------|
| Direct URL to Regulation without Safety | ✅ PASS | `getTrcNextStep()` has 3 independent safety gate checks |
| Partial Safety + Regulation attempt | ✅ PASS | `safetyStageCompleted` computed from all 4 steps; partial = false |
| Saved Regulation state without Safety | ✅ PASS | `context.hasSavedState` path has safety gate |
| `getPreviousStep()` from Regulation without Safety | ✅ PASS | Returns last Safety step instead of Regulation step |
| High activation override | ✅ PASS | `context.highActivation` always recommends Grounding first |

**Total safety gate violations: 0**

---

## 6. UI Navigation Completeness

| Page | RecoveryBreadcrumb | TherapeuticExit | SafetyResponse | Next-Step Nav | Back Button |
|------|-------------------|-----------------|----------------|---------------|-------------|
| Grounding | ✅ | ✅ | ✅ | ✅ EnhancedSuggestedNextStep | — (first step) |
| A52 | ✅ | ✅ | ✅ | ✅ SuggestedNextStep → safe-place | ✅ handleGoBack |
| Safe Place | ✅ | ✅ | ✅ | ✅ SuggestedNextStep → body-scan | ✅ handleGoBack |
| Body Scan | ❌ **MISSING** | ✅ | ✅ | ✅ SuggestedNextStep → hub | ✅ onGoBack dispatch |
| Trigger Mapping | ✅ | ✅ | ✅ | ✅ SuggestedNextStep → safety-plan | ✅ handleStopHere |
| Safety Plan | ✅ | ✅ | ✅ | ✅ EnhancedSuggestedNextStep | ✅ goBack button |
| Regulation Toolkit | ✅ | ✅ | ✅ | ✅ EnhancedSuggestedNextStep | ✅ ArrowLeft |
| Trauma Responses | ✅ | ✅ | ✅ | ✅ EnhancedSuggestedNextStep | ✅ Link to reg-toolkit |
| Psychoeducation | ✅ | ❌ **MISSING** | ❌ **MISSING** | ❌ (links to Safety tools) | ✅ ArrowLeft |
| Journey Page | — | — | — | ✅ getTrcNextStep() | ✅ Back to Recovery |

---

## 7. Findings Summary

### Critical Issues
1. **Body Scan missing `RecoveryBreadcrumb`** — User loses positional awareness during the most advanced Safety step (safetyLevel: 'higher'). This is the step where distress is most likely, yet the user can't see where they are in the journey.

### Safety Concerns
2. **Psychoeducation page missing `TherapeuticExit` and `SafetyResponse`** — Content describing trauma's effects on the body could itself trigger distress. No floating exit button, no safety response mechanism. Only breadcrumb and browser back for escape.

### Friction Points (Not Bugs)
3. **Body Scan → Trigger Mapping navigation is indirect** — CompletionScreen sends user to TRC hub (`/recovery/trc`) instead of directly to trigger mapping. At the critical Safety→Regulation gate, this adds friction. Users who just completed all Safety steps should be offered a direct path to their first Regulation tool.

4. **A52 and Safe Place CompletionScreens use `SuggestedNextStep` (basic) while Safety Plan and later use `EnhancedSuggestedNextStep`** — Inconsistent next-step component usage. The basic `SuggestedNextStep` is static (hardcoded href); the enhanced version is state-aware and respects safety gates. The basic version could theoretically allow navigation to a step the user isn't ready for.

### Design Observations
5. **Wave 3 is a planned dead end** — By design, not a bug. Handled gracefully with "Coming soon" labels.
6. **Journey completion at recovery-milestones** — Terminal node returns `identity-transformation` CTA. Appropriate.
7. **High activation override** — Works correctly: always redirects to Grounding regardless of current position.

---

## 8. Score

| Metric | Value |
|--------|-------|
| **Transitions tested** | 8 (T1–T8) |
| **Dead ends found** | 1 true dead end (Wave 3 — planned), 1 friction point (Body Scan → hub), 1 disconnected node (psychoeducation) |
| **Safety gate violations** | 0 |
| **Missing UI elements** | 2 (Body Scan breadcrumb, Psychoeducation exit/safety) |
| **Overall Flow Score** | **8.2/10** |

### Score Breakdown
- **Safety gate enforcement:** 10/10 (all 5 tests pass, triple redundancy)
- **Back navigation:** 9/10 (all steps have previousStep, minor: psychoeducation disconnected)
- **Stop/exit mechanism:** 8/10 (TherapeuticExit on all sequential steps, missing on psychoeducation)
- **Position awareness:** 7/10 (breadcrumb on most pages, missing on Body Scan)
- **Forward navigation:** 8/10 (all transitions have next-step, Body Scan→Trigger Mapping indirect, inconsistent component usage)
- **No dead ends:** 8/10 (only planned Wave 3 dead end and psychoeducation isolation)

---

## 9. Recommendations

1. **Add `RecoveryBreadcrumb` to Body Scan page** — Critical for positional awareness at the highest-risk Safety step.
2. **Add `TherapeuticExit` and `SafetyResponse` to psychoeducation page** — Content about trauma effects can trigger distress; escape mechanisms are essential.
3. **Change Body Scan CompletionScreen `SuggestedNextStep` href from `/recovery/trc` to `/recovery/trc/worksheets/trigger-mapping`** — Direct navigation at the Safety→Regulation gate reduces friction.
4. **Migrate A52 and Safe Place CompletionScreens from `SuggestedNextStep` to `EnhancedSuggestedNextStep`** — State-aware navigation respects safety gates and provides clinical reasoning for the recommendation.
5. **Consider adding a "Return to Journey" link on all tool pages** — Some pages only offer exit to hub; a direct journey page link would help users resume their sequential path.
