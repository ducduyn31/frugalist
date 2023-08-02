import * as React from 'react'
import { FC } from 'react'
import Link from 'next/link'
import { getTranslator } from 'next-intl/server'
import { Locale } from '@/i18n-config'

interface Props {
  name: string
  locale: Locale
}

export const AppSelect: FC<Props> = async ({ name, locale }) => {
  const t = await getTranslator(locale, 'app.AppSelect')
  return (
    <Link href={name} className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">{t(`${name}.title`)}</h2>
        <p>{t(`${name}.description`)}</p>
      </div>
    </Link>
  )
}
