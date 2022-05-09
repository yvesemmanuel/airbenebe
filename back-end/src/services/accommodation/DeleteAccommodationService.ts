import AccommodationRepository from '../../repositories/AccommodationRepository';

type ResponseType = {
    error: boolean,
    message: string,
}

class DeleteAccommodationService {
    public execute(id: string): ResponseType {
        const accommodationRepository = new AccommodationRepository().getInstance();

        const foundAccommodation = accommodationRepository.findById(id);

        if (foundAccommodation) {
            accommodationRepository.delete(id);

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