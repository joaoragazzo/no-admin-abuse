import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptTags from "./pt/tags.json"
import ptRegions from "./pt/regions.json";
import ptCountries from "./pt/countries.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            pt: {
                tags: ptTags,
                regions: ptRegions,
                countries: ptCountries 
            }
        },
        lng: 'pt',
        fallbackLng: 'en',
        ns: ['tags', 'regions', 'countries'],
        defaultNS: 'tags',
        interpolation: { 
            escapeValue: false
        }
    });

export default i18n;