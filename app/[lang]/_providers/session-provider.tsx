'use client'
import React, { PropsWithChildren } from 'react'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}
