import * as yup from 'yup'

export interface DateRangeFormValues {
  from: Date
  to?: Date
}

export const DateRangeFormValuesSchema = yup.object().shape({
  from: yup.date().required('errors.required'),
  to: yup.date(),
})
