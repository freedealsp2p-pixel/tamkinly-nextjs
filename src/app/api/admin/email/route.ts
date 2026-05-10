import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/admin-auth';

// Get email queue and logs
export async function GET(request: NextRequest) {
  try {
    const password = request.nextUrl.searchParams.get('password');
    
    if (!verifyAdminPassword(password || '')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const type = request.nextUrl.searchParams.get('type') || 'all'; // all, queue, logs, subscriptions

    const result: Record<string, unknown> = {};

    if (type === 'all' || type === 'queue') {
      const queue = await db.emailQueue.findMany({
        orderBy: { scheduledAt: 'desc' },
        take: 50,
      });
      result.queue = queue;
      result.queueStats = {
        pending: await db.emailQueue.count({ where: { status: 'PENDING' } }),
        queued: await db.emailQueue.count({ where: { status: 'QUEUED' } }),
        sending: await db.emailQueue.count({ where: { status: 'SENDING' } }),
        sent: await db.emailQueue.count({ where: { status: 'SENT' } }),
        failed: await db.emailQueue.count({ where: { status: 'FAILED' } }),
        cancelled: await db.emailQueue.count({ where: { status: 'CANCELLED' } }),
      };
    }

    if (type === 'all' || type === 'logs') {
      const logs = await db.emailLog.findMany({
        orderBy: { sentAt: 'desc' },
        take: 100,
      });
      result.logs = logs;
      result.logStats = {
        pending: await db.emailLog.count({ where: { status: 'PENDING' } }),
        sent: await db.emailLog.count({ where: { status: 'SENT' } }),
        failed: await db.emailLog.count({ where: { status: 'FAILED' } }),
        bounced: await db.emailLog.count({ where: { status: 'BOUNCED' } }),
      };
    }

    if (type === 'all' || type === 'subscriptions') {
      const subscriptions = await db.emailSubscription.findMany({
        orderBy: { subscribedAt: 'desc' },
        take: 50,
      });
      result.subscriptions = subscriptions;
      result.subscriberStats = {
        active: await db.emailSubscription.count({ where: { status: 'ACTIVE' } }),
        unsubscribed: await db.emailSubscription.count({ where: { status: 'UNSUBSCRIBED' } }),
        bounced: await db.emailSubscription.count({ where: { status: 'BOUNCED' } }),
        complained: await db.emailSubscription.count({ where: { status: 'COMPLAINED' } }),
      };
    }

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Get email data error:', error);
    return NextResponse.json({ error: 'Failed to fetch email data' }, { status: 500 });
  }
}
