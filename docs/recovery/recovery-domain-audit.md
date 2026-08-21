# Recovery Domain Separation Audit
**Date:** 2025-07-31
**Method:** Direct server verification via SSH
**Server:** 192.3.218.191:2222
**Project:** /var/www/tamkinly/

---

## Principle

Recovery is NOT one program. Recovery is a Hub containing two independent therapeutic programs:

1. **Porn Recovery Program** — Behavioral change, reward system rebuilding, identity reconstruction, compulsive behavior management
2. **Trauma Recovery Center (TRC)** — Neural regulation, trauma recovery, safety restoration

Each program must have its own methodology, assets, tools, downloadables, articles, registry, suggested next step, and progress logic. No asset may be shared between programs unless an independent version is designed for each.

---

## Asset Classification

### Porn Recovery Assets

#### Interactive Components (Live — 3,291 lines total)

| # | Component | File | Lines | Stage | Status |
|---|-----------|------|-------|-------|--------|
| 1 | RecoveryHero | `src/components/recovery/RecoveryHero.tsx` | 96 | Learn — Awareness | Live |
| 2 | RecoveryRecognition | `src/components/recovery/RecoveryRecognition.tsx` | 138 | Learn — Recognition | Live |
| 3 | RecoveryBrain | `src/components/recovery/RecoveryBrain.tsx` | 224 | Learn — Psychoeducation | Live |
| 4 | RecoveryFailedAttempts | `src/components/recovery/RecoveryFailedAttempts.tsx` | 215 | Learn — Cognitive Reframing | Live |
| 5 | RecoveryFramework | `src/components/recovery/RecoveryFramework.tsx` | 190 | Recovery — Stage Framework | Live |
| 6 | RecoveryToolkitApps | `src/components/recovery/RecoveryToolkitApps.tsx` | 311 | Recovery — Practical Tools | Live |
| 7 | RecoveryRelapse | `src/components/recovery/RecoveryRelapse.tsx` | 267 | Reconstruct — Relapse | Live |
| 8 | RecoveryIdentity | `src/components/recovery/RecoveryIdentity.tsx` | 161 | Reconstruct — Identity | Live |
| 9 | RecoveryFutureSelf | `src/components/recovery/RecoveryFutureSelf.tsx` | 172 | Maintain — Future Self | Live |
| 10 | RecoveryProgress | `src/components/recovery/RecoveryProgress.tsx` | 442 | All — Navigation | Live |
| 11 | RecoveryCTA | `src/components/recovery/RecoveryCTA.tsx` | 199 | Maintain — CTA | Live |
| 12 | RecoveryPage | `src/components/recovery/RecoveryPage.tsx` | 32 | All — Container | Live |

#### Downloadable PDFs (REC-01 through REC-11 — 22 files, ~12MB)

| # | ID | Arabic File | English File | Stage |
|---|----|-------------|-------------|-------|
| 1 | REC-01 | HALT-Worksheet.pdf (1.1M) | HALT-Worksheet-EN.pdf (311K) | Recovery |
| 2 | REC-02 | Trigger-Journal.pdf (731K) | Trigger-Journal-EN.pdf (567K) | Recovery |
| 3 | REC-03 | Emergency-Plan.pdf (824K) | Emergency-Plan-EN.pdf (606K) | Recovery |
| 4 | REC-04 | Recovery-Review.pdf (803K) | Recovery-Review-EN.pdf (593K) | Reconstruct |
| 5 | REC-05 | Pattern-Recognition.pdf (664K) | Pattern-Recognition-EN.pdf (476K) | Learn |
| 6 | REC-06 | Recovery-Loop-Map.pdf (658K) | Recovery-Loop-Map-EN.pdf (475K) | Learn |
| 7 | REC-07 | Reframe.pdf (672K) | Reframe-EN.pdf (471K) | Learn |
| 8 | REC-08 | Stage-Assessment.pdf (482K) | Stage-Assessment-EN.pdf (330K) | Recovery |
| 9 | REC-09 | Relapse-Scenario-Review.pdf (635K) | Relapse-Scenario-Review-EN.pdf (420K) | Reconstruct |
| 10 | REC-10 | Identity-Cards.pdf (225K) | Identity-Cards-EN.pdf (203K) | Reconstruct |
| 11 | REC-11 | Future-Self-Letter.pdf (561K) | Future-Self-Letter-EN.pdf (375K) | Maintain |

#### Planned Worksheets (Not Yet Built)

| # | Asset ID | Type | Status | Registry Category |
|---|----------|------|--------|-------------------|
| 1 | urge-log | worksheet | planned | porn-recovery |
| 2 | relapse-analysis | worksheet | planned | porn-recovery |
| 3 | recovery-planning | worksheet | planned | porn-recovery |

#### Route

- `/recovery/porn-recovery` — Single-page experience (11 sections)

---

### TRC Assets

#### Interactive Tools (Built — 4 clinical-review, 1 live)

| # | Asset ID | Component Dir | Lines | Stage | Status | Safety Level |
|---|----------|--------------|-------|-------|--------|-------------|
| 1 | grounding-54321 | `src/components/recovery/grounding/` | — | Safety | Live | Moderate |
| 2 | a52 | `src/components/recovery/a52/` (8 files) | — | Safety | Clinical-Review | Moderate |
| 3 | safe-place | `src/components/recovery/safe-place/` (5 files) | — | Safety | Clinical-Review | Moderate |
| 4 | body-scan | `src/components/recovery/body-scan/` (5 files) | — | Safety | Clinical-Review | Moderate |
| 5 | what-trauma-does-to-the-body | `src/app/recovery/trc/what-trauma-does-to-the-body/` | 595 | Safety | Clinical-Review | Low |

