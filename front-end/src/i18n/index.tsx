import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({     
        backend : {
            loadPath: `${import.meta.env.VITE_API_BASE_URL}/i18n/{{lng}}/{{ns}}`   
        },
        lng: 'pt',
        fallbackLng: 'pt',
        ns: ['network_tag'],
        defaultNS: 'tags',
        interpolation: { 
            escapeValue: false
        }
    });

export default i18n;