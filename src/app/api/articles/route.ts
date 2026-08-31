import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const language = searchParams.get('language') || 'en'
  const category = searchParams.get('category')
  const featured = searchParams.get('featured')

  // Single article by slug
  if (slug) {
    const article = await db.article.findUnique({
      where: { slug, status: 'PUBLISHED' },
      include: {
        categories: { select: { id: true, name: true, nameAr: true, slug: true } },
        topics: { select: { id: true, name: true, nameAr: true, slug: true } },
        linkedArticle: { select: { id: true, slug: true, language: true, title: true } },
      },
    })
    if (!article) return NextResponse.json(null)

    // Get relationships for this article
    const rels = await db.contentRelationship.findMany({
      where: { sourceType: 'ARTICLE', sourceId: article.id },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json({ article, relationships: rels })
  }

  // Articles listing
  const where: any = { status: 'PUBLISHED' }
  if (language) where.language = language
  if (featured === 'true') where.isFeatured = true
  if (category) {
    where.categories = { some: { slug: category } }
  }

  const articles = await db.article.findMany({
    where,
    orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
    include: {
      categories: { select: { id: true, name: true, nameAr: true, slug: true } },
      topics: { select: { id: true, name: true, nameAr: true, slug: true } },
    },
    take: 50,
  })

  return NextResponse.json(articles)
}
