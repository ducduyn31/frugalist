import { PrismaClient } from '@prisma/client'

let db: PrismaClient

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient({
    log: ['query', 'info', 'warn'],
  })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn'],
    })
  }

  db = global.prisma
}

export default db
