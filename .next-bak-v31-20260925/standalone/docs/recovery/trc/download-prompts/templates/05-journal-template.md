# JOURNAL Template

> Companion type: `JOURNAL`
> Version: 1.0.0
> Pages: 4–8

---

## Content Boundary

- **Scope**: Repeated entry templates for ongoing reflective writing with progressive exposure safety
- **Max word count (instructional)**: 400 words (brief instructions, prompt text)
- **Min word count (instructional)**: 100 words
- **Writing fields**: Extensive — this is primarily a writing document
- **Entry template**: Repeated structure (date / prompt / reflection / SUDS) appearing multiple times
- **Entries per page**: 1 (single entry per page to allow maximum writing space)

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1F6F78` | Section headings, entry numbers, ritual headers |
| `--color-accent` | `#3DD4B0` | Date field labels, SUDS scale markers, decorative borders |
| `--color-warning` | `#E53E3E` | Safety alerts, exposure-level indicators |
| `--color-muted` | `#9CA3AF` | Dotted field borders, placeholder text, ruled lines |
| `--color-ritual-bg` | `#F7FAFC` | Light background for opening/closing ritual sections |
| `--color-surface` | `#FFFFFF` | Page background |
| `--color-ink` | `#1A202C` | Body text |
| `--font-heading` | `Noto Sans Bold` | Headings |
| `--font-body` | `Noto Sans Regular` | Instructions, prompts |
| `--font-handwrite` | `Caveat` or `Kalam` | Placeholder hint text in writing fields |
| `--font-size-base` | `11pt` | Body |
| `--font-size-heading` | `14pt` | Section headings |
| `--font-size-prompt` | `12pt` | Journal prompts (slightly larger for emphasis) |
| `--border-field` | `2px dashed #9CA3AF` | All writing fields |
| `--border-entry` | `1px solid #E2E8F0` | Entry container border |
| `--border-radius` | `6px` | Section corners |
| `--spacing-unit` | `8px` | Grid spacing |
| `--ruled-line-color` | `#E2E8F0` | Writing lines within fields |
| `--ruled-line-spacing` | `8mm` | Line height for handwriting |

---

## Language Config

- `direction`: `ltr` (Arabic override: `rtl`)
- `honorifics`: warm, validating (`There are no wrong answers…`, `Write as much or as little as feels right…`)
- `tense`: present for prompts (`What do you notice…?`, `How does this feel…?`)
- `pronouns`: second-person (`you / your`)
- `prompt_style`: Open, exploratory questions — never leading or prescriptive
- `cultural_notes`: prompts should avoid assumptions about family, relationships, spirituality

---

## Print Requirements

- **Size**: A4 (210 × 297 mm)
- **Margins**: 20 mm all sides; left margin 25 mm for binding
- **Resolution**: 300 DPI
- **Color mode**: CMYK primary, RGB fallback
- **Ruled lines** in all writing fields: `#E2E8F0`, 8 mm spacing
- **One entry per page** — generous writing space is the priority
- **Binding margin**: left side, extra 5 mm gutter
- **Page numbers**: bottom-center, `--color-muted`

---

## Safety Requirements

1. **Opening ritual**: First page includes a brief grounding/centering instruction before first entry
2. **Closing ritual**: Last page includes a brief closing/containment exercise (e.g., "Place your hand on your chest. Notice your breathing. You are safe now.")
3. **Each entry includes**:
   - **Date field**: empty, dotted border (format: ____/____/____)
   - **SUDS before**: empty field, dotted border (0–10 scale)
   - **Prompt**: Pre-written reflective question
   - **Reflection field**: Large writing area, ruled lines, dotted border
   - **SUDS after**: empty field, dotted border (0–10 scale)
4. **Progressive exposure safety**:
   - Entries are ordered from lower to higher emotional intensity
   - Each entry has a **safety note**: "If this prompt feels too intense, skip it and return when ready."
   - A **containment prompt** appears after every 2 entries: "Pause. Notice your feet on the ground. What do you hear right now?"
5. **Weekly review template**: 1 page dedicated to weekly reflection (what I noticed, patterns, what I'd like to explore)
6. **Crisis contacts**: Footer on every page (small, `--color-muted`)
7. **Trigger warning**: On first page if journal addresses trauma themes

---

## Forbidden Elements

- ❌ Pre-filled reflection content
- ❌ Leading prompts ("You probably feel angry about…")
- ❌ Timed writing exercises
- ❌ Forced completion ("You must fill every entry")
- ❌ Shame or judgment language
- ❌ Entries without SUDS before/after
- ❌ Missing closing ritual
- ❌ Digital-only features (this is a print-first writing document)

---

## Output Contract

| Field | Type | Required |
|---|---|---|
| `type` | `"JOURNAL"` | ✅ |
| `title` | string ≤ 50 chars | ✅ |
| `subtitle` | string ≤ 80 chars | ⬜ |
| `opening_ritual` | Markdown (brief grounding instruction) | ✅ |
| `closing_ritual` | Markdown (containment exercise) | ✅ |
| `entries` | array of `{date_field, suds_before, prompt, reflection_field, suds_after, safety_note}` | ✅ |
| `entries[].prompt` | string (open-ended question) | ✅ |
| `entries[].reflection_field.lines` | integer ≥ 10 | ✅ |
| `entries[].safety_note` | string | ✅ |
| `containment_prompts` | array of strings (after every 2 entries) | ✅ |
| `weekly_review` | `{fields[], prompt}` | ✅ |
| `safety_contacts` | array of `{name, phone, hours}` | ✅ |
| `trigger_warning` | string or null | ⬜ |
| `language` | BCP-47 code | ✅ |
| `entry_count` | integer 3–6 | ✅ |
| `page_count` | integer 4–8 | ✅ |

---

## Type-Specific Checklist

- [ ] Pages within 4–8 range
- [ ] Repeated entry template structure (date / prompt / reflection / SUDS)
- [ ] One entry per page (maximum writing space)
- [ ] All writing fields EMPTY with dotted border `#9CA3AF`
- [ ] SUDS before AND after on each entry
- [ ] Opening ritual on first page
- [ ] Closing ritual on last page
- [ ] Containment prompts after every 2 entries
- [ ] Safety note on each entry ("skip if too intense")
- [ ] Weekly review template present
- [ ] Entries ordered low → high emotional intensity (progressive exposure)
- [ ] Ruled lines in all writing fields (8 mm spacing, `#E2E8F0`)
- [ ] Crisis contacts in every page footer
- [ ] No leading or prescriptive prompts
- [ ] No forced completion language
- [ ] Trigger warning if trauma themes
- [ ] Print-ready A4, 300 DPI, binding margin
