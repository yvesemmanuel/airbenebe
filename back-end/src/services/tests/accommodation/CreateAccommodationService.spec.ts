import FakeAccommodationRepository from "../../../repositories/fakes/FakeAccommodationRepository";
import CreateAccommodationService from "../../accommodation/CreateAccommodationService";
import ShowAccommodationService from "../../accommodation/ShowAccommodationService";

describe("CreateAccommodation", () => {
    const accommodationSuccess = {
        id_user: "25fbc0bb-bfc0-41a2-9c4f-ebaba520a4df",
        title: "Teste 1",
        description: "Lorem ipsum",
        type: "Casa",
        state: "Pernambuco",
        city: "Recife",
        street: "Rua pasqual",
        number: 15,
        zipcode: "50670-235",
        capacity: 2,
        rooms: 2,
        bathrooms: 1,
        images: ["data:image/webp;base64,UklGRqIrAgBXRUJQVlA4IJYrAgAwEwmdASqgBcADPsFUok2npCq/qRg7i/"],
        price: 350
    };

    it("Accommodation sucessfully created.", async () => {
        const fakeAccommodationRepository = new FakeAccommodationRepository();
        const createAccommodation = new CreateAccommodationService(fakeAccommodationRepository);
        const showAccommodation = new ShowAccommodationService(fakeAccommodationRepository);

        const res = createAccommodation.execute({
            id_user: accommodationSuccess.id_user,
            title: accommodationSuccess.title,
            description: accommodationSuccess.description,
            type: accommodationSuccess.type,
            state:accommodationSuccess.state,
            city:accommodationSuccess.city,
            street:accommodationSuccess.street,
            number:accommodationSuccess.number,
            zipcode:accommodationSuccess.zipcode,
            capacity:accommodationSuccess.capacity,
            rooms:accommodationSuccess.rooms,
            bathrooms:accommodationSuccess.bathrooms,
            images: accommodationSuccess.images,
            price:accommodationSuccess.price
        });

        const show = showAccommodation.execute(res.data.id);

        expect(res.error).toBeFalsy();
        expect(show.error).toBeFalsy();
    })

})