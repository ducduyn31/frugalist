import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { WrappedProviders } from '@/app/[lang]/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Frugalist',
  description: 'A bill splitting helper',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="garden">
      <body className={inter.className}>
        <WrappedProviders>{children}</WrappedProviders>
      </body>
    </html>
  )
}
