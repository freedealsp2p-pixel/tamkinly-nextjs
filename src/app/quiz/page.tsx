/**
 * TAMKINLY — /quiz server page (AUD-1, 2026-10-19)
 * Founder approved UTM landing capture («approve utm»).
 * Server component: logs campaign landing into agent_events (landing-only,
 * no cookies, no schema change, no payment/auth touch), then renders the
 * unchanged client quiz. Direct landings (no utm params) are not logged.
 * Rollback: UTM_LOG=off or revert this commit.
 */
import QuizClient from './QuizClient';
import { logQuizUtm, type UtmSearchParams } from '@/lib/utm-logger';

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<UtmSearchParams>;
}) {
  const params = await searchParams;
  await logQuizUtm(params);
  return <QuizClient />;
}
