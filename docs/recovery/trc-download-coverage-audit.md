# TRC Download Coverage Audit

> **Audit Date:** 2025-08-09  
> **Auditor:** Agent Swarm 2 — TRC Download Coverage Auditor  
> **Project:** /var/www/tamkinly  
> **Scope:** All TRC interactive tools and their downloadable assets  

---

## Executive Summary

| Metric | Count |
|---|---|
| **LIVE** (file exists + UI references it) | **0** |
| **SPECIFIED/NOT BUILT** (in roadmap/model but no file) | **4** |
| **NOT SPECIFIED** (not in model or roadmap at all) | **4** |
| **Total TRC Interactive Tools** | **8** |
| **Overall Completion** | **0%** |

**Critical Finding:** Zero TRC downloadable assets are LIVE. The `/public/downloads/trc/` directory does not exist. All 12 TRC journey steps have empty `downloadables: []` arrays. No TRC tool page imports or renders any download button.

---

## 1. Per-Asset Coverage Report

### Safety Stage (Stage 1)

| # | Asset | Journey Step | Downloadables in Model | File in `/public` | Download Button in UI | Roadmap Status | Overall Status |
|---|---|---|---|---|---|---|---|
| 1 | **Grounding** (Pocket grounding card — 5-4-3-2-1 reference) | `grounding` | ❌ `[]` empty | ❌ No file | ❌ No button | P1 — planned | **SPECIFIED/NOT BUILT** |
| 2 | **A52** (Breathing technique card) | `a52-breathing` | ❌ `[]` empty | ❌ No file | ❌ No button | P1 — planned | **SPECIFIED/NOT BUILT** |
| 3 | **Safe Place** (Safe place imagery worksheet) | `safe-place` | ❌ `[]` empty | ❌ No file | ❌ No button | P1 — planned | **SPECIFIED/NOT BUILT** |
| 4 | **Body Scan** (Body scan guide/worksheet) | `body-scan` | ❌ `[]` empty | ❌ No file | ❌ No button | P2 — planned | **SPECIFIED/NOT BUILT** |

### Regulation Stage (Stage 2)

| # | Asset | Journey Step | Downloadables in Model | File in `/public` | Download Button in UI | Roadmap Status | Overall Status |
|---|---|---|---|---|---|---|---|
| 5 | **Trigger Mapping** (Completed trigger map export/save) | `trigger-mapping` | ❌ `[]` empty | ❌ No file | ❌ No button | ❌ Not in roadmap | **NOT SPECIFIED** |
| 6 | **Safety Plan** (Printable safety plan) | `safety-plan` | ❌ `[]` empty | ❌ No file | ❌ No button | ❌ Not in roadmap | **NOT SPECIFIED** |
| 7 | **Regulation Toolkit** (Regulation quick-reference card) | `regulation-toolkit` | ❌ `[]` empty | ❌ No file | ❌ No button | ❌ Not in roadmap | **NOT SPECIFIED** |
| 8 | **Trauma Responses** (Response patterns reference) | `trauma-responses` | ❌ `[]` empty | ❌ No file | ❌ No button | ❌ Not in roadmap | **NOT SPECIFIED** |

### Additional (Non-Interactive / Informational)

| Asset | Journey Step | Roadmap Status | Notes |
|---|---|---|---|
| Trauma Psychoeducation | `trauma-psychoeducation` | P2 — planned | In roadmap as `psychoeducation-pdf`, not in required interactive tool list |

---

## 2. Data Source Findings

### 2.1 Journey Model (`src/lib/recovery-journey.ts`)

**All 12 TRC steps have `downloadables: []` (empty arrays):**

```
grounding:           downloadables: []
a52-breathing:       downloadables: []
safe-place:          downloadables: []
body-scan:           downloadables: []
trauma-psychoeducation: downloadables: []
trigger-mapping:     downloadables: []
safety-plan:         downloadables: []
regulation-toolkit:  downloadables: []
trauma-responses:    downloadables: []
boundaries:          downloadables: []
therapist-selection: downloadables: []
recovery-milestones: downloadables: []
```

**Contrast with Porn Recovery:** All Porn Recovery steps have populated `downloadables` arrays referencing REC-01 through REC-11.

