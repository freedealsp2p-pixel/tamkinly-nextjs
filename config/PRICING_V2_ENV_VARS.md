# PRICING MODEL V2 — Server Environment Variables (P2 handoff)

> Created 2026-10-21 by AUD-1 per founder-approved Pricing Model V2.
> The code (P1) is already merged. This file documents the env vars that must
> exist on the production server BEFORE enabling the new Tribute one-time products.

## NEW — one-time products (V2)

| Variable | Value | Purpose |
|---|---|---|
| `TRIBUTE_PRODUCT_PLANNER` | numeric Tribute product ID (founder sends it) | Webhook: matches `new_digital_product` events → grants **PREMIUM** tier access, PERMANENT (no expiry) |
| `TRIBUTE_PRODUCT_MASTERY` | numeric Tribute product ID (founder sends it) | Webhook: matches `new_digital_product` events → grants **MASTERY** tier access, PERMANENT (no expiry) |
| `TRIBUTE_LINK_PLANNER` | full Telegram payment link (`https://t.me/tribute/app?startapp=p...`) copied from Tribute dashboard | Buy-button target for the $9.99 Identity Recode Planner |
| `TRIBUTE_LINK_PLANNER_WEB` | full web payment link (`https://web.tribute.tg/p/...`) | Web checkout redirect for the Planner |
| `TRIBUTE_LINK_MASTERY` | full Telegram payment link | Buy-button target for the $27 Mastery |
| `TRIBUTE_LINK_MASTERY_WEB` | full web payment link | Web checkout redirect for Mastery |

Endpoint: `GET /api/tribute/redirect?product=planner|mastery` → 302 to the configured link.
Legacy endpoint (`?tier=basic|premium|mastery`) keeps working for existing subscribers.

## LEGACY — monthly subscriptions (kept, honored until self-cancel — founder decision #2)

| Variable | Status |
|---|---|
| `TRIBUTE_SUBSCRIPTION_BASIC` | KEEP on server — legacy renewals still processed |
| `TRIBUTE_SUBSCRIPTION_PREMIUM` | KEEP — legacy renewals |
| `TRIBUTE_SUBSCRIPTION_MASTERY` | KEEP — legacy renewals |
| `TRIBUTE_PRODUCT_TEMPORAL_DECOUPLING` / `_WHITE_MIRROR` / `_ALTERNATIVE_CODE` | UNCHANGED — $99 protocols |

## Sequence (P2 → P6)

1. Founder creates the two one-time products in the Tribute dashboard ($9.99 / $27).
2. Founder sends AUD-1 the two product IDs + the four payment links.
3. IDs/links go into the server `.env` (values NEVER committed to the repo).
4. The three legacy Tribute subscriptions are stopped in the Tribute dashboard (decision #4) — only AFTER the new products are live.
5. Founder test-purchases $9.99 → verifies code email + permanent access → then Purge Everything (P6).
