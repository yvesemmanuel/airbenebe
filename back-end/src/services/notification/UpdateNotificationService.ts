import Notification from "../../models/Notification";
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
    public execute({ id_rental, show_date }: RequestType): ResponseType {
        const notificationRepository = new NotificationRepository().getInstance()

        const updatedNotification = notificationRepository.update(id_rental, show_date);

        return {
            error: false,
            message: "Notification's password updated successfully.",
            data: updatedNotification,
        };
    };
};

export default UpdateNotificationService;
