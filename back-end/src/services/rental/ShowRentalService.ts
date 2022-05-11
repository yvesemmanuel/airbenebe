import Rental from '../../models/Rental';
import FakeRentalRepository from '../../repositories/fakes/FakeRentalRepository';
import RentalRepository from '../../repositories/RentalRepository';

type ResponseType = {
    error: boolean,
    message: string,
    data: Rental | undefined,
}

class ShowRentalService {

    constructor(private rentalRepository: RentalRepository | FakeRentalRepository = new RentalRepository().getInstance()) {
        this.rentalRepository = rentalRepository;
    }

    public execute(id: string): ResponseType {
        const foundRental = this.rentalRepository.findById(id);

        if (foundRental) {
            return {
                error: false,
                message: "Rental found.",
                data: foundRental,
            };
        }

        return {
            error: true,
            message: "Rental don't exists.",
            data: undefined,
        };
    }
}

export default ShowRentalService;