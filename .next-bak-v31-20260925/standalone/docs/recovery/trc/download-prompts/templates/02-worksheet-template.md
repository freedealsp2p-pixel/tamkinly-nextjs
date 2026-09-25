# WORKSHEET Template

> Companion type: `WORKSHEET`
> Version: 1.0.0
> Pages: 2–4

---

## Content Boundary

- **Scope**: Guided exercise with step-by-step instructions and writable response fields
- **Max word count (instructional)**: 600 words (directions, prompts, examples)
- **Max word count (example content)**: 150 words (in dedicated Examples section)
- **Min word count (instructional)**: 200 words
- **Response fields**: ALL fields are EMPTY with dotted border (`#9CA3AF`) for user writing
- **No pre-filled answers** — every writable field starts blank

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1F6F78` | Step numbers, section headings, instructions |
| `--color-accent` | `#3DD4B0` | Checkmark bullets, progress markers, example borders |
| `--color-warning` | `#E53E3E` | Safety alerts |
| `--color-muted` | `#9CA3AF` | Dotted field borders, placeholder hint text |
| `--color-example-bg` | `#F0FFF4` | Light green background for Examples section |
| `--color-surface` | `#FFFFFF` | Page background |
| `--color-ink` | `#1A202C` | Body text |
| `--font-heading` | `Noto Sans Bold` | Headings, step labels |
| `--font-body` | `Noto Sans Regular` | Instructions, body |
| `--font-handwrite` | `Caveat` or `Kalam` | Placeholder text inside response fields |
| `--font-size-base` | `11pt` | Body |
| `--font-size-heading` | `14pt` | Section headings |
| `--font-size-step` | `18pt` | Step number circles |
| `--border-field` | `2px dashed #9CA3AF` | All writable response fields |
| `--border-radius` | `6px` | Field corners |
| `--spacing-unit` | `8px` | Grid spacing |

---

## Language Config

- `direction`: `ltr` (Arabic override: `rtl`)
- `honorifics`: warm, encouraging (`You might notice…`, `Take your time…`)
- `tense`: present imperative for instructions (`Write…`, `Circle…`, `Notice…`)
- `pronouns`: second-person (`you / your`)
- `prompt_style`: Open-ended questions as writing prompts — no yes/no only fields
- `cultural_notes`: examples should reflect diverse contexts; avoid assumptions about family structure

---

## Print Requirements

- **Size**: A4 (210 × 297 mm)
- **Margins**: 20 mm all sides (extra left margin 25 mm if binding expected)
- **Resolution**: 300 DPI
- **Color mode**: CMYK primary, RGB fallback
- **Fields must have sufficient writing space**: minimum 3 ruled lines per short response; 6+ lines for reflection; full half-page for extended responses
- **Ruled lines**: `#E2E8F0`, 8 mm spacing, within dotted field border
- **Page numbers**: bottom-center, `--color-muted`

---

## Safety Requirements

1. **SUDS check-in field** before the exercise begins (dotted border, labeled "Before starting — SUDS 0–10")
2. **SUDS check-out field** after the exercise ends (dotted border, labeled "After completing — SUDS 0–10")
3. **Crisis contacts** on every page footer (small text, `--color-muted`)
4. **Pacing prompt** after every 2–3 steps: "Pause here if needed. You can return to this step later."
5. **No forced completion language** — avoid "you must finish all steps"
6. **Trigger warning** at top of page if exercise involves trauma recall

---

## Forbidden Elements

- ❌ Pre-filled or example text inside response fields
- ❌ Closed-ended (yes/no only) fields without space for elaboration
- ❌ Rating scales without open reflection companion field
- ❌ Timed or speed-based exercises
- ❌ Shame-inducing language ("you should already know…")
- ❌ Links requiring internet access (offline-first)
- ❌ Interactive/digital-only elements

---

## Output Contract

| Field | Type | Required |
|---|---|---|
| `type` | `"WORKSHEET"` | ✅ |
| `title` | string ≤ 50 chars | ✅ |
| `subtitle` | string ≤ 80 chars | ⬜ |
| `steps` | array of `{number, instruction, fields[]}` | ✅ |
| `fields[].id` | string (unique) | ✅ |
| `fields[].label` | string | ✅ |
| `fields[].type` | `"short_text" \| "long_text" \| "checklist" \| "rating" \| "reflection"` | ✅ |
| `fields[].value` | `""` (always empty) | ✅ |
| `fields[].border` | `"2px dashed #9CA3AF"` | ✅ |
| `fields[].lines` | integer (3–12) | ✅ |
| `examples_section` | Markdown (separate, green bg) | ✅ |
| `suds_before` | empty field | ✅ |
| `suds_after` | empty field | ✅ |
| `safety_contacts` | array of `{name, phone, hours}` | ✅ |
| `trigger_warning` | string or null | ⬜ |
| `pacing_prompts` | boolean (default `true`) | ✅ |
| `language` | BCP-47 code | ✅ |
| `word_count_instructional` | integer 200–600 | ✅ |

---

## Type-Specific Checklist

- [ ] Pages within 2–4 range
- [ ] All response fields are EMPTY with dotted border `#9CA3AF`
- [ ] No pre-filled answers anywhere
- [ ] Step-by-step structure with numbered steps
- [ ] Reflection field after each major step or section
- [ ] Examples in a SEPARATE section (green background `#F0FFF4`, distinct border)
- [ ] SUDS before/after fields present
- [ ] Pacing prompts every 2–3 steps
- [ ] Crisis contacts in every page footer
- [ ] Each writing field has sufficient ruled lines (3+ short, 6+ reflection)
- [ ] Trigger warning present if trauma content
- [ ] No forced-completion or shame language
- [ ] Readability ≤ Grade 7 for instructions
- [ ] Print-ready A4, 300 DPI
