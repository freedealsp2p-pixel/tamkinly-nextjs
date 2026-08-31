import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET() {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const cats = await db.articleCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { articles: true } } },
  })
  return NextResponse.json(cats)
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const cat = await db.articleCategory.create({
    data: {
      name: body.name,
      nameAr: body.nameAr || null,
      slug: body.slug,
      description: body.description || null,
      sortOrder: body.sortOrder ?? 0,
    },
  })
  return NextResponse.json(cat, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  if (!body.id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  const cat = await db.articleCategory.update({
    where: { id: body.id },
    data: {
      name: body.name,
      nameAr: body.nameAr !== undefined ? body.nameAr : undefined,
      description: body.description !== undefined ? body.description : undefined,
      sortOrder: body.sortOrder !== undefined ? body.sortOrder : undefined,
      isActive: body.isActive !== undefined ? body.isActive : undefined,
    },
  })
  return NextResponse.json(cat)
}

export async function DELETE(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await db.articleCategory.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
