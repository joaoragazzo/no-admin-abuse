import { toast } from "react-toastify";
import i18n from "../i18n/index";

export const useToast = () => {
    const success = (message: string) => toast.success(i18n.t(`feedback.${message}`, { ns: 'feedback' }));
    const warning = (message: string) => toast.warning(i18n.t(`feedback.${message}`, { ns: 'feedback' }));
    const info = (message: string) => toast.info(i18n.t(`feedback.${message}`, { ns: 'feedback' }));
    const error = (message: string) => toast.error(i18n.t(`feedback.${message}`, { ns: 'feedback' }));
    
    return { success, warning, info, error };
  };