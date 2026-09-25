import { permanentRedirect } from 'next/navigation';

export default function IdentityPlannerRedirect() {
  permanentRedirect('/apps/daily-planner');
}
