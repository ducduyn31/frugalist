import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import { getSteps } from '@/app/[lang]/bill-splitting/steps'
import { PageNavigator } from '@/app/[lang]/bill-splitting/page-navigator'
import { T } from '@/components/t-component'

export default async function BillSplittingLayout({
  children,
}: PropsWithChildren<{ params: { lang: string } }>) {
  const { steps, currentStep } = await getSteps()

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
                    <T
                      ns="bill-splitting.common"
                      text={`stepper.${step.key}`}
                    />
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
