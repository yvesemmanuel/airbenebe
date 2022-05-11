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
