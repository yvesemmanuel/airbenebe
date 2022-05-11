import FakeRentalRepository from "../../../repositories/fakes/FakeRentalRepository";
import CreateRentalService from "../../rental/CreateRentalService";
import QueryRentalService from "../../rental/QueryRentalService";

describe("QueryRental", () => {
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

    const ByAccommodationSuccess = {
        id_user: undefined as unknown as string,
        id_accommodation: "0a42c4d2-2112-4b0a-a65d-7df4cea1f66c",
        guests: undefined as unknown as string,
        price: undefined as unknown as string,
        nights: undefined as unknown as string,
        purchase_date: undefined as unknown as string,
        start_date: undefined as unknown as string,
        end_date: undefined as unknown as string
    };

    const ByUserSuccess = {
        id_user: "25fbc0bb-bfc0-41a2-9c4f-ebaba520a4df",
        id_accommodation: undefined as unknown as string,
        guests: undefined as unknown as string,
        price: undefined as unknown as string,
        nights: undefined as unknown as string,
        purchase_date: undefined as unknown as string,
        start_date: undefined as unknown as string,
        end_date: undefined as unknown as string
    };

    const QueryFail = {
        id_user: "aaaaaaa",
        id_accommodation: undefined as unknown as string,
        guests: undefined as unknown as string,
        price: undefined as unknown as string,
        nights: undefined as unknown as string,
        purchase_date: undefined as unknown as string,
        start_date: undefined as unknown as string,
        end_date: undefined as unknown as string
    };

    it("Accommodation rentals sucessfully found.", async () => {
        const fakeRentalRepository = new FakeRentalRepository();
        const createRental = new CreateRentalService(fakeRentalRepository);
        const QueryRental = new QueryRentalService(fakeRentalRepository);

        createRental.execute({
            id_user: rentalSuccess.id_user,
            id_accommodation: rentalSuccess.id_accommodation,
            guests: rentalSuccess.guests,
            price: rentalSuccess.price,
            nights: rentalSuccess.nights,
            purchase_date: rentalSuccess.purchase_date,
            start_date: rentalSuccess.start_date,
            end_date: rentalSuccess.end_date
        });

        createRental.execute({
            id_user: rentalSuccess.id_user,
            id_accommodation: "123",
            guests: rentalSuccess.guests,
            price: rentalSuccess.price,
            nights: rentalSuccess.nights,
            purchase_date: rentalSuccess.purchase_date,
            start_date: rentalSuccess.start_date,
            end_date: rentalSuccess.end_date
        });

        const query = QueryRental.execute(ByAccommodationSuccess);

        expect(query.error).toBeFalsy();
        expect(query.data.length).toEqual(1);
    })

    it("User rentals sucessfully found.", async () => {
        const fakeRentalRepository = new FakeRentalRepository();
        const createRental = new CreateRentalService(fakeRentalRepository);
        const QueryRental = new QueryRentalService(fakeRentalRepository);

        createRental.execute({
            id_user: rentalSuccess.id_user,
            id_accommodation: rentalSuccess.id_accommodation,
            guests: rentalSuccess.guests,
            price: rentalSuccess.price,
            nights: rentalSuccess.nights,
            purchase_date: rentalSuccess.purchase_date,
            start_date: rentalSuccess.start_date,
            end_date: rentalSuccess.end_date
        });

        createRental.execute({
            id_user: "123",
            id_accommodation: rentalSuccess.id_accommodation,
            guests: rentalSuccess.guests,
            price: rentalSuccess.price,
            nights: rentalSuccess.nights,
            purchase_date: rentalSuccess.purchase_date,
            start_date: rentalSuccess.start_date,
            end_date: rentalSuccess.end_date
        });

        const query = QueryRental.execute(ByUserSuccess);

        expect(query.error).toBeFalsy();
        expect(query.data.length).toEqual(1);
    })

    it("Rentals not found", async () => {
        const fakeRentalRepository = new FakeRentalRepository();
        const createRental = new CreateRentalService(fakeRentalRepository);
        const QueryRental = new QueryRentalService(fakeRentalRepository);

        createRental.execute({
            id_user: rentalSuccess.id_user,
            id_accommodation: rentalSuccess.id_accommodation,
            guests: rentalSuccess.guests,
            price: rentalSuccess.price,
            nights: rentalSuccess.nights,
            purchase_date: rentalSuccess.purchase_date,
            start_date: rentalSuccess.start_date,
            end_date: rentalSuccess.end_date
        });

        const query = QueryRental.execute(QueryFail);

        expect(query.error).toBeFalsy();    
        expect(query.data.length).toEqual(0);
    })
})