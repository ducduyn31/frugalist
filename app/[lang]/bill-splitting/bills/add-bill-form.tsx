'use client'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'use-intl'
import { TextInput } from '@/components/text-input'
import { DateRangeInput } from '@/components/date-range-input'
import { Icon } from '@/components/icon'
import {
  BillFormValues,
  BillFormValuesSchema,
  createBill,
} from '@/app/[lang]/bill-splitting/bills/bill-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DevTool } from '@hookform/devtools'

export const AddBillForm = () => {
  const t = useTranslations('bill-splitting.bills.AddBillForm')
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<BillFormValues>({
    resolver: yupResolver(BillFormValuesSchema),
  })

  const cancelForm = useCallback(() => {
    reset()
    router.back()
  }, [router, reset])

  console.log(getValues())

  return (
    <dialog open className="modal">
      <form className="modal-box" onSubmit={handleSubmit(createBill)}>
        <h3 className="font-bold text-lg">{t('title')}</h3>
        <TextInput
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          {...register('name')}
          errorMessage={errors.name?.message}
        />
        <DateRangeInput
          label={t('form.interval.label')}
          {...register('range')}
          errorMessage={
            errors.range?.message ||
            errors.range?.from?.message ||
            errors.range?.to?.message
          }
        />
        <div className="divider" />
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <h3 className="font-bold text-lg">{t('addItemSection.title')}</h3>
            <p className="font-normal">{t('addItemSection.description')}</p>
          </div>
          <div className="flex items-end justify-end">
            <button type="button" className="btn btn-outline btn-primary">
              <Icon name="RiAddLine" className="mr-2" />
              {t('addItemSection.button')}
            </button>
          </div>
        </div>
        <div className="divider" />
        <div className="flex justify-center gap-x-4">
          <button
            type="button"
            className="btn"
            onClick={() => cancelButtonRef.current?.click()}
          >
            {t('form.cancel.label')}
          </button>
          <button type="submit" className="btn btn-primary">
            {t('form.submit.label')}
          </button>
        </div>
      </form>
      <DevTool control={control} />
      <form method="dialog" className="modal-backdrop">
        <button ref={cancelButtonRef} onClick={cancelForm}>
          close
        </button>
      </form>
    </dialog>
  )
}
