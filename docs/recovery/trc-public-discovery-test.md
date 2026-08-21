# TRC Public Discovery Test Report

**Date:** 2026-03-05  
**Tester:** Agent Swarm 6  
**Project:** /var/www/tamkinly

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Entry points tested | 9 |
| Entry points with TRC links | 7 |
| Entry points without TRC links | 2 |
| TRC pages only reachable by direct URL | 3 |
| Critical discoverability gaps | 3 |

**Overall Verdict:** TRC is discoverable from most major entry points (7/9), but there are significant gaps in search discoverability and 3 orphaned pages that have no incoming links from anywhere in the app.

---

## Entry Point Analysis

### 1. Homepage (/)

| Field | Value |
|-------|-------|
| Link to TRC exists? | ✅ Yes |
| Link text | "Trauma Recovery" (from `t("recoveryTrauma")`) |
| Link href | `/recovery/trc` |
| Clicks to reach TRC | 1 |
| Descriptive? | ⚠️ Partial — Says "Trauma Recovery" with description: "An evidence-based therapeutic program with grounding, breathing, and safe place techniques" |
| Pages reachable | `/recovery/trc` only (TRC entry page) |

**Notes:** The RecoverySection on the homepage has a clear card linking to `/recovery/trc`. The card title is "Trauma Recovery" and includes a meaningful description. A new user can understand what this is. Also links to `/recovery` hub with "Explore Recovery" CTA.

---

### 2. Header Navigation

| Field | Value |
|-------|-------|
| Link to TRC exists? | ⚠️ Indirect — links to `/recovery` |
| Link text | `t("navigation.recovery")` — "Recovery" |
| Clicks to reach TRC | 2 (Header → /recovery → /recovery/trc) |
| Descriptive? | ❌ No — "Recovery" is generic, doesn't mention TRC or trauma |
| Pages reachable | `/recovery` (hub), then `/recovery/trc` from hub |

**Header Search:**
- The header search bar includes `/recovery` with keywords: `["recovery", "healing", "trauma", "porn", "تعافي", "صدمة"]`
- ❌ **Gap:** Searching "TRC" or "Trauma Recovery" in the header search will NOT find `/recovery/trc` — it only finds `/recovery` hub
- ❌ **Gap:** No direct searchable entry for TRC tools (grounding, breathing, etc.)

---

### 3. Footer

| Field | Value |
|-------|-------|
| Link to TRC exists? | ✅ Yes |
| Link text | `t("traumaRecovery")` = "Trauma Recovery" |
| Link href | `/recovery/trc` |
| Clicks to reach TRC | 1 |
| Descriptive? | ⚠️ Partial — "Trauma Recovery" but no description in footer (just a text link) |
| Pages reachable | `/recovery/trc` |

**Notes:** The Footer has a "Recovery" section with three links: Recovery Hub, Porn Recovery, and Trauma Recovery. The TRC link is directly accessible.

---

### 4. Apps/Features Page (/apps)

| Field | Value |
|-------|-------|
| Link to TRC exists? | ✅ Yes |
| Link text | `t("trcName")` = "Trauma Recovery" |
| Link href | `/recovery/trc` |
| Clicks to reach TRC | 1 |
| Descriptive? | ✅ Yes — Has description: "An evidence-based therapeutic program with grounding, breathing, and safe place techniques" |
| Pages reachable | `/recovery/trc` |

**Notes:** The Apps page has a "Recovery Programs" section with both Porn Recovery and TRC cards. TRC is clearly presented alongside its description.

---

### 5. Recovery Hub (/recovery)

| Field | Value |
|-------|-------|
| Link to TRC exists? | ✅ Yes |
| Link text | TRC Journey label (bilingual: "Trauma Recovery" / "التعافي من الصدمات الجنسية") |
| Link href | `/recovery/trc` |
| Clicks to reach TRC | 1 |
| Descriptive? | ✅ Yes — Full description with target audience, "why start here", "what you'll find", stages overview |
| Pages reachable | `/recovery/trc`, plus all TRC tool routes from quick-access tools section |

**Notes:** The Recovery Hub is the primary gateway. It shows:
- TRC path card with full description
- Target audience: "Those dealing with effects of sexual trauma, harassment, or assault"
- "Why start here" explanation
- Journey stages (Safety → Regulation → Integration)
- TRC-specific available tools with direct links
- Decision guidance: "If you have experienced harassment/assault or trauma symptoms → Start with Trauma Recovery (TRC)"
- TRC progress tracking (if user has started)

---

### 6. Methodology Page (/methodology)

| Field | Value |
|-------|-------|
| Link to TRC exists? | ✅ Yes (via RecoveryPathways component) |
| Link text | `t("traumaRecovery")` with flow step showing "Trauma Recovery → Identity" |
| Link href | `/recovery/trc` |
| Clicks to reach TRC | 1 |
| Descriptive? | ⚠️ Partial — Shows pathway: TRC → Identity, with description from translations |
| Pages reachable | `/recovery/trc` |