### 2.2 File System (`/public/downloads/`)

- `/public/downloads/porn-recovery/` — ✅ EXISTS, contains 22 PDFs (REC-01 through REC-11, AR + EN)
- `/public/downloads/trc/` — ❌ **DOES NOT EXIST**
- Zero TRC PDF files anywhere in `/public/`

### 2.3 Bilingual Files Catalog (`src/lib/bilingual-files.ts`)

- Contains 11 Porn Recovery keys (REC-01 through REC-11) — all `available: true`
- Contains 7 Product PDF keys — all `available: true`
- **Contains ZERO TRC keys** — no TRC file registered at all

### 2.4 TRC Downloads Page (`src/app/recovery/trc/downloads/page.tsx`)

Lists 5 items, **all with `status: 'planned'`**:
1. `grounding-pocket-card` (card, safety, planned)
2. `a52-breathing-card` (pdf, safety, planned)
3. `safe-place-worksheet` (worksheet, safety, planned)
4. `body-awareness-worksheet` (worksheet, safety, planned)
5. `psychoeducation-pdf` (pdf, safety, planned)

**Missing from downloads page:**
- trigger-mapping export
- safety-plan printable
- regulation-toolkit reference card
- trauma-responses patterns reference

### 2.5 Download Roadmap (`docs/recovery/trc-download-roadmap.md`)

Covers 5 downloads (Safety stage only), all "planned" (0% completion):

| Download ID | Template Type | Category | Priority | Status |
|---|---|---|---|---|
| `a52-breathing-card` | pdf-card | therapeutic-tool | P1 | 📋 planned |
| `safe-place-worksheet` | pdf-worksheet | therapeutic-worksheet | P1 | 📋 planned |
| `body-awareness-worksheet` | pdf-worksheet | therapeutic-worksheet | P2 | 📋 planned |
| `psychoeducation-pdf` | pdf-article | psychoeducation | P2 | 📋 planned |
| `grounding-pocket-card` | pdf-card | therapeutic-tool | P1 | 📋 planned |

**Regulation stage (Wave 2) downloads are not specified in the roadmap.**

### 2.6 Tool UI Pages — Download Button Check

| Tool Page | Imports SectionDownloadButton? | Imports BilingualDownloadButton? | Any download reference? |
|---|---|---|---|
| `/recovery/trc/grounding/page.tsx` | ❌ No | ❌ No | ❌ None |
| `/recovery/trc/a52/page.tsx` | ❌ No | ❌ No | ❌ None |
| `/recovery/trc/safe-place/page.tsx` | ❌ No | ❌ No | ❌ None |
| `/recovery/trc/body-scan/page.tsx` | ❌ No | ❌ No | ❌ None |
| `/recovery/trc/worksheets/trigger-mapping/page.tsx` | ❌ No | ❌ No | ❌ None |
| `/recovery/trc/worksheets/safety-plan/page.tsx` | ❌ No | ❌ No | ❌ None |
| `/recovery/trc/regulation-toolkit/page.tsx` | ❌ No | ❌ No | ❌ None |
| `/recovery/trc/what-happens-during-trauma-responses/page.tsx` | ❌ No | ❌ No | ❌ None |

---

## 3. Cross-Domain Contamination Check

| Check | Result | Status |
|---|---|---|
| TRC pages reference Porn Recovery downloads (REC-01 to REC-11)? | No references found | ✅ CLEAN |
| Porn Recovery pages reference TRC tools? | No references found | ✅ CLEAN |
| Porn Recovery downloads appear in TRC download page? | No | ✅ CLEAN |
| TRC download page references Porn Recovery keys? | No | ✅ CLEAN |
| Bilingual files catalog — TRC entries point to porn-recovery paths? | N/A (no TRC entries exist) | ✅ CLEAN |

**Domain separation is properly maintained.** No cross-contamination found.

---

## 4. Gap Analysis & Recommendations

### 4.1 Critical Gaps (P1 — Should exist with Wave 1)

These 3 P1 downloads are specified in the roadmap but have zero implementation:

