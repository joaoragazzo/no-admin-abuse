import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptTags from "./pt/tags.json"
import ptRegions from "./pt/regions.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            pt: {
                tags: ptTags,
                regions: ptRegions
            }
        },
        lng: 'pt',
        fallbackLng: 'en',
        ns: ['tags', 'regions'],
        defaultNS: 'tags',
        interpolation: { 
            escapeValue: false
        }
    });

export default i18n;