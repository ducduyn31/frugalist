import { authorizedProcedure } from '@/trpc/trpc-server'
import { BillFormValuesSchema } from '@/app/[lang]/bill-splitting/bills/bill-form'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const billCreator = authorizedProcedure
  .input(BillFormValuesSchema)
  .mutation(async opts => {
    const { name, range } = opts.input
    prisma.payable.create({
      data: {
        name,
        components: [],
        fromDate: range.from,
        toDate: range.to || new Date(),
        user: {
          connect: {
            email: '',
          },
        },
      },
    })
  })
