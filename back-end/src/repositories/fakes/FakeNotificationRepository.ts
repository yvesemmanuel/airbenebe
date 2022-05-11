import { v4 } from 'uuid';
import Notification from '../../models/Notification';

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

class FakeNotificationRepository {
    private notifications: Notification[] = [];
    private static instance: FakeNotificationRepository;

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
        if (foundNotification) {
            foundNotification.show_date = show_date

            return foundNotification;
        }

        return undefined;
    }

    public getInstance(): FakeNotificationRepository {
        if (!FakeNotificationRepository.instance) {
            FakeNotificationRepository.instance = new FakeNotificationRepository();
        }

        return FakeNotificationRepository.instance;
    }

    public checkDate(string_date: string): boolean {
        const date: Date = new Date(string_date);
        const today: Date = new Date();
        return ((date.getTime() - today.getTime()) / 86400000) <= 1
    }

}

export default FakeNotificationRepository