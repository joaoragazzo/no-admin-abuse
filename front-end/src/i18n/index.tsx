import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptAuth from "./pt/common.json"

i18n
    .use(initReactI18next)
    .init({
        resources: {
            pt: {
                common: ptAuth 
            }
        },
        lng: 'pt',
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common',
        interpolation: { 
            escapeValue: false
        }
    });

export default i18n;