import Notification from '../../models/Notification';
import NotificationRepository from '../../repositories/NotificationRepository';

type QueryNotificationType = {
    id_user: string;
};

type ResponseType = {
    error: boolean,
    message: string,
    data: Notification[],
}

class QueryNotificationService {
    public execute({
        id_user,
    }: QueryNotificationType): ResponseType {
        const notificationRepository = new NotificationRepository().getInstance();

        const foundNotifications = notificationRepository.query({
            id_user
        });

        return {
            error: false,
            message: "Notifications found.",
            data: foundNotifications,
        };

    }
}

export default QueryNotificationService;