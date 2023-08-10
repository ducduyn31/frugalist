'use client'
import React from 'react'
import { Payable } from '@prisma/client'
import { trpc } from '@/trpc/trpc-client'
import { NoBillState } from '@/app/[lang]/bill-splitting/bills/_components/no-bill-state'
import { Table } from '@/components/table'
import { DateTime } from 'luxon'
import { ClassNames, FieldOptions } from '@/components/table/types'
import { BillItemFormValues } from '@/app/[lang]/bill-splitting/bills/bill-form'
import { mapRowToRemoveButton } from '@/app/[lang]/bill-splitting/bills/_components/remove-bill'
import { BillItemView } from '@/app/[lang]/bill-splitting/bills/types'

interface Props {
  initialBills: Payable[]
}

const tableCssClassNames: ClassNames = {
  tbody: '[&>*:nth-child(even)]:bg-base-200/20',
  tableCellContent: 'truncate',
}

const tableOptions: FieldOptions<BillItemView> = {
  id: {
    hidden: true,
  },
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
      id: bill.id,
      name: bill.name,
      amount: `$${calculateTotal(bill.components)}`,
      fromDate: DateTime.fromISO(bill.fromDate).toFormat('dd/MM/yyyy'),
      toDate: DateTime.fromISO(bill.toDate).toFormat('dd/MM/yyyy'),
    })) ?? []

  return (
    <Table<BillItemView>
      data={bills}
      namespace="bill-splitting.bills.table"
      classNames={tableCssClassNames}
      actions={mapRowToRemoveButton}
      fieldOptions={tableOptions}
      loading={isLoading}
    />
  )
}
