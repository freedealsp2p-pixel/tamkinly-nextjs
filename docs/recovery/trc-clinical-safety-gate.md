# TRC Clinical Safety Gate Audit Report

> **Status**: clinical-review — clinically hardened, awaiting qualified human clinical review  
> **Audit Date**: 2026-03-05  
> **Auditor**: Agent Swarm 3 (Clinical Safety Gate Auditor)  
> **Scope**: All 9 TRC assets across safety, regulation, and psychoeducation layers

---

## Executive Summary

This audit evaluates clinical safety features across all Trauma Recovery Center (TRC) assets against evidence-based best practices from SAMHSA, Stanley-Brown, trauma-informed design guidelines, and peer-reviewed literature on digital mental health tools.

**Result**: 5 CRITICAL, 8 IMPORTANT, 7 ENHANCEMENT gaps identified.

The TRC platform demonstrates a strong safety architecture foundation — SafetyResponse, TherapeuticExit, and MedicalDisclaimer components are well-implemented and present on most pages. However, several critical gaps exist around contraindication display, dissociation/panic runtime protocols, and psychoeducation distress handling.

---

## PART 1: Code Audit — Per-Page Results

### 1.1 Grounding (5-4-3-2-1)

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ✅ PASS | Present with `program="trc"`, `assetId="grounding-54321"` |
| MedicalDisclaimer | ✅ PASS | Imported from system, rendered on page |
| Contraindications in model | ✅ PASS | Listed: `['نوبة هلع نشطة', 'تفارق شديد']` |
| Contraindications shown to user | ❌ FAIL | Not displayed in entry screen or intro |
| Distress handling | ✅ PASS | SafetyResponse: stop now / simpler exercise / read instead |
| Dissociation protocol | ❌ FAIL | No runtime dissociation detection or response |
| Freeze response handling | ❌ FAIL | Not acknowledged in interactive flow |
| Panic handling | ❌ FAIL | No panic-specific protocol (listed in contraindications only) |
| Intrusive memories handling | ❌ FAIL | No runtime handling |
| Safe exit (TherapeuticExit) | ✅ PASS | Present, Escape key support |
| Staged approach | ✅ PASS | Can return to any phase via state |

### 1.2 A52 Breathing

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ✅ PASS | Present with `program="trc"`, `assetId="a52"` |
| MedicalDisclaimer | ✅ PASS | Present in EntryScreen component |
| Contraindications in model | ✅ PASS | Listed: `['COPD/ربو حاد', 'نوبة هلع نشطة', 'تفارق شديد', 'إصابة صدرية حديثة', 'حالات قلبية غير مستقرة']` |
| Contraindications shown to user | ❌ FAIL | Not displayed before exercise begins |
| Distress handling | ✅ PASS | SafetyResponse provides 3 exit options |
| Dissociation protocol | ❌ FAIL | No runtime dissociation detection |
| Freeze response handling | ❌ FAIL | Not handled |
| Panic handling | ❌ FAIL | Listed in contraindications but no runtime protocol |
| Intrusive memories handling | ❌ FAIL | No runtime handling |
| Safe exit (TherapeuticExit) | ✅ PASS | Present |
| Staged approach | ✅ PASS | EARLY_EXIT action, can repeat, partial completion tracked |

### 1.3 Safe Place Visualization

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ✅ PASS | Present with `program="trc"`, `assetId="safe-place"` |
| MedicalDisclaimer | ✅ PASS | Present in EntryScreen |
| Contraindications in model | ✅ PASS | Listed: `['تفارق شديد', 'ذكريات اقتحامية نشطة', 'رهاب الخلاء/الأماكن المغلقة']` |
| Contraindications shown to user | ❌ FAIL | Not displayed |
| Distress handling | ✅ PASS | SafetyResponse provides exit options |
| Dissociation protocol | ❌ FAIL | No runtime dissociation detection |
| Freeze response handling | ❌ FAIL | Not handled |
| Panic handling | ❌ FAIL | No panic protocol |
| Intrusive memories handling | ❌ FAIL | Listed in contraindications only, no runtime |
| Safe exit (TherapeuticExit) | ✅ PASS | Present |
| Staged approach | ✅ PASS | Can repeat, intermediate state preserved |

