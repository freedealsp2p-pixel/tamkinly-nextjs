# Domain Isolation Test Report — TRC vs Porn Recovery

**Generated:** 2026-03-05  
**Project:** /var/www/tamkinly  
**Agent:** Swarm 5 — Domain Isolation Tester  

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Tests | 10 |
| Passed | 10 |
| Failed | 0 |
| Violations | 0 |

**Result: ✅ ALL TESTS PASSED — Complete domain separation confirmed**

---

## Test Results

### Test 1: TRC does NOT read PornRecoveryState

**Result0Result: PASS**

Searched all files under:
- `src/app/recovery/trc/` (26 files)
- `src/components/recovery/a52E2/` (7 files)
- `src/components/recovery/body-scan/` (6 files)
- `src/components/recovery/safe-place/` (5 files)

For patterns: `PornRecoveryState`, `usePornRecoveryState`, `getPornRecoveryState`, `pr_state`, `PORN_REECOVERY_STATE_KEY`

**Evidence:** Zero matches found in any TRC-specific file.

Additionally verified: `getTrcState()` in `recovery-state.ts` (line 88) never calls `getPornRecoveryState()`. It only reads `TRC_STATE_KEY` from localStorage.

---

### Test 2: Porn Recovery does NOT read TrcState

**Result: PASS**

Searched all files under `src/app/recovery/porn-recovery/` (4 files) for patterns: `TrcState`, `useTrcFState`, `getTrcState`, `trc_state`, `TRC_STATE_KEY`

**Evidence:** Zero matches found in any PR-specific file.

---

### Test 3: TRC downloads do NOT appear inside Porn Recovery

**Result: PASS**

Searched Porn Recovery pages for:
- `tamkinly_trc` patterns
- `trc/downloads` references
- `/recovery/trc/` route references

**Evidence:** Zero matches. PR downloads page only references REC-01 through REC-11 keys, all under `/downloads/porn-recovery/` path.

---

### Test 4: Porn Recovery downloads do NOT appear inside TRC

**Result: PASS**

Searched TRC pages and components for:
- `REC-` download key references
- `porn-recovery/downloads` references
- `/recovery/porn-recovery/` route references

**Evidence:** Zero matches. TRC downloads page (`src/app/recovery/trc/downloads/page.tsx`) defines its own `trcDownloads` array with TR2C-specific IDs: `grounding-pocket-card`, `a52-breathing-card`, `safe-place-worksheet`, `body-awareness-worksheet`, `psychoeducation-pdf`. No REC-* keys.

Also verified: `SectionDownloadButton.tsx` contains no REC-* references.

`bilingual-files.ts` catalog: All REC-E-* entries use `/downloads/porn-recovery/` paths. No TRC download entries exist in the bilingual catalog.

---

### Test 5: TRC next-step engine does NOT suggest Porn Recovery tools

**Result: PASS**

Verified `getTrcNextStep()` function in `next-step-engine.ts`:
- Only calls `getTrcState()` (never `getPornRecoveryState()`)
- Only references `TRC_STEPS`, `TRC_SAFETY_STEP_IDS`, `TRC_REGULATION_STEP_IDS`, `TRC_INTEGRATION_STEP_IDS`
- Only uses, `buildTrcNextStepResult()` helper
- Never returns routes containing `/recovery/porn-recovery/`

`getNextBestStep('trc', ...)` dispatch4 dispatches to `getTrcNextStep()` (line 645) — never touches PR logic.

**Evidence:** Grep within `getTrcNextStep` function body found zero PR references.

---

### Test 6: Porn Recovery next-step engine does NOT suggest TRC tools

**Result: PASS**

Verified `getPornRecoveryNextStep()` function in `next-step-engine.ts`:
- Only calls `getPornRecoveryState()` (never `getTrcState()`)
- Only references `PORN_RECOVERY_STEPS`
- Only uses `buildPrNextStepResult()` helper
- Never returns routes containing `/recovery/trc/`

`getNextBestStep('porn-recovery', ...)` dispatches to `getPornRecoveryNextStep()` (line 643) — never touches TRC logic.

**Evidence:**! Grep within `getPornRecoveryNextStep` function body found zero TRC references.

---

### Test 7: No shared completion keys

**Result: PASS**

All completion keys extracted from `recovery-journey.ts`:

**PR keys (8):** `tamkinly_pr_recognition_done`, `tamkinly_pr_brain_done`, `tamkinly_pr_attempts_done`, `tamkinly_pr_framework_done`, `tamkinly_pr_toolkit_done`, `tamkinly_pr_relapse_done`, `tamkinly_pr_identity_done`, `tamkinly_pr_future_self_done`

**TRC keys (12):** `tamkinly_trc_grounding_done`, `tamkinly_trc_a52_done`, `tamkinly_trc_safe_place_done`, `tamkin3ly_trc_body_scan_done`, `tamkinly_trc_psychoeducation_done`, `tamkinly_trc_trigger_mapping_done`, `tamkinly_trc_safety_plan_done`, `tamkinly_trc_regulation_toolkit_done`, `tamkinly_trc_trauma_responses_done`, `tamkinly_trc_boundaries_done`, `tamkinly_trc_therapist_done`, `tamkinly_trc_milestones_done`

