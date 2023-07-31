'use client'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React from 'react'
import { Calendar, luxonLocalizer } from 'react-big-calendar'
import { DateTime } from 'luxon'

export const EventCalendar: React.FC = props => {
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 })

  return (
    <div className="h-[70vh] w-full">
      <Calendar localizer={localizer} />
    </div>
  )
}
