import axios from "axios";

const api = axios.create({
    baseURL: "https://no-admin-abuse.joaoragazzo.dev/",
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'Application/json'
    }
})

export default api;