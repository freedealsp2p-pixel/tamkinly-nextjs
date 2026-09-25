# Thought Reframing — Asset Specification

## Identity
- Asset ID: thought-reframing
- Parent Tool ID: thought-reframing
- Companion Type: WORKSHEET
- Stage: regulation
- Clinical Review Gate: REQUIRED

## Titles
- AR: إعادة صياغة الأفكار
- EN: Thought Reframing

## Purpose
- AR: فحص الأفكار التلقائية وإعادة صياغتها بشكل أكثر توازناً بناءً على الدليل وليس الشدة العاطفية
- EN: Examining automatic thoughts and reframing them more balancedly based on evidence rather than emotional intensity

## Audience
Survivors of trauma seeking self-regulation tools. No clinical training required.

## Required Sections
### Page 1
- Title header with asset name
- Purpose statement
- Safety alert: this is about examining thoughts, not forcing positive thinking
- Section: Identifying the thought
  - What situation triggered the thought? (empty field)
  - What was the automatic thought? (empty field)
  - How much do you believe this thought? (0-100%) (empty field)
  - What emotion does this thought create? (empty field)
  - How intense is the emotion? (0-10) (empty field)

### Page 2
- Section: Examining the evidence
  - Evidence FOR the thought (what supports it being true) (empty field, 3 lines)
  - Evidence AGAINST the thought (what suggests it may not be fully true) (empty field, 3 lines)
- Section: Cognitive distortion identification
  - Common distortions list (all-or-nothing, catastrophizing, mind reading, should statements, personalization, emotional reasoning, overgeneralization, filtering)
  - Which distortions do I notice? (empty field)

### Page 3
- Section: Developing a balanced thought
  - Balanced thought field (empty, larger writing space)
  - How much do you believe the balanced thought? (0-100%) (empty field)
  - Alternative perspective: What would I say to a friend? (empty field)
  - What would a compassionate observer say? (empty field)

### Page 4
- Section: Action plan
  - What is one small step I can take based on the balanced thought? (empty field)
  - How do I feel now compared to before? (empty field)
  - What do I want to remember next time this thought arises? (empty field)
- Safety section
- Emergency contacts template
- Footer with tool ID and route

## Safety Requirements
- When to use: Recurring negative automatic thoughts, cognitive distortions identified, stuck in rumination, between therapy sessions
- When to stop: Thought examination leads to self-blame, increased distress without relief, reinforcing rather than challenging the thought
- When not appropriate: Active crisis, thought content involves active suicidal ideation (seek immediate help), severe dissociation
- When additional support needed: Cannot find any evidence against the thought, balanced thought feels false/forced, thought relates to real ongoing danger
- Escalation language: "If this thought involves wanting to hurt yourself, please reach out for help now. You don't have to face this alone."

## Writing Fields
- Situation field (empty)
- Automatic thought field (empty)
- Belief rating field (empty)
- Emotion field (empty)
- Emotion intensity field (empty)
- 3 evidence FOR fields (empty)
- 3 evidence AGAINST fields (empty)
- Distortion identification field (empty)
- Balanced thought field (empty)
- Belief in balanced thought field (empty)
- Friend perspective field (empty)
- Compassionate observer field (empty)
- Action step field (empty)
- Feeling comparison field (empty)
- Remember field (empty)
- Emergency contact fields (3 lines)
- ALL fields MUST be empty

## Non-Writing Elements
- Belief rating scale (0-100%)
- Emotion intensity scale (0-10)
- Cognitive distortions list (reference card)
- Section dividers with step numbers
- Safety alert box (amber)
- Teal highlight for balanced thought section
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
- Route: /recovery/trc/thought-reframing/printable
- Footer Tool ID: TRC-Thought-Reframing
- Next step: shame-recovery (Shame Recovery)

## Clinical Reference
- TF-CBT Cognitive Restructuring — Beck, J.S. (2011). Cognitive Behavior Therapy
- CBT Thought Records — Greenberger & Padesky (1995). Mind Over Mood
- Burns, D.D. (1980). Feeling Good: The New Mood Therapy

## Status
- Production: clinical-review
- Clinical Review: REQUIRED
- Filename AR: TRC-Thought-Reframing-AR.html
- Filename EN: TRC-Thought-Reframing-EN.html
