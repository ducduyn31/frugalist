import React, { ComponentProps } from 'react'
import { IntlProvider } from 'use-intl'

export * from 'next-intl'

type Props = Omit<
  ComponentProps<typeof IntlProvider>,
  'locale' | 'now' | 'children'
> & {
  locale?: string
  now?: Date | string
  children?: React.ReactNode
}

declare module 'next-intl' {
  function NextIntlClientProvider(props: Props): React.ReactElement
}