**Notes:** The Methodology page includes a `RecoveryPathways` component showing three pathways:
1. Direct: Identity (Quiz)
2. Porn Recovery → Identity
3. **Trauma Recovery → Identity**

The TRC pathway is clearly shown as a valid route to identity transformation.

---

### 7. FAQ Page (/faq)

| Field | Value |
|-------|-------|
| Link to TRC exists? | ⚠️ Indirect — Category 5 is "Recovery & Therapeutic Programs" |
| Link text | FAQ questions mention TRC conceptually |
| Clicks to reach TRC | ❌ No direct link — only informational text |
| Descriptive? | ⚠️ Partial — Explains difference between PR and TRC but doesn't link |
| Pages reachable | None (no links to TRC pages) |

**FAQ Recovery Questions:**
1. "Do I need the Recovery section?" — Mentions trauma but no link
2. "Do I need to complete Recovery fully before the Identity program?" — No link
3. "What is the difference between Porn Recovery and Trauma Recovery?" — Explains difference but **no link** to either program

**❌ Gap:** The FAQ mentions TRC but doesn't link to it. A user reading about TRC in the FAQ has no way to navigate there except manually.

---

### 8. Dashboard (/dashboard)

| Field | Value |
|-------|-------|
| Link to TRC exists? | ⚠️ Conditional — only shown if `tamkinly_recovery_discovered === 'true'` |
| Link text | `t("trcProgram")` with short description `t("trcShort")` |
| Link href | `/recovery/trc` |
| Clicks to reach TRC | 1 (when visible) |
| Descriptive? | ⚠️ Partial — Shows program name and short description |
| Pages reachable | `/recovery/trc` |

**Notes:** The Dashboard only shows the Recovery Programs card (including TRC link) if the user has previously visited a recovery page (tracked via localStorage `tamkinly_recovery_discovered`). This means:
- ❌ **Gap:** A user who hasn't discovered recovery yet won't see TRC on the dashboard
- ✅ Once discovered, TRC is directly accessible with 1 click

---

### 9. Search (/search)

| Field | Value |
|-------|-------|
| Link to TRC exists? | ❌ No |
| Link text | N/A |
| Clicks to reach TRC | N/A — TRC content not in searchable index |
| Descriptive? | N/A |
| Pages reachable | None |

**❌ Critical Gap:** The `/search` page's `searchableContent` array does NOT include:
- `/recovery` hub
- `/recovery/trc` entry page
- Any TRC tools (grounding, breathing, safe place, body scan, etc.)
- Any Wave 2 assets (trigger mapping, safety plan, regulation toolkit)
- Trauma-related keywords

A user searching for "trauma", "TRC", "grounding", "breathing", "safety plan", or "trigger mapping" on the search page will get **zero results**.

Similarly, the **Header search** only has `/recovery` with basic keywords but NOT `/recovery/trc` directly.

---

## Wave 2 Asset Discoverability

### Trigger Mapping (`/recovery/trc/worksheets/trigger-mapping`)

| Field | Value |
|-------|-------|
| Reachable from TRC entry? | ✅ Yes — Listed in TRC_STEPS with `isAvailable: true` |
| Reachable from Journey page? | ✅ Yes — Shown as available step in Regulation stage |
| Reachable without knowing its name? | ✅ Yes — Part of sequential journey flow after body-scan |
| Descriptive label | "Trigger Mapping" / "خريطة المحفزات" |
| Description | "Identify personal triggers that activate trauma responses" |

**Discoverability path:** Homepage → Recovery → TRC → (scroll to Regulation tools) → Trigger Mapping  
**Alternative:** Recovery Hub → TRC path → tools section → Trigger Mapping

### Safety Plan (`/recovery/trc/worksheets/safety-plan`)

| Field | Value |
|-------|-------|
| Reachable from TRC entry? | ✅ Yes — Listed in TRC_STEPS with `isAvailable: true` |
| Reachable from Journey page? | ✅ Yes — Shown as available step in Regulation stage |
| Reachable from Recovery Hub? | ✅ Yes — Via TRC quick-access tools |
| Descriptive label | "Safety Plan" / "خطة الأمان" |
| Description | "Create a detailed step-by-step safety plan" |

### Regulation Toolkit (`/recovery/trc/regulation-toolkit`)

| Field | Value |
|-------|-------|
| Reachable from TRC entry? | ✅ Yes — Listed in TRC_STEPS with `isAvailable: true` |
| Reachable from Journey page? | ✅ Yes — Shown as available step in Regulation stage |
| Descriptive label | "Regulation Toolkit" / "أدوات التنظيم" |
| Description | "A toolkit for regulating the nervous system in crisis moments" |

