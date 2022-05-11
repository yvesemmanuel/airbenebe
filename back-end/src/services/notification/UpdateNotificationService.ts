import Notification from "../../models/Notification";
import FakeNotificationRepository from "../../repositories/fakes/FakeNotificationRepository";
import NotificationRepository from "../../repositories/NotificationRepository";

type ResponseType = {
    error: boolean,
    message: string,
    data: Notification | undefined,
}

type RequestType = {
    id_rental: string,
    show_date: string,
}

class UpdateNotificationService {

    constructor(private notificationRepository: NotificationRepository | FakeNotificationRepository = new NotificationRepository().getInstance()) {
        this.notificationRepository = notificationRepository;
    }

    public execute({ id_rental, show_date }: RequestType): ResponseType {
        const updatedNotification = this.notificationRepository.update(id_rental, show_date);

        if (updatedNotification) {
            return {
                error: false,
                message: "Notification scheduled date updated successfully.",
                data: updatedNotification,
            };
        } else {
            return {
                error: true,
                message: "Notification don't exists.",
                data: undefined,
            };
        }
    };
};

export default UpdateNotificationService;
