# TRC Material Factory — Integration Gate Report
# تقرير بوابة دمج مصنع المواد العملية TRC

**Date:** 2026-08-13
**Scope:** Full TRC material lifecycle audit, P0 integration specification, production pipeline, external handoff, registry integrity, orphan audit, and Wave 3 gate
**Authority:** This document is the SOLE authority for material production decisions and Wave 3 authorization
**Rule:** لا تبدأ Wave 3 حتى تتم مراجعة هذا التقرير وإعطاء إذن صريح

---

## 1. Material Lifecycle Audit
# مراجعة دورة حياة المواد

### Lifecycle States (مطلوب لكل مادة)

| State | Definition | Criteria |
|-------|-----------|----------|
| PROMPT_ONLY | Production specification exists but no PDF produced | Prompt file exists, no AR/EN PDF |
| EXTERNAL_PRODUCTION | Prompt sent for external production | Prompt assigned to producer |
| SUBMITTED | PDF file submitted by external producer | File received but not validated |
| VALIDATION | File undergoing identity/content/safety checks | Validation checklist in progress |
| CLINICAL_REVIEW | File requires clinical specialist review | Asset status = clinical-review |
| APPROVED | File passed all checks and is cleared for integration | All validation gates PASS |
| INTEGRATED | File exists on server and mapped in registry | File + registry entry + download mapping |
| VISIBLE | File accessible to user via UI | Downloads page + tool page link |
| LIVE | Fully complete, bilingual, safe, and user-accessible | AR + EN + Approved + Integrated + Visible |
| REPLACED | Superseded by newer approved version | Old version archived, references updated |
| REJECTED | Failed validation or clinical review | Reason documented, not deleted |

---

### Current Lifecycle Assessment — All 12 Materials

| # | Material | Asset ID | Stage | Prompt | AR PDF | EN PDF | Canonical Name (AR) | Canonical Name (EN) | Clinical Status | Lifecycle State |
|---|----------|----------|-------|--------|--------|--------|---------------------|---------------------|-----------------|-----------------|
| 1 | Grounding Pocket Card | grounding-54321 | Safety | EXISTS | EXISTS (55928) | MISSING | TRC-Grounding-Card-AR.pdf | TRC-Grounding-Card-EN.pdf | LIVE | INTEGRATED (AR only) |
| 2 | A52 Breathing Card | a52-breathing | Safety | EXISTS | EXISTS (55889) | MISSING | TRC-A52-Breathing-Card-AR.pdf | TRC-A52-Breathing-Card-EN.pdf | CLINICAL-REVIEW* | INTEGRATED (AR only) |
| 3 | Safe Place Journal | safe-place | Safety | EXISTS | EXISTS (56413) | MISSING | TRC-Safe-Place-Journal-AR.pdf | TRC-Safe-Place-Journal-EN.pdf | CLINICAL-REVIEW | INTEGRATED (AR only) |
| 4 | Body Scan Guide | body-scan | Safety | EXISTS | EXISTS (56256) | MISSING | TRC-Body-Scan-Guide-AR.pdf | TRC-Body-Scan-Guide-EN.pdf | CLINICAL-REVIEW | INTEGRATED (AR only) |
| 5 | Trigger Mapping Worksheet | trigger-mapping | Regulation | EXISTS | EXISTS (55742) | MISSING | TRC-Trigger-Mapping-AR.pdf | TRC-Trigger-Mapping-EN.pdf | LIVE | INTEGRATED (AR only) |
| 6 | Safety Plan Card | safety-plan | Safety | EXISTS | EXISTS (53330) | MISSING | TRC-Safety-Plan-AR.pdf | TRC-Safety-Plan-EN.pdf | LIVE | INTEGRATED (AR only) |
| 7 | Regulation Quick Reference | regulation-toolkit | Regulation | EXISTS | EXISTS (55476) | MISSING | TRC-Regulation-Quick-Ref-AR.pdf | TRC-Regulation-Quick-Ref-EN.pdf | LIVE | INTEGRATED (AR only) |
| 8 | Trauma Responses Reference | trauma-responses | Regulation | EXISTS | EXISTS (54724) | MISSING | TRC-Trauma-Responses-Ref-AR.pdf | TRC-Trauma-Responses-Ref-EN.pdf | LIVE | INTEGRATED (AR only) |
| 9 | Thought Reframing Worksheet | thought-reframing | Regulation | EXISTS | EXISTS (54674) | MISSING | TRC-Thought-Reframing-AR.pdf | TRC-Thought-Reframing-EN.pdf | LIVE | INTEGRATED (AR only) |
| 10 | Shame Recovery Worksheet | shame-recovery | Regulation | EXISTS | EXISTS (55925) | MISSING | TRC-Shame-Recovery-AR.pdf | TRC-Shame-Recovery-EN.pdf | LIVE | INTEGRATED (AR only) |
| 11 | Trauma Journal Guide | trauma-journal | Regulation | EXISTS | EXISTS (55779) | MISSING | TRC-Trauma-Journal-Guide-AR.pdf | TRC-Trauma-Journal-Guide-EN.pdf | LIVE | INTEGRATED (AR only) |
| 12 | EFT Self-Help Worksheet | eft-tapping | Regulation | EXISTS | EXISTS (56411) | MISSING | TRC-EFT-Self-Help-AR.pdf | TRC-EFT-Self-Help-EN.pdf | CLINICAL-REVIEW | INTEGRATED (AR only) |

**\* Note:** A52 asset status in registry = `clinical-review`, but is functionally live with contraindication warnings. This inconsistency should be resolved.

**Summary:**
- 12/12 materials have production prompts
- 12/12 materials have AR PDFs
- 0/12 materials have EN PDFs
- 0/12 materials are LIVE (all lack EN)
- 3 materials have CLINICAL-REVIEW assets (a52, safe-place, body-scan — per registry; eft-tapping per journey)
- **No material can be considered LIVE without both AR + EN + Approved + Integrated + Visible**

---

## 2. Master Material Matrix
# المصفوفة الشاملة للمواد

