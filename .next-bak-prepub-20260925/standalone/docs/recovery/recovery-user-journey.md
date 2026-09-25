# Recovery User Journey Map
**Date:** 2025-07-31
**Purpose:** Map the complete user journey from discovery to engagement for both Recovery programs

---

## Journey 1: Porn Recovery User

### Current State (Broken)

```
User lands on Tamkinly
    → Sees: Home, Products, Apps, Quiz, Methodology, About
    → No Recovery visible
    → Only finds Recovery if they type "recovery" in search
    → OR if they read a specific blog article
    → OR if they know the direct URL
```

### Target State (Integrated)

```
ENTRY POINTS
═════════════

1. Quiz Path
   Identity Gap Quiz
   → Score shows "compulsive behavior" or "identity gaps"
   → Results page recommends: "برنامج التعافي من الإباحية"
   → Link: /recovery/porn-recovery

2. Homepage Path
   Homepage
   → Feature card: "رحلة التعافي"
   → Brief description + CTA
   → Link: /recovery

3. Navigation Path
   Header → Recovery
   → Recovery Hub (two cards)
   → Porn Recovery card

4. Footer Path
   Footer → Recovery
   → Recovery Hub

5. Apps Path
   Apps page
   → "Recovery Tools" section
   → HALT, Trigger Journal, Emergency Plan
   → Link: /recovery/porn-recovery#toolkit

6. Blog Path
   Blog article about behavior change
   → Contextual link: "ابدأ رحلة التعافي"
   → Link: /recovery/porn-recovery

JOURNEY FLOW
════════════

Recovery Hub
│
└── Porn Recovery (/recovery/porn-recovery)
    │
    ├── Hero — "افهم ما يحدث داخل عقلك"
    │   └── CTA: "ابدأ الرحلة" → scrolls to Recognition
    │
    ├── Recognition — الاعتراف
    │   └── Progress: "أكملت الخطوة الأولى"
    │
    ├── Brain — الدماغ والسلوك
    │   └── Insight: "الدماغ يتغير"
    │
    ├── Failed Attempts — إعادة التأطير
    │   └── Reframe: "ليس فشلاً"
    │
    ├── Framework — الإطار المرحلي
    │   └── 4 stages overview
    │
    ├── Toolkit — الأدوات العملية
    │   ├── HALT Check → Download REC-01
    │   ├── Trigger Journal → Download REC-02
    │   └── Emergency Plan → Download REC-03
    │
    ├── Relapse — التعامل مع الانتكاس
    │   └── 3 interactive scenarios
    │
    ├── Identity — إعادة بناء الهوية
    │   └── 4 identity cards → Download REC-10
    │
    ├── Future Self — الذات المستقبلية
    │   └── 4 future identities → Download REC-11
    │
    └── CTA — دعوة للعمل
        ├── Print / Share / Donate
        └── Suggested: "ابدأ أوراق العمل التفاعلية"

DOWNLOADS PAGE
══════════════
/recovery/porn-recovery/downloads
├── REC-01: HALT Worksheet
├── REC-02: Trigger Journal
├── REC-03: Emergency Plan
├── REC-04: Recovery Review
├── REC-05: Pattern Recognition
├── REC-06: Recovery Loop Map
├── REC-07: Reframe
├── REC-08: Stage Assessment
├── REC-09: Relapse Scenario Review
├── REC-10: Identity Cards
└── REC-11: Future Self Letter

FUTURE TOOLS (Not built yet)
════════════════════════════
├── Urge Log (interactive worksheet)
├── Relapse Analysis (interactive worksheet)
└── Recovery Planning (interactive worksheet)
```

---

## Journey 2: TRC User (Trauma Recovery)

### Current State (Broken)

```
User lands on Tamkinly
    → No Recovery visible
    → No way to discover Grounding, A52, Safe Place, Body Scan
    → Only finds TRC if they type "trauma" or "صدمة" in search
```

### Target State (Integrated)

