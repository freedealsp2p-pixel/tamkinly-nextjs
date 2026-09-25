# Body Scan — Asset Specification

## Identity
- Asset ID: body-scan
- Parent Tool ID: body-scan
- Companion Type: WORKSHEET
- Stage: safety
- Clinical Review Gate: REQUIRED

## Titles
- AR: مسح الجسد
- EN: Body Scan

## Purpose
- AR: فحص تدريجي للجسد لرصد التوتر والإحساس في كل منطقة من الجسد وزيادة الوعي الجسدي
- EN: A gradual body check-in to notice tension and sensation in each body region, increasing somatic awareness

## Audience
Survivors of trauma seeking self-regulation tools. No clinical training required.

## Required Sections
### Page 1
- Title header with asset name
- Purpose statement
- Safety alert: body awareness can be triggering for trauma survivors
- Instructions: How to do the body scan (slow, non-judgmental, curiosity-based)
- Starting position guidance (seated or lying down)

### Page 2
- Body regions scan fields (each with empty writing field):
  - Head and face — what do I notice?
  - Neck and throat — what do I notice?
  - Shoulders and upper back — what do I notice?
  - Chest and ribcage — what do I notice?
  - Arms and hands — what do I notice?
  - Belly and lower back — what do I notice?
  - Hips and pelvis — what do I notice?
  - Legs and knees — what do I notice?
  - Feet — what do I notice?

### Page 3
- Integration section: overall body sensation summary field
- Most tense area field
- Most relaxed area field
- One thing I can do to release tension field
- Safety section: when to stop
- Emergency contacts template
- Footer with tool ID and route

## Safety Requirements
- When to use: Building body awareness, noticing tension patterns, grounding through the body, daily check-in
- When to stop: Increased dissociation, flashbacks triggered, overwhelming body memories, panic escalation
- When not appropriate: Active self-harm urges focused on body, severe eating disorder with body avoidance, acute medical symptoms
- When additional support needed: Body scan triggers flashbacks, cannot stay present in body, overwhelming shame or disgust
- Escalation language: "If focusing on your body becomes overwhelming, shift to 5-4-3-2-1 Grounding using your external senses only."

## Writing Fields
- 9 body region observation fields (empty)
- Overall sensation summary field (empty)
- Most tense area field (empty)
- Most relaxed area field (empty)
- Action step field (empty)
- Emergency contact fields (3 lines)
- ALL fields MUST be empty

## Non-Writing Elements
- Body region labels with anatomical reference
- Step-by-step scan guide (top-to-bottom)
- Body outline illustration (simple, gender-neutral)
- Safety alert box (amber)
- Integration prompt box (teal)
- Footer with tool identification

## Forbidden Elements
- No pre-filled personal data
- No gamification
- No JavaScript
- No external dependencies
- No examples that look like user answers

## Language Configuration
- AR: lang="ar", dir="rtl", font-family: 'Noto Sans Arabic', sans-serif
- EN: lang="en", dir="ltr", font-family: 'Inter', sans-serif

## Page Configuration
- Size: A4 portrait (210mm × 297mm)
- Padding: 15mm
- Target page count: 3

## Tool Integration
- Route: /recovery/trc/body-scan/printable
- Footer Tool ID: TRC-Body-Scan
- Next step: trigger-mapping (Trigger Mapping)

## Clinical Reference
- MBSR Body Scan — Kabat-Zinn, J. (1990). Full Catastrophe Living
- Somatic Experiencing — Levine, P. (2010). In an Unspoken Voice
- Van der Kolk, B. (2014). The Body Keeps the Score

## Status
- Production: clinical-review
- Clinical Review: REQUIRED
- Filename AR: TRC-Body-Scan-AR.html
- Filename EN: TRC-Body-Scan-EN.html
