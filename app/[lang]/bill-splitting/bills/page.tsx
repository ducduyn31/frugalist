import React from 'react'
import { PageHeader } from '@/components/page-header'
import { appRouter } from '@/trpc/router'
import { createContext } from '@/trpc/trpc-server'
import { BillList } from '@/app/[lang]/bill-splitting/bills/_components/bill-list'

export default async function AddBills() {
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const bills = await caller.listBills()

  return (
    <>
      <PageHeader namespace="bill-splitting.bills" addAction="bills/new" />
      <main className="mt-20">
        <BillList initialBills={bills} />
      </main>
    </>
  )
}