### 1.4 Body Scan

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ✅ PASS | Present with `program="trc"`, `assetId="body-scan"` |
| MedicalDisclaimer | ✅ PASS | Present in EntryScreen |
| Contraindications in model | ✅ PASS | Listed: `['تفارق شديد', 'اضطراب تشوه الجسم', 'صدمة جسدية/جنسية حديثة', 'ألم مزمن حاد']` |
| Contraindications shown to user | ❌ FAIL | Not displayed |
| Distress handling | ✅ PASS | SafetyResponse provides exit options |
| Dissociation protocol | ❌ FAIL | No runtime dissociation detection — CRITICAL for body scan |
| Freeze response handling | ❌ FAIL | Not handled |
| Panic handling | ❌ FAIL | No panic protocol |
| Intrusive memories handling | ❌ FAIL | No runtime handling |
| Safe exit (TherapeuticExit) | ✅ PASS | Present |
| Staged approach | ✅ PASS | Has pause, go back, can resume |

### 1.5 Trigger Mapping

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ✅ PASS | Present with `program="trc"` |
| MedicalDisclaimer | ✅ PASS | Present |
| Contraindications in model | ⚠️ WARN | Empty array `[]` in registry — should include acute trauma |
| Contraindications shown to user | ❌ FAIL | Not displayed (regulation-toolkit shows them, worksheet does not) |
| Distress handling | ✅ PASS | SafetyResponse provides exit options |
| Dissociation protocol | ❌ FAIL | No runtime handling |
| Freeze response handling | ❌ FAIL | Not handled |
| Panic handling | ❌ FAIL | No panic protocol |
| Intrusive memories handling | ❌ FAIL | No runtime handling |
| Safe exit (TherapeuticExit) | ✅ PASS | Present |
| Staged approach | ✅ PASS | localStorage persistence of entries and current entry |

### 1.6 Safety Plan

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ✅ PASS | Present with `program="trc"` |
| MedicalDisclaimer | ✅ PASS | Present |
| Contraindications in model | ⚠️ WARN | Empty array — should note acute crisis redirect |
| Contraindications shown to user | N/A | Planning tool, low safetyLevel |
| Distress handling | ✅ PASS | SafetyResponse + explicit distress steps in plan |
| Dissociation protocol | ⚠️ PARTIAL | Dissociation listed as professional help criterion |
| Freeze response handling | ❌ FAIL | Not explicitly handled |
| Panic handling | ⚠️ PARTIAL | Panic listed as professional help criterion |
| Intrusive memories handling | ⚠️ PARTIAL | Flashbacks listed as professional help criterion |
| Safe exit (TherapeuticExit) | ✅ PASS | Present |
| Staged approach | ✅ PASS | localStorage persistence, multi-step with back navigation |

### 1.7 Regulation Toolkit

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ✅ PASS | Present with `program="trc"` |
| MedicalDisclaimer | ✅ PASS | Present |
| Contraindications in model | ✅ PASS | Shown via `dontUseWhenAr/dontUseWhenEn` fields |
| Contraindications shown to user | ✅ PASS | Displayed in tool detail cards |
| Distress handling | ✅ PASS | State-based routing to appropriate tools |
| Dissociation protocol | ✅ PASS | "Disconnected" state routes to grounding first |
| Freeze response handling | ⚠️ PARTIAL | Not a named state, but "disconnected" partially covers it |
| Panic handling | ⚠️ PARTIAL | "Activated" state routes to appropriate tools |
| Intrusive memories handling | ✅ PASS | "Intrusive" state routes to grounding + breathing + safe-place + safety-plan |
| Safe exit (TherapeuticExit) | ✅ PASS | Present |
| Staged approach | ✅ PASS | Can return later, state-based selection |

### 1.8 What Trauma Does to the Body (Psychoeducation)

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ❌ FAIL | **NOT PRESENT** — reading about trauma can activate nervous system |
| MedicalDisclaimer | ✅ PASS | Present |
| Contraindications in model | ⚠️ WARN | Empty array — should include acute distress |
| Contraindications shown to user | ❌ FAIL | Not displayed |
| Distress handling | ⚠️ PARTIAL | "Try grounding" link at bottom — not sufficient |
| Dissociation protocol | ❌ FAIL | No handling |
| Freeze response handling | ❌ FAIL | No handling |
| Panic handling | ❌ FAIL | No handling |
| Intrusive memories handling | ❌ FAIL | No handling |
| Safe exit (TherapeuticExit) | ❌ FAIL | Not present (psychoeducation, but still trauma content) |
| Staged approach | ✅ PASS | Can read partially and return |

### 1.9 Trauma Responses (what-happens-during-trauma-responses)

