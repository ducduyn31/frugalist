import React from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { BillFormValues } from '@/app/[lang]/bill-splitting/bills/bill-form'
import { useTranslations } from 'use-intl'
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri'

interface Props {
  control: Control<BillFormValues>
}

export const BillItemForm: React.FC<Props> = ({ control }) => {
  const t = useTranslations('bill-splitting.bills.AddBillForm')
  const { append, fields } = useFieldArray<BillFormValues>({
    name: 'items',
    control,
  })

  const addItem = () => {
    append({ name: '', amount: 0, type: 'fixed' })
  }

  return (
    <>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <h3 className="font-bold text-lg">{t('addItemSection.title')}</h3>
          <p className="font-normal">{t('addItemSection.description')}</p>
        </div>
        <div className="flex items-end justify-end">
          <button
            type="button"
            className="btn btn-outline btn-primary"
            onClick={addItem}
          >
            <RiAddLine className="mr-2" />
            {t('addItemSection.button')}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 mt-6">
        {fields.map((item, index) => (
          <div key={item.id} className="grid grid-cols-7 gap-x-4">
            <div className="col-span-2">
              <div className="flex flex-col gap-y-2">
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder={t('addItemSection.item.name.placeholder')}
                  {...control.register(`items.${index}.name` as const)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2 col-span-2">
              <input
                className="input input-bordered"
                placeholder={t('addItemSection.item.amount.placeholder')}
                {...control.register(`items.${index}.amount` as const)}
              />
            </div>
            <select
              className="select select-bordered col-span-2"
              defaultValue="fixed"
              {...control.register(`items.${index}.type` as const)}
            >
              <option selected value="fixed">
                {t('addItemSection.item.type.fixed')}
              </option>
              <option value="variable">
                {t('addItemSection.item.type.variable')}
              </option>
            </select>
            <button type="button">
              <RiDeleteBinLine />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
