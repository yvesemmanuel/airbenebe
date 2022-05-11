import FakeRentalRepository from "../../../repositories/fakes/FakeRentalRepository";
import CreateRentalService from "../../rental/CreateRentalService";
import UpdateRentalService from "../../rental/UpdateRentalService"

describe("UpdateRental", () => {
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

    const updateSuccess = {
        id: "90f48b28-9093-4c03-9083-f8aa57e0fb55",
        newStart: "2022-07-20T03:00:00.000Z",
        newEnd: "2022-07-25T03:00:00.000Z"
    };

    const updateFail = {
        id: "aaaaaaa",
        newStart: "2022-07-13T03:00:00.000Z",
        newEnd: "2022-07-18T03:00:00.000Z"
    };

    it("Rental don't exist.", async () => {
        const fakeRentalRepository = new FakeRentalRepository();
        const createRental = new CreateRentalService(fakeRentalRepository);
        const UpdateRental = new UpdateRentalService(fakeRentalRepository);
        
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

        const updated = UpdateRental.execute({
            id: updateFail.id,
            newStart: updateFail.newStart,
            newEnd: updateFail.newEnd
        });

        expect(updated.error).toBeTruthy();
    })

    it("Rental updated successfully.", async () => {
        const fakeRentalRepository = new FakeRentalRepository();
        const createRental = new CreateRentalService(fakeRentalRepository);
        const UpdateRental = new UpdateRentalService(fakeRentalRepository);
        
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

        const updated = UpdateRental.execute({
            id: res.data!.id,
            newStart: updateSuccess.newStart,
            newEnd: updateSuccess.newEnd
        });

        expect(updated.error).toBeFalsy();
        expect(updated.data!.start_date).toEqual(updateSuccess.newStart);
        expect(updated.data!.end_date).toEqual(updateSuccess.newEnd);
    })
})