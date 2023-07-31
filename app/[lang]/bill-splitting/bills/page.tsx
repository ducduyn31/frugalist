import React from 'react'
import { PageHeader } from '@/components/page-header'
import { NoBillState } from '@/app/[lang]/bill-splitting/bills/no-bill-state'

export default function AddBills() {
  return (
    <>
      <PageHeader namespace="bills" />
      <main className="mt-20">
        <NoBillState />
      </main>
    </>
  )
}
