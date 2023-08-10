import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { CellContext } from '@tanstack/react-table'
import { trpc } from '@/trpc/trpc-client'
import { BillItemView } from '@/app/[lang]/bill-splitting/bills/types'

interface Props {
  billId: string
}

const RemoveBill: React.FC<Props> = ({ billId }) => {
  const utils = trpc.useContext()
  const rmBill = trpc.removeBill.useMutation({
    onSuccess: () => {
      utils.listBills.invalidate()
    },
  })

  const removeBillHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    rmBill.mutateAsync({ id: billId })
  }

  return (
    <button
      disabled={rmBill.isLoading}
      className="btn btn-square btn-outline btn-secondary"
      onClick={removeBillHandler}
    >
      <AiOutlineDelete />
    </button>
  )
}

export const mapRowToRemoveButton = (
  ctx: CellContext<BillItemView, unknown>,
) => {
  const toRemoveId = ctx.row.original.id
  return <RemoveBill billId={toRemoveId} />
}
