import api from "../../api/api";
function createApplicationConfiguration(data: any) {
    return api.post('/applications-configurations', data)
}

function updateApplicationConfiguration(id: number, data: any) {
    return api.put('/applications-configurations/' + id, data)
}

function getOneApplicationConfiguration(id: number) {
    return api.get('/applications-configurations/application-id/' + id)
}

export const applicationConfigurationService = {
    createApplicationConfiguration,
    updateApplicationConfiguration,
    getOneApplicationConfiguration,
}