| Download ID | Expected File | Missing Actions |
|---|---|---|
| `grounding-pocket-card` | `/public/downloads/trc/grounding-pocket-card.pdf` + `-EN.pdf` | 1. Create PDF 2. Add to bilingual-files.ts 3. Add to TRC_STEPS[0].downloadables 4. Add BilingualDownloadButton to grounding page |
| `a52-breathing-card` | `/public/downloads/trc/a52-breathing-card.pdf` + `-EN.pdf` | 1. Create PDF 2. Add to bilingual-files.ts 3. Add to TRC_STEPS[1].downloadables 4. Add BilingualDownloadButton to a52 page |
| `safe-place-worksheet` | `/public/downloads/trc/safe-place-worksheet.pdf` + `-EN.pdf` | 1. Create PDF 2. Add to bilingual-files.ts 3. Add to TRC_STEPS[2].downloadables 4. Add BilingualDownloadButton to safe-place page |

### 4.2 P2 Gaps (Should exist with Wave 1 completion)

| Download ID | Expected File | Missing Actions |
|---|---|---|
| `body-awareness-worksheet` | `/public/downloads/trc/body-awareness-worksheet.pdf` + `-EN.pdf` | Same 4-step implementation as above |
| `psychoeducation-pdf` | `/public/downloads/trc/psychoeducation-pdf.pdf` + `-EN.pdf` | Same 4-step implementation as above |

### 4.3 Unspecified Gaps (Not in roadmap at all — Wave 2 tools)

These 4 Regulation-stage tools need downloadables but have **no specification anywhere**:

| Tool | Recommended Download | Type | Rationale |
|---|---|---|---|
| `trigger-mapping` | `trigger-map-export.pdf` | pdf-worksheet | Users complete trigger entries; printable summary for therapist/reference |
| `safety-plan` | `safety-plan-printable.pdf` | pdf-worksheet | Safety plan is critical to have offline/printed for crisis moments |
| `regulation-toolkit` | `regulation-quick-reference.pdf` | pdf-card | Pocket card with which-tool-for-which-state decision tree |
| `trauma-responses` | `trauma-response-patterns.pdf` | pdf-article | Reference sheet of 4F patterns (fight/flight/freeze/fawn) with self-assessment |

### 4.4 Infrastructure Gaps

1. **`/public/downloads/trc/` directory** — must be created
2. **Bilingual files catalog** — must add TRC key entries with `category: 'TRC Recovery'`
3. **TRC downloads page** — must update status from `'planned'` to `'available'` as files are built
4. **Roadmap** — must be extended with Wave 2 (Regulation stage) download specifications

---

## 5. Comparison: TRC vs Porn Recovery Download Coverage

| Metric | Porn Recovery | TRC |
|---|---|---|
| Downloadable files in `/public` | 22 PDFs (11 × 2 languages) | **0** |
| Steps with non-empty `downloadables` | 7 of 8 steps | **0 of 12** |
| Bilingual file catalog entries | 11 | **0** |
| Tool pages with download buttons | Multiple | **0** |
| Overall coverage | ~87% | **0%** |

---

## 6. Implementation Priority Order

### Phase 1: P1 Safety Downloads (Immediate)
1. Create `/public/downloads/trc/` directory
2. Build `grounding-pocket-card` PDF (AR + EN)
3. Build `a52-breathing-card` PDF (AR + EN)
4. Build `safe-place-worksheet` PDF (AR + EN)
5. Register all 3 in `bilingual-files.ts` with `category: 'TRC Recovery'`
6. Populate `downloadables` arrays in `recovery-journey.ts`
7. Add `BilingualDownloadButton` to each tool's completion screen

### Phase 2: P2 Safety Downloads
8. Build `body-awareness-worksheet` PDF (AR + EN)
9. Build `psychoeducation-pdf` PDF (AR + EN)
10. Register in catalog, model, and UI

### Phase 3: Wave 2 Regulation Downloads (New specifications needed)
11. Specify `trigger-map-export` download
12. Specify `safety-plan-printable` download
13. Specify `regulation-quick-reference` download
14. Specify `trauma-response-patterns` download
15. Build, register, and wire up all 4

---

*Audit complete. Zero TRC downloads are LIVE. 4 are SPECIFIED/NOT BUILT. 4 are NOT SPECIFIED at all. Cross-domain contamination is clean.*
