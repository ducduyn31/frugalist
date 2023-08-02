'use client'
import React from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  label: string
  placeholder?: string
  errorMessage?: string
}

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  function TextField({ label, placeholder, errorMessage, ...rest }, ref) {
    const t = useTranslations('common.TextInput')
    return (
      <div>
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type="text"
          placeholder={placeholder}
          className="input w-full input-md input-bordered"
          ref={ref}
          {...rest}
        />
        {errorMessage && (
          <label className="text-xs text-error mt-1">{t(errorMessage)}</label>
        )}
      </div>
    )
  },
)
