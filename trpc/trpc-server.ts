import { initTRPC } from '@trpc/server'
import { getSession } from 'next-auth/react'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export const createContext = async (opts: FetchCreateContextFnOptions) => ({
  session: await getSession({ req: opts.req as any }),
})
export const trpcServer = initTRPC.context<typeof createContext>().create()

export const publicProcedure = trpcServer.procedure
export const authorizedProcedure = publicProcedure
