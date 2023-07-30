import { NextRequest } from 'next/server'
import { i18n } from '@/i18n-config'
import createMiddleware from 'next-intl/middleware'

export function middleware(req: NextRequest) {
  // @ts-ignore
  const locales: string[] = i18n.locales

  const i18nMiddleware = createMiddleware({
    defaultLocale: i18n.defaultLocale,
    locales,
  })

  return i18nMiddleware(req)
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|__turbopack|.*\\..*).*)'],
}
