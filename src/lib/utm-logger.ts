/**
 * TAMKINLY — Quiz landing UTM capture (server-side, landing-only)
 * AUD-1, 2026-10-19 — executed after founder's literal approval: «approve utm».
 * Design doc: swarm repo data/audit/2026-10-19/utm_recording_design.md
 *
 * Binding constraints (founder directive):
 *  - landing only, NO cookies / localStorage / client fingerprinting
 *  - writes ONLY into the existing agent_events table — NO schema change
 *    (same CREATE TABLE IF NOT EXISTS definition as src/instrumentation.ts)
 *  - NO touching payment or auth paths
 *  - rollback: set UTM_LOG=off (env) or revert this commit
 *
 * A row is written ONLY when at least one utm_* param is present on /quiz.
 * Direct landings are intentionally not logged (baseline lives in
 * Cloudflare Web Analytics). Any failure is swallowed — logging must
 * never break the quiz page.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

export type UtmSearchParams = Record<string, string | string[] | undefined>;

function cleanValue(raw: string): string {
  const s = raw.trim().toLowerCase().slice(0, 60);
  return /^[a-z0-9_-]{1,60}$/.test(s) ? s : 'invalid';
}

export async function logQuizUtm(searchParams: UtmSearchParams): Promise<void> {
  try {
    // kill switch — rollback without touching data
    if (process.env.UTM_LOG === 'off') return;
    if (process.env.NEXT_RUNTIME !== 'nodejs') return;

    const present = UTM_KEYS.filter((k) => searchParams[k] !== undefined);
    if (present.length === 0) return;

    const payload: Record<string, unknown> = { path: '/quiz' };
    const missing: string[] = [];

    for (const k of UTM_KEYS) {
      const raw = searchParams[k];
      const value = Array.isArray(raw) ? raw[0] : raw;
      if (value === undefined || value === '') {
        missing.push(k);
        continue;
      }
      payload[k] = cleanValue(value);
    }

    // unexpected params: names only, values dropped (no PII by construction)
    const extra = Object.keys(searchParams)
      .filter((k) => !(UTM_KEYS as readonly string[]).includes(k))
      .slice(0, 10);
    payload.missing = missing;
    payload.extra = extra;

    const { db } = await import('@/lib/db');

    // identical idempotent definition to src/instrumentation.ts — NOT a schema change
    await db.$executeRawUnsafe(
      `CREATE TABLE IF NOT EXISTS "agent_events" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "type" TEXT NOT NULL,
        "severity" TEXT NOT NULL DEFAULT 'INFO',
        "title" TEXT,
        "payload" TEXT NOT NULL DEFAULT '{}',
        "status" TEXT NOT NULL DEFAULT 'OPEN',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`
    );

    await db.$executeRawUnsafe(
      `INSERT INTO agent_events (id, type, severity, title, payload, status, createdAt, updatedAt)
       VALUES (?, 'QUIZ_UTM', 'INFO', 'quiz_landing_utm', ?, 'OPEN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      globalThis.crypto.randomUUID(),
      JSON.stringify(payload).slice(0, 2000)
    );
  } catch {
    /* swallow — observability must never crash the app (same policy as instrumentation.ts) */
  }
}
