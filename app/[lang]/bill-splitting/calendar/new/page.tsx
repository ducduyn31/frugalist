import React from 'react'
import { AddEventForm } from '@/app/[lang]/bill-splitting/calendar/_components/add-event-form'
import { createContext } from '@/trpc/trpc-server'
import { appRouter } from '@/trpc/router'

export default async function NewBill() {
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const members = caller.listMembers()
  return <AddEventForm membersPromise={members} />
}
