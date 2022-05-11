import Notification from '../../models/Notification';
import NotificationRepository from '../../repositories/NotificationRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: Notification | undefined,
}

class ShowNotificationService {
    public execute(id: string): ResponseType {
        const notificationRepository = new NotificationRepository().getInstance();

        const foundNotification = notificationRepository.findById(id);

        if (foundNotification) {
            return {
                error: false,
                message: "Notification found.",
                data: foundNotification,
            };
        }

        return {
            error: true,
            message: "Notification don't exists.",
            data: undefined,
        };
    }
}

export default ShowNotificationService;