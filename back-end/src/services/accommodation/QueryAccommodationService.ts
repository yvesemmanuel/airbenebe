import Accommodation from '../../models/Accommodation';
import AccommodationRepository from '../../repositories/AccommodationRepository';

type QueryAccommodationType = {
    id_user: string;
    title: string;
    description: string;
    type: string;
    state: string;
    city: string;
    street: string;
    number: string;
    zipcode: string;
    capacity: string;
    rooms: string;
    bathrooms: string;
    price: string;
    [key: string]: string;
};

type ResponseType = {
    error: boolean,
    message: string,
    data: Accommodation[] | undefined,
}

class QueryAccommodationService {
    public execute({
        id_user,
        title,
        description,
        type,
        state,
        city,
        street,
        number,
        zipcode,
        capacity,
        rooms,
        bathrooms,
        price
    }: QueryAccommodationType): ResponseType {
        const accommodationRepository = new AccommodationRepository().getInstance();

        const foundAccommodations = accommodationRepository.query({
            id_user,
            title,
            description,
            type,
            state,
            city,
            street,
            number,
            zipcode,
            capacity,
            rooms,
            bathrooms,
            price
        });

        return {
            error: false,
            message: "Accommodations found.",
            data: foundAccommodations,
        };

    }
}

export default QueryAccommodationService;