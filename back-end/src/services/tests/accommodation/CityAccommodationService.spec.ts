import CityAccommodationService from "../../accommodation/CityAccommodationService";

describe("CityAccommodation", () => {
    const citySuccess = "Recife";
    const cityFailed = "Xurupita";

    it("City sucessfully filtered.", async () => {
        const cityAccommodation = new CityAccommodationService();

        const res = cityAccommodation.execute(citySuccess);

        expect(res.error === false);    
    })

    it("City filtered failed.", async () => {
        const cityAccommodation = new CityAccommodationService();

        const res = cityAccommodation.execute(cityFailed);

        expect(res.error === true);    
    })

})