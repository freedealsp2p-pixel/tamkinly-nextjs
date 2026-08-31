'use server'

import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'articles')
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    if (file.size > MAX_SIZE) return NextResponse.json({ error: 'Too large' }, { status: 400 })

    if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true })

    const bytes = await file.arrayBuffer()
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filePath = join(UPLOAD_DIR, safeName)
    await writeFile(filePath, Buffer.from(bytes))

    return NextResponse.json({
      url: `/uploads/articles/${safeName}`,
      filename: safeName,
      size: file.size,
      type: file.type,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
