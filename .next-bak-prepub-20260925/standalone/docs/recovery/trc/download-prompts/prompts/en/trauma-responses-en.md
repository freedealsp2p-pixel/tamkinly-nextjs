# Trauma Response Patterns — Quick Reference — EN Prompt

## 1. Identification Card
- **Asset ID:** trauma-responses
- **Parent Asset:** trauma-responses
- **Type:** REFERENCE
- **Stage:** regulation
- **Clinical Review Gate:** REQUIRED
- **Language:** en
- **Direction:** ltr
- **Page Count:** 3
- **Output Filename:** TRC-Trauma-Responses-EN.html

## 2. Content Boundary
This reference card provides a quick-lookup table for the four trauma response patterns (Fight, Flight, Freeze, Fawn), with body signals, adaptive context, and recommended regulation tools for each. It includes a self-identification section and an escalation pathway. It does not diagnose or assess — it is a psychoeducational reference.

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
- Page breaks between each of the 3 pages
- No colour backgrounds in print (use borders only)
- Footer visible on every printed page

## 6. Page Content

### Page 1 — Four-Pattern Quick Reference Table
- **Title:** Trauma Response Patterns — Quick Reference
- **Purpose:** Identify your trauma response pattern, understand its signals, and find the right regulation tool.
- **Safety alert box** (Safety bg/border/text): "These responses are survival adaptations — they are not character flaws. If reading this causes distress, stop and use a grounding technique."
- **4-pattern table** (full width, with primary-colour header row):

| Pattern | Body Signals | Adaptive Context | Regulation Tool |
|---------|-------------|-----------------|-----------------|
| **Fight** | Clenched jaw, fists, raised voice, heat in chest | Adaptive in danger when confrontation is viable | De-escalation tools, Grounding 5-4-3-2-1 |
| **Flight** | Tense legs, wide eyes, urge to run, hypermobility | Adaptive when escape is possible | Grounding tools, A52 Breathing |
| **Freeze** | Paralysis, silence, holding breath, dissociation | Adaptive when neither fight nor flight is possible | Gentle stimulation, Body Scan |
| **Fawn** | People-pleasing, self-neglect, difficulty saying no | Adaptive in relational danger | Boundary tools, Shame Recovery |

### Page 2 — Self-Identification
- **Section heading:** How Do I Identify My Dominant Pattern?
- **Guidance text** (Teal bg/text): "Most people have a primary pattern and one or two secondary patterns. Patterns can shift depending on the situation. Notice which signals appear first in your body."
- **Field — Most common pattern for me:** (single-line input, writing-area border)
- **Field — What signals do I notice first:** (medium textarea, writing-area border)
- **Per-pattern regulation plan** (4 mini-cards):
  - **Fight →** Grounding 5-4-3-2-1, then de-escalation (name the emotion, slow speech, lower voice)
  - **Flight →** A52 Breathing, then grounding (feet on floor, orient to room)
  - **Freeze →** Body Scan, then gentle stimulation (cold water on hands, move fingers one by one)
  - **Fawn →** Shame Recovery, then boundary practice (name one need, say one small "no")

### Page 3 — Escalation Pathway & Safety
- **Section heading:** Escalation Pathway
- **SUDS 1–10 scale with actions at each level:**
  - **1–3 (Mild):** Notice and label. Continue current activity.
  - **4–5 (Moderate):** Use a regulation tool (Grounding, Breathing, Body Scan).
  - **6–7 (Elevated):** Pause activity. Use primary regulation tool. Consider whether you need support.
  - **8–9 (High):** Stop activity. Use grounding + breathing. Contact a safe person if possible.
  - **10 (Overwhelming):** Crisis. Contact crisis support immediately. You do not have to manage this alone.
- **When to seek professional help** (Alert bg/border/text):
  - "If you regularly reach SUDS 8+ without obvious triggers."
  - "If regulation tools are not bringing distress below 7."
  - "If trauma responses are affecting relationships, work, or daily functioning."
- **Contacts:** Crisis line, therapist, trusted person — with placeholder fields

## 7. Safety Section
- Safety alert on Page 1 — normalising language.
- Escalation pathway on Page 3 — clear action steps at each SUDS level.
- Crisis-level instruction includes immediate contact guidance.
- All response patterns framed as adaptive, not pathological.

## 8. Forbidden Elements
- No animation or transition effects.
- No auto-advancing timers or countdowns.
- No images, icons, or decorative SVGs.
- No localStorage / cookies / persistent storage.
- No external API calls or network requests.
- No diagnostic labels or clinical assessments.
- No colour-only indicators (always pair with text).
- No pathologising language — responses are "adaptations," not "symptoms."

## 9. Output Contract
The HTML file must:
- Be a single self-contained .html file with no external dependencies except Google Fonts link for 'Inter'.
- Validate as well-formed HTML5.
- Render correctly in Chrome, Firefox, Safari, Edge (last 2 versions).
- Print cleanly on A4 with 15mm margins and page breaks between pages.
- Contain exactly 3 logical pages separated by page-break markers.
- Include the 4-pattern table, self-identification fields, per-pattern regulation plans, and escalation pathway as specified.
- Use only the colours, fonts, and spacing defined in the Design System.

## 10. Integration Data
```json
{
  "assetId": "trauma-responses",
  "parentAsset": "trauma-responses",
  "type": "REFERENCE",
  "stage": "regulation",
  "gate": "REQUIRED",
  "language": "en",
  "direction": "ltr",
  "pages": 3,
  "filename": "TRC-Trauma-Responses-EN.html",
  "toolsReferenced": ["grounding-54321", "a52-breathing", "body-scan", "shame-recovery"],
  "sudsRequired": true
}
```

## 11. Clinical Review Gate
This asset **requires** clinical review before deployment because:
- Response-pattern descriptions must be accurate and non-pathologising.
- Regulation-tool recommendations must be clinically appropriate.
- Escalation-pathway thresholds must align with clinical practice.
- Self-identification fields may lead to over-identification with a single pattern.
- Reviewer must confirm normalising language and that the escalation pathway is safe.

## 12. Begin producing the complete HTML file now.
Produce the full TRC-Trauma-Responses-EN.html file conforming to every section above.
