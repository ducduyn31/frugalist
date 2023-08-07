import React, { useState } from 'react'
import { useTranslations } from 'use-intl'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { ChangeHandler } from 'react-hook-form'

interface Props {
  label: string
  placeholder?: string
  errorMessage?: string
  options?: DropdownOption[]
  name: string
  onChange: ChangeHandler
}

export interface DropdownOption extends React.HTMLProps<HTMLInputElement> {
  label: string
  value: any
  key?: string
}

export const DropdownInput: React.FC<Props> = ({
  label,
  placeholder,
  errorMessage,
  options,
  onChange,
  name,
  ...rest
}) => {
  const t = useTranslations('common.DropdownInput')
  const [formValue, setValue] = useState<DropdownOption | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const updateValue = (option: DropdownOption) => {
    setValue(option)
    setShowDropdown(false)
    onChange({
      type: 'change',
      target: {
        name: `${name}`,
        value: option.value,
      },
    })
  }

  return (
    <div>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="w-full">
        <button
          type="button"
          tabIndex={0}
          className="input w-full input-md input-bordered m-1 flex flex-between items-center"
          onClick={() => setShowDropdown(true)}
        >
          <span
            className={`flex-grow text-left text-base-content${
              formValue ? '' : '/40'
            }`}
          >
            {formValue?.label ?? placeholder}
          </span>
          <RiArrowDropDownLine />
        </button>
        {errorMessage && (
          <label className="text-xs text-error mt-1">{t(errorMessage)}</label>
        )}
        {showDropdown && (
          <ul
            tabIndex={0}
            className="z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
          >
            {options?.map(option => (
              <li
                key={option.key || option.value}
                className="menu-item"
                onClick={() => updateValue(option)}
              >
                <a>{option.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <input hidden {...rest} />
    </div>
  )
}
