import React from 'react'
import { Control, useFieldArray, useFormState } from 'react-hook-form'
import { BillFormValues } from '@/app/[lang]/bill-splitting/bills/bill-form'
import { useTranslations } from 'use-intl'
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri'
import './bill-item-form.css'

interface Props {
  control: Control<BillFormValues>
}

export const BillItemForm: React.FC<Props> = ({ control }) => {
  const t = useTranslations('bill-splitting.bills.EditBillForm')

  const { errors } = useFormState({ control })
  const { append, fields, remove } = useFieldArray<BillFormValues>({
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
            <div className="flex flex-col col-span-2">
              {errors.items?.[index]?.name && (
                <p className="text-xs text-red-500 mb-1">
                  {t(`addItemSection.${errors.items?.[index]?.name?.message}`)}
                </p>
              )}
              <input
                type="text"
                className="input input-bordered"
                placeholder={t('addItemSection.item.name.placeholder')}
                {...control.register(`items.${index}.name` as const)}
              />
            </div>
            <div className="flex flex-col col-span-2">
              {errors.items?.[index]?.amount && (
                <p className="text-xs text-red-500 mb-1">
                  {t(
                    `addItemSection.${errors.items?.[index]?.amount?.message}`,
                  )}
                </p>
              )}
              <input
                type="number"
                step="0.01"
                className="input input-bordered"
                placeholder={t('addItemSection.item.amount.placeholder')}
                {...control.register(`items.${index}.amount` as const)}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <select
                className="select select-bordered"
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
            </div>
            <button type="button" onClick={() => remove(index)}>
              <RiDeleteBinLine />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
