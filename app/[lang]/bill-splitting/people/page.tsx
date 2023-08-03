import React from 'react'
import { NoPersonState } from '@/app/[lang]/bill-splitting/people/no-person-state'
import Link from 'next/link'
import { getTranslator } from 'next-intl/server'

interface Props {
  params: { lang: string }
}

export default async function PeopleEdit({ params: { lang } }: Props) {
  const t = await getTranslator(lang, 'common.PageHeader.bill-splitting.people')
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
          href="people/new"
          className="btn btn-primary btn-md px-8 self-end"
        >
          {t('button')}
        </Link>
      </header>
      <main className="mt-20">
        <NoPersonState />
      </main>
    </>
  )
}
