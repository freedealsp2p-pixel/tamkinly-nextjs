// TAMKINLY — server error sink (SWARM-OPS-20260930)
// Next.js instrumentation hook: every unhandled server request error is
// recorded into the agent_events table so the swarm bug catcher can see it.
// This file must NEVER break the app — everything is wrapped in try/catch.

export async function register() {
  // no-op; the real work happens in onRequestError
}

async function sinkError(message: string, meta: Record<string, unknown>): Promise<void> {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  try {
    const { db } = await import('@/lib/db');
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
       VALUES (?, 'ERROR', 'HIGH', ?, ?, 'OPEN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      globalThis.crypto.randomUUID(),
      String(message).slice(0, 300),
      JSON.stringify(meta || {}).slice(0, 4000)
    );
  } catch {
    /* swallow — observability must never crash the app */
  }
}

export async function onRequestError(
  err: unknown,
  request: unknown,
  context: unknown
): Promise<void> {
  try {
    const message = err instanceof Error ? err.message : String(err);
    const meta: Record<string, unknown> = {};
    const ctx = context as { path?: string; method?: string; routerKind?: string } | undefined;
    if (ctx?.path) meta.path = String(ctx.path);
    if (ctx?.method) meta.method = String(ctx.method);
    if (ctx?.routerKind) meta.routerKind = String(ctx.routerKind);
    const req = request as { url?: string } | undefined;
    if (req?.url) meta.url = String(req.url).slice(0, 500);
    if (err instanceof Error && err.stack) meta.stack = err.stack.slice(0, 1500);
    await sinkError(message, meta);
  } catch {
    /* swallow */
  }
}
