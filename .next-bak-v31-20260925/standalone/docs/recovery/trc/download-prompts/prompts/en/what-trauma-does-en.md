# What Trauma Does to the Body & Brain — EN Prompt

## 1. Identification Card
- **Asset ID:** what-trauma-does
- **Parent Asset:** what-trauma-does-to-the-body
- **Type:** GUIDE
- **Stage:** safety
- **Clinical Review Gate:** REQUIRED
- **Language:** en
- **Direction:** ltr
- **Page Count:** 6
- **Output Filename:** TRC-What-Trauma-Does-EN.html

## 2. Content Boundary
This guide provides psychoeducation about how trauma affects the brain, nervous system, and body. It covers neural structures, memory systems, autonomic responses, the four response patterns, body memory, and recovery pathways. It is educational only — it does not diagnose, assess, or treat. All content is framed as "this is what research shows" not "this is what you have."

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
- Footer visible on every printed page

## 6. Page Content

### Page 1 — Title & Overview
- **Title:** What Trauma Does to the Body & Brain
- **Purpose:** Understand how trauma affects the brain, nervous system, and body — and why your responses make sense.
- **Safety alert box** (Safety bg/border/text): "This is educational content, not a diagnosis. If reading about trauma responses causes distress, stop and use a grounding technique."
- **Table of Contents:** Linked list of sections across pages 2–6

### Page 2 — How Trauma Affects the Brain
- **Section heading:** The Trauma-Affected Brain
- **3 brain regions** (each as a card with Teal bg):
  - **Amygdala** — "The brain's alarm system. After trauma, it becomes overactive — detecting threat even in safe situations."
  - **Prefrontal cortex** — "The reasoning centre. After trauma, its connection to the amygdala weakens — making it harder to think clearly when triggered."
  - **Hippocampus** — "The memory organiser. After trauma, it may under-function — leading to fragmented or time-distorted memories."
- **Section — Memory impact:**
  - **Explicit memory** (declarative): "Facts and events you can describe. Trauma can disrupt this."
  - **Implicit memory** (procedural/emotional): "Body feelings, emotional reactions, and automatic responses. Trauma is often stored here."

### Page 3 — Autonomic Nervous System
- **Section heading:** The Autonomic Nervous System
- **2 branches** (each as a card):
  - **Sympathetic** — "Activates the body for action. Increases heart rate, breathing, muscle tension. This is the 'gas pedal'."
  - **Parasympathetic** — "Calms the body back to rest. Slows heart rate, relaxes muscles. This is the 'brake'."
- **Section — Window of Tolerance** (Teal bg/text):
  - "The zone of arousal where you can think, feel, and function effectively."
  - "When you are within your window, you can process information and respond flexibly."
- **2 states outside the window:**
  - **Hyperarousal** — "Above the window. Too much activation. Anxiety, anger, panic, hypervigilance."
  - **Hypoarousal** — "Below the window. Too little activation. Numbness, dissociation, collapse, shutdown."

### Page 4 — The Four Response Patterns
- **Section heading:** Fight · Flight · Freeze · Fawn
- **4 patterns** (each as a distinct card with primary border):
  - **Fight** — Body signals: clenched jaw, fists, raised voice, heat in chest. Adaptive when: confronting a threat directly is possible and safe.
  - **Flight** — Body signals: tense legs, wide eyes, urge to run, hypermobility. Adaptive when: escaping danger is possible.
  - **Freeze** — Body signals: paralysis, silence, holding breath, dissociation. Adaptive when: neither fighting nor fleeing is possible — immobility reduces harm.
  - **Fawn** — Body signals: people-pleasing, self-neglect, difficulty saying no, loss of own needs. Adaptive when: appeasing a threat (often relational) is the safest option.

### Page 5 — Body Memory & Physical Health
- **Section heading:** How the Body Stores Trauma
- **Body memory** explanation: "Trauma is not just a psychological event — it is encoded in the body. Sensations, postures, and chronic patterns can be the body's way of holding incomplete survival responses."
- **Trauma and physical health connection** (bullet list):
  - Chronic pain and tension
  - Autoimmune conditions
  - Digestive issues
  - Sleep disruption
  - Cardiovascular effects
  - Note: "These are correlations, not causations. Not everyone with these conditions has trauma."

### Page 6 — Recovery & Resources
- **Section heading:** Recovery Pathways
- **Available TRC tools** (listed with Teal bg):
  - Grounding 5-4-3-2-1 (safety stage)
  - A52 Breathing (safety stage)
  - Safe Place Visualisation (safety stage)
  - Body Scan (regulation stage)
  - Trigger Mapping (regulation stage)
  - Safety Plan (safety stage)
  - EFT Tapping (regulation stage)
  - Thought Reframing (regulation stage)
  - Shame Recovery (regulation stage)
  - Trauma Journal (recovery stage)
- **When to seek professional help** (Alert bg/border/text):
  - "If trauma responses significantly interfere with daily life."
  - "If you experience persistent dissociation or flashbacks."
  - "If you have thoughts of self-harm."
- **Contacts:** Crisis line, therapist, trusted person — with placeholder fields

## 7. Safety Section
- Safety alert on Page 1: educational content, not diagnosis.
- All body-response descriptions normalise — never pathologise.
- No SUDS scale (guide is educational, not interactive).
- Contact resources on final page.

## 8. Forbidden Elements
- No animation or transition effects.
- No auto-advancing timers or countdowns.
- No images, icons, or decorative SVGs.
- No localStorage / cookies / persistent storage.
- No external API calls or network requests.
- No diagnostic labels or clinical assessments.
- No colour-only indicators (always pair with text).
- No personalised statements — all content is general psychoeducation.

## 9. Output Contract
The HTML file must:
- Be a single self-contained .html file with no external dependencies except Google Fonts link for 'Inter'.
- Validate as well-formed HTML5.
- Render correctly in Chrome, Firefox, Safari, Edge (last 2 versions).
- Print cleanly on A4 with 15mm margins and page breaks between pages.
- Contain exactly 6 logical pages separated by page-break markers.
- Include all sections, cards, safety alerts, and tool references as specified.
- Use only the colours, fonts, and spacing defined in the Design System.

## 10. Integration Data
```json
{
  "assetId": "what-trauma-does",
  "parentAsset": "what-trauma-does-to-the-body",
  "type": "GUIDE",
  "stage": "safety",
  "gate": "REQUIRED",
  "language": "en",
  "direction": "ltr",
  "pages": 6,
  "filename": "TRC-What-Trauma-Does-EN.html",
  "toolsReferenced": ["grounding-54321", "a52-breathing", "safe-place", "body-scan", "trigger-mapping", "safety-plan", "eft-tapping", "thought-reframing", "shame-recovery", "trauma-journal"],
  "sudsRequired": false
}
```

## 11. Clinical Review Gate
This asset **requires** clinical review before deployment because:
- Psychoeducation about brain changes may be misinterpreted as permanent damage.
- Body-memory content may trigger somatic responses in traumatised users.
- Response-pattern descriptions must not pathologise survival responses.
- Physical-health correlations must not imply causation.
- Reviewer must confirm all content is accurately represented, non-pathologising, and includes appropriate caveats.

## 12. Begin producing the complete HTML file now.
Produce the full TRC-What-Trauma-Does-EN.html file conforming to every section above.
