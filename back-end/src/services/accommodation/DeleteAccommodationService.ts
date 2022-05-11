import FakeAccommodationRepository from '../../repositories/fakes/FakeAccommodationRepository';
import AccommodationRepository from '../../repositories/AccommodationRepository';


type ResponseType = {
    error: boolean,
    message: string,
}

class DeleteAccommodationService {

    constructor(private accommodationRepository: AccommodationRepository | FakeAccommodationRepository = new AccommodationRepository().getInstance()) {
        this.accommodationRepository = accommodationRepository;
    }

    public execute(id: string): ResponseType {
        const foundAccommodation = this.accommodationRepository.findById(id);

        if (foundAccommodation) {
            this.accommodationRepository.delete(id);

            return {
                error: false,
                message: "Accommodation deleted.",
            };
        }

        return {
            error: true,
            message: "Accommodation don't exists.",
        };
    };
};

export default DeleteAccommodationService;