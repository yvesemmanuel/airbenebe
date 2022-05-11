import CityAccommodationService from "../../accommodation/CityAccommodationService";

describe("CityAccommodation", () => {
    const citySuccess = "Recife";
    const cityFail = "Xurupita";

    it("City sucessfully filtered.", async () => {
        const cityAccommodation = new CityAccommodationService();

        const res = cityAccommodation.execute(citySuccess);

        expect(res.error).toBeFalsy();    
    })

})