### Trauma Response Patterns (`/recovery/trc/what-happens-during-trauma-responses`)

| Field | Value |
|-------|-------|
| Reachable from TRC entry? | ✅ Yes — Listed in TRC_STEPS with `isAvailable: true` |
| Reachable from Journey page? | ✅ Yes — Shown as available step in Regulation stage |
| Descriptive label | "Trauma Response Patterns" / "أنماط استجابة الصدمة" |
| Description | "Understand your four responses: fight, flight, freeze, fawn" |

### All 4 Wave 2 Assets Linked from TRC Entry/Journey?

| Asset | TRC Entry | Journey Page | Recovery Hub |
|-------|-----------|-------------|--------------|
| Trigger Mapping | ✅ | ✅ | ✅ |
| Safety Plan | ✅ | ✅ | ✅ |
| Regulation Toolkit | ✅ | ✅ | ✅ |
| Trauma Responses | ✅ | ✅ | ✅ |

**All 4 Wave 2 assets are properly linked from the TRC entry page and journey page.** ✅

---

## Orphaned Pages (Only Reachable by Direct URL)

### 1. Grounding Guide (`/recovery/trc/grounding-guide`)

| Field | Value |
|-------|-------|
| Has page.tsx? | ✅ Yes |
| Linked from any page? | ❌ No — Zero incoming links found in entire codebase |
| In recovery-journey routes? | ❌ No |
| In sitemap? | ❌ No |
| **Verdict** | 🔴 **Orphaned** — Only reachable by typing URL directly |

### 2. Regulation Guide (`/recovery/trc/regulation-guide`)

| Field | Value |
|-------|-------|
| Has page.tsx? | ✅ Yes |
| Linked from any page? | ❌ No — Zero incoming links found in entire codebase |
| In recovery-journey routes? | ❌ No |
| In sitemap? | ❌ No |
| **Verdict** | 🔴 **Orphaned** — Only reachable by typing URL directly |

### 3. Secondary Trauma (`/recovery/trc/secondary-trauma`)

| Field | Value |
|-------|-------|
| Has page.tsx? | ✅ Yes |
| Linked from any page? | ❌ No — Zero incoming links found in entire codebase |
| In recovery-journey routes? | ❌ No |
| In sitemap? | ❌ No |
| **Verdict** | 🔴 **Orphaned** — Only reachable by typing URL directly |

---

## Sitemap Coverage

| URL | In Sitemap? |
|-----|-------------|
| `/recovery` | ✅ Yes |
| `/recovery/trc` | ✅ Yes |
| `/recovery/trc/grounding` | ✅ Yes |
| `/recovery/trc/a52` | ❌ No |
| `/recovery/trc/safe-place` | ❌ No |
| `/recovery/trc/body-scan` | ❌ No |
| `/recovery/trc/worksheets/trigger-mapping` | ❌ No |
| `/recovery/trc/worksheets/safety-plan` | ❌ No |
| `/recovery/trc/regulation-toolkit` | ❌ No |
| `/recovery/trc/what-happens-during-trauma-responses` | ❌ No |
| `/recovery/trc/what-trauma-does-to-the-body` | ❌ No |
| `/recovery/trc/journey` | ❌ No |
| `/recovery/trc/downloads` | ❌ No |
| `/recovery/trc/grounding-guide` | ❌ No |
| `/recovery/trc/regulation-guide` | ❌ No |
| `/recovery/trc/secondary-trauma` | ❌ No |

**Sitemap covers only 3 out of 16 TRC URLs.** This means most TRC pages won't be discovered by search engines.

---

## Click Distance Analysis

From each entry point, minimum clicks to reach TRC:

| Entry Point | Clicks to /recovery/trc | Clicks to Grounding | Clicks to Trigger Mapping |
|-------------|------------------------|---------------------|--------------------------|
| Homepage | 1 | 2 | 2 |
| Header Nav | 2 | 3 | 3 |
| Footer | 1 | 2 | 2 |
| Apps Page | 1 | 2 | 2 |
| Recovery Hub | 1 | 2 | 2 |
| Methodology | 1 | 2 | 2 |
| FAQ | ❌ No link | ❌ No link | ❌ No link |
| Dashboard | 1 (conditional) | 2 (conditional) | 2 (conditional) |
| Search | ❌ Not indexed | ❌ Not indexed | ❌ Not indexed |

All reachable entry points can get to TRC in ≤3 clicks. ✅

---

## Critical Discoverability Gaps

### Gap 1: Search Page Missing TRC Content 🔴 HIGH
The `/search` page's `searchableContent` array has **zero** recovery/TRC entries. A user searching for "trauma", "TRC", "grounding", "breathing", "safety plan", "trigger mapping", or "regulation toolkit" will get no results.

**Fix:** Add TRC content to `searchableContent` in `/src/app/search/page.tsx`

