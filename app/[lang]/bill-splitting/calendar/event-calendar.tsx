'use client'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React from 'react'
import { Calendar, luxonLocalizer } from 'react-big-calendar'
import { DateTime } from 'luxon'
import { MemberBillInterval } from '@/trpc/procedures'

interface Props {
  initialEvents: MemberBillInterval[]
}

export const EventCalendar: React.FC<Props> = ({ initialEvents }) => {
  const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 7 })

  console.log(initialEvents)

  return (
    <div className="h-[70vh] w-full">
      <Calendar localizer={localizer} events={initialEvents} />
    </div>
  )
}
