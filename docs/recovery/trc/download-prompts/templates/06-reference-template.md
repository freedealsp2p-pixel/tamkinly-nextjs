# REFERENCE Template

> Companion type: `REFERENCE`
> Version: 1.0.0
> Pages: 2–4

---

## Content Boundary

- **Scope**: Quick-lookup resource — tables, decision flowcharts, tool comparisons, escalation pathways
- **Max word count**: 1200 words (all content including table text)
- **Min word count**: 300 words
- **Writing fields**: None or minimal (1 "notes" field at end, optional)
- **Primary content**: Structured data presented as tables, flowcharts, or comparison grids

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1F6F78` | Table headers, flowchart nodes, section headings |
| `--color-accent` | `#3DD4B0` | Positive/yes paths in flowcharts, recommended items in comparisons |
| `--color-warning` | `#E53E3E` | Negative/no paths in flowcharts, escalation indicators |
| `--color-muted` | `#9CA3AF` | Table grid lines, footnote text, captions |
| `--color-table-header-bg` | `#E6FFFA` | Light teal for table header rows |
| `--color-table-alt-bg` | `#F7FAFC` | Alternating row background |
| `--color-surface` | `#FFFFFF` | Page background |
| `--color-ink` | `#1A202C` | Body text |
| `--font-heading` | `Noto Sans Bold` | Headings |
| `--font-body` | `Noto Sans Regular` | Body, table content |
| `--font-mono` | `Noto Sans Mono` | Decision nodes, code-like labels |
| `--font-size-base` | `10pt` | Body (slightly smaller for density) |
| `--font-size-heading` | `14pt` | Section headings |
| `--font-size-table` | `9pt` | Table cell text (compact) |
| `--border-table` | `1px solid #9CA3AF` | Table borders |
| `--border-radius` | `4px` | Table/flowchart corners |
| `--spacing-unit` | `6px` | Grid spacing (tighter for density) |

---

## Language Config

- `direction`: `ltr` (Arabic override: `rtl`)
- `honorifics**: concise, clinical (`Indicates…`, `Proceed to…`, `Escalate if…`)
- `tense**: present indicative (`This tool is used for…`, `If SUDS ≥ 7, escalate to…`)
- `pronouns**: impersonal or second-person (`the user`, `you`)
- `terminology**: consistent throughout — define abbreviation on first use
- `cultural_notes**: ensure escalation pathways account for varying access to professional care

---

## Print Requirements

- **Size**: A4 (210 × 297 mm)
- **Margins**: 15 mm all sides (tighter margins to maximize table/flowchart space)
- **Resolution**: 300 DPI
- **Color mode**: CMYK primary, RGB fallback
- **Tables**: Full grid borders, header row shaded `#E6FFFA`, alternating rows `#F7FAFC`
- **Flowcharts**: Rendered as SVG — clear node shapes (rectangles for actions, diamonds for decisions), labeled arrows
- **Page numbers**: bottom-center, `--color-muted`
- **Landscape consideration**: If a table requires > 4 columns, consider landscape orientation for that page

---

## Safety Requirements

1. **Escalation pathway**: A decision flowchart or table showing when to move from self-help → guided help → professional help → emergency services
2. **Crisis contacts**: Prominently displayed — ideally as a standalone box, not just footer
3. **Clear thresholds**: All decision points must use specific, measurable criteria ("SUDS ≥ 7", "symptoms persist > 2 weeks") — never vague ("if things get bad")
4. **Disclaimer**: "This reference is for informational guidance and does not replace clinical assessment."
5. **No diagnostic authority**: Reference does not diagnose — it guides toward appropriate help-seeking

---

## Forbidden Elements

- ❌ Long-form prose paragraphs (> 3 sentences in a row)
- ❌ Writing/journaling fields (except 1 optional notes field)
- ❌ Ambiguous decision criteria ("if you feel worse")
- ❌ Outdated contact information (must be verified within 30 days of publication)
- ❌ Promotional content for specific providers or products
- ❌ Complex nested flowcharts (> 3 decision levels deep without a sub-chart)

---

## Output Contract

| Field | Type | Required |
|---|---|---|
| `type` | `"REFERENCE"` | ✅ |
| `title` | string ≤ 50 chars | ✅ |
| `subtitle` | string ≤ 80 chars | ⬜ |
| `disclaimer` | string (standard text) | ✅ |
| `tables` | array of `{caption, headers[], rows[][]}` | ✅ |
| `flowcharts` | array of `{id, title, nodes[], edges[]}` | ⬜ |
| `comparisons` | array of `{caption, criteria[], items[]}` | ⬜ |
| `escalation_pathway` | flowchart or table | ✅ |
| `safety_contacts` | array of `{name, phone, hours}` | ✅ |
| `notes_field` | empty field (dotted border) | ⬜ |
| `language` | BCP-47 code | ✅ |
| `word_count` | integer 300–1200 | ✅ |
| `page_count` | integer 2–4 | ✅ |

---

## Type-Specific Checklist

- [ ] Pages within 2–4 range
- [ ] Primary content is structured (tables, flowcharts, or comparison grids)
- [ ] No long-form prose paragraphs
- [ ] Escalation pathway present with clear, measurable thresholds
- [ ] Decision flowcharts use specific criteria (not vague)
- [ ] Flowcharts ≤ 3 decision levels deep (or use sub-charts)
- [ ] Crisis contacts prominently displayed (standalone box)
- [ ] Disclaimer present
- [ ] Table headers shaded `#E6FFFA`, alternating rows `#F7FAFC`
- [ ] All abbreviations defined on first use
- [ ] No promotional content
- [ ] No or minimal writing fields (≤ 1 optional notes)
- [ ] Print-ready A4, 300 DPI, tighter margins (15 mm)
- [ ] Contact information verified within 30 days
