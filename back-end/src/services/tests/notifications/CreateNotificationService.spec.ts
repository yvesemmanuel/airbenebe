import CreateNotificationService from "../../notification/CreateNotificationService";

describe("CreateNotification", () => {
    const notification_sucess = { id_user: "945724f2-8ce3-4142-bef0-dc95d3074e45", id_rental: "46440d08-fd17-4761-9641-ac965adfcb49", date: "09/05/2026", show_date: "09/05/2028", message: "Falta um dia para sua entrega!" };

    it("Notification sucessfully created.", async () => {
        const notificationNotification = new CreateNotificationService();

        const res = notificationNotification.execute({
            id_user: notification_sucess.id_user,
            id_rental: notification_sucess.id_rental,
            date: notification_sucess.date,
            show_date: notification_sucess.show_date,
            message: notification_sucess.message
        });

        expect(res.error === false);
    })

})