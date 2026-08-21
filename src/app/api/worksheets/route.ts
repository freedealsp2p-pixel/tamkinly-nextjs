import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

// GET - Get all worksheet data for the authenticated user only
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const userId = session.user.id;

    const worksheets = await db.worksheetData.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    // Group by type
    const grouped = worksheets.reduce((acc, worksheet) => {
      const type = worksheet.worksheetType;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push({
        id: worksheet.id,
        type: worksheet.worksheetType,
        data: JSON.parse(worksheet.data),
        score: worksheet.score,
        completedAt: worksheet.completedAt,
        createdAt: worksheet.createdAt,
      });
      return acc;
    }, {} as Record<string, unknown[]>);

    return NextResponse.json({
      success: true,
      worksheets: grouped,
      total: worksheets.length,
    });
  } catch (error) {
    console.error('Get worksheets error:', error);
    return NextResponse.json({ error: 'Failed to get worksheets' }, { status: 500 });
  }
}

// POST - Save worksheet data for the authenticated user only
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { worksheetType, data, score } = body;

    // Note: userId is now taken from session, NOT from client
    const userId = session.user.id;

    if (!worksheetType || !data) {
      return NextResponse.json(
        { error: 'worksheetType and data are required' },
        { status: 400 }
      );
    }

    // Validate worksheet type
    const validTypes = ['WHO_AM_I', 'IDENTITY_HABITS', 'SELF_AUTHORSHIP', 'IDENTITY_BASELINE', 'ENVIRONMENTAL_AUDIT', 'ERQ'];
    if (!validTypes.includes(worksheetType)) {
      return NextResponse.json(
        { error: `Invalid worksheet type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const worksheet = await db.worksheetData.create({
      data: {
        userId,
        worksheetType,
        data: JSON.stringify(data),
        score: score || null,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      worksheet: {
        id: worksheet.id,
        type: worksheet.worksheetType,
        data: JSON.parse(worksheet.data),
        score: worksheet.score,
        completedAt: worksheet.completedAt,
        createdAt: worksheet.createdAt,
      },
    });
  } catch (error) {
    console.error('Save worksheet error:', error);
    return NextResponse.json({ error: 'Failed to save worksheet' }, { status: 500 });
  }
}
