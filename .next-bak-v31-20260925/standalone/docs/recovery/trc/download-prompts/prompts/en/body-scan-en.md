# Prompt: Body Scan (English)

## 1. ⚽ Identification Card
- **Asset ID:** body-scan
- **Parent Tool:** body-scan
- **Companion Type:** WORKSHEET
- **lang:** en
- **dir:** ltr
- **font:** Inter, sans-serif
- **Stage:** safety
- **Status:** built
- **Tool ID:** body-scan
- **Filename:** TRC-Body-Scan-EN.html
- **Page Count:** 3
- **Gate:** REQUIRED

## 2. ⛔ Content Boundary
Do not invent therapeutic content. Use only what is specified in this prompt. Do not add diagnostic criteria, clinical assessments, or treatment recommendations beyond what is explicitly described. All content must remain within the scope of a body awareness and safety tool.

## 3. 🎨 Design System
- **Primary:** #1F6F78
- **Accent:** #3DD4B0
- **Dark:** #0F1C2E
- **BG:** #F8FAFC
- **Line border:** #CBD5E1
- **Alert bg:** #FFFBEB
- **Alert border:** #D97706
- **Alert text:** #92400E
- **Safety bg:** #FEF3C7
- **Safety border:** #B45309
- **Safety text:** #78350F
- **Teal bg:** #E6F4F5
- **Teal text:** #1F6F78
- **Writing border:** dotted #9CA3AF
- **Footer:** #475569 at 9px
- **Font:** 'Inter', sans-serif
- **Print:** A4 210mm x 297mm, 15mm padding

## 4. 🔤 Language & Direction
- **lang:** "en"
- **dir:** "ltr"

## 5. 🖨️ Print Requirements
- A4 paper size: 210mm x 297mm
- Padding: 15mm all sides
- @media print: hide non-printable elements, ensure clean page breaks
- Each logical page maps to a printed page
- Use page-break-after for multi-page documents

## 6. 📄 Page Content

### Page 1
- **Title:** "Body Scan"
- **Purpose:** "This worksheet helps you notice what is happening in your body right now. By scanning each area, you can identify tension, discomfort, or numbness and respond with care instead of ignoring what your body is telling you."
- **Safety Alert Box** (bg: #FFFBEB, border: #D97706, text: #92400E): "Safety Notice: If focusing on your body triggers distress, flashbacks, or dissociation, stop immediately. Shift your attention outward — name objects in the room, feel your feet on the floor. This tool is not a substitute for professional care."
- **Instructions:**
  1. "Find a comfortable position, sitting or lying down."
  2. "Starting from the top of your head, slowly move your attention downward through each body region."
  3. "For each region, notice what you feel — without judging it or trying to change it."
  4. "Rate the tension level using the scale below."
  5. "Write what you notice and what that area might need."
- **Sensation Scale (1-5):**
  - "1 — Comfortable: Feels relaxed and at ease"
  - "2 — Neutral: No strong sensation, neither tense nor relaxed"
  - "3 — Tense: Feels tight, held, or strained"
  - "4 — Painful: Feels uncomfortable or hurting"
  - "5 — Numb: Cannot feel much sensation, feels disconnected or blank"

### Page 2
- **7 Body Regions — Each with three fields: "What I notice" (empty), "Tension level 1-5" (empty), "What I need" (empty):**
  1. **Head & Face**
     - "What I notice: _______________"
     - "Tension level (1-5): _______________"
     - "What I need: _______________"
  2. **Neck & Shoulders**
     - "What I notice: _______________"
     - "Tension level (1-5): _______________"
     - "What I need: _______________"
  3. **Chest & Back**
     - "What I notice: _______________"
     - "Tension level (1-5): _______________"
     - "What I need: _______________"
  4. **Arms & Hands**
     - "What I notice: _______________"
     - "Tension level (1-5): _______________"
     - "What I need: _______________"
  5. **Belly & Lower Back**
     - "What I notice: _______________"
     - "Tension level (1-5): _______________"
     - "What I need: _______________"
  6. **Hips & Thighs**
     - "What I notice: _______________"
     - "Tension level (1-5): _______________"
     - "What I need: _______________"
  7. **Legs & Feet**
     - "What I notice: _______________"
     - "Tension level (1-5): _______________"
     - "What I need: _______________"

### Page 3
- **Integration:**
  - "What did I notice overall?" — Empty writing field (border: dotted #9CA3AF)
  - "Which area needs more attention?" — Empty writing field
  - "What is one small thing I can do for that area right now?" — Empty writing field
- **When to Stop:**
  - "If body focus triggers trauma responses (flashbacks, dissociation, panic)"
  - "If you feel overwhelmed by physical sensations"
  - "If scanning makes you feel more anxious rather than more aware"
  - "If you feel disconnected from your body instead of more connected"
- **Next Steps:** "→ Trigger Mapping — If you noticed strong reactions in certain body areas, mapping your triggers can help you understand what activates them."
- **Emergency Contacts** (3 fields with dotted borders):
  - "My therapist / counselor: _______________"
  - "Helpline number: _______________"
  - "Other trusted contact: _______________"

## 7. 🛑 Safety Section
- **When to use:** When wanting to increase body awareness, identify tension patterns, or check in with physical state. Useful as a daily practice or when noticing stress symptoms.
- **When to stop:** If body focus triggers trauma responses, if dissociation increases, if physical distress overwhelms, if scanning increases anxiety.
- **Not appropriate for:** Individuals with severe dissociative disorders where body focus may worsen dissociation; individuals with eating disorders where body scanning may trigger harmful focus on body shape/size; individuals with active psychosis where body focus may intensify somatic delusions.
- **Escalation:** If body scanning consistently triggers distress or trauma responses, discontinue and consult a trauma-informed therapist. If acute dissociation occurs, use sensory grounding immediately.

## 8. 🚫 Forbidden Elements
- No pre-filled content in writing fields (all fields must be empty)
- No gamification (no scores, badges, progress bars, stars)
- No JavaScript (no JS, no scripts, no onclick, no dynamic behavior)
- No CDN references (no external fonts, no external CSS, no external JS)
- No emoji in the final HTML output beyond structural markers
- No markdown in the final HTML output

## 9. 📋 Output Contract
- Output a single, self-contained HTML file
- No markdown — pure HTML only
- Must be printable via browser Print dialog
- Must render correctly at A4 size with 15mm padding
- All CSS must be inline or in a <style> block within the file
- All text in English

## 10. 🔗 Integration Data
- **Asset ID:** body-scan
- **Parent Tool:** body-scan
- **Type:** WORKSHEET
- **Locale:** en
- **Filename:** TRC-Body-Scan-EN.html
- **Clinical Gate:** REQUIRED
- **Download Path:** /var/www/tamkinly/docs/recovery/trc/download-prompts/output/en/

## 11. CLINICAL REVIEW GATE
- **Status:** REQUIRED
- **Reviewer notes:** Body scan is a standard mindfulness-based technique. Clinical review required to confirm safety for populations with trauma histories, dissociative tendencies, and eating disorders. Tension scale and body region prompts should be reviewed for potential triggering language.

## 12. End
Begin producing the complete HTML file now.
