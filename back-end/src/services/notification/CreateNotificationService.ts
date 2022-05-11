import Notification from '../../models/Notification';
import NotificationRepository from '../../repositories/NotificationRepository';

type CreateNotificationType = {
    user_id: string;
    date: string;
    show_date: string;
    message: string;
};

type ResponseType = {
    error: boolean,
    message: string,
    data: Notification | undefined,
}

class CreateNotificationService {
    public execute({
        user_id,
        date,
        show_date,
        message,
    }: CreateNotificationType): ResponseType {
        const notificationRepository = new NotificationRepository().getInstance();

        const notification = notificationRepository.create({
            user_id,
            date,
            show_date,
            message,
        });

        return {
            error: false,
            message: "Notification created successfully.",
            data: notification,
        };
    };
};

export default CreateNotificationService;