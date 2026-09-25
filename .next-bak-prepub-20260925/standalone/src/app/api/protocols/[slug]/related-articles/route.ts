import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });

  try {
    // Find articles that link TO this protocol via ContentRelationship
    const relationships = await db.contentRelationship.findMany({
      where: {
        targetType: 'THERAPEUTIC_PROTOCOL',
        targetSlug: slug,
        sourceType: 'ARTICLE',
      },
      orderBy: { sortOrder: 'asc' },
    });

    if (relationships.length === 0) {
      return NextResponse.json([]);
    }

    // Fetch the actual articles
    const articleIds = relationships.map(r => r.sourceId);
    const articles = await db.article.findMany({
      where: {
        id: { in: articleIds },
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        title: true,
                slug: true,
        excerpt: true,
        featuredImage: true,
        language: true,
        readTimeMinutes: true,
        categories: {
          select: { name: true, nameAr: true, slug: true, }
        },
      },
    });

    // Merge label from relationship
    const result = articles.map(a => {
      const rel = relationships.find(r => r.sourceId === a.id);
      return {
        ...a,
        relationshipLabel: rel?.label || null,
      };
    });

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
