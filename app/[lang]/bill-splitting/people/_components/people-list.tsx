'use client'
import React from 'react'
import { GroupMember } from '@prisma/client'
import { trpc } from '@/trpc/trpc-client'
import { PersonItem } from '@/app/[lang]/bill-splitting/people/_components/person-item'
import { NoPersonState } from '@/app/[lang]/bill-splitting/people/_components/no-person-state'

interface Props {
  initialPeople: GroupMember[]
}

export const PeopleList: React.FC<Props> = ({ initialPeople }) => {
  const { data, isLoading } = trpc.listMembers.useQuery()

  if (initialPeople.length === 0 && data?.length === 0) {
    return <NoPersonState />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading
        ? initialPeople.map(person => (
            <PersonItem person={person} key={person.id} />
          ))
        : data
            ?.map(person => ({
              ...person,
              fromDate: person.fromDate ? new Date(person.fromDate) : null,
              toDate: person.toDate ? new Date(person.toDate) : null,
              createdAt: new Date(person.createdAt),
              updatedAt: new Date(person.updatedAt),
            }))
            .map(person => <PersonItem person={person} key={person.id} />)}
    </div>
  )
}
