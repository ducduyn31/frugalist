'use client'
import React from 'react'
import { Payable } from '@prisma/client'
import { trpc } from '@/trpc/trpc-client'
import { NoBillState } from '@/app/[lang]/bill-splitting/bills/_components/no-bill-state'
import { Table } from '@/components/table'
import Loading from '@/app/[lang]/bill-splitting/loading'
import { DateTime } from 'luxon'
import { ClassNames } from '@/components/table/types'
import { BillItemFormValues } from '@/app/[lang]/bill-splitting/bills/bill-form'

interface Props {
  initialBills: Payable[]
}

interface BillItemView {
  name: string
  amount: string
  fromDate: string
  toDate: string
}

const tableCssClassNames: ClassNames = {
  tbody: '[&>*:nth-child(even)]:bg-base-200/20',
  tableCellContent: 'max-w-[200px] truncate',
}

const calculateTotal = (billsComponents: any) => {
  const components = billsComponents as unknown as BillItemFormValues[]
  return components.reduce((acc, b) => acc + b.amount, 0).toFixed(2)
}

export const BillList: React.FC<Props> = ({ initialBills }) => {
  const { data, isLoading } = trpc.listBills.useQuery()

  if (initialBills.length === 0 && data?.length === 0) {
    return <NoBillState />
  }

  const bills: BillItemView[] =
    data?.map(bill => ({
      name: bill.name,
      amount: `$${calculateTotal(bill.components)}`,
      fromDate: DateTime.fromISO(bill.fromDate).toFormat('dd/MM/yyyy'),
      toDate: DateTime.fromISO(bill.toDate).toFormat('dd/MM/yyyy'),
    })) ?? []

  if (isLoading) {
    return <Loading />
  }

  return (
    <Table<BillItemView>
      data={bills}
      namespace="bill-splitting.bills.table"
      classNames={tableCssClassNames}
    />
  )
}
