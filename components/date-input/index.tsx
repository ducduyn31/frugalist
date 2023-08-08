'use client'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { Calendar, ClassNames } from 'react-date-range'
import { AiOutlineCalendar } from 'react-icons/ai'
import { ChangeHandler } from 'react-hook-form'
import { DateTime } from 'luxon'
import { useTranslations } from 'use-intl'
import './override.css'

const dateCustomizedCss: ClassNames = {
  month: 'bg-base-100',
  weekDays: 'bg-base-100',
  monthAndYearWrapper: 'bg-base-100',
  nextPrevButton: 'bg-base-100',
}
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
    <div className="relative">
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
          onClick={() => setShowDatePicker(prev => !prev)}
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
          color={'#f50076'}
          onChange={updateDate}
          className="top-24 rounded shadow-2xl absolute z-50"
          classNames={dateCustomizedCss}
        />
      )}
    </div>
  )
})
