import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/admin-auth';

// Get all users with search and filter
export async function GET(request: NextRequest) {
  try {
    const password = request.nextUrl.searchParams.get('password');
    
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const search = request.nextUrl.searchParams.get('search') || '';
    const role = request.nextUrl.searchParams.get('role') || '';

    const where: {
      OR?: Array<{ email: { contains: string; mode: 'insensitive' } } | { name: { contains: string; mode: 'insensitive' } }>;
      role?: 'CUSTOMER' | 'ADMIN' | 'EDITOR';
    } = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role && ['CUSTOMER', 'ADMIN', 'EDITOR'].includes(role)) {
      where.role = role as 'CUSTOMER' | 'ADMIN' | 'EDITOR';
    }

    const users = await db.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        accessCodes: {
          select: {
            code: true,
            tier: true,
            isUsed: true,
            createdAt: true,
          },
        },
        progress: {
          select: {
            currentDay: true,
            currentPhase: true,
            currentStreak: true,
            totalExercises: true,
            completedExercises: true,
          },
        },
        appUsage: {
          select: {
            appSlug: true,
            usageCount: true,
            lastUsedAt: true,
          },
          orderBy: { usageCount: 'desc' },
          take: 5,
        },
        _count: {
          select: {
            accessCodes: true,
            journalEntries: true,
            worksheets: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        accessCodes: user.accessCodes,
        progress: user.progress,
        appUsage: user.appUsage,
        stats: {
          accessCodesCount: user._count.accessCodes,
          journalEntriesCount: user._count.journalEntries,
          worksheetsCount: user._count.worksheets,
        },
      })),
    });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// Update user role
export async function PATCH(request: NextRequest) {
  try {
    const { password, userId, role } = await request.json();

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!userId || !role || !['CUSTOMER', 'ADMIN', 'EDITOR'].includes(role)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const user = await db.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// Delete user
export async function DELETE(request: NextRequest) {
  try {
    const { password, userId } = await request.json();

    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    await db.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
