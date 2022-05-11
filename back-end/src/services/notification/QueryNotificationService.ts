import Notification from '../../models/Notification';
import NotificationRepository from '../../repositories/NotificationRepository';

type QueryNotificationType = {
    user_id: string;
};

type ResponseType = {
    error: boolean,
    message: string,
    data: Notification[] | undefined,
}

class QueryNotificationService {
    public execute({
        user_id,
    }: QueryNotificationType): ResponseType {
        const notificationRepository = new NotificationRepository().getInstance();

        const foundNotifications = notificationRepository.query({
            user_id
        });

        return {
            error: false,
            message: "Notifications found.",
            data: foundNotifications,
        };

    }
}

export default QueryNotificationService;