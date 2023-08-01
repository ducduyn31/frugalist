import React from 'react'
import { PageHeader } from '@/components/page-header'
import { NoPersonState } from '@/app/[lang]/bill-splitting/people/no-person-state'

export default function PeopleEdit() {
  return (
    <>
      <PageHeader namespace="bill-splitting.people" addAction="people/new" />
      <main className="mt-20">
        <NoPersonState />
      </main>
    </>
  )
}
