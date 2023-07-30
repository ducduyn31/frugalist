'use client'

import * as React from 'react'
import { FC } from 'react'
import { useTranslations } from 'use-intl'
import Link from 'next/link'

interface Props {
  name: string
}

export const AppSelect: FC<Props> = ({ name }) => {
  const t = useTranslations('app.AppSelect')
  return (
    <Link href={name} className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">{t(`${name}.title`)}</h2>
        <p>{t(`${name}.description`)}</p>
      </div>
    </Link>
  )
}
