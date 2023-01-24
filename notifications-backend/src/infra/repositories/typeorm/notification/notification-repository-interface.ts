import { Notification } from "../../../../domain/entities/notifications/Notification";

export interface INotificationRepository {
  insert(entity: Notification): Promise<Notification | null>;
  findAllByApplicationId(application: number): Promise<Notification[] | null>;
}