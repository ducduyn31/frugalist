import { GroupMember } from '@prisma/client'
import { DateTime } from 'luxon'

export interface MemberRowView {
  id: string
  name: string
  memberType: string
  fromDate: string
  toDate: string
}

type UseQueryGroupMember = Pick<
  GroupMember,
  'id' | 'name' | 'isGuest' | 'isActive'
> & {
  fromDate: string | null
  toDate: string | null
}

export const mapMemberRowViewFromQuery = (
  member: UseQueryGroupMember,
): MemberRowView => ({
  id: member.id,
  name: member.name,
  memberType: member.isGuest
    ? 'guest'
    : member.isActive
    ? 'active'
    : 'inactive',
  fromDate: member.fromDate
    ? DateTime.fromISO(member.fromDate).toFormat('dd/MM/yyyy')
    : '',
  toDate: member.toDate
    ? DateTime.fromISO(member.toDate).toFormat('dd/MM/yyyy')
    : '',
})

export const mapMemberRowViewFromGroupMember = (
  member: GroupMember,
): MemberRowView => ({
  id: member.id,
  name: member.name,
  memberType: member.isGuest
    ? 'guest'
    : member.isActive
    ? 'active'
    : 'inactive',
  fromDate: member.fromDate
    ? DateTime.fromJSDate(member.fromDate).toFormat('dd/MM/yyyy')
    : '',
  toDate: member.toDate
    ? DateTime.fromJSDate(member.toDate).toFormat('dd/MM/yyyy')
    : '',
})
