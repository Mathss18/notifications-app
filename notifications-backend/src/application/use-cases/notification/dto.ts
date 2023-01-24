import { INotification } from "../../../domain/entities/notifications/Notification";

export type CreateNotificationDTO = Partial<
    INotification
> & { application_id: number } // Forgein Keys go here
