# TRC External Production Handoff
# وثيقة تسليم الإنتاج الخارجي TRC

**Date:** 2026-08-12
**Audience:** External production agent / PDF generation service
**Goal:** Produce bilingual therapeutic practical materials for TRC

---

## What We Give You

### 1. Production Prompts
Location: `/docs/recovery/material-prompts/trc/`
Each prompt file contains:
- Asset Identity (ID, name, type, stage, related tool)
- Purpose and therapeutic rationale
- Target user and when to use
- Complete therapeutic structure (page-by-page)
- Safety requirements
- User interaction specification
- AR/EN requirements
- Quality control checklist

### 2. Master Prompt Template
Location: `/docs/recovery/material-prompts/trc/TRC-MATERIAL-PRODUCTION-MASTER-PROMPT.md`
Contains ALL rules that govern production. **You MUST read this first.**

### 3. Reference Documents
| Document | Path | Purpose |
|----------|------|---------|
| TRC Framework | `/docs/recovery/frameworks/trc-framework.md` | Clinical methodology, principles, contraindications |
| TRC Master Map | `/docs/recovery/frameworks/trc-master-map.md` | Asset inventory and positions |
| TRC Download Prompts | `/docs/recovery/trc/trc-download-prompts.md` | Existing prompt specs for 6 worksheets |
| TRC Worksheet Template | `/docs/recovery/trc/trc-worksheet-template.md` | Structural template and field types |
| TRC EFT Specification | `/docs/recovery/trc-eft-final-specification.md` | EFT-specific flow and safety |
| Production Inventory | `/docs/recovery/trc-material-production-inventory.md` | Complete material list |
| Production Manifest | `/docs/recovery/trc-material-production-manifest.md` | Production queue with priorities |

### 4. Existing PDFs (Reference Only)
Location: `/public/downloads/trc/`
12 Arabic PDFs exist. Use them as structural reference, NOT as content source.
The source documents above are the content authority.

---

## What You MUST NOT Change

1. **Safety information** — Trauma warnings, grounding reset, therapist referral
2. **Contraindications** — From TRC Framework Section هـ only
3. **Therapeutic structure** — The sequence defined in each prompt
4. **Source-aligned content** — If the source says X, you produce X, not your interpretation
5. **Clinical-review status** — EFT and Trauma Journal materials stay clinical-review
6. **Domain boundaries** — ZERO Porn Recovery content in TRC materials

---

## How to Deliver PDFs

### File Naming Convention
```
TRC-[ASSET]-[TYPE]-AR.pdf
TRC-[ASSET]-[TYPE]-EN.pdf
```

Examples:
```
TRC-GROUNDING-CARD-AR.pdf
TRC-GROUNDING-CARD-EN.pdf
TRC-TRIGGER-MAPPING-WORKSHEET-AR.pdf
TRC-TRIGGER-MAPPING-WORKSHEET-EN.pdf
TRC-EFT-TAPPING-WORKSHEET-AR.pdf
TRC-EFT-TAPPING-WORKSHEET-EN.pdf
```

### Delivery Format
- PDF, A4 (210 × 297 mm)
- Print-ready (300 DPI minimum)
- Tagged/accessible where possible
- File size: aim for 100-500 KB per file

### AR + EN Pair Requirements
Each material MUST be delivered as a pair:
- Same structure, same sections, same exercises
- Same therapeutic depth and practical value
- NOT just literal translation
- Arabic: formal clinical register, RTL
- English: clinical accessible register, LTR

---

## QA Process (12-Point Checklist)

Before delivering each PDF, verify:

1. ☐ Trauma warning present (except Parents Guide)
2. ☐ Safety instructions in therapeutic worksheets
3. ☐ Grounding reset (5-4-3-2-1) at end
4. ☐ Therapist referral + emergency numbers
5. ☐ No pre-filled user fields (all blank)
6. ☐ Examples clearly separated from user space
7. ☐ No gamification elements (no points/XP/badges)
8. ☐ No unsupported clinical claims
9. ☐ No Porn Recovery content
10. ☐ Bilingual equivalence (AR + EN same structure)
11. ☐ A4 format, correct typography
12. ☐ File naming follows TRC-[ASSET]-[TYPE]-AR/EN.pdf convention

---

## Integration Steps (After Delivery)

For each delivered PDF pair:

1. **Verify** file exists and is valid PDF
2. **Verify** AR version opens correctly
3. **Verify** EN version opens correctly
4. **Verify** content matches prompt specification
5. **Verify** source alignment (content from source, not invented)
6. **Verify** safety elements present and correct
7. **Verify** filename follows convention
8. **Verify** no cross-domain contamination
9. **Upload** to `/public/downloads/trc/`
10. **Update** trc-assets.ts registry (add downloadable entry)
11. **Update** recovery-journey.ts (add to step's downloadables array)
12. **Update** downloads page (add entry with 'built' status)
13. **Verify** download route works (curl test)
14. **Verify** UI link from journey/tool page works

---

## Priority Order

Produce materials in this order:

### Phase 1 — P0 EN Counterparts (Critical)
1. TRC-GROUNDING-CARD-EN.pdf
2. TRC-A52-BREATHING-CARD-EN.pdf
3. TRC-SAFETY-PLAN-EN.pdf
4. TRC-TRIGGER-MAPPING-WORKSHEET-EN.pdf

### Phase 2 — P1 EN Counterparts
5. TRC-BODY-AWARENESS-WORKSHEET-EN.pdf
6. TRC-SAFE-PLACE-GUIDE-EN.pdf
7. TRC-REGULATION-REFERENCE-EN.pdf
8. TRC-TRAUMA-RESPONSES-REFERENCE-EN.pdf
9. TRC-THOUGHT-REFRAMING-WORKSHEET-EN.pdf
10. TRC-SHAME-RECOVERY-WORKSHEET-EN.pdf
11. TRC-TRAUMA-JOURNAL-GUIDE-EN.pdf
12. TRC-EFT-TAPPING-WORKSHEET-EN.pdf

### Phase 3 — New P1 Materials (AR + EN)
13. TRC-BREATHING-GUIDE-AR.pdf + EN.pdf

### Phase 4 — P2 Materials (Later)
14-21. As needed during Wave 3

---

**Total files to produce: 30 PDFs (12 EN + 1 new AR + 17 P2 AR+EN)**
**Immediate priority: 13 files (4 P0 EN + 9 P1 EN + 1 new guide)**