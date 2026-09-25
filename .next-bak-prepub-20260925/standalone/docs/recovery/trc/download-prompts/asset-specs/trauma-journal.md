# Trauma Journal — Asset Specification

## Identity
- Asset ID: trauma-journal
- Parent Tool ID: trauma-journal
- Companion Type: JOURNAL
- Stage: recovery
- Clinical Review Gate: REQUIRED

## Titles
- AR: يوميات التعافي
- EN: Trauma Journal

## Purpose
- AR: يوميات منظمة للكتابة التعبيرية عن التجربة الصدمية مع دعم التنظيم والسلامة في كل جلسة كتابة
- EN: A structured journal for expressive writing about the trauma experience with regulation and safety support at each writing session

## Audience
Survivors of trauma seeking self-regulation tools. No clinical training required.

## Required Sections
### Pages 1-2 — Introduction and Safety
- Title header with asset name
- Purpose statement
- How to use this journal safely:
  - Write for 15-20 minutes at a time
  - Stop if distress becomes overwhelming
  - Use grounding before and after writing
  - This is YOUR journal — no right or wrong way
- Safety guidelines:
  - When to write (settled enough to engage)
  - When not to write (active crisis, acute distress)
  - How to close each session (grounding, containment)
- SUDS before and after each entry
- What to do if writing triggers overwhelming material

### Pages 3-4 — Journal Entry Templates
- Entry header fields:
  - Date (empty)
  - Time (empty)
  - Prompt (empty — selected from list or personal)
- Writing prompt options (list of 8-10 prompts):
  - What happened to me
  - How I felt then
  - How I feel now
  - What I wish someone had known
  - What I needed then
  - What I am learning about myself
  - What I am proud of
  - What I want to let go of
- Reflection field (large writing space, empty)
- SUDS before writing (0-10) (empty)
- SUDS after writing (0-10) (empty)
- One thing I noticed (empty)
- Second entry template (same structure, repeated)

### Pages 5-6 — Closing and Review
- Closing ritual section:
  - After each entry: grounding exercise reminder
  - Containment visualization: placing the material in a container
  - Self-care commitment: what will I do now? (empty field)
- Weekly review template:
  - This week I wrote about (empty)
  - I noticed (empty)
  - Something that shifted (empty)
  - Something I want to explore further (empty)
  - How my SUDS pattern changed (empty)
  - What I am grateful for in my healing (empty)
- Emergency contacts template
- Footer with tool ID and route

## Safety Requirements
- When to use: Ready to process in writing, between therapy sessions, as daily practice, when feeling settled enough to engage
- When to stop: SUDS exceeds 8 during writing, dissociation increases, self-harm urges arise, flashbacks become overwhelming
- When not appropriate: Acute crisis, active suicidal ideation, recently triggered and not yet settled, without safety resources in place
- When additional support needed: Writing consistently triggers overwhelming material, SUDS never decreases after writing, content reveals ongoing danger
- Escalation language: "If writing becomes too intense, stop. Close your eyes and ground. Place what you wrote in an imaginary container. You can return when you are ready."

## Writing Fields
- Date field per entry (empty)
- Time field per entry (empty)
- Prompt field per entry (empty)
- Reflection field per entry (large, empty)
- SUDS before per entry (empty)
- SUDS after per entry (empty)
- Noticing field per entry (empty)
- Closing self-care field (empty)
- 6 weekly review fields (empty)
- Emergency contact fields (3 lines)
- ALL fields MUST be empty

## Non-Writing Elements
- Writing prompt list (reference, 8-10 options)
- SUDS scales (0-10, before/after)
- Entry template structure (repeated)
- Closing ritual steps (numbered)
- Containment visualization instruction
- Safety alert box (amber)
- Teal highlight for self-care section
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
- Target page count: 6

## Tool Integration
- Route: /recovery/trc/trauma-journal/printable
- Footer Tool ID: TRC-Trauma-Journal
- Next step: None (end of recovery path — consider ongoing journaling)

## Clinical Reference
- Pennebaker, J.W. (1997). Opening Up: The Healing Power of Expressing Emotions
- Pennebaker & Beall (1986). Confronting a traumatic event
- Neuner, F. et al. (2002). Narrative Exposure Treatment
- Sloan, D.M. & Marx, B.P. (2018). Written Exposure Therapy for PTSD

## Status
- Production: clinical-review
- Clinical Review: REQUIRED
- Filename AR: TRC-Trauma-Journal-AR.html
- Filename EN: TRC-Trauma-Journal-EN.html
