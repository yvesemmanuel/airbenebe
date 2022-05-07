import Accommodation from '../../models/Accommodation';
import AccommodationRepository from '../../repositories/AccommodationRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: Accommodation[] | undefined,
}

class UserAccommodationService {
    public execute(id_user: string): ResponseType {
        const accommodationRepository = new AccommodationRepository().getInstance();

        const foundAccommodations = accommodationRepository.userAccommodations(id_user);

        return {
            error: false,
            message: "Accommodations found.",
            data: foundAccommodations,
        };

    }
}

export default UserAccommodationService;