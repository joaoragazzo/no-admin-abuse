import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({     
        backend: {
            loadPath: `${import.meta.env.VITE_API_BASE_URL}i18n/{{lng}}/{{ns}}`,
            parse: (data: any) => {
              const parsed = JSON.parse(data);
              return parsed.data || parsed; 
            }
          },
        lng: 'pt',
        fallbackLng: 'pt',
        ns: ['network_tag', 'feedback'],
        interpolation: { 
            escapeValue: false
        }
    });

export default i18n;