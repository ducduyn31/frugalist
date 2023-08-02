import * as yup from 'yup'
import { signIn } from 'next-auth/react'

export interface EmailLoginFormValues {
  email: string
}

export const EmailLoginFormValuesSchema = yup.object().shape({
  email: yup.string().email('form.email.error').required('form.email.required'),
})

export const loginWithEmail = async ({ email }: EmailLoginFormValues) =>
  signIn('email', { email, callbackUrl: '/' })
