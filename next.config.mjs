import { I18NProvider } from 'next/dist/server/lib/i18n-provider';

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        i18n: {
            // These are all the locales you want to support in
            // your application
            locales: ['en-US', 'es'],
            // This is the default locale you want to be used when visiting
            // a non-locale prefixed path e.g. `/hello`
            defaultLocale: 'es',
          },
    }
};

export default nextConfig;