import FakeRentalRepository from '../../repositories/fakes/FakeRentalRepository';
import RentalRepository from '../../repositories/RentalRepository';

type ResponseType = {
    error: boolean,
    message: string,
}

class DeleteRentalService {

    constructor(private rentalRepository: RentalRepository | FakeRentalRepository = new RentalRepository().getInstance()) {
        this.rentalRepository = rentalRepository;
    }

    public execute(id: string): ResponseType {
        const foundRental = this.rentalRepository.findById(id);

        if (foundRental) {
            this.rentalRepository.delete(id);

            return {
                error: false,
                message: "Rental deleted.",
            };
        }

        return {
            error: true,
            message: "Rental don't exists.",
        };
    };
};

export default DeleteRentalService;