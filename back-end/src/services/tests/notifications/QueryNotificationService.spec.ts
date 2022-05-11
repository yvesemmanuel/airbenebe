import FakeNotificationRepository from "../../../repositories/fakes/FakeNotificationRepository";
import CreateNotificationService from "../../notification/CreateNotificationService";
import QueryNotificationService from "../../notification/QueryNotificationService";

describe("QueryNotification", () => {
    const notificationSuccess = { 
        id_user: "945724f2-8ce3-4142-bef0-dc95d3074e45", 
        id_rental: "46440d08-fd17-4761-9641-ac965adfcb49", 
        date: "2022-05-10T03:00:00.000Z", 
        show_date: "2022-05-12T03:00:00.000Z", 
        message: "Falta um dia para seu check-in em Casa Tal!"
    };

    const notificationSuccess2 = { 
        id_user: "88888888-8ce3-4142-bef0-dc95d3074e45", 
        id_rental: "46440d08-fd17-4761-9641-ac965adfcb49", 
        date: "2022-05-09T03:00:00.000Z", 
        show_date: "2022-05-11T03:00:00.000Z", 
        message: "Falta um dia para seu check-in em Casa ABC!"
    };


    const QuerySuccess = {
        id_user: "945724f2-8ce3-4142-bef0-dc95d3074e45"
    };

    const QueryFail = {
        id_user: "aaaaa"
    };

    it("User notifications sucessfully found.", async () => {
        const fakeNotificationRepository = new FakeNotificationRepository();
        const createNotification = new CreateNotificationService(fakeNotificationRepository);
        const QueryNotification = new QueryNotificationService(fakeNotificationRepository);

        createNotification.execute({
            id_user: notificationSuccess.id_user,
            id_rental: notificationSuccess.id_rental,
            date: notificationSuccess.date,
            show_date: notificationSuccess.show_date,
            message: notificationSuccess.message
        });

        createNotification.execute({
            id_user: notificationSuccess2.id_user,
            id_rental: notificationSuccess2.id_rental,
            date: notificationSuccess2.date,
            show_date: notificationSuccess2.show_date,
            message: notificationSuccess2.message
        });

        const query = QueryNotification.execute(QuerySuccess);

        expect(query.error).toBeFalsy()
        expect(query.data.length).toEqual(1);    
    })

    it("User notifications not found.", async () => {
        const fakeNotificationRepository = new FakeNotificationRepository();
        const createNotification = new CreateNotificationService(fakeNotificationRepository);
        const QueryNotification = new QueryNotificationService(fakeNotificationRepository);

        createNotification.execute({
            id_user: notificationSuccess.id_user,
            id_rental: notificationSuccess.id_rental,
            date: notificationSuccess.date,
            show_date: notificationSuccess.show_date,
            message: notificationSuccess.message
        });

        const query = QueryNotification.execute(QueryFail);

        expect(query.error).toBeFalsy()
        expect(query.data.length).toEqual(0);    
    })

})