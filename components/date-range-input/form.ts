import * as yup from 'yup'

export interface DateRangeFormValues {
  from: Date
  to?: Date
}

export const DateRangeFormValuesSchema: yup.ObjectSchema<DateRangeFormValues> =
  yup.object().shape({
    from: yup.date().required('errors.required'),
    to: yup.date(),
  })
