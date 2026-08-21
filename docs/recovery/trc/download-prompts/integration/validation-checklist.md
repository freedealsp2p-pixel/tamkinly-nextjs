# Pre-Production Validation Checklist: TRC Download-Prompt Assets

> **Purpose** — Complete checklist to validate a TRC download-prompt HTML asset before it is
> cleared for the re-integration process. Every item must pass. A single failure means the
> asset is **not** ready for production.

---

## 1. Language & Typography

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 1.1 | Language attribute | `lang` attribute on `<html>` matches intended locale (`en` or `ar`) | ☐ |
| 1.2 | Direction attribute | `dir` attribute is `ltr` for English, `rtl` for Arabic | ☐ |
| 1.3 | Font family (English) | Uses **Inter** font family for English content | ☐ |
| 1.4 | Font family (Arabic) | Uses **Noto Sans Arabic** font family for Arabic content | ☐ |
| 1.5 | Font loading | Fonts are embedded or loaded from a trusted source; no broken font fallbacks | ☐ |

---

## 2. Print Layout

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 2.1 | A4 page size | `@media print` sets `size: A4` (210mm × 297mm) | ☐ |
| 2.2 | Print margins | Margins are appropriate for A4 (recommended: 15–20mm) | ☐ |
| 2.3 | Print CSS exists | `@media print` block is present with print-specific rules | ☐ |
| 2.4 | `.no-print` class | Elements with `.no-print` class are hidden via `display: none` in `@media print` | ☐ |
| 2.5 | Color preservation | Print-specific CSS includes `-webkit-print-color-adjust: exact` (or equivalent) | ☐ |
| 2.6 | No orphaned content | Content does not break mid-section across pages unintentionally | ☐ |
| 2.7 | Page break control | `page-break-inside: avoid` used on discrete content blocks | ☐ |

---

## 3. Content Integrity

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 3.1 | Writing fields empty | All `<textarea>`, `<input>`, and contenteditable elements are empty (no pre-filled data) | ☐ |
| 3.2 | No pre-filled data | No sample responses, user names, dates, or personal data pre-populated | ☐ |
| 3.3 | No gamification | No points, badges, scores, progress bars, or game-like elements present | ☐ |
| 3.4 | No placeholder artifacts | No `{{...}}`, `TBD`, `FIXME`, `TODO`, or `PLACEHOLDER` text remains | ☐ |
| 3.5 | All sections complete | Every section defined in the spec is present and populated | ☐ |

---

## 4. Technical Purity

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 4.1 | No JavaScript | Document contains zero `<script>` tags or inline event handlers (`onclick`, etc.) | ☐ |
| 4.2 | No external dependencies | No references to external CDNs, APIs, or third-party resources | ☐ |
| 4.3 | Self-contained CSS | All styles are inline (`<style>`) or embedded; no external stylesheet links | ☐ |
| 4.4 | No network requests | Asset functions completely offline; no `fetch()`, `XMLHttpRequest`, or resource loading | ☐ |

---

## 5. Safety & Compliance

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 5.1 | Safety section present | Document includes a dedicated safety section (`.safety` or `#safety`) | ☐ |
| 5.2 | Safety content complete | Safety section contains appropriate warnings and guidance for the tool type | ☐ |
| 5.3 | Emergency contacts | Emergency contact information is present (crisis helpline, emergency number) | ☐ |
| 5.4 | Footer with Tool ID | Footer contains the Tool ID for traceability | ☐ |
| 5.5 | Footer with version | Footer includes asset version or revision identifier | ☐ |
| 5.6 | Clinical Review Gate | Clinical review gate has been acknowledged (reviewer name and date recorded) | ☐ |
| 5.7 | Disclaimer present | Appropriate clinical/therapeutic disclaimer is included | ☐ |

---

## 6. Functional Testing

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 6.1 | Opens in browser | File opens correctly in Chrome, Firefox, and Safari | ☐ |
| 6.2 | Prints correctly | Print preview renders as expected on A4 with no layout breaks | ☐ |
| 6.3 | Interactive fields work | Text areas and inputs accept input when displayed on screen | ☐ |
| 6.4 | No console errors | Browser console shows no errors or warnings when opening the file | ☐ |
| 6.5 | Renders offline | File renders correctly with no internet connection | ☐ |

---

## 7. Naming & Identity

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 7.1 | Filename convention | Filename matches: `{tool-slug}-{companion-suffix}-{locale}.html` | ☐ |
| 7.2 | Asset ID matches spec | Asset ID in the file matches the specification document | ☐ |
| 7.3 | Parent Tool matches registry | Parent Tool identifier matches an entry in `trc-assets.ts` | ☐ |
| 7.4 | Companion Type matches spec | Companion Type matches the specification (PRINTABLE_CARD, WORKSHEET, GUIDE, PLAN, JOURNAL, REFERENCE, COMPANION) | ☐ |
| 7.5 | Version in filename | Version or revision is consistent between filename, content, and manifest | ☐ |

---

## 8. Page Count

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 8.1 | Page count within range | Printed page count falls within the expected range for the companion type | ☐ |
| 8.2 | No blank trailing pages | No unnecessary blank pages at the end of the print output | ☐ |

---

## 9. Cross-Locale Consistency

| # | Check | Criteria | Pass? |
|---|-------|----------|-------|
| 9.1 | No Arabic on EN | English file contains no Arabic script characters (except known terms if any) | ☐ |
| 9.2 | No English on AR | Arabic file contains no English script characters (except known clinical terms, proper nouns, and brand names) | ☐ |
| 9.3 | Known terms documented | Any permitted cross-language terms are documented and justified | ☐ |
| 9.4 | AR structure = EN structure | Arabic file has **functional equivalence** with English file (same sections, same fields, same elements) | ☐ |
| 9.5 | Section order matches | Sections appear in the same logical order in both locales | ☐ |
| 9.6 | Field count matches | Both locales have the same number of interactive fields | ☐ |
| 9.7 | Safety sections equivalent | Safety content in AR is a complete translation of EN (no omissions) | ☐ |

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Content Validator | | | |
| Technical Validator | | | |
| Clinical Reviewer | | | |
| Release Approver | | | |

---

## Pass Criteria

- **ALL** checkbox items must be marked as passed (☑)
- **ALL** sign-off roles must be completed
- A single failure on any item blocks the asset from entering the re-integration process
- Failed items must be remediated and the entire checklist re-run

## Result

- [ ] **APPROVED** — All checks passed; asset is cleared for re-integration
- [ ] **BLOCKED** — One or more checks failed; remediation required
