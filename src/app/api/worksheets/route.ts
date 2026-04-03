import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Get all worksheet data for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

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
    return NextResponse.json(
      { error: 'Failed to get worksheets' },
      { status: 500 }
    );
  }
}

// POST - Save worksheet data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, worksheetType, data, score } = body;

    if (!userId || !worksheetType || !data) {
      return NextResponse.json(
        { error: 'userId, worksheetType, and data are required' },
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
    return NextResponse.json(
      { error: 'Failed to save worksheet' },
      { status: 500 }
    );
  }
}