| Asset ID | Domain | Therapeutic Asset | Stage | Journey Step | Source | Specification | Prompt | AR PDF | EN PDF | Clinical Status | Safety Level | Contraindications | Registry Mapping | Download Mapping | UI Link | Journey Link | Next Step | Production Status | Integration Status | Release Status |
|----------|--------|-------------------|-------|-------------|--------|--------------|--------|--------|--------|----------------|-------------|-------------------|-----------------|-----------------|---------|-------------|-----------|-------------------|-------------------|----------------|
| grounding-54321 | TRC | 5-4-3-2-1 Grounding | Safety | grounding | Master Map 1.1 | — | EXISTS | EXISTS | MISSING | LIVE | moderate | نوبة هلع، تفارق شديد | YES (trc-assets.ts) | trc-01 | /recovery/trc/grounding | TRC_STEPS[0] | → a52-breathing | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| a52-breathing | TRC | A52 Combat Breathing | Safety | a52-breathing | Master Map 1.2 | — | EXISTS | EXISTS | MISSING | CLINICAL-REVIEW | moderate | COPD, نوبة هلع، تفارق شديد، إصابة صدرية | YES (trc-assets.ts) | trc-02 | /recovery/trc/a52 | TRC_STEPS[1] | → safe-place | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| safe-place | TRC | Safe Place Visualization | Safety | safe-place | Master Map 1.3 | — | EXISTS | EXISTS | MISSING | CLINICAL-REVIEW | moderate | تفارق شديد، ذكريات اقتحامية، رهاب | YES (trc-assets.ts) | trc-03 | /recovery/trc/safe-place | TRC_STEPS[2] | → body-scan | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| body-scan | TRC | Guided Body Scan | Safety | body-scan | Master Map 1.4 | — | EXISTS | EXISTS | MISSING | CLINICAL-REVIEW | moderate | تفارق شديد، تشوه الجسم، صدمة حديثة | YES (trc-assets.ts) | trc-04 | /recovery/trc/body-scan | TRC_STEPS[3] | → trigger-mapping | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| trigger-mapping | TRC | Trigger Mapping | Regulation | trigger-mapping | Master Map 2.1 | — | EXISTS | EXISTS | MISSING | LIVE | moderate | — | YES (planned) | trc-05 | /recovery/trc/worksheets/trigger-mapping | TRC_STEPS[5] | → safety-plan | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| safety-plan | TRC | Safety Plan | Safety | safety-plan | Framework | — | EXISTS | EXISTS | MISSING | LIVE | moderate | — | YES (planned) | trc-06 | /recovery/trc/worksheets/safety-plan | TRC_STEPS[6] | → regulation-toolkit | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| regulation-toolkit | TRC | Regulation Toolkit | Regulation | regulation-toolkit | Master Map 2.2 | — | EXISTS | EXISTS | MISSING | LIVE | moderate | — | ❌ NOT IN REGISTRY | trc-07 | /recovery/trc/regulation-toolkit | TRC_STEPS[7] | → eft-tapping | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| trauma-responses | TRC | Trauma Response Patterns | Regulation | trauma-responses | Framework P5 | — | EXISTS | EXISTS | MISSING | LIVE | higher | severe-dissociation, active-flashbacks | YES (planned) | trc-08 | /recovery/trc/what-happens-during-trauma-responses | TRC_STEPS[11] | → shame-recovery | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| thought-reframing | TRC | Thought Reframing | Regulation | thought-reframing | Master Map 2.4 | — | EXISTS | EXISTS | MISSING | LIVE | moderate | acute-crisis | ❌ NOT IN REGISTRY | trc-09 | /recovery/trc/thought-reframing | TRC_STEPS[9] | → trauma-journal | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| shame-recovery | TRC | Shame & Self-Blame Reframing | Regulation | shame-recovery | Framework TF-CBT | — | EXISTS | EXISTS | MISSING | LIVE | moderate | severe-dissociation, acute-crisis | ❌ NOT IN REGISTRY | trc-10 | /recovery/trc/shame-recovery | TRC_STEPS[12] | → boundaries | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| trauma-journal | TRC | Trauma Journal | Regulation | trauma-journal | Master Map 2.5 | — | EXISTS | EXISTS | MISSING | LIVE | higher | active-dissociation, severe-dissociation, recent-trauma | ❌ NOT IN REGISTRY | trc-11 | /recovery/trc/trauma-journal | TRC_STEPS[10] | → trauma-responses | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |
| eft-tapping | TRC | EFT Tapping | Regulation | eft-tapping | Master Map 2.3 | YES (eft-final-spec) | EXISTS | EXISTS | MISSING | CLINICAL-REVIEW | higher | active-dissociation, severe-dissociation | ❌ NOT IN REGISTRY | trc-12 | /recovery/trc/eft-tapping | TRC_STEPS[8] | → thought-reframing | PARTIAL (AR only) | INTEGRATED | NOT-LIVE |

---

## 3. P0 Integration Specification
# مواصفات دمج P0

P0 materials are the 4 critical journey/safety materials. If their complete cycle succeeds, it becomes the official Template for all remaining materials.

### P0 Materials

| # | Material | Asset ID | Why P0 |
|---|----------|----------|--------|
| 1 | Grounding Pocket Card | grounding-54321 | First step in TRC journey. Every user encounters this. Pocket card enables immediate distress intervention offline. |
| 2 | A52 Breathing Card | a52-breathing | Second step in Safety stage. Breathing technique requires quick reference that can be used without screen. |
| 3 | Safety Plan | safety-plan | Stanley-Brown protocol — must be printable and carryable. Critical for crisis situations when screen may not be accessible. |
| 4 | Trigger Mapping | trigger-mapping | Transition tool from Safety → Regulation. User must map triggers to build safety plan. Worksheet requires writing spaces. |

### P0 Integration Checklist (per material)

Each P0 material must complete ALL of the following before P0 COMPLETE:

| Step | Gate | Grounding Card | A52 Card | Safety Plan | Trigger Mapping |
|------|------|---------------|----------|-------------|-----------------|
| 1. AR Prompt | EXISTS? | ✅ YES (161 lines) | ✅ YES (145 lines) | ✅ YES (182 lines) | ✅ YES (208 lines) |
| 2. EN Prompt | EXISTS? | ❌ MISSING | ❌ MISSING | ❌ MISSING | ❌ MISSING |
| 3. AR PDF | EXISTS? | ✅ YES (55928 bytes) | ✅ YES (55889 bytes) | ✅ YES (53330 bytes) | ✅ YES (55742 bytes) |
| 4. EN PDF | EXISTS? | ❌ MISSING | ❌ MISSING | ❌ MISSING | ❌ MISSING |
| 5. Canonical Naming (AR) | VALID? | ❌ trc-01-grounding-pocket-card.pdf ≠ TRC-Grounding-Card-AR.pdf | ❌ trc-02-breathing-technique-card.pdf ≠ TRC-A52-Breathing-Card-AR.pdf | ❌ trc-06-safety-plan-card.pdf ≠ TRC-Safety-Plan-AR.pdf | ❌ trc-05-trigger-map-worksheet.pdf ≠ TRC-Trigger-Mapping-AR.pdf |
| 6. Canonical Naming (EN) | VALID? | ❌ No EN file | ❌ No EN file | ❌ No EN file | ❌ No EN file |
| 7. Registry Mapping | EXISTS? | ✅ YES | ✅ YES | ✅ YES (planned) | ✅ YES (planned) |
| 8. Download Mapping | VALID? | ✅ trc-01 | ✅ trc-02 | ✅ trc-06 | ✅ trc-05 |
| 9. Downloads Page | VISIBLE? | ❌ Shows as 'planned', not linked | ❌ Shows as 'planned', not linked | ❌ NOT ON PAGE (only 5 items) | ❌ NOT ON PAGE (only 5 items) |
| 10. UI Link from Tool | EXISTS? | ❌ No companion link in grounding page | ❌ No companion link in a52 page | ❌ No companion link in safety-plan page | ❌ No companion link in trigger-mapping page |
| 11. Journey Link | EXISTS? | ✅ In TRC_STEPS downloadables | ✅ In TRC_STEPS downloadables | ✅ In TRC_STEPS downloadables | ✅ In TRC_STEPS downloadables |
| 12. Safety Notes in PDF | PRESENT? | ⚠️ Not verified (AR content audit needed) | ⚠️ Not verified | ⚠️ Not verified | ⚠️ Not verified |
| 13. Stop Guidance in PDF | PRESENT? | ⚠️ Not verified | ⚠️ Not verified | ⚠️ Not verified | ⚠️ Not verified |
| 14. Domain Isolation | TRC-only? | ✅ TRC prefix, no PR content | ✅ TRC prefix | ✅ TRC prefix | ✅ TRC prefix |
| 15. Clinical Status Correct | ACCURATE? | ✅ LIVE | ⚠️ Registry=clinical-review, Journey=live | ✅ LIVE | ✅ LIVE |
| 16. Production Verification | COMPLETE? | ❌ EN missing | ❌ EN missing | ❌ EN missing | ❌ EN missing |

### P0 Cycle Status

| Material | AR Prompt | EN Prompt | AR PDF | EN PDF | Naming | Registry | Downloads Page | UI Link | Journey | Safety | Domain | Clinical | Production |
|----------|-----------|-----------|--------|--------|--------|----------|---------------|---------|---------|--------|--------|---------|------------|
| Grounding Card | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| A52 Breathing Card | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| Safety Plan | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| Trigger Mapping | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ⚠️ | ✅ | ✅ | ❌ |

