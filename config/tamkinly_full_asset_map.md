# TAMKINLY FULL ASSET MAP
## Official asset registry for the Hermes Swarm ecosystem — English Edition

| Field | Value |
|---|---|
| **File** | `tamkinly_full_asset_map.md` |
| **Version** | v1.0-EN (English edition — first swarm deployment targets the English section) |
| **Date** | 2026-10-01 |
| **Source** | Extracted directly from production code on the server (not guessed) |
| **Domain** | https://tamkinly.com — every link below is relative to it |
| **Companion reference** | `tamkinly-site-map-swarms.md` (Arabic narrative edition, same data with deeper context) |
| **Total registered assets** | 145 (101 Free · 20 System · 12 Premium · 5 Mastery · 5 Protocol · 2 Basic) |

### Category legend (exact values — use them verbatim)

| Category | Meaning |
|---|---|
| **Free** | Publicly accessible content or tool — no payment required |
| **Basic** | LEGACY monthly tier (no longer sold) — now included in the $9.99 Identity Recode Planner |
| **Premium** | Unlocked by the Identity Recode Planner ($9.99 one-time, PRICING MODEL V2) |
| **Mastery** | Unlocked by Mastery ($27 one-time, PRICING MODEL V2) |
| **Protocol** | Unlocked via a one-time access-key purchase (therapeutic protocols) |
| **System** | Functional/infrastructure page (account, checkout, search, redirects) — not a product |

> `System` is a documented addition beyond the five requested categories so that no asset is left uncategorized. Everything a user *consumes or practices* uses the five canonical categories: Free / Basic / Premium / Mastery / Protocol.

### Hard rules for every swarm using this file

1. **Never invent a link** that is not in this file — if you need one that is missing, ask the project engineer first.
2. **Never promise** features, prices, delivery times, or refunds that are not documented here.
3. **Prices are final and singular (PRICING MODEL V2, one-time payments):** Identity Recode Planner $9.99 / Mastery $27 / Therapeutic Protocols $99. No monthly plans for new users. Any other number is an error — never output it.
4. **One CTA per message, one clear destination**, tied to a real benefit documented in this file.
5. **Recovery section tone:** empathy first, zero blame, total privacy, soft CTA, absolutely no healing promises.
6. Product/marketing pages for paid tiers are publicly viewable; the category assigned to them indicates the tier they sell or unlock.

---

## 1) Core Pages & Main Navigation

| Link | Title | Description | Category |
|---|---|---|---|
| `/` | Homepage | Identity transformation platform landing: the philosophy ("don't change behavior — change identity"), the three sections, and CTAs to quiz / products / recovery | Free |
| `/about` | About | Who we are: the vision and the methodology behind Tamkinly | Free |
| `/methodology` | Methodology | The scientific basis of identity-based change; the page a skeptical visitor should read before buying | Free |
| `/resources` | Resources | Consolidated free resource library hub linking to apps, guides, and blog | Free |
| `/search` | Search | Full-text search across all site content | System |
| `/offline` | Offline Fallback | Automatic technical page shown when the network connection drops | System |

---

## 2) Account, Access & Payments

| Link | Title | Description | Category |
|---|---|---|---|
| `/auth/signup` | Sign Up | Create an account with email; starts the journey and triggers the instant welcome email | System |
| `/auth/signin` | Sign In | Log in to the account, apps, and last-used tool | System |
| `/auth/forgot-password` | Forgot Password | Request a password reset link (sent from noreply@tamkinly.com) | System |
| `/auth/reset-password` | Reset Password | Set a new password using the emailed link | System |
| `/account` | My Account | Manage profile, subscription status, and access keys | System |
| `/dashboard` | Dashboard | Central hub: all apps, progress, identity score, achievements | System |
| `/cart` | Cart | Review selected items before purchase | System |
| `/checkout` | Checkout | Pay by card or Tribute; access keys are issued instantly | System |
| `/payment/success` | Payment Success | Purchase confirmation + access keys, followed by an instant confirmation email | System |
| `/payment/cancel` | Payment Cancelled | Safe return with no charge; retry CTA points to /products | System |
| `/order-status` | Order Status | Track an order and its access keys | System |
| `/downloads` | Downloads | Download every purchased digital file (digital PDF + print versions) according to the active subscription | System |
| `/referral` | Referral Program | Get a personal referral link and earn rewards | System |
| `/ref/[code]` | Referral Link | Friend enters via a referrer's link; attribution is recorded automatically | System |

