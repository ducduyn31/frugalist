import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import { WrappedProviders } from '@/app/[lang]/providers'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/i18n-config'
import { NextIntlClientProvider } from 'next-intl'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Frugalist',
  description: 'A bill splitting helper',
}

interface Props extends React.PropsWithChildren<{}> {
  params: {
    lang: Locale
  }
}

export default async function RootLayout({
  children,
  params: { lang },
}: Props) {
  const dictionary = await getDictionary(lang)

  return (
    <html lang="en" data-theme="garden">
      <body className={inter.className}>
        <WrappedProviders
          providers={[
            <NextIntlClientProvider
              key="intl"
              locale={lang}
              messages={dictionary}
            />,
          ]}
        >
          {children}
        </WrappedProviders>
      </body>
    </html>
  )
}
