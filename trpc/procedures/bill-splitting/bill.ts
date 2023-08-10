'use server'
import { authorizedProcedure } from '@/trpc/trpc-server'
import { BillFormValuesSchema } from '@/app/[lang]/bill-splitting/bills/bill-form'
import db from '@/lib/db'
import * as yup from 'yup'

export const createOrUpdateBill = authorizedProcedure
  .input(BillFormValuesSchema)
  .mutation(async opts => {
    const { session } = opts.ctx
    const { name, range, items, id } = opts.input
    if (!session?.user?.email) {
      throw new Error('Not authorized')
    }
    if (id) {
      await db.payable.update({
        where: {
          id,
        },
        data: {
          name,
          components: items,
          fromDate: range.from,
          toDate: range.to || new Date(),
        },
      })
    } else {
      await db.payable.create({
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
    }
  })

export const listBills = authorizedProcedure.query(async opts => {
  const { session } = opts.ctx
  if (!session?.user?.email) {
    throw new Error('Not authorized')
  }
  return db.payable.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
  })
})

const BillIdSchema = yup.object().shape({
  id: yup.string().required(),
})

export const removeBill = authorizedProcedure
  .input(BillIdSchema)
  .mutation(async ({ input, ctx }) => {
    const { session } = ctx
    if (!session?.user?.email) {
      throw new Error('Not authorized')
    }

    return db.payable.delete({
      where: {
        id: input.id,
      },
    })
  })

export const getBillById = authorizedProcedure
  .input(BillIdSchema)
  .query(async ({ input, ctx }) => {
    const { session } = ctx
    if (!session?.user?.email) {
      throw new Error('Not authorized')
    }

    return db.payable.findUnique({
      where: {
        id: input.id,
      },
    })
  })
