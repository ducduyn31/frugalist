import React from 'react'
import { PageHeader } from '@/components/page-header'
import { NoBillState } from '@/app/[lang]/bill-splitting/bills/_components/no-bill-state'

export default function AddBills() {
  return (
    <>
      <PageHeader namespace="bill-splitting.bills" addAction="bills/new" />
      <main className="mt-20">
        <NoBillState />
      </main>
    </>
  )
}
