'use client'
import React from 'react'

interface Props {
  label: string
  placeholder?: string
}

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  function TextField({ label, placeholder, ...rest }, ref) {
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
      </div>
    )
  },
)
