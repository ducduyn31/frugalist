import { authorizedProcedure } from '@/trpc/trpc-server'
import db from '@/lib/db'
import { Event } from 'react-big-calendar'
import { EventFormValuesSchema } from '@/app/[lang]/bill-splitting/calendar/@modal/event-form'
import { getAndCalculateMemberBillIntervals } from '@/trpc/procedures/bill-splitting/_helpers'

export interface MemberBillInterval extends Event {
  name: string
  memberId: string
}

export const listEvents = authorizedProcedure.query(async ({ ctx }) => {
  const { session } = ctx

  if (!session?.user?.email) {
    throw new Error('Not authorized')
  }

  return getAndCalculateMemberBillIntervals(session.user.email)
})

export const createEvent = authorizedProcedure
  .input(EventFormValuesSchema)
  .mutation(async ({ ctx, input }) => {
    const { session } = ctx

    if (!session?.user?.email) {
      throw new Error('Not authorized')
    }

    const member = await db.groupMember.findUnique({
      where: {
        id: input.memberId,
      },
    })

    if (!member) {
      throw new Error('Member not found')
    }

    return db.groupMemberEvent.create({
      data: {
        name: input.name,
        fromDate: input.range.from,
        toDate: input.range.to,
        groupMemberId: input.memberId,
        type: member.isGuest ? 'INCLUDED' : 'EXCLUDED',
      },
    })
  })
