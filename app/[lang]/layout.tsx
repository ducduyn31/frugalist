import './globals.css'
import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import { WrappedProviders } from '@/app/[lang]/providers'
import { getDictionary } from '@/app/[lang]/dictionaries'
import { Locale } from '@/i18n-config'
import { NextIntlClientProvider } from 'next-intl'
import { TrpcProvider } from '@/app/[lang]/_providers/trpc-provider'
import { SessionProvider } from '@/app/[lang]/_providers/session-provider'

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
    <html lang={lang}>
      <body className={inter.className}>
        <WrappedProviders
          providers={[
            <NextIntlClientProvider
              key="intl"
              locale={lang}
              messages={dictionary}
            />,
            <SessionProvider key="session" />,
            <TrpcProvider key="trpc" />,
          ]}
        >
          {children}
        </WrappedProviders>
      </body>
    </html>
  )
}
