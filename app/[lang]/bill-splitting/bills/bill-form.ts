import * as yup from 'yup'
import {
  DateRangeFormValues,
  DateRangeFormValuesSchema,
} from '@/components/date-range-input/form'

type BillItemType = 'fixed' | 'variable'

export interface BillItemFormValues {
  name: string
  type: BillItemType
  amount: number
}

export interface BillFormValues {
  name: string
  range: DateRangeFormValues
  items: BillItemFormValues[]
}

export const BillFormValuesSchema = yup.object().shape({
  name: yup.string().required('errors.required'),
  range: DateRangeFormValuesSchema.required('errors.required'),
  items: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('errors.required'),
        type: yup
          .mixed<BillItemType>()
          .oneOf(['fixed', 'variable'])
          .required('errors.required'),
        amount: yup.number().required('errors.required'),
      }),
    )
    .required('errors.required'),
})