**P0 COMPLETE: ❌ NO**
**P0 PASS count: 0/4 materials fully complete**
**Template Status: NOT ESTABLISHED — P0 cycle must complete before P1/P2**

---

## 4. External Handoff Document
# وثيقة التسليم الخارجي

### What We Will Produce Externally (8 files)

| # | File | Material | Language | Input | Process |
|---|------|----------|----------|-------|---------|
| 1 | TRC-Grounding-Card-AR.pdf | Grounding Pocket Card | AR | trc-grounding-pocket-card-prompt.md + trc-framework safety principles | External design → Review → Approve |
| 2 | TRC-Grounding-Card-EN.pdf | Grounding Pocket Card | EN | Same prompt (EN version) + framework EN | External design → Review → Approve |
| 3 | TRC-A52-Breathing-Card-AR.pdf | A52 Breathing Card | AR | trc-a52-breathing-card-prompt.md + Polyvagal/breathing references | External design → Review → Approve |
| 4 | TRC-A52-Breathing-Card-EN.pdf | A52 Breathing Card | EN | Same prompt (EN version) | External design → Review → Approve |
| 5 | TRC-Safety-Plan-AR.pdf | Safety Plan | AR | trc-safety-plan-prompt.md + Stanley-Brown protocol | External design → Review → Approve |
| 6 | TRC-Safety-Plan-EN.pdf | Safety Plan | EN | Same prompt (EN version) | External design → Review → Approve |
| 7 | TRC-Trigger-Mapping-AR.pdf | Trigger Mapping | AR | trc-trigger-mapping-worksheet-prompt.md + CBT chain analysis | External design → Review → Approve |
| 8 | TRC-Trigger-Mapping-EN.pdf | Trigger Mapping | EN | Same prompt (EN version) | External design → Review → Approve |

### Printable Companion Principles (Digital Asset ≠ Printable Asset)

For each P0 material, the PDF must be a **Printable Companion**, NOT a screenshot of the web page:

| Digital Tool Has | Printable Companion Has |
|-----------------|----------------------|
| Interactive state management | Static, printable layout |
| Navigation between steps | Single-flow or sectioned document |
| Session persistence / localStorage | Physical paper — write on it |
| SafetyResponse component (dynamic) | Safety Note box (static, printed) |
| DistressCheckIn (interactive prompt) | "Stop if you feel distressed" instruction |
| Suggested Next Step (clickable link) | "What to do next" text section |
| Auto-scroll / phase progression | User controls pace on paper |

### Specific PDF Content Requirements

**Grounding Pocket Card (AR + EN):**
- Brief instruction: "Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste"
- Empty 5-4-3-2-1 fields for writing
- Safety Note: "If you feel more distressed, stop and return to breathing"
- Stop guidance: "Stop immediately if experiencing dissociation or panic"
- What next: "Try A52 Breathing next for deeper regulation"

**A52 Breathing Card (AR + EN):**
- Breathing pattern diagram: Inhale 5s → Hold 2s → Exhale 5s
- Practice log spaces (3-5 practice rows)
- Safety Note: "Do not use if you have COPD, recent chest injury, or unstable cardiac condition"
- Stop guidance: "If you feel lightheaded, return to natural breathing immediately"
- What next: "Try Safe Place Visualization for deeper calming"

**Safety Plan (AR + EN):**
- Stanley-Brown 6-step template with writing spaces:
  1. Warning signs
  2. Internal coping strategies
  3. People/social settings for distraction
  4. People I can ask for help
  5. Professionals/agencies to contact
  6. Making the environment safe
- Crisis hotline space
- Safety Note: "This plan is for your safety. Share it with someone you trust."
- What next: "Use Regulation Toolkit to build more coping strategies"

**Trigger Mapping (AR + EN):**
- Brief instructions for identifying triggers
- Empty mapping table: Trigger → Body Response → Emotion → Impulse → What Helped → Next Step
- Multiple rows (minimum 5 empty rows)
- Safety Note: "If mapping triggers causes distress, stop and use Grounding first"
- Stop guidance: "Stop if you notice increasing distress or dissociation"
- What next: "Use your Safety Plan for the triggers you've identified"

### Handoff Protocol

```
User produces PDF externally
        ↓
Submits to Integration Agent
        ↓
Integration Agent runs Validation:
  ├── Identity Check (TRC? Asset ID? Language? Version? Filename?)
  ├── Content Check (Correct asset? Framework aligned? No invented methodology? Printable Companion? Writing spaces? Instructions?)
  ├── Safety Check (Safety Notes? Contraindications? Stop guidance? No unsupported claims? Not presented as treatment substitute?)
  └── Clinical Check (If asset = CLINICAL-REVIEW, PDF status ≠ LIVE)
        ↓
If PASS → Replace old file → Register → Map → Link → Verify
If FAIL → REJECTED (reason documented, not deleted)
```

---

## 5. Downloads Page Synchronization
# مزامنة صفحة التحميلات

### Current State: BROKEN

The downloads page (`/recovery/trc/downloads`) is hardcoded with 5 items, all marked `planned`:

```typescript
const trcDownloads = [
  { id: 'grounding-pocket-card', status: 'planned' },
  { id: 'a52-breathing-card', status: 'planned' },
  { id: 'safe-place-worksheet', status: 'planned' },
  { id: 'body-awareness-worksheet', status: 'planned' },
  { id: 'psychoeducation-pdf', status: 'planned' },
];
```

**Problems:**
1. Only 5 items listed — 7 of the 12 actual PDFs are invisible
2. All marked `planned` — despite files existing on server
3. No download links — no actual file access
4. Hardcoded — not derived from registry or journey model
5. No language indicator — no AR/EN distinction
6. No therapeutic asset link — disconnected from journey

### Required: Single Source of Truth

The Downloads page MUST be derived from a single data source. The recommended approach:

**Data Source: TRC_ASSETS registry → downloadables[] array**

Each `TrcDownloadableRef` in the registry already contains:
- `id`: unique identifier
- `labelAr` / `labelEn`: bilingual labels
- `type`: card / worksheet / pdf / audio
- `status`: planned / in-progress / built
- `path`: relative path to file

**Transformation Rule:**

```
Show on Downloads Page IF AND ONLY IF:
  1. file exists in /public/downloads/trc/ (verified at build time or runtime)
  2. downloadable.status === 'built' OR file actually exists
  3. asset is mapped in TRC_ASSETS registry
  4. NOT clinical-review-unapproved (EFT = show with clinical-review badge)
```

**Do NOT show:**
- Planned items with no file
- Prompt-only items
- Missing items
- Unapproved clinical-review items (show with badge if file exists)

**Each download card MUST display:**
- Tool name (bilingual)
- Material type (Card / Worksheet / Guide / Reference)
- Language (AR / EN / both)
- Purpose (brief therapeutic purpose)
- Download link (actual file URL)
- Linked therapeutic asset (clickable link to tool page)

### Implementation Specification

```typescript
// Replace hardcoded trcDownloads with:
const trcAvailableDownloads = TRC_ASSETS
  .flatMap(asset => asset.downloadables.map(dl => ({...dl, assetId: asset.id, assetRoute: asset.route})))
  .filter(dl => dl.status === 'built')  // Only files that exist
  .filter(dl => fileExists(`/public/downloads/trc/${dl.path}`)); // Verify file exists

// For each downloadable, show:
// - Name (from labelAr/labelEn based on locale)
// - Type badge
// - Language badge (AR / EN / AR+EN)
// - Asset link (to asset.route)
// - Download button (href to /downloads/trc/path)
// - Clinical badge if asset.status === 'clinical-review'
```

---

## 6. Registry Integrity Check
# فحص سلامة السجل

### Registry ↔ Actual Files Bidirectional Audit

| Check | Status | Details |
|-------|--------|---------|
| AR PDFs with Registry reference | ⚠️ PARTIAL | 5/12 downloadables have registry entries (grounding, a52, safe-place, body-scan, psychoeducation). The other 7 PDFs exist but their parent assets may lack proper downloadables mappings. |
| Registry references to actual files | ⚠️ PARTIAL | Some downloadables reference paths that don't match actual filenames (e.g., `grounding-pocket-card.pdf` vs `trc-01-grounding-pocket-card.pdf`) |
| Assets in Journey but NOT in Registry | ❌ FAIL | 5 assets: regulation-toolkit, eft-tapping, thought-reframing, trauma-journal, shame-recovery |
| Assets in Registry but NOT in Journey | ⚠️ | trauma-responses is in registry as 'planned' but in journey as available |
| Orphan PDFs (no registry reference) | ❌ FAIL | 7 PDFs have no direct downloadables entry in their parent's registry record |
| Registry orphans (downloadable with no file) | ⚠️ | psychoeducation-pdf referenced in registry but no file exists |

### Detailed Path Mismatch Audit

| Registry Downloadable Path | Actual File | Match? |
|---------------------------|-------------|--------|
| grounding-pocket-card.pdf | trc-01-grounding-pocket-card.pdf | ❌ MISMATCH |
| a52-breathing-card.pdf | trc-02-breathing-technique-card.pdf | ❌ MISMATCH |
| safe-place-worksheet.pdf | trc-03-safe-place-journal.pdf | ❌ MISMATCH |
| body-awareness-worksheet.pdf | trc-04-body-scan-guide.pdf | ❌ MISMATCH |
| psychoeducation-pdf.pdf | ❌ NO FILE EXISTS | ❌ MISSING |

**Critical Issue:** Registry downloadable paths do NOT match actual filenames. The registry uses logical names while the filesystem uses `trc-NN-descriptive-name.pdf` format. This creates a disconnect where the registry cannot find the actual files.

### Missing from Registry (5 assets)

| Asset ID | In Journey? | Has Page? | Has PDF? | Has i18n? |
|----------|-------------|-----------|----------|-----------|
| regulation-toolkit | YES (isAvailable: true) | YES | YES (trc-07) | YES |
| eft-tapping | YES (isAvailable: true) | YES | YES (trc-12) | YES |
| thought-reframing | YES (isAvailable: true) | YES | YES (trc-09) | YES |
| trauma-journal | YES (isAvailable: true) | YES | YES (trc-11) | YES |
| shame-recovery | YES (isAvailable: true) | YES | YES (trc-10) | YES |

**Impact:** `getTrcAssetById()` returns `undefined` for 5 built, available assets. This means any code relying on the registry for these tools will fail silently.

### Registry Integrity Verdict: ❌ FAIL

- Path mismatches: 5/5
- Missing assets: 5/16
- Orphan PDFs: 7/12
- Missing EN files: 12/12

---

## 7. Orphan Audit
# مراجعة الملفات اليتيمة

| Category | Item | Issue |
|----------|------|-------|
| PDF without registry reference | trc-05-trigger-map-worksheet.pdf | Parent asset (trigger-mapping) has empty `downloadables: []` in registry |
| PDF without registry reference | trc-06-safety-plan-card.pdf | Parent asset (safety-plan) has empty `downloadables: []` in registry |
| PDF without registry reference | trc-07-regulation-quick-reference.pdf | Asset NOT in registry at all |
| PDF without registry reference | trc-08-response-patterns-reference.pdf | Parent asset (trauma-responses) has no downloadables in registry |
| PDF without registry reference | trc-09-thought-reframing-worksheet.pdf | Asset NOT in registry at all |
| PDF without registry reference | trc-10-shame-recovery-worksheet.pdf | Asset NOT in registry at all |
| PDF without registry reference | trc-11-trauma-journal-guide.pdf | Asset NOT in registry at all |
| PDF without registry reference | trc-12-eft-self-help-worksheet.pdf | Asset NOT in registry at all |
| Registry reference without file | psychoeducation-pdf (in what-trauma-does-to-the-body) | No PDF file exists |
| UI link dead | Downloads page → 7 missing items | 7 of 12 actual PDFs not shown |
| Downloads page phantom | 5 items shown as 'planned' but 3 have actual files | Misleading user experience |
| Non-canonical filename | All 12 files use trc-NN-name.pdf format | Not matching canonical TRC-Asset-Type-Lang.pdf convention |
| No EN counterparts | All 12 files | 0 English versions exist |
| Duplicate risk | None found | No duplicate PDFs detected |

### Journey-Orphan Pages (not in TRC_STEPS)

| Page | Route | Has incoming links? | In journey model? |
|------|-------|--------------------|--------------------|
| grounding-guide | /recovery/trc/grounding-guide | Yes (from TRC hub) | No |
| regulation-guide | /recovery/trc/regulation-guide | Yes (from TRC hub) | No |
| secondary-trauma | /recovery/trc/secondary-trauma | Yes (from TRC hub) | No |

These are informational companions, not journey steps. They are acceptable orphans but should be documented.

---

## 8. Canonical File Naming Policy
# سياسة التسمية القياسية للملفات

### Current Filenames (non-canonical)

| Current | Canonical Target |
|---------|-----------------|
| trc-01-grounding-pocket-card.pdf | TRC-Grounding-Card-AR.pdf |
| trc-02-breathing-technique-card.pdf | TRC-A52-Breathing-Card-AR.pdf |
| trc-03-safe-place-journal.pdf | TRC-Safe-Place-Journal-AR.pdf |
| trc-04-body-scan-guide.pdf | TRC-Body-Scan-Guide-AR.pdf |
| trc-05-trigger-map-worksheet.pdf | TRC-Trigger-Mapping-AR.pdf |
| trc-06-safety-plan-card.pdf | TRC-Safety-Plan-AR.pdf |
| trc-07-regulation-quick-reference.pdf | TRC-Regulation-Quick-Ref-AR.pdf |
| trc-08-response-patterns-reference.pdf | TRC-Trauma-Responses-Ref-AR.pdf |
| trc-09-thought-reframing-worksheet.pdf | TRC-Thought-Reframing-AR.pdf |
| trc-10-shame-recovery-worksheet.pdf | TRC-Shame-Recovery-AR.pdf |
| trc-11-trauma-journal-guide.pdf | TRC-Trauma-Journal-Guide-AR.pdf |
| trc-12-eft-self-help-worksheet.pdf | TRC-EFT-Self-Help-AR.pdf |

### Naming Convention

**Format:** `TRC-[ASSET-NAME]-[TYPE]-[LANGUAGE].pdf`

Where:
- `TRC` = Domain prefix (never PR or mixed)
- `ASSET-NAME` = PascalCase asset identifier
- `TYPE` = Card / Worksheet / Guide / Journal / Ref (optional for cards)
- `LANGUAGE` = AR / EN

**Forbidden patterns:**
- `final.pdf`, `new.pdf`, `final-final.pdf`
- `arabic2.pdf`, `worksheet-new.pdf`
- Any name without TRC prefix
- Any name without language suffix

### Renaming Strategy

When new canonical files are produced externally:
1. Place new file with canonical name: `TRC-Grounding-Card-AR.pdf`
2. Update registry `downloadables[].path` to canonical name
3. Verify all references updated (downloads page, journey, UI links)
4. Mark old file as `REPLACED` (do NOT delete until all references verified)
5. Update any hardcoded URLs or cached mappings

---

## 9. Validation Protocol
# بروتوكول التحقق

For any PDF submitted for integration:

### Identity Validation

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Domain check | Verify TRC prefix, no PR content | File is TRC-only |
| Asset ID | Match to known TRC asset | Valid TRC asset ID |
| Language | Verify AR or EN suffix | AR or EN specified |
| Version | Check version/date in metadata | Version present |
| Canonical filename | Match naming convention | TRC-Asset-Type-Lang.pdf |

### Content Validation

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Asset alignment | Content relates to correct therapeutic asset | Matches asset description |
| Framework alignment | Content follows TRC framework methodology | No invented methodology |
| Printable Companion | Has writing spaces, instructions, not just text | True companion, not screenshot |
| Writing spaces | Has blank areas for user writing | Minimum required spaces present |
| Instructions | Has brief usage instructions | "How to use" section present |
| What next | Has next step guidance | Next step text present |

### Safety Validation

| Check | Method | Pass Criteria |
|-------|--------|---------------|
| Safety Notes | Safety note present in document | Visible safety guidance |
| Contraindications | Listed if asset has contraindications | Match journey model |
| Stop guidance | "When to stop" instructions present | Clear stop criteria |
| No unsupported claims | No unverified clinical claims | All claims cited or hedged |
| Not treatment substitute | Not presented as replacement for therapy | Disclaimer present |

### Clinical Status Rule

```
IF asset.status === 'clinical-review':
    THEN pdf.status ≠ 'LIVE'
    AND pdf must display clinical-review indicator
    AND pdf must not imply therapeutic approval
```

This applies specifically to:
- EFT Tapping (clinical-review)
- A52 Breathing (clinical-review in registry, though live in journey — inconsistency)

---

## 10. AR + EN Bilingual Rule
# قاعدة ثنائية اللغة الإلزامية

### Current State: FAIL

| Program | Total Materials | AR | EN | Bilingual Coverage |
|---------|----------------|-----|-----|-------------------|
| Porn Recovery | 11 | 11 | 11 | 100% |
| TRC | 12 | 12 | 0 | 0% |

### Rule

A material is NOT considered production-complete if AR-only, unless there is an explicit documented decision of AR_ONLY with justified reason.

**Target state for each material:**
- AR = APPROVED
- EN = APPROVED
- Therapeutic value equivalence (EN is NOT a mere summary or abbreviated translation)

### EN Quality Requirements

- Complete therapeutic content (not abbreviated)
- Equivalent safety notes and contraindications
- Equivalent writing spaces and instructions
- Culturally appropriate language (not just literal translation)
- Same printable companion structure
- Professional English clinical terminology

---

## 11. Replacement Policy
# سياسة الاستبدال

When a new approved version arrives:

```
OLD file → status: REPLACED
    ↓ (do NOT delete until all references verified)
NEW file → status: APPROVED → INTEGRATED → VISIBLE
```

### On replacement, verify:
1. ✅ Orphan check — no stale references to old file
2. ✅ Registry reference — updated to new canonical name
3. ✅ Downloads page — shows new file, not old
4. ✅ Journey model — downloadables[] path updated
5. ✅ UI links — companion links point to new file
6. ✅ Hardcoded URLs — none found that reference old file
7. ✅ Cached mappings — cleared or invalidated

### Never:
- Delete old version before new version is fully verified
- Have two versions visible to user simultaneously
- Leave references pointing to replaced file

---

## 12. Domain Isolation Verification
# التحقق من عزل النطاقات

| Check | Status | Evidence |
|-------|--------|----------|
| TRC PDFs have TRC prefix | ✅ PASS | All 12 files use trc- prefix |
| No PR content in TRC PDFs | ✅ PASS | Zero porn-recovery content in TRC downloads |
| No TRC content in PR PDFs | ✅ PASS | Zero TRC content in PR downloads |
| Separate download directories | ✅ PASS | /downloads/trc/ ≠ /downloads/porn-recovery/ |
| Separate registry | ✅ PASS | trc-assets.ts ≠ porn-recovery-assets.ts |
| Separate journey model | ✅ PASS | TRC_STEPS ≠ PORN_RECOVERY_STEPS |
| No cross-domain nextStep | ✅ PASS | No TRC step points to PR step or vice versa |
| No shared CTA | ✅ PASS | No cross-domain therapeutic call-to-action |
| Separate localStorage keys | ✅ PASS | tamkinly_trc_* ≠ tamkinly_pr_* |

**Domain Isolation: ✅ PASS**

```
Recovery
├── Porn Recovery
│   ├── Own registry
│   ├── Own journey
│   ├── Own downloads
│   └── Own UI
│
└── TRC
    ├── Own registry
    ├── Own journey
    ├── Own downloads
    └── Own UI

NO shared PDF, Registry, Journey, CTA, or downloadable
```

---

## 13. Reinstatement Audit
# مراجعة استرجاع الأصول

Per the directive: "لا تفترض أن غير موجود في Registry = غير مطلب"

| Asset | In Source Material | In Master Map | In Framework | In Registry | In Journey | Implemented | Status |
|-------|-------------------|---------------|-------------|-------------|------------|-------------|--------|
| grounding-54321 | YES | YES (1.1) | YES | YES | YES | YES | OK |
| a52-breathing | YES | YES (1.2) | YES | YES | YES | YES | OK |
| safe-place | YES | YES (1.3) | YES | YES | YES | YES | OK |
| body-scan | YES | YES (1.4) | YES | YES | YES | YES | OK |
| trigger-mapping | YES | YES (2.1) | YES | YES | YES | YES | OK |
| safety-plan | YES | YES | YES | YES | YES | YES | OK |
| regulation-toolkit | YES | YES (2.2) | YES | ❌ NOT IN REGISTRY | YES | YES | MISSING from registry |
| eft-tapping | YES | YES (2.3) | YES | ❌ NOT IN REGISTRY | YES | YES | MISSING from registry |
| thought-reframing | YES | YES (2.4) | YES | ❌ NOT IN REGISTRY | YES | YES | MISSING from registry |
| trauma-journal | YES | YES (2.5) | YES | ❌ NOT IN REGISTRY | YES | YES | MISSING from registry |
| trauma-responses | YES (Framework P5) | ❌ | YES | YES (planned) | YES | YES | OK (justified addition) |
| shame-recovery | YES (Framework TF-CBT) | ❌ | YES | ❌ NOT IN REGISTRY | YES | YES | MISSING from registry |
| regulation-workbook | YES | YES (2.D1) | YES | ❌ | ❌ | ❌ | MISSING — needs specification |
| boundaries | YES (Wave 3) | YES | YES | ❌ | YES | ❌ | NOT BUILT (Wave 3) |
| therapist-selection | YES (Wave 3) | YES | YES | ❌ | YES | ❌ | NOT BUILT (Wave 3) |
| recovery-milestones | YES (Wave 3) | YES | YES | ❌ | YES | ❌ | NOT BUILT (Wave 3) |

### Key Reinstatement Issues

1. **EFT Tapping** — Previously at risk of disappearing. Now in journey with `isAvailable: true` and `safetyLevel: 'higher'`. Must NOT disappear again.
2. **Regulation Workbook (2.D1)** — In master map but never built. Needs a production specification. Should NOT be deleted from source documentation.
3. **5 Registry-missing assets** — Built and available but not in registry. This creates a gap where `getTrcAssetById()` fails for working tools.

---

## 14. Clinical Status Independence
# استقلال الحالة السريرية عن حالة المادة

### Rule: PDF Status ≠ Asset Status

| Scenario | PDF Status | Asset Status | Allowed? |
|----------|-----------|-------------|----------|
| Normal | APPROVED | LIVE | ✅ Yes |
| Clinical Review | APPROVED | CLINICAL-REVIEW | ✅ Yes — PDF can be approved while asset is under review |
| Clinical Review | LIVE | CLINICAL-REVIEW | ❌ NO — PDF must not imply LIVE if asset isn't |
| Not Reviewed | ANY | CLINICAL-REVIEW | ❌ NO — Clinical-review assets need specialist review |

### Current EFT Situation

- EFT Asset Status: CLINICAL-REVIEW
- EFT AR PDF: EXISTS (but should display clinical-review indicator)
- EFT EN PDF: MISSING
- **Rule:** Even when EN PDF is produced, if asset remains CLINICAL-REVIEW, the PDF must show "Under Clinical Review — Not a substitute for professional treatment"

---

## 15. Digital Asset ≠ Printable Asset
# الأصل الرقمي ≠ الأصل القابل للطباعة

### Example: Trigger Mapping

| Aspect | Digital Tool | Printable Companion |
|--------|-------------|-------------------|
| Interaction | Click through trigger → body → emotion → impulse | Write in blank spaces at own pace |
| State | Saves to localStorage | Physical paper, user keeps |
| Safety | Dynamic DistressCheckIn component | Static "Stop if distressed" box |
| Navigation | Next/Back buttons, auto-progress | Linear page flow |
| Completion | Mark step complete in journey | "What to do next" text |
| Persistence | Session-based | Permanent until paper is lost |
| Offline | Requires browser | Works without any device |
| Portability | URL-dependent | Carry in wallet/bag |

**The PDF must never be just a screenshot or abbreviated copy of the web page.**

---

## 16. Material Production Dashboard
# لوحة إنتاج المواد

### Prompt Only (PROMPT_ONLY)

| Material | Prompt | AR PDF | EN PDF |
|----------|--------|--------|--------|
| Safe Place Journal | EXISTS | EXISTS | MISSING |
| Body Scan Guide | EXISTS | EXISTS | MISSING |
| Regulation Quick Reference | EXISTS | EXISTS | MISSING |
| Trauma Responses Reference | EXISTS | EXISTS | MISSING |
| Thought Reframing Worksheet | EXISTS | EXISTS | MISSING |
| Shame Recovery Worksheet | EXISTS | EXISTS | MISSING |
| Trauma Journal Guide | EXISTS | EXISTS | MISSING |
| EFT Self-Help Worksheet | EXISTS | EXISTS | MISSING |

Note: These have AR PDFs, but without EN, they are not production-complete. The Prompt exists but Prompt ≠ Finished Material.

### External Production (EXTERNAL_PRODUCTION)

None currently assigned. **All 8 P0 EN PDFs need external production.**

### Submitted (SUBMITTED)

None.

### Approved (APPROVED)

None. No material has passed full validation.

### Integrated (INTEGRATED — partial)

12 AR PDFs exist on server but:
- ❌ 0 have canonical filenames
- ❌ 7 lack registry downloadables mapping
- ❌ 0 have EN counterparts
- ❌ Downloads page doesn't show them correctly

### Visible (VISIBLE)

❌ None. Downloads page shows only 5 items as 'planned' with no download links.

### Live (LIVE)

❌ None. No material has AR + EN + Approved + Integrated + Visible.

### Clinical Review (CLINICAL_REVIEW)

| Material | Asset Status | PDF Status |
|----------|-------------|-----------|
| A52 Breathing | clinical-review (registry) | EXISTS (AR) — should show review indicator |
| Safe Place | clinical-review (registry) | EXISTS (AR) — should show review indicator |
| Body Scan | clinical-review (registry) | EXISTS (AR) — should show review indicator |
| EFT Tapping | clinical-review (journey) | EXISTS (AR) — must show review indicator |

---

## 17. Future Production Briefs (Wave 3 — Specs Only, No PDF)
# مواصفات الإنتاج المستقبلية — Wave 3

### Boundaries

| Field | Value |
|-------|-------|
| Asset ID | boundaries |
| Stage | Integration |
| Needs PDF? | YES — Boundary setting worksheet |
| Type | Worksheet |
| Purpose | Identify, practice, and reinforce personal boundaries |
| Expected pages | 4-6 |
| Content structure | What are boundaries / Types / My boundaries list / Practice scenarios / Safety when boundary is violated |
| Interactive spaces | Boundary writing areas, practice response spaces |
| Safety requirements | Safety Note for violation triggers, Stop guidance, Therapist referral |
| AR/EN | Both required |
| Linked therapeutic asset | boundaries (Wave 3) |
| Journey step | boundaries |
| Next step | therapist-selection |
| **DO NOT PRODUCE PDF NOW** | Wave 3 asset not yet built |

### Therapist Selection

| Field | Value |
|-------|-------|
| Asset ID | therapist-selection |
| Stage | Integration |
| Needs PDF? | YES — Therapist selection checklist |
| Type | Guide / Checklist |
| Purpose | Questions to ask, red flags, what to look for in a trauma therapist |
| Expected pages | 3-5 |
| Content structure | What to look for / Questions to ask / Red flags / First session preparation / Insurance/practical considerations |
| Interactive spaces | Checklist items, notes space |
| Safety requirements | Not a substitute for professional referral |
| AR/EN | Both required |
| Linked therapeutic asset | therapist-selection (Wave 3) |
| Journey step | therapist-selection |
| Next step | recovery-milestones |
| **DO NOT PRODUCE PDF NOW** | Wave 3 asset not yet built |

### Recovery Milestones

| Field | Value |
|-------|-------|
| Asset ID | recovery-milestones |
| Stage | Integration |
| Needs PDF? | YES — Milestone tracker |
| Type | Tracker / Journal |
| Purpose | Track and celebrate recovery progress over time |
| Expected pages | 4-6 |
| Content structure | Milestone categories / Date tracking / Reflection spaces / Celebrating progress / When to seek more help |
| Interactive spaces | Date fields, reflection writing, milestone checkboxes |
| Safety requirements | No gamification (no scores/streaks/XP) — milestone tracking is reflection, not competition |
| AR/EN | Both required |
| Linked therapeutic asset | recovery-milestones (Wave 3) |
| Journey step | recovery-milestones |
| Next step | null (journey complete) |
| **DO NOT PRODUCE PDF NOW** | Wave 3 asset not yet built |

### Regulation Workbook (2.D1) — Missing from implementation

| Field | Value |
|-------|-------|
| Asset ID | regulation-workbook |
| Stage | Regulation |
| Needs PDF? | YES — Comprehensive workbook |
| Type | Workbook |
| Purpose | Structured workbook covering all Stage 2 exercises in sequence |
| Expected pages | 20-30 |
| Content structure | Introduction / Safety first / Exercise sequence with spaces / Safety notes per section / Progress tracking / When to stop / Next steps |
| Interactive spaces | Extensive writing spaces, exercise logs, reflection areas |
| Safety requirements | Mandatory safety section, dissociation screening, stop criteria per exercise |
| AR/EN | Both required |
| Linked therapeutic asset | regulation-toolkit (parent) |
| Journey step | Not in TRC_STEPS (gap) |
| Next step | N/A (companion, not sequential) |
| Status | MISSING — in master map but never built. Needs specification. |

---

## 18. P1 Materials (After P0 Complete)
# مواد P1 — بعد إغلاق P0

P1 materials enhance existing tools and are next priority after P0 succeeds:

| # | Material | Asset ID | Type | Why P1 |
|---|----------|----------|------|--------|
| 1 | Safe Place Journal | safe-place | Journal | Enhances Safe Place visualization with structured journaling |
| 2 | Body Scan Guide | body-scan | Guide | Printable companion for body scan exercise |
| 3 | Regulation Quick Reference | regulation-toolkit | Reference Card | Quick reference for all regulation techniques |
| 4 | Trauma Responses Reference | trauma-responses | Reference | Fight/flight/freeze/fawn reference card |
| 5 | Thought Reframing Worksheet | thought-reframing | Worksheet | CBT-based cognitive restructuring companion |
| 6 | Shame Recovery Worksheet | shame-recovery | Worksheet | TF-CBT shame reframing companion |

**Do NOT start P1 until P0 cycle completes and Template is established.**

---

## 19. P2 Materials (Later / Wave 3+)
# مواد P2 — لاحقا:00

