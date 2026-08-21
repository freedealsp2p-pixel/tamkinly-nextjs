# Cross-Link Validation Report
**Date:** 2025-07-31
**Method:** Direct server code analysis

---

## Rule

- Any asset inside TRC must lead ONLY to a TRC asset.
- Any asset inside Porn Recovery must lead ONLY to a Porn Recovery asset.
- Cross-domain navigation is FORBIDDEN.

---

## Previous Violations (Found in Unified Registry)

### Violation 1: urge-log → a52 (TRC)
- **File:** `src/registry/recovery-assets.ts`
- **Asset:** `urge-log` (porn-recovery)
- **Field:** `relatedAssets: ['a52']`
- **Fix:** Removed `a52` from relatedAssets. Changed to `relatedAssets: ['recovery-toolkit']`
- **Status:** ✅ Fixed in new `porn-recovery-assets.ts`

### Violation 2: relapse-analysis → grounding-54321 (TRC)
- **File:** `src/registry/recovery-assets.ts`
- **Asset:** `relapse-analysis` (porn-recovery)
- **Field:** `relatedAssets: ['grounding-54321']`
- **Fix:** Removed `grounding-54321` from relatedAssets. Changed to `relatedAssets: ['recovery-relapse']`
- **Status:** ✅ Fixed in new `porn-recovery-assets.ts`

### Violation 3: relapse-analysis → trigger-mapping (TRC)
- **File:** `src/registry/recovery-assets.ts`
- **Asset:** `relapse-analysis` (porn-recovery)
- **Field:** `relatedWorksheets: ['urge-log', 'trigger-mapping']`
- **Fix:** Removed `trigger-mapping` from relatedWorksheets. Changed to `relatedWorksheets: ['urge-log']`
- **Status:** ✅ Fixed in new `porn-recovery-assets.ts`

### Violation 4: recovery-planning → grounding-54321, a52 (TRC)
- **File:** `src/registry/recovery-assets.ts`
- **Asset:** `recovery-planning` (porn-recovery)
- **Field:** `relatedAssets: ['grounding-54321', 'a52']`
- **Fix:** Removed both TRC references. Changed to `relatedAssets: ['recovery-cta']`
- **Status:** ✅ Fixed in new `porn-recovery-assets.ts`

### Violation 5: recovery-planning → safety-plan (TRC)
- **File:** `src/registry/recovery-assets.ts`
- **Asset:** `recovery-planning` (porn-recovery)
- **Field:** `relatedWorksheets: ['safety-plan', 'urge-log']`
- **Fix:** Removed `safety-plan` from relatedWorksheets. Changed to `relatedWorksheets: ['urge-log', 'relapse-analysis']`
- **Status:** ✅ Fixed in new `porn-recovery-assets.ts`

### Violation 6: SafetyResponse hardcoded to TRC paths
- **File:** `src/components/recovery/system/SafetyResponse.tsx`
- **Line:** `router.push('/recovery/trc/grounding')` and `router.push('/recovery/trc/what-trauma-does-to-the-body')`
- **Fix Required:** SafetyResponse must accept a `program` prop to route correctly
- **Status:** 🟡 Pending — requires component update

### Violation 7: Downloads in shared directory
- **File:** `public/downloads/recovery/`
- **Issue:** All REC-01 through REC-11 files in shared directory
- **Fix:** Moved to `public/downloads/porn-recovery/`
- **Status:** ✅ Fixed

---

## SuggestedNextStep Validation

### TRC Assets — Next Steps (All within TRC ✅)

| Asset | nextStep | Domain | Valid? |
|-------|----------|--------|--------|
| grounding-54321 | a52 | TRC | ✅ |
| a52 | safe-place | TRC | ✅ |
| safe-place | body-scan | TRC | ✅ |
| body-scan | trigger-mapping | TRC | ✅ |
| trigger-mapping | safety-plan | TRC | ✅ |
| safety-plan | grounding-54321 | TRC | ✅ |
| what-trauma-does-to-the-body | grounding-54321 | TRC | ✅ |

### Porn Recovery Assets — Next Steps (All within Porn Recovery ✅)

| Asset | nextStep | Domain | Valid? |
|-------|----------|--------|--------|
| recovery-page | recovery-hero | PR | ✅ |
| recovery-hero | recovery-recognition | PR | ✅ |
| recovery-recognition | recovery-brain | PR | ✅ |
| recovery-brain | recovery-failed-attempts | PR | ✅ |
| recovery-failed-attempts | recovery-framework | PR | ✅ |
| recovery-framework | recovery-toolkit | PR | ✅ |
| recovery-toolkit | recovery-relapse | PR | ✅ |
| recovery-relapse | recovery-identity | PR | ✅ |
| recovery-identity | recovery-future-self | PR | ✅ |
| recovery-future-self | recovery-cta | PR | ✅ |
| recovery-cta | undefined | PR | ✅ (end of path) |
| urge-log | relapse-analysis | PR | ✅ |
| relapse-analysis | recovery-planning | PR | ✅ |
| recovery-planning | recovery-page | PR | ✅ |

---

## Remaining Action Items

1. **SafetyResponse** — Must accept `program: 'trc' | 'porn-recovery'` prop
   - When `program='trc'`: Option 2 → `/recovery/trc/grounding`, Option 3 → `/recovery/trc/what-trauma-does-to-the-body`
   - When `program='porn-recovery'`: Option 2 → `/recovery/porn-recovery#toolkit`, Option 3 → `/recovery/porn-recovery#brain`
2. **MedicalDisclaimer** — Remove duplicate `recovery/MedicalDisclaimer.tsx`, use only `system/MedicalDisclaimer.tsx`
3. **Update imports** — Components importing from `recovery-assets.ts` must import from correct split registry

