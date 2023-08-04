'use client'
import React, { PropsWithChildren, useState } from 'react'
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@/trpc/trpc-client'
import { httpBatchLink } from '@trpc/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const getTrpcEndpoint = () => {
  if (process.env.WEBAPP_URL) {
    return new URL('/api/trpc', process.env.NEXT_PUBLIC_WEBAPP_URL).href
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
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}
