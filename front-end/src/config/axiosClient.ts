import { MessageType } from "@/enums/MessageType";
import axios from "axios";
import { toast } from "react-toastify";
import i18n from "../i18n/index";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'Application/json'
    }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const message = response?.data?.message;
    const type: MessageType = response?.data?.type;

    if (type === MessageType.SUCCESS ) {
      toast.success(i18n.t(`feedbacks:${message}`));
    } else if (type === MessageType.INFO ) {
      toast.info(i18n.t(`feedbacks:${message}`));
    } else if (type === MessageType.WARNING) {
      toast.warn(i18n.t(`feedbacks:${message}`));
    }
    
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status >= 500) {
      toast.error(i18n.t(`feedbacks:${message}`))
    } else if (status >= 400) {
      toast.warn(i18n.t(`feedbacks:${message}`))
    } else {
      toast.error("ERROR")
    }
  }
)

export default api;