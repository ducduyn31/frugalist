import React from 'react'
import { PageHeader } from '@/components/page-header'
import { createContext } from '@/trpc/trpc-server'
import { appRouter } from '@/trpc/router'
import { PeopleList } from '@/app/[lang]/bill-splitting/people/_components/people-list'

export default async function PeopleEdit() {
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const people = await caller.listMembers()

  return (
    <>
      <PageHeader namespace="bill-splitting.people" addAction="people/new" />
      <main className="mt-20">
        <PeopleList initialPeople={people} />
      </main>
    </>
  )
}
