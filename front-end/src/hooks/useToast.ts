import { backendI18N } from "@/i18n";
import { toast } from "react-toastify";


export const useToast = () => {
    const success = (message: string) => toast.success(backendI18N.t(`feedback.${message}`, { ns: 'feedback' }));
    const warning = (message: string) => toast.warning(backendI18N.t(`feedback.${message}`, { ns: 'feedback' }));
    const info = (message: string) => toast.info(backendI18N.t(`feedback.${message}`, { ns: 'feedback' }));
    const error = (message: string) => toast.error(backendI18N.t(`feedback.${message}`, { ns: 'feedback' }));
    
    return { success, warning, info, error };
  };