import { trpcServer } from '@/trpc/trpc-server'
import * as procedures from '@/trpc/procedures'

export const appRouter = trpcServer.router(procedures)

export type AppRouter = typeof appRouter