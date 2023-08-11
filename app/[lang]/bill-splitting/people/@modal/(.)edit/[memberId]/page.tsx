import React from 'react'
import { createContext } from '@/trpc/trpc-server'
import { appRouter } from '@/trpc/router'
import { EditPersonForm } from '@/app/[lang]/bill-splitting/people/_components/edit-person-form'

interface Props {
  params: {
    memberId: string
  }
}

export default async function EditPerson({ params }: Props) {
  const { memberId } = params
  const ctx = await createContext()
  const caller = appRouter.createCaller(ctx)
  const memberPromise = caller.getMemberById({
    id: memberId,
  })

  return <EditPersonForm memberPromise={memberPromise} />
}
