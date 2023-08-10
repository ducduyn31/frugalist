'use client'
import React, { useCallback, useRef } from 'react'
import { useTranslations } from 'use-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { TextInput } from '@/components/text-input'
import { DateInput } from '@/components/date-input'
import {
  PersonFormValues,
  PersonFormValuesSchema,
} from '@/app/[lang]/bill-splitting/people/person-form'
import { CheckboxInput } from '@/components/checkbox-input'
import { DateRangeInput } from '@/components/date-range-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { trpc } from '@/trpc/trpc-client'

export const AddPersonForm: React.FC = () => {
  const t = useTranslations('bill-splitting.people.AddPersonForm')
  const utils = trpc.useContext()
  const memberCreator = trpc.createMember.useMutation({
    onSuccess: () => {
      utils.listMembers.invalidate()
    },
  })
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const {
    watch,
    reset,
    resetField,
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<PersonFormValues>({
    resolver: yupResolver(PersonFormValuesSchema),
  })

  const cancelForm = useCallback(() => {
    reset()
    router.back()
  }, [router, reset])

  const createMember = (values: PersonFormValues) => {
    memberCreator.mutate(values)
    cancelForm()
  }

  return (
    <dialog open className="modal">
      <form className="modal-box" onSubmit={handleSubmit(createMember)}>
        <h3 className="font-bold text-lg">{t('title')}</h3>
        <TextInput
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          errorMessage={errors.name?.message}
          {...register('name')}
        />
        <TextInput
          label={t('form.email.label')}
          placeholder={t('form.email.placeholder')}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <CheckboxInput
          label={t('form.guest.label')}
          errorMessage={errors.isGuest?.message}
          callback={() => clearErrors('range')}
          {...register('isGuest')}
        />
        <CheckboxInput
          label={t('form.active.label')}
          errorMessage={errors.isActive?.message}
          callback={() => resetField('range')}
          disabled={watch('isGuest')}
          {...register('isActive')}
        />
        {watch('isActive') ? (
          <DateInput
            label={t('form.interval.label')}
            errorMessage={errors.range?.from?.message}
            disabled={watch('isGuest')}
            {...register('range.from')}
          />
        ) : (
          <DateRangeInput
            label={t('form.interval.label')}
            errorMessage={
              errors.range?.message ||
              errors.range?.to?.message ||
              errors.range?.from?.message
            }
            disabled={watch('isGuest')}
            {...register('range')}
          />
        )}
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
