import Accommodation from '../../models/Accommodation';
import AccommodationRepository from '../../repositories/AccommodationRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: Accommodation | undefined,
}

class ShowAccommodationService {
    public execute(id: string): ResponseType {
        const accommodationRepository = new AccommodationRepository().getInstance();

        const foundAccommodation = accommodationRepository.findById(id);

        if (foundAccommodation) {
            return {
                error: false,
                message: "Accommodation found.",
                data: foundAccommodation,
            };
        }

        return {
            error: true,
            message: "Accommodation don't exists.",
            data: undefined,
        };
    }
}

export default ShowAccommodationService;