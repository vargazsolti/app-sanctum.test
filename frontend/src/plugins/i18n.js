import { createI18n } from 'vue-i18n'

export const SUPPORT_LOCALES = ['en', 'hu']
const FALLBACK = 'en'

// Kezdetben üres üzenetekkel indulunk
export const i18n = createI18n({
  legacy: false,
  locale: 'hu',
  fallbackLocale: FALLBACK,
  messages: {},
})

// Dinamikus betöltés — Vite külön chunkokba csomagolja
const loaders = import.meta.glob('../locales/*.json', { eager: false })

export async function loadLocaleMessages(locale) {
  if (!SUPPORT_LOCALES.includes(locale)) locale = FALLBACK

  // Az elvárt útvonal (plugins → locales): "../locales/<code>.json"
  const path = `../locales/${locale}.json`
  const loader = loaders[path]

  if (!loader) {
    console.warn(`[i18n] Missing messages for "${locale}", falling back to "${FALLBACK}"`)
    if (locale !== FALLBACK) return loadLocaleMessages(FALLBACK)
    return
  }

  const mod = await loader()
  const messages = mod.default || mod

  i18n.global.setLocaleMessage(locale, messages)
  i18n.global.locale.value = locale

  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale)
}
