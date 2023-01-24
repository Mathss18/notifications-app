import { ApplicationService } from "./application-service";
import { CreateNotificationDTO } from "../../application/use-cases/notification/dto";
import { NotificationRepository } from "../../infra/repositories/typeorm/notification/application-repository";
import { Notification } from "../../domain/entities/notifications/Notification";
import { CreateNotificationUseCase } from "../../application/use-cases/notification/create-notification-use-case";
import { FindAllNotificationsByApplicationIdUseCase } from "../../application/use-cases/notification/find-all-notifications-by-application-id-use-case";

export class NotificationService {
    private applicationService: ApplicationService
    private notificationRepository: NotificationRepository
    private createNotificationUseCase: CreateNotificationUseCase
    private findAllNotificationsByApplicationIdUseCase: FindAllNotificationsByApplicationIdUseCase
    constructor() {
        this.applicationService = new ApplicationService()
        this.notificationRepository = new NotificationRepository()
        this.createNotificationUseCase = new CreateNotificationUseCase(this.notificationRepository)
        this.findAllNotificationsByApplicationIdUseCase = new FindAllNotificationsByApplicationIdUseCase(this.notificationRepository)
    }

    async create(createNotificationsDto: CreateNotificationDTO): Promise<Notification | null> {
        const application = await this.applicationService.findOne(createNotificationsDto.application_id)
        if (!application) throw new Error('Application not found.')

        createNotificationsDto.application = application;
        return this.createNotificationUseCase.execute(createNotificationsDto);
    }

    async findByApplicationId(applicationId: number): Promise<Notification[] | null> {
        return this.findAllNotificationsByApplicationIdUseCase.execute(applicationId);
    }
}
