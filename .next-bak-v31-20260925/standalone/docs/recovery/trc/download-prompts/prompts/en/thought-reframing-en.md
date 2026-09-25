# Thought Reframing — EN Prompt

## 1. Identification Card
- **Asset ID:** thought-reframing
- **Parent Asset:** thought-reframing
- **Type:** WORKSHEET
- **Stage:** regulation
- **Clinical Review Gate:** REQUIRED
- **Language:** en
- **Direction:** ltr
- **Page Count:** 4
- **Output Filename:** TRC-Thought-Reframing-EN.html

## 2. Content Boundary
This worksheet guides the user through cognitive restructuring of a single automatic thought. It presents one complete reframing cycle: identify → examine evidence → recognise distortion → formulate balanced thought → rate shift → plan action. It does not teach CBT theory, does not diagnose, and does not replace therapy. Content is limited to the structured fields and psychoeducation minimally necessary to complete each step.

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

### Page 1 — Identify the Thought
- **Title:** Thought Reframing
- **Purpose:** Identify and reframe unhelpful automatic thoughts using evidence-based cognitive restructuring.
- **Safety alert box** (Safety bg/border/text): "If you feel overwhelmed at any point, stop and use a grounding technique. You can return to this worksheet later."
- **Field — Automatic thought:** "What thought is causing you distress?" (large textarea, writing-area border)
- **Field — Belief rating:** "How strongly do you believe this thought right now?" Scale 0–10 with labelled endpoints (0 = "Not at all" / 10 = "Completely")

### Page 2 — Examine the Evidence
- **Section — Evidence supporting the thought:** 3 numbered fields (1. 2. 3.) each with writing-area border
- **Section — Evidence against the thought:** 3 numbered fields (1. 2. 3.) each with writing-area border
- **Section — Cognitive distortion list** (Teal bg/text): Bullet list of 5 distortions:
  - All-or-nothing thinking
  - Catastrophizing
  - Overgeneralization
  - Mind reading
  - Should statements
- **Field — Applicable pattern:** "Which distortion(s) apply to your thought?" (single-line input, writing-area border)

### Page 3 — Reframe
- **Field — Balanced thought:** "Based on all the evidence, what is a more balanced thought?" (large textarea, writing-area border)
- **Field — Alternative perspective:** "How would you advise a friend who had this thought?" (large textarea, writing-area border)
- **Field — New belief rating:** "How strongly do you believe the balanced thought now?" Scale 0–10 (0 = "Not at all" / 10 = "Completely")

### Page 4 — Action & Safety
- **Field — Action plan:** "What will I do differently based on this reframing?" (medium textarea, writing-area border)
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
- Distress-rating fields use 0–10 SUDS scale.

## 8. Forbidden Elements
- No animation or transition effects.
- No auto-advancing timers or countdowns.
- No images, icons, or decorative SVGs.
- No localStorage / cookies / persistent storage.
- No external API calls or network requests.
- No diagnostic labels or clinical terminology beyond the named distortions.
- No colour-only indicators (always pair with text).

## 9. Output Contract
The HTML file must:
- Be a single self-contained .html file with no external dependencies except Google Fonts link for 'Inter'.
- Validate as well-formed HTML5.
- Render correctly in Chrome, Firefox, Safari, Edge (last 2 versions).
- Print cleanly on A4 with 15mm margins and page breaks between pages.
- Contain exactly 4 logical pages separated by page-break markers.
- Include all fields, labels, safety alerts, and the distortion list as specified.
- Use only the colours, fonts, and spacing defined in the Design System.

## 10. Integration Data
```json
{
  "assetId": "thought-reframing",
  "parentAsset": "thought-reframing",
  "type": "WORKSHEET",
  "stage": "regulation",
  "gate": "REQUIRED",
  "language": "en",
  "direction": "ltr",
  "pages": 4,
  "filename": "TRC-Thought-Reframing-EN.html",
  "toolsReferenced": ["grounding-54321", "a52-breathing"],
  "sudsRequired": true
}
```

## 11. Clinical Review Gate
This asset **requires** clinical review before deployment because:
- It guides cognitive restructuring, a therapeutic technique.
- Distortion identification may mislabel normal thinking.
- Belief-rating shifts may be misinterpreted as clinical improvement.
- Action-plan section needs safeguard against harmful advice.
- Reviewer must confirm safety alerts are sufficient and wording is non-prescriptive.

## 12. Begin producing the complete HTML file now.
Produce the full TRC-Thought-Reframing-EN.html file conforming to every section above.
