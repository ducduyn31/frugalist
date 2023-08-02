'use client'
import React from 'react'
import { useTranslations } from 'use-intl'
import { Icon } from '@/components/icon'

export const NoBillState: React.FC = () => {
  const t = useTranslations('bill-splitting.bills.NoBillState')
  return (
    <div className="card bg-base-200 p-8 flex items-center">
      <div className="card-body flex items-center">
        <Icon name="RiBillLine" className="text-8xl" />
        <h1 className="card-title text-3xl font-semibold text-base-content mt-6">
          {t('title')}
        </h1>
        <p className="text-base-content/50">{t('description')}</p>
      </div>
    </div>
  )
}
