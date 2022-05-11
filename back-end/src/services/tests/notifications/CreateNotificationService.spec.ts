import FakeNotificationRepository from "../../../repositories/fakes/FakeNotificationRepository";
import CreateNotificationService from "../../notification/CreateNotificationService";

describe("CreateNotification", () => {
    const notificationSuccess = { 
        id_user: "945724f2-8ce3-4142-bef0-dc95d3074e45", 
        id_rental: "46440d08-fd17-4761-9641-ac965adfcb49", 
        date: "2022-07-10T03:00:00.000Z", 
        show_date: "2022-07-12T03:00:00.000Z", 
        message: "Falta um dia para seu check-in em Casa Tal!"
    };

    it("Notification sucessfully created.", async () => {
        const fakeNotificationRepository = new FakeNotificationRepository();
        const createNotification = new CreateNotificationService(fakeNotificationRepository);

        const res = createNotification.execute({
            id_user: notificationSuccess.id_user,
            id_rental: notificationSuccess.id_rental,
            date: notificationSuccess.date,
            show_date: notificationSuccess.show_date,
            message: notificationSuccess.message
        });

        expect(res.error).toBeFalsy();
    })

})