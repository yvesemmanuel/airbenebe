import FakeRentalRepository from "../../../repositories/fakes/FakeRentalRepository";
import CreateRentalService from "../../rental/CreateRentalService";
import DeleteRentalService from "../../rental/DeleteRentalService";

describe("DeleteRental", () => {
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

    const deleteFail = "Xurupita";

    it("Rental deleted.", async () => {
        const fakeRentalRepository = new FakeRentalRepository();
        const createRental = new CreateRentalService(fakeRentalRepository);
        const deleteRental = new DeleteRentalService(fakeRentalRepository);

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
        
        const deleted = deleteRental.execute(res.data!.id);

        expect(deleted.error).toBeFalsy();    
    })

    it("Rental don't exists.", async () => {
        const fakeRentalRepository = new FakeRentalRepository();
        const createRental = new CreateRentalService(fakeRentalRepository);
        const deleteRental = new DeleteRentalService(fakeRentalRepository);

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

        const deleted = deleteRental.execute(deleteFail);

        expect(deleted.error).toBeTruthy();
    })

})