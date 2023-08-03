'use client'
import React from 'react'
import { useTranslations } from 'use-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n } from '@/i18n-config'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Props {
  steps: { key: string; path: string }[]
}

const useCurrentStepIndex = (steps: { key: string; path: string }[]) => {
  const pathName = usePathname()
  const isLocaleInPath = i18n.locales.some(locale =>
    pathName.startsWith(`/${locale}/`),
  )

  const currentStep = usePathname()
    .split('/')
    .at(isLocaleInPath ? 3 : 2)
  return steps.findIndex(step => step.path === currentStep)
}

export const PageNavigator: React.FC<Props> = ({ steps }) => {
  const t = useTranslations('bill-splitting.common')
  const currentStepIndex = useCurrentStepIndex(steps)

  return (
    <section className="mx-28 mb-12 flex justify-between">
      {currentStepIndex > 0 ? (
        <Link
          href={`${steps.at(currentStepIndex - 1)?.path}`}
          className="btn btn-md text-base"
        >
          <FaChevronLeft />
          <div className="flex flex-col text-left">
            <b className="text-base-content/50 font-normal text-xs">
              {t('navigation.back')}
            </b>
            {t(`stepper.${steps.at(currentStepIndex - 1)?.key}`)}
          </div>
        </Link>
      ) : (
        <div />
      )}

      {currentStepIndex < steps.length - 1 ? (
        <Link
          href={`${steps.at(currentStepIndex + 1)?.path}`}
          className="btn btn-md btn-neutral text-base"
        >
          <div className="flex flex-col text-right">
            <span className="text-neutral-content/50 font-normal text-xs">
              {t('navigation.next')}
            </span>
            {t(`stepper.${steps.at(currentStepIndex + 1)?.key}`)}
          </div>
          <FaChevronRight />
        </Link>
      ) : (
        <div />
      )}
    </section>
  )
}