| Check | Status | Notes |
|-------|--------|-------|
| SafetyResponse | ✅ PASS | Present with `program="trc"`, `assetId="trc-trauma-responses"` |
| MedicalDisclaimer | ✅ PASS | Present |
| Contraindications in model | ⚠️ WARN | Listed `['severe-dissociation', 'active-flashbacks']` but only in trauma-responses asset (planned) |
| Contraindications shown to user | ❌ FAIL | Not displayed in UI |
| Distress handling | ✅ PASS | SafetyResponse + explicit "If activated now" CTA section |
| Dissociation protocol | ⚠️ PARTIAL | Discussed in content as 5th response, no runtime protocol |
| Freeze response handling | ⚠️ PARTIAL | Discussed in content, no runtime protocol |
| Panic handling | ❌ FAIL | No runtime panic protocol |
| Intrusive memories handling | ❌ FAIL | No runtime handling |
| Safe exit (TherapeuticExit) | ✅ PASS | Present |
| Staged approach | ✅ PASS | Can read partially and return |

---

## PART 2: Best Practices from Web Research

### 2.1 Trauma Recovery Tool Clinical Safety Requirements

**Sources**: Abdulai et al. (2023) PMC; SAMHSA Trauma-Informed Approaches; Lowery et al. (2024)

Key findings:
- **Safety as the first priority**: SAMHSA's first principle is Safety — both physical and psychological. Every interaction must begin with establishing safety.
- **Three-phase model required**: Herman's model (Safety → Remembrance/Mourning → Reconnection) is the evidence-based standard. Our TRC Safety→Regulation→Integration aligns well.
- **Digital tools must have exit mechanisms**: Trauma-informed design guidelines require "clear exit/logout and help links consistently displayed" (1800RESPECT, 2023).
- **Informed consent required**: Users must understand what the tool does, potential risks, and what to do if distressed before starting.
- **Professional referral pathway**: Every digital trauma tool must include a clear pathway to professional help.

### 2.2 Trigger Mapping Worksheet Best Practices

**Sources**: Therapist Aid; Clinical Guide to Triggers Worksheets; CBT Trigger Analysis

Key findings:
- **Pre-mapping safety check**: Trigger mapping should always be preceded by a safety/stabilization check. Users should not map triggers while in acute distress.
- **Contraindications explicit**: Trigger mapping during acute trauma (<2 weeks post-event) is contraindicated — our regulation-toolkit notes this, but the worksheet itself does not.
- **Coping plan per trigger**: Best practice worksheets pair each identified trigger with a specific coping strategy — our WhatHelpedStep partially addresses this.
- **Gradual exposure**: Mapping should be done incrementally, not all at once — our step-by-step design supports this.

### 2.3 Safety Plan Evidence-Based (Stanley-Brown)

**Sources**: Stanley & Brown (2012); O'Connor et al. (2025); Moscardini et al. (2020)

Key findings:
- **Six-step framework**: Warning signs → Internal coping → Social contacts for distraction → Professional help → Making the environment safe → Reasons for living. Our implementation covers 5 of 6 (missing "Reasons for living" step).
- **Crisis hotline inclusion**: Stanley-Brown requires crisis numbers to be included in the plan. Our ProfessionalHelpStep should include crisis lines.
- **Lethal means counseling**: Making the environment safe (step 5) should include reducing access to lethal means — not directly applicable to sexual assault context but should be adapted.
- **The plan must be accessible when needed**: Plan should be downloadable/printable for access during crisis when digital access may be limited.

### 2.4 Grounding Exercise Contraindications

**Sources**: Verywell Mind; Healthline; Psychology Today

Key findings:
- **5-4-3-2-1 is widely recommended** for anxiety, panic, and dissociation — but with important caveats:
- **Sensory overload risk**: If senses themselves are triggering (e.g., hyperacusis after trauma), sensory grounding can worsen distress. Must offer alternative.
- **Dissociation caveat**: Grounding can help mild dissociation but may not be sufficient for severe dissociation. For severe cases, physical grounding (temperature, proprioception) is recommended over sensory.
- **Not a substitute for crisis care**: Grounding is a coping skill, not treatment. Must not be positioned as sufficient for acute crisis.

### 2.5 Trauma-Informed Design Guidelines for Digital Tools

**Sources**: 1800RESPECT; SAMHSA; PMC (Abdulai 2023); Trauma-Informed UX Content

