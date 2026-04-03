import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale, defaultLocale } from './config';

// Import messages statically
import enMessages from '../../messages/en.json';
import arMessages from '../../messages/ar.json';

const messages: Record<string, Record<string, unknown>> = {
  en: enMessages,
  ar: arMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: messages[locale] || messages.en,
  };
});
