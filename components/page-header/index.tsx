'use client'
import React from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  namespace: string
}

export const PageHeader: React.FC<Props> = ({ namespace }) => {
  const t = useTranslations(`common.PageHeader.${namespace}`)

  return (
    <header className="flex justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-base-content">
          {t('title')}
        </h1>
        <p className="text-base-content/50">{t('subtitle')}</p>
      </div>
      <button className="btn btn-primary btn-md px-8 self-end">
        {t('button')}
      </button>
    </header>
  )
}
