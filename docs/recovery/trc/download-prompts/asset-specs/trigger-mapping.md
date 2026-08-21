# Trigger Mapping — Asset Specification

## Identity
- Asset ID: trigger-mapping
- Parent Tool ID: trigger-mapping
- Companion Type: WORKSHEET
- Stage: regulation
- Clinical Review Gate: REQUIRED

## Titles
- AR: رسم خريطة المحفزات
- EN: Trigger Mapping

## Purpose
- AR: تحديد المحفزات وفهم استجابات الجسد والعاطفة والسلوك تجاهها لتمكين التنظيم المسبق
- EN: Identifying triggers and understanding body, emotion, and behavioral responses to enable proactive regulation

## Audience
Survivors of trauma seeking self-regulation tools. No clinical training required.

## Required Sections
### Page 1
- Title header with asset name
- Purpose statement
- Trigger description fields:
  - What happened just before I noticed the shift? (empty)
  - Where was I? (empty)
  - What was I doing? (empty)
  - What was I thinking about? (empty)
  - What sensory input did I notice? (sight, sound, smell, touch, taste) (empty)

### Page 2
- Body response fields:
  - Where in my body did I feel it first? (empty)
  - What did the sensation feel like? (empty)
  - How intense was it? (1-10 scale, empty)
- Emotion fields:
  - What emotion did I notice? (empty)
  - Was there a secondary emotion underneath? (empty)
- Impulse/behavior fields:
  - What did I want to do? (empty)
  - What did I actually do? (empty)

### Page 3
- What helped fields:
  - What helped me regulate? (empty)
  - What would I try next time? (empty)
  - How long did it take to settle? (empty)
- Review/pattern section:
  - Is this a familiar trigger? (empty)
  - What pattern do I notice? (empty)
- Safety section
- Emergency contacts template
- Footer with tool ID and route

## Safety Requirements
- When to use: Post-incident reflection, building trigger awareness, preparation for challenging situations
- When to stop: Trigger mapping re-traumatizes, unable to stay present while reflecting, distress escalation
- When not appropriate: Acute crisis, active flashback, immediately after severe trigger (wait until settled)
- When additional support needed: Trigger leads to self-harm urges, patterns suggest systemic unsafe situation, unable to identify any regulation strategies
- Escalation language: "If mapping this trigger feels too intense, set it aside. Use 5-4-3-2-1 Grounding first, and return when you feel steadier."

## Writing Fields
- 5 trigger context fields (empty)
- 5 sensory input fields (empty)
- 3 body response fields (empty)
- 2 emotion fields (empty)
- 2 impulse/behavior fields (empty)
- 3 what helped fields (empty)
- 2 review/pattern fields (empty)
- Emergency contact fields (3 lines)
- ALL fields MUST be empty

## Non-Writing Elements
- Intensity scale indicator (1-10)
- Section dividers with icons
- Safety alert box (amber)
- Pattern recognition prompt box (teal)
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
- Route: /recovery/trc/trigger-mapping/printable
- Footer Tool ID: TRC-Trigger-Mapping
- Next step: safety-plan (Safety Plan)

## Clinical Reference
- CBT Trigger Identification — standard cognitive behavioral technique
- DBT Chain Analysis — Linehan, M.M. (1993). Cognitive-Behavioral Treatment of Borderline Personality Disorder
- Najavits, L.M. (2002). Seeking Safety

## Status
- Production: planned
- Clinical Review: REQUIRED
- Filename AR: TRC-Trigger-Mapping-AR.html
- Filename EN: TRC-Trigger-Mapping-EN.html
