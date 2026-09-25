# TRC EFT Tapping — Final Specification

> **Asset ID:** `trc-eft-tapping`
> **Stage:** Regulation (Stage 2)
> **Section Type:** therapeutic (TherapeuticExit required)
> **Clinical Status:** clinical-review — requires clinical sign-off before public access
> **Source:** trc-master-map.md (asset 2.3), trc-framework.md (Principle 2, Principle 3)
> **Safety Level:** higher
> **Date:** 2026-03-05

---

## Asset Definition

| Field | Value |
|-------|-------|
| Asset ID | `trc-eft-tapping` |
| Title (AR) | تقنية EFT للنقر العصبي |
| Title (EN) | EFT Tapping Technique |
| Description (AR) | أداة ذاتية للتخفيف من شدة الاستجابات العاطفية عبر النقر على نقاط الجسد |
| Description (EN) | A self-help tool for reducing the intensity of emotional responses through body tapping |
| Stage | regulation |
| Route | `/recovery/trc/eft-tapping` |
| Completion Key | `tamkinly_trc_eft_done` |
| Downloadable | `trc-09-eft-self-help-worksheet` |
| isAvailable | true (clinical-review) |
| safetyLevel | higher |
| sectionType | therapeutic |
| Estimated Minutes | 10 |

---

## EFT Tapping Points (9 points)

| # | Code | English Name | Arabic Name | Location |
|---|------|-------------|-------------|----------|
| 1 | KC | Karate chop point | نقطة ضربة الكاراتيه | Side of hand, fleshy edge |
| 2 | EB | Beginning of eyebrow | بداية الحاجب | Inner edge of eyebrow, above nose |
| 3 | SE | Side of eye | جانب العين | Outer corner of eye |
| 4 | UE | Under eye | تحت العين | Under eye, on bone |
| 5 | UN | Under nose | تحت الأنف | Between nose and upper lip |
| 6 | CH | Chin | الذقن | Midpoint of chin |
| 7 | CB | Collarbone | عظمة الترقوة | Below collarbone, near sternum |
| 8 | UA | Under arm | تحت الإبط | 4 inches below armpit |
| 9 | TH | Top of head | قمة الرأس | Crown of head |

---

## Setup Phrase

**Arabic:** حتى وإن كان لدي [المشكلة]، فأنا أتقبّل نفسي بعمق وكليّة.

**English:** Even though I have [problem], I deeply and completely accept myself.

The setup phrase is repeated 3 times while tapping the karate chop point (side of hand).

---

## Reminder Phrase

The reminder phrase is a short version of the problem, spoken while tapping each point.

**Format:** [the problem/feeling in brief]

---

## SUDS Scale (Subjective Units of Distress Scale)

| Rating | Description |
|--------|-------------|
| 0 | No distress at all |
| 1-3 | Mild distress |
| 4-6 | Moderate distress |
| 7-9 | High distress |
| 10 | Maximum distress |

**IMPORTANT:** SUDS is for the user's self-awareness only. It is NOT a clinical assessment tool.

---

## Interactive Flow

### Phase Sequence:
1. **Entry** — Title, clinical-review badge, description, begin button
2. **Dissociation Screen** — MANDATORY safety gate (cannot be skipped)
3. **Safety** — SafetyResponse, MedicalDisclaimer, TherapeuticExit, contraindication notice
4. **Preparation** — Identify issue, rate intensity (SUDS), setup phrase, karate chop instruction
5. **Tapping Sequence** — Interactive 9-point sequence (5-7 taps per point), multiple rounds possible
6. **Reassessment** — Rate intensity again (SUDS), compare before/after
7. **Grounding Reset** — MANDATORY brief grounding (3 senses from 5-4-3-2-1)
8. **Completion** — Summary, next step, markStepCompleted

---

## Contraindications (from framework)

- **Active dissociation → STOP** — redirect to grounding immediately
- **Severe dissociation → STOP** — redirect to grounding immediately

EFT involves touching body points. If this causes distress, stop immediately and use grounding.

---

## Stop Criteria

1. **Intensity INCREASES after a round → STOP** — "This sometimes happens. Let's stop and use grounding." → redirect to `/recovery/trc/grounding`
2. **User feels disconnected at any point → STOP** — redirect to grounding
3. **Maximum 3 rounds recommended** (safety limit)

---

## Safety Protocols

### Dissociation Screening (MANDATORY — NON-NEGOTIABLE)
Before any EFT activity, the user must confirm they feel connected to their body:
- "Yes, I feel present" → Continue
- "I'm not sure" → Offer grounding exercise first
- "No, I feel disconnected" → STOP — redirect to `/recovery/trc/grounding`

### Grounding Reset (MANDATORY after EFT)
After any EFT session, a brief grounding is required:
- 5-4-3-2-1 brief version (3 senses only: sight, touch, sound)
- "This helps your nervous system settle after the tapping."

### Safety Components
- SafetyResponse program="trc" assetId="eft-tapping"
- MedicalDisclaimer program="trc"
- TherapeuticExit (always available)

---

## Clinical Review Requirement

This tool is marked as **clinical-review**:
- It MUST NOT be marked as "live" or "approved" without qualified clinical sign-off
- No clinical claims about PTSD, cortisol, or effectiveness are made unless sourced with citation
- SUDS is for self-awareness, NOT clinical assessment
- No gamification elements
- Max 3 rounds recommended (safety)

---

## What EFT Is (from source material)

EFT (Emotional Freedom Techniques) involves tapping on specific meridian points on the body while focusing on a distressing emotion or memory. The tapping is combined with a setup phrase that acknowledges the problem while affirming self-acceptance.

**From trc-framework.md Principle 2:** Trauma is stored in the body. EFT works with the body's energy system.

**From trc-framework.md Principle 3:** Grounding is a foundational tool. EFT must be preceded by grounding readiness check.

---

## What EFT Is NOT

- NOT a substitute for professional therapy
- NOT a clinical assessment tool
- NOT evidence of PTSD treatment effectiveness (no claims made)
- NOT gamified or scored
- NOT to be used during active dissociation

---

## localStorage

- `tamkinly_trc_eft_done` — completion flag
- `tamkinly_trc_eft_tapping_data` — saved session data (issue, SUDS before/after, rounds completed)

---

## i18n Namespace

`recoveryAssets.trcEftTapping.*`

---

## Dependencies

- Must complete Safety stage (grounding, A52 breathing) before access
- Route: `/recovery/trc/eft-tapping`
- Redirect for dissociation: `/recovery/trc/grounding`
- Next step in journey: `thought-reframing`

