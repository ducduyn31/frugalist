'use server'
import { authorizedProcedure } from '@/trpc/trpc-server'
import { BillFormValuesSchema } from '@/app/[lang]/bill-splitting/bills/bill-form'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const billCreator = authorizedProcedure
  .input(BillFormValuesSchema)
  .mutation(async opts => {
    const { session } = opts.ctx
    const { name, range, items } = opts.input
    if (!session?.user?.email) {
      throw new Error('Not authorized')
    }
    await prisma.payable.create({
      data: {
        name,
        components: items,
        fromDate: range.from,
        toDate: range.to || new Date(),
        user: {
          connect: {
            email: session.user.email,
          },
        },
      },
    })
  })
