import { v4 } from 'uuid';

import Accommodation from '../../models/Accommodation';

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
}

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

class FakeAccommodationRepository {
    private accommodations: Accommodation[] =  [];
    private static instance: FakeAccommodationRepository;

    public create({
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
    }: CreateAccommodationType): Accommodation {
        const accommodation = new Accommodation();

        accommodation.id = v4();
        accommodation.id_user = id_user;
        accommodation.title = title;
        accommodation.description = description;
        accommodation.type = type;
        accommodation.state = state;
        accommodation.city = city;
        accommodation.street = street ;
        accommodation.number = number;
        accommodation.zipcode = zipcode;
        accommodation.capacity = capacity;
        accommodation.rooms = rooms;
        accommodation.bathrooms = bathrooms;
        accommodation.images = images;
        accommodation.price = price;

        this.accommodations.push(accommodation);

        return accommodation;
    }

    public findById(id: string): Accommodation | undefined {
        const foundAccommodation = this.accommodations.find(accommodation => accommodation.id == id);

        return foundAccommodation;
    }

    public delete(id: string): void {
        const filtered = this.accommodations.filter(accommodation => accommodation.id != id);
        this.accommodations = filtered;
    };

    public query(queryparams: QueryAccommodationType): Accommodation[] {
        const foundAccommodations = this.accommodations.filter(accommodation => Object.keys(queryparams).filter(k => queryparams[k]).every(param => accommodation[param as keyof typeof accommodation] == queryparams[param]));
        return foundAccommodations;
    }

    public findByCity(city: string): Accommodation[] {
        const foundAccommodations = this.accommodations.filter(accommodation => {
            return accommodation.city.toLowerCase().trim() == city.toLocaleLowerCase().trim()
        });

        return foundAccommodations;
    }

    public getInstance(): FakeAccommodationRepository {
        if (!FakeAccommodationRepository.instance) {
            FakeAccommodationRepository.instance = new FakeAccommodationRepository();
        }

        return FakeAccommodationRepository.instance;
    }
}

export default FakeAccommodationRepository