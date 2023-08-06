import { authorizedProcedure } from '@/trpc/trpc-server'
import { db } from '@/lib/db'
import { Event } from 'react-big-calendar'

export interface MemberBillInterval extends Event {
  name: string
}

export const listEvents = authorizedProcedure.query(async ({ ctx }) => {
  const { session } = ctx

  if (!session?.user?.email) {
    throw new Error('Not authorized')
  }

  const members = await db.groupMember.findMany({
    where: {
      owner: {
        email: session.user.email,
      },
    },
  })

  const nonGuestMembers = members.filter(member => !member.isGuest)
  const nonGuestEvents: MemberBillInterval[] = nonGuestMembers.map(member => ({
    name: member.name,
    title: member.name,
    start: member.fromDate ?? new Date(),
    end: member.toDate ?? new Date(),
    allDay: true,
  }))

  return nonGuestEvents
})
