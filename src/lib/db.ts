import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Production: no query logging (was leaking customerEmail in logs)
// Development: enable query + error logging for debugging
const logLevel = process.env.NODE_ENV === 'production'
  ? ['error', 'warn'] as const
  : ['query', 'error', 'warn'] as const

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: [...logLevel],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