| # | Material | Asset ID | Type | Why P2 |
|---|----------|----------|------|--------|
| 1 | Trauma Journal Guide | trauma-journal | Guide | Higher-risk tool, requires more safety review |
| 2 | EFT Self-Help Worksheet | eft-tapping | Worksheet | CLINICAL-REVIEW — cannot be LIVE without specialist sign-off |
| 3 | Boundaries Worksheet | boundaries | Worksheet | Wave 3 asset |
| 4 | Therapist Selection Guide | therapist-selection | Guide | Wave 3 asset |
| 5 | Recovery Milestones Tracker | recovery-milestones | Tracker | Wave 3 asset |
| 6 | Regulation Workbook | regulation-workbook | Workbook | Large, complex — needs dedicated production |

---

## 20. Integration Within Tool Pages
# الدمج داخل صفحات الأدوات

### Current State

No TRC tool page currently links to its companion printable PDF. Users must navigate to `/recovery/trc/downloads` to find materials — creating a discoverability gap.

### Required Pattern

```
Therapeutic Tool Page
    ↓ (at completion or alongside)
Companion Printable Section
    "Use the printable companion to practice this tool offline"
    [Download AR] [Download EN]
    ↓
Suggested Next Step
```

### Implementation per P0 Material

| Tool Page | Companion PDF | Integration Point |
|-----------|--------------|-------------------|
| /recovery/trc/grounding | TRC-Grounding-Card-AR.pdf + EN.pdf | After grounding exercise completion |
| /recovery/trc/a52 | TRC-A52-Breathing-Card-AR.pdf + EN.pdf | After breathing practice completion |
| /recovery/trc/worksheets/safety-plan | TRC-Safety-Plan-AR.pdf + EN.pdf | Alongside safety plan builder |
| /recovery/trc/worksheets/trigger-mapping | TRC-Trigger-Mapping-AR.pdf + EN.pdf | After trigger mapping exercise |

### Rules
- Show companion link in context — not 10 repeated download links
- Only show if file exists AND is approved
- Show both AR and EN options
- Include brief text: "Take this with you to use offline"
- DO NOT link to downloads page — link directly to file

---

## 21. User Value Criterion
# معيار القيمة للمستخدم

The goal is NOT "we have 21 PDFs." The goal is:

> The user finds the right tool, understands why to use it, can take it offline, can return to it later, without losing their journey or mixing domains.

Every PDF must implicitly answer:

