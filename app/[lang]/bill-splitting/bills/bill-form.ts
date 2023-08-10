import * as yup from 'yup'
import {
  DateRangeFormValues,
  DateRangeFormValuesSchema,
} from '@/components/date-range-input/form'
import { Payable } from '@prisma/client'

type BillItemType = 'fixed' | 'variable'

export interface BillItemFormValues {
  name: string
  type: BillItemType
  amount: number
}

export interface BillFormValues {
  id: string | undefined
  name: string
  range: DateRangeFormValues
  items: BillItemFormValues[]
}

export const BillFormValuesSchema = yup.object().shape({
  id: yup.string().optional(),
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
        amount: yup
          .number()
          .typeError('errors.required')
          .required('errors.required'),
      }),
    )
    .required('errors.required'),
})

export const prepareDefaultValues = (
  bill: Payable | null | undefined,
): BillFormValues => {
  if (!bill) {
    return {} as BillFormValues
  }
  const components = bill.components as unknown as BillItemFormValues[]
  return {
    id: bill.id,
    name: bill.name,
    range: prepareDefaultDateRange(bill),
    items: components,
  }
}

export const prepareDefaultDateRange = (
  bill: Payable | null | undefined,
): DateRangeFormValues => {
  if (!bill) {
    return {} as DateRangeFormValues
  }
  return {
    from: bill.fromDate,
    to: bill.toDate,
  }
}
