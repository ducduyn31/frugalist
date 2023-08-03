'use client'
import React, { ChangeEvent } from 'react'
import { ChangeHandler } from 'react-hook-form'

interface Props {
  label: string
  onChange: ChangeHandler
  errorMessage?: string
  callback?: (value: boolean) => void
}

export const CheckboxInput = React.forwardRef<HTMLInputElement, Props>(
  function CheckboxInput(
    { label, errorMessage, onChange, callback, ...rest },
    ref,
  ) {
    const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event).then(() => {
        callback?.(event.target.value === 'on')
      })
    }

    return (
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          ref={ref}
          type="checkbox"
          className="checkbox checkbox-primary"
          onChange={updateValue}
          {...rest}
        />
        {errorMessage && (
          <span className="mt-1 text-xs text-error">{errorMessage}</span>
        )}
      </label>
    )
  },
)
