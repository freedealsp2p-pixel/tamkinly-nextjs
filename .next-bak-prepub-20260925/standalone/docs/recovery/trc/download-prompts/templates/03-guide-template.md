# GUIDE Template

> Companion type: `GUIDE`
> Version: 1.0.0
> Pages: 3–8

---

## Content Boundary

- **Scope**: Informational / psychoeducational resource explaining concepts, models, or approaches
- **Max word count**: 3000 words (body)
- **Min word count**: 800 words
- **Writing fields**: Minimal or none — this is a reading resource, not an exercise
- **If writing fields exist**: limited to 1–2 brief reflection prompts at document end only

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#1F6F78` | Headings, TOC links, key term labels |
| `--color-accent` | `#3DD4B0` | Callout borders, tip icons, definition highlights |
| `--color-warning` | `#E53E3E` | Safety callouts, "When to seek help" sections |
| `--color-muted` | `#9CA3AF` | Captions, footnotes, page numbers |
| `--color-callout-bg` | `#EBF8FF` | Light blue background for informational callouts |
| `--color-surface` | `#FFFFFF` | Page background |
| `--color-ink` | `#1A202C` | Body text |
| `--font-heading` | `Noto Sans Bold` | All headings |
| `--font-body` | `Noto Sans Regular` | Body |
| `--font-size-base` | `11pt` | Body |
| `--font-size-heading` | `16pt` | H1 |
| `--font-size-subheading` | `13pt` | H2 |
| `--border-radius` | `6px` | Callout corners |
| `--spacing-unit` | `8px` | Grid spacing |

---

## Language Config

- `direction`: `ltr` (Arabic override: `rtl`)
- `honorifics`: professional, empathetic (`Research suggests…`, `Many people find…`)
- `tense`: present indicative for facts (`This approach works by…`), tentative for emerging evidence (`Early studies indicate…`)
- `pronouns`: second-person when addressing reader (`you may notice`); third-person for research (`participants reported`)
- `cultural_notes`: cite cross-cultural research where available; note Western bias of models

---

## Print Requirements

- **Size**: A4 (210 × 297 mm)
- **Margins**: 20 mm all sides
- **Table of Contents**: REQUIRED if page count ≥ 4; auto-generated from H2 headings
- **Resolution**: 300 DPI
- **Color mode**: CMYK primary, RGB fallback
- **Page numbers**: bottom-center, `--color-muted`
- **Header**: Guide title in `--color-muted`, 9pt, running header on pages 2+
- **Footnotes**: bottom of page, 9pt, `--color-muted`

---

## Safety Requirements

1. **Disclaimer**: Required on page 1 — "This guide is for informational purposes and does not replace professional therapeutic advice."
2. **Crisis contacts**: Full block on last page; abbreviated in footer from page 2 onward
3. **Citations**: All factual claims must have inline citations (author, year) with full reference list on last page
4. **No diagnostic language** unless citing DSM/ICD with proper framing ("The DSM-5-TR describes…")
5. **When-to-seek-help section**: Required — clear thresholds for escalation to professional care
6. **Trigger warning**: If content discusses trauma, abuse, or self-harm — on first page before TOC

---

## Forbidden Elements

- ❌ Blank writing/journaling fields (except 1–2 optional end-of-document reflection prompts)
- ❌ Step-by-step exercises (that's WORKSHEET)
- ❌ Unchecked action checkboxes (that's PLAN)
- ❌ Uncited factual claims
- ❌ Testimonials presented as evidence
- ❌ Guarantees of outcome ("This will cure…")
- ❌ Links to paywalled content without free alternative

---

## Output Contract

| Field | Type | Required |
|---|---|---|
| `type` | `"GUIDE"` | ✅ |
| `title` | string ≤ 60 chars | ✅ |
| `subtitle` | string ≤ 100 chars | ⬜ |
| `disclaimer` | string (standard text) | ✅ |
| `toc` | boolean (required if pages ≥ 4) | ✅ |
| `sections` | array of `{heading, content_markdown, callouts[]}` | ✅ |
| `callouts[].type` | `"info" \| "tip" \| "warning" \| "definition"` | ✅ |
| `citations` | array of `{key, author, year, title, source}` | ✅ |
| `when_to_seek_help` | Markdown section | ✅ |
| `safety_contacts` | array of `{name, phone, hours}` | ✅ |
| `trigger_warning` | string or null | ⬜ |
| `end_reflection_prompts` | array of strings (max 2) | ⬜ |
| `language` | BCP-47 code | ✅ |
| `word_count` | integer 800–3000 | ✅ |
| `page_count` | integer 3–8 | ✅ |

---

## Type-Specific Checklist

- [ ] Pages within 3–8 range
- [ ] Table of Contents present if ≥ 4 pages
- [ ] Disclaimer on page 1
- [ ] All factual claims have inline citations (author, year)
- [ ] Full reference list on last page
- [ ] "When to Seek Help" section present
- [ ] Crisis contacts — full block on last page, abbreviated in footer
- [ ] No or minimal writing fields (≤ 2 optional end reflections)
- [ ] No therapeutic claims or outcome guarantees
- [ ] No diagnostic language without proper DSM/ICD framing
- [ ] Trigger warning if applicable
- [ ] Cross-cultural notes or caveats where relevant
- [ ] Readability ≤ Grade 8
- [ ] Print-ready A4, 300 DPI
