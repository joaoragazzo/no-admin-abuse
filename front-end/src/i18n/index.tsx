import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import ptTags from "./pt/tags.json";
import ptRegions from "./pt/regions.json";
import ptCountries from "./pt/countries.json";
import ptFeedbacks from "./pt/feedbacks.json";

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        resources: {
            pt: {
                tags: ptTags,
                regions: ptRegions,
                countries: ptCountries,
                feedbacks: ptFeedbacks,
            }
        },
        backend : {
            loadPath: "/api/translations/{{lng}}/{{ns}}"
        },
        lng: 'pt',
        fallbackLng: 'pt',
        ns: ['network_tag', 'regions', 'countries', 'feedbacks'],
        defaultNS: 'tags',
        interpolation: { 
            escapeValue: false
        }
    });

export default i18n;