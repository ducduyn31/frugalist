import React from 'react'
import { NoPersonState } from '@/app/[lang]/bill-splitting/people/no-person-state'
import { PageHeader } from '@/components/page-header'

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
