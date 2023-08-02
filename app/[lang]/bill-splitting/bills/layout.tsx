import React, { PropsWithChildren } from 'react'
import { PageNavigator } from '@/app/[lang]/bill-splitting/page-navigator'
import { getSteps } from '@/app/[lang]/bill-splitting/steps'

interface Props extends PropsWithChildren<{}> {
  modal?: React.ReactNode
}

export default async function BillsLayout({ children, modal }: Props) {
  const { steps } = await getSteps()
  return (
    <>
      <section className="m-28">{children}</section>
      {modal}
      <PageNavigator steps={steps} />
    </>
  )
}
