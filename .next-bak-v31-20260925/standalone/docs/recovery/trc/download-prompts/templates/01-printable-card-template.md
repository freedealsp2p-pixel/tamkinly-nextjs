# PRINTABLE_CARD Template

> Companion type: `PRINTABLE_CARD`
> Version: 1.0.0
> Pages: 1–2

---

## Content Boundary

- **Scope**: Single-concern safety or psychoeducation card (one skill, one concept, one emergency protocol)
- **Max word count**: 400 words (body); 60 words (front panel); 80 words (back panel)
- **Min word count**: 150 words (body)
- **No multi-topic mixing** — if two skills share a card, they must be on separate sides/folds

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1F6F78` | Headers, key term labels, fold-line accent |
| `--color-accent` | `#3DD4B0` | Icons, bullet markers, subtle highlights |
| `--color-warning` | `#E53E3E` | Safety alerts, crisis indicators |
| `--color-muted` | `#9CA3AF` | Captions, secondary text |
| `--color-surface` | `#FFFFFF` | Card background |
| `--color-ink` | `#1A202C` | Body text |
| `--font-heading` | `Noto Sans Bold` | All headings |
| `--font-body` | `Noto Sans Regular` | Body text |
| `--font-size-base` | `11pt` | Body text on card |
| `--font-size-heading` | `14pt` | Section headings on card |
| `--border-radius` | `6px` | Card corners |
| `--spacing-unit` | `6px` | Grid spacing |

---

## Language Config

- `direction`: `ltr` (Arabic override: `rtl`)
- `honorifics`: formal when addressing the reader (`you are encouraged…`)
- `tense`: present imperative / present indicative (`Notice the sensation…`, `This card describes…`)
- `pronouns`: second-person (`you / your`)
- `cultural_notes`: localize body-based examples; avoid culturally specific metaphors without alternatives

---

## Print Requirements

- **Size**: A4 (210 × 297 mm) — card content centered with 15 mm margin all sides
- **Fold guide**: Dashed fold line at vertical midpoint (148.5 mm) — `stroke-dasharray: 6 4`, color `#9CA3AF`, label "↕ fold here"
- **Bleed**: none (margin-only layout)
- **Resolution**: 300 DPI minimum for any raster assets
- **Color mode**: CMYK for professional print; RGB fallback for home printers
- **Double-sided**: Front = core content; Back = safety contacts + SUDS scale + brief repetition of key phrase

---

## Safety Requirements

1. **Crisis hotline** must appear on BOTH sides of the card (minimum 1 national, 1 local if available)
2. **SUDS scale** (0–10) appears on back panel only — with **before** and **after** fields (dotted border, `#9CA3AF`)
3. **No therapeutic claims** — language must stay within psychoeducation scope
4. **Trigger warnings** if content references trauma, abuse, or self-harm — placed above fold on front
5. **Readability**: Flesch-Kincaid ≤ Grade 6

---

## Forbidden Elements

- ❌ Open-ended writing fields (except before-SUDS / after-SUDS on back)
- ❌ Blank journaling space
- ❌ Multi-page narratives
- ❌ Links to external websites (QR codes acceptable if verified)
- ❌ Branding or logos other than program identity mark
- ❌ Animated or interactive elements (this is a print artifact)

---

## Output Contract

| Field | Type | Required |
|---|---|---|
| `type` | `"PRINTABLE_CARD"` | ✅ |
| `title` | string ≤ 40 chars | ✅ |
| `subtitle` | string ≤ 60 chars | ⬜ |
| `front_content` | Markdown (heading + body) | ✅ |
| `back_content` | Markdown (safety + SUDS) | ✅ |
| `suds_before` | empty field, dotted border | ✅ |
| `suds_after` | empty field, dotted border | ✅ |
| `safety_contacts` | array of `{name, phone, hours}` | ✅ |
| `fold_line` | boolean | ✅ (default `true`) |
| `trigger_warning` | string or null | ⬜ |
| `language` | BCP-47 code | ✅ |
| `word_count_body` | integer 150–400 | ✅ |

---

## Type-Specific Checklist

- [ ] Card fits on a single A4 sheet (front + back)
- [ ] Fold line present at vertical midpoint
- [ ] SUDS before/after fields on back panel only (dotted border `#9CA3AF`)
- [ ] No writing fields other than SUDS
- [ ] Crisis contacts on both sides
- [ ] Trigger warning (if applicable) above fold on front
- [ ] Content is single-concern (one skill/concept per card)
- [ ] Word count within 150–400
- [ ] Readability ≤ Grade 6
- [ ] All text is informational / psychoeducational (no therapeutic claims)
- [ ] Print-ready at 300 DPI, CMYK + RGB fallback
