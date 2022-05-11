import Accommodation from '../../models/Accommodation';
import FakeAccommodationRepository from '../../repositories/fakes/FakeAccommodationRepository';
import AccommodationRepository from '../../repositories/AccommodationRepository';


type ResponseType = {
    error: boolean,
    message: string,
    data: Accommodation[],
}

class CityAccommodationService {

    constructor(private accommodationRepository: AccommodationRepository | FakeAccommodationRepository = new AccommodationRepository().getInstance()) {
        this.accommodationRepository = accommodationRepository;
    }

    public execute(city: string): ResponseType {
        const foundAccommodations = this.accommodationRepository.findByCity(city);

        return {
            error: false,
            message: "Accommodations found.",
            data: foundAccommodations,
        };
    }
}

export default CityAccommodationService;