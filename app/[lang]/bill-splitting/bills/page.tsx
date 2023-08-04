import React from 'react'
import { NoBillState } from '@/app/[lang]/bill-splitting/bills/_components/no-bill-state'
import { PageHeader } from '@/components/page-header'
import { appRouter } from '@/trpc/router'
import { createContext } from '@/trpc/trpc-server'
import { BillItem } from '@/app/[lang]/bill-splitting/bills/_components/bill-item'

export default async function AddBills() {
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const bills = await caller.billLister()

  return (
    <>
      <PageHeader namespace="bill-splitting.bills" addAction="bills/new" />
      <main className="mt-20">
        {bills.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bills.map(bill => (
              <BillItem bill={bill} key={bill.id} />
            ))}
          </div>
        ) : (
          <NoBillState />
        )}
      </main>
    </>
  )
}
