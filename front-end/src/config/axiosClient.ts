import { MessageType } from "@/enums/MessageType";
import axios from "axios";
import { useToast } from "@/hooks/useToast";

const {warning, info, error: toastError, success} = useToast();

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
      success(message);
    } else if (type === MessageType.INFO ) {
      info(message);
    } else if (type === MessageType.WARNING) {
      warning(message);
    }
    
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status >= 500) {
      error(message);
    } else if (status >= 400) {
      warning(message);
    } else {
      toastError("ERROR");
    }
  }
)

export default api;