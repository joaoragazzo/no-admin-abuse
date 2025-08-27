import { toast } from "react-toastify";
import i18n from "../i18n/index";

export const useToast = () => {

    const success = (message: string) => toast.success(i18n.t(`feedbacks:${message}`));
    const warning = (message: string) => toast.warning(i18n.t(`feedbacks:${message}`));
    const info    = (message: string) => toast.info(i18n.t(`feedbacks:${message}`));
    const error   = (message: string) => toast.error(i18n.t(`feedbacks:${message}`));

    return {
        success,
        warning, 
        info, 
        error
    }
}