| Question | How PDF Answers It |
|----------|-------------------|
| ما هذه الأداة؟ (What is this tool?) | Title + brief description |
| لماذا أستخدمها؟ (Why use it?) | Purpose statement linked to therapeutic need |
| كيف أستخدمها؟ (How to use it?) | Step-by-step instructions |
| ماذا أكتب؟ (What to write?) | Clear writing spaces with labels |
| ماذا أفعل إذا شعرت بعدم الارتياح؟ (What if distressed?) | Safety Note + Stop guidance |
| ماذا أفعل بعد الانتهاء؟ (What after?) | Next step guidance |
| ما الخطوة التالية؟ (What's next?) | Linked to journey next step |

---

## 22. Recovery Hub Domain Separation
# فصل النطاقات في مركز التعافي

```
Recovery Hub (/recovery)
├── Porn Recovery
│   ├── Own journey model
│   ├── Own registry
│   ├── Own downloads (/recovery/porn-recovery/downloads)
│   ├── Own i18n keys
│   └── Own localStorage state
│
└── TRC
    ├── Own journey model
    ├── Own registry
    ├── Own downloads (/recovery/trc/downloads)
    ├── Own i18n keys
    └── Own localStorage state

NO:
- Shared PDF
- Shared registry
- Shared journey
- Shared therapeutic CTA
- Cross-domain downloadable
- Cross-domain nextStep

EXCEPTION: Only if there is an explicitly documented shared source asset — which is not assumed.
```

**Current status: ✅ PASS** — Domain isolation verified in previous audit.

---

## 23. Prompt ≠ Finished Material
# البرومبت ≠ المادة المنتهية

| Material | Prompt | AR PDF | EN PDF | Integrated | Visible | Live | Real Status |
|----------|--------|--------|--------|-----------|---------|------|-------------|
| Grounding Card | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| A52 Card | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Safe Place Journal | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Body Scan Guide | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Trigger Mapping | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Safety Plan | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Regulation Ref | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Trauma Responses | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Thought Reframing | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Shame Recovery | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| Trauma Journal | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | PROMPT_ONLY + AR_ONLY |
| EFT Self-Help | ✅ EXISTS | ✅ EXISTS | ❌ MISSING | ⚠️ PARTIAL | ❌ NO | ❌ NO | CLINICAL-REVIEW + AR_ONLY |

**12 prompts exist. 12 AR PDFs exist. 0 EN PDFs exist. 0 materials are Live.**
**Prompt Library is a production specification, NOT an achievement.**

---

## 24. Wave 3 Pre-Gate
# بوابة Wave 3 المسبقة

### Before Wave 3 can begin, ALL of the following must be verified:

| # | Category | Gate | Status |
|---|----------|------|--------|
| 1 | Materials | P0 AR PDFs produced externally and approved | ❌ Not started |
| 2 | Materials | P0 EN PDFs produced externally and approved | ❌ Not started |
| 3 | Materials | P0 files renamed to canonical naming | ❌ Not started |
| 4 | Integration | P0 files registered in TRC_ASSETS | ⚠️ Partial (some in registry but paths wrong) |
| 5 | Integration | P0 files visible on Downloads page | ❌ Page shows 5 planned items only |
| 6 | Integration | P0 companion links in tool pages | ❌ No tool page links to companion PDF |
| 7 | Wave 2 | EFT status clearly documented as CLINICAL-REVIEW | ✅ Documented |
| 8 | Wave 2 | Clinical Review status accurate for all assets | ⚠️ A52 inconsistency (registry vs journey) |
| 9 | Wave 2 | No Stage 2 assets missing without documented reason | ⚠️ regulation-workbook missing |
| 10 | Wave 2 | No orphan downloads | ❌ 7 PDFs without registry reference |
| 11 | Wave 2 | No planned assets appearing as Live | ❌ Downloads page shows planned items |
| 12 | Architecture | TRC separated from Porn Recovery | ✅ Verified |
| 13 | Architecture | localStorage/domain state separate | ✅ Verified |
| 14 | Architecture | Registry in sync with journey | ❌ 5 assets missing from registry |
| 15 | Architecture | Journey in sync with implementation | ⚠️ 3 journey-orphans |
| 16 | Architecture | Next-Step Engine points only to existing assets | ✅ Verified |

**Wave 3 Gate Status: ❌ BLOCKED**

Items 1-6 require external production. Items 10-11, 14 require integration work. These must ALL be PASS before Wave 3 begins.

---

## 25. Final Integration Gate
# بوابة الدمج النهائية

### Material Status Matrix

| Material | Prompt | AR | EN | Approved | Integrated | Visible | Live | Clinical |
|----------|--------|-----|-----|----------|-----------|---------|------|----------|
| Grounding Card | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | LIVE |
| A52 Breathing Card | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | CLINICAL-REVIEW* |
| Safe Place Journal | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | CLINICAL-REVIEW |
| Body Scan Guide | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | CLINICAL-REVIEW |
| Trigger Mapping | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | LIVE |
| Safety Plan | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | LIVE |
| Regulation Ref | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | LIVE |
| Trauma Responses Ref | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | LIVE |
| Thought Reframing | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | LIVE |
| Shame Recovery | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | LIVE |
| Trauma Journal | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | LIVE |
| EFT Self-Help | ✅ | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | CLINICAL-REVIEW |

⚠️ = Partial (AR on server but registry/downloads not fully wired)

---

### BLOCKERS (Everything that prevents Wave 3)

| # | Blocker | Category | Severity | Resolution |
|---|---------|----------|----------|-----------|
| 1 | 0/12 EN PDFs exist | Materials | CRITICAL | External production of all 12 EN PDFs |
| 2 | Downloads page shows 5 planned items, not 12 built files | UI | HIGH | Rewrite page to derive from registry |
| 3 | 5 assets missing from TRC_ASSETS registry | Architecture | HIGH | Add regulation-toolkit, eft-tapping, thought-reframing, trauma-journal, shame-recovery to registry |
| 4 | Registry downloadable paths don't match actual filenames | Architecture | HIGH | Update all downloadables[].path to match actual or canonical names |
| 5 | No companion PDF links in tool pages | UI | HIGH | Add companion section to each tool page |
| 6 | Non-canonical filenames (trc-NN-name.pdf ≠ TRC-Name-Type-Lang.pdf) | Naming | MEDIUM | Rename during P0 production cycle |
| 7 | A52 status inconsistency (registry=clinical-review vs journey=live) | Clinical | MEDIUM | Resolve to single authoritative status |
| 8 | regulation-workbook (2.D1) in master map but not built | Content | MEDIUM | Create production specification or document as deferred |

---

### READY (What can be used now)

| Item | Status |
|------|--------|
| 12 AR PDFs exist on server | ✅ Available but not discoverable via UI |
| 12 production prompts exist | ✅ Ready for external production |
| All TRC tool pages functional | ✅ 12+ routes returning 200 |
| Domain isolation verified | ✅ Zero cross-contamination |
| Safety architecture complete | ✅ No gamification, proper therapeutic flow |
| Journey model consistent internally | ✅ TRC_STEPS sequence valid |
| Next-Step Engine working | ✅ No cross-domain, safety gates enforced |
| AR+EN i18n complete for all tool pages | ✅ Full bilingual coverage |
| CrisisBar on all TRC pages | ✅ Persistent safety resource |
| Production server stable | ✅ PM2 online |

---

### EXTERNAL ACTION REQUIRED (What we need to produce outside the server)

| # | Action | Priority | Dependencies |
|---|--------|----------|-------------|
| 1 | Produce TRC-Grounding-Card-AR.pdf (canonical rename) | P0 | Use existing prompt |
| 2 | Produce TRC-Grounding-Card-EN.pdf | P0 | Use existing prompt, EN adaptation |
| 3 | Produce TRC-A52-Breathing-Card-AR.pdf (canonical rename) | P0 | Use existing prompt |
| 4 | Produce TRC-A52-Breathing-Card-EN.pdf | P0 | Use existing prompt, EN adaptation |
| 5 | Produce TRC-Safety-Plan-AR.pdf (canonical rename) | P0 | Use existing prompt |
| 6 | Produce TRC-Safety-Plan-EN.pdf | P0 | Use existing prompt, EN adaptation |
| 7 | Produce TRC-Trigger-Mapping-AR.pdf (canonical rename) | P0 | Use existing prompt |
| 8 | Produce TRC-Trigger-Mapping-EN.pdf | P0 | Use existing prompt, EN adaptation |
| 9 | Produce TRC-Safe-Place-Journal-EN.pdf | P1 | After P0 template established |
| 10 | Produce TRC-Body-Scan-Guide-EN.pdf | P1 | After P0 template established |
| 11 | Produce TRC-Regulation-Quick-Ref-EN.pdf | P1 | After P0 template established |
| 12 | Produce TRC-Trauma-Responses-Ref-EN.pdf | P1 | After P0 template established |
| 13 | Produce TRC-Thought-Reframing-EN.pdf | P1 | After P0 template established |
| 14 | Produce TRC-Shame-Recovery-EN.pdf | P1 | After P0 template established |
| 15 | Produce TRC-Trauma-Journal-Guide-EN.pdf | P2 | Higher-risk, more review needed |
| 16 | Produce TRC-EFT-Self-Help-EN.pdf | P2 | CLINICAL-REVIEW — needs specialist review |

**Note on AR files:** The 12 existing AR PDFs can be used as-is initially (with validation), but should eventually be renamed to canonical naming and re-validated for Printable Companion quality (writing spaces, safety notes, stop guidance, next step).

---

### INTEGRATION ACTION REQUIRED (What the agent must do after receiving files)

| # | Action | When |
|---|--------|------|
| 1 | Validate each submitted PDF (Identity + Content + Safety + Clinical) | On receipt of each file |
| 2 | Place file in /public/downloads/trc/ with canonical name | After validation PASS |
| 3 | Update TRC_ASSETS registry — add 5 missing assets with correct downloadables | Before downloads page rewrite |
| 4 | Update downloadables[].path to canonical filenames | After canonical files placed |
| 5 | Rewrite Downloads page to derive from registry (single source of truth) | After registry update |
| 6 | Add companion PDF section to each tool page | After files are placed and registered |
| 7 | Mark old trc-NN files as REPLACED (keep until references verified) | After canonical files verified |
| 8 | Resolve A52 clinical status inconsistency (registry vs journey) | During registry update |
| 9 | Update journey downloadables[] to canonical names | After registry update |
| 10 | Verify all UI links work end-to-end | After all integrations |
| 11 | Run orphan check on final state | After all integrations |
| 12 | Create P0 Integration Report | After P0 cycle completes |

---

### CLINICAL REVIEW REQUIRED (What needs a qualified specialist)

| # | Item | Type | Reason |
|---|------|------|--------|
| 1 | EFT Tapping (asset + PDF) | Asset Review | EFT is not APA/NICE recognized. Self-help framing is correct but requires clinical sign-off before LIVE. |
| 2 | A52 Breathing status | Status Resolution | Registry says clinical-review, journey says available. Needs qualified decision on final status. |
| 3 | Safe Place Visualization | Asset Review | Registry says clinical-review. If this is correct, PDF should show review indicator. |
3 | Body Scan | Asset Review | Registry says clinical-review. Same as above. |
| 5 | Grounding guide citation | Content Review | "Significantly reduce PTSD symptoms" claim needs citation or softening. |
| 6 | Any PDF with therapeutic claims | Content Review | Each PDF's safety notes and claims must be reviewed by qualified professional. |

---

## P0 Integration Report Template
# قالب تقرير دمج P0

(After P0 cycle completes, fill this report)

| Field | Grounding Card | A52 Card | Safety Plan | Trigger Mapping |
|-------|---------------|----------|-------------|-----------------|
| Source | | | | |
| Asset ID | | | | |
| AR PDF | | | | |
| EN PDF | | | | |
| File Naming | | | | |
| Registry | | | | |
| Download Mapping | | | | |
| Downloads Page | | | | |
| UI Link | | | | |
| Journey Link | | | | |
| Safety | | | | |
| Domain Isolation | | | | |
| Orphan Check | | | | |
| Production | | | | |

**P0 COMPLETE if and only if all cells = PASS**

---

## Final Rule
# القاعدة النهائية

The goal is NOT more pages for the sake of more pages.

The goal is closing the loop:

```
العلم (Science)
    ↓
المنهجية (Framework)
    ↓
الأصل العلاجي (Therapeutic Asset)
    ↓
الأداة الرقمية (Digital Tool)
    ↓
الورقة العملية (Printable Companion)
    ↓
رحلة المستخدم (User Journey)
    ↓
السلامة (Safety)
    ↓
الخطوة التالية (Next Step)
    ↓
الاستمرارية (Continuity)
```

When this loop is closed in TRC, the same architecture is replicated for Porn Recovery — with full content, methodology, and tool independence per domain.

**لا تبدأ Wave 3 حتى تتم مراجعة هذا التقرير وإعطاء إذن صريح.**

---

**DOCUMENT STATUS: AUTHORITATIVE**
**Wave GATE: BLOCKED**
**P0 STATUS: NOT STARTED**
**Next Step: External production of 8 P0 files (4 AR canonical + 4 EN)**
