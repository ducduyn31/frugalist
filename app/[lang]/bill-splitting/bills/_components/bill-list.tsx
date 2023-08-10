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
import { Row } from '@tanstack/table-core'
import { useRouter } from 'next/navigation'

interface Props {
  initialBills: Payable[]
}

const tableCssClassNames: ClassNames = {
  tableCellContent: 'truncate max-w-60',
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
  const router = useRouter()

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

  const openEditBillModal = (row: Row<BillItemView>) => {
    router.push(`/bill-splitting/bills/edit/${row.original.id}`)
  }

  return (
    <Table<BillItemView>
      data={bills}
      namespace="bill-splitting.bills.table"
      classNames={tableCssClassNames}
      actions={mapRowToRemoveButton}
      fieldOptions={tableOptions}
      loading={isLoading}
      onRowClick={openEditBillModal}
    />
  )
}
