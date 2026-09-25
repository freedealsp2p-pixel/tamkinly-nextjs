import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'
import { ContentTargetType } from '@prisma/client'

export async function GET(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const sourceType = searchParams.get('sourceType') as ContentTargetType | null
  const sourceId = searchParams.get('sourceId')

  if (!sourceType || !sourceId) {
    return NextResponse.json({ error: 'sourceType and sourceId required' }, { status: 400 })
  }

  const rels = await db.contentRelationship.findMany({
    where: { sourceType, sourceId },
    orderBy: { sortOrder: 'asc' },
  })
  return NextResponse.json(rels)
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const rel = await db.contentRelationship.create({
    data: {
      sourceType: body.sourceType,
      sourceId: body.sourceId,
      targetType: body.targetType,
      targetSlug: body.targetSlug,
      label: body.label || null,
      sortOrder: body.sortOrder ?? 0,
    },
  })
  return NextResponse.json(rel, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
  await db.contentRelationship.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
