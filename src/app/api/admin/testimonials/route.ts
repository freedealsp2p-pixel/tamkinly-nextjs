import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth-jwt';

// Get all testimonials
export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    
    if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

    const testimonials = await db.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      testimonials: testimonials.map(t => ({
        id: t.id,
        name: t.name,
        role: t.role,
        avatar: t.avatar,
        content: t.content,
        rating: t.rating,
        isApproved: t.isApproved,
        isFeatured: t.isFeatured,
        sortOrder: t.sortOrder,
        createdAt: t.createdAt,
      })),
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// Update testimonial (approve/disapprove/feature)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

    const { testimonialId, isApproved, isFeatured } = await request.json();

    if (!testimonialId) {
      return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });
    }

    const updateData: { isApproved?: boolean; isFeatured?: boolean } = {};
    if (typeof isApproved === 'boolean') updateData.isApproved = isApproved;
    if (typeof isFeatured === 'boolean') updateData.isFeatured = isFeatured;

    const testimonial = await db.testimonial.update({
      where: { id: testimonialId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      testimonial: {
        id: testimonial.id,
        name: testimonial.name,
        isApproved: testimonial.isApproved,
        isFeatured: testimonial.isFeatured,
      },
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

// Delete testimonial
export async function DELETE(request: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

    const { testimonialId } = await request.json();

    if (!testimonialId) {
      return NextResponse.json({ error: 'Testimonial ID required' }, { status: 400 });
    }

    await db.testimonial.delete({
      where: { id: testimonialId },
    });

    return NextResponse.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
