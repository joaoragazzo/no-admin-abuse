import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'Application/json'
    }
})

export default api;