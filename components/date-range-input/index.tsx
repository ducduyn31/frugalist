'use client'
import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {
  ClassNames,
  DateRange,
  Range as DateRangeType,
  RangeFocus,
} from 'react-date-range'
import { useLocale } from 'next-intl'
import { Icon } from '@/components/icon'

interface Props {
  label: string
}

const dateRangeCustomizedCss: ClassNames = {
  month: 'bg-base-100',
  weekDays: 'bg-base-100',
  monthAndYearWrapper: 'bg-base-100',
  nextPrevButton: 'bg-base-100',
}

export const DateRangeInput = React.forwardRef<HTMLInputElement, Props>(
  function DateRangeInput({ label, ...rest }, ref) {
    const [range, setRange] = useState<DateRangeType[]>([
      {
        startDate: undefined,
        endDate: undefined,
        key: 'selection',
      },
    ])
    const [showDatePicker, setShowDatePicker] = useState(false)
    const locale = useLocale()

    const closePicker = (range: RangeFocus) => {
      if (range[0] == 0 && range[1] == 0) {
        setShowDatePicker(false)
      }
    }

    return (
      <div className="relative">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <div className="input-group">
          <input
            type="text"
            className="input input-bordered w-full relative"
            placeholder="MM/DD/YYYY - MM/DD/YYYY"
            onClick={() => setShowDatePicker(true)}
            ref={ref}
            {...rest}
          />
          <button
            type="button"
            className="btn btn-square"
            onClick={() => setShowDatePicker(true)}
          >
            <Icon name="AiOutlineCalendar" />
          </button>
        </div>
        {showDatePicker && (
          <DateRange
            className="top-12 rounded shadow-2xl absolute z-50"
            color={'#f50076'}
            rangeColors={['#f50076']}
            classNames={dateRangeCustomizedCss}
            onChange={item => setRange([item.selection])}
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
