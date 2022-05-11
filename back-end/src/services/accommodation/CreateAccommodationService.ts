import Accommodation from '../../models/Accommodation';
import FakeAccommodationRepository from '../../repositories/fakes/FakeAccommodationRepository';
import AccommodationRepository from '../../repositories/AccommodationRepository';

type CreateAccommodationType = {
    id_user: string;
    title: string;
    description: string;
    type: string;
    state: string;
    city: string;
    street: string;
    number: number;
    zipcode: string;
    capacity: number;
    rooms: number;
    bathrooms: number;
    images: string[];
    price: number;
};

type ResponseType = {
    error: boolean,
    message: string,
    data: Accommodation,
}

class CreateAccommodationService {

    constructor(private accommodationRepository: AccommodationRepository | FakeAccommodationRepository = new AccommodationRepository().getInstance()) {
        this.accommodationRepository = accommodationRepository;
    }

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
        images,
        price
    }: CreateAccommodationType): ResponseType {

        const accommodation = this.accommodationRepository.create({
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
            images,
            price
        });

        return {
            error: false,
            message: "Accommodation created successfully.",
            data: accommodation,
        };
    };
};

export default CreateAccommodationService;