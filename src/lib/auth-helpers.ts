import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  return user;
}

export async function requireTier(minTier: string) {
  const user = await requireAuth();
  const tiers = ['FREE', 'TRIAL', 'BASIC', 'PREMIUM', 'BUNDLE'];
  const userTierIndex = tiers.indexOf(user.accessTier);
  const requiredTierIndex = tiers.indexOf(minTier);
  
  if (userTierIndex < requiredTierIndex) {
    throw new Error(`${minTier} access required`);
  }
  return user;
}
