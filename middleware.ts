import { NextRequest, NextResponse } from 'next/server'
import { i18n } from '@/i18n-config'
import Negotiator from 'negotiator'
import { match as matchLocale } from '@formatjs/intl-localematcher'

const ignoredPaths = ['/_next/', '/favicon.ico']

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value
  })

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  )

  return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname

  if (ignoredPaths.some(ignoredPath => pathName.startsWith(ignoredPath))) {
    return
  }

  const pathNameIsMissingLocale = i18n.locales.every(locale => {
    return !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
  })

  if (pathNameIsMissingLocale) {
    const locale = getLocale(req)

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathName.startsWith('/') ? '' : '/'}${pathName}`,
        req.url,
      ),
    )
  }
}
