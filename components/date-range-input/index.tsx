import React, { useMemo, useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {
  ClassNames,
  DateRange,
  Range as DateRangeType,
  RangeFocus,
  RangeKeyDict,
} from 'react-date-range'
import { useTranslations } from 'use-intl'
import { ChangeHandler } from 'react-hook-form'
import { AiOutlineCalendar } from 'react-icons/ai'

interface Props {
  label: string
  errorMessage?: string
  name: string
  onChange: ChangeHandler
}

const dateRangeCustomizedCss: ClassNames = {
  month: 'bg-base-100',
  weekDays: 'bg-base-100',
  monthAndYearWrapper: 'bg-base-100',
  nextPrevButton: 'bg-base-100',
}

export const DateRangeInput = React.forwardRef<HTMLInputElement, Props>(
  function DateRangeInput(
    { label, errorMessage, onChange, name, ...rest },
    ref,
  ) {
    const t = useTranslations('common.DateRangeInput')
    const [range, setRange] = useState<DateRangeType[]>([
      {
        startDate: undefined,
        endDate: undefined,
        key: 'selection',
      },
    ])
    const [showDatePicker, setShowDatePicker] = useState(false)

    const closePicker = (range: RangeFocus) => {
      if (range[0] == 0 && range[1] == 0) {
        setShowDatePicker(false)
      }
    }

    const updateDateRange = (range: RangeKeyDict) => {
      setRange([range.selection])
      onChange({
        type: 'change',
        target: {
          name: `${name}`,
          value: {
            from: range.selection.startDate,
            to: range.selection.endDate,
          },
        },
      })
    }

    const dateRangeShown = useMemo(() => {
      if (range[0].startDate && range[0].endDate) {
        return `${range[0].startDate?.toLocaleDateString()} - ${range[0].endDate?.toLocaleDateString()}`
      }
      return ''
    }, [range])

    return (
      <div className="relative">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="input-group">
          <input
            ref={ref}
            type="text"
            className="input input-bordered w-full relative"
            placeholder="DD/MM/YYYY - DD/MM/YYYY"
            value={dateRangeShown}
            onClick={() => setShowDatePicker(true)}
            {...rest}
            onChange={() => {}}
          />
          <button
            type="button"
            className="btn btn-square"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <AiOutlineCalendar />
          </button>
        </div>
        {errorMessage && (
          <p className="mt-2 text-xs text-error">{t(errorMessage)}</p>
        )}
        {showDatePicker && (
          <DateRange
            className="top-24 rounded shadow-2xl absolute z-50"
            color={'#f50076'}
            rangeColors={['#f50076']}
            classNames={dateRangeCustomizedCss}
            onChange={updateDateRange}
            onRangeFocusChange={closePicker}
            moveRangeOnFirstSelection={false}
            showDateDisplay={false}
            months={1}
            scroll={{ enabled: true }}
            ranges={range}
            direction="vertical"
          />
        )}
      </div>
    )
  },
)
