'use client'
import * as React from 'react'
import { PropsWithChildren } from 'react'
import { useTranslations } from 'use-intl'

export const T: React.FC<PropsWithChildren<{ ns: string; text: string }>> = ({
  ns,
  text,
}) => {
  const t = useTranslations(ns)

  return <>{t(text)}</>
}
