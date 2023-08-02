import React, { PropsWithChildren } from 'react'
import { getSteps } from '@/app/[lang]/bill-splitting/steps'
import { PageNavigator } from '@/app/[lang]/bill-splitting/page-navigator'

interface Props extends PropsWithChildren<{}> {
  modal?: React.ReactNode
}

export default async function PeopleLayout({ children, modal }: Props) {
  const { steps } = await getSteps()
  return (
    <>
      <section className="m-28">{children}</section>
      {modal}
      <PageNavigator steps={steps} />
    </>
  )
}
