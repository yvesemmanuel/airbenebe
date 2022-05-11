import FakeAccommodationRepository from "../../../repositories/fakes/FakeAccommodationRepository";
import CreateAccommodationService from "../../accommodation/CreateAccommodationService";
import QueryAccommodationService from "../../accommodation/QueryAccommodationService";

describe("QueryAccommodation", () => {
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

    const QuerySuccess = {
        id_user: "25fbc0bb-bfc0-41a2-9c4f-ebaba520a4df",
        title: undefined as unknown as string,
        description: undefined as unknown as string,
        type: undefined as unknown as string,
        state: undefined as unknown as string,
        city: undefined as unknown as string,
        street: undefined as unknown as string,
        number: undefined as unknown as string,
        zipcode: undefined as unknown as string,
        capacity: undefined as unknown as string,
        rooms: undefined as unknown as string,
        bathrooms: undefined as unknown as string,
        price: undefined as unknown as string
    };

    const QueryFail = {
        id_user: "aaaaa",
        title: undefined as unknown as string,
        description: undefined as unknown as string,
        type: undefined as unknown as string,
        state: undefined as unknown as string,
        city: undefined as unknown as string,
        street: undefined as unknown as string,
        number: undefined as unknown as string,
        zipcode: undefined as unknown as string,
        capacity: undefined as unknown as string,
        rooms: undefined as unknown as string,
        bathrooms: undefined as unknown as string,
        price: undefined as unknown as string
    };

    it("User accommodations sucessfully found.", async () => {
        const fakeAccommodationRepository = new FakeAccommodationRepository();
        const createAccommodation = new CreateAccommodationService(fakeAccommodationRepository);
        const QueryAccommodation = new QueryAccommodationService(fakeAccommodationRepository);

        createAccommodation.execute({
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

        const query = QueryAccommodation.execute(QuerySuccess);

        expect(query.error).toBeFalsy()
        expect(query.data.length).toEqual(1);    
    })

    it("User accommodations not found.", async () => {
        const fakeAccommodationRepository = new FakeAccommodationRepository();
        const createAccommodation = new CreateAccommodationService(fakeAccommodationRepository);
        const QueryAccommodation = new QueryAccommodationService(fakeAccommodationRepository);

        createAccommodation.execute({
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

        const query = QueryAccommodation.execute(QueryFail);

        expect(query.error).toBeFalsy()
        expect(query.data.length).toEqual(0);    
    })

})