import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'
import { ArticleStatus, ContentTargetType } from '@prisma/client'

type ArticleWithRelations = {
  id: string
  title: string
  slug: string
  language: string
  status: string
  isFeatured: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  categories: { id: string; name: string; slug: string }[]
  topics: { id: string; name: string; slug: string }[]
  linkedArticleId: string | null
  excerpt: string | null
  readTimeMinutes: number | null
}

export async function GET(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const language = searchParams.get('language')
  const search = searchParams.get('search')

  const where: any = {}
  if (status) where.status = status as ArticleStatus
  if (language) where.language = language
  if (search) where.OR = [
    { title: { contains: search } },
    { slug: { contains: search } },
    { excerpt: { contains: search } },
  ]

  const articles = await db.article.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      categories: { select: { id: true, name: true, slug: true } },
      topics: { select: { id: true, name: true, slug: true } },
    },
  })

  return NextResponse.json(articles)
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { categoryIds, topicIds, ...data } = body

  // Check slug uniqueness
  if (data.slug) {
    const existing = await db.article.findUnique({ where: { slug: data.slug } })
    if (existing) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
  }

  const article = await db.article.create({
    data: {
      ...data,
      status: data.status || 'DRAFT',
      publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      categories: categoryIds?.length
        ? { connect: categoryIds.map((id: string) => ({ id })) }
        : undefined,
      topics: topicIds?.length
        ? { connect: topicIds.map((id: string) => ({ id })) }
        : undefined,
    },
    include: {
      categories: { select: { id: true, name: true, slug: true } },
      topics: { select: { id: true, name: true, slug: true } },
    },
  })

  return NextResponse.json(article, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, categoryIds, topicIds, ...data } = body
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  // Handle publish status change
  if (data.status === 'PUBLISHED') {
    data.publishedAt = new Date()
  } else if (data.status === 'DRAFT') {
    data.publishedAt = null
  }

  const article = await db.article.update({
    where: { id },
    data: {
      ...data,
      categories: categoryIds !== undefined
        ? { set: categoryIds.map((cid: string) => ({ id: cid })) }
        : undefined,
      topics: topicIds !== undefined
        ? { set: topicIds.map((tid: string) => ({ id: tid })) }
        : undefined,
    },
    include: {
      categories: { select: { id: true, name: true, slug: true } },
      topics: { select: { id: true, name: true, slug: true } },
    },
  })

  return NextResponse.json(article)
}

export async function DELETE(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await db.article.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
