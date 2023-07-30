import 'server-only'
import { Locale } from '@/i18n-config'

const dictionaries = {
  en: () => import('@/messages/en.json').then(module => module.default),
  vi: () => import('@/messages/vi.json').then(module => module.default),
}

export const getDictionary = async (lang: Locale) =>
  dictionaries[lang]?.() ?? (await dictionaries.en())
