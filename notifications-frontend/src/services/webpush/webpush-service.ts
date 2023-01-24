import api from "../../api/api";

function createWebpushBundle(data: any) {
    return api.post('/webpush-bundle', data)
}

function getAudienceByApplicationId(id: number) {
    return api.get('/webpush-audience/' + id)
}

function sendNotification(data: any) {
    console.log(data)
    return api.post('/webpush-send', data)
}

export const webpushService = {
    createWebpushBundle,
    getAudienceByApplicationId,
    sendNotification,
}