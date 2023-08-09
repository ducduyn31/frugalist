import db from '@/lib/db'
import { calculateDateRage, DateRange } from '@/utils/date'
import { GroupMember } from '@prisma/client'
import { MemberBillInterval } from '@/trpc/procedures'
import { BillItemFormValues } from '@/app/[lang]/bill-splitting/bills/bill-form'

export const getAndCalculateMemberBillIntervals = async (
  ownerEmail: string,
) => {
  const members = await db.groupMember.findMany({
    where: {
      owner: {
        email: ownerEmail,
      },
    },
  })

  const events = await db.groupMemberEvent.findMany({
    where: {
      groupMember: {
        owner: {
          email: ownerEmail,
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
        memberId,
        name: memberMap[memberId].name,
        title: memberMap[memberId].name,
        start: range.from,
        end: range.to,
        allDay: true,
      })
    })
  })

  return result
}

interface FixedComponent {
  name: string
  amount: number
  billName: string
  fromDate: Date
  toDate: Date
}

interface VariableComponent {
  name: string
  amount: number
  fromDate: Date
  toDate: Date
  billName: string
}

export const getFixedAndVariableBillComponents = async (ownerEmail: string) => {
  const bills = await db.payable.findMany({
    where: {
      user: {
        email: ownerEmail,
      },
    },
  })

  const fixedComponents: FixedComponent[] = []
  const variableComponents: VariableComponent[] = []

  bills.forEach(bill => {
    if (!bill.components) return
    const components = bill.components as unknown as BillItemFormValues[]

    components.forEach(component => {
      if (component.type === 'fixed') {
        fixedComponents.push({
          ...component,
          billName: bill.name,
          fromDate: bill.fromDate,
          toDate: bill.toDate,
        })
      } else {
        variableComponents.push({
          ...component,
          fromDate: bill.fromDate,
          toDate: bill.toDate,
          billName: bill.name,
        })
      }
    })
  })

  return {
    fixedComponents,
    variableComponents,
  }
}
