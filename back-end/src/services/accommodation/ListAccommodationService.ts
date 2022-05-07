import Accommodation from '../../models/Accommodation';
import AccommodationRepository from '../../repositories/AccommodationRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: Accommodation[] | undefined,
}

class ListAccommodationService {
    public execute(): ResponseType {
        const accommodationRepository = new AccommodationRepository().getInstance();

        const foundAccommodations = accommodationRepository.findAll();

        return {
            error: false,
            message: "Accommodations found.",
            data: foundAccommodations,
        };

    }
}

export default ListAccommodationService;