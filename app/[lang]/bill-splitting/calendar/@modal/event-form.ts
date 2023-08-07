import {
  DateRangeFormValues,
  DateRangeFormValuesSchema,
} from '@/components/date-range-input/form'
import * as yup from 'yup'

export interface EventFormValues {
  name: string
  memberId: string
  range: DateRangeFormValues
}

export const EventFormValuesSchema = yup.object().shape({
  name: yup.string().required('errors.required'),
  memberId: yup.string().required('errors.required'),
  range: DateRangeFormValuesSchema.required('errors.required'),
})
