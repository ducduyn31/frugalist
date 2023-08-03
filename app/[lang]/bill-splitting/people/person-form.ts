import {
  DateRangeFormValues,
  DateRangeFormValuesSchema,
} from '@/components/date-range-input/form'
import * as yup from 'yup'

export interface PersonFormValues {
  name: string
  email: string | undefined
  isGuest: boolean
  isActive: boolean
  range: DateRangeFormValues | undefined
}

export const PersonFormValuesSchema = yup.object().shape({
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
