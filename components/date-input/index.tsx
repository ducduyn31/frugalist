'use client'
import React from 'react'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
}

export const DateInput = React.forwardRef(function DateInput(
  props: Props,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <div>
      <label>{props.label}</label>
      <input type="date" ref={ref} />
    </div>
  )
})
