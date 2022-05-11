import Accommodation from '../../models/Accommodation';
import FakeAccommodationRepository from '../../repositories/fakes/FakeAccommodationRepository';
import AccommodationRepository from '../../repositories/AccommodationRepository';


type ResponseType = {
    error: boolean,
    message: string,
    data: Accommodation | undefined,
}

class ShowAccommodationService {

    constructor(private accommodationRepository: AccommodationRepository | FakeAccommodationRepository = new AccommodationRepository().getInstance()) {
        this.accommodationRepository = accommodationRepository;
    }

    public execute(id: string): ResponseType {
        const foundAccommodation = this.accommodationRepository.findById(id);

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