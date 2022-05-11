import CreateRentalService from "../../rental/CreateRentalService"

describe("CreateRental", () => {
    const rentalSuccess = {
        id_user: "25fbc0bb-bfc0-41a2-9c4f-ebaba520a4df",
        id_accommodation: "0a42c4d2-2112-4b0a-a65d-7df4cea1f66c",
        guests: 3,
        price: 100,
        nights: 5,
        purchase_date: "2022-05-011T21:45:53.797Z",
        start_date: "2022-07-13T03:00:00.000Z",
        end_date: "2022-07-18T03:00:00.000Z"
    };

    const rentalFail = {
        id_user: "25fbc0bb-bfc0-41a2-9c4f-ebaba520a4df",
        id_accommodation: "0a42c4d2-2112-4b0a-a65d-7df4cea1f66c",
        guests: 2,
        price: 960,
        nights: 2,
        purchase_date: "2022-05-05T14:48:25.015Z",
        start_date: "2022-05-11T03:00:00.000Z",
        end_date: "2022-05-13T03:00:00.000Z"
    };

    it("Date already reserved.", async () => {
        const createRental = new CreateRentalService();

        const res = createRental.execute({
            id_user: rentalFail.id_user,
            id_accommodation: rentalFail.id_accommodation,
            guests: rentalFail.guests,
            price: rentalFail.price,
            nights: rentalFail.nights,
            purchase_date: rentalFail.purchase_date,
            start_date: rentalFail.start_date,
            end_date: rentalFail.end_date
        });

        expect(res.error).toBeTruthy();
    })

    it("Rental created successfully.", async () => {
        const createRental = new CreateRentalService();

        const res = createRental.execute({
            id_user: rentalSuccess.id_user,
            id_accommodation: rentalSuccess.id_accommodation,
            guests: rentalSuccess.guests,
            price: rentalSuccess.price,
            nights: rentalSuccess.nights,
            purchase_date: rentalSuccess.purchase_date,
            start_date: rentalSuccess.start_date,
            end_date: rentalSuccess.end_date
        });

        expect(res.error).toBeFalsy();
    })
})