import { changeLanguage } from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocale = async (language: string) => {
  await saveLanguageInAsyncStorage(language);
  await updateI18next(language);
};

const saveLanguageInAsyncStorage = (language: string) => {
  return AsyncStorage.setItem('language', language);
};

const updateI18next = (language: string) => {
  return changeLanguage(language);
};
