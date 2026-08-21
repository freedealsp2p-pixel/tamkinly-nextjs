# TRC Production Gate Report

**Date:** 2026-08-11  
**Agent:** Swarm 7 — Production Gate Tester  
**Server:** 192.3.218.191:2222  
**Project:** /var/www/tamkinly  
**Next.js:** v16.2.12 (dev mode)

---

## Test Results Summary

| # | Test | Verdict | Details |
|---|------|---------|---------|
| 1 | PM2 Process Status | **PARTIAL** | Online but 14 restarts, dev mode |
| 2 | TRC Routes HTTP | **PASS** | 10/10 routes return 200 |
| 3 | PM2 Error Logs | **PARTIAL** | Non-critical errors present |
| 4 | Memory / Resources | **PARTIAL** | High RAM/swap, CPU 100% |
| 5 | i18n Key Coverage | **PARTIAL** | 232 TRC keys missing in AR |
| 6 | TypeScript Typecheck | **BLOCKED** | OOM — insufficient RAM |

**Overall Gate: PARTIAL** — TRC routes are functional but multiple production readiness concerns exist.

---

## 1. PM2 Process Status — PARTIAL

| Field | Value |
|-------|-------|
| Name | tamkinly |
| PID | 297414 |
| Status | online |
| Uptime | 12m |
| Restarts | **14** ⚠️ |
| Memory | 1.3MB (PM2 reported) / 501MB (next-server RSS) |
| Mode | fork |
| Script | `npx next dev -p 3001` |

**Findings:**
- ✅ Process is online and serving requests
- ⚠️ **14 restarts** — process has been unstable, likely due to Turbopack cache corruption
- ⚠️ **Running in dev mode** (`next dev`) — not production-optimized; should use `next build && next start`
- ⚠️ **No file watching** (`watching: disabled`) — appropriate for PM2 but dev mode auto-reloads anyway

**Recommendation:** Switch to production build (`next build && next start -p 3001`) to eliminate Turbopack dev cache issues and improve performance.

---

## 2. TRC Routes HTTP Status — PASS

| Route | Status | Response Time |
|-------|--------|---------------|
| `/recovery/trc` | 200 | ~3.5s (first), ~200ms (cached) |
| `/recovery/trc/grounding` | 200 | 567ms |
| `/recovery/trc/a52` | 200 | 359ms |
| `/recovery/trc/safe-place` | 200 | 1051ms |
| `/recovery/trc/body-scan` | 200 | 1599ms |
| `/recovery/trc/journey` | 200 | 306ms |
| `/recovery/trc/regulation-toolkit` | 200 | 210ms |
| `/recovery/trc/what-happens-during-trauma-responses` | 200 | 251ms |
| `/recovery/trc/worksheets/trigger-mapping` | 200 | 193ms |
| `/recovery/trc/worksheets/safety-plan` | 200 | 191ms |

**Findings:**
- ✅ All 10 TRC routes return HTTP 200
- ✅ Response times are acceptable after warm-up (200ms–1.6s)
- ⚠️ First request to `/recovery/trc` was 3.5s (dev-mode compilation overhead)

---

## 3. PM2 Error Logs — PARTIAL

**Errors found:**

| Error | Severity | Impact |
|-------|----------|--------|
| Turbopack SST file lookup failure | ⚠️ Medium | Cache corruption; causes restarts |
| Compaction failed (concurrent write) | ⚠️ Medium | Turbopack DB contention |
| ENOENT: build-manifest.json | ⚠️ Medium | Missing dev build artifact |
| GET /robots.txt → 500 | ⚠️ Medium | Conflicting public file + page file |
| Middleware deprecation warning | 💡 Low | Should migrate to "proxy" convention |

**Findings:**
- ❌ Turbopack dev cache is corrupted (`.next/dev/cache/turbopack/`)
- ❌ `/robots.txt` returns 500 due to conflicting route definition
- ⚠️ `build-manifest.json` ENOENT errors indicate incomplete dev compilation state
- 💡 Middleware file should be renamed to `proxy.ts` per Next.js 16 convention

