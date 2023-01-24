
import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
    baseURL: "http://localhost/api",
    headers: {
        "Content-Type": "Application/Json",
    },
});

api.interceptors.request.use((config: any) => {
    config.headers.authorization = `${localStorage.getItem("token")}`;
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const status = error ? error.response.status : null;

        if (status == 401) {
            window.location.href = "/login";
            localStorage.removeItem("token");
            toast.error("Sessão expirada");
        }
        return Promise.reject(error);
    }
);

export default api;