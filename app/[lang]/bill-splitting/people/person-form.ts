import {
  DateRangeFormValues,
  DateRangeFormValuesSchema,
} from '@/components/date-range-input/form'
import * as yup from 'yup'
import { GroupMember } from '@prisma/client'

export interface PersonFormValues {
  id: string | undefined
  name: string
  email: string | undefined
  isGuest: boolean
  isActive: boolean
  range: DateRangeFormValues | undefined
}

export const PersonFormValuesSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('errors.required'),
  email: yup.string().email('errors.invalid'),
  isGuest: yup.boolean().default(false),
  isActive: yup.boolean().default(true),
  range: yup
    .mixed<DateRangeFormValues>()
    .when('isGuest', ([isGuest]) =>
      isGuest ? yup.mixed().optional() : DateRangeFormValuesSchema,
    ),
})

export const prepareDefaultValues = (
  member: GroupMember | null | undefined,
): PersonFormValues => {
  if (!member) {
    return {} as PersonFormValues
  }

  return {
    id: member.id,
    name: member.name,
    email: member.email || undefined,
    isGuest: member.isGuest,
    isActive: member.isActive,
    range: prepareDefaultDateRange(member),
  }
}

export const prepareDefaultDateRange = (
  member: GroupMember | null | undefined,
): DateRangeFormValues | undefined => {
  if (!member) {
    return undefined
  }

  return member.fromDate
    ? {
        from: member.fromDate,
        to: member.toDate || undefined,
      }
    : undefined
}