**Recommendation:**
1. Clear `.next` cache: `rm -rf /var/www/tamkinly/.next`
2. Fix `/robots.txt` conflict — remove either `public/robots.txt` or `pages/robots.txt`
3. Migrate `middleware.ts` → `proxy.ts`

---

## 4. Memory / Resources — PARTIAL

| Metric | Value | Status |
|--------|-------|--------|
| Total RAM | 962 MB | ⚠️ Low |
| Used RAM | 596 MB (62%) | ⚠️ High |
| Available RAM | 225 MB | ⚠️ Tight |
| Swap Total | 4.0 GB | — |
| Swap Used | 1.7 GB (42%) | ⚠️ Heavy swapping |
| Host CPU | 100% | ❌ Saturated |
| next-server RSS | 501 MB (50.8%) | ⚠️ Dominates RAM |

**Findings:**
- ❌ **CPU at 100%** — likely caused by Turbopack continuous compilation in dev mode
- ⚠️ **1.7 GB swap used** — heavy swapping degrades response times
- ⚠️ **next-server consuming 50% of RAM** — production build would reduce this significantly
- ⚠️ Only 225 MB available RAM — no headroom for build operations

**Recommendation:** Production build (`next start`) would dramatically reduce CPU and memory usage by eliminating Turbopack's continuous compilation.

---

## 5. i18n Key Coverage — PARTIAL

| Metric | Value |
|--------|-------|
| Common TRC keys (AR ∩ EN) | 270 |
| TRC keys in EN only | 232 |
| TRC keys in AR only | 0 |
| Total EN TRC keys | 502 |
| Total AR TRC keys | 270 |
| **AR coverage** | **53.8%** |

**Missing in Arabic (top categories):**
- `recovery.medicalDisclaimer.*` — 7 keys
- `recoveryAssets.a52.breathing.*` — breathing exercise labels
- `recoveryAssets.a52.bridge.*` — bridge exercise labels
- +217 more keys across TRC features

**Findings:**
- ✅ All Arabic keys have English counterparts (no orphan AR keys)
- ⚠️ **232 TRC keys missing Arabic translations** — 46.2% gap
- ⚠️ Missing keys will fall back to English, which may confuse Arabic-speaking users

**Recommendation:** Prioritize translating the 232 missing TRC keys in `messages/ar.json`, especially:
1. Breathing exercise labels (`recoveryAssets.a52.*`)
2. Medical disclaimer text (`recovery.medicalDisclaimer.*`)
3. Worksheet labels (`recoveryAssets.worksheets.*`)

---

## 6. TypeScript Typecheck — BLOCKED

| Metric | Value |
|--------|-------|
| Command | `npx tsc --noEmit` |
| Result | OOM (JavaScript heap out of memory) |
| Memory at crash | ~490 MB |

**Findings:**
- ❌ Typecheck cannot complete — server has insufficient RAM for TypeScript compilation
- The `tsc` process consumed all available heap (~490 MB) before being killed
- This is a known limitation of running TypeScript on small VPS instances

**Recommendation:** Run typecheck in CI/CD pipeline with adequate memory (≥2 GB), not on the production server.

---

## Action Items (Priority Order)

| # | Action | Priority | Impact |
|---|--------|----------|--------|
| 1 | Switch to production build: `next build && next start` | 🔴 Critical | Eliminates Turbopack errors, reduces CPU/RAM |
| 2 | Clear `.next` cache to resolve SST corruption | 🔴 Critical | Stops restart loop |
| 3 | Fix `/robots.txt` conflicting route | 🟡 Medium | Eliminates 500 error |
| 4 | Translate 232 missing AR TRC keys | 🟡 Medium | Full Arabic coverage |
| 5 | Migrate `middleware.ts` → `proxy.ts` | 🟢 Low | Next.js 16 compliance |
| 6 | Set up CI typecheck (not on server) | 🟢 Low | Type safety validation |

---

*Report generated by Agent Swarm 7 — Production Gate Tester*

