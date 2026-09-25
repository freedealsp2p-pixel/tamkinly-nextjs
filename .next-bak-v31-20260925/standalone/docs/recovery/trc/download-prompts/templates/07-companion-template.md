# COMPANION Template

> Companion type: `COMPANION`
> Version: 1.0.0
> Pages: 2–4

---

## Content Boundary

- **Scope**: Mixed-content document combining informational, interactive, and reflective elements
- **Max word count**: 1500 words (all content)
- **Min word count**: 400 words
- **Writing fields**: Selective — only where interaction adds clear therapeutic value
- **Structure**: Flexible — content sections can be arranged in any order that serves the user's journey
- **This is the "swiss army knife" type** — use only when a single pure type (CARD, WORKSHEET, GUIDE, PLAN, JOURNAL, REFERENCE) does not fit

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1F6F78` | Headings, primary content markers |
| `--color-accent` | `#3DD4B0` | Interactive elements, accents, progress indicators |
| `--color-warning` | `#E53E3E` | Safety alerts, emergency sections |
| `--color-muted` | `#9CA3AF` | Dotted borders, captions, secondary text |
| `--color-info-bg` | `#EBF8FF` | Informational section background |
| `--color-reflect-bg` | `#FFFFF0` | Warm background for reflection sections |
| `--color-action-bg` | `#F0FFF4` | Green background for action sections |
| `--color-surface` | `#FFFFFF` | Page background |
| `--color-ink` | `#1A202C` | Body text |
| `--font-heading` | `Noto Sans Bold` | Headings |
| `--font-body` | `Noto Sans Regular` | Body text |
| `--font-handwrite` | `Caveat` or `Kalam` | Placeholder text in writing fields |
| `--font-size-base` | `11pt` | Body |
| `--font-size-heading` | `14pt` | Section headings |
| `--border-field` | `2px dashed #9CA3AF` | Writing fields |
| `--border-section` | `1px solid #E2E8F0` | Section dividers |
| `--border-radius` | `6px` | Section corners |
| `--spacing-unit` | `8px` | Grid spacing |

---

## Language Config

- `direction`: `ltr` (Arabic override: `rtl`)
- `honorifics`: Adapts per section — informational sections use professional tone; reflective sections use warm tone; action sections use empowering tone
- `tense`: Matches section type — facts: present indicative; prompts: present imperative; actions: present imperative
- `pronouns**: second-person (`you / your`)
- `section_labels`: Each section must be clearly labeled with its type: `[INFO]`, `[REFLECT]`, `[ACT]`, `[REFERENCE]`
- `cultural_notes`: Each section inherits cultural sensitivity rules from its corresponding pure type

---

## Print Requirements

- **Size**: A4 (210 × 297 mm)
- **Margins**: 20 mm all sides
- **Resolution**: 300 DPI
- **Color mode**: CMYK primary, RGB fallback
- **Section dividers**: Thin line `1px solid #E2E8F0` between sections of different types
- **Section type labels**: Colored pill/badge at top of each section — `[INFO]` blue, `[REFLECT]` warm yellow, `[ACT]` green, `[REFERENCE]` teal
- **Page numbers**: bottom-center, `--color-muted`
- **Writing fields** (where present): Ruled lines `#E2E8F0`, 8 mm spacing, dotted border

---

## Safety Requirements

1. **Crisis contacts**: Footer on every page
2. **SUDS fields**: If any reflective/action section exists, include SUDS before/after for that section
3. **Trigger warning**: On first page if any section addresses trauma
4. **Disclaimer**: "This companion resource combines information and interactive elements. It does not replace professional therapeutic support."
5. **Section-specific safety**: Each section must comply with the safety rules of its corresponding pure type
   - `[INFO]` sections → GUIDE safety rules (citations, no claims)
   - `[REFLECT]` sections → JOURNAL safety rules (containment, no leading prompts)
   - `[ACT]` sections → PLAN safety rules (contingency, no forced timelines)
   - `[REFERENCE]` sections → REFERENCE safety rules (clear thresholds, escalation)

---

## Forbidden Elements

- ❌ Sections without a type label (`[INFO]`, `[REFLECT]`, `[ACT]`, `[REFERENCE]`)
- ❌ Writing fields in `[INFO]` or `[REFERENCE]` sections
- ❌ Long-form prose in `[ACT]` sections (keep actions concise)
- ❌ Unlabeled mixed content (every paragraph must belong to a typed section)
- ❌ More than 4 section types in a single companion (keep focused)
- ❌ Therapeutic claims in any section
- ❌ Missing disclaimer or crisis contacts

---

## Output Contract

| Field | Type | Required |
|---|---|---|
| `type` | `"COMPANION"` | ✅ |
| `title` | string ≤ 50 chars | ✅ |
| `subtitle` | string ≤ 80 chars | ⬜ |
| `disclaimer` | string (standard text) | ✅ |
| `sections` | array of `{type, label, content, fields[]?}` | ✅ |
| `sections[].type` | `"info" \| "reflect" \| "act" \| "reference"` | ✅ |
| `sections[].label` | `"[INFO]" \| "[REFLECT]" \| "[ACT]" \| "[REFERENCE]"` | ✅ |
| `sections[].content` | Markdown | ✅ |
| `sections[].fields` | array (only for reflect/act) | ⬜ |
| `suds_fields` | array (paired with reflect/act sections) | ⬜ |
| `safety_contacts` | array of `{name, phone, hours}` | ✅ |
| `trigger_warning` | string or null | ⬜ |
| `language` | BCP-47 code | ✅ |
| `word_count` | integer 400–1500 | ✅ |
| `page_count` | integer 2–4 | ✅ |

---

## Type-Specific Checklist

- [ ] Pages within 2–4 range
- [ ] Every section has a type label (`[INFO]`, `[REFLECT]`, `[ACT]`, `[REFERENCE]`)
- [ ] No more than 4 distinct section types used
- [ ] Section dividers between different section types
- [ ] Writing fields ONLY in `[REFLECT]` and `[ACT]` sections
- [ ] SUDS before/after for any reflect/act section
- [ ] Each section complies with its corresponding pure-type safety rules
- [ ] Disclaimer present
- [ ] Crisis contacts in every page footer
- [ ] No unlabeled paragraphs (every content block belongs to a section)
- [ ] No therapeutic claims
- [ ] Trigger warning if trauma content in any section
- [ ] Flexible section ordering documented (recommended order noted)
- [ ] Readability ≤ Grade 7
- [ ] Print-ready A4, 300 DPI
