import DeleteRentalService from "../../rental/DeleteRentalService";

describe("DeleteRental", () => {
    const rentalSuccess = "46440d08-fd17-4761-9641-ac965adfcb49";
    const rentalFailed = "Xurupita";

    it("City sucessfully filtered.", async () => {
        const deleteRental = new DeleteRentalService();

        const res = deleteRental.execute(rentalSuccess);

        expect(res.message === "Rental deleted.");    
    })

    it("Rental don't exists.", async () => {
        const deleteRental = new DeleteRentalService();

        const res = deleteRental.execute(rentalFailed);

        expect(res.message === "Rental don't exists.");    
    })

})