> **Support swarm note:** access keys are created and verified via `/api/access/*`, and Tribute purchases arrive via `/api/tribute/webhook`. Any "I didn't receive my key" issue: check `/order-status` first, then the noreply@ email.

---

## 3) Free Funnel Entry (Quiz)

| Link | Title | Description | Category |
|---|---|---|---|
| `/quiz` | Identity Gap Quiz | 3-minute assessment measuring the gap between the user's current self and ideal self, with instant personalized results | Free |
| `/quiz/results` | Quiz Results | Score plus one of 4 levels — **beginner / explorer / builder / master** — and a personalized next-step recommendation matched to the level | Free |

> The four free apps (identity-gap-quiz, values-clarification, daily-reflection, habit-tracker) are registered once in Section 5 below. Marketing rule: free products are designed to reveal the gap, then present the paid solution — the natural CTA after a free result is "the measured next step," never a hard sell.

---

## 4) Paid Products (Subscriptions)

| Link | Title | Description | Category |
|---|---|---|---|
| `/products` | Products Hub | Public side-by-side comparison of the three subscription tiers | Free |
| `/products/premium` | PLANNER — $9.99 one-time (old /products/basic redirects here) | The complete system: 7-Day Guided Discipline Journey + full 30-day journey, **all 12 core apps** (see Section 5), the **30-Day Identity Planner + Executive Manual + Identity Baseline Worksheet** PDFs (digital + print). Lifetime access, single payment. Welcome email: PREMIUM Onboarding sequence | Premium |
| `/products/premium` | PLANNER — $9.99 one-time | The Identity Recode Planner: 7-day reset + full 30-day journey + **all 12 core apps** + planner/manual/baseline PDFs. Most showcased product. Welcome email: PREMIUM Onboarding sequence | Premium |
| `/products/mastery` | MASTERY — $27 one-time | The final product: everything in the Planner, all apps unlocked, **AI Identity Coach**, community access, priority support, plus the Emotion Regulation Toolkit. Lifetime access. Welcome email: MASTERY VIP Journey sequence | Mastery |

---
## 5) Applications Registry — All 20 Apps (master table)

| # | Link | Title | Description | Category |
|---|---|---|---|---|
| 1 | `/apps/identity-gap-quiz` | Identity Gap Quiz | Full app version of the identity gap assessment, backed by research | Free |
| 2 | `/apps/values-clarification` | Values Clarification | Discover core values using the scientifically grounded ACT methodology | Free |
| 3 | `/apps/daily-reflection` | Daily Reflection | Daily reflection practice with 7 research-backed themes that rewire neural pathways | Free |
| 4 | `/apps/habit-tracker` | Habit Tracker | Track habits aligned with the desired identity, with motivational streaks | Free |
| 5 | `/apps/trial-planner` | Trial Planner | Guided sampler of the advanced tools for the 7-day Basic journey | Basic |
| 6 | `/apps/goal-system` | Goal System | Identity-aligned goals broken down into practical steps | Premium |
| 7 | `/apps/identity-baseline` | Identity Baseline | Measures the self across 8 dimensions for full self-clarity | Premium |
| 8 | `/apps/identity-recode-system` | Identity Recode System | The flagship 30-day program with 6 interconnected components | Premium |
| 9 | `/apps/environmental-audit` | Environmental Audit | Audit the physical, social, and digital environment that shapes behavior | Premium |
| 10 | `/apps/decision-analysis` | Decision Analysis | Reveal decision patterns and cognitive biases, then improve choices | Premium |
| 11 | `/apps/evidence-tracking` | Evidence Tracking | Document evidence of the new identity moment by moment (basics included in Basic) | Premium |
| 12 | `/apps/daily-planner` | Daily Planner | Plan each day around who the user wants to become | Premium |
| 13 | `/apps/journal-system` | Journal System | Structured journaling templates for systematic self-work | Premium |
| 14 | `/apps/worksheets` | Worksheets Library | Every Tamkinly worksheet in one place (identity exploration, habit building, transformation exercises) | Premium |
| 15 | `/apps/progress-dashboard` | Progress Dashboard | Unified tracking: identity score, streaks, and achievements | Premium |
| 16 | `/apps/executive-manual` | Executive Manual | Comprehensive step-by-step manual for using every tool in the system | Premium |
| 17 | `/apps/emotion-regulation` | Emotion Regulation (ERQ) | Train cognitive reappraisal vs. suppression (Gross & John method) for emotional intelligence | Mastery |
| 18 | `/apps/ai-identity-coach` | AI Identity Coach | 24/7 personal transformation guide — replies in Arabic and English with full knowledge of Tamkinly products, prices, and therapeutic protocols. **Live now** (title verified on the live site 2026-10-01) | Mastery |
| 19 | `/apps/community-access` | Community Access | The community of participants on the transformation journey | Mastery |
| 20 | `/apps/priority-support` | Priority Support | Fastest-response personal help from transformation experts | Mastery |

> **Access matrix (never violate it):** Free = quiz + apps 1–4. Basic = Free + app 5 (+ evidence-tracking basics). Premium = apps 6–16 (16 total). Mastery = all 20. Never promise a Basic user a Premium app.

---

## 6) Therapeutic Protocols (one-time access-key purchases)

| Link | Title | Description | Category |
|---|---|---|---|
| `/apps/therapeutic-protocols` | Therapeutic Protocols Hub | The center for the four guided therapeutic protocols, each unlocked with an access key | Protocol |
| `/apps/therapeutic-protocols/white-mirror` | White Mirror | Guided self-confrontation exercise (access-key entry) | Protocol |
| `/apps/therapeutic-protocols/temporal-decoupling` | Temporal Decoupling | Temporal separation from painful memories (access-key entry) | Protocol |
| `/apps/therapeutic-protocols/truncated-sentence` | Truncated Sentence | Complete-the-truncated-sentence work for verbal wounds, with practice reminders | Protocol |
| `/apps/therapeutic-protocols/alternative-code` | Alternative Code | Replace the old behavioral code with a conscious alternative (access-key entry) | Protocol |

> Each protocol has: an access delivery email (PROTO_* in both languages) + a 9-day practice follow-up (PROTO_DAY_1→9) + dedicated access APIs. **Support swarm:** "protocol won't open" = check the key in `/order-status`, then the noreply@ email.

---

## 7) Worksheets & Downloads (outside the apps registry)

| Link | Title | Description | Category |
|---|---|---|---|
| `/downloads` | Downloads Center | Download all purchased digital files (digital PDF + print versions) per subscription | System |
| `/recovery/porn-recovery/downloads` | Recovery Program Files | Download the porn recovery program files | Free |
| `/recovery/trc/downloads` | TRC Downloads | Download the trauma regulation toolkit package | Free |
| `/recovery/trc/worksheets/safety-plan` | Safety Plan Worksheet | Build a personal safety plan step by step | Free |
| `/recovery/trc/worksheets/trigger-mapping` | Trigger Mapping Worksheet | Map personal triggers and their patterns on a structured sheet | Free |

