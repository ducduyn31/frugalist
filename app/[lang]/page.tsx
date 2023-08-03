import { AppSelect } from '@/app/[lang]/_components/app-select'
import { useLocale } from 'next-intl'
import { Locale } from '@/i18n-config'

export default function Home() {
  const locale = useLocale()
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <AppSelect name="bill-splitting" locale={locale as Locale} />
    </main>
  )
}
