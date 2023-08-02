'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'use-intl'
import {
  EmailLoginFormValues,
  EmailLoginFormValuesSchema,
  loginWithEmail,
} from '@/app/[lang]/login/form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'

export default function Login() {
  const searchParams = useSearchParams()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailLoginFormValues>({
    resolver: yupResolver(EmailLoginFormValuesSchema),
  })
  const t = useTranslations('login.Login')
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{t('title')}</h1>
          <p className="py-6">{t('description')}</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(loginWithEmail)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">{t('form.email.label')}</span>
              </label>
              <input
                type="text"
                placeholder={t('form.email.placeholder')}
                className="input input-bordered"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 mt-2">{t(errors.email.message)}</p>
              )}
              {searchParams.has('error') && (
                <p className="text-red-500 mt-2">
                  {t(`error.${searchParams.get('error')}`)}
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {t('form.submit.label')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
