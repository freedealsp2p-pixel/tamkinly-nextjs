# EFT Tapping — Asset Specification

## Identity
- Asset ID: eft-tapping
- Parent Tool ID: eft-tapping
- Companion Type: WORKSHEET
- Stage: regulation
- Clinical Review Gate: REQUIRED

## Titles
- AR: النقر العصبي EFT
- EN: EFT Tapping

## Purpose
- AR: استخدام تقنية النقر على نقاط الطاقة لتقليل الشدة العاطفية المرتبطة بذكريات أو مشاعر محددة
- EN: Using acupoint tapping to reduce emotional intensity associated with specific memories or feelings

## Audience
Survivors of trauma seeking self-regulation tools. No clinical training required.

## Required Sections
### Page 1
- Title header with asset name
- Purpose statement
- Safety alert: tapping can bring up intense material, go slowly
- Setup statement section:
  - "Even though I feel [this], I deeply and completely accept myself"
  - Writing field: What is the issue or feeling you are working with? (empty)
  - Writing field: Complete your setup statement (empty)
- SUDS rating: Subjective Units of Distress Scale (0-10)
  - Writing field: My distress level before tapping (0-10) (empty)

### Page 2
- Tapping sequence (8 points with diagram reference):
  1. Karate chop point (side of hand)
  2. Top of head
  3. Eyebrow
  4. Side of eye
  5. Under the eye
  6. Under the nose
  7. Chin
  8. Collarbone
- Reminder phrase field: What short phrase keeps you focused? (empty)
- Tap each point 5-7 times while saying reminder phrase
- Visual: tapping point diagram (simple body outline with numbered points)

### Page 3
- Reassessment section:
  - Writing field: My distress level after one round (0-10) (empty)
  - Has the feeling shifted? (empty field)
  - What changed? (empty field)
- Additional rounds section:
  - If SUDS > 2, continue with modified setup statement
  - Writing field: Modified setup statement (empty)
  - Writing field: Distress after additional rounds (0-10) (empty)

### Page 4
- Closure section:
  - What did I notice during tapping? (empty field)
  - What feels different now? (empty field)
  - What do I want to remember from this session? (empty field)
- Grounding check: return to present moment
- Safety section: what to do if distress increased
- Emergency contacts template
- Footer with tool ID and route

## Safety Requirements
- When to use: Specific distress that can be named, moderate intensity emotions, between therapy sessions, after establishing safety resources
- When to stop: SUDS increases instead of decreases, new traumatic material emerges, feeling overwhelmed or dissociated
- When not appropriate: Active crisis, unable to formulate setup statement, severe dissociation, active psychosis
- When additional support needed: Tapping brings up flashbacks, distress does not decrease after 3 rounds, new trauma memories surface
- Escalation language: "If tapping brings up more than you can handle right now, stop. Ground with 5-4-3-2-1 and contact your therapist."

## Writing Fields
- Issue/feeling field (empty)
- Setup statement field (empty)
- Pre-tapping SUDS field (empty)
- Reminder phrase field (empty)
- Post-round SUDS field (empty)
- Feeling shift field (empty)
- What changed field (empty)
- Modified setup field (empty)
- Post-additional SUDS field (empty)
- What noticed field (empty)
- What feels different field (empty)
- What to remember field (empty)
- Emergency contact fields (3 lines)
- ALL fields MUST be empty

## Non-Writing Elements
- SUDS scale (0-10 visual)
- Tapping point diagram (numbered body outline)
- 8 tapping point labels with descriptions
- Step-by-step sequence indicators
- Safety alert box (amber)
- Teal highlight for setup statement template
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
- Target page count: 4

## Tool Integration
- Route: /recovery/trc/eft-tapping/printable
- Footer Tool ID: TRC-EFT-Tapping
- Next step: thought-reframing (Thought Reframing)

## Clinical Reference
- Craig, G. & Fowlie, A. (1995). Emotional Freedom Techniques
- Church, D. (2013). Clinical EFT as an Evidence-Based Practice
- Feinstein, D. (2012). Acupoint stimulation in treating psychological disorders

## Status
- Production: clinical-review
- Clinical Review: REQUIRED
- Filename AR: TRC-EFT-Tapping-AR.html
- Filename EN: TRC-EFT-Tapping-EN.html
