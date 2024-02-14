// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../public/locales/en/trans.json';
import deTranslation from '../public/locales/de/trans.json';
import frTranslation from '../public/locales/fr/trans.json';
import arTranslation from '../public/locales/ar/trans.json';

// the translations
const resources = {
  en: {
    translation: enTranslation
  },
  de: {
    translation: deTranslation
  },
  fr: {
    translation: frTranslation
  },
  ar: {
    translation: arTranslation
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "english", // language to use (default)
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
