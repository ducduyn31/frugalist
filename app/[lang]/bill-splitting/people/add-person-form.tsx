'use client'
import React, { useCallback, useRef } from 'react'
import { useTranslations } from 'use-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { TextInput } from '@/components/text-input'
import { DateInput } from '@/components/date-input'

export const AddPersonForm: React.FC = () => {
  const t = useTranslations('bill-splitting.people.AddPersonForm')
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const { watch, reset } = useForm()

  const cancelForm = useCallback(() => {
    reset()
    router.back()
  }, [router, reset])

  return (
    <dialog open className="modal">
      <form className="modal-box">
        <h3 className="font-bold text-lg">{t('title')}</h3>
        <TextInput
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
        />
        <label className="label cursor-pointer">
          <span className="label-text">{t('form.active.label')}</span>
          <input
            type="checkbox"
            checked={watch('active')}
            className="checkbox checkbox-primary"
          />
        </label>
        {/*{watch('active') ? (*/}
        <DateInput label={t('form.interval.label')} />
        {/*) : (*/}
        {/*  <DateRangeInput label={t('form.interval.label')} {...register} />*/}
        {/*)}*/}
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
