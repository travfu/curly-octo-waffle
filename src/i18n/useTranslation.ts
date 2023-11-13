import { getCollection } from 'astro:content';

import { toGameLocaleKey } from '@i18n/utils'
import type { LocaleCode } from '@i18n/utils';


const messages = await getCollection('messages')

export const useTranslation = (locale: LocaleCode) => {
  const getTranslation = (key?: string | [string, string], selectLocale?: LocaleCode): string => {
    if (!key) {
      return ""
    }
    if (key instanceof Array) {
      key = key.join("/")
    }
    return messages.find(obj => obj.id === toGameLocaleKey(selectLocale || locale))?.data[key] || key
  }
  return getTranslation
}