### Gap 2: Header Search Missing TRC Direct Link 🟡 MEDIUM
The header `searchablePages` array includes `/recovery` but NOT `/recovery/trc`. Searching "TRC" or "Trauma Recovery" won't find the specific TRC page.

**Fix:** Add `{ titleKey: "search.traumaRecovery", path: "/recovery/trc", keywords: ["trc", "trauma", "recovery", "grounding", "breathing", "safety"] }` to Header's searchablePages

### Gap 3: FAQ Mentions TRC But Doesn't Link 🟡 MEDIUM
The FAQ's "Recovery & Therapeutic Programs" category explains TRC but provides no navigation links to it.

**Fix:** Add links to `/recovery/trc` and `/recovery/porn-recovery` in FAQ answers

### Gap 4: 3 Orphaned Pages 🔴 HIGH
`/recovery/trc/grounding-guide`, `/recovery/trc/regulation-guide`, and `/recovery/trc/secondary-trauma` exist as page.tsx files but have **zero incoming links** from anywhere in the application.

**Fix:** Add links from appropriate TRC pages (e.g., grounding page → grounding guide, regulation toolkit → regulation guide, TRC entry → secondary trauma)

### Gap 5: Sitemap Missing Most TRC Pages 🟡 MEDIUM
Only 3 of 16 TRC URLs are in the sitemap. Search engines won't discover most TRC content.

**Fix:** Add all TRC routes to `sitemap.ts`

### Gap 6: Dashboard Conditional Visibility 🟢 LOW
TRC only appears on Dashboard if user has previously visited recovery. This is intentional behavior but means new users won't find TRC here.

---

## Recommendations

1. **[HIGH]** Add TRC/recovery content to `/search` page's `searchableContent` array
2. **[HIGH]** Link the 3 orphaned pages from relevant TRC pages
3. **[MEDIUM]** Add `/recovery/trc` to Header's `searchablePages` with relevant keywords
4. **[MEDIUM]** Add links to TRC in FAQ answers about recovery
5. **[MEDIUM]** Add all TRC routes to `sitemap.ts`
6. **[LOW]** Consider always showing Recovery on Dashboard (not just after discovery)

---

## TRC Page Inventory

All existing TRC pages and their link status:

| Page | Route | Has Incoming Links? | In Journey Config? | In Sitemap? |
|------|-------|---------------------|--------------------|----|
| TRC Entry | `/recovery/trc` | ✅ Yes | ✅ Yes | ✅ Yes |
| Journey | `/recovery/trc/journey` | ✅ From TRC entry | ✅ Yes | ❌ No |
| Grounding | `/recovery/trc/grounding` | ✅ From journey | ✅ Yes | ✅ Yes |
| A52 Breathing | `/recovery/trc/a52` | ✅ From journey | ✅ Yes | ❌ No |
| Safe Place | `/recovery/trc/safe-place` | ✅ From journey | ✅ Yes | ❌ No |
| Body Scan | `/recovery/trc/body-scan` | ✅ From journey | ✅ Yes | ❌ No |
| What Trauma Does | `/recovery/trc/what-trauma-does-to-the-body` | ✅ From journey | ✅ Yes | ❌ No |
| Trigger Mapping | `/recovery/trc/worksheets/trigger-mapping` | ✅ From journey | ✅ Yes | ❌ No |
| Safety Plan | `/recovery/trc/worksheets/safety-plan` | ✅ From journey | ✅ Yes | ❌ No |
| Regulation Toolkit | `/recovery/trc/regulation-toolkit` | ✅ From journey | ✅ Yes | ❌ No |
| Trauma Responses | `/recovery/trc/what-happens-during-trauma-responses` | ✅ From journey | ✅ Yes | ❌ No |
| Downloads | `/recovery/trc/downloads` | ✅ From TRC entry | ❌ No (separate) | ❌ No |
| Grounding Guide | `/recovery/trc/grounding-guide` | ❌ **ORPHANED** | ❌ No | ❌ No |
| Regulation Guide | `/recovery/trc/regulation-guide` | ❌ **ORPHANED** | ❌ No | ❌ No |
| Secondary Trauma | `/recovery/trc/secondary-trauma` | ❌ **ORPHANED** | ❌ No | ❌ No |
| Boundaries (Wave 3) | `/recovery/trc/boundaries` | ❌ Not yet | ✅ (isAvailable: false) | ❌ No |
| Therapist Selection (Wave 3) | `/recovery/trc/therapist-selection` | ❌ Not yet | ✅ (isAvailable: false) | ❌ No |
| Recovery Milestones (Wave 3) | `/recovery/trc/recovery-milestones` | ❌ Not yet | ✅ (isAvailable: false) | ❌ No |

Note: Wave 3 pages are intentionally not linked yet (isAvailable: false).
