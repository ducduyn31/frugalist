import React from 'react'
import { NoPersonState } from '@/app/[lang]/bill-splitting/people/_components/no-person-state'
import { PageHeader } from '@/components/page-header'
import { createContext } from '@/trpc/trpc-server'
import { appRouter } from '@/trpc/router'
import { PersonItem } from '@/app/[lang]/bill-splitting/people/_components/person-item'

export default async function PeopleEdit() {
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const people = await caller.listMembers()

  return (
    <>
      <PageHeader namespace="bill-splitting.people" addAction="people/new" />
      <main className="mt-20">
        {people.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {people.map(person => (
              <PersonItem person={person} key={person.id} />
            ))}
          </div>
        ) : (
          <NoPersonState />
        )}
      </main>
    </>
  )
}
