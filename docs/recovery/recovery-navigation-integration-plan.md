# Recovery Navigation Integration Plan
**Date:** 2025-07-31
**Purpose:** Concrete plan for integrating Recovery into every touchpoint of Tamkinly

---

## Current State

Recovery is invisible to users. Discovery Score: 0.3/5 (6%).

---

## Phase 1: Navigation Integration (Immediate)

### 1.1 Header Navigation — Add Recovery Link

**Current nav links:** Home, Products, Apps, Quiz, Methodology, About, Contact, Resources, Blog
**Target:** Home, Products, Apps, Quiz, **Recovery**, Methodology, About, Contact, Resources, Blog

**Implementation:**
- Add Recovery link to the main navigation bar (between Quiz and Methodology)
- Icon: `Heart` or `Shield` (consistent with Recovery Hub)
- Label: `navigation.recovery` (AR: "التعافي", EN: "Recovery")
- Path: `/recovery`
- Mobile: Same link in mobile menu

**File:** `src/components/layout/Header.tsx`

### 1.2 Footer — Add Recovery Section

**Current footer sections:** Company (7 links), Products (4 links), Apps (5 links), Support (5 links)
**Target:** Add a **Recovery** section with 3 links:

| Link | Path | Description |
|------|------|-------------|
| Recovery Hub | /recovery | Main gateway |
| Porn Recovery | /recovery/porn-recovery | Behavioral change program |
| Trauma Recovery | /recovery/trc | Neural regulation program |

**File:** `src/components/layout/Footer.tsx`

### 1.3 Homepage — Add Recovery Feature Card

**Current:** No Recovery mention
**Target:** Add a Recovery feature card/section on the homepage

**Options:**
- A dedicated section with two cards (PR + TRC)
- A feature card in the existing features section
- A CTA banner

**Recommended:** A dedicated section similar to the existing "Apps" or "Methodology" section, with two cards showing the two programs.

**File:** `src/app/page.tsx`

---

## Phase 2: Smart Integration (High Priority)

### 2.1 Quiz Results → Recovery Recommendations

**Current:** Quiz results show identity gaps but no Recovery recommendations
**Target:** Add conditional Recovery recommendations based on quiz scores

**Logic:**
```
If user scores high on "compulsive behavior" indicators:
  → Recommend: Porn Recovery Program
  → Link: /recovery/porn-recovery

If user scores high on "emotional dysregulation" indicators:
  → Recommend: Trauma Recovery Center
  → Link: /recovery/trc

If user scores high on both:
  → Recommend: Recovery Hub (let them choose)
  → Link: /recovery
```

**File:** `src/app/quiz/results/page.tsx`

### 2.2 Dashboard → Recovery Widget

**Current:** Dashboard has no Recovery section
**Target:** Add a Recovery progress widget

**Content:**
- "Your Recovery Journey" section
- Show which program they're in (PR or TRC)
- Show last completed step
- Show next suggested step
- Link to the program

**File:** `src/app/dashboard/page.tsx`

### 2.3 Apps Page → Recovery Tools Section

**Current:** Apps page lists 16+ tools but no Recovery tools
**Target:** Add a "Recovery Tools" section

**Content:**
- "Recovery Tools" section with different visual treatment
- List: Grounding, A52, Safe Place, Body Scan, HALT, Trigger Journal, Emergency Plan
- Each with a "Recovery" badge
- Link to the appropriate program

**File:** `src/app/apps/page.tsx` or the apps listing component

---

## Phase 3: Content Integration (Medium Priority)

### 3.1 Blog Contextual Links

**Current:** 1 blog article links to Recovery
**Target:** Add contextual Recovery links in relevant articles

**Articles to update:**
- `vagus-nerve-breathing` → Add link to A52 (`/recovery/trc/a52`)
- `erq-emotional-regulation-worksheet` → Add link to TRC (`/recovery/trc`)
- `identity-based-habits-worksheet` → Add link to PR (`/recovery/porn-recovery`)
- Any article about behavior change → Add link to PR

### 3.2 Downloads Page → Recovery Section

**Current:** Downloads page shows only product-tier files
**Target:** Add a Recovery section to the Downloads page

**Content:**
- "Recovery Worksheets" section
- Show 11 REC files with bilingual download buttons
- Link to the full downloads page for each program

**File:** `src/app/downloads/page.tsx`

### 3.3 AI Coach → Recovery Awareness

**Current:** AI Coach has no Recovery knowledge
**Target:** Add Recovery context to AI Coach responses

**Implementation:**
- Add Recovery program descriptions to the AI Coach system prompt
- When user asks about "anxiety", "stress", "compulsive behavior", "trauma" → suggest Recovery tools
- Add deep links to specific Recovery tools

---

## Phase 4: Cleanup (Low Priority)

### 4.1 Remove Legacy /trc Route

**Current:** `/trc/grounding` exists alongside `/recovery/trc/grounding`
**Target:** Redirect `/trc/*` to `/recovery/trc/*`

### 4.2 Fix RecoveryCTA Routes

**Current:** CTA routes to `/quiz` and `/methodology`
**Target:** Routes to `/recovery/porn-recovery#hero` and `/recovery/porn-recovery#framework`

### 4.3 Add Recovery to /guides

**Current:** Guides page has no Recovery guides
**Target:** Add Recovery-related guides

---

## Implementation Timeline

| Phase | Tasks | Est. Time | Priority |
|-------|-------|-----------|----------|
| Phase 1 | Header + Footer + Homepage | 2-3 hours | P1 |
| Phase 2 | Quiz + Dashboard + Apps | 4-6 hours | P1 |
| Phase 3 | Blog + Downloads + AI Coach | 3-4 hours | P2 |
| Phase 4 | Cleanup | 1-2 hours | P3 |

**Total estimated effort: 10-15 hours**

---

## Success Metrics

After implementation, a user should be able to discover Recovery through:
- ✅ Header navigation (visible link)
- ✅ Footer (Recovery section)
- ✅ Homepage (feature section)
- ✅ Quiz results (conditional recommendations)
- ✅ Dashboard (progress widget)
- ✅ Apps page (Recovery tools section)
- ✅ Downloads page (Recovery section)
- ✅ Blog articles (contextual links)
- ✅ Search (already working)

**Target Discovery Score: 4.0/5 (80%)**

