'use client'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'use-intl'
import { TextInput } from '@/components/text-input'
import { DateRangeInput } from '@/components/date-range-input'
import {
  BillFormValues,
  BillFormValuesSchema,
} from '@/app/[lang]/bill-splitting/bills/bill-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { BillItemForm } from '@/app/[lang]/bill-splitting/bills/_components/bill-item-form'
import { trpc } from '@/trpc/trpc-client'

export const AddBillForm = () => {
  const t = useTranslations('bill-splitting.bills.AddBillForm')

  const utils = trpc.useContext()

  const billCreator = trpc.billCreator.useMutation({
    onSuccess: () => {
      utils.listBills.invalidate()
    },
  })

  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<BillFormValues>({
    resolver: yupResolver(BillFormValuesSchema),
  })

  const cancelForm = useCallback(() => {
    reset()
    router.back()
  }, [router, reset])

  const createBill = (values: BillFormValues) => {
    billCreator.mutate(values)
    cancelForm()
  }

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
        <BillItemForm control={control} />
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
      <form method="dialog" className="modal-backdrop">
        <button ref={cancelButtonRef} onClick={cancelForm}>
          close
        </button>
      </form>
    </dialog>
  )
}
