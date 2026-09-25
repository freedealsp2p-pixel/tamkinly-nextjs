# Shame Recovery — EN Prompt

## 1. Identification Card
- **Asset ID:** shame-recovery
- **Parent Asset:** shame-recovery
- **Type:** WORKSHEET
- **Stage:** regulation
- **Clinical Review Gate:** REQUIRED
- **Language:** en
- **Direction:** ltr
- **Page Count:** 4
- **Output Filename:** TRC-Shame-Recovery-EN.html

## 2. Content Boundary
This worksheet guides the user through recognising, understanding, and beginning to release shame. It differentiates shame from guilt, traces shame beliefs to their source, and introduces self-compassion as an antidote. It does not diagnose, does not explore trauma origin stories, and does not replace therapy. Content is limited to the structured fields and minimal psychoeducation needed to complete each step.

## 3. Design System
- **Primary:** #1F6F78
- **Accent:** #3DD4B0
- **Dark:** #0F1C2E
- **Background:** #F8FAFC
- **Line border:** #CBD5E1
- **Alert bg:** #FFFBEB | **Alert border:** #D97706 | **Alert text:** #92400E
- **Safety bg:** #FEF3C7 | **Safety border:** #B45309 | **Safety text:** #78350F
- **Teal bg:** #E6F4F5 | **Teal text:** #1F6F78
- **Writing border:** dotted #9CA3AF
- **Footer:** #475569 at 9px
- **Font:** 'Inter', sans-serif
- **Print:** A4, 15mm padding

## 4. Language & Direction
- **html lang:** "en"
- **dir:** "ltr"
- **All UI text, labels, headings, and instructions in English.**

## 5. Print Requirements
- A4 paper size, 15mm padding on all sides
- Page breaks between each of the 4 pages
- No colour backgrounds in print (use borders only)
- Writing-area borders remain as dotted #9CA3AF
- Footer visible on every printed page

## 6. Page Content

### Page 1 — Recognise Shame
- **Title:** Shame Recovery
- **Purpose:** Recognise shame, distinguish it from guilt, trace its source, and begin to release it through self-compassion.
- **Safety alert box** (Safety bg/border/text): "Shame can feel overwhelming. If distress rises above 7/10, stop and use a grounding technique. You can return to this worksheet later."
- **Distinction box** (Teal bg/text): "Shame vs Guilt"
  - **Shame** = "I am bad" (a judgement of self)
  - **Guilt** = "I did something bad" (a judgement of action)
- **Field — Shame trigger:** "What made me feel shame?" (medium textarea, writing-area border)

### Page 2 — Understand the Shame Response
- **Field — Body response to shame:** "What did you notice in your body when shame arose?" (medium textarea, writing-area border)
- **Field — Shame belief:** "What belief did I tell myself?" (medium textarea, writing-area border)
- **Field — Belief source:** "Where did this belief come from?" (single-line input, writing-area border)
  - Subtext: "Often shame beliefs originate in early experiences, cultural messages, or relational dynamics."

### Page 3 — Self-Compassion
- **Section heading:** Self-Compassion Exercise
- **Field — Friend perspective:** "What would I say to a friend experiencing this same shame?" (large textarea, writing-area border)
- **Field — Speaking shame aloud:** "How can I speak about this shame aloud?" (medium textarea, writing-area border)
  - Subtext (Teal bg/text): "Speaking shame weakens its power. Shame thrives in silence and secrecy."
- **Field — Core value:** "What core value do I hold that contradicts this shame?" (medium textarea, writing-area border)

### Page 4 — Integration & Safety
- **Section — Integration:**
  - **Field — What I want to remember:** "What do I want to carry forward from this exercise?" (medium textarea, writing-area border)
- **When to stop section** (Safety bg/border/text):
  - "Stop if distress rises above 7/10."
  - "Use grounding or breathing before continuing."
  - "This worksheet is not a substitute for professional support."
- **Contacts:** Crisis line, therapist, trusted person — with placeholder fields

## 7. Safety Section
- Safety alert on Page 1 before any emotional engagement.
- When-to-stop guidance on Page 4.
- All writing fields are optional — user may skip any field.
- No field auto-saves or persists data between sessions.
- Shame-specific safety note: shame may intensify before it eases — validate this as normal.

## 8. Forbidden Elements
- No animation or transition effects.
- No auto-advancing timers or countdowns.
- No images, icons, or decorative SVGs.
- No localStorage / cookies / persistent storage.
- No external API calls or network requests.
- No diagnostic labels or clinical terminology.
- No colour-only indicators (always pair with text).
- No shame-inducing language or judgemental framing.

## 9. Output Contract
The HTML file must:
- Be a single self-contained .html file with no external dependencies except Google Fonts link for 'Inter'.
- Validate as well-formed HTML5.
- Render correctly in Chrome, Firefox, Safari, Edge (last 2 versions).
- Print cleanly on A4 with 15mm margins and page breaks between pages.
- Contain exactly 4 logical pages separated by page-break markers.
- Include all fields, labels, safety alerts, and the shame/guilt distinction as specified.
- Use only the colours, fonts, and spacing defined in the Design System.

## 10. Integration Data
```json
{
  "assetId": "shame-recovery",
  "parentAsset": "shame-recovery",
  "type": "WORKSHEET",
  "stage": "regulation",
  "gate": "REQUIRED",
  "language": "en",
  "direction": "ltr",
  "pages": 4,
  "filename": "TRC-Shame-Recovery-EN.html",
  "toolsReferenced": ["grounding-54321", "a52-breathing", "self-compassion"],
  "sudsRequired": false
}
```

## 11. Clinical Review Gate
This asset **requires** clinical review before deployment because:
- Shame work can re-traumatise if paced too quickly.
- The shame/guilt distinction may be misapplied to minimise genuine accountability.
- Self-compassion exercise may feel inaccessible to users in deep shame states.
- Belief-source exploration may surface trauma material.
- Reviewer must confirm safety pacing and that language is non-judgemental.

## 12. Begin producing the complete HTML file now.
Produce the full TRC-Shame-Recovery-EN.html file conforming to every section above.
