import api from "../../api/api";

function getAllByApplicationId(applicationId: number) {
    return api.get('/notifications/' + applicationId)
}

export const notificationService = {
    getAllByApplicationId,
}