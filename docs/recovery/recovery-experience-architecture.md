# Recovery Experience Architecture — R1

## Overview

This document describes the Recovery Experience Layer architecture implemented in Phase R1.
The goal: transform Recovery from a collection of pages into two independent recovery journeys
with clear methodology, user state, step sequencing, and Next Best Step engine.

---

## 1. Domain Separation

### HARD RULE: Two completely independent programs

| Aspect | Porn Recovery | TRC (Trauma Recovery) |
|--------|--------------|----------------------|
| Methodology | 5-stage psychoeducational | 3-stage clinical |
| Tone | Brotherly, direct, practical | Safe, validating, clinical |
| Safety Level | Standard (no contraindications) | Therapeutic (mandatory safety protocols) |
| Stages | Awareness → Protection → Replacement → Support → Resilience | Safety → Regulation → Integration |
| Steps | 8 interactive steps | 4 available (8+ planned) |
| Downloads | REC-01 → REC-11 (22 bilingual PDFs) | Planned |
| Color | #3DD4B0 (Mint) | #1F6F78 (Teal) |
| State | PornRecoveryState (localStorage) | TrcState (localStorage) |
| Completion | → Identity Transformation | → Identity Transformation |

**Shared infrastructure ONLY**: navigation, registry, persistence, download, testing, SuggestedNextStep, completion.

**FORBIDDEN**: Cross-domain content references, shared therapeutic tools, mixed terminology.

---

## 2. Porn Recovery Journey

### Stage Model (from framework)
```
Awareness          →  Understand the pattern
  ├── Recognition       Self-recognition interactive cards
  ├── Brain Cycle       5-step trigger→urge→response→relief→repeat
  └── Failed Attempts   Reframe old attempts as data

Protection         →  Build recovery systems
  ├── Framework         4-stage methodology + stage assessment
  └── Toolkit           HALT + Trigger Journal + Emergency Plan

Replacement        →  Handle urges & triggers
  └── (Uses toolkit tools in action — HALT, Journal, Emergency)

Support            →  Understand relapse
  └── Relapse           3 scenarios: stress, trigger, stopped

Resilience         →  Reconstruct identity & maintain
  ├── Identity          4 identity cards + personal statement
  └── Future Self       Letter to future self

→ Identity Transformation
```

### Downloadable Tools Integration (REC-01 → REC-11)
| Tool | Step | Section |
|------|------|---------|
| REC-01 HALT | Toolkit | Immediate intervention |
| REC-02 Trigger Journal | Toolkit | Trigger tracking |
| REC-03 Emergency Plan | Toolkit | 10-minute crisis plan |
| REC-04 Recovery Review | Framework | Stage self-assessment |
| REC-05 Pattern Recognition | Brain | Behavioral cycle analysis |
| REC-06 Recovery Loop Map | Failed Attempts | Old vs new view mapping |
| REC-07 Reframe | Failed Attempts | Cognitive restructuring |
| REC-08 Stage Assessment | Framework | 4-stage progress check |
| REC-09 Relapse Review | Relapse | Scenario analysis worksheet |
| REC-10 Identity Cards | Identity | 4 identity dimensions |
| REC-11 Future Self | Future Self | Letter template |

---

## 3. TRC Journey

### Stage Model (from framework)
```
Safety & Stabilization    →  Must feel safe first
  ├── Grounding (5-4-3-2-1)    Sensory nervous system regulation
  ├── A52 Breathing            Combat breathing (5-2 pattern)
  ├── Safe Place               Visualization technique
  └── Body Scan                Guided body attention

Regulation                →  Understand triggers, build safety plan
  ├── Trigger Mapping          (Wave 2 — Planned)
  ├── Safety Plan              (Wave 2 — Planned)
  ├── Regulation Toolkit       (Wave 2 — Planned)
  └── Trauma Responses         (Wave 2 — Planned)

Integration               →  Build boundaries, find therapist, track milestones
  ├── Boundary Setting         (Wave 3 — Planned)
  ├── Therapist Selection      (Wave 3 — Planned)
  └── Recovery Milestones      (Wave 3 — Planned)

→ Identity Transformation
```

### Safety Protocols
- Dissociation: Stop → Ground → Return to basic exercise
- Freeze Response: No forcing → Gentle movement → Safety
- Panic Attack: A52 breathing → Grounding → Stop if persists
- Intrusive Memories: Safe Place → Body scan → Stop if intensifying

### Contraindications
- Suicidal ideation → Crisis resources, not self-guided tools
- Active PTSD with severe dissociation → Professional care first
- Recent trauma (< 3 months) → Stabilization only

---

## 4. Recovery State Model

### PornRecoveryState
```typescript
interface PornRecoveryState {
  program: 'porn-recovery';
  startedAt: string;
  lastActivity: string;
  currentStepId: string | null;
  currentStageId: string | null;
  steps: Record<string, PornRecoveryStepState>;
  completedSteps: string[];
  totalProgress: number;       // 0-100
  completionState: 'not-started' | 'in-progress' | 'completed';
  completedAt: string | null;
  downloadedTools: string[];
  identityData: { selectedCards, personalStatement, savedAt } | null;
  toolkitData: { halt, journal } | null;
  nextRecommendedStep: string | null;
}
```

### TrcState
```typescript
interface TrcState {
  program: 'trc';
  startedAt: string;
  lastActivity: string;
  currentStepId: string | null;
  currentStageId: string | null;
  steps: Record<string, TrcStepState>;
  completedSteps: string[];
  totalProgress: number;
  completionState: 'not-started' | 'in-progress' | 'completed';
  completedAt: string | null;
  downloadedTools: string[];
  safetyStageCompleted: boolean;  // Gate for Regulation stage
  nextRecommendedStep: string | null;
}
```

### Storage
- **PornRecoveryState**: `localStorage['tamkinly_pr_state']`
- **TrcState**: `localStorage['tamkinly_trc_state']`
- **Discovery flag**: `localStorage['tamkinly_recovery_discovered']`
- **Upgrade path**: Designed for Prisma migration when backend is ready

---

## 5. Next Best Step Engine

### Rules
- If current step is not completed → recommend completing it
- If current step is completed → recommend next step in sequence
- If all available steps completed → recommend Identity Transformation
- For TRC: Safety stage must complete before Regulation tools
- For planned steps (Wave 2+) → show "Coming soon" instead of navigation

### Dynamic vs Static
- **Before R1**: SuggestedNextStep was static links
- **After R1**: Recommendations based on user state (completedSteps, currentStepId)

---

## 6. Completion Model

### Porn Recovery Completion
1. "You completed the Recovery Path"
2. "What changed?" — reflection prompt
3. "What should you maintain?" — 4 maintenance items
4. "Are you ready for Identity Transformation?" — CTA (not automatic)
5. Donation prompt (voluntary, not forced)

### TRC Completion (Safety Stage)
1. "You completed the Safety & Stabilization stage"
2. "Which tool helped you most?" — reflection
3. "What do you maintain?" — 4 daily practice items
4. "Ready to continue within Tamkinly?" — CTA
5. Donation prompt (voluntary, not forced)

### CRITICAL: Transition is NOT automatic
User chooses when to move to Identity Transformation.

---

## 7. Download Integration Model

### Before R1
PDFs were a library in `/downloads/` page — disconnected from journey.

### After R1
Each PDF is part of its section:
```
Section
  → Why this tool exists
  → Use / Download
  → Mark as completed
  → Next Step
```

### Domain Isolation
- Porn Recovery PDFs (REC-01→REC-11) → ONLY in Porn Recovery domain
- TRC PDFs → ONLY in TRC domain
- NEVER cross-domain PDF references

---

## 8. Discovery Points

| Point | Location | Mechanism |
|-------|----------|-----------|
| Header nav | Global header | "Recovery" link |
| Homepage | Main page | Recovery section between Self-ID and Quiz |
| Apps page | /apps | "Recovery Programs" category |
| Quiz results | /quiz/results | Conditional (emotionalRegulation < 40) |
| Dashboard | /dashboard | Conditional (tamkinly_recovery_discovered) |
| Footer | Global footer | Recovery link |
| Recovery Hub | /recovery | Entry point with path guidance |

### UX Principle
User reaches Recovery naturally, without feeling the site is "selling" an extra product.
Recovery is a foundational path for those who need it.

---

## 9. Donation Placement

### Where donations appear
- ✅ Recovery Completion screen (both programs)
- ✅ General Recovery Hub page (bottom)

### Where donations NEVER appear
- ❌ Inside therapeutic tools
- ❌ During exercises (grounding, breathing, body scan)
- ❌ In HALT/Journal/Emergency Plan
- ❌ In any safety-critical moment
- ❌ As a paywall or subscription gate

### Wording
"إذا وجدت فائدة في هذه الموارد، وساعدتك فكرة أو أداة أو ورقة عمل، يمكنك المساهمة في دعم تطوير موارد تعافٍ مجانية لمستخدمين آخرين."

---

## 10. Identity Transformation Handoff

### Flow
```
Recovery Complete
  → "Are you ready?"
  → User clicks CTA
  → /quiz (Identity Transformation entry)
```

### Not automatic
- No forced redirect
- No timer or popup
- User explicitly chooses to continue
- Can return to Recovery anytime

---

## 11. Rules Preventing Cross-Domain Contamination

1. **State isolation**: PornRecoveryState ≠ TrcState (different localStorage keys)
2. **Journey isolation**: PORN_RECOVERY_STEPS ≠ TRC_STEPS (different arrays)
3. **Next step isolation**: getPornRecoveryNextStep() ≠ getTrcNextStep() (different engines)
4. **Download isolation**: REC-* only in Porn Recovery; TRC downloads only in TRC
5. **Language isolation**: No Porn Recovery terms in TRC UI; No TRC clinical terms in Porn Recovery
6. **Color isolation**: Porn Recovery = #3DD4B0, TRC = #1F6F78
7. **Safety isolation**: TRC has SafetyResponse + TherapeuticExit; Porn Recovery does not
8. **Registry isolation**: porn-recovery-assets.ts ≠ trc-assets.ts (separate files)

---

## 12. No Gamification

- ✅ Progress tracking (clinical, not rewards)
- ✅ Step completion markers
- ✅ Time estimates per step
- ❌ NO points, badges, streaks, levels, XP, competitive ranking
- ❌ NO "Day X" counters or streak displays
- ❌ NO social comparison or leaderboards

---

## Files Modified/Created

### New Files
- `src/lib/recovery-journey.ts` — Journey model (stages, steps, sequences)
- `src/lib/recovery-state.ts` — State layer (PornRecoveryState, TrcState)
- `src/lib/next-step-engine.ts` — Next Best Step engine
- `src/hooks/useRecoveryState.ts` — React hooks for state
- `src/app/recovery/porn-recovery/journey/page.tsx` — PR journey page
- `src/app/recovery/trc/journey/page.tsx` — TRC journey page
- `src/components/recovery/system/EnhancedSuggestedNextStep.tsx` — Dynamic next step

### Modified Files
- `src/app/recovery/page.tsx` — Enhanced hub with path guidance
- `src/app/recovery/trc/page.tsx` — Enhanced entry with journey state
- `src/components/recovery/RecoveryPage.tsx` — Journey state integration
- `src/components/recovery/RecoveryCompletion.tsx` — Real completion + handoff
- `src/components/recovery/RecoveryDonation.tsx` — Proper Arabic wording
- `src/components/recovery/RecoveryEligibilityNotice.tsx` — Journey integration
- `src/components/recovery/SectionDownloadButton.tsx` — Journey-aware downloads
- `messages/ar.json` — New recoveryJourney keys
- `messages/en.json` — New recoveryJourney keys
