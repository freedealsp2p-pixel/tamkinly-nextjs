import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';

// Get all habits for user
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ habits: [] });
    }

    const habits = await db.habit.findMany({
      where: { 
        userId: user.id,
        isArchived: false,
      },
      include: {
        completions: {
          where: {
            date: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            },
          },
          orderBy: { date: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ habits });
  } catch (error) {
    console.error('Get habits error:', error);
    return NextResponse.json({ habits: [] });
  }
}

// Create new habit
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, icon, color, frequency, daysOfWeek, reminder } = await request.json();

    const habit = await db.habit.create({
      data: {
        userId: user.id,
        name,
        description,
        icon,
        color,
        frequency: frequency || 'DAILY',
        daysOfWeek: JSON.stringify(daysOfWeek || [0, 1, 2, 3, 4, 5, 6]),
        reminder,
      },
    });

    return NextResponse.json({ habit });
  } catch (error) {
    console.error('Create habit error:', error);
    return NextResponse.json({ error: 'Failed to create habit' }, { status: 500 });
  }
}
