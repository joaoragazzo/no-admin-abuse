import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import ptRoles from './locales/pt/roles.json';

export const backendI18N = i18n.createInstance();
backendI18N    
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

export const localI18N = i18n.createInstance();
localI18N    
  .use(initReactI18next)
  .init({     
    lng: 'pt',
    fallbackLng: 'pt',
    ns: ['roles'],
    resources: {
      pt : {
        roles: ptRoles
      }
    }
  });
