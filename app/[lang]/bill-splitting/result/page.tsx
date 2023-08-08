import React from 'react'
import { PageHeader } from '@/components/page-header'
import { createContext } from '@/trpc/trpc-server'
import { appRouter } from '@/trpc/router'
import { PayResult } from '@/app/[lang]/bill-splitting/result/_components/pay-result'

export default async function ResultView() {
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const billSplit = await caller.splitBill()

  return (
    <>
      <PageHeader namespace="bill-splitting.result" />
      <main className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(billSplit).map(({ member, payComponents }) => (
            <PayResult
              member={member}
              payComponents={payComponents}
              key={member.name}
            />
          ))}
        </div>
      </main>
    </>
  )
}
