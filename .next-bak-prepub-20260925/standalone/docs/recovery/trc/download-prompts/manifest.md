# TRC Master Download Prompt Pack — FINAL

## Version
- Version: 3.0 (Master Rebuild)
- Date: 2026-08-15
- Status: MASTER — READY FOR PRODUCTION

## Companion Types (7)
1. PRINTABLE_CARD — 1-2 pages, no writing fields, informational pocket reference
2. WORKSHEET — 2-4 pages, empty writing fields with dotted borders, interactive
3. GUIDE — 3-8 pages, informational/psychoeducation, optional TOC
4. PLAN — 2-4 pages, structured plan with action steps, empty fields
5. JOURNAL — 4-8 pages, repeated entry templates, reflective writing fields
6. REFERENCE — 2-4 pages, quick reference card, tables/lists
7. COMPANION — 2-4 pages, general companion, mixed content

## Design System (Reference: Grounding Printable)
- Primary: #1F6F78
- Accent: #3DD4B0
- Dark: #0F1C2E
- Background: #F8FAFC
- Line border: #CBD5E1
- Alert bg: #FFFBEB | Alert border: #D97706 | Alert text: #92400E
- Safety bg: #FEF3C7 | Safety border: #B45309 | Safety text: #78350F
- Teal bg: #E6F4F5 | Teal text: #1F6F78
- Writing field border: dotted #9CA3AF
- Footer text: #475569 at 9px
- AR Font: 'Noto Sans Arabic', sans-serif
- EN Font: 'Inter', sans-serif
- Page: A4 portrait (210mm × 297mm), padding: 15mm

## Naming Convention
- HTML output: TRC-{AssetName}-{LANG}.html
- Asset IDs: kebab-case (a52, body-scan, safe-place, etc.)
- Filenames must match between Prompt, Registry, and Download system

## Status Lifecycle
planned → in-production → clinical-review → ready → built

## Production Rules
1. Output: Single complete HTML file
2. No Markdown fences, no explanation outside HTML
3. No external dependencies, no JavaScript (unless absolutely necessary)
4. No pre-filled user data, no gamification
5. All writing fields MUST be empty
6. Examples go in separate "Example / مثال" section
7. A4 printable, valid in browser, valid for Print/Save-as-PDF
8. Safety section mandatory on every file
9. Clinical Review Gate: Prompt can produce Draft, but file cannot be declared BUILT without passing clinical review

## Asset Registry (13 assets)

| # | Asset ID | Label EN | Label AR | Companion Type | Parent Tool | Stage | Status | Clinical Gate | Page Count | Filename AR | Filename EN |
|---|----------|----------|----------|----------------|-------------|-------|--------|---------------|------------|-------------|-------------|
| 1 | grounding-54321 | 5-4-3-2-1 Grounding | التأريض 5-4-3-2-1 | PRINTABLE_CARD | grounding-54321 | safety | built | PASSED | 2 | TRC-Grounding-54321-AR.html | TRC-Grounding-54321-EN.html |
| 2 | a52 | A52 Breathing (5-2) | تنفس A52 (5-2) | PRINTABLE_CARD | a52 | safety | clinical-review | REQUIRED | 2 | TRC-A52-Breathing-AR.html | TRC-A52-Breathing-EN.html |
| 3 | safe-place | Safe Place Visualization | تصور المكان الآمن | WORKSHEET | safe-place | safety | clinical-review | REQUIRED | 3 | TRC-Safe-Place-AR.html | TRC-Safe-Place-EN.html |
| 4 | body-scan | Body Scan | مسح الجسد | WORKSHEET | body-scan | safety | clinical-review | REQUIRED | 3 | TRC-Body-Scan-AR.html | TRC-Body-Scan-EN.html |
| 5 | trigger-mapping | Trigger Mapping | رسم خريطة المحفزات | WORKSHEET | trigger-mapping | regulation | planned | REQUIRED | 3 | TRC-Trigger-Mapping-AR.html | TRC-Trigger-Mapping-EN.html |
| 6 | safety-plan | Safety Plan | خطة السلامة | PLAN | safety-plan | safety | planned | REQUIRED | 3 | TRC-Safety-Plan-AR.html | TRC-Safety-Plan-EN.html |
| 7 | what-trauma-does | What Trauma Does to the Body | ماذا تفعل الصدمة بالجسد | GUIDE | what-trauma-does-to-the-body | safety | clinical-review | REQUIRED | 6 | TRC-What-Trauma-Does-AR.html | TRC-What-Trauma-Does-EN.html |
| 8 | trauma-responses | Trauma Response Patterns | أنماط الاستجابة للصدمة | REFERENCE | trauma-responses | regulation | planned | REQUIRED | 3 | TRC-Trauma-Responses-AR.html | TRC-Trauma-Responses-EN.html |
| 9 | eft-tapping | EFT Tapping | النقر العصبي EFT | WORKSHEET | eft-tapping | regulation | clinical-review | REQUIRED | 4 | TRC-EFT-Tapping-AR.html | TRC-EFT-Tapping-EN.html |
| 10 | thought-reframing | Thought Reframing | إعادة صياغة الأفكار | WORKSHEET | thought-reframing | regulation | clinical-review | REQUIRED | 4 | TRC-Thought-Reframing-AR.html | TRC-Thought-Reframing-EN.html |
| 11 | shame-recovery | Shame Recovery | التعافي من العار | WORKSHEET | shame-recovery | regulation | clinical-review | REQUIRED | 4 | TRC-Shame-Recovery-AR.html | TRC-Shame-Recovery-EN.html |
| 12 | trauma-journal | Trauma Journal | يوميات التعافي | JOURNAL | trauma-journal | recovery | clinical-review | REQUIRED | 6 | TRC-Trauma-Journal-AR.html | TRC-Trauma-Journal-EN.html |
| 13 | regulation-quick-reference | Regulation Quick Reference | مرجع التنظيم السريع | REFERENCE | regulation-toolkit | regulation | planned | REQUIRED | 2 | TRC-Regulation-Quick-Ref-AR.html | TRC-Regulation-Quick-Ref-EN.html |

## Therapeutic Paths
- SAFETY PATH: grounding-54321 → a52 → safe-place → body-scan
- REGULATION PATH: trigger-mapping → safety-plan
- RECOVERY PATH: eft-tapping → thought-reframing → shame-recovery → trauma-journal

## Reference Implementation
- Asset: grounding-54321
- Component: GroundingPrintableCompanion.tsx
- Route: /recovery/trc/grounding/printable
- i18n namespace: recoveryAssets.trcGroundingPrintable
- Use this as quality standard for all other downloadables

## File Structure
```
docs/recovery/trc/download-prompts/
  manifest.md
  asset-specs/
    grounding-54321.md, a52.md, safe-place.md, body-scan.md, trigger-mapping.md, safety-plan.md, what-trauma-does.md, trauma-responses.md, eft-tapping.md, thought-reframing.md, shame-recovery.md, trauma-journal.md, regulation-quick-reference.md
  prompts/
    ar/ (13 files)
    en/ (13 files)
  templates/
    01-printable-card.md, 02-worksheet.md, 03-guide.md, 04-plan.md, 05-journal.md, 06-reference.md, 07-companion.md
  integration/
    integration-contract.md, validation-checklist.md
```
