import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getAppPageBySlug } from '@/lib/app-pages';

// Tier hierarchy for access control
const TIER_HIERARCHY: Record<string, number> = {
  FREE: 0,
  BASIC: 1,
  PREMIUM: 2,
  MASTERY: 3,
};

export interface AccessCheckResult {
  hasAccess: boolean;
  userTier: string;
  requiredTier: string;
  reason?: string;
}

/**
 * Check if a user has access to a specific app based on their tier.
 * This function runs SERVER-SIDE ONLY and checks the database.
 */
export async function checkAppAccess(appSlug: string, accessCode?: string): Promise<AccessCheckResult> {
  // Get app config
  const appConfig = getAppPageBySlug(appSlug);
  if (!appConfig) {
    return { hasAccess: false, userTier: 'FREE', requiredTier: 'FREE', reason: 'App not found' };
  }

  // FREE apps are always accessible
  if (appConfig.tier === 'FREE') {
    return { hasAccess: true, userTier: 'FREE', requiredTier: 'FREE' };
  }

  const requiredLevel = TIER_HIERARCHY[appConfig.tier] || 0;

  // Try to get authenticated user
  let user: any = null;
  try {
    user = await getCurrentUser();
  } catch {
    // User not authenticated
  }

  // Check access code first (if provided)
  if (accessCode) {
    try {
      const access = await db.appAccess.findUnique({
        where: { code: accessCode.toUpperCase() },
      });
      if (access && access.isActive && (!access.expiresAt || new Date() < access.expiresAt)) {
        const codeLevel = TIER_HIERARCHY[access.tier] || 0;
        if (codeLevel >= requiredLevel) {
          return { hasAccess: true, userTier: access.tier, requiredTier: appConfig.tier };
        }
      }
    } catch (error) {
      console.error('Access code check error:', error);
    }
  }

  // Check user session
  if (user?.accessTier) {
    const userLevel = TIER_HIERARCHY[user.accessTier] || 0;
    if (userLevel >= requiredLevel) {
      return { hasAccess: true, userTier: user.accessTier, requiredTier: appConfig.tier };
    }
    return { 
      hasAccess: false, 
      userTier: user.accessTier, 
      requiredTier: appConfig.tier,
      reason: `Your ${user.accessTier} plan doesn't include this app. Upgrade to ${appConfig.tier} to access it.`
    };
  }

  // Check if user has any active access codes in the database
  if (user?.id) {
    try {
      const accessCodes = await db.appAccess.findMany({
        where: { 
          email: user.email,
          isActive: true,
        },
        orderBy: { createdAt: 'desc' },
      });
      
      for (const code of accessCodes) {
        if (code.expiresAt && new Date() > code.expiresAt) continue;
        const codeLevel = TIER_HIERARCHY[code.tier] || 0;
        if (codeLevel >= requiredLevel) {
          return { hasAccess: true, userTier: code.tier, requiredTier: appConfig.tier };
        }
      }
      
      // Get highest tier
      const highestTier = accessCodes.reduce((highest, code) => {
        if (code.expiresAt && new Date() > code.expiresAt) return highest;
        const level = TIER_HIERARCHY[code.tier] || 0;
        return level > TIER_HIERARCHY[highest] ? code.tier : highest;
      }, 'FREE');
      
      return { 
        hasAccess: false, 
        userTier: highestTier, 
        requiredTier: appConfig.tier,
        reason: `Your ${highestTier} plan doesn't include this app. Upgrade to ${appConfig.tier} to access it.`
      };
    } catch (error) {
      console.error('User access check error:', error);
    }
  }

  return { 
    hasAccess: false, 
    userTier: 'FREE', 
    requiredTier: appConfig.tier,
    reason: 'Sign in or enter an access code to access this app.'
  };
}

/**
 * Get the tier hierarchy level for comparison
 */
export function getTierLevel(tier: string): number {
  return TIER_HIERARCHY[tier] || 0;
}

