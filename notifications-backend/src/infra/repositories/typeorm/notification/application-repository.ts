import { Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { Notification } from "../../../../domain/entities/notifications/Notification";
import { INotificationRepository } from "./notification-repository-interface";

export class NotificationRepository implements INotificationRepository {

    private notificationRepository: Repository<Notification>;

    constructor() {
        this.notificationRepository = AppDataSource.getRepository(Notification)
    }

    async insert(notification: Notification): Promise<Notification | null> {
        return this.notificationRepository.save(notification);
    }

    async findAllByApplicationId(applicationId: number): Promise<Notification[] | null> {
        return this.notificationRepository.find({ where: { application: { id: applicationId } } });
    }
}