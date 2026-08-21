# Regulation Quick Reference — EN Prompt

## 1. Identification Card
- **Asset ID:** regulation-quick-reference
- **Parent Asset:** regulation-toolkit
- **Type:** REFERENCE
- **Stage:** regulation
- **Clinical Review Gate:** REQUIRED
- **Language:** en
- **Direction:** ltr
- **Page Count:** 2
- **Output Filename:** TRC-Regulation-Quick-Ref-EN.html

## 2. Content Boundary
This reference card provides a single-page lookup table for all 10 TRC regulation tools (with when-to-use, duration, key instruction, and stage), plus a decision flowchart for choosing the right tool based on current state. It does not teach tool techniques — it directs the user to the appropriate tool. It does not diagnose or replace clinical judgement.

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
- Page break between the 2 pages
- No colour backgrounds in print (use borders only)
- Footer visible on every printed page

## 6. Page Content

### Page 1 — Tool Reference Table
- **Title:** Regulation Quick Reference
- **Purpose:** Quick reference table for all TRC tools — find the right tool for this moment.
- **10-row table** (full width, primary-colour header row):

| Tool | When to Use | Duration | Key Instruction | Stage |
|------|------------|----------|----------------|-------|
| **Grounding 5-4-3-2-1** | Feeling disconnected, dizzy, dissociated | 3–5 min | Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste | Safety |
| **A52 Breathing** | Anxious, panicked, rapid breathing | 2–5 min | Inhale 5, hold 2, exhale 7. Repeat 6 cycles | Safety |
| **Safe Place** | Need safety, comfort, emotional rest | 5–10 min | Visualise a place where you feel completely safe. Engage all senses. | Safety |
| **Body Scan** | Numb, shut down, disconnected from body | 10–15 min | Slowly move attention from feet to head. Notice without judging. | Regulation |
| **Trigger Mapping** | Want to understand what triggers you | 15–20 min | List triggers, rate intensity, note body response, identify pattern. | Regulation |
| **Safety Plan** | Need a plan for crisis moments | 20–30 min | List warning signs, coping strategies, people to contact, safe spaces. | Safety |
| **EFT Tapping** | Specific distress, negative belief, craving | 5–10 min | Tap 8 points while stating the issue. Rate distress before and after. | Regulation |
| **Thought Reframing** | Stuck in a distressing thought | 10–15 min | Identify thought → examine evidence → reframe → rate shift. | Regulation |
| **Shame Recovery** | Feeling shame, self-judgement, worthlessness | 15–20 min | Name shame → distinguish from guilt → self-compassion → core value. | Regulation |
| **Trauma Journal** | Ready to process, want to write | 15–20 min | Choose prompt → write → SUDS before/after → closing ritual. | Recovery |

### Page 2 — Decision Flowchart & Safety
- **Section heading:** Which Tool Do I Need Right Now?
- **Decision flowchart** (text-based, with Teal bg cards for each branch):

  **Q: What am I feeling right now?**

  - **Hyperarousal** (anxious, panicked, hypervigilant)
    → Grounding 5-4-3-2-1 → A52 Breathing

  - **Hypoarousal** (numb, shut down, disconnected)
    → Body Scan → Safe Place Visualisation

  - **Specific emotion** (anger, sadness, fear)
    → EFT Tapping → Thought Reframing

  - **Shame** (feeling bad about who I am)
    → Shame Recovery

  - **Safety need** (wanting to feel safe, planning for crisis)
    → Safety Plan

  - **Trigger** (wanting to understand my patterns)
    → Trigger Mapping

  - **Ready to process** (wanting to write, reflect, integrate)
    → Trauma Journal

  - **Crisis** (overwhelmed, unable to regulate)
    → Crisis support line immediately

- **When to seek professional help** (Alert bg/border/text):
  - "If no tool reduces distress below 7/10."
  - "If you are in crisis, contact support immediately — do not wait."
  - "These tools complement but do not replace professional care."
- **Contacts:** Crisis line, therapist, trusted person — with placeholder fields

## 7. Safety Section
- Decision flowchart includes crisis pathway with immediate contact instruction.
- Alert box on Page 2 for professional-help thresholds.
- No SUDS scale on this reference card (it directs to tools that include SUDS).
- Contact resources on Page 2.

## 8. Forbidden Elements
- No animation or transition effects.
- No auto-advancing timers or countdowns.
- No images, icons, or decorative SVGs.
- No localStorage / cookies / persistent storage.
- No external API calls or network requests.
- No diagnostic labels or clinical assessments.
- No colour-only indicators (always pair with text).

## 9. Output Contract
The HTML file must:
- Be a single self-contained .html file with no external dependencies except Google Fonts link for 'Inter'.
- Validate as well-formed HTML5.
- Render correctly in Chrome, Firefox, Safari, Edge (last 2 versions).
- Print cleanly on A4 with 15mm margins and page break between pages.
- Contain exactly 2 logical pages separated by a page-break marker.
- Include the 10-row tool table, decision flowchart, and contact section as specified.
- Use only the colours, fonts, and spacing defined in the Design System.

## 10. Integration Data
```json
{
  "assetId": "regulation-quick-reference",
  "parentAsset": "regulation-toolkit",
  "type": "REFERENCE",
  "stage": "regulation",
  "gate": "REQUIRED",
  "language": "en",
  "direction": "ltr",
  "pages": 2,
  "filename": "TRC-Regulation-Quick-Ref-EN.html",
  "toolsReferenced": ["grounding-54321", "a52-breathing", "safe-place", "body-scan", "trigger-mapping", "safety-plan", "eft-tapping", "thought-reframing", "shame-recovery", "trauma-journal"],
  "sudsRequired": false
}
```

## 11. Clinical Review Gate
This asset **requires** clinical review before deployment because:
- Tool-to-situation mappings must be clinically appropriate.
- Decision flowchart must not delay crisis response.
- Duration estimates must be realistic.
- Key instructions must be accurate summaries of each tool.
- Reviewer must confirm that the crisis pathway is prominent and that no tool is recommended for situations where it could cause harm.

## 12. Begin producing the complete HTML file now.
Produce the full TRC-Regulation-Quick-Ref-EN.html file conforming to every section above.
