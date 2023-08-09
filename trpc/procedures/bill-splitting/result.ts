import { authorizedProcedure } from '@/trpc/trpc-server'
import db from '@/lib/db'
import {
  getAndCalculateMemberBillIntervals,
  getFixedAndVariableBillComponents,
} from '@/trpc/procedures/bill-splitting/_helpers'
import { DateTime, Interval } from 'luxon'

interface BillSplitResult {
  member: {
    id: string
    name: string
  }
  payComponents: {
    name: string
    amount: number
  }[]
}

export const splitBill = authorizedProcedure.query(async ({ ctx }) => {
  const { session } = ctx

  if (!session?.user?.email) {
    throw new Error('Not authorized')
  }

  const { fixedComponents, variableComponents } =
    await getFixedAndVariableBillComponents(session.user.email)
  const intervals = await getAndCalculateMemberBillIntervals(session.user.email)
  const nonGuestMembers = await db.groupMember.findMany({
    where: {
      owner: {
        email: session.user.email,
      },
      isGuest: false,
    },
  })
  const nonGuestMemberCount = nonGuestMembers.length

  const result: Record<string, BillSplitResult> = {}

  nonGuestMembers.forEach(member => {
    result[member.id] = result[member.id] ?? {
      member: {
        id: member.id,
        name: member.name,
      },
      payComponents: [],
    }

    fixedComponents.forEach(component => {
      if (
        Interval.fromDateTimes(
          member.fromDate ?? new Date(),
          member.toDate ?? new Date(),
        ).overlaps(Interval.fromDateTimes(component.fromDate, component.toDate))
      ) {
        result[member.id].payComponents.push({
          name: component.name,
          amount: component.amount / nonGuestMemberCount,
        })
      }
    })
  })

  intervals.forEach(({ name, memberId, start, end }) => {
    result[memberId] = result[memberId] ?? {
      member: {
        id: memberId,
        name,
      },
      payComponents: [],
    }

    variableComponents.forEach(component => {
      const componentInterval = Interval.fromDateTimes(
        DateTime.fromJSDate(component.fromDate),
        DateTime.fromJSDate(component.toDate),
      )

      const totalUsageDays = intervals.reduce((acc, interval) => {
        const current = Interval.fromDateTimes(
          interval.start ?? new Date(),
          interval.end ?? new Date(),
        )
        if (current.overlaps(componentInterval)) {
          return (
            acc + (current.intersection(componentInterval)?.length('days') ?? 0)
          )
        }
        return acc
      }, 0)

      const memberUsageDays =
        Interval.fromDateTimes(start ?? new Date(), end ?? new Date())
          .intersection(componentInterval)
          ?.length('days') ?? 0

      const amount =
        totalUsageDays === 0
          ? 0
          : (component.amount / totalUsageDays) * memberUsageDays

      result[memberId].payComponents.push({
        name: component.name,
        amount,
      })
    })
  })

  return result
})
