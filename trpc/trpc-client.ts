import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '@/trpc/router'

export const trpc = createTRPCReact<AppRouter>()
