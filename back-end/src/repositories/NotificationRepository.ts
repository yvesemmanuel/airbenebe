import { v4 } from 'uuid';
import Accommodation from '../models/Accommodation';
import Notification from '../models/Notification';

type CreateNotificationType = {
    id_user: string;
    id_rental: string;
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
        id_rental,
        date,
        show_date,
        message,
    }: CreateNotificationType): Notification {
        const notification = new Notification();

        notification.id = v4();
        notification.id_user = id_user;
        notification.id_rental = id_rental;
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
        const foundNotifications = this.notifications.filter(notification => Object.keys(queryparams).filter(k => queryparams[k]).every(param => notification[param as keyof typeof notification] == queryparams[param]) && this.checkDate(notification.show_date));
        return foundNotifications.reverse();
    }

    public update(id_rental: string, show_date: string): Notification | undefined {
        const foundNotification = this.notifications.find(notification => notification.id_rental == id_rental);
        console.log(show_date);
        if (foundNotification) {
            foundNotification.show_date = show_date

            return foundNotification;
        }

        return undefined;
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