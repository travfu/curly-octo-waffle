import { WeaponType2 } from "@constants";

export const localeOptions = [
  { label: 'Deutsch', locale: 'de', key: 'de-de' },
  { label: 'English', locale: 'en', key: 'en-us' },
  { label: 'Español', locale: 'es', key: 'es-es' },
  { label: 'Français', locale: 'fr', key: 'fr-fr' },
  { label: 'Italiano', locale: 'it', key: 'it-it' },
  { label: '日本語', locale: 'ja', key: 'ja-jp' },
  { label: '한국어', locale: 'ko', key: 'ko-kr' },
  { label: 'Português', locale: 'pt', key: 'pt-br' },
  { label: '繁體中文', locale: 'zh', key: 'zh-tw' },
] as const;

/** Maps locale (eg. "en") to locale string format used in game (eg. "en-us") */
export const toGameLocaleKey = (locale: string) =>
  localeOptions.find((obj) => obj.locale === locale)?.key;

/** Generate boilerplate static paths to populate `locale` param */
export const getStaticLocalePaths = () =>
  localeOptions.map(({ locale }) => ({ params: { locale }, props: {} }));


/** Transform WeaponType2 enum to localization key */
export const getWeaponType2LocalizationKey = (weaponType: string): string => {
  const id = WeaponType2[weaponType as keyof typeof WeaponType2]
  if (id === undefined) return ""
  return `Common/WEAPON_TYPE_${String(id - 1).padStart(2, "0")}`
}

export type LocaleCode = typeof localeOptions[number]['locale']