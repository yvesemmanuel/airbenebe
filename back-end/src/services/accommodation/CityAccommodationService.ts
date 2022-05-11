import Accommodation from '../../models/Accommodation';
import AccommodationRepository from '../../repositories/AccommodationRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: Accommodation[],
}

class CityAccommodationService {
    public execute(city: string): ResponseType {
        const accommodationRepository = new AccommodationRepository().getInstance();

        const foundAccommodations = accommodationRepository.findByCity(city);

        return {
            error: false,
            message: "Accommodations found.",
            data: foundAccommodations,
        };
    }
}

export default CityAccommodationService;