#### Planned Worksheets (Not Yet Built)

| # | Asset ID | Type | Status | Registry Category |
|---|----------|------|--------|-------------------|
| 1 | trigger-mapping | worksheet | planned | trauma |
| 2 | safety-plan | worksheet | planned | trauma |

#### Planned Downloadables (Not Yet Built)

| # | Downloadable ID | Type | Status |
|---|-----------------|------|--------|
| 1 | grounding-pocket-card | card | planned |
| 2 | a52-breathing-card | pdf | planned |
| 3 | safe-place-worksheet | worksheet | planned |
| 4 | body-awareness-worksheet | worksheet | planned |
| 5 | psychoeducation-pdf | pdf | planned |

#### Route

- `/recovery/trc` — TRC Hub (5 tools listed)
- `/recovery/trc/grounding` — Grounding exercise
- `/recovery/trc/a52` — A52 Breathing
- `/recovery/trc/safe-place` — Safe Place
- `/recovery/trc/body-scan` — Body Scan
- `/recovery/trc/what-trauma-does-to-the-body` — Article

---

### Shared / System Components (Both Programs Use)

| # | Component | File | Purpose | Separation Required? |
|---|-----------|------|---------|---------------------|
| 1 | RecoveryShell | `system/RecoveryShell.tsx` | Layout wrapper | No — shared infrastructure |
| 2 | RecoveryHeader | `system/RecoveryHeader.tsx` | Page header | No — shared infrastructure |
| 3 | RecoveryBreadcrumb | `system/RecoveryBreadcrumb.tsx` | Navigation | No — shared infrastructure |
| 4 | RecoveryCard | `system/RecoveryCard.tsx` | Card display | No — shared infrastructure |
| 5 | TherapeuticExit | `system/TherapeuticExit.tsx` | Escape key handler | No — shared infrastructure |
| 6 | SafetyResponse | `system/SafetyResponse.tsx` | Floating safety button | **YES** — currently hardcoded to TRC paths |
| 7 | MedicalDisclaimer | `system/MedicalDisclaimer.tsx` | Clinical disclaimer | No — shared infrastructure |
| 8 | SuggestedNextStep | `system/SuggestedNextStep.tsx` | Next step suggestion | **YES** — must be domain-aware |
| 9 | MedicalDisclaimer (root) | `recovery/MedicalDisclaimer.tsx` | Alternative disclaimer | **YES** — duplicate, should be removed or merged |

---

### Invalid / Mixed — Cross-Domain Violations Found

| # | Asset | Domain | Violation | Severity |
|---|-------|--------|-----------|----------|
| 1 | urge-log | porn-recovery | `relatedAssets: ['a52']` — a52 is TRC | 🔴 Critical |
| 2 | relapse-analysis | porn-recovery | `relatedAssets: ['grounding-54321']` — grounding is TRC | 🔴 Critical |
| 3 | relapse-analysis | porn-recovery | `relatedWorksheets: ['trigger-mapping']` — trigger-mapping is TRC | 🔴 Critical |
| 4 | recovery-planning | porn-recovery | `relatedAssets: ['grounding-54321', 'a52']` — both are TRC | 🔴 Critical |
| 5 | recovery-planning | porn-recovery | `relatedWorksheets: ['safety-plan']` — safety-plan is TRC | 🔴 Critical |
| 6 | SafetyResponse | system | Hardcoded to `/recovery/trc/grounding` and `/recovery/trc/what-trauma-does-to-the-body` | 🟡 Moderate |
| 7 | Downloads | filesystem | All REC files in `public/downloads/recovery/` — mixed domain | 🟡 Moderate |
| 8 | Registry | code | Single `recovery-assets.ts` — mixed domain | 🟡 Moderate |
| 9 | RecoveryToolkitApps | porn-recovery | Uses `BilingualDownloadButton` with `fileKey` pointing to `/downloads/recovery/` | 🟡 Moderate |

---

## Summary

| Category | Count | Status |
|----------|-------|--------|
| Porn Recovery Assets (Live) | 12 components + 22 PDFs | Live but unregistered |
| Porn Recovery Assets (Planned) | 3 worksheets | Planned |
| TRC Assets (Live) | 1 (grounding) | Live |
| TRC Assets (Clinical-Review) | 4 | Built, needs review |
| TRC Assets (Planned) | 2 worksheets + 5 downloadables | Planned |
| Cross-Domain Violations | 9 | 🔴 Must fix |
| Shared System Components | 9 | ✅ Keep shared |

---

## Required Actions

1. **Split Registry** → `porn-recovery-assets.ts` + `trc-assets.ts`
2. **Move Downloads** → `public/downloads/porn-recovery/` + `public/downloads/trc/`
3. **Fix Cross-Links** → Remove all cross-domain references in relatedAssets and relatedWorksheets
4. **Domain-Aware SafetyResponse** → Accept program parameter to route to correct fallback
5. **Domain-Aware SuggestedNextStep** → Only suggest within same program
6. **Register Porn Recovery** → Add all 11 live components + 22 PDFs to the Porn Recovery registry
7. **Remove Duplicate MedicalDisclaimer** → Merge root `recovery/MedicalDisclaimer.tsx` with system version
8. **Add Recovery to Main Navigation** → Currently missing from Header

