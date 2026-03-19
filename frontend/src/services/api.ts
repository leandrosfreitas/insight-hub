import axios from "axios";

console.log("API URL:", import.meta.env.VITE_API_URL);

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
});

export const getMetrics = async () => {
    const response = await api.get("/metrics");
    return response.data;
};
