import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdmin } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const sourceType = searchParams.get('sourceType')
  const sourceId = searchParams.get('sourceId')

  if (!sourceType || !sourceId) {
    return NextResponse.json({ error: 'sourceType and sourceId are required' }, { status: 400 })
  }

  const relationships = await db.contentRelationship.findMany({
    where: { sourceType: sourceType as any, sourceId },
    orderBy: { sortOrder: 'asc' },
  })

  return NextResponse.json(relationships)
}

export async function POST(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { sourceType, sourceId, targetType, targetSlug, label, sortOrder } = body

  if (!sourceType || !sourceId || !targetType || !targetSlug) {
    return NextResponse.json({ error: 'sourceType, sourceId, targetType, and targetSlug are required' }, { status: 400 })
  }

  const relationship = await db.contentRelationship.create({
    data: {
      sourceType: sourceType as any,
      sourceId,
      targetType: targetType as any,
      targetSlug,
      label: label || null,
      sortOrder: sortOrder ?? 0,
    },
  })

  return NextResponse.json(relationship, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id, label, sortOrder } = body

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  const relationship = await db.contentRelationship.update({
    where: { id },
    data: {
      ...(label !== undefined && { label }),
      ...(sortOrder !== undefined && { sortOrder }),
    },
  })

  return NextResponse.json(relationship)
}

export async function DELETE(request: NextRequest) {
  const auth = await verifyAdmin()
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  await db.contentRelationship.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
