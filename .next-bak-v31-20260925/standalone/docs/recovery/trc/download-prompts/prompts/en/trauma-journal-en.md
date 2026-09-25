# Trauma Journal — EN Prompt

## 1. Identification Card
- **Asset ID:** trauma-journal
- **Parent Asset:** trauma-journal
- **Type:** JOURNAL
- **Stage:** recovery
- **Clinical Review Gate:** REQUIRED
- **Language:** en
- **Direction:** ltr
- **Page Count:** 6
- **Output Filename:** TRC-Trauma-Journal-EN.html

## 2. Content Boundary
This journal provides a safe, structured writing tool for processing traumatic experiences through progressive exposure. It offers prompt selection, structured entry fields, SUDS tracking before and after writing, and a closing grounding ritual. It does not prescribe writing topics, does not analyse entries, and does not replace therapy. Content is limited to the entry template, SUDS scales, and closing instructions.

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
- Page breaks between each of the 6 pages
- No colour backgrounds in print (use borders only)
- Writing-area borders remain as dotted #9CA3AF
- Footer visible on every printed page

## 6. Page Content

### Page 1 — Introduction & Instructions
- **Title:** Trauma Journal
- **Purpose:** A safe, structured writing tool for processing traumatic experiences through progressive exposure.
- **Safety alert box** (Safety bg/border/text): "This journal uses progressive exposure — stop if your distress exceeds 7/10. You can always return to your writing later."
- **Usage instructions** (Teal bg/text):
  - "Write for 15–20 minutes per session."
  - "Do not force yourself — if a prompt does not feel right, choose another."
  - "Rate your distress using the SUDS scale (0–10) before and after each entry."
  - "Complete the closing ritual after every writing session."

### Page 2 — Prompt Selection
- **Section heading:** Choose a Prompt
- **6 prompt types** (displayed as selectable cards with Teal bg):
  1. Traumatic experience — "Write about a specific traumatic event."
  2. Memory — "Explore a memory that surfaced recently."
  3. Dream — "Describe a dream that felt significant or distressing."
  4. Difficult emotion — "Sit with and write about a strong emotion."
  5. Turning point — "Write about a moment that changed things for you."
  6. Hope for the future — "Write about something you are working toward."
- **SUDS before writing:** "Rate your current distress before you begin writing." Scale 0–10 (0 = "Calm" / 10 = "Overwhelming distress")

### Pages 3–4 — Journal Entry Template (3 entries)
Each entry block contains:
- **Field — Date:** (date input)
- **Field — Selected prompt:** (short text, which prompt was chosen)
- **Field — What happened:** "Describe what happened or what you are writing about." (large textarea, writing-area border)
- **Field — What I felt:** "What emotions arose during this writing?" (medium textarea, writing-area border)
- **Field — What I noticed in my body:** "Any body sensations during or after writing?" (medium textarea, writing-area border)
- **Field — What I need right now:** "What do you need in this moment?" (medium textarea, writing-area border)
- **SUDS after writing:** "Rate your distress now." Scale 0–10

### Page 5 — Closing Ritual & Review
- **Section — Closing Ritual** (Teal bg/text):
  - "After each writing session, complete these grounding steps:"
  - "1. Place both feet on the floor. Press them down firmly."
  - "2. Look around and name 5 things you can see."
  - "3. Take 3 slow breaths — in for 4, hold for 4, out for 6."
  - "4. Remind yourself: 'I am here, in the present moment. I am safe right now.'"
- **Section — Weekly Review:**
  - **Field — What pattern did I notice:** (medium textarea, writing-area border)
  - **Field — What helped:** (medium textarea, writing-area border)
  - **Field — What I want to explore:** (medium textarea, writing-area border)

### Page 6 — Safety & Next Steps
- **When to stop section** (Safety bg/border/text):
  - "Stop if distress rises above 7/10 at any point."
  - "If SUDS after writing is higher than before, use grounding before closing."
  - "This journal is not a substitute for professional support."
- **Severe distress signs** (Alert bg/border/text):
  - "Difficulty returning to the present moment"
  - "Persistent dissociation or numbness"
  - "Intrusive memories that do not settle after closing ritual"
  - "Thoughts of self-harm"
- **Next steps:** "If any of the above persist, contact a professional."
- **Contacts:** Crisis line, therapist, trusted person — with placeholder fields

## 7. Safety Section
- Safety alert on Page 1 with progressive-exposure warning.
- SUDS before/after on every entry for self-monitoring.
- Closing ritual on Page 5 — mandatory grounding after writing.
- When-to-stop guidance and severe-distress signs on Page 6.
- All writing fields are optional — user may skip any field.
- No field auto-saves or persists data between sessions.

## 8. Forbidden Elements
- No animation or transition effects.
- No auto-advancing timers or countdowns.
- No images, icons, or decorative SVGs.
- No localStorage / cookies / persistent storage.
- No external API calls or network requests.
- No diagnostic labels or clinical terminology.
- No colour-only indicators (always pair with text).
- No forced completion — user may exit at any point.

## 9. Output Contract
The HTML file must:
- Be a single self-contained .html file with no external dependencies except Google Fonts link for 'Inter'.
- Validate as well-formed HTML5.
- Render correctly in Chrome, Firefox, Safari, Edge (last 2 versions).
- Print cleanly on A4 with 15mm margins and page breaks between pages.
- Contain exactly 6 logical pages separated by page-break markers.
- Include all fields, labels, safety alerts, prompt cards, SUDS scales, closing ritual, and review section as specified.
- Use only the colours, fonts, and spacing defined in the Design System.

## 10. Integration Data
```json
{
  "assetId": "trauma-journal",
  "parentAsset": "trauma-journal",
  "type": "JOURNAL",
  "stage": "recovery",
  "gate": "REQUIRED",
  "language": "en",
  "direction": "ltr",
  "pages": 6,
  "filename": "TRC-Trauma-Journal-EN.html",
  "toolsReferenced": ["grounding-54321", "a52-breathing", "safe-place"],
  "sudsRequired": true
}
```

## 11. Clinical Review Gate
This asset **requires** clinical review before deployment because:
- Journaling about trauma can activate overwhelming material.
- Progressive exposure must be paced — prompts may be too direct for some users.
- Closing ritual must be clinically sufficient for grounding.
- SUDS tracking before/after is a clinical monitoring tool.
- Reviewer must confirm safety pacing, closing-ritual adequacy, and that prompts are appropriately graduated.

## 12. Begin producing the complete HTML file now.
Produce the full TRC-Trauma-Journal-EN.html file conforming to every section above.
