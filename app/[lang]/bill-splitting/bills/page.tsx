import React from 'react'
import { NoBillState } from '@/app/[lang]/bill-splitting/bills/_components/no-bill-state'
import Link from 'next/link'
import { getTranslator } from 'next-intl/server'

interface Props {
  params: { lang: string }
}

export default async function AddBills({ params: { lang } }: Props) {
  const t = await getTranslator(lang, 'common.PageHeader.bill-splitting.bills')
  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-base-content">
            {t('title')}
          </h1>
          <p className="text-base-content/50">{t('subtitle')}</p>
        </div>
        <Link
          prefetch
          href="bills/new"
          className="btn btn-primary btn-md px-8 self-end"
        >
          {t('button')}
        </Link>
      </header>
      <main className="mt-20">
        <NoBillState />
      </main>
    </>
  )
}
