import Notification from '../../models/Notification';
import FakeNotificationRepository from '../../repositories/fakes/FakeNotificationRepository';
import NotificationRepository from '../../repositories/NotificationRepository';

type CreateNotificationType = {
    id_user: string;
    id_rental: string;
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

    constructor(private notificationRepository: NotificationRepository | FakeNotificationRepository = new NotificationRepository().getInstance()) {
        this.notificationRepository = notificationRepository;
    }

    public execute({
        id_user,
        id_rental,
        date,
        show_date,
        message,
    }: CreateNotificationType): ResponseType {
        const notification = this.notificationRepository.create({
            id_user,
            id_rental,
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