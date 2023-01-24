import api from "../../api/api";

function login(data: any) {
    return api.post('/login', data)
}

function register(data: any) {
    return api.post('/register', data)
}

export const authService = {
    login,
    register
}