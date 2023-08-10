'use client'
import React from 'react'
import { Payable } from '@prisma/client'
import { DateTime } from 'luxon'
import { BillItemFormValues } from '@/app/[lang]/bill-splitting/bills/bill-form'
import { FiEdit2 } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { trpc } from '@/trpc/trpc-client'

interface Props {
  bill: Payable
}

export const BillItem: React.FC<Props> = ({ bill }) => {
  const items = bill.components as unknown as BillItemFormValues[]
  const utils = trpc.useContext()
  const rmBill = trpc.removeBill.useMutation({
    onSuccess: () => {
      utils.listBills.invalidate()
    },
  })

  const removeBillHandler = () => {
    rmBill.mutateAsync({ id: bill.id })
  }

  return (
    <div className="card bordered rounded">
      <div className="card-body bg-base-300">
        <div className="grid grid-cols-2 gap-4">
          <div className="tooltip" data-tip={bill.name}>
            <h2 className="card-title truncate">{bill.name}</h2>
          </div>
          <p>${items.reduce((acc, b) => acc + b.amount, 0).toFixed(2)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-base-content/50">From</p>
            <p className="text-base-content">
              {DateTime.fromJSDate(bill.fromDate).toFormat('dd/MM/yyyy')}
            </p>
          </div>
          <div>
            <p className="text-base-content/50">To</p>
            <p className="text-base-content">
              {DateTime.fromJSDate(bill.toDate).toFormat('dd/MM/yyyy')}
            </p>
          </div>
        </div>
        <div className="flex mt-6 gap-x-4">
          <button className="btn btn-square btn-outline btn-primary">
            <FiEdit2 />
          </button>
          <button
            className="btn btn-square btn-outline btn-secondary"
            onClick={removeBillHandler}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    </div>
  )
}
