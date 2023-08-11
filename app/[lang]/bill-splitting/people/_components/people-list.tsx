'use client'
import React from 'react'
import { GroupMember } from '@prisma/client'
import { trpc } from '@/trpc/trpc-client'
import { NoPersonState } from '@/app/[lang]/bill-splitting/people/_components/no-person-state'
import { Table } from '@/components/table'
import {
  mapMemberRowViewFromGroupMember,
  mapMemberRowViewFromQuery,
  MemberRowView,
} from '@/app/[lang]/bill-splitting/people/types'
import { ClassNames, FieldOptions } from '@/components/table/types'
import { Row } from '@tanstack/table-core'
import { useRouter } from 'next/navigation'

interface Props {
  initialPeople: GroupMember[]
}

const tableCssClassNames: ClassNames = {}

const tableOptions: FieldOptions<MemberRowView> = {
  id: {
    hidden: true,
  },
  memberType: {
    isGroupIdentifier: true,
  },
}

export const PeopleList: React.FC<Props> = ({ initialPeople }) => {
  const { data, isLoading } = trpc.listMembers.useQuery()
  const router = useRouter()

  if (initialPeople.length === 0 && data?.length === 0) {
    return <NoPersonState />
  }

  const members: MemberRowView[] =
    data?.map(mapMemberRowViewFromQuery) ??
    initialPeople.map(mapMemberRowViewFromGroupMember)

  const openEditPersonModal = (row: Row<MemberRowView>) => {
    router.push(`/bill-splitting/people/edit/${row.original.id}`)
  }

  return (
    <Table<MemberRowView>
      namespace="bill-splitting.people.table"
      data={members}
      loading={isLoading}
      classNames={tableCssClassNames}
      fieldOptions={tableOptions}
      onRowClick={openEditPersonModal}
    />
  )
}
