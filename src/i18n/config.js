import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  lng: (navigator.language || navigator.userLanguage).split("-")[0],
  resources: {
    tr: {
      translations: require('./locales/tr.json')
    },
    en: {
      translations: require('./locales/en.json')
    },
    fr: {
      translations: require('./locales/fr.json')
    },
    de: {
      translations: require('./locales/de.json')
    },
    ja: {
      translations: require('./locales/ja.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});

export default i18n;