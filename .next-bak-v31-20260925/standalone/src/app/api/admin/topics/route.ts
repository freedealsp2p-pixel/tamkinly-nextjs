import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET() {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const topics = await db.articleTopic.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { articles: true } } },
  })
  return NextResponse.json(topics)
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const topic = await db.articleTopic.create({
    data: { name: body.name, nameAr: body.nameAr || null, slug: body.slug },
  })
  return NextResponse.json(topic, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await db.articleTopic.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
