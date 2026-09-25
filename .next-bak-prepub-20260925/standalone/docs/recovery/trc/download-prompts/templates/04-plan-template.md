# PLAN Template

> Companion type: `PLAN`
> Version: 1.0.0
> Pages: 2–4

---

## Content Boundary

- **Scope**: Action-oriented document with numbered steps, unchecked checkboxes, and contingency logic
- **Max word count**: 800 words (instructions + step descriptions)
- **Min word count**: 300 words
- **Writing fields**: Limited — action step details, notes, and review sections
- **All checkboxes start UNCHECKED** — user completes them

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1F6F78` | Step numbers, section headings, plan title |
| `--color-accent` | `#3DD4B0` | Checkbox borders (unchecked), progress indicators |
| `--color-warning` | `#E53E3E` | Emergency section header, crisis alerts |
| `--color-muted` | `#9CA3AF` | Dotted borders for writing fields, hints, captions |
| `--color-emergency-bg` | `#FFF5F5` | Light red background for emergency section |
| `--color-surface` | `#FFFFFF` | Page background |
| `--color-ink` | `#1A202C` | Body text |
| `--font-heading` | `Noto Sans Bold` | Headings, step labels |
| `--font-body` | `Noto Sans Regular` | Body, step descriptions |
| `--font-size-base` | `11pt` | Body |
| `--font-size-heading` | `14pt` | Section headings |
| `--font-size-step` | `16pt` | Step numbers |
| `--checkbox-size` | `16px` | Checkbox square |
| `--checkbox-border` | `2px solid #3DD4B0` | Unchecked state |
| `--border-field` | `2px dashed #9CA3AF` | Writing fields |
| `--border-radius` | `6px` | Card/section corners |
| `--spacing-unit` | `8px` | Grid spacing |

---

## Language Config

- `direction`: `ltr` (Arabic override: `rtl`)
- `honorifics`: collaborative, empowering (`You might choose to…`, `Consider starting with…`)
- `tense**: present imperative for actions (`Contact…`, `Schedule…`, `Write…`)
- `pronouns`: second-person (`you / your`)
- `conditional_language`: "If [situation], then [action]" — clear branching, no ambiguity
- `cultural_notes`: action steps should respect diverse support systems (family, community, faith, professional)

---

## Print Requirements

- **Size**: A4 (210 × 297 mm)
- **Margins**: 20 mm all sides
- **Resolution**: 300 DPI
- **Color mode**: CMYK primary, RGB fallback
- **Checkbox rendering**: Open square `☐`, 16×16 px, `--color-accent` border — NOT a filled or checked glyph
- **Page numbers**: bottom-center, `--color-muted`
- **Emergency section**: visually distinct (red-tinted background `#FFF5F5`, bold header)

---

## Safety Requirements

1. **Emergency section**: ALWAYS present — at top of page 1 or on a distinct prominently marked page
   - Must include: crisis hotline, emergency services number, closest emergency room (field for user to fill)
   - Background: `#FFF5F5`; border: `2px solid #E53E3E`
2. **Crisis contacts**: Repeated in footer on every page
3. **Review date field**: Empty date field at end of plan — "Review this plan by: ____/____/____" (dotted border)
4. **Contingency step**: At least one "If this step doesn't work…" alternative for every critical action
5. **No forced timeline** — language must allow flexible pacing ("When you're ready…" not "By day 3…")
6. **SUDS check-in**: Optional field before starting plan ("Current SUDS: ___")

---

## Forbidden Elements

- ❌ Pre-checked checkboxes
- ❌ Rigid timelines ("You must complete this in X days")
- ❌ Actions requiring internet access (unless explicitly flagged as digital-only)
- ❌ Shame language ("If you fail to…")
- ❌ Missing emergency section
- ❌ Blank plan with no pre-written scaffolding steps
- ❌ Closed-ended only steps (each step needs room for personalization)

---

## Output Contract

| Field | Type | Required |
|---|---|---|
| `type` | `"PLAN"` | ✅ |
| `title` | string ≤ 50 chars | ✅ |
| `subtitle` | string ≤ 80 chars | ⬜ |
| `emergency_section` | `{contacts[], er_field, border}` | ✅ |
| `steps` | array of `{number, action, checkbox: false, notes_field, contingency}` | ✅ |
| `steps[].contingency` | string ("If this doesn't work, …") | ✅ |
| `review_date_field` | empty field (dotted border) | ✅ |
| `suds_checkin` | empty field | ⬜ |
| `safety_contacts` | array of `{name, phone, hours}` | ✅ |
| `trigger_warning` | string or null | ⬜ |
| `language` | BCP-47 code | ✅ |
| `word_count` | integer 300–800 | ✅ |
| `page_count` | integer 2–4 | ✅ |

---

## Type-Specific Checklist

- [ ] Pages within 2–4 range
- [ ] Numbered action steps with UNCHECKED checkboxes (☐)
- [ ] Every critical step has a contingency ("If this doesn't work…")
- [ ] Emergency section present with crisis contacts and ER field
- [ ] Emergency section visually distinct (red-tinted background)
- [ ] Review date field at end of plan (empty, dotted border)
- [ ] Crisis contacts in footer on every page
- [ ] No rigid timelines or forced pacing
- [ ] No shame language
- [ ] Each step has room for personalization (notes field)
- [ ] Optional SUDS check-in present
- [ ] Readability ≤ Grade 6
- [ ] Print-ready A4, 300 DPI
