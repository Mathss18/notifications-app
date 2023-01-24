import api from "../../api/api";

function getAll() {
    return api.get('/applications')
}

function createApplication(data: any) {
    return api.post('/applications', data)
}

export const applicationService = {
    getAll,
    createApplication,
}