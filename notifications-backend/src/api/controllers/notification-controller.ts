import { CreateNotificationDTO } from "../../application/use-cases/notification/dto";
import { Notification } from "../../domain/entities/notifications/Notification";
import { NotificationService } from "../services/notification-service";

export class NotificationsController {
    private notificationsService: NotificationService
    constructor() {
        this.notificationsService = new NotificationService()
    }

    create(createNotificationDto: CreateNotificationDTO): Promise<Notification | null> {
        return this.notificationsService.create(createNotificationDto);
    }

    findByApplicationId(applicationId: number): Promise<Notification[] | null> {
        return this.notificationsService.findByApplicationId(applicationId);
    }
}
