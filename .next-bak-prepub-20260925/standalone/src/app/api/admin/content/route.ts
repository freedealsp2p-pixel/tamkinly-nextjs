import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth-jwt';
import { readdir } from 'fs/promises';
import path from 'path';

// Get content stats
export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

    // Count blog articles (static pages in /blog directory)
    const blogDir = path.join(process.cwd(), 'src/app/blog');
    let blogCount = 0;
    
    try {
      const entries = await readdir(blogDir, { withFileTypes: true });
      blogCount = entries.filter(entry => entry.isDirectory()).length;
    } catch {
      // Directory doesn't exist or error reading
      blogCount = 0;
    }

    // Worksheets count from database
    const worksheetsCount = await db.worksheetResponse.count();

    // Contact messages
    const contactMessages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const unreadCount = await db.contactMessage.count({ where: { isRead: false } });

    // Testimonials
    const testimonials = await db.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const approvedCount = testimonials.filter(t => t.isApproved).length;
    const pendingCount = testimonials.filter(t => !t.isApproved).length;

    // Apps count
    const appsCount = await db.app.count();

    return NextResponse.json({
      success: true,
      content: {
        blog: {
          count: blogCount,
        },
        worksheets: {
          count: worksheetsCount,
        },
        apps: {
          count: appsCount,
        },
        testimonials: {
          total: testimonials.length,
          approved: approvedCount,
          pending: pendingCount,
          list: testimonials.map(t => ({
            id: t.id,
            name: t.name,
            role: t.role,
            content: t.content.substring(0, 100) + (t.content.length > 100 ? '...' : ''),
            rating: t.rating,
            isApproved: t.isApproved,
            isFeatured: t.isFeatured,
            createdAt: t.createdAt,
          })),
        },
        contact: {
          unread: unreadCount,
          recent: contactMessages.map(m => ({
            id: m.id,
            name: m.name,
            email: m.email,
            subject: m.subject,
            message: m.message.substring(0, 100) + (m.message.length > 100 ? '...' : ''),
            isRead: m.isRead,
            isReplied: m.isReplied,
            createdAt: m.createdAt,
          })),
        },
      },
    });
  } catch (error) {
    console.error('Get content error:', error);
    return NextResponse.json({ error: 'Failed to fetch content stats' }, { status: 500 });
  }
}
