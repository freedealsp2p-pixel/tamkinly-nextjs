import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth-jwt';

// Get comprehensive statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    
    if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

    // Total users
    const totalUsers = await db.user.count();

    // Active users (last 7 days) - users with activity
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activeUsers = await db.user.count({
      where: {
        OR: [
          { lastLoginAt: { gte: sevenDaysAgo } },
          { appUsage: { some: { lastUsedAt: { gte: sevenDaysAgo } } } },
          { journalEntries: { some: { createdAt: { gte: sevenDaysAgo } } } },
        ],
      },
    });

    // Access codes stats
    const totalCodes = await db.appAccess.count();
    const usedCodes = await db.appAccess.count({ where: { isUsed: true } });
    const conversionRate = totalCodes > 0 ? (usedCodes / totalCodes) * 100 : 0;

    // Revenue estimation by tier
    // NEW MODEL: monthly subscription tiers (legacy aliases retained for old data)
    const tierPrices: Record<string, number> = {
      BASIC: 7,
      PREMIUM: 17,
      MASTERY: 27,
      // Legacy aliases (for historical data)
      PLANNER: 17,
      TRIAL: 7,
      BUNDLE: 27,
    };

    const codesByTier = await db.appAccess.groupBy({
      by: ['tier'],
      _count: { id: true },
    });

    const revenueByTier = codesByTier.reduce((acc, item) => {
      const price = tierPrices[item.tier] || 0;
      acc[item.tier] = {
        count: item._count.id,
        revenue: item._count.id * price,
      };
      return acc;
    }, {} as Record<string, { count: number; revenue: number }>);

    const totalRevenue = Object.values(revenueByTier).reduce((sum, item) => sum + item.revenue, 0);

    // Popular apps (most accessed)
    const popularApps = await db.appUsage.groupBy({
      by: ['appSlug'],
      _sum: { usageCount: true },
      _count: { id: true },
      orderBy: { _sum: { usageCount: 'desc' } },
      take: 10,
    });

    // Content stats
    const totalWorksheets = await db.worksheetData.count();
    const totalJournalEntries = await db.journalEntry.count();
    const totalTestimonials = await db.testimonial.count();
    const approvedTestimonials = await db.testimonial.count({ where: { isApproved: true } });
    const pendingTestimonials = totalTestimonials - approvedTestimonials;

    // Contact messages
    const unreadMessages = await db.contactMessage.count({ where: { isRead: false } });

    // Recent signups (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSignups = await db.user.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });

    // Orders stats
    const totalOrders = await db.order.count();
    const completedOrders = await db.order.count({ where: { status: 'COMPLETED' } });
    const pendingOrders = await db.order.count({ where: { status: 'PENDING' } });

    return NextResponse.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          active: activeUsers,
          recentSignups,
        },
        codes: {
          total: totalCodes,
          used: usedCodes,
          unused: totalCodes - usedCodes,
          conversionRate: Math.round(conversionRate * 100) / 100,
        },
        revenue: {
          byTier: revenueByTier,
          total: totalRevenue,
        },
        apps: {
          popular: popularApps.map(app => ({
            slug: app.appSlug,
            usageCount: app._sum.usageCount || 0,
            usersCount: app._count.id,
          })),
        },
        content: {
          worksheets: totalWorksheets,
          journalEntries: totalJournalEntries,
          testimonials: {
            total: totalTestimonials,
            approved: approvedTestimonials,
            pending: pendingTestimonials,
          },
        },
        contact: {
          unreadMessages,
        },
        orders: {
          total: totalOrders,
          completed: completedOrders,
          pending: pendingOrders,
        },
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}
