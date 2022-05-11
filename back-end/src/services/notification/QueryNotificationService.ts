import Notification from '../../models/Notification';
import FakeNotificationRepository from '../../repositories/fakes/FakeNotificationRepository';
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

    constructor(private notificationRepository: NotificationRepository | FakeNotificationRepository = new NotificationRepository().getInstance()) {
        this.notificationRepository = notificationRepository;
    }

    public execute({
        id_user,
    }: QueryNotificationType): ResponseType {
        const foundNotifications = this.notificationRepository.query({
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