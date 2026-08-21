# Safety Plan — Asset Specification

## Identity
- Asset ID: safety-plan
- Parent Tool ID: safety-plan
- Companion Type: PLAN
- Stage: safety
- Clinical Review Gate: REQUIRED

## Titles
- AR: خطة السلامة
- EN: Safety Plan

## Purpose
- AR: خطة منظمة خطوة بخطوة للتعامل مع الأوقات التي أشعر فيها بالخطر أو الرغبة في إيذاء نفسي
- EN: A structured step-by-step plan for times when feeling unsafe or having urges to harm myself

## Audience
Survivors of trauma seeking self-regulation tools. No clinical training required.

## Required Sections
### Page 1
- Title header with asset name
- Purpose statement
- Step 1: Warning signs that a crisis may be developing
  - What thoughts, feelings, or situations indicate I am getting overwhelmed? (empty fields, 3 lines)
- Step 2: Internal coping strategies — things I can do on my own
  - What helps me calm down without contacting anyone? (empty fields, 4 lines)

### Page 2
- Step 3: People and social settings that provide distraction
  - People I can contact (name + phone, 3 entries, empty)
  - Social settings where I can be around people (empty field)
- Step 4: People I can ask for help
  - People I can talk to openly (name + phone, 3 entries, empty)

### Page 3
- Step 5: Professionals or agencies I can contact
  - Therapist/counselor (name + phone, empty)
  - Crisis line (empty)
  - Emergency services (empty)
- Step 6: Making my environment safe
  - What can I do to make my surroundings safer? (empty fields, 2 lines)
  - What can I remove or secure? (empty field)
- Reason for living / what matters most (empty field)
- Footer with tool ID and route

## Safety Requirements
- When to use: Pre-crisis planning, after crisis for future preparation, ongoing safety awareness
- When to stop: Filling the plan causes acute distress, planning feels overwhelming rather than helpful
- When not appropriate: Active crisis requiring immediate intervention (call emergency services first)
- When additional support needed: Cannot identify any coping strategies, cannot identify any support people, expressing active suicidal intent
- Escalation language: "If you are in immediate danger or having thoughts of ending your life, call emergency services now: 911 / 999 / 112"

## Writing Fields
- 3 warning sign fields (empty)
- 4 internal coping fields (empty)
- 3 person+phone fields for distraction (empty)
- 1 social settings field (empty)
- 3 person+phone fields for help (empty)
- 1 therapist field (empty)
- 1 crisis line field (empty)
- 1 emergency services field (empty)
- 2 environment safety fields (empty)
- 1 things to remove/secure field (empty)
- 1 reason for living field (empty)
- ALL fields MUST be empty

## Non-Writing Elements
- 6 numbered steps with step headers
- Step progress indicators
- Emergency highlight box (red/urgent)
- Safety alert box (amber)
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
- Route: /recovery/trc/safety-plan/printable
- Footer Tool ID: TRC-Safety-Plan
- Next step: eft-tapping (EFT Tapping)

## Clinical Reference
- Stanley, B. & Brown, G.K. (2012). Safety Planning Intervention
- Jobes, D.A. (2016). Managing Suicidal Risk
- VA/DoE Safety Planning template

## Status
- Production: planned
- Clinical Review: REQUIRED
- Filename AR: TRC-Safety-Plan-AR.html
- Filename EN: TRC-Safety-Plan-EN.html
