import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en, vi } from 'assets/i18n/strings'

// the translations
const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'vi',
    debug: true,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
