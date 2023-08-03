import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const createContext = async () => ({
  session: await getServerSession(authOptions),
})

type Context = inferAsyncReturnType<typeof createContext>
export const trpcServer = initTRPC.context<Context>().create()

export const publicProcedure = trpcServer.procedure

const isAuthed = trpcServer.middleware(async opts => {
  if (!opts.ctx.session) {
    throw new Error('Not authorized')
  }

  return opts.next(opts)
})
export const authorizedProcedure = trpcServer.procedure.use(isAuthed)
