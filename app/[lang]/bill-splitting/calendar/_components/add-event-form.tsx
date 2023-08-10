'use client'
import React, { use, useCallback, useRef } from 'react'
import { useTranslations } from 'use-intl'
import { useForm } from 'react-hook-form'
import {
  EventFormValues,
  EventFormValuesSchema,
} from '@/app/[lang]/bill-splitting/calendar/@modal/event-form'
import { useRouter } from 'next/navigation'
import { TextInput } from '@/components/text-input'
import { DropdownInput } from '@/components/dropdown-input'
import { GroupMember } from '@prisma/client'
import { DevTool } from '@hookform/devtools'
import { DateRangeInput } from '@/components/date-range-input'
import { yupResolver } from '@hookform/resolvers/yup'
import { trpc } from '@/trpc/trpc-client'

interface Props {
  membersPromise: Promise<GroupMember[]>
}

export const AddEventForm: React.FC<Props> = ({ membersPromise }) => {
  const t = useTranslations('bill-splitting.calendar.AddEventForm')
  const memberOptions = use(membersPromise).map(member => ({
    label: member.name,
    value: member.id,
    key: member.id,
  }))

  const utils = trpc.useContext()
  const createEventRPC = trpc.createEvent.useMutation({
    onSuccess: () => {
      utils.listEvents.invalidate()
    },
  })

  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const router = useRouter()
  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: yupResolver(EventFormValuesSchema),
  })
  const cancelForm = useCallback(() => {
    reset()
    router.back()
  }, [router, reset])

  const createEvent = (values: EventFormValues) => {
    createEventRPC.mutate(values)
    cancelForm()
  }

  return (
    <dialog open className="modal">
      <form className="modal-box" onSubmit={handleSubmit(createEvent)}>
        <h3 className="font-bold text-lg">{t('title')}</h3>
        <TextInput
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          {...register('name')}
          errorMessage={errors.name?.message}
        />
        <DropdownInput
          label={t('form.member.label')}
          placeholder={t('form.member.placeholder')}
          errorMessage={errors.memberId?.message}
          options={memberOptions}
          {...register('memberId')}
        />
        <div className="divider" />
        {watch('memberId') && (
          <>
            <DateRangeInput
              label={t('form.interval.label')}
              {...register('range')}
              errorMessage={errors.range?.message}
            />
            <div className="divider" />
          </>
        )}
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
