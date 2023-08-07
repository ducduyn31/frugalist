import { authorizedProcedure } from '@/trpc/trpc-server'
import { db } from '@/lib/db'
import { Event } from 'react-big-calendar'
import { EventFormValuesSchema } from '@/app/[lang]/bill-splitting/calendar/@modal/event-form'
import { calculateDateRage, DateRange } from '@/utils/date'
import { GroupMember } from '@prisma/client'

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

  const events = await db.groupMemberEvent.findMany({
    where: {
      groupMember: {
        owner: {
          email: session.user.email,
        },
      },
    },
  })

  const rangeByMember: Record<string, DateRange[] | Omit<DateRange, 'type'>[]> =
    {}
  const memberMap: Record<string, GroupMember> = {}

  members.forEach(member => {
    const { id, isGuest, fromDate, toDate } = member
    memberMap[id] = member
    rangeByMember[id] = rangeByMember[id] ?? []
    if (!isGuest && fromDate) {
      rangeByMember[id].push({
        from: fromDate,
        to: toDate ?? new Date(),
        type: 'INCLUDED',
      })
    }
  })

  events.forEach(({ groupMemberId, fromDate, toDate, type }) => {
    rangeByMember[groupMemberId] = rangeByMember[groupMemberId] ?? []

    rangeByMember[groupMemberId].push({
      from: fromDate,
      to: toDate ?? new Date(),
      type: type as 'INCLUDED' | 'EXCLUDED',
    })
  })

  Object.keys(rangeByMember).forEach(memberId => {
    rangeByMember[memberId] = calculateDateRage(
      rangeByMember[memberId] as DateRange[],
    )
  })

  const result: MemberBillInterval[] = []

  Object.entries(rangeByMember).forEach(([memberId, ranges]) => {
    ranges.forEach(range => {
      result.push({
        name: memberMap[memberId].name,
        title: memberMap[memberId].name,
        start: range.from,
        end: range.to,
        allDay: true,
      })
    })
  })

  return result
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
