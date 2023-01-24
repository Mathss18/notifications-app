import { Notification } from "../../../domain/entities/notifications/Notification";
import { INotificationRepository } from "../../../infra/repositories/typeorm/notification/notification-repository-interface";

export class FindAllNotificationsByApplicationIdUseCase {

    constructor(private notificationRepository: INotificationRepository) { }

    async execute(applicationId: number): Promise<Notification[] | null> {
        
        return this.notificationRepository.findAllByApplicationId(applicationId)
    }

}
