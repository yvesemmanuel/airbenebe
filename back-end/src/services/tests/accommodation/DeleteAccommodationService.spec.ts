import DeleteAccommodationService from "../../accommodation/DeleteAccommodationService";

describe("DeleteAccommodation", () => {
    const DeleteSuccess = "f7b46b47-415f-4458-8a65-cbfe36f3aa1c"
    const DeleteFail = "f7b46b47-415f-4458-8a65-cbf123456789"

    it("Accommodation sucessfully Deleted.", async () => {
        const DeleteAccommodation = new DeleteAccommodationService();

        const res = DeleteAccommodation.execute(DeleteSuccess);

        expect(res.error).toBeFalsy();    
    })

    it("Accommodation Deleted Fail", async () => {
        const DeleteAccommodation = new DeleteAccommodationService();

        const res = DeleteAccommodation.execute(DeleteFail);

        expect(res.error).toBeTruthy();    
    })

})