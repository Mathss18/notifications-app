import api from "../../api/api";

function sendNotification(data: any) {
    return api.post('/email-send', data)
}

export const emailService = {
    sendNotification,
}