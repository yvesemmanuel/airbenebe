import { v4 } from 'uuid';
import Notification from '../models/Notification';

type CreateNotificationType = {
    id_user: string;
    date: string;
    show_date: string;
    message: string;
}

type QueryNotificationType = {
    id_user: string;
    [key: string]: string;
};

class NotificationRepository {
    private notifications: Notification[] = require('../databases/notifications.json');
    private static instance: NotificationRepository;

    public create({
        id_user,
        date,
        show_date,
        message,
    }: CreateNotificationType): Notification {
        const notification = new Notification();

        notification.id = v4();
        notification.id_user = id_user;
        notification.date = date;
        notification.show_date = show_date;
        notification.message = message;

        this.notifications.push(notification);

        return notification;
    }

    public userNotifications(id_user: string): Notification[] {
        const foundNotifications = this.notifications.filter(notification => notification.id_user == id_user);
        return foundNotifications;
    }

    public query(queryparams: QueryNotificationType): Notification[] {
        const foundNotifications = this.notifications.filter(notification => (notification.id_user == queryparams["id_user"]) && (this.checkDate(notification.show_date)));
        return foundNotifications.reverse();
    }

    public getInstance(): NotificationRepository {
        if (!NotificationRepository.instance) {
            NotificationRepository.instance = new NotificationRepository();
        }

        return NotificationRepository.instance;
    }

    public checkDate(string_date: string): boolean {
        const date: Date = new Date(string_date);
        const today: Date = new Date();
        return ((date.getTime() - today.getTime()) / 86400000) <= 1
    }

}

export default NotificationRepository