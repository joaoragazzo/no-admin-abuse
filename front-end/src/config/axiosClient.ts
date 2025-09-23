import { MessageType } from "@/enums/MessageType";
import axios, { type AxiosResponse } from "axios";
import { useToast } from "@/hooks/useToast";

const { warning, info, error: toastError, success } = useToast();

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const apiResponse = response.data; 
    const { message, type, data } = apiResponse;

    if (message && type) {
      switch (type) {
        case MessageType.SUCCESS:
          success(message);
          break;
        case MessageType.INFO:
          info(message);
          break;
        case MessageType.WARNING:
          warning(message);
          break;
        case MessageType.ERROR:
          toastError(message);
          break;
      }
    }

    response.data = data;
    return response;
  },
  (error) => {
    const apiResponse = error.response?.data;
    const status = error.response?.status;
    const message = apiResponse?.message || "Ocorreu um erro inesperado";

    if (status >= 500) {
      toastError(message);
    } else if (status >= 400) {
      warning(message);
    } else {
      toastError("Erro desconhecido");
    }

    return Promise.reject(error);
  }
);

const i18nApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

i18nApi.interceptors.response.use((response: AxiosResponse) => {
  console.log(response.data.data)
  return response.data.data;

})

export { api as default, i18nApi };