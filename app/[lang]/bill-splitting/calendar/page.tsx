import React from 'react'
import { PageHeader } from '@/components/page-header'
import { EventCalendar } from '@/app/[lang]/bill-splitting/calendar/event-calendar'

export default function CalendarEdit() {
  return (
    <>
      <PageHeader namespace="bill-splitting.calendar" />
      <main className="mt-20">
        <EventCalendar />
      </main>
    </>
  )
}
