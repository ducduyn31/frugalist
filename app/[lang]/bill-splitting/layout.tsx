import React, { PropsWithChildren } from 'react'
import { getTranslator } from 'next-intl/server'
import { PageNavigator } from '@/app/[lang]/bill-splitting/page-navigator'
import Link from 'next/link'

const getSteps = async () => {
  return {
    steps: [
      { key: 'add-bills', path: 'bills' },
      { key: 'add-people', path: 'people' },
      { key: 'edit-calendar', path: 'calendar' },
      { key: 'calculate', path: 'result' },
    ],
    currentStep: 0,
  }
}

export default async function BillSplittingLayout({
  children,
  params: { lang },
}: PropsWithChildren<{ params: { lang: string } }>) {
  const { steps, currentStep } = await getSteps()
  const t = await getTranslator(lang, 'bill-splitting.common')

  return (
    <>
      <div className="flex">
        <section className="ml-4 flex justify-center max-w-xs h-screen">
          <ul className="steps steps-vertical">
            {steps.map((step: { key: string; path: string }, index: number) => (
              <li
                key={step.key}
                className={`step ${index <= currentStep ? 'step-primary' : ''}`}
              >
                <Link href={`${step.path}`}>
                  <span className="text-base-content text-sm font-normal">
                    {t(`stepper.${step.key}`)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <div className="w-full overflow-y-scroll">
          <section className="m-28">{children}</section>
          <PageNavigator steps={steps} />
        </div>
      </div>
    </>
  )
}
