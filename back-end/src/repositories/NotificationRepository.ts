import { v4 } from 'uuid';
import Notification from '../models/Notification';

type CreateNotificationType = {
    user_id: string;
    date: string;
    show_date: string;
    message: string;
}

type QueryNotificationType = {
    user_id: string;
    [key: string]: string;
};

class NotificationRepository {
    private notifications: Notification[] = require('../databases/notifications.json');
    private static instance: NotificationRepository;

    public create({
        user_id,
        date,
        show_date,
        message,
    }: CreateNotificationType): Notification {
        const notification = new Notification();

        notification.id = v4();
        notification.user_id = user_id;
        notification.date = date;
        notification.show_date = show_date;
        notification.message = message;

        this.notifications.push(notification);

        return notification;
    }

    public userNotifications(user_id: string): Notification[] {
        const foundNotifications = this.notifications.filter(notification => notification.user_id == user_id);
        return foundNotifications;
    }

    public query(queryparams: QueryNotificationType): Notification[] {
        const foundNotifications = this.notifications.filter(notification => Object.keys(queryparams).filter(k => queryparams[k]).every(param => notification[param as keyof typeof notification] == queryparams[param]));
        return foundNotifications;
    }

    public getInstance(): NotificationRepository {
        if (!NotificationRepository.instance) {
            NotificationRepository.instance = new NotificationRepository();
        }

        return NotificationRepository.instance;
    }

}

export default NotificationRepository