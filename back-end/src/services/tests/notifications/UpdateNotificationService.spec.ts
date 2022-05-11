import FakeNotificationRepository from "../../../repositories/fakes/FakeNotificationRepository";
import CreateNotificationService from "../../notification/CreateNotificationService";
import UpdateNotificationService from "../../notification/UpdateNotificationService"

describe("UpdateNotification", () => {
    const notificationSuccess = { 
        id_user: "945724f2-8ce3-4142-bef0-dc95d3074e45", 
        id_rental: "46440d08-fd17-4761-9641-ac965adfcb49", 
        date: "2022-05-10T03:00:00.000Z", 
        show_date: "2022-05-12T03:00:00.000Z", 
        message: "Falta um dia para seu check-in em Casa Tal!"
    };

    const updateSuccess = {
        id_rental: "46440d08-fd17-4761-9641-ac965adfcb49",
        show_date: "2022-05-20T03:00:00.000Z"
    };

    const updateFail = {
        id_rental: "aaaaaaa",
        show_date: "2022-05-15T03:00:00.000Z"
    };

    it("Notification don't exist.", async () => {
        const fakeNotificationRepository = new FakeNotificationRepository();
        const createNotification = new CreateNotificationService(fakeNotificationRepository);
        const UpdateNotification = new UpdateNotificationService();

        createNotification.execute({
            id_user: notificationSuccess.id_user,
            id_rental: notificationSuccess.id_rental,
            date: notificationSuccess.date,
            show_date: notificationSuccess.show_date,
            message: notificationSuccess.message
        });

        const updated = UpdateNotification.execute({
            id_rental: updateFail.id_rental,
            show_date: updateFail.show_date
        });

        expect(updated.error).toBeTruthy();
    })

    it("Notification updated successfully.", async () => {
        const fakeNotificationRepository = new FakeNotificationRepository();
        const createNotification = new CreateNotificationService(fakeNotificationRepository);
        const UpdateNotification = new UpdateNotificationService();


        const updated = UpdateNotification.execute({
            id_rental: updateSuccess.id_rental,
            show_date: updateSuccess.show_date
        });

        expect(updated.error).toBeFalsy();
        expect(updated.data!.show_date).toEqual(updateSuccess.show_date)
    })
})