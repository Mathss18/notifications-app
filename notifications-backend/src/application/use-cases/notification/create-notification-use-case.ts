import { Notification } from "../../../domain/entities/notifications/Notification";
import { INotificationRepository } from "../../../infra/repositories/typeorm/notification/notification-repository-interface";
import { CreateNotificationDTO } from "./dto";

export class CreateNotificationUseCase {

    constructor(private notificationRepository: INotificationRepository) { }

    async execute(input: CreateNotificationDTO): Promise<Notification | null> {
        const { channel, origin, application } = input;

        const notification = new Notification(channel!, origin!, application!)

        return this.notificationRepository.insert(notification)
    }

}