Key findings:
- **6 SAMHSA principles**: Safety, Trustworthiness/Transparency, Peer Support, Collaboration/Mutuality, Empowerment/Voice/Choice, Cultural/Historical/Gender Issues
- **Clear exit/logout always visible**: Trauma-informed digital design requires persistent, visible exit mechanisms on every page (1800RESPECT guideline #1)
- **Data security priority**: Users must know their data is safe — especially critical for sexual assault survivors
- **Choice and control**: Users must feel in control at all times. No forced progression, no mandatory completion.
- **No retraumatization through design**: Language, imagery, and interactions must not inadvertently trigger trauma responses
- **Consistent help access**: Crisis resources must be available from every page, not just on specific screens

### 2.6 Sexual Assault Recovery Online Tool Safety Protocols

**Sources**: RAINN; Dutch First Aid Protocol; HelpGuide; 1800RESPECT

Key findings:
- **Crisis hotline integration**: RAINN standard (1-800-656-HOPE) — every page of a sexual assault recovery tool should have visible crisis access
- **Anonymity protection**: Sexual assault survivors often fear being identified. Tools must protect anonymity.
- **Gradual exposure model**: Recovery tools must follow a staged model — never push survivors to engage with trauma content before stabilization
- **Distress monitoring**: Evidence-based programs include periodic check-ins during exercises: "How are you feeling right now?" — if distress is high, the exercise pauses and offers alternatives
- **Safe containment**: Exercises must have clear "containment" at the end — a closing ritual that helps the user transition back to daily life (our CompletionScreen partially addresses this)

---

## PART 3: Gap Analysis

### CRITICAL Gaps (Must fix before release — safety risk)

| # | Gap | Affected Pages | Best Practice Reference | Recommendation |
|---|-----|----------------|------------------------|----------------|
| C1 | **Contraindications not shown to user before exercise starts** | Grounding, A52, Safe Place, Body Scan | Trauma-informed design: informed consent before therapeutic engagement; Abdulai 2023 | Display contraindications from registry in EntryScreen before "Start" button. User must acknowledge before proceeding. |
| C2 | **No SafetyResponse on psychoeducation page (what-trauma-does-to-the-body)** | What Trauma Does to the Body | 1800RESPECT: "clear exit and help links consistently displayed"; reading about trauma can activate nervous system | Add SafetyResponse + TherapeuticExit to the psychoeducation page |
| C3 | **No dissociation runtime protocol for body scan** | Body Scan | Britton et al.: "long meditation sessions and body scans might overwhelm and trigger flashbacks"; 15-30% of PTSD has dissociative subtype | Add periodic distress check-ins during body scan. If dissociation indicators detected, pause and redirect to grounding. |
| C4 | **No distress monitoring during exercises** | Grounding, A52, Safe Place, Body Scan | Evidence-based digital mental health: periodic "How are you feeling?" check-ins; if distress is high, pause and offer alternatives | Add mid-exercise distress check (e.g., after each grounding sense, after each breathing cycle, during body scan body parts) |
| C5 | **No crisis hotline visible on every page** | All TRC pages | RAINN standard; Stanley-Brown safety plan; 1800RESPECT guidelines | Add persistent crisis resource footer/strip visible on all TRC pages |

### IMPORTANT Gaps (Should fix — clinical quality)

| # | Gap | Affected Pages | Best Practice Reference | Recommendation |
|---|-----|----------------|------------------------|----------------|
| I1 | **Trigger mapping has empty contraindications array** | Trigger Mapping | Clinical best practice: trigger mapping is contraindicated within 2 weeks of acute trauma | Add contraindications: `['حدث صدمة حديث (أقل من أسبوعين)', 'ضيق حاد حالي']` |
| I2 | **Safety plan missing "Reasons for living" step** | Safety Plan | Stanley-Brown 6-step framework (Step 6) | Add a "Reasons for living / Things that matter" step to the safety plan flow |
| I3 | **Safety plan missing crisis hotline integration** | Safety Plan | Stanley-Brown: crisis numbers must be included | Add local crisis hotline numbers (Arabic: regional; English: RAINN 1-800-656-HOPE) to ProfessionalHelpStep |
| I4 | **No freeze response handling in any exercise** | All interactive exercises | Freeze is one of the 4F trauma responses; freeze during exercise = user stops responding but hasn't exited | Add freeze detection (no interaction for >60s during active phase) → gentle check-in prompt |
| I5 | **Body scan contraindication for recent sexual trauma not shown** | Body Scan | Body scan directs attention to body — contraindicated for recent sexual trauma | Display "If you've experienced recent sexual trauma, consider starting with grounding first" before body scan begins |
| I6 | **A52 COPD/cardiac contraindications not displayed** | A52 Breathing | Clinical safety: breath-holding contraindicated for COPD, unstable cardiac conditions | Show medical contraindications before A52 starts (COPD, recent chest injury, unstable cardiac) |
| I7 | **No printable/downloadable version of safety plan** | Safety Plan | Stanley-Brown: plan must be accessible during crisis when digital access may be limited | Add PDF download of completed safety plan |
| I8 | **What-trauma-does-to-the-body missing TherapeuticExit** | What Trauma Does to the Body | Trauma-informed design: persistent exit on all trauma-content pages | Add TherapeuticExit component |

### ENHANCEMENT Gaps (Nice to have — better practice)

| # | Gap | Affected Pages | Best Practice Reference | Recommendation |
|---|-----|----------------|------------------------|----------------|
| E1 | **No peer support / community connection** | All TRC | SAMHSA Principle 3: Peer Support | Consider adding moderated peer support links or community resources |
| E2 | **No cultural/historical sensitivity adaptation** | All TRC | SAMHSA Principle 6: Cultural, Historical, and Gender Issues | Add culturally-adapted content notes, especially for Arab/Muslim context |
| E3 | **No progress sharing with therapist** | All TRC | Trauma-informed care: collaboration with treatment team | Consider therapist-facing summary/report export |
| E4 | **No data security transparency messaging** | All TRC | 1800RESPECT: "Make data security a priority" | Add visible data privacy/security messaging (localStorage-only, no server storage of therapeutic data) |
| E5 | **Regulation toolkit doesn't cover "freeze" as named state** | Regulation Toolkit | Freeze is a distinct trauma response | Add "frozen/stuck" as a named user state alongside overwhelmed, activated, disconnected, intrusive |
| E6 | **No exercise completion containment ritual** | Grounding, A52, Body Scan | Therapeutic best practice: closing containment helps transition back to daily life | Add a standardized "closing" step to all interactive exercises (brief centering, reminder of current time/place) |
| E7 | **No session duration/time awareness** | All interactive | Users in trauma states may lose time awareness | Add visible elapsed time indicator and periodic "You've been here X minutes" gentle reminders |

---

## Compliance Scorecard

| Principle (SAMHSA) | Current Compliance | Gaps |
|---------------------|-------------------|------|
| 1. Safety | 75% | Missing contraindication display, psychoeducation SafetyResponse, distress monitoring |
| 2. Trustworthiness & Transparency | 70% | Missing informed consent (contraindications), data security messaging |
| 3. Peer Support | 10% | No peer support features |
| 4. Collaboration & Mutuality | 60% | Missing therapist collaboration, no progress sharing |
| 5. Empowerment, Voice & Choice | 85% | Strong exit mechanisms, staged approach; missing freeze detection |
| 6. Cultural, Historical & Gender Issues | 40% | Arabic-language support exists but no cultural adaptation notes |

---

## Recommendations Priority Order

1. **C1**: Add contraindication display to all EntryScreen components (before Start button)
2. **C2**: Add SafetyResponse + TherapeuticExit to what-trauma-does-to-the-body page
3. **C3**: Add dissociation protocol to body scan (periodic check-ins)
4. **C4**: Add mid-exercise distress monitoring to all interactive exercises
5. **C5**: Add persistent crisis hotline strip to TRC layout
6. **I1-I8**: Implement IMPORTANT gaps in next sprint
7. **E1-E7**: Plan ENHANCEMENT gaps for future roadmap

---

## Positive Findings (What's Working Well)

- **SafetyResponse component**: Well-designed with 3 exit options (stop, simpler exercise, read instead)
- **TherapeuticExit component**: Escape key support, confirmation dialog, RTL support
- **MedicalDisclaimer component**: Collapsible, warm tone, bilingual fallbacks
- **Registry model**: Contraindications, safety levels, and clinical references are properly modeled
- **Regulation toolkit**: State-based routing is evidence-aligned (matches SAMHSA safety principles)
- **Staged approach**: All exercises support partial completion and return
- **TRC journey sequence**: Safety→Regulation path follows Herman's phase-based model
- **Trauma-responses page**: "If activated now" CTA is excellent clinical design
- **Bilingual support**: Arabic/English throughout with RTL layout support

---

*This report uses the status "clinical-review" — meaning clinically hardened but awaiting qualified human clinical review. The term "clinically approved" is intentionally not used.*
