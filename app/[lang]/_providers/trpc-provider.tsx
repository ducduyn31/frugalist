'use client'
import React, { PropsWithChildren, useState } from 'react'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@/trpc/trpc-client'
import { httpBatchLink } from '@trpc/client'

const getTrpcEndpoint = () => {
  if (process.env.WEBAPP_URL) {
    return new URL('/api/trpc', process.env.WEBAPP_URL).href
  }
  return 'http://localhost:3000/api/trpc'
}

export const TrpcProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getTrpcEndpoint(),
        }),
      ],
    }),
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
