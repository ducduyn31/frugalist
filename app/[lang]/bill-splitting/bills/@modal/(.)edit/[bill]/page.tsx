import React from 'react'
import { EditBillForm } from '@/app/[lang]/bill-splitting/bills/_components/edit-bill-form'
import { createContext } from '@/trpc/trpc-server'
import { appRouter } from '@/trpc/router'

interface Props {
  params: {
    bill: string
  }
}

export default async function EditBill({ params }: Props) {
  const { bill: billId } = params
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const billPromise = caller.getBillById({
    id: billId,
  })

  return <EditBillForm billPromise={billPromise} />
}
