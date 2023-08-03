'use client'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { Calendar, ClassNames } from 'react-date-range'
import { AiOutlineCalendar } from 'react-icons/ai'
import { ChangeHandler } from 'react-hook-form'
import { DateTime } from 'luxon'
import { useTranslations } from 'use-intl'

const dateCustomizedCss: ClassNames = {}
interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
  name: string
  errorMessage?: string
  onChange: ChangeHandler
}

export const DateInput = React.forwardRef(function DateInput(
  { label, name, onChange, errorMessage, ...rest }: Props,
  ref: React.Ref<HTMLInputElement>,
) {
  const t = useTranslations('common.DateInput')
  const inputRef = useRef(null)
  useImperativeHandle(ref, () => inputRef as unknown as HTMLInputElement, [])

  const [date, setDate] = useState<Date | undefined>()
  const [showDatePicker, setShowDatePicker] = useState(false)

  const displayedDate = date
    ? DateTime.fromJSDate(date).toFormat('dd/MM/yyyy')
    : ''

  const updateDate = (date: Date) => {
    setDate(date)
    onChange({
      type: 'change',
      target: {
        name: `${name}`,
        value: date,
      },
    })
    setShowDatePicker(false)
  }

  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          className="input input-bordered w-full relative"
          placeholder="DD/MM/YYYY"
          value={displayedDate}
          onClick={() => setShowDatePicker(true)}
          {...rest}
          onChange={() => {}}
        />
        <button
          type="button"
          disabled={rest.disabled}
          className="btn btn-square"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <AiOutlineCalendar />
        </button>
      </div>
      {errorMessage && (
        <span className="mt-1 text-xs text-error">{t(errorMessage)}</span>
      )}
      {showDatePicker && (
        <Calendar
          date={date}
          onChange={updateDate}
          classNames={dateCustomizedCss}
        />
      )}
    </div>
  )
})