> Six blog articles ship paired worksheets (who-am-i, identity-based-habits, self-authorship, identity-baseline-8d, environmental-audit, erq-emotional-regulation) — each article bridges the reader to the matching app or paid product. The Premium `/apps/worksheets` library (Section 5, #14) consolidates them.

---

## 8) Recovery Section — the deepest support line (all public)

| Link | Title | Description | Category |
|---|---|---|---|
| `/recovery` | Recovery Hub | Two clear recovery paths plus support content | Free |
| `/recovery/porn-recovery` | Porn Recovery Program | A practical 5-phase recovery roadmap | Free |
| `/recovery/porn-recovery/journey` | Personal Recovery Journey | Trackable personal recovery path | Free |
| `/recovery/porn-recovery/downloads` | Program Downloads | Files for the recovery program | Free |
| `/recovery/trc` | TRC Hub (Trauma Regulation Center) | Nervous-system regulation tools for trauma recovery | Free |
| `/recovery/trc/journey` | Trauma Recovery Journey | Step-by-step trauma recovery path | Free |
| `/recovery/trc/grounding` | 5-4-3-2-1 Grounding | Grounding exercise for panic moments | Free |
| `/grounding-guide` | Grounding Guide | Full explanation of the grounding technique | Free |
| `/grounding/printable` | Printable Grounding Card | Print-ready version of the grounding exercise | Free |
| `/recovery/trc/body-scan` | Body Scan | Interactive body scan to decompose tension | Free |
| `/recovery/trc/safe-place` | Safe Place | Build a mental safe place | Free |
| `/recovery/trc/a52` | A52 Tool | Specialized A52 regulation tool | Free |
| `/recovery/trc/eft-tapping` | EFT Tapping | Tapping technique to calm the nervous system | Free |
| `/recovery/trc/thought-reframing` | Thought Reframing | Reframe disabling thought patterns | Free |
| `/recovery/trc/shame-recovery` | Shame Recovery | Recover from internalized shame | Free |
| `/recovery/trc/secondary-trauma` | Secondary Trauma | For caregivers and helpers absorbing others' trauma | Free |
| `/recovery/trc/what-happens-during-trauma-responses` | Understanding Trauma Responses | Explains what happens during trauma responses | Free |
| `/recovery/trc/what-trauma-does-to-the-body` | Trauma and the Body | How trauma affects the body | Free |
| `/recovery/trc/regulation-guide` | Regulation Guide | Complete nervous-system regulation guide | Free |
| `/recovery/trc/regulation-toolkit` | Regulation Toolkit | The practical regulation toolkit package | Free |
| `/recovery/trc/trauma-journal` | Trauma Journal | Therapeutic journaling for integration | Free |
| `/trc` | TRC Legacy Redirect | Old TRC link — redirects automatically to the new hub | System |
| `/trc/grounding` | Grounding Legacy Redirect | Old grounding link — redirects automatically | System |

> **Content language for this section:** empathy first, zero blame, total privacy, soft CTA (free tool → program → subscription). No healing promises, ever.

---

## 9) Free Guides — 4 deep bilingual guides

| Link | Title | Description | Category |
|---|---|---|---|
| `/guides/behavior-trap-why-habits-fail` | The Behavior Trap: Why Habits Fail | Behavior change fails without identity change — the core thesis of the platform | Free |
| `/guides/identity-vs-behavior-change` | Identity vs. Behavior Change | The essential difference between the two schools of change | Free |
| `/guides/environment-shapes-you` | Your Environment Shapes You | Engineer your surroundings before fighting yourself | Free |
| `/guides/recode-identity-30-days` | Recode Your Identity in 30 Days | The full preview of the Premium method | Free |

> Every guide ends with a bridge to the matching product — swarms should reuse these bridges in their content.

---
## 10) Blog — 54 articles by category (all Free)

**Hubs:** `/blog` (all) • `/blog/category/[category]` (by category) • `/blog/author/[slug]` (by author)
**System categories:** App Guides • Identity & Transformation • Mindset & Strategy • Productivity & Growth • Recovery • Worksheets (+ dedicated Arabic categories)

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog` | Blog Hub | All 54 articles with category navigation | Free |
| `/blog/category/[category]` | Category Archive | Articles filtered by one category | Free |
| `/blog/author/[slug]` | Author Archive | Articles by one author | Free |

### 10.1 App Guides

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog/identity-gap-assessment` | Identity Gap Assessment | How to measure who you are vs. who you want to be (pairs with the free quiz) | Free |
| `/blog/values-clarification-tool` | The Values Clarification Tool | Find what truly drives you using ACT (pairs with the free app) | Free |
| `/blog/daily-reflection-practice` | Daily Reflection Practice | Five minutes a day that rewire identity (pairs with the free app) | Free |
| `/blog/identity-recode-system-guide` | Identity Recode System: Complete Guide | The full walkthrough of the 30-day program (Basic-tier app) | Free |
| `/blog/ai-identity-coach-guide` | The AI Identity Coach Guide | What the coach does, what to ask, and how to get the most of it (Mastery app) | Free |

### 10.2 Worksheets

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog/who-am-i-worksheet` | Who Am I? Worksheet | Complete identity exploration exercise | Free |
| `/blog/identity-based-habits-worksheet` | Identity-Based Habits Worksheet | Habit building with the James Clear methodology | Free |
| `/blog/self-authorship-worksheet` | Self-Authorship Worksheet | Becoming the author of your inner voice | Free |
| `/blog/identity-baseline-8d-worksheet` | 8-Dimension Identity Baseline Worksheet | Measure your starting point across 8 dimensions | Free |
| `/blog/environmental-audit-worksheet` | Environmental Audit Worksheet | A practical environment audit on paper | Free |
| `/blog/erq-emotional-regulation-worksheet` | ERQ Worksheet | Measuring and training emotional regulation | Free |

### 10.3 Identity Shift

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog/physics-of-momentum` | The Physics of Momentum | Why 18 minutes changes everything | Free |
| `/blog/and-the-bamboo-kept-growing` | And the Bamboo Kept Growing | The compound effect of hidden work | Free |
| `/blog/automatic-change` | Automatic Change | How to make your brain work for you | Free |
| `/blog/physics-of-consciousness` | The Physics of Consciousness | How repetition rewrites your identity | Free |
| `/blog/the-memory-illusion` | The Memory Illusion | You are not who you remember being | Free |
| `/blog/stop-procrastinating-identity-shift` | Stop Procrastinating | Ending delay through the identity flip | Free |

### 10.4 Commitment & Discipline

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog/all-in-or-nothing` | All In or Nothing | The power of full commitment | Free |
| `/blog/redefining-discipline` | Redefining Discipline | Discipline as the highest form of self-respect | Free |
| `/blog/self-discipline-science` | The Science of Self-Discipline | What real self-discipline is made of | Free |

### 10.5 Strategy, Execution & Productivity

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog/inversion-thinking` | Inversion Thinking | Win by avoiding loss | Free |
| `/blog/speed-as-strategy` | Speed as Strategy | The execution advantage | Free |
| `/blog/goal-setting-framework` | Identity-Aligned Goal Setting | A goal framework that matches who you're becoming | Free |
| `/blog/ten-minute-block-system` | The Ten-Minute Block System | Productivity in small decisive blocks | Free |

### 10.6 Mental Clarity & Excellence

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog/dopamine-reset` | The 24-Hour Dopamine Reset | Reset the reward system in one day | Free |
| `/blog/vagus-nerve-breathing` | The Vagus Nerve Protocol | 4-2-8-2 breathing for calm | Free |
| `/blog/becoming-exceptional` | Becoming Exceptional | The path beyond average | Free |
| `/blog/identity-millionaire` | The Identity Millionaire | Wealth through self-transformation | Free |
| `/blog/five-steps-to-miracles` | Five Steps to Miracles | Freeing yourself in five moves | Free |
| `/blog/magic-in-work-you-avoid` | The Magic in the Work You Avoid | What avoidance hides | Free |
| `/blog/work-on-yourself` | Work on Yourself | Cybernetics of the self-image | Free |
| `/blog/how-to-build-habits-that-stick` | Habits That Stick | The science and the application | Free |
| `/blog/morning-routine-identity` | The Identity-Based Morning Routine | Start the day as the person you're becoming | Free |

### 10.7 Recovery (13 articles)

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog/porn-recovery-roadmap` | The Porn Recovery Roadmap | The complete 5-phase plan | Free |
| `/blog/trauma-recovery-three-stages` | Three Stages of Trauma Recovery | Safety, regulation, integration | Free |
| `/blog/understanding-the-compulsion-cycle` | Understanding the Compulsion Cycle | The anatomy of the loop and the breaking moment | Free |
| `/blog/relapse-prevention-system` | Relapse Prevention System | Structure that decides for you before the urge does | Free |
| `/blog/urge-surfing-10-minute-window` | Urge Surfing | Riding the wave: the 10-minute window | Free |
| `/blog/what-trauma-does-to-the-body` | What Trauma Does to the Body | The physiological footprint of trauma | Free |
| `/blog/grounding-for-flashbacks` | Grounding for Flashbacks | Techniques for intrusive memories | Free |
| `/blog/paced-breathing-for-regulation` | Paced Breathing 4/6 | Breathing for nervous-system regulation | Free |
| `/blog/separating-self-from-shame` | Separating Self from Shame | You are not what was done to you | Free |
| `/blog/relapse-is-data` | Relapse Is Data, Not Failure | The reframing that keeps recovery alive | Free |
| `/blog/rebuild-identity-after-addiction` | Rebuilding Identity After Addiction | Constructing the self after the struggle | Free |
| `/blog/window-of-tolerance` | The Window of Tolerance | Living inside your optimal zone | Free |
| `/blog/trauma-journaling-integration` | Trauma Journaling for Integration | Writing as an integration tool | Free |

### 10.8 Arabic Articles (8 — for the Arabic audience)

| Link | Title | Description | Category |
|---|---|---|---|
| `/blog/ar-tatweer-althat` | Self-Development: The Complete Guide (Arabic) | Change from the inside out | Free |
| `/blog/ar-binaa-al3aadat` | Building Habits (Arabic) | The science of lasting habits | Free |
| `/blog/ar-tahqeeq-alahdaf` | Achieving Goals (Arabic) | Why goals fail and the right method | Free |
| `/blog/ar-aldhibat-althati` | Self-Discipline (Arabic) | The truth no one tells you | Free |
| `/blog/ar-idarat-alwaqt` | Real Time Management (Arabic) | Do what matters most, not more | Free |
| `/blog/ar-hindasat-al-dimag` | Brain Engineering (Arabic) | The science of reshaping your life | Free |
| `/blog/ar-karizma-al-tatheer` | Charisma of Influence (Arabic) | Become the person people follow | Free |
| `/blog/ar-khulasat-al-arbaeen` | The Essence of Forty (Arabic) | Seven golden pillars of positive change | Free |

> **Content swarm rule:** every article is a ready funnel (problem → science → free tool → app → tier). Arabic articles serve the Gulf/Maghreb audience; English articles serve the global audience.

---

## 11) FAQ, Legal & Contact

| Link | Title | Description | Category |
|---|---|---|---|
| `/faq` | FAQ | Bilingual page: 6 categories × 3 questions + Quick Answers (sourced from i18n translation files) | Free |
| `/privacy` | Privacy Policy | Data collection, email practices, information protection | Free |
| `/terms` | Terms & Conditions | Usage, subscriptions, content rights | Free |
| `/refund` | Refund Policy | Refund conditions and exclusions — the only authoritative refund source | Free |
| `/contact` | Contact | General message form (→ Brevo + the swarm's `view=support` queue) | System |

> **Support channels beyond pages:** ticket API `/api/support/tickets` (open/closed status), human replies from **support@tamkinly.com**, and Mastery-exclusive priority support at `/apps/priority-support`. Legal/billing questions: always answer with the official link above + a support ticket — never invent policy details.

---

## 12) Fact Sheet (hard facts — never invented, never rounded)

### 12.1 Commercial facts
- **Only official prices (one-time):** Identity Recode Planner **$9.99** / Mastery **$27** / Protocols **$99**. Any other number is an error.
- **Quiz result levels:** beginner / explorer / builder / master — each level maps to a different product recommendation (Free apps → Basic → Premium → Mastery).
- **Journey design:** free quiz → free tools → Basic (7-day) → Premium (30-day) → Mastery (everything + AI coach).
- **Protocol access:** one-time keys; delivery email + 9-day follow-up per protocol; troubleshooting path = `/order-status` → noreply@ email.

### 12.2 Email system facts (for routing promises correctly)
- **noreply@tamkinly.com** — transactional: purchase confirmations, access-key delivery, password resets.
- **team@tamkinly.com** — marketing and sequences: onboarding, drip, upsell, re-engagement.
- **support@tamkinly.com** — human support replies.
- **admin@tamkinly.com** — internal daily swarm digest (07:35 server time).
- Sequences live in Brevo as templates 80–195 (SEQ_TEMPLATES: 58 keys × AR/EN) + 11 strategic drip sequences + 13 transactional templates.

### 12.3 Swarm operations endpoint
- `GET /api/agent/ops?view=summary|customers|expiring|emails|coach|events|health|support`
- `POST /api/agent/ops` actions: heartbeat, finding, draft, action, mark-contact-read
- Auth: `Authorization: Bearer <AGENT_OPS_TOKEN>` — **not** a Cloudflare token.

### 12.4 Ready CTA pairs (English section focus)

| Context | English CTA | Destination |
|---|---|---|
| Cold visitor (article/social) | "Discover your Identity Gap in 3 minutes — free" | `/quiz` |
| After quiz result | "Your next step is ready — start now" | Product matching the result level |
| Active free user | "Unlock the full system — $9.99 once, no subscription" | `/products/premium` |
| Basic user succeeding in week 1 | "You're ready for the full 30-day transformation" | `/products/premium` |
| Premium user showing discipline | "Unlock your AI Coach & community — Mastery" | `/products/mastery` |
| Abandoned cart | "Your journey is waiting — finish checkout" | `/cart` |
| Inactive 7+ days | "Your new identity is built in small days — come back" | Last app the user used |
| Recovery visitor | "Start with one grounding tool — one step is enough today" | `/recovery/trc/grounding` |
| Protocol buyer | "Book 15 quiet minutes — start your first session" | Protocol page |
| Closed support question | "Anything else? I'm here" | `/faq` or `/contact` |

### 12.5 Data hygiene warnings
- Current contact messages and support tickets are **test data** — do not treat them as real customers.
- 7 legacy `telegram_*@tribute.tg` codes (expired 14 months ago, isActive=true) await data cleanup.
- FAQ content is sourced from i18n translation files — expanding it requires editing translations, not just the page.
