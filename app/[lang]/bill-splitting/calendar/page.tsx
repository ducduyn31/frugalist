import React from 'react'
import { PageHeader } from '@/components/page-header'
import { EventCalendar } from '@/app/[lang]/bill-splitting/calendar/event-calendar'
import { createContext } from '@/trpc/trpc-server'
import { appRouter } from '@/trpc/router'

export default async function CalendarEdit() {
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const events = await caller.listEvents()

  return (
    <>
      <PageHeader namespace="bill-splitting.calendar" addAction="people/new" />
      <main className="mt-20">
        <EventCalendar initialEvents={events} />
      </main>
    </>
  )
}
