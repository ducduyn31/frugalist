'use client'
import React from 'react'
import { Payable } from '@prisma/client'
import { trpc } from '@/trpc/trpc-client'
import { NoBillState } from '@/app/[lang]/bill-splitting/bills/_components/no-bill-state'
import { BillItem } from '@/app/[lang]/bill-splitting/bills/_components/bill-item'

interface Props {
  initialBills: Payable[]
}

export const BillList: React.FC<Props> = ({ initialBills }) => {
  const { data, isLoading } = trpc.listBills.useQuery()

  if (initialBills.length === 0 && data?.length === 0) {
    return <NoBillState />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading
        ? initialBills.map(bill => <BillItem bill={bill} key={bill.id} />)
        : data
            ?.map(bill => ({
              ...bill,
              fromDate: new Date(bill.fromDate),
              toDate: new Date(bill.toDate),
              createdAt: new Date(bill.createdAt),
              updatedAt: new Date(bill.updatedAt),
            }))
            .map(bill => <BillItem bill={bill} key={bill.id} />)}
    </div>
  )
}
