import i18n, { ModuleType } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from 'resources/locales/en';
import ko from 'resources/locales/ko';

const LANGUAGES = {
  en: { translation: en },
  ko: { translation: ko },
};

const LANG_CODES = Object.keys(LANGUAGES);

const moduleType: ModuleType = 'languageDetector';

const LANGUAGE_DETECTOR = {
  type: moduleType,
  async: true,
  detect: (callback: Function) => {
    AsyncStorage.getItem('language')
      .then((language) => {
        if (!language) {
          throw new Error();
        }
        callback(language);
      })
      .catch(() => {
        const findBestAvailableLanguage = RNLocalize.findBestAvailableLanguage(LANG_CODES) || {
          languageTag: 'en',
        };

        callback(findBestAvailableLanguage.languageTag);
      });
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources: LANGUAGES,
    fallbackLng: 'en',
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });
