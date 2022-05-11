import DeleteRentalService from "../../rental/DeleteRentalService";

describe("DeleteRental", () => {
    const rentalSuccess = "46440d08-fd17-4761-9641-ac965adfcb49";
    const rentalFail = "Xurupita";

    it("Rental deleted.", async () => {
        const deleteRental = new DeleteRentalService();

        const res = deleteRental.execute(rentalSuccess);

        expect(res.error).toBeFalsy();    
    })

    it("Rental don't exists.", async () => {
        const deleteRental = new DeleteRentalService();

        const res = deleteRental.execute(rentalFail);

        expect(res.error).toBeTruthy();    
    })

})