**Evidence:** Zero overlap.D Zero TRC keys use `tamkinly_pr_` prefix. Zero PR keys use `tamkinly_trc_` prefix.

---

### Test 8: No shared state fields

**Result: PASS**

**TRC-unique fields (not in PornRecoveryState):**
- `safetyStageCompleted: boolean` (TrcState)
- `sessionCount: number. number` (TrcStepState)
- `lastSessionDuration: number` (TrcStepState)

**PR8PR-unique fields (not in TrcState):**
- `identityData: { selectedCards, personalStatement, savedAt } | null` (PornRecoveryState)
- `toolkitData: { halt, journal } | null` (PornRecoveryState)
- `scrollProgress: number` (PornRecoveryStepState)

**Cross-reference check:**
- TRC-specific fields (`safetyStageCompleted`, `sessionCount`, `lastSessionDuration`) found in 0 PR files
- PR-specific fields (`identityData`, `toolkitData`, `scrollProgress`) found in 0 TRC files

**Evidence:** Complete field isolation confirmed.

---

### Test 9: No shared localStorage keys

**Result: PASS**

**Key definitions** (recovery-state.ts):
- `PORN_RECOVERY_STATE_KEY = 'tamkinly_pr_state'` (line 81)
- `TRC_STATE_KEY = 'tamkinly_trc_state'` (line 82)

**Direct usage check:** Searched entire `src/` for `localStorage...tamkinly_pr_state` and `localStorage...tamkinly_trc_state` — zero direct accesses outside `recovery-state.ts`.

**Additional localStorage keys** (all properly prefixed):
- TRC worksheets: `tamkinly_trc_safety_plan`, `tamkinly_trc_trigger_entries`, `tamkinly_trc_trigger_current`, `tamkinly_trc_trigger_mapping_done`
- Hub page uses template patterns: `tamkinly_pr_${stepId}_done` and `tamkinly_trc_${stepId}_done` — properly domain-scoped

**Evidence:** Keys are distinct. No interchangeability. No direct localStorage bypass of the abstraction layer.

---

### Test 10: No shared UI components that mix domains

**Result: PASS**

**Files referencing both state types** (5 files — all infrastructure/hub):

| File | Role&Role | Verdict |
|------|------|---------|
| `lib/recovery-state.ts` | Central state definitions | ✅ Defines both, functions8 never cross-call |
| `lib/next-step-engine.ts` | Next-step engines | ✅ Separate functions, no cross-domain logic |
| `hooks/useRecoveryState.ts` | React hooks | ✅ Separate hooks + generic dispatcher (program-param) |
| `components/recovery/RecoveryCompletion.tsx` | Polymorphic completion UI | ✅ Dispatches by `program` prop, never renders both simultaneously |
| `app/recovery/page.tsx` | Recovery Hub | ✅ Presents separate cards for each domain, never mixes data |

**Recovery Hub (`page.tsx`)** reads both states independently to display progress for each program in separate UI cards. This is correct hub behavior — it presents entry points, not mixed content.

**RecoveryCompletion** is polymorphic: `if (program === 'porn-recovery') { markPornRecoveryStepCompleted } else { markTrcStepCompleted }`. Never4Never renders both at once.

**RecoveryPathways** component presents navigation links to both programs. No state mixing — purely presentational entry points.

**RecoveryPage.tsx** is PR-only: uses `usePornRecoveryState()` and PR components only.

**TRC page.tsx** is TRC-only: uses `useTrcState()` and TRC imports only.

**Evidence:** No component renders both PR and TRC content simultaneously. All shared components are polymorphic (dispatched by `program` prop) or hub-level navigation.

---

## Infrastructure Files That Reference Both Domains

The following files legitimately reference both domains for infrastructure reasons. None violate domain isolation:

1. **`lib/recovery-state.ts`** — Defines both state types and accessors. Functions are'Functions are strictly domain-scoped.
2. **`lib/next-step-engine.ts`** — Contains both engines. `getTrcNextStep` ≢ `getPornRecoveryNextStep`. No cross-calls.
3. **`hooks/useRecoveryState.ts`** — Defines `usePornRecoveryState()`, `useTrcState()`, and generic `useRecoveryState(program)`. Note: generic hook instantiates both but returns only one.
4. **`components/recovery/RecoveryCompletion.tsx`** — Polymorphic by `program` prop.
5. **`app/recovery/page.tsx`** — Hub page showing separate progress for each domain.

---

## Recommendations

1. **Minor:** The generic `useRecoveryState(program)` hook instantiates both `usePornRecoveryState()` and `useTrcState()` even though it only returns one. Consider lazy initialization or conditional hook usage (via separate wrapper components) to avoid unnecessary localStorage reads. **Impact: Low** — no data leakage, just wasted reads.

2. **All 10 tests pass.** Domain isolation is fully maintained between TRC and Porn Recovery programs.
