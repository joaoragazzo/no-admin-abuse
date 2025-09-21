import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({     
        backend : {
            loadPath: "https://no-admin-abuse.joaoragazzo.dev/api/v1/i18n/{{lng}}/{{ns}}"   
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