```
ENTRY POINTS
═════════════

1. Quiz Path
   Identity Gap Quiz
   → Score shows "emotional dysregulation" or "trauma symptoms"
   → Results page recommends: "مركز التعافي من الصدمات"
   → Link: /recovery/trc

2. Homepage Path
   Homepage
   → Feature card: "مركز التعافي من الصدمات"
   → Brief description + CTA
   → Link: /recovery

3. Navigation Path
   Header → Recovery
   → Recovery Hub (two cards)
   → TRC card

4. Blog Path
   Blog article about vagus nerve / breathing
   → Contextual link: "جرّب تقنية التنفس A52"
   → Link: /recovery/trc/a52

JOURNEY FLOW (Safety Path)
═══════════════════════════

Recovery Hub
│
└── TRC Hub (/recovery/trc)
    │
    ├── Article: "ماذا يفعل الصدمة بالجسم"
    │   └── Psychoeducation → nextStep: Grounding
    │
    ├── Grounding 5-4-3-2-1 (Beginner, 3-5 min)
    │   ├── SafetyResponse (program="trc")
    │   ├── MedicalDisclaimer
    │   └── nextStep: A52
    │
    ├── A52 Breathing (Beginner, 3-5 min)
    │   ├── SafetyResponse (program="trc")
    │   ├── MedicalDisclaimer
    │   └── nextStep: Safe Place
    │
    ├── Safe Place (Beginner, 5-10 min)
    │   ├── SafetyResponse (program="trc")
    │   ├── MedicalDisclaimer
    │   └── nextStep: Body Scan
    │
    └── Body Scan (Beginner, 10-15 min)
        ├── SafetyResponse (program="trc")
        ├── MedicalDisclaimer
        └── nextStep: Trigger Mapping (Wave 2)

DOWNLOADS PAGE
══════════════
/recovery/trc/downloads
├── Grounding Pocket Card (planned)
├── A52 Breathing Card (planned)
├── Safe Place Worksheet (planned)
├── Body Awareness Worksheet (planned)
└── Psychoeducation PDF (planned)

WAVE 2 (Not built yet)
═══════════════════════
├── Trigger Mapping (worksheet)
├── Safety Plan (worksheet)
├── Regulation Toolkit (tool)
└── "What Happens During Trauma Responses" (article)
```

---

## Cross-Point Analysis

### Where the two journeys should NEVER cross

| Point | Porn Recovery | TRC | Crossing Allowed? |
|-------|--------------|-----|-------------------|
| Quiz Results | "compulsive behavior" → PR | "trauma symptoms" → TRC | ❌ No |
| Suggested Next Step | PR → PR → PR | TRC → TRC → TRC | ❌ No |
| Downloads | REC-01 through REC-11 | TRC-specific files | ❌ No |
| SafetyResponse | PR escape routes | TRC escape routes | ❌ No |
| Navigation | PR sections | TRC tools | ❌ No |

### Where the two journeys share infrastructure

| Point | Shared Component | Reason |
|-------|-----------------|--------|
| Recovery Hub | Both programs appear as cards | Gateway selection |
| System components | RecoveryShell, RecoveryBreadcrumb, RecoveryCard | UI infrastructure |
| MedicalDisclaimer | Same component | Legal requirement |
| Search | Both appear in search results | Discovery |

---

## User Journey Metrics (Proposed)

### Porn Recovery
- **Discovery rate**: % of users who find PR from each entry point
- **Completion rate**: % who complete all 11 sections
- **Download rate**: % who download at least one PDF
- **Return rate**: % who return to PR after first visit

### TRC
- **Discovery rate**: % of users who find TRC from each entry point
- **Safety Path completion**: % who complete Grounding → A52 → Safe Place → Body Scan
- **Distress response rate**: % who trigger SafetyResponse during exercises
- **Article engagement**: % who read "What Trauma Does To The Body" before starting exercises

---

## Next Steps

1. Implement the Priority 1 actions from the Discovery Audit
2. Create the download pages for both programs
3. Add Recovery to the main navigation and footer
4. Add Quiz → Recovery recommendations
5. Then, and only then